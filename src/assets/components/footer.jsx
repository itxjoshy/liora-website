import React, { useState } from "react";
import "./footer.css";
import logo from "../logo.png";

function Footer() {
  const [email, setEmail] = useState("");

  const subscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    const list = JSON.parse(localStorage.getItem("newsletter") || "[]");
    list.push(email);
    localStorage.setItem("newsletter", JSON.stringify(list));
    window.dispatchEvent(new Event("newsletterSubscribed"));
    setEmail("");
  };

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <div className="logo">
            <img src={logo} alt="" style={{ width: "20%" }} />
          </div>
          <p className="tag">Founders' streetwear — limited drops</p>
          <div className="social">
            <a href="#" aria-label="instagram" className="social-btn">
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="currentColor"
              >
                <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 6.2A4.8 4.8 0 1 0 16.8 13 4.8 4.8 0 0 0 12 8.2zm6.3-2.8a1.1 1.1 0 1 0 1.1 1.1 1.1 1.1 0 0 0-1.1-1.1z" />
              </svg>
            </a>
            <a href="#" aria-label="twitter" className="social-btn">
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="currentColor"
              >
                <path d="M22 5.9c-.7.3-1.5.5-2.3.6a4.1 4.1 0 0 0-7 3v.3A11.6 11.6 0 0 1 3 4.6a4.1 4.1 0 0 0 1.3 5.4c-.6 0-1.1-.2-1.6-.4v.1a4.1 4.1 0 0 0 3.3 4 4.2 4.2 0 0 1-1.1.1c-.3 0-.6 0-.9-.1a4.2 4.2 0 0 0 3.8 2.9A8.3 8.3 0 0 1 2 19.5a11.7 11.7 0 0 0 6.3 1.8c7.5 0 11.6-6.3 11.6-11.8v-.5A8.3 8.3 0 0 0 22 5.9z" />
              </svg>
            </a>
            <a href="#" aria-label="tiktok" className="social-btn">
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="currentColor"
              >
                <path d="M17 2v6a4 4 0 0 1-4-1.8v9.6A6.2 6.2 0 1 1 11.8 22V9h2.4A4 4 0 0 0 17 2z" />
              </svg>
            </a>
          </div>
        </div>

        <div className="footer-news">
          <h4>Join the Drop</h4>
          <form className="subscribe-form" onSubmit={subscribe}>
            <input
              type="email"
              placeholder="email@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Email"
            />
            <button type="submit" className="subscribe">
              Subscribe
            </button>
          </form>
          <p className="fine">Free shipping over N70,000 • Limited runs</p>
        </div>
      </div>

      <div className="footer-bottom">
        <small>© {new Date().getFullYear()} Liora. All rights reserved.</small>
        <div className="policies">
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
          <a href="/admin-login">Admin</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
