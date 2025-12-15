import React from 'react';

export const CheckIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M16.7 5.3a1 1 0 010 1.4l-8 8a1 1 0 01-1.4 0l-4-4a1 1 0 111.4-1.4L8 12.58l7.3-7.3a1 1 0 011.4 0z" fill="currentColor"/>
  </svg>
);

export const ErrorIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 5a1 1 0 012 0v5a1 1 0 01-2 0V5zm1 9a1 1 0 100-2 1 1 0 000 2z" fill="currentColor"/>
  </svg>
);

export const WarningIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" fill="currentColor"/>
  </svg>
);

export const InfoIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="8" fill="currentColor" opacity="0.2"/>
    <path d="M9 9a1 1 0 012 0v5a1 1 0 01-2 0V9zm1-4a1 1 0 100 2 1 1 0 000-2z" fill="currentColor"/>
  </svg>
);

export const CloseIcon: React.FC = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M13.5 4.5l-9 9m0-9l9 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);
