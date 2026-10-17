import React from 'react';
import { CheckCircle2, UserCheck, AlertTriangle, HelpCircle } from 'lucide-react';
import { STATUS_TYPES } from '../data/sampleLocations';

export default function StatusBadge({ status, showIcon = true, size = 'default' }) {
  const normStatus = (status || '').toLowerCase().trim();

  let config = STATUS_TYPES.UNKNOWN;
  let Icon = HelpCircle;

  if (normStatus.includes('verif')) {
    config = STATUS_TYPES.VERIFIED;
    Icon = CheckCircle2;
  } else if (normStatus.includes('user') || normStatus.includes('report')) {
    config = STATUS_TYPES.USER_REPORTED;
    Icon = UserCheck;
  } else if (normStatus.includes('recheck') || normStatus.includes('need')) {
    config = STATUS_TYPES.NEEDS_RECHECKING;
    Icon = AlertTriangle;
  }

  const paddingStyle = size === 'small' ? { padding: '2px 8px', fontSize: '0.78rem' } : {};

  return (
    <span
      className={`status-badge ${config.badgeClass}`}
      style={paddingStyle}
      title={config.description}
      aria-label={`Status: ${config.label}. ${config.description}`}
    >
      {showIcon && <Icon size={size === 'small' ? 12 : 14} aria-hidden="true" />}
      <span>{config.label}</span>
    </span>
  );
}
