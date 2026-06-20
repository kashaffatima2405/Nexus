export type DocumentStatus = 'draft' | 'in_review' | 'signed';

export interface ChamberDocument {
  id: number;
  name: string;
  type: string;
  size: string;
  lastModified: string;
  shared: boolean;
  status: DocumentStatus;
  previewUrl?: string;
  signatureDataUrl?: string;
}
