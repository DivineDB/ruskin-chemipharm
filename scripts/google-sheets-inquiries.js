/**
 * ============================================================================
 * RUSKIN CHEMIPHARM - INQUIRIES MANAGEMENT GOOGLE APPS SCRIPT
 * ============================================================================
 * 
 * Active Deployment:
 * - Deployment ID: AKfycbyFjdXjykg2Our71En199Y375hlNggD5sXagJtfFoxF3jnTSMlO9uDwPcE55XrQGnbX
 * - Web App URL: https://script.google.com/macros/s/AKfycbyFjdXjykg2Our71En199Y375hlNggD5sXagJtfFoxF3jnTSMlO9uDwPcE55XrQGnbX/exec
 * - Live Google Sheet:
 *   https://docs.google.com/spreadsheets/d/1NxQugULiruEjmxxXJxXBQ0XPxDKww5DzpaDPmUIn0Lw/edit
 * 
 * Connected to Next.js via:
 * - Environment Variable: GOOGLE_SHEET_WEBHOOK_URL in .env.local
 * - API Route: /api/inquiries
 * ============================================================================
 */

// Optional: Enter your email to receive instant email notifications for every inquiry
// e.g. "sales@ruskinchemipharm.com" or your personal email
var NOTIFICATION_EMAIL = "";

var SHEET_NAME_INQUIRIES = "Inquiries";
var SHEET_NAME_DASHBOARD = "Overview Dashboard";

/**
 * Run this function once to set up the Google Sheet structure, colors,
 * validations, and the KPI Overview Dashboard.
 */
function setupSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // ── 1. SETUP INQUIRIES SHEET ──
  var sheet = ss.getSheetByName(SHEET_NAME_INQUIRIES);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME_INQUIRIES, 0);
  }
  
  // Headers Definition
  var headers = [
    "Timestamp (IST)",
    "Reference ID",
    "Category",
    "Status",
    "Priority",
    "Client Name",
    "Work Email",
    "Phone / WhatsApp",
    "Company / Org",
    "Country",
    "Target Molecule / Product",
    "CAS #",
    "Estimated Volume",
    "Specifications / Requirements",
    "Source Page",
    "Assigned To",
    "Internal Notes"
  ];
  
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  
  // Header Styling (Ruskin Brand Navy #12304A and White text)
  var headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setBackground("#12304A")
             .setFontColor("#FFFFFF")
             .setFontWeight("bold")
             .setFontFamily("Arial")
             .setFontSize(10)
             .setHorizontalAlignment("center")
             .setVerticalAlignment("middle");
  sheet.setRowHeight(1, 38);
  sheet.setFrozenRows(1);
  
  // Set Optimized Column Widths
  var colWidths = [
    160, // Timestamp
    115, // Reference ID
    180, // Category
    130, // Status
    100, // Priority
    180, // Client Name
    200, // Work Email
    150, // Phone / WhatsApp
    180, // Company / Org
    120, // Country
    190, // Target Molecule
    110, // CAS #
    125, // Volume
    300, // Specifications
    140, // Source Page
    140, // Assigned To
    220  // Internal Notes
  ];
  
  for (var i = 0; i < colWidths.length; i++) {
    sheet.setColumnWidth(i + 1, colWidths[i]);
  }
  
  // ── DROPDOWN VALIDATIONS ──
  
  // Column C: Category Dropdown
  var categories = [
    "Commercial Quote",
    "Sample Request",
    "COA / Regulatory Dossier",
    "Custom Synthesis / Sourcing",
    "General Technical Inquiry"
  ];
  var catRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(categories, true)
    .setAllowInvalid(false)
    .build();
  sheet.getRange("C2:C1000").setDataValidation(catRule);
  
  // Column D: Status Dropdown
  var statuses = [
    "🟡 New",
    "🔵 Under Review",
    "🟣 Quote Sent",
    "🟠 Sample Dispatched",
    "🟢 Won",
    "⚫ Closed"
  ];
  var statusRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(statuses, true)
    .setAllowInvalid(false)
    .build();
  sheet.getRange("D2:D1000").setDataValidation(statusRule);
  
  // Column E: Priority Dropdown
  var priorities = ["High", "Medium", "Routine"];
  var priorityRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(priorities, true)
    .setAllowInvalid(false)
    .build();
  sheet.getRange("E2:E1000").setDataValidation(priorityRule);
  
  // Auto wrap text for Specifications and Notes
  sheet.getRange("N2:N1000").setWrap(true);
  sheet.getRange("Q2:Q1000").setWrap(true);
  
  // ── CONDITIONAL FORMATTING FOR STATUS HIGHLIGHTING ──
  var rules = sheet.getConditionalFormatRules();
  
  // New = Soft Yellow highlight
  var newRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo("🟡 New")
    .setBackground("#FEF9C3")
    .setFontColor("#854D0E")
    .setRanges([sheet.getRange("D2:D1000")])
    .build();
    
  // Won = Soft Green highlight
  var wonRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo("🟢 Won")
    .setBackground("#DCFCE7")
    .setFontColor("#166534")
    .setRanges([sheet.getRange("D2:D1000")])
    .build();
    
  rules.push(newRule);
  rules.push(wonRule);
  sheet.setConditionalFormatRules(rules);
  
  // ── 2. SETUP DASHBOARD TAB ──
  var dash = ss.getSheetByName(SHEET_NAME_DASHBOARD);
  if (!dash) {
    dash = ss.insertSheet(SHEET_NAME_DASHBOARD, 0);
  }
  
  dash.clear();
  dash.setColumnWidth(1, 30);
  dash.setColumnWidth(2, 230);
  dash.setColumnWidth(3, 130);
  dash.setColumnWidth(4, 30);
  dash.setColumnWidth(5, 230);
  dash.setColumnWidth(6, 130);
  
  // Dashboard Title Banner
  dash.getRange("B2:F2").merge()
      .setValue("RUSKIN CHEMIPHARM — INQUIRIES & SOURCING PIPELINE")
      .setBackground("#12304A")
      .setFontColor("#C79A4B")
      .setFontWeight("bold")
      .setFontSize(13)
      .setHorizontalAlignment("center")
      .setVerticalAlignment("middle");
  dash.setRowHeight(2, 45);
  
  // KPI Metrics Table
  dash.getRange("B4:C4").setValues([["METRIC OVERVIEW", "VALUE"]])
      .setBackground("#FAF7F2").setFontWeight("bold").setFontColor("#12304A");
      
  dash.getRange("B5:C9").setValues([
    ["Total Inquiries Received", '=COUNTIF(Inquiries!B:B, "RUS-*")'],
    ["🟡 New / Pending Action", '=COUNTIF(Inquiries!D:D, "🟡 New")'],
    ["🔵 Under Technical Review", '=COUNTIF(Inquiries!D:D, "🔵 Under Review")'],
    ["🟣 Quotes Dispatched", '=COUNTIF(Inquiries!D:D, "🟣 Quote Sent")'],
    ["🟢 Orders Won", '=COUNTIF(Inquiries!D:D, "🟢 Won")']
  ]);
  dash.getRange("B5:B9").setFontWeight("bold").setFontColor("#5A7A8E");
  dash.getRange("C5:C9").setHorizontalAlignment("center").setFontWeight("bold").setFontColor("#12304A");
  
  // Categories Breakdown Table
  dash.getRange("E4:F4").setValues([["INQUIRY CATEGORY", "COUNT"]])
      .setBackground("#FAF7F2").setFontWeight("bold").setFontColor("#12304A");
      
  dash.getRange("E5:F9").setValues([
    ["Commercial Quote", '=COUNTIF(Inquiries!C:C, "Commercial Quote")'],
    ["Sample Request", '=COUNTIF(Inquiries!C:C, "Sample Request")'],
    ["COA / Regulatory Dossier", '=COUNTIF(Inquiries!C:C, "COA / Regulatory Dossier")'],
    ["Custom Synthesis / Sourcing", '=COUNTIF(Inquiries!C:C, "Custom Synthesis / Sourcing")'],
    ["General Technical Inquiry", '=COUNTIF(Inquiries!C:C, "General Technical Inquiry")']
  ]);
  dash.getRange("E5:E9").setFontColor("#5A7A8E");
  dash.getRange("F5:F9").setHorizontalAlignment("center").setFontWeight("bold").setFontColor("#C79A4B");

  SpreadsheetApp.flush();
}

/**
 * Webhook endpoint: Handles incoming HTTP POST requests from Next.js
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  // Wait up to 30 seconds for concurrent requests
  try {
    lock.waitLock(30000);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: "Server busy, could not acquire lock"
    })).setMimeType(ContentService.MimeType.JSON);
  }

  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME_INQUIRIES);
    
    // Auto-initialize if sheet doesn't exist
    if (!sheet) {
      setupSheet();
      sheet = ss.getSheetByName(SHEET_NAME_INQUIRIES);
    }
    
    var data = {};
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else if (e.parameter) {
      data = e.parameter;
    }

    // Format IST Timestamp
    var timestamp = Utilities.formatDate(new Date(), "Asia/Kolkata", "dd/MM/yyyy HH:mm:ss");
    var refId = data.referenceId || ("RUS-" + Math.floor(1000 + Math.random() * 9000));
    var category = data.category || "General Technical Inquiry";
    var status = data.status || "🟡 New";
    var priority = data.priority || "Medium";
    
    var row = [
      timestamp,
      refId,
      category,
      status,
      priority,
      data.name || "—",
      data.email || "—",
      data.phone || "—",
      data.company || "—",
      data.country || "—",
      data.product || "—",
      data.casNumber || "—",
      data.quantity || "—",
      data.message || "—",
      data.source || "Website",
      "Mumbai Commercial Desk",
      "" // Empty notes for internal use
    ];

    sheet.appendRow(row);
    
    // Send email notification if configured
    if (NOTIFICATION_EMAIL && NOTIFICATION_EMAIL.trim().length > 0) {
      sendEmailAlert(data, refId, category, timestamp);
    }

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      referenceId: refId,
      timestamp: timestamp
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

/**
 * Webhook health check endpoint (GET)
 */
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: "active",
    service: "Ruskin Chemipharm Inquiries Intake Webhook",
    timestamp: new Date().toISOString()
  })).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Optional email alert helper
 */
function sendEmailAlert(data, refId, category, timestamp) {
  try {
    var subject = "[New Inquiry - " + refId + "] " + category + " from " + (data.company || data.name);
    var body = 
      "New Commercial/Technical Inquiry Received:\n\n" +
      "Reference ID: " + refId + "\n" +
      "Timestamp: " + timestamp + "\n" +
      "Category: " + category + "\n" +
      "Client Name: " + (data.name || "N/A") + "\n" +
      "Email: " + (data.email || "N/A") + "\n" +
      "Phone/WhatsApp: " + (data.phone || "N/A") + "\n" +
      "Company: " + (data.company || "N/A") + "\n" +
      "Country: " + (data.country || "N/A") + "\n" +
      "Target Molecule: " + (data.product || "N/A") + "\n" +
      "Estimated Volume: " + (data.quantity || "N/A") + "\n" +
      "Source: " + (data.source || "Website") + "\n\n" +
      "Message / Specifications:\n" +
      (data.message || "None provided") + "\n\n" +
      "Access Google Sheet to view and update status.";
      
    MailApp.sendEmail(NOTIFICATION_EMAIL, subject, body);
  } catch (err) {
    console.error("Failed to send email alert: " + err.toString());
  }
}

