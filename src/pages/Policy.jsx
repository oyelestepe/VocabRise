import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../style/Policy.css";
import { MdSecurity, MdLock, MdOutlineCookie, MdUpdate } from "react-icons/md";

function PrivacyPolicy() {
  return (
    <div>
      <Navbar />

      <div className="policy-wrapper">
        {/* Left - Illustration */}
        <div className="policy-image">
          <img src="/privacy-img.png" alt="Privacy Illustration" />
        </div>

        {/* Right - Content */}
        <div className="policy-content">
          <h1 className="policy-title">Privacy Policy</h1>
          <p className="policy-subtitle">
            We value your privacy and are committed to protecting your personal data.
          </p>

          <section>
            <h2><MdSecurity className="icon" /> 1. Information We Collect</h2>
            <p>
              We may collect personal details such as your name, email address, and activity on our platform.
            </p>
          </section>

          <section>
            <h2><MdLock className="icon" /> 2. How We Use Your Data</h2>
            <p>
              Your data is used to improve our services, provide support, and communicate updates.
            </p>
          </section>

          <section>
            <h2><MdOutlineCookie className="icon" /> 3. Cookies</h2>
            <p>
              We use cookies to enhance your experience. You can manage them through your browser settings.
            </p>
          </section>

          <section>
            <h2><MdUpdate className="icon" /> 4. Policy Changes</h2>
            <p>
              Updates will be posted here with an updated date at the top of the page.
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default PrivacyPolicy;