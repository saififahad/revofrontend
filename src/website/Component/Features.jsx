const Features = () => {
  return (
    <div>
      {" "}
      <div className="disclaimer-container">
        <h3 className="disclaimer-title">Key Features</h3>
        <ul className="disclaimer-list">
          <li className="disclaimer-item">
            <span className="item-highlight">🚗 Fast-Paced Gameplay: </span>
            Every second counts as you race against the fuel gauge.
          </li>
          <li className="disclaimer-item">
            <span className="item-highlight">
              ⛽ High Stakes, Bigger Rewards:{" "}
            </span>{" "}
            The farther you go, the bigger the payout—but will you risk it all?
          </li>
          <li className="disclaimer-item">
            <span className="item-highlight">🔥 Interactive Experience:</span> A
            real-time fuel gauge lets you track your progress and winnings.
          </li>
          <li className="disclaimer-item">
            <span className="item-highlight">🎮 Doug at the Wheel:</span> Drive
            alongside Doug, a fan-favorite character who’s as cool under
            pressure as you need to be.
          </li>
          <li className="disclaimer-item">
            <span className="item-highlight">💰 Stake, Drive, Win: </span> Place
            your Stakes, hit the gas, and cash out before it’s too late!
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Features;
