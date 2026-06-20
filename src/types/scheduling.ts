export interface TimeSlot {
  id: string;
  date: string;       // ISO date string e.g. "2026-06-25"
  startTime: string;  // e.g. "10:00"
  endTime: string;    // e.g. "10:30"
  isAvailable: boolean;
}

export interface MeetingRequest {
  id: string;
  fromUserId: string;
  fromUserName: string;
  toUserId: string;
  toUserName: string;
  date: string;
  startTime: string;
  endTime: string;
  status: 'pending' | 'accepted' | 'declined';
  message?: string;
  createdAt: string;
}
