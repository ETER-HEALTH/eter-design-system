import React from 'react';
import { Input } from '@eter/design-system';

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10.5 10.5L13 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const Default = () => (
  <div style={{ padding: 24, background: '#fff', display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}>
    <Input label="Patient Name" placeholder="Search by name or ID" />
    <Input label="Date of Birth" placeholder="MM/DD/YYYY" type="date" />
  </div>
);

export const States = () => (
  <div style={{ padding: 24, background: '#fff', display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}>
    <Input label="MRN" placeholder="Medical record number" helperText="Enter 8-digit hospital ID" />
    <Input label="Blood Pressure" placeholder="120/80" variant="success" helperText="Within normal range" />
    <Input label="Heart Rate" placeholder="72 bpm" variant="error" errorText="Value exceeds safe threshold" />
    <Input label="Diagnosis Code" placeholder="ICD-10 code" disabled value="E11.9" />
  </div>
);

export const WithAddons = () => (
  <div style={{ padding: 24, background: '#fff', display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}>
    <Input label="Search Patients" placeholder="Name, ID, or condition" leftAddon={<SearchIcon />} />
    <Input label="Weight" placeholder="0.0" rightAddon={<span style={{ fontSize: 13, fontWeight: 600, color: '#777' }}>kg</span>} />
    <Input label="Temperature" placeholder="37.0" rightAddon={<span style={{ fontSize: 13, fontWeight: 600, color: '#777' }}>°C</span>} />
  </div>
);

export const Sizes = () => (
  <div style={{ padding: 24, background: '#fff', display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}>
    <Input inputSize="sm" placeholder="Small input" />
    <Input inputSize="md" placeholder="Medium input" />
    <Input inputSize="lg" placeholder="Large input" />
  </div>
);
