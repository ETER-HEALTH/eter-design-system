import React from 'react';
import { PageHeader, Tabs } from '@eter/design-system';

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 2v8M5 7l3 3 3-3M2 13h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Simple = () => (
  <div style={{ background: '#f7f7f7' }}>
    <PageHeader
      title="Patients"
      description="View and manage all patients in your care."
      primaryAction={{ label: 'Add Patient', onClick: () => {}, icon: <PlusIcon /> }}
      secondaryAction={{ label: 'Export', onClick: () => {}, icon: <DownloadIcon /> }}
    />
  </div>
);

export const WithBreadcrumbs = () => (
  <div style={{ background: '#f7f7f7' }}>
    <PageHeader
      title="Elena Rodriguez"
      description="Patient record · MRN-2847163"
      breadcrumbs={[
        { label: 'Patients', onClick: () => {} },
        { label: 'Elena Rodriguez' },
      ]}
      primaryAction={{ label: 'Open Record', onClick: () => {} }}
    />
  </div>
);

export const WithTabs = () => (
  <div style={{ background: '#f7f7f7' }}>
    <PageHeader
      eyebrow="Clinical Dashboard"
      title="Overview"
      primaryAction={{ label: 'New Encounter', onClick: () => {}, icon: <PlusIcon /> }}
      tabs={
        <Tabs
          tabs={[
            { id: 'summary', label: 'Summary' },
            { id: 'vitals', label: 'Vitals' },
            { id: 'labs', label: 'Lab Results', badge: 2 },
            { id: 'meds', label: 'Medications' },
          ]}
          variant="underline"
        />
      }
    />
  </div>
);
