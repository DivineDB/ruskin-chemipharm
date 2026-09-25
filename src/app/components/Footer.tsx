"use client";

interface FooterProps {
  onOpenCatalog: () => void;
}

export default function Footer({ onOpenCatalog }: FooterProps) {
  return (
    <footer id="contact" className="bg-[#EAF2F4] text-[#12304A] border-t border-slate-200 pt-14 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* Top layout — brand col + 3 nav cols with wide gap */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 text-left items-start">

          {/* Brand Column — fixed width, no left padding on gold bar */}
          <div className="w-full lg:w-[240px] shrink-0 space-y-5">
            <img
              src="/images/logo.svg"
              alt="Ruskin Chemipharm Logo"
              className="h-10 w-auto object-contain"
            />

            {/* Gold tagline — left edge flush with col, right side pill-rounded */}
            <div
              className="bg-[#C79A4B] rounded-r-full py-4 w-full"
              style={{ paddingLeft: "20px", paddingRight: "40px" }}
            >
              <p
                className="text-white leading-snug"
                style={{
                  fontFamily: "var(--font-plus-jakarta), sans-serif",
                  fontWeight: 700,
                  fontSize: "15px",
                }}
              >
                Precision Chemistry.
              </p>
              <p
                className="text-white leading-snug"
                style={{
                  fontFamily: "var(--font-plus-jakarta), sans-serif",
                  fontWeight: 400,
                  fontStyle: "italic",
                  fontSize: "15px",
                }}
              >
                Global Standards.
              </p>
            </div>

            {/* Cert logos */}
            <div className="flex items-center gap-3 flex-wrap">
              <img src="/images/cert (1).svg" alt="ISO 9001:2015" className="h-14 w-14 object-contain" />
              <img src="/images/cert (2).svg" alt="WHO-GMP" className="h-14 w-14 object-contain" />
              <img src="/images/cert (3).svg" alt="ISO 14001" className="h-14 w-14 object-contain" />
            </div>
          </div>

          {/* Nav Columns — even grid with good inter-column spacing */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-12">

            {/* Quick Links */}
            <div className="space-y-4">
              <h4
                style={{
                  fontFamily: "var(--font-plus-jakarta), sans-serif",
                  fontWeight: 600,
                  fontSize: "22px",
                  color: "#12304A",
                  lineHeight: "1.3",
                }}
              >
                Quick Links
              </h4>
              <ul className="space-y-2.5 text-slate-600 text-sm">
                <li>
                  <button onClick={onOpenCatalog} className="hover:text-[#147D82] transition-colors text-left">
                    Products Directory
                  </button>
                </li>
                <li><a href="#services" className="hover:text-[#147D82] transition-colors">Services</a></li>
                <li><a href="#services" className="hover:text-[#147D82] transition-colors">Regulatory Specs</a></li>
                <li><a href="#about" className="hover:text-[#147D82] transition-colors">About Us</a></li>
              </ul>
            </div>

            {/* Compliance */}
            <div className="space-y-4">
              <h4
                style={{
                  fontFamily: "var(--font-plus-jakarta), sans-serif",
                  fontWeight: 600,
                  fontSize: "22px",
                  color: "#12304A",
                  lineHeight: "1.3",
                }}
              >
                Compliance
              </h4>
              <ul className="space-y-2.5 text-slate-600 text-sm">
                <li><span className="hover:text-[#147D82] cursor-pointer transition-colors">WHO-GMP</span></li>
                <li><span className="hover:text-[#147D82] cursor-pointer transition-colors">ISO 9001:2015</span></li>
                <li><span className="hover:text-[#147D82] cursor-pointer transition-colors">CoA Verification</span></li>
                <li><span className="hover:text-[#147D82] cursor-pointer transition-colors">Safety Data Sheets</span></li>
              </ul>
            </div>

            {/* Reach Us */}
            <div className="space-y-4">
              <h4
                style={{
                  fontFamily: "var(--font-plus-jakarta), sans-serif",
                  fontWeight: 600,
                  fontSize: "22px",
                  color: "#12304A",
                  lineHeight: "1.3",
                }}
              >
                Reach Us
              </h4>
              <div className="space-y-3 text-slate-600 text-sm leading-relaxed">
                <div>
                  <p className="font-semibold text-[#12304A]">Address:</p>
                  <p>4/A, Bhangwadi Shopping Arcade,<br />Kalbadevi Road, Mumbai – 400 002.</p>
                </div>
                <div>
                  <p className="font-semibold text-[#12304A]">Phone:</p>
                  <p>022–22059494 / 22068330</p>
                </div>
                <div>
                  <p className="font-semibold text-[#12304A]">Email:</p>
                  <a href="mailto:sourcing@ruskinchemipharm.in" className="hover:text-[#147D82] transition-colors block">
                    sourcing@ruskinchemipharm.in
                  </a>
                  <a href="mailto:sales@ruskinchemipharm.in" className="hover:text-[#147D82] transition-colors block">
                    sales@ruskinchemipharm.in
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-300 pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-slate-500">
          <div className="space-y-1">
            <p className="font-semibold text-slate-700 text-sm">
              Ruskin Chemipharm . Est.1990 . Mumbai, India
            </p>
            <p>&copy; {new Date().getFullYear()} Ruskin Chemipharm . All right reserved</p>
            <p className="text-[10px] text-slate-400 max-w-2xl leading-normal">
              Disclaimer: API/Substances covered by patent are not offered to countries where patent law is in force. Final responsibility lies with the customer.
            </p>
          </div>

          <div className="flex items-center gap-2 text-slate-600 font-medium shrink-0 text-xs">
            <span className="hover:text-[#12304A] cursor-pointer transition-colors">Privacy Policy</span>
            <span className="text-slate-400">·</span>
            <span className="hover:text-[#12304A] cursor-pointer transition-colors">Terms of use</span>
            <span className="text-slate-400">·</span>
            <span className="hover:text-[#12304A] cursor-pointer transition-colors">FAQ</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
