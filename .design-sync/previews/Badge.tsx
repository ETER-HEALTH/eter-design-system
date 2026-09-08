import React from 'react';
import { Badge } from '@eter/design-system';

export const Variants = () => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, padding: 24, background: '#fff', alignItems: 'center' }}>
    <Badge variant="neutral">Neutral</Badge>
    <Badge variant="primary">Primary</Badge>
    <Badge variant="accent">Accent</Badge>
    <Badge variant="success">Success</Badge>
    <Badge variant="warning">Warning</Badge>
    <Badge variant="error">Error</Badge>
    <Badge variant="ai-insight">AI Insight</Badge>
  </div>
);

export const WithDots = () => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, padding: 24, background: '#fff', alignItems: 'center' }}>
    <Badge variant="success" dot>Active</Badge>
    <Badge variant="error" dot>Critical</Badge>
    <Badge variant="warning" dot>Abnormal</Badge>
    <Badge variant="neutral" dot>Inactive</Badge>
    <Badge variant="primary" dot>Scheduled</Badge>
  </div>
);

export const Sizes = () => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, padding: 24, background: '#fff', alignItems: 'center' }}>
    <Badge variant="primary" size="sm">Small</Badge>
    <Badge variant="primary" size="md">Medium</Badge>
    <Badge variant="success" size="sm" dot>Active · sm</Badge>
    <Badge variant="success" size="md" dot>Active · md</Badge>
  </div>
);
