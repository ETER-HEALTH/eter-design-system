import React from 'react';
import { SidebarNavigation } from '@eter/design-system';

const HomeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M2 7.5L9 2l7 5.5V16a1 1 0 01-1 1H3a1 1 0 01-1-1V7.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);
const PatientIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <circle cx="9" cy="6" r="3.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M2 16c0-3.314 3.134-6 7-6s7 2.686 7 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
const RecordIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <rect x="3" y="2" width="12" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M6 6h6M6 9h6M6 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
const AIIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M9 1l1.8 5.4H16l-4.5 3.3 1.8 5.4L9 12l-4.3 3.1 1.8-5.4L2 6.4h5.2L9 1z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
  </svg>
);
const SettingsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <circle cx="9" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M9 1v2M9 15v2M1 9h2M15 9h2M3.22 3.22l1.41 1.41M13.37 13.37l1.41 1.41" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const navGroups = [
  {
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: <HomeIcon /> },
      { id: 'patients', label: 'Patients', icon: <PatientIcon />, badge: 3 },
      { id: 'records', label: 'Clinical Records', icon: <RecordIcon /> },
    ],
  },
  {
    label: 'Intelligence',
    items: [
      { id: 'ai', label: 'AI Insights', icon: <AIIcon />, isAI: true, isNew: true },
    ],
  },
  {
    label: 'System',
    items: [
      { id: 'settings', label: 'Settings', icon: <SettingsIcon /> },
    ],
  },
];

export const Expanded = () => (
  <div style={{ height: 480, display: 'flex' }}>
    <SidebarNavigation
      groups={navGroups}
      activeItemId="patients"
      user={{ name: 'Dr. Sarah Patel', role: 'Attending Physician' }}
    />
  </div>
);

export const Collapsed = () => (
  <div style={{ height: 480, display: 'flex' }}>
    <SidebarNavigation
      groups={navGroups}
      activeItemId="dashboard"
      collapsed
      user={{ name: 'Dr. Sarah Patel', role: 'Attending Physician' }}
    />
  </div>
);
