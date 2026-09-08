import React from 'react';
import { Select } from '@eter/design-system';

const departmentOptions = [
  { value: 'cardiology', label: 'Cardiology' },
  { value: 'neurology', label: 'Neurology' },
  { value: 'oncology', label: 'Oncology' },
  { value: 'pediatrics', label: 'Pediatrics' },
  { value: 'emergency', label: 'Emergency Medicine' },
];

const statusOptions = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'scheduled', label: 'Scheduled' },
  { value: 'discharged', label: 'Discharged' },
];

export const Default = () => (
  <div style={{ padding: 24, background: '#fff', display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}>
    <Select
      label="Department"
      placeholder="Select department"
      options={departmentOptions}
    />
    <Select
      label="Patient Status"
      options={statusOptions}
    />
  </div>
);

export const States = () => (
  <div style={{ padding: 24, background: '#fff', display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}>
    <Select
      label="Priority"
      options={[{ value: 'urgent', label: 'Urgent' }, { value: 'routine', label: 'Routine' }]}
      variant="error"
      errorText="Selection is required"
    />
    <Select
      label="Attending Physician"
      options={[{ value: 'dr-patel', label: 'Dr. Patel' }]}
      variant="success"
      helperText="Assigned to your care team"
    />
    <Select
      label="Room"
      options={[{ value: '4b', label: '4B — Reserved' }]}
      disabled
    />
  </div>
);
