'use client';

import type { AnalysisResult } from '@/lib/analyzer';

interface ResultsPanelProps {
  result: AnalysisResult;
  onReset: () => void;
}

export default function ResultsPanel({ result, onReset }: ResultsPanelProps) {
  const { metrics, barAnalysis, keyInsights, coachingNotes, energyTimeline } = result;

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

  const getEnergyColor = (energy: number) => {
    if (energy >= 80) return 'bg-gradient-to-t from-green-500 to-green-400';
    if (energy >= 60) return 'bg-gradient-to-t from-yellow-500 to-yellow-400';
    return 'bg-gradient-to-t from-orange-500 to-orange-400';
  };

  // Generate practice drills based on results
  const generatePracticeDrills = () => {
    const drills: string[] = [];
    const weakBars = barAnalysis.filter(b => b.score < 80);
    const avgScore = metrics.overallScore;

    if (avgScore >= 90) {
      drills.push('Focus on consistency - record 5 takes and pick the best');
      drills.push('Challenge yourself with a faster tempo version');
    } else if (avgScore >= 80) {
      if (weakBars.length > 0) {
        drills.push(`Isolate and drill bars ${weakBars.slice(0, 3).map(b => b.barNumber).join(', ')} 20 times each`);
      }
      drills.push('Practice with a metronome at 90% speed, then 100%, then 110%');
    } else {
      drills.push('Break into 4-bar sections and master each before combining');
      drills.push('Record yourself daily and track improvement over a week');
      drills.push('Practice with the beat at 70% speed until perfect, then increase');
    }

    if (metrics.breathControl < 85) {
      drills.push('Practice breath control exercises: 4-count inhale, 8-count exhale');
    }

    return drills;
  };

  const practiceDrills = generatePracticeDrills();

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Header with Reset Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 animate-fade-in">
        <h2 className="text-2xl sm:text-3xl font-bold text-white">Analysis Results</h2>
        <button
          onClick={onReset}
          className="w-full sm:w-auto px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-gray-300 hover:text-white rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50 hover:scale-105 active:scale-95"
        >
          New Analysis
        </button>
      </div>

      {/* Overall Score */}
      <div className="p-6 sm:p-8 bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-sm border border-purple-500/30 rounded-xl transition-all duration-300 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20 animate-scale-in">
        <div className="text-center">
          <div className="text-xs sm:text-sm font-medium text-purple-300 mb-2">Overall Score</div>
          <div className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-1 transition-all duration-500 hover:scale-110">
            {metrics.overallScore}
          </div>
          <div className="text-xs sm:text-sm text-purple-200">out of 100</div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 animate-fade-in-delay">
        <MetricCard label="Flow Tightness" score={metrics.flowTightness} delay={0} />
        <MetricCard label="Rhythm Consistency" score={metrics.rhythmConsistency} delay={100} />
        <MetricCard label="Breath Control" score={metrics.breathControl} delay={200} />
        <MetricCard label="Energy Curve" score={metrics.energyCurve} delay={300} />
      </div>

      {/* Energy Timeline Visualization */}
      {energyTimeline && energyTimeline.length > 0 && (
        <div className="p-5 sm:p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl transition-all duration-300 hover:bg-white/10 hover:border-purple-500/30 animate-fade-in-delay">
          <h3 className="text-base sm:text-lg font-semibold text-white mb-4">Energy Timeline</h3>
          <div className="flex items-end justify-between gap-1 h-32 sm:h-40">
            {energyTimeline.map((energy, index) => (
              <div
                key={index}
                className="flex-1 relative group"
              >
                <div
                  className={`w-full rounded-t transition-all duration-500 hover:opacity-80 ${getEnergyColor(energy)}`}
                  style={{
                    height: `${energy}%`,
                    animationDelay: `${index * 30}ms`
                  }}
                />
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 px-2 py-1 rounded text-xs text-white whitespace-nowrap">
                  Bar {index + 1}: {energy}%
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 text-xs text-gray-400 text-center">
            Hover over bars to see energy levels per bar
          </div>
        </div>
      )}

      {/* Key Insights */}
      <div className="p-5 sm:p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl transition-all duration-300 hover:bg-white/10 hover:border-purple-500/30 animate-fade-in-delay">
        <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Key Insights</h3>
        <ul className="space-y-2 sm:space-y-3">
          {keyInsights.map((insight, index) => (
            <li key={index} className="flex items-start group animate-slide-right" style={{ animationDelay: `${index * 100}ms` }}>
              <span className="text-purple-400 mr-2 mt-1 group-hover:scale-125 transition-transform duration-200">•</span>
              <span className="text-gray-300 text-sm sm:text-base">{insight}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Coaching Notes */}
      <div className="p-5 sm:p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl transition-all duration-300 hover:bg-white/10 hover:border-pink-500/30 animate-fade-in-delay">
        <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Coaching Notes</h3>
        <ul className="space-y-2 sm:space-y-3">
          {coachingNotes.map((note, index) => (
            <li key={index} className="flex items-start group animate-slide-right" style={{ animationDelay: `${index * 100 + 200}ms` }}>
              <span className="text-pink-400 mr-2 mt-1 group-hover:translate-x-1 transition-transform duration-200">→</span>
              <span className="text-gray-300 text-sm sm:text-base">{note}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Bar-by-Bar Analysis */}
      <div className="p-5 sm:p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl transition-all duration-300 hover:bg-white/10 hover:border-white/20 animate-fade-in-delay">
        <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Bar-by-Bar Breakdown</h3>
        <div className="space-y-3 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
          {barAnalysis.map((bar, index) => (
            <div
              key={bar.barNumber}
              className={`p-3 sm:p-4 border rounded-lg ${getScoreBgColor(bar.score)} transition-all duration-300 hover:scale-[1.02] hover:shadow-md animate-slide-up`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <span className="text-xs font-medium text-gray-400">Bar {bar.barNumber}</span>
                  <span className={`text-sm sm:text-base font-bold ${getScoreColor(bar.score)}`}>
                    {bar.score}%
                  </span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-gray-300 mb-2 italic leading-relaxed">&quot;{bar.text}&quot;</p>
              {bar.issues.length > 0 && (
                <div className="space-y-1">
                  {bar.issues.map((issue, idx) => (
                    <div key={idx} className="text-xs sm:text-sm text-orange-300 transition-all hover:text-orange-200">
                      ⚠ {issue}
                    </div>
                  ))}
                  {bar.suggestions.map((suggestion, idx) => (
                    <div key={idx} className="text-xs sm:text-sm text-blue-300 transition-all hover:text-blue-200">
                      💡 {suggestion}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Session Summary with Practice Drills */}
      <div className="p-5 sm:p-6 bg-gradient-to-br from-blue-600/10 to-cyan-600/10 backdrop-blur-sm border border-blue-500/20 rounded-xl transition-all duration-300 hover:border-blue-500/40 animate-fade-in-delay">
        <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Session Summary & Practice Plan</h3>

        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <div className="text-sm text-gray-400">Performance Range</div>
            <div className="text-lg font-semibold text-white">
              {Math.min(...barAnalysis.map(b => b.score))}% - {Math.max(...barAnalysis.map(b => b.score))}%
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-sm text-gray-400">Areas to Focus</div>
            <div className="text-lg font-semibold text-white">
              {barAnalysis.filter(b => b.score < 80).length > 0
                ? `${barAnalysis.filter(b => b.score < 80).length} bars need work`
                : 'All bars performing well!'}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-4">
          <h4 className="text-sm font-semibold text-cyan-400 mb-3">Recommended Practice Drills</h4>
          <ul className="space-y-2">
            {practiceDrills.map((drill, index) => (
              <li key={index} className="flex items-start group">
                <span className="text-cyan-400 mr-2 mt-0.5 group-hover:scale-110 transition-transform">✓</span>
                <span className="text-gray-300 text-sm">{drill}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Save/Share Button (Coming Soon) */}
      <button
        disabled
        className="w-full px-6 py-4 bg-white/5 border border-white/10 text-gray-500 rounded-lg cursor-not-allowed opacity-60 transition-all"
      >
        <div className="flex items-center justify-center space-x-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          <span className="font-medium">Save / Share Session (Coming Soon)</span>
        </div>
      </button>
    </div>
  );
}

// Metric Card Component
function MetricCard({ label, score, delay }: { label: string; score: number; delay: number }) {
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 75) return 'text-yellow-400';
    return 'text-orange-400';
  };

  const percentage = score;

  return (
    <div
      className="p-4 sm:p-5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl transition-all duration-300 hover:bg-white/10 hover:border-purple-500/30 hover:-translate-y-1 hover:shadow-lg animate-scale-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="text-xs sm:text-sm text-gray-400 mb-2">{label}</div>
      <div className={`text-2xl sm:text-3xl font-bold ${getScoreColor(score)} mb-2 transition-all duration-300 hover:scale-110`}>
        {score}
      </div>
      <div className="w-full bg-gray-700/50 rounded-full h-2 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-1000 ease-out animate-progress"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
