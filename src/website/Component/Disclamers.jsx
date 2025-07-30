import React from "react";

const Disclamers = () => {
  return (
    <div>
      <div className="disclaimer-container">
        <h3 className="disclaimer-title">Important Disclaimers</h3>
        <ul className="disclaimer-list">
          <li className="disclaimer-item">
            <span className="item-highlight">Rewards:</span> Rewards and credits
            earned are subject to availability and platform discretion. Terms
            and conditions apply
          </li>
          <li className="disclaimer-item">
            <span className="item-highlight">Referral Fair Use:</span> :
            Referrals must be genuine. Fraudulent or spam referrals may lead to
            disqualification or account suspension.
          </li>
          <li className="disclaimer-item">
            <span className="item-highlight">Updates:</span> Game mechanics,
            rewards, and terms may be updated without prior notice. Check
            regularly for updates.
          </li>
          <li className="disclaimer-item">
            <span className="item-highlight">Responsible Gaming:</span> Play
            responsibly and avoid excessive gaming. Out of Gas is designed for
            fun and entertainment.
          </li>
          <li className="disclaimer-item">
            <span className="item-highlight">Privacy Policy:</span> All personal
            information and gameplay data are handled as per our Privacy Policy.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Disclamers;
