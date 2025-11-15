'use client';

import { useState } from 'react';
import Link from 'next/link';
import MicRecorder from '@/components/MicRecorder';

export default function PracticePage() {
  const [isRecording, setIsRecording] = useState(false);
  const [notes, setNotes] = useState('');
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);

  const handleRecordingChange = (recording: boolean) => {
    setIsRecording(recording);
  };

  const handleAudioChunks = (chunks: Blob[]) => {
    setAudioChunks(chunks);
    console.log('Received audio chunks for processing:', chunks.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <nav className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 mb-8 sm:mb-12">
          <Link
            href="/"
            className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent transition-all hover:scale-105"
          >
            LyricsLive
          </Link>
          <div className="flex gap-3">
            <Link
              href="/analyze"
              className="px-4 py-2 bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 hover:border-white/20 text-gray-300 hover:text-white rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            >
              Analyzer
            </Link>
            <Link
              href="/"
              className="px-4 py-2 bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 hover:border-white/20 text-gray-300 hover:text-white rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            >
              Home
            </Link>
          </div>
        </nav>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 px-4 animate-fade-in">
            <div className="flex items-center justify-center gap-2 mb-3">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
                Live Practice Mode
              </h1>
              <span className="px-2 py-1 bg-purple-500/20 border border-purple-500/40 text-purple-300 text-xs font-semibold rounded">
                BETA
              </span>
            </div>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
              Practice with live microphone feedback and real-time coaching
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Left Column - Mic Recorder */}
            <div className="space-y-6 animate-fade-in">
              <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
                <h2 className="text-xl font-semibold text-white mb-4">Microphone</h2>
                <MicRecorder
                  onRecordingChange={handleRecordingChange}
                  onAudioChunks={handleAudioChunks}
                />
              </div>

              {/* Recording Stats */}
              {audioChunks.length > 0 && (
                <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl animate-fade-in">
                  <h3 className="text-lg font-semibold text-white mb-3">Recording Info</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-gray-300">
                      <span>Audio Chunks:</span>
                      <span className="font-medium text-purple-400">{audioChunks.length}</span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>Total Size:</span>
                      <span className="font-medium text-purple-400">
                        {(audioChunks.reduce((sum, chunk) => sum + chunk.size, 0) / 1024).toFixed(2)} KB
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Notes & Feedback */}
            <div className="space-y-6 animate-fade-in-delay">
              {/* Practice Notes */}
              <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
                <h2 className="text-xl font-semibold text-white mb-4">Practice Notes</h2>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Write down what you're working on, key observations, or areas to focus on..."
                  rows={8}
                  className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all resize-none text-sm"
                />
              </div>

              {/* Live Feedback Placeholder */}
              <div className="p-6 bg-gradient-to-br from-blue-600/10 to-cyan-600/10 backdrop-blur-sm border border-blue-500/20 rounded-2xl">
                <h2 className="text-xl font-semibold text-white mb-4">Live Feedback</h2>
                <div className="flex flex-col items-center justify-center py-8 space-y-4">
                  <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <p className="text-gray-400 text-center text-sm max-w-xs">
                    Real-time AI feedback coming soon. Start recording to capture your practice session.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Info Cards */}
          <div className="grid sm:grid-cols-3 gap-4 mt-8 animate-fade-in-delay">
            <InfoCard
              icon="🎯"
              title="Practice Goals"
              description="Focus on specific bars or techniques during your session"
            />
            <InfoCard
              icon="📊"
              title="Live Metrics"
              description="Get instant feedback on flow, timing, and energy (coming soon)"
            />
            <InfoCard
              icon="💾"
              title="Auto-Save"
              description="Sessions are automatically saved for review (coming soon)"
            />
          </div>

          {/* Feature Notice */}
          <div className="mt-8 p-6 bg-purple-600/10 backdrop-blur-sm border border-purple-500/20 rounded-xl animate-fade-in-delay">
            <h3 className="text-lg font-semibold text-purple-300 mb-2">What's Next?</h3>
            <p className="text-gray-300 text-sm mb-3">
              Live Practice Mode is currently in beta. We're building real-time analysis features including:
            </p>
            <ul className="space-y-1 text-sm text-gray-400">
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                <span>Instant flow and timing feedback as you perform</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                <span>Visual cues for breath points and pacing</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                <span>Practice session history and progress tracking</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300">
      <div className="text-3xl mb-2">{icon}</div>
      <h3 className="text-sm font-semibold text-white mb-1">{title}</h3>
      <p className="text-xs text-gray-400">{description}</p>
    </div>
  );
}
