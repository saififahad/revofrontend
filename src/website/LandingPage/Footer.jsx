import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "../Styles/Footer.css";
import { toast } from "react-toastify";

// Validation schema for the email field using Yup

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  // Handle email change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      return toast.error("Enter a valid email!");
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post(
        `https://server.revoridegame.com/email/subscribe`,
        {
          email: email,
        }
      );

      if (response.status === 200) {
        toast.success("Subscription successful!");
        setEmail(""); // Clear the email input field
      }
    } catch (error) {
      toast.error("There was an error while subscribing. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="footer-container">
      <div className="footer-part">
        <div className="second-part">
          <h1>Revo Play</h1>
          <h5>
            Join Revo Play for unmatched gaming adventures and <br />
            endless entertainment every day.
          </h5>
        </div>
        <div className="contact-part">
          <h1>Our Contact</h1>
          <h5>Email: support@revoridegame.com</h5>
        </div>
        <div className="second-part">
          <h1>Quick Links</h1>
          <h5 onClick={() => navigate("/privacy_policy")}>Privacy Policy</h5>
          <h5 onClick={() => navigate("/terms_conditions")}>
            Terms & Conditions
          </h5>
        </div>
        <div className="second-part">
          <h1>Subscribe</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-wrapper new">
              <svg
                className="icon new"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g data-name="Layer 2">
                  <g data-name="inbox">
                    <rect
                      width="24"
                      height="24"
                      transform="rotate(180 12 12)"
                      opacity="0"
                    ></rect>
                    <path d="M20.79 11.34l-3.34-6.68A3 3 0 0 0 14.76 3H9.24a3 3 0 0 0-2.69 1.66l-3.34 6.68a2 2 0 0 0-.21.9V18a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-5.76a2 2 0 0 0-.21-.9zM8.34 5.55a1 1 0 0 1 .9-.55h5.52a1 1 0 0 1 .9.55L18.38 11H16a1 1 0 0 0-1 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-2a1 1 0 0 0-1-1H5.62z"></path>
                  </g>
                </g>
              </svg>
              <input
                type="email"
                name="email"
                className="input new"
                placeholder="info@gmail.com"
                value={email}
                onChange={handleEmailChange}
              />
              <button
                type="submit"
                className="Subscribe-btn new"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="last-part">
        <h5>©Copyright 2024, All Rights Reserved</h5>
      </div>
    </div>
  );
};

export default Footer;
