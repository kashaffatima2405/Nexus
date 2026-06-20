import React from 'react';
import { X, FileText, Download } from 'lucide-react';
import { ChamberDocument } from '../../types/documents';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from './StatusBadge';

interface PreviewModalProps {
  document: ChamberDocument;
  onClose: () => void;
}

export const PreviewModal: React.FC<PreviewModalProps> = ({ document, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-50 rounded-lg">
              <FileText size={20} className="text-primary-600" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-900">{document.name}</h3>
              <p className="text-xs text-gray-500">{document.type} &bull; {document.size}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-md hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body — mock preview */}
        <div className="flex-1 overflow-y-auto bg-gray-100 p-6 flex flex-col items-center">
          <div className="bg-white shadow-md rounded-sm w-full max-w-md aspect-[3/4] p-6 flex flex-col">
            <div className="h-3 w-2/3 bg-gray-200 rounded mb-3"></div>
            <div className="h-2 w-full bg-gray-100 rounded mb-2"></div>
            <div className="h-2 w-full bg-gray-100 rounded mb-2"></div>
            <div className="h-2 w-5/6 bg-gray-100 rounded mb-4"></div>
            <div className="h-2 w-full bg-gray-100 rounded mb-2"></div>
            <div className="h-2 w-full bg-gray-100 rounded mb-2"></div>
            <div className="h-2 w-3/4 bg-gray-100 rounded mb-4"></div>
            <div className="h-2 w-full bg-gray-100 rounded mb-2"></div>
            <div className="h-2 w-2/3 bg-gray-100 rounded mb-6"></div>

            {document.signatureDataUrl && (
              <div className="mt-auto border-t border-gray-200 pt-3">
                <p className="text-[10px] text-gray-400 mb-1">Signed by:</p>
                <img
                  src={document.signatureDataUrl}
                  alt="Signature"
                  className="h-12 object-contain"
                />
              </div>
            )}
          </div>
          <p className="text-xs text-gray-400 mt-4">Mock preview — actual file rendering not included in this demo.</p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-4 border-t border-gray-200">
          <StatusBadge status={document.status} />
          <Button size="sm" leftIcon={<Download size={16} />}>
            Download
          </Button>
        </div>
      </div>
    </div>
  );
};
