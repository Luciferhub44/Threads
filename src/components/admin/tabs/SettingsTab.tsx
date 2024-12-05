import React from 'react';
import { SettingsPanel } from '../SettingsPanel';

interface SettingsTabProps {
  onSave: (settings: any) => Promise<boolean>;
}

export const SettingsTab: React.FC<SettingsTabProps> = ({ onSave }) => {
  return (
    <SettingsPanel onSave={onSave} />
  );
};