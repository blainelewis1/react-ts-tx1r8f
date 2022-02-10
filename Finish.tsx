import React from 'react';
import { FittsLog } from './StudyRouter';
import { parse } from 'json2csv';

export const Finish: React.FC<{ logs: Array<FittsLog> }> = ({ logs }) => {
  const csv = parse(
    logs.map((log) => {
      const newLog = { ...log };
      const data = log.data;
      delete newLog.data;

      return { ...newLog, ...data };
    })
  );

  return (
    <div>
      <span> Thank you for using </span>{' '}
      <a
        href={`data:text/plain;charset=utf-8,${encodeURIComponent(csv)}`}
        download={`${new Date().getTime()}.csv`}
      >
        Download data
      </a>
    </div>
  );
};
