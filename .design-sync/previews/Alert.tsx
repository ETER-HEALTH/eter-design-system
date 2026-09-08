import React from 'react';
import { Alert } from '@eter/design-system';

export const Info = () => (
  <div style={{ padding: 24, background: '#fff', display: 'flex', flexDirection: 'column', gap: 12 }}>
    <Alert variant="info" title="Appointment Reminder">
      Patient has a follow-up appointment scheduled for tomorrow at 10:00 AM.
    </Alert>
  </div>
);

export const Success = () => (
  <div style={{ padding: 24, background: '#fff' }}>
    <Alert variant="success" title="Lab Results Received">
      All panel results are within normal ranges. No action required.
    </Alert>
  </div>
);

export const Warning = () => (
  <div style={{ padding: 24, background: '#fff' }}>
    <Alert variant="warning" title="Medication Interaction">
      Potential interaction detected between Warfarin and Aspirin. Review dosage.
    </Alert>
  </div>
);

export const Error = () => (
  <div style={{ padding: 24, background: '#fff' }}>
    <Alert variant="error" title="Critical Alert">
      Patient blood pressure reading is dangerously elevated. Immediate attention required.
    </Alert>
  </div>
);

export const ClinicalWarning = () => (
  <div style={{ padding: 24, background: '#fff' }}>
    <Alert variant="clinical-warning" title="Allergy on File">
      Patient has documented penicillin allergy. Avoid beta-lactam antibiotics.
    </Alert>
  </div>
);

export const AISuggestion = () => (
  <div style={{ padding: 24, background: '#fff' }}>
    <Alert variant="ai-suggestion" title="AI Clinical Insight">
      Based on recent vitals, consider ordering a HbA1c test. Patient's glucose trend suggests early-stage diabetes risk.
    </Alert>
  </div>
);

export const WithAction = () => (
  <div style={{ padding: 24, background: '#fff', display: 'flex', flexDirection: 'column', gap: 12 }}>
    <Alert
      variant="warning"
      title="Incomplete Documentation"
      action={{ label: 'Complete now', onClick: () => {} }}
    >
      Visit notes from Jun 15 are missing required fields before billing can proceed.
    </Alert>
    <Alert
      variant="info"
      title="Care Plan Updated"
      onDismiss={() => {}}
    >
      Dr. Ramirez updated the care plan for this patient. Review the changes.
    </Alert>
  </div>
);
