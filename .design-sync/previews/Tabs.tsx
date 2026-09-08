import React from 'react';
import { Tabs } from '@eter/design-system';

const clinicalTabs = [
  { id: 'summary', label: 'Summary' },
  { id: 'vitals', label: 'Vitals' },
  { id: 'labs', label: 'Lab Results', badge: 2 },
  { id: 'meds', label: 'Medications' },
  { id: 'imaging', label: 'Imaging', disabled: true },
];

export const Underline = () => (
  <div style={{ padding: 24, background: '#fff' }}>
    <Tabs tabs={clinicalTabs} variant="underline" activeTab="vitals" />
  </div>
);

export const Pill = () => (
  <div style={{ padding: 24, background: '#f7f7f7' }}>
    <Tabs
      tabs={[
        { id: 'day', label: 'Day' },
        { id: 'week', label: 'Week' },
        { id: 'month', label: 'Month' },
        { id: 'year', label: 'Year' },
      ]}
      variant="pill"
      activeTab="week"
    />
  </div>
);

export const Segmented = () => (
  <div style={{ padding: 24, background: '#f7f7f7' }}>
    <Tabs
      tabs={[
        { id: 'all', label: 'All Patients' },
        { id: 'active', label: 'Active' },
        { id: 'critical', label: 'Critical' },
      ]}
      variant="segmented"
      activeTab="active"
    />
  </div>
);
