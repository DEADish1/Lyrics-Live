'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getSessions, deleteSession, clearAllSessions, type SavedSession } from '@/lib/sessionStorage';

export default function HistoryPage() {
  const [sessions, setSessions] = useState<SavedSession[]>([]);
  const [selectedSession, setSelectedSession] = useState<SavedSession | null>(null);

  useEffect(() => {
    setSessions(getSessions());
  }, []);

  const handleDelete = (id: string) => {
    if (confirm('Delete this session?')) {
      deleteSession(id);
      setSessions(getSessions());
      if (selectedSession?.id === id) {
        setSelectedSession(null);
      }
    }
  };

  const handleClearAll = () => {
    if (confirm('Clear all session history? This cannot be undone.')) {
      clearAllSessions();
      setSessions([]);
      setSelectedSession(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <nav className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 mb-8 sm:mb-12">
          <Link href="/" className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent transition-all hover:scale-105">
            LyricsLive
          </Link>
          <div className="flex items-center gap-3">
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
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Session History</h1>
              <p className="text-gray-400">View and manage your past analysis sessions</p>
            </div>
            {sessions.length > 0 && (
              <button
                onClick={handleClearAll}
                className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 hover:border-red-500/50 text-red-300 text-sm font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500/50"
              >
                Clear All
              </button>
            )}
          </div>

          {sessions.length === 0 ? (
            <div className="p-12 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-center">
              <svg className="w-16 h-16 mx-auto mb-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-400 mb-2">No Sessions Yet</h3>
              <p className="text-gray-500 mb-6">Your analysis history will appear here</p>
              <Link
                href="/analyze"
                className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold rounded-lg transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              >
                Start Analyzing
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {/* Sessions List */}
              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                {sessions.map((session) => (
                  <div
                    key={session.id}
                    onClick={() => setSelectedSession(session)}
                    className={`p-4 bg-white/5 backdrop-blur-sm border rounded-xl cursor-pointer transition-all duration-300 hover:bg-white/10 ${
                      selectedSession?.id === session.id
                        ? 'border-purple-500/50 bg-white/10'
                        : 'border-white/10'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-lg font-bold text-purple-400">
                            {session.result.metrics.overallScore}%
                          </span>
                          <span className="text-xs text-gray-500">
                            {session.result.barAnalysis.length} bars
                          </span>
                        </div>
                        <div className="text-sm text-gray-400">
                          {session.audioFileName || 'Unknown file'}
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(session.id);
                        }}
                        className="text-red-400 hover:text-red-300 transition-colors p-1"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(session.savedAt).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>

              {/* Session Details */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 max-h-[600px] overflow-y-auto custom-scrollbar">
                {selectedSession ? (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Session Details</h3>
                      <div className="text-sm text-gray-400">
                        {new Date(selectedSession.savedAt).toLocaleString()}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-white/5 rounded-lg">
                        <div className="text-xs text-gray-400 mb-1">Overall</div>
                        <div className="text-2xl font-bold text-purple-400">
                          {selectedSession.result.metrics.overallScore}%
                        </div>
                      </div>
                      <div className="p-3 bg-white/5 rounded-lg">
                        <div className="text-xs text-gray-400 mb-1">Bars</div>
                        <div className="text-2xl font-bold text-white">
                          {selectedSession.result.barAnalysis.length}
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-white mb-2">Metrics</h4>
                      <div className="space-y-2">
                        <MetricBar label="Flow" value={selectedSession.result.metrics.flowTightness} />
                        <MetricBar label="Rhythm" value={selectedSession.result.metrics.rhythmConsistency} />
                        <MetricBar label="Breath" value={selectedSession.result.metrics.breathControl} />
                        <MetricBar label="Energy" value={selectedSession.result.metrics.energyCurve} />
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-white mb-2">Lyrics Preview</h4>
                      <div className="p-3 bg-black/30 rounded-lg text-xs text-gray-400 max-h-32 overflow-y-auto custom-scrollbar">
                        {selectedSession.lyrics.split('\n').slice(0, 8).join('\n')}
                        {selectedSession.lyrics.split('\n').length > 8 && '\n...'}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-center">
                    <div>
                      <svg className="w-12 h-12 mx-auto mb-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                      </svg>
                      <p className="text-gray-500">Select a session to view details</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function MetricBar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-gray-400">{label}</span>
        <span className="text-white font-medium">{value}%</span>
      </div>
      <div className="w-full bg-gray-700/50 rounded-full h-1.5 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
