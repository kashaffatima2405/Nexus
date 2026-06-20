import React from 'react';
import { DocumentStatus } from '../../types/documents';
import { FileEdit, Clock, CheckCircle2 } from 'lucide-react';

interface StatusBadgeProps {
  status: DocumentStatus;
}

const statusConfig: Record<DocumentStatus, { label: string; classes: string; icon: React.ReactNode }> = {
  draft: {
    label: 'Draft',
    classes: 'bg-gray-100 text-gray-700 border-gray-200',
    icon: <FileEdit size={13} />,
  },
  in_review: {
    label: 'In Review',
    classes: 'bg-accent-50 text-accent-700 border-accent-200',
    icon: <Clock size={13} />,
  },
  signed: {
    label: 'Signed',
    classes: 'bg-success-50 text-success-700 border-success-500',
    icon: <CheckCircle2 size={13} />,
  },
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const config = statusConfig[status];
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${config.classes}`}
    >
      {config.icon}
      {config.label}
    </span>
  );
};
