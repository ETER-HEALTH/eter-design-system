import React from 'react';
import { EmptyState } from '@eter/design-system';

const PlusIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M10 3v14M3 10h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const PatientIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="10" r="6" stroke="#c8c8c8" strokeWidth="1.5" />
    <path d="M4 28c0-5.523 5.373-10 12-10s12 4.477 12 10" stroke="#c8c8c8" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const WithActions = () => (
  <div style={{ background: '#fff', border: '1px solid #e1e1e1', borderRadius: 16 }}>
    <EmptyState
      icon={<PatientIcon />}
      title="No patients yet"
      description="Add your first patient to start managing care records, appointments, and clinical notes."
      primaryAction={{ label: 'Add Patient', onClick: () => {}, icon: <PlusIcon /> }}
      secondaryAction={{ label: 'Import Records', onClick: () => {} }}
    />
  </div>
);

export const SearchEmpty = () => (
  <div style={{ background: '#fff', border: '1px solid #e1e1e1', borderRadius: 16 }}>
    <EmptyState
      title="No results found"
      description={'No patients match your search for "Rodriguez". Try a different name or MRN.'}
    />
  </div>
);

export const NoIcon = () => (
  <div style={{ background: '#fff', border: '1px solid #e1e1e1', borderRadius: 16 }}>
    <EmptyState
      title="No lab results"
      description="Lab results for this patient will appear here once orders are processed."
      primaryAction={{ label: 'Order Labs', onClick: () => {} }}
    />
  </div>
);
