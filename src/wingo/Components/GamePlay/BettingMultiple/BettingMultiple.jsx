import React from 'react';
import '../../../styles/main.css'
const BettingMultiple = ({ activeMultiplier, setActiveMultiplier, onRandomClick }) => {
  return (
    <div className="Betting__C-multiple">
      <div className="Betting__C-multiple-l" onClick={onRandomClick}>Random</div>
      {[1, 5, 10, 20, 50, 100].map(multiplier => (
        <div
          key={multiplier}
          className={`Betting__C-multiple-r ${activeMultiplier === multiplier ? 'setactive' : ''}`}
          onClick={() => setActiveMultiplier(multiplier)}
        >
          X{multiplier}
        </div>
      ))}
    </div>
  );
};

export default BettingMultiple;
