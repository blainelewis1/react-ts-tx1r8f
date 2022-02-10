import { range } from 'lodash';
import React, { useState } from 'react';

const FittsTask: React.FunctionComponent<{
  numBubbles?: number;
  width: number;
  distance: number;
  setNextState: () => void;
  onLog: (data: object) => void;
}> = ({ numBubbles = 9, width, distance, setNextState, onLog }) => {
  console.assert(
    numBubbles % 2 === 1,
    'numBubbles must be odd, otherwise the distances are not equal.'
  );

  const [selectedCircle, setSelectedCircle] = useState(0);
  const [clicks, setClicks] = useState(0);

  return (
    <svg viewBox="-50 -50 100 100">
      {range(numBubbles).map((bubble, i) => {
        let theta = ((Math.PI * 2) / numBubbles) * i;

        return (
          <circle
            onClick={() => {
              if (i === selectedCircle) {
                setSelectedCircle(
                  (selectedCircle) =>
                    (selectedCircle + Math.floor(numBubbles / 2)) % numBubbles
                );
                onLog({ theta });

                setClicks((clicks) => clicks + 1);
                if (clicks + 1 > numBubbles) {
                  setNextState();
                }
              }
            }}
            r={width / 2}
            cx={(Math.cos(theta) * distance) / 2}
            cy={(Math.sin(theta) * distance) / 2}
            fill={selectedCircle === i ? 'red' : 'lightgrey'}
          />
        );
      })}
    </svg>
  );
};

export default FittsTask;
