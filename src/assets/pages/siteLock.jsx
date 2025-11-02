import React, { useState } from "react";
import "./sitelock.css";
import logo from "../Logo.png";

function SiteLock() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const subscribe = (e) => {
    e?.preventDefault();
    const trimmed = (email || "").trim().toLowerCase();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      alert("Please enter a valid email.");
      return;
    }
    const list = JSON.parse(localStorage.getItem("liora_lock_subs") || "[]");
    if (!list.includes(trimmed)) {
      list.push(trimmed);
      localStorage.setItem("liora_lock_subs", JSON.stringify(list));
      window.dispatchEvent(new Event("siteLockSubscribed"));
    }
    setSubscribed(true);
    setEmail("");
  };

  return (
    <main className="site-lock" role="main" aria-labelledby="site-lock-title">
      <div
        className="site-lock__card"
        role="region"
        aria-label="Site maintenance"
      >
        <header className="site-lock__brand">
          <img src={logo} alt="Liora" className="site-lock__logo" />
          <div className="site-lock__brand-meta">
            <p className="mute">Founders • Streetwear • Limited drops</p>
          </div>
        </header>

        <section className="site-lock__body">
          <h2>We're restocking the drop.</h2>
          <p className="lead">
            The storefront is temporarily offline for limited restock. <br />
            Sign up to be notified when we relaunch the founders' drop.
          </p>

          <form className="site-lock__subscribe" onSubmit={subscribe}>
            <label htmlFor="site-lock-email" className="visually-hidden">
              Email address
            </label>
            <input
              id="site-lock-email"
              name="email"
              type="email"
              placeholder="you@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Email address"
              required
            />
            <button type="submit" className="btn-primary-sbmt">
              {subscribed ? "Subscribed" : "Notify me"}
            </button>
          </form>

          <div className="site-lock__meta">
            <small className="mute">
              Prefer not to wait? Contact{" "}
              <a href="mailto:support@liora.com">support@liora.com</a>
            </small>
            <div className="site-lock__social" aria-hidden="false">
              <a href="#" aria-label="Instagram" className="social">
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="currentColor"
                >
                  <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 6.2A4.8 4.8 0 1 0 16.8 13 4.8 4.8 0 0 0 12 8.2zm6.3-2.8a1.1 1.1 0 1 0 1.1 1.1 1.1 1.1 0 0 0-1.1-1.1z" />
                </svg>
              </a>
              <a href="#" aria-label="Twitter" className="social">
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="currentColor"
                >
                  <path d="M22 5.9c-.7.3-1.5.5-2.3.6a4.1 4.1 0 0 0-7 3v.3A11.6 11.6 0 0 1 3 4.6a4.1 4.1 0 0 0 1.3 5.4c-.6 0-1.1-.2-1.6-.4v.1a4.1 4.1 0 0 0 3.3 4 4.2 4.2 0 0 1-1.1.1c-.3 0-.6 0-.9-.1a4.2 4.2 0 0 0 3.8 2.9A8.3 8.3 0 0 1 2 19.5a11.7 11.7 0 0 0 6.3 1.8c7.5 0 11.6-6.3 11.6-11.8v-.5A8.3 8.3 0 0 0 22 5.9z" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        <footer className="site-lock__foot mute">
          © {new Date().getFullYear()} Liora — limited runs · follow on socials
          for updates
        </footer>
      </div>
    </main>
  );
}

export default SiteLock;
