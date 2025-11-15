'use client';

import type { AnalysisResult } from '@/lib/analyzer';

interface ResultsPanelProps {
  result: AnalysisResult;
  onReset: () => void;
}

export default function ResultsPanel({ result, onReset }: ResultsPanelProps) {
  const { metrics, barAnalysis, keyInsights, coachingNotes } = result;

  // Helper to get color based on score
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 75) return 'text-yellow-400';
    return 'text-orange-400';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 90) return 'bg-green-500/20 border-green-500/30';
    if (score >= 75) return 'bg-yellow-500/20 border-yellow-500/30';
    return 'bg-orange-500/20 border-orange-500/30';
  };

  return (
    <div className="space-y-6">
      {/* Header with Reset Button */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Analysis Results</h2>
        <button
          onClick={onReset}
          className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-purple-500/50"
        >
          New Analysis
        </button>
      </div>

      {/* Overall Score */}
      <div className="p-6 bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-sm border border-purple-500/30 rounded-xl">
        <div className="text-center">
          <div className="text-sm font-medium text-purple-300 mb-2">Overall Score</div>
          <div className="text-6xl font-bold text-white mb-1">{metrics.overallScore}</div>
          <div className="text-sm text-purple-200">out of 100</div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-2 gap-4">
        <MetricCard label="Flow Tightness" score={metrics.flowTightness} />
        <MetricCard label="Rhythm Consistency" score={metrics.rhythmConsistency} />
        <MetricCard label="Breath Control" score={metrics.breathControl} />
        <MetricCard label="Energy Curve" score={metrics.energyCurve} />
      </div>

      {/* Key Insights */}
      <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
        <h3 className="text-lg font-semibold text-white mb-4">Key Insights</h3>
        <ul className="space-y-2">
          {keyInsights.map((insight, index) => (
            <li key={index} className="flex items-start">
              <span className="text-purple-400 mr-2 mt-1">•</span>
              <span className="text-gray-300 text-sm">{insight}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Coaching Notes */}
      <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
        <h3 className="text-lg font-semibold text-white mb-4">Coaching Notes</h3>
        <ul className="space-y-2">
          {coachingNotes.map((note, index) => (
            <li key={index} className="flex items-start">
              <span className="text-pink-400 mr-2 mt-1">→</span>
              <span className="text-gray-300 text-sm">{note}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Bar-by-Bar Analysis */}
      <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
        <h3 className="text-lg font-semibold text-white mb-4">Bar-by-Bar Breakdown</h3>
        <div className="space-y-3 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
          {barAnalysis.map((bar) => (
            <div
              key={bar.barNumber}
              className={`p-4 border rounded-lg ${getScoreBgColor(bar.score)} transition-all hover:scale-[1.01]`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <span className="text-xs font-medium text-gray-400">Bar {bar.barNumber}</span>
                  <span className={`text-sm font-bold ${getScoreColor(bar.score)}`}>
                    {bar.score}%
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-300 mb-2 italic">&quot;{bar.text}&quot;</p>
              {bar.issues.length > 0 && (
                <div className="space-y-1">
                  {bar.issues.map((issue, idx) => (
                    <div key={idx} className="text-xs text-orange-300">
                      ⚠ {issue}
                    </div>
                  ))}
                  {bar.suggestions.map((suggestion, idx) => (
                    <div key={idx} className="text-xs text-blue-300">
                      💡 {suggestion}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Metric Card Component
function MetricCard({ label, score }: { label: string; score: number }) {
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 75) return 'text-yellow-400';
    return 'text-orange-400';
  };

  const percentage = score;

  return (
    <div className="p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
      <div className="text-sm text-gray-400 mb-2">{label}</div>
      <div className={`text-3xl font-bold ${getScoreColor(score)} mb-2`}>{score}</div>
      <div className="w-full bg-gray-700/50 rounded-full h-2 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
