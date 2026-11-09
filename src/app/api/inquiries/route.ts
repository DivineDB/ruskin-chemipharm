import { NextRequest, NextResponse } from "next/server";

export interface InquiryPayload {
	name: string;
	email: string;
	phone?: string;
	company?: string;
	country?: string;
	category?: string;
	product?: string;
	casNumber?: string;
	quantity?: string;
	message?: string;
	source?: string;
}

function resolveCategory(data: InquiryPayload): string {
	if (data.category && data.category.trim()) {
		return data.category.trim();
	}

	const combined = `${data.message || ""} ${data.source || ""} ${data.product || ""}`.toLowerCase();
	if (combined.includes("sample")) return "Sample Request";
	if (combined.includes("coa") || combined.includes("dossier") || combined.includes("cep") || combined.includes("dmf")) {
		return "COA / Regulatory Dossier";
	}
	if (combined.includes("synthesis") || combined.includes("custom") || combined.includes("sourcing")) {
		return "Custom Synthesis / Sourcing";
	}
	if (combined.includes("quote") || data.quantity) {
		return "Commercial Quote";
	}
	return "General Technical Inquiry";
}

function generateReferenceId(): string {
	const rand = Math.floor(1000 + Math.random() * 9000);
	return `RUS-${rand}`;
}

export async function POST(req: NextRequest) {
	try {
		const body: InquiryPayload = await req.json();

		if (!body.name || !body.email) {
			return NextResponse.json(
				{ success: false, error: "Name and Email are required." },
				{ status: 400 },
			);
		}

		const referenceId = generateReferenceId();
		const category = resolveCategory(body);
		const timestamp = new Date().toISOString();

		const record = {
			timestamp,
			referenceId,
			category,
			name: body.name.trim(),
			email: body.email.trim(),
			phone: body.phone?.trim() || "—",
			company: body.company?.trim() || "—",
			country: body.country?.trim() || "—",
			product: body.product?.trim() || "—",
			casNumber: body.casNumber?.trim() || "—",
			quantity: body.quantity?.trim() || "—",
			message: body.message?.trim() || "—",
			source: body.source?.trim() || "Website",
			status: "🟡 New",
			priority: category === "Commercial Quote" || category === "Custom Synthesis / Sourcing" ? "High" : "Medium",
		};

		const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;

		if (webhookUrl) {
			try {
				const response = await fetch(webhookUrl, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(record),
					// Google Apps Script redirects with 302, fetch handles follow automatically
					redirect: "follow",
				});

				if (!response.ok) {
					console.error("Google Sheets Webhook HTTP error:", response.status, response.statusText);
				}
			} catch (fetchErr) {
				console.error("Error forwarding inquiry to Google Sheet Webhook:", fetchErr);
				// We do not fail the user's request so they still get their reference ID
			}
		} else {
			console.log("[INQUIRY LOGGED LOCALLY - GOOGLE_SHEET_WEBHOOK_URL not configured]:", record);
		}

		return NextResponse.json({
			success: true,
			referenceId,
			category,
			message: "Inquiry received and logged successfully.",
		});
	} catch (error) {
		console.error("Inquiry API Error:", error);
		return NextResponse.json(
			{ success: false, error: "Internal server error processing inquiry." },
			{ status: 500 },
		);
	}
}

export async function GET() {
	return NextResponse.json({
		status: "active",
		endpoint: "/api/inquiries",
		description: "Ruskin Chemipharm Inquiries Intake API",
	});
}

