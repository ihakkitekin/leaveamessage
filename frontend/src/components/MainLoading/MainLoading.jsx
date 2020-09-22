import React from 'react';
import './mainLoading.css';
import { Progress } from 'antd';

export function MainLoading() {
  return <div className="main-loading">
    <h2>LeaveAMessage</h2>
    <Progress
      strokeColor={{
        from: '#108ee9',
        to: '#87d068',
      }}
      percent={99.9}
      status="active"
    />
  </div>
}