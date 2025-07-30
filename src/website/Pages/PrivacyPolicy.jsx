import Navbar from "../LandingPage/Navbar";
import "../Styles/ConditionsandPolicy.css";

const PrivacyPolicy = () => {
  return (
    <>
      <div className="max-wrapper">
        <div className="wrap">
          <h1 className="common-heading">Privacy Policy</h1>
          <p className="common-para">
            <span>Effective Date</span>...
          </p>
          <p className="common-para w">
            Welcome to Revo Play. At Revo Play, we prioritize your privacy and
            are committed to protecting your personal data. This Privacy Policy
            outlines how we collect, use, and safeguard your information.
          </p>
          <ol className="common-list">
            <li className="common-list-heading">
              Information We Collect
              <ul>
                <li className="common-list-info">
                  <span className="common-list-bold">
                    Personal Information:{" "}
                  </span>
                  Name, email address, wallet ID, and other registration
                  details.
                </li>
                <li className="common-list-info">
                  <span className="common-list-bold">Gameplay Data: </span>
                  Staking amounts, winnings, play history, and activity logs
                </li>
                <li className="common-list-info">
                  <span className="common-list-bold">Technical Data: </span>
                  IP address, device type, browser information, and cookies.
                </li>
              </ul>
            </li>
            <li className="common-list-heading">
              How We Use Your Information
              <p className="common-para l">
                We use the collected information to:
              </p>
              <ul>
                <li className="common-list-info">
                  Provide and improve our services
                </li>
                <li className="common-list-info">
                  Process gameplay, Stakes, and payouts
                </li>
                <li className="common-list-info">
                  Prevent fraud, ensure security, and maintain platform
                  integrity.
                </li>
                <li className="common-list-info">
                  Send updates, rewards notifications, and promotional content.
                </li>
                <li className="common-list-info">
                  Comply with legal obligations.
                </li>
              </ul>
            </li>
            <li className="common-list-heading">
              Data Sharing and Security
              <ul>
                <li className="common-list-info">
                  We do not sell or rent your personal information to third
                  parties.
                </li>
                <li className="common-list-info">
                  Information may be shared with trusted service providers for
                  payment processing, analytics, or security purposes.
                </li>
                <li className="common-list-info">
                  We implement industry-standard encryption and secure servers
                  to protect your data.
                </li>
              </ul>
            </li>
            <li className="common-list-heading">
              Cookies and Tracking
              <div className="common-para">
                We use cookies to improve user experience, track website
                performance, and understand user behavior. You can manage or
                disable cookies through your browser settings.
              </div>
            </li>
            <li className="common-list-heading">
              Your Rights
              <p className="common-para l">You have the right to:</p>
              <ul>
                <li className="common-list-info">
                  Access, modify, or delete your personal data
                </li>
                <li className="common-list-info">
                  Opt-out of marketing communications.
                </li>
                <li className="common-list-info">
                  Withdraw consent for data collection (subject to gameplay
                  limitations)
                </li>
              </ul>
            </li>
            <li className="common-list-heading">
              Changes to This Policy
              <p className="common-para">
                We reserve the right to update this Privacy Policy. Updates will
                be posted on this page, and continued use of our platform
                implies acceptance of the revised policy.
              </p>
            </li>
            <li className="common-list-heading">
              Contact Us
              <p className="common-para">
                For any privacy-related concerns or questions, please reach out
                to us at:
                <span className="bold">Email: support@revoridegame.com</span>
              </p>
            </li>
          </ol>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
