import "../Styles/ConditionsandPolicy.css";

const TemsConditions = () => {
  return (
    <div className="max-wrapper">
      <div className="wrap">
        <h1 className="common-heading">Terms and Conditions</h1>
        <p className="common-para">
          <span>Effective Date</span>...
        </p>
        <p className="common-para w">
          These Terms and Conditions govern your use of Revo Play and the Out of
          Gas game. By accessing or using our platform, you agree to these terms
          in full.
        </p>
        <ol className="common-list">
          <li className="common-list-heading">
            User Eligibility
            <ul>
              <li className="common-list-info">
                You must be 18 years or older to use Revo Play
              </li>
              <li className="common-list-info">
                Use of the platform is restricted where gambling or similar
                games are prohibited.
              </li>
            </ul>
          </li>
          <li className="common-list-heading">
            Account Registration
            <ul>
              <li className="common-list-info">
                Users must provide accurate information during registration
              </li>
              <li className="common-list-info">
                You are responsible for maintaining the security of your account
                and wallet.
              </li>
            </ul>
          </li>
          <li className="common-list-heading">
            Gameplay Rules
            <ul>
              <li className="common-list-info">
                Staking amounts, multipliers, and winnings are displayed
                transparently during each round.
              </li>
              <li className="common-list-info">
                Once a Stake is placed, it cannot be modified, canceled, or
                refunded.
              </li>
              <li className="common-list-info">
                Winnings are determined based on when you cash out before the
                car runs out of gas.
              </li>
            </ul>
          </li>
          <li className="common-list-heading">
            Rewards and Referrals
            <ul>
              <li className="common-list-info">
                Rewards and referral bonuses are subject to platform discretion
                and availability
              </li>
              <li className="common-list-info">
                Fraudulent activities, including fake referrals or account
                manipulation, may result in suspension.
              </li>
            </ul>
          </li>
          <li className="common-list-heading">
            Responsible Gaming
            <ul>
              <li className="common-list-info">
                Play responsibly and within your means.
              </li>
              <li className="common-list-info">
                Revo Play reserves the right to limit or suspend accounts
                showing signs of irresponsible gaming behavior.
              </li>
            </ul>
          </li>
          <li className="common-list-heading">
            Platform Updates and Termination
            <ul>
              <li className="common-list-info">
                We may update game mechanics, rewards, or terms at any time
              </li>
              <li className="common-list-info">
                Revo Play reserves the right to terminate accounts violating
                these terms.
              </li>
            </ul>
          </li>
          <li className="common-list-heading">
            Disclaimer of Liability
            <ul>
              <li className="common-list-info">
                All gameplay outcomes are random and final. We are not liable
                for any losses incurred during gameplay.
              </li>
              <li className="common-list-info">
                Revo Play is provided "as is," with no guarantees regarding
                uninterrupted access or system performance.
              </li>
            </ul>
          </li>
          <li className="common-list-heading">
            Governing Law
            <p className="common-para">
              These terms are governed by the laws of [Insert Applicable
              Jurisdiction].
            </p>
          </li>
          <li className="common-list-heading">
            Changes to Terms
            <p className="common-para">
              We reserve the right to modify these Terms and Conditions.
              Continued use of the platform indicates acceptance of the updated
              terms.
            </p>
          </li>
          <li className="common-list-heading">
            Contact Us
            <p className="common-para">
              For questions or support regarding these Terms, reach us at:
              <span className="bold">Email: support@revoridegame.com</span>
            </p>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default TemsConditions;
