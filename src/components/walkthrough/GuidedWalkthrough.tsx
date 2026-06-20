import React, { useState, useEffect } from 'react';
import { X, ArrowRight, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface TourStep {
  targetClass: string;
  title: string;
  content: string;
}

const entrepreneurSteps: TourStep[] = [
  {
    targetClass: 'joyride-dashboard',
    title: 'Dashboard',
    content: 'Welcome! Here you can see pending requests, connections, and recommended investors at a glance.',
  },
  {
    targetClass: 'joyride-scheduling',
    title: 'Scheduling',
    content: 'Set your availability and manage meeting requests from investors here.',
  },
  {
    targetClass: 'joyride-documents',
    title: 'Documents',
    content: 'Upload files, preview them, and collect e-signatures in this section.',
  },
  {
    targetClass: 'joyride-video-call',
    title: 'Video Call',
    content: 'Start a video call directly with an investor — no extra software needed.',
  },
  {
    targetClass: 'joyride-wallet',
    title: 'Wallet',
    content: 'Track all your funding and transactions in the Wallet section.',
  },
];

const investorSteps: TourStep[] = [
  {
    targetClass: 'joyride-dashboard',
    title: 'Dashboard',
    content: 'Welcome! Discover promising startups and track your portfolio here.',
  },
  {
    targetClass: 'joyride-scheduling',
    title: 'Scheduling',
    content: 'Book meetings with entrepreneurs you are interested in.',
  },
  {
    targetClass: 'joyride-documents',
    title: 'Deals & Documents',
    content: 'Review pitch decks and contracts, and sign them digitally.',
  },
  {
    targetClass: 'joyride-video-call',
    title: 'Video Call',
    content: 'Hop on a video call with an entrepreneur to discuss deals face-to-face.',
  },
  {
    targetClass: 'joyride-wallet',
    title: 'Wallet',
    content: 'Manage your funds and send funding to startups directly from here.',
  },
];

const STORAGE_KEY = 'nexus_walkthrough_completed';

export const GuidedWalkthrough: React.FC = () => {
  const { user } = useAuth();
  const [isActive, setIsActive] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null);

  const steps = user?.role === 'entrepreneur' ? entrepreneurSteps : investorSteps;
  const currentStep = steps[stepIndex];

  useEffect(() => {
    const completed = localStorage.getItem(STORAGE_KEY);
    if (!completed && user) {
     const timer = setTimeout(() => setIsActive(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [user]);

  useEffect(() => {
    if (!isActive || !currentStep) return;

    const el = document.querySelector(`.${currentStep.targetClass}`);
    if (el) {
      const rect = el.getBoundingClientRect();
      setPosition({
        top: rect.top + window.scrollY,
        left: rect.right + 16,
      });
      el.classList.add('walkthrough-highlight');
    }

    return () => {
      if (el) el.classList.remove('walkthrough-highlight');
    };
  }, [isActive, stepIndex, currentStep]);

  const handleNext = () => {
    if (stepIndex < steps.length - 1) {
      setStepIndex(stepIndex + 1);
    } else {
      finishTour();
    }
  };

  const handlePrev = () => {
    if (stepIndex > 0) setStepIndex(stepIndex - 1);
  };

  const finishTour = () => {
    localStorage.setItem(STORAGE_KEY, 'true');
    setIsActive(false);
  };

  if (!isActive || !user || !position) return null;

  return (
    <>
      {/* Dark overlay */}
      <div className="fixed inset-0 bg-black/40 z-[9998]" onClick={finishTour}></div>

      {/* Tooltip card */}
      <div
        className="fixed z-[9999] bg-white rounded-lg shadow-xl w-72 p-4 animate-fade-in"
        style={{ top: Math.min(position.top, window.innerHeight - 220), left: position.left }}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-primary-600 uppercase tracking-wide">
            Step {stepIndex + 1} of {steps.length}
          </span>
          <button onClick={finishTour} className="text-gray-400 hover:text-gray-600">
            <X size={16} />
          </button>
        </div>
        <h4 className="text-base font-bold text-gray-900 mb-1">{currentStep.title}</h4>
        <p className="text-sm text-gray-600 mb-4">{currentStep.content}</p>
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={stepIndex === 0}
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ArrowLeft size={14} /> Back
          </button>
          <button
            onClick={handleNext}
            className="flex items-center gap-1 text-sm font-medium bg-primary-600 hover:bg-primary-700 text-white px-3 py-1.5 rounded-md transition-colors"
          >
            {stepIndex === steps.length - 1 ? 'Finish' : 'Next'}
            {stepIndex < steps.length - 1 && <ArrowRight size={14} />}
          </button>
        </div>
      </div>

      <style>{`
        .walkthrough-highlight {
          position: relative;
          z-index: 9999;
          box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.5);
          border-radius: 8px;
        }
      `}</style>
    </>
  );
};