import React from 'react';
import { Card, CardTitle } from '@eter/design-system';

export const Default = () => (
  <div style={{ padding: 24, background: '#f7f7f7' }}>
    <Card variant="default" padding="md">
      <CardTitle>Patient Overview</CardTitle>
    </Card>
  </div>
);

export const HeadingLevels = () => (
  <div style={{ padding: 24, background: '#f7f7f7', display: 'flex', flexDirection: 'column', gap: 12 }}>
    <Card variant="default" padding="md">
      <CardTitle as="h2">Diagnoses & Conditions</CardTitle>
    </Card>
    <Card variant="clinical" padding="md">
      <CardTitle as="h3">Current Medications</CardTitle>
    </Card>
  </div>
);
