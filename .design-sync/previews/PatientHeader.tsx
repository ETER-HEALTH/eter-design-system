import React from 'react';
import { PatientHeader } from '@eter/design-system';

export const Active = () => (
  <div style={{ padding: 24, background: '#f7f7f7' }}>
    <PatientHeader
      name="Elena Rodriguez"
      age={54}
      sex="Female"
      patientId="MRN-2847163"
      lastVisit="Jun 20, 2026"
      status="active"
      onPrimaryAction={() => {}}
      onSecondaryAction={() => {}}
    />
  </div>
);

export const Critical = () => (
  <div style={{ padding: 24, background: '#f7f7f7' }}>
    <PatientHeader
      name="James Thornton"
      age={71}
      sex="Male"
      patientId="MRN-1039284"
      lastVisit="Jun 28, 2026"
      status="critical"
      primaryActionLabel="Emergency Protocol"
      onPrimaryAction={() => {}}
    />
  </div>
);

export const Statuses = () => (
  <div style={{ padding: 24, background: '#f7f7f7', display: 'flex', flexDirection: 'column', gap: 12 }}>
    <PatientHeader name="Maria Chen" age={38} sex="Female" patientId="MRN-5821047" status="active" />
    <PatientHeader name="David Okafor" age={62} sex="Male" patientId="MRN-7634921" status="scheduled" />
    <PatientHeader name="Ruth Kapoor" age={45} sex="Female" patientId="MRN-3019857" status="discharged" />
  </div>
);
