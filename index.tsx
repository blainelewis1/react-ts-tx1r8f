import { render } from 'react-dom';
import { StudyRouter } from './StudyRouter';
import React from 'react';

export default function App() {
  return <StudyRouter />;
}

render(<App />, document.getElementById('root'));
