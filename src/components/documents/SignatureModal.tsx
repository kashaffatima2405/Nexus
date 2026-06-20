import React, { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { X, RotateCcw, Check } from 'lucide-react';
import { Button } from '../../components/ui/Button';

interface SignatureModalProps {
  documentName: string;
  onClose: () => void;
  onSign: (signatureDataUrl: string) => void;
}

export const SignatureModal: React.FC<SignatureModalProps> = ({
  documentName,
  onClose,
  onSign,
}) => {
  const sigCanvasRef = useRef<SignatureCanvas>(null);
  const [isEmpty, setIsEmpty] = useState(true);

  const handleClear = () => {
    sigCanvasRef.current?.clear();
    setIsEmpty(true);
  };

  const handleConfirm = () => {
    if (sigCanvasRef.current && !sigCanvasRef.current.isEmpty()) {
      const dataUrl = sigCanvasRef.current.getCanvas().toDataURL('image/png');
      onSign(dataUrl);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <div>
            <h3 className="text-base font-semibold text-gray-900">Add Your Signature</h3>
            <p className="text-xs text-gray-500 mt-0.5">Signing: {documentName}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-md hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Signature Pad */}
        <div className="p-5">
          <p className="text-sm text-gray-600 mb-3">
            Draw your signature in the box below using your mouse or touchscreen.
          </p>
          <div className="border-2 border-dashed border-gray-300 rounded-md bg-gray-50">
            <SignatureCanvas
              ref={sigCanvasRef}
              penColor="#1D4ED8"
              canvasProps={{
                width: 460,
                height: 180,
                className: 'rounded-md w-full',
              }}
              onBegin={() => setIsEmpty(false)}
            />
          </div>
          <p className="text-xs text-gray-400 mt-2">
            This is a visual mockup for demonstration purposes only and does not constitute a legally binding signature.
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-4 border-t border-gray-200 bg-gray-50">
          <button
            onClick={handleClear}
            className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 px-3 py-1.5 rounded-md hover:bg-gray-200 transition-colors"
          >
            <RotateCcw size={15} />
            Clear
          </button>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button size="sm" leftIcon={<Check size={16} />} onClick={handleConfirm}>
              Confirm Signature
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
