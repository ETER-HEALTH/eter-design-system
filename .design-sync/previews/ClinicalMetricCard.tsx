import React from 'react';
import { ClinicalMetricCard } from '@eter/design-system';

const HeartIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 13.5S2 9.5 2 5.5a3.5 3.5 0 017 0 3.5 3.5 0 017 0C16 9.5 8 13.5 8 13.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

const ThermometerIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 1v8M5.5 12a2.5 2.5 0 005 0 2.5 2.5 0 00-2.5-2.5V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const Default = () => (
  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, padding: 24, background: '#f7f7f7' }}>
    <ClinicalMetricCard title="Heart Rate" value={72} unit="bpm" variant="default" trend="stable" trendValue="Stable" icon={<HeartIcon />} />
    <ClinicalMetricCard title="Blood Pressure" value="118/76" unit="mmHg" variant="default" trend="down" trendValue="−4 mmHg this week" />
  </div>
);

export const Abnormal = () => (
  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, padding: 24, background: '#f7f7f7' }}>
    <ClinicalMetricCard title="Blood Glucose" value={185} unit="mg/dL" variant="abnormal" trend="up" trendValue="+22 since yesterday" description="Target range: 80–130 mg/dL fasting" />
    <ClinicalMetricCard title="Creatinine" value="1.8" unit="mg/dL" variant="abnormal" trend="up" trendValue="↑ from 1.4 last week" />
  </div>
);

export const Critical = () => (
  <div style={{ padding: 24, background: '#f7f7f7' }}>
    <ClinicalMetricCard
      title="Potassium"
      value="6.2"
      unit="mEq/L"
      variant="critical"
      trend="up"
      trendValue="↑ critically high"
      description="Normal: 3.5–5.0 mEq/L · Alert sent to attending physician"
    />
  </div>
);

export const Improving = () => (
  <div style={{ padding: 24, background: '#f7f7f7' }}>
    <ClinicalMetricCard
      title="HbA1c"
      value="6.8"
      unit="%"
      variant="improving"
      trend="down"
      trendValue="↓ from 7.9% (3 months ago)"
      description="Diabetes management improving. Maintain current regimen."
    />
  </div>
);

export const AIInsight = () => (
  <div style={{ padding: 24, background: '#f7f7f7' }}>
    <ClinicalMetricCard
      title="Risk Score"
      value="34"
      unit="/ 100"
      variant="ai-insight"
      trend="down"
      trendValue="↓ 12 points this month"
      description="AI model predicts 12% 30-day readmission risk based on vitals trend."
      icon={<span style={{ fontSize: 12 }}>✦</span>}
    />
  </div>
);
