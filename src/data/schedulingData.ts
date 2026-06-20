import { TimeSlot, MeetingRequest } from '../types/scheduling';

export const mockTimeSlots: TimeSlot[] = [
  { id: 'ts1', date: '2026-06-22', startTime: '10:00', endTime: '10:30', isAvailable: true },
  { id: 'ts2', date: '2026-06-22', startTime: '11:00', endTime: '11:30', isAvailable: true },
  { id: 'ts3', date: '2026-06-23', startTime: '14:00', endTime: '14:30', isAvailable: true },
  { id: 'ts4', date: '2026-06-24', startTime: '09:00', endTime: '09:30', isAvailable: false },
];

export const mockMeetingRequests: MeetingRequest[] = [
  {
    id: 'mr1',
    fromUserId: 'investor-1',
    fromUserName: 'Michael Rodriguez',
    toUserId: 'entrepreneur-1',
    toUserName: 'Sarah Johnson',
    date: '2026-06-23',
    startTime: '14:00',
    endTime: '14:30',
    status: 'pending',
    message: "Would love to discuss your funding round.",
    createdAt: '2026-06-20T09:00:00Z',
  },
  {
    id: 'mr2',
    fromUserId: 'investor-2',
    fromUserName: 'Lisa Wang',
    toUserId: 'entrepreneur-1',
    toUserName: 'Sarah Johnson',
    date: '2026-06-25',
    startTime: '11:00',
    endTime: '11:30',
    status: 'accepted',
    message: "Looking forward to our chat.",
    createdAt: '2026-06-18T09:00:00Z',
  },
];
