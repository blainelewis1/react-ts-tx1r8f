import React, { useState } from 'react';
import ConsentScreen from './ConsentScreen';
import FittsTask from './FittsTask';
import { Finish } from './Finish';

type StudyState = 'Consent' | 'StudyBlock1' | 'StudyBlock2' | 'Finish';

export interface FittsLog {
  timestamp: number;
  block: string;
  data: object;
}

export const StudyRouter: React.FC = () => {
  const [studyState, setStudyState] = useState<StudyState>('Consent');

  const [logs, setLogs] = useState<Array<FittsLog>>([]);

  if (studyState === 'Consent') {
    return <ConsentScreen setNextState={() => setStudyState('StudyBlock1')} />;
  } else if (studyState === 'StudyBlock1') {
    return (
      <FittsTask
        width={20}
        distance={50}
        setNextState={() => setStudyState('StudyBlock2')}
        key={studyState}
        onLog={(data: object) =>
          setLogs([
            ...logs,
            { timestamp: Date.now(), block: studyState, data: data },
          ])
        }
      />
    );
  } else if (studyState === 'StudyBlock2') {
    return (
      <FittsTask
        width={5}
        distance={90}
        setNextState={() => setStudyState('Finish')}
        key={studyState}
        onLog={(data: object) =>
          setLogs([
            ...logs,
            { timestamp: Date.now(), block: studyState, data: data },
          ])
        }
      />
    );
  } else if (studyState === 'Finish') {
    return <Finish logs={logs} />;
  }
};
