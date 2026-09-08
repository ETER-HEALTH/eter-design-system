import React from 'react';
import { Card, CardTitle, CardDescription } from '@eter/design-system';

export const Default = () => (
  <div style={{ padding: 24, background: '#f7f7f7' }}>
    <Card variant="default" padding="md">
      <CardTitle>Imaging Results</CardTitle>
      <CardDescription>Chest X-ray performed Jun 26, 2026 — reviewed by Dr. Patel</CardDescription>
    </Card>
  </div>
);

export const MultiLine = () => (
  <div style={{ padding: 24, background: '#f7f7f7' }}>
    <Card variant="default" padding="md">
      <CardTitle>Care Plan</CardTitle>
      <CardDescription>
        Continue Metformin 500mg twice daily. Monitor HbA1c every 3 months. Schedule dietitian consultation within 30 days.
      </CardDescription>
    </Card>
  </div>
);
