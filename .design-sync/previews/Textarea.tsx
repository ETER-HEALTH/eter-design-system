import React from 'react';
import { Textarea } from '@eter/design-system';

export const Default = () => (
  <div style={{ padding: 24, background: '#fff', display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 480 }}>
    <Textarea
      label="Clinical Notes"
      placeholder="Document findings, observations, and plan of care..."
      helperText="These notes will be attached to the patient's visit record."
    />
  </div>
);

export const States = () => (
  <div style={{ padding: 24, background: '#fff', display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 480 }}>
    <Textarea
      label="Chief Complaint"
      defaultValue="Patient presents with persistent chest pain radiating to the left arm, onset 2 hours ago. Reports shortness of breath and mild diaphoresis."
      variant="success"
      helperText="Documentation complete"
    />
    <Textarea
      label="Diagnosis"
      placeholder="Enter primary and secondary diagnoses..."
      variant="error"
      errorText="This field is required before saving the encounter"
    />
    <Textarea
      label="Discharge Summary"
      defaultValue="Patient discharged in stable condition."
      disabled
    />
  </div>
);
