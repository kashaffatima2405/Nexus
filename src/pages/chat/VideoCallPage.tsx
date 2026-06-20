import React, { useEffect, useRef, useState } from 'react';
import {
  Mic, MicOff, Video, VideoOff, PhoneOff, MonitorUp, MonitorX,
  Users, MessageSquare, Phone,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const VideoCallPage: React.FC = () => {
  const { user } = useAuth();

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const screenShareRef = useRef<HTMLVideoElement>(null);

  const [callState, setCallState] = useState<'idle' | 'connecting' | 'active' | 'ended'>('idle');
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [screenStream, setScreenStream] = useState<MediaStream | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // Call duration timer
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (callState === 'active') {
      interval = setInterval(() => setCallDuration((d) => d + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [callState]);

  const formatDuration = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const startCall = async () => {
    setError(null);
    setCallState('connecting');
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setStream(mediaStream);
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = mediaStream;
      }
      // Simulate connecting delay before "joining" the call
      setTimeout(() => setCallState('active'), 1200);
    } catch (err) {
      setError(
        'Could not access camera/microphone. Please allow permissions and try again.'
      );
      setCallState('idle');
    }
  };

  const endCall = () => {
    stream?.getTracks().forEach((track) => track.stop());
    screenStream?.getTracks().forEach((track) => track.stop());
    setStream(null);
    setScreenStream(null);
    setIsScreenSharing(false);
    setCallState('ended');
    setCallDuration(0);
  };

  const toggleMute = () => {
    if (!stream) return;
    stream.getAudioTracks().forEach((track) => (track.enabled = isMuted));
    setIsMuted(!isMuted);
  };

  const toggleVideo = () => {
    if (!stream) return;
    stream.getVideoTracks().forEach((track) => (track.enabled = isVideoOff));
    setIsVideoOff(!isVideoOff);
  };

  const toggleScreenShare = async () => {
    if (isScreenSharing) {
      screenStream?.getTracks().forEach((track) => track.stop());
      setScreenStream(null);
      setIsScreenSharing(false);
      return;
    }
    try {
      const display = await navigator.mediaDevices.getDisplayMedia({ video: true });
      setScreenStream(display);
      if (screenShareRef.current) {
        screenShareRef.current.srcObject = display;
      }
      setIsScreenSharing(true);
      // Auto-stop if user ends sharing from browser's native control
      display.getVideoTracks()[0].onended = () => {
        setScreenStream(null);
        setIsScreenSharing(false);
      };
    } catch {
      // user cancelled the screen share picker — no action needed
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stream?.getTracks().forEach((track) => track.stop());
      screenStream?.getTracks().forEach((track) => track.stop());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const otherPartyName =
    user?.role === 'entrepreneur' ? 'Michael Rodriguez (Investor)' : 'Sarah Johnson (Entrepreneur)';

  // ---------- IDLE / PRE-CALL SCREEN ----------
  if (callState === 'idle' || callState === 'ended') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center animate-fade-in">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-10">
          <div className="w-20 h-20 rounded-full bg-primary-50 flex items-center justify-center mx-auto mb-5">
            <Phone className="text-primary-600" size={32} />
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-1">
            {callState === 'ended' ? 'Call Ended' : 'Start a Video Meeting'}
          </h1>
          <p className="text-gray-500 text-sm mb-6">
            {callState === 'ended'
              ? 'Your call has ended. You can start a new one anytime.'
              : `Connect face-to-face with ${otherPartyName}`}
          </p>

          {error && (
            <div className="bg-error-50 text-error-700 text-sm rounded-md p-3 mb-5 border border-error-500/30">
              {error}
            </div>
          )}

          <button
            onClick={startCall}
            className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-medium px-6 py-3 rounded-md transition-colors"
          >
            <Video size={18} />
            {callState === 'ended' ? 'Start New Call' : 'Start Call'}
          </button>
          <p className="text-xs text-gray-400 mt-4">
            Your browser will ask for camera and microphone permission.
          </p>
        </div>
      </div>
    );
  }

  // ---------- CONNECTING SCREEN ----------
  if (callState === 'connecting') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center animate-fade-in">
        <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-5"></div>
        <p className="text-gray-600 font-medium">Connecting to call...</p>
      </div>
    );
  }

  // ---------- ACTIVE CALL SCREEN ----------
  return (
    <div className="max-w-6xl mx-auto px-4 py-6 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-lg font-bold text-gray-900">Video Call</h1>
          <p className="text-sm text-gray-500">with {otherPartyName}</p>
        </div>
        <span className="text-sm font-mono bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
          {formatDuration(callDuration)}
        </span>
      </div>

      {/* Video grid */}
      <div className="bg-gray-900 rounded-xl overflow-hidden relative" style={{ minHeight: '480px' }}>
        <div
          className={`grid h-full ${
            isScreenSharing ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'
          } gap-1 p-1`}
          style={{ minHeight: '480px' }}
        >
          {/* Screen share (takes priority view) */}
          {isScreenSharing && (
            <div className="relative bg-black rounded-lg overflow-hidden col-span-full" style={{ minHeight: '460px' }}>
              <video
                ref={screenShareRef}
                autoPlay
                muted
                className="w-full h-full object-contain"
              />
              <span className="absolute top-3 left-3 bg-black/60 text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
                <MonitorUp size={12} /> Your screen
              </span>
            </div>
          )}

          {/* Local video */}
          {!isScreenSharing && (
            <div className="relative bg-black rounded-lg overflow-hidden flex items-center justify-center" style={{ minHeight: '230px' }}>
              {!isVideoOff ? (
                <video
                  ref={localVideoRef}
                  autoPlay
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center gap-2 text-gray-400">
                  <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center text-white text-xl font-semibold">
                    {user?.name?.charAt(0) || 'Y'}
                  </div>
                  <span className="text-xs">Camera off</span>
                </div>
              )}
              <span className="absolute bottom-3 left-3 bg-black/60 text-white text-xs px-2 py-1 rounded-md">
                You {isMuted && '(muted)'}
              </span>
            </div>
          )}

          {/* Remote participant (mock placeholder) */}
          {!isScreenSharing && (
            <div className="relative bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center" style={{ minHeight: '230px' }}>
              <div className="flex flex-col items-center gap-2 text-gray-300">
                <div className="w-16 h-16 rounded-full bg-secondary-600 flex items-center justify-center text-white text-xl font-semibold">
                  {otherPartyName.charAt(0)}
                </div>
                <span className="text-xs">{otherPartyName}</span>
              </div>
              <span className="absolute bottom-3 left-3 bg-black/60 text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
                <Users size={12} /> Waiting to join...
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3 mt-5">
        <button
          onClick={toggleMute}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
            isMuted ? 'bg-error-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
        </button>

        <button
          onClick={toggleVideo}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
            isVideoOff ? 'bg-error-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          title={isVideoOff ? 'Turn camera on' : 'Turn camera off'}
        >
          {isVideoOff ? <VideoOff size={20} /> : <Video size={20} />}
        </button>

        <button
          onClick={toggleScreenShare}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
            isScreenSharing ? 'bg-accent-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          title={isScreenSharing ? 'Stop sharing' : 'Share screen'}
        >
          {isScreenSharing ? <MonitorX size={20} /> : <MonitorUp size={20} />}
        </button>

        <button
          className="w-12 h-12 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 flex items-center justify-center transition-colors"
          title="Chat"
        >
          <MessageSquare size={20} />
        </button>

        <button
          onClick={endCall}
          className="w-14 h-12 rounded-full bg-error-500 hover:bg-error-700 text-white flex items-center justify-center transition-colors ml-2"
          title="End call"
        >
          <PhoneOff size={20} />
        </button>
      </div>
    </div>
  );
};

export default VideoCallPage;
