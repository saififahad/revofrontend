import React, { useEffect } from 'react';
import '../../../styles/main.css'
import zero from '../../../../assets/wingo/images/n0.png'
import one from '../../../../assets/wingo/images/n1.png'
import two from '../../../../assets/wingo/images/n2.png'
import three from '../../../../assets/wingo/images/n3.png'
import four from '../../../../assets/wingo/images/n4.png'
import five from '../../../../assets/wingo/images/n5.png'
import six from '../../../../assets/wingo/images/n6.png'
import seven from '../../../../assets/wingo/images/n7.png'
import eight from '../../../../assets/wingo/images/n8.png'
import nine from '../../../../assets/wingo/images/n9.png'


const imageUrls = [
  zero,
  one,
  two,
  three,
  four,
  five,
  six,
  seven,
  eight,
  nine
];

const themes = {
  green: { background: 'green', text: 'white', button: 'darkgreen' },
  red: { background: 'red', text: 'white', button: 'darkred' },
  gradient_5: { background: 'linear-gradient(167deg, purple 26%, green 8%)', text: 'white', button: 'purple' },
  gradient_0: { background: 'linear-gradient(167deg, red 26%, purple 8%)', text: 'white', button: 'purple' }
};

const BettingNumC = ({ onButtonClick }) => {
  useEffect(() => {
    const handleAnimation = (event) => {
      const randomNumber = event.detail;
      const animateIcons = async () => {
        for (let i = 0; i < 10; i++) {
          onButtonClick(themes.green, i); // Default to green for animation
          await new Promise(resolve => setTimeout(resolve, 100)); // Wait 100ms before animating next icon
        }
        onButtonClick(themes.green, randomNumber); // Set final color
      };

      animateIcons();
    };

    window.addEventListener('animateIcons', handleAnimation);

    return () => {
      window.removeEventListener('animateIcons', handleAnimation);
    };
  }, [onButtonClick]);

  return (
    <div className="Betting__C-numC">
      {imageUrls.map((url, i) => (
        <div
          key={i}
          className="Betting__C-numC-item"
          style={{ backgroundImage: `url(${url})` }}
          onClick={() => {
            let theme;
            if (i === 0) {
              theme = themes.gradient_0;
              // console.log("this 0: ",themes.gradient_0)
            }else if(i === 5){
              theme = themes.gradient_5;
            } else if ([1, 3, 7, 9].includes(i)) {
              theme = themes.green;
            } else if ([2, 4, 6, 8].includes(i)) {
              theme = themes.red;
            } else {
              theme = themes.gradient;
            }
            onButtonClick(theme, i);
          }}
        >
        </div>
      ))}
    </div>
  );
};

export default BettingNumC;

