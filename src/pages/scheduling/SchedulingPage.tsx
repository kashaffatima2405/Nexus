import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Clock, Check, X, Plus, Calendar as CalendarIcon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { mockTimeSlots, mockMeetingRequests } from '../../data/schedulingData';
import { TimeSlot, MeetingRequest } from '../../types/scheduling';

type CalendarValue = Date | null;

export const SchedulingPage: React.FC = () => {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState<CalendarValue>(new Date());
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>(mockTimeSlots);
  const [meetingRequests, setMeetingRequests] = useState<MeetingRequest[]>(mockMeetingRequests);
  const [newSlotStart, setNewSlotStart] = useState('09:00');
  const [newSlotEnd, setNewSlotEnd] = useState('09:30');

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const selectedDateStr = selectedDate ? formatDate(selectedDate) : '';

  const slotsForSelectedDate = timeSlots.filter(
    (slot) => slot.date === selectedDateStr
  );

  const handleAddSlot = () => {
    if (!selectedDate) return;
    const newSlot: TimeSlot = {
      id: `ts-${Date.now()}`,
      date: selectedDateStr,
      startTime: newSlotStart,
      endTime: newSlotEnd,
      isAvailable: true,
    };
    setTimeSlots([...timeSlots, newSlot]);
  };

  const handleRemoveSlot = (id: string) => {
    setTimeSlots(timeSlots.filter((slot) => slot.id !== id));
  };

  const handleAcceptRequest = (id: string) => {
    setMeetingRequests(
      meetingRequests.map((req) =>
        req.id === id ? { ...req, status: 'accepted' as const } : req
      )
    );
  };

  const handleDeclineRequest = (id: string) => {
    setMeetingRequests(
      meetingRequests.map((req) =>
        req.id === id ? { ...req, status: 'declined' as const } : req
      )
    );
  };

  const confirmedMeetings = meetingRequests.filter((r) => r.status === 'accepted');
  const pendingRequests = meetingRequests.filter((r) => r.status === 'pending');

  const isEntrepreneur = user?.role === 'entrepreneur';

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 animate-fade-in">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <CalendarIcon className="text-primary-600" size={26} />
          Meeting Scheduler
        </h1>
        <p className="text-gray-600 mt-1">
          {isEntrepreneur
            ? 'Manage your availability and respond to meeting requests from investors.'
            : 'View availability and request meetings with entrepreneurs.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Column */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
            <h2 className="text-sm font-semibold text-gray-700 mb-3">Select a date</h2>
            <Calendar
              onChange={(value) => setSelectedDate(value as CalendarValue)}
              value={selectedDate}
              className="nexus-calendar"
            />
          </div>

          {/* Add Availability (Entrepreneur only) */}
          {isEntrepreneur && (
            <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm mt-4">
              <h2 className="text-sm font-semibold text-gray-700 mb-3">
                Add availability for {selectedDateStr}
              </h2>
              <div className="flex items-center gap-2">
                <input
                  type="time"
                  value={newSlotStart}
                  onChange={(e) => setNewSlotStart(e.target.value)}
                  className="border border-gray-300 rounded-md px-2 py-1.5 text-sm flex-1"
                />
                <span className="text-gray-400 text-sm">to</span>
                <input
                  type="time"
                  value={newSlotEnd}
                  onChange={(e) => setNewSlotEnd(e.target.value)}
                  className="border border-gray-300 rounded-md px-2 py-1.5 text-sm flex-1"
                />
              </div>
              <button
                onClick={handleAddSlot}
                className="mt-3 w-full flex items-center justify-center gap-1.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium py-2 rounded-md transition-colors"
              >
                <Plus size={16} />
                Add Slot
              </button>
            </div>
          )}
        </div>

        {/* Right Column: Slots + Requests + Confirmed */}
        <div className="lg:col-span-2 space-y-6">
          {/* Available Slots for selected date */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
            <h2 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <Clock size={16} className="text-primary-600" />
              Availability on {selectedDateStr}
            </h2>
            {slotsForSelectedDate.length === 0 ? (
              <p className="text-sm text-gray-400">No time slots set for this date.</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {slotsForSelectedDate.map((slot) => (
                  <div
                    key={slot.id}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium border flex items-center gap-2 ${
                      slot.isAvailable
                        ? 'bg-primary-50 text-primary-700 border-primary-200'
                        : 'bg-gray-100 text-gray-400 border-gray-200'
                    }`}
                  >
                    {slot.startTime} - {slot.endTime}
                    {isEntrepreneur && (
                      <button
                        onClick={() => handleRemoveSlot(slot.id)}
                        className="text-gray-400 hover:text-error-500"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Pending Meeting Requests */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
            <h2 className="text-sm font-semibold text-gray-700 mb-3">
              Pending Meeting Requests ({pendingRequests.length})
            </h2>
            {pendingRequests.length === 0 ? (
              <p className="text-sm text-gray-400">No pending requests.</p>
            ) : (
              <div className="space-y-3">
                {pendingRequests.map((req) => (
                  <div
                    key={req.id}
                    className="flex items-center justify-between p-3 bg-accent-50 border border-accent-200 rounded-md"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {req.fromUserName}
                      </p>
                      <p className="text-xs text-gray-600 mt-0.5">
                        {req.date} &bull; {req.startTime} - {req.endTime}
                      </p>
                      {req.message && (
                        <p className="text-xs text-gray-500 mt-1 italic">"{req.message}"</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleAcceptRequest(req.id)}
                        className="p-2 bg-success-500 hover:bg-success-700 text-white rounded-md transition-colors"
                        title="Accept"
                      >
                        <Check size={16} />
                      </button>
                      <button
                        onClick={() => handleDeclineRequest(req.id)}
                        className="p-2 bg-error-500 hover:bg-error-700 text-white rounded-md transition-colors"
                        title="Decline"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Confirmed Meetings */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
            <h2 className="text-sm font-semibold text-gray-700 mb-3">
              Confirmed Meetings ({confirmedMeetings.length})
            </h2>
            {confirmedMeetings.length === 0 ? (
              <p className="text-sm text-gray-400">No confirmed meetings yet.</p>
            ) : (
              <div className="space-y-2">
                {confirmedMeetings.map((meeting) => (
                  <div
                    key={meeting.id}
                    className="flex items-center justify-between p-3 bg-secondary-50 border border-secondary-200 rounded-md"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Meeting with {meeting.fromUserName}
                      </p>
                      <p className="text-xs text-gray-600 mt-0.5">
                        {meeting.date} &bull; {meeting.startTime} - {meeting.endTime}
                      </p>
                    </div>
                    <span className="text-xs font-semibold bg-secondary-600 text-white px-2.5 py-1 rounded-full">
                      Confirmed
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchedulingPage;
