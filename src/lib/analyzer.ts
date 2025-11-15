// Types for lyrics analysis

export interface BarAnalysis {
  barNumber: number;
  text: string;
  score: number; // 0-100
  issues: string[];
  suggestions: string[];
}

export interface PerformanceMetrics {
  flowTightness: number; // 0-100
  rhythmConsistency: number; // 0-100
  breathControl: number; // 0-100
  energyCurve: number; // 0-100
  overallScore: number; // 0-100
}

export interface AnalysisResult {
  metrics: PerformanceMetrics;
  barAnalysis: BarAnalysis[];
  keyInsights: string[];
  coachingNotes: string[];
  timestamp: string;
}

// Mock analyzer function
export function mockAnalyze(lyrics: string, audioFileName: string): AnalysisResult {
  const lines = lyrics.split('\n').filter(line => line.trim().length > 0);
  const barCount = lines.length;

  // Generate mock bar analysis
  const barAnalysis: BarAnalysis[] = lines.map((line, index) => {
    const randomScore = Math.floor(Math.random() * 30) + 70; // 70-100
    const issues: string[] = [];
    const suggestions: string[] = [];

    if (randomScore < 85) {
      issues.push('Slight timing drift detected');
      suggestions.push('Practice with a metronome at 80% speed');
    }

    if (Math.random() > 0.7) {
      issues.push('Breath placement could be optimized');
      suggestions.push('Mark breath points before recording');
    }

    return {
      barNumber: index + 1,
      text: line,
      score: randomScore,
      issues,
      suggestions,
    };
  });

  // Calculate average metrics
  const avgBarScore = barAnalysis.reduce((sum, bar) => sum + bar.score, 0) / barCount;

  const metrics: PerformanceMetrics = {
    flowTightness: Math.floor(Math.random() * 15) + 82,
    rhythmConsistency: Math.floor(Math.random() * 15) + 80,
    breathControl: Math.floor(Math.random() * 20) + 75,
    energyCurve: Math.floor(Math.random() * 15) + 83,
    overallScore: Math.floor(avgBarScore),
  };

  const keyInsights: string[] = [
    `Strong performance with ${metrics.overallScore}% overall accuracy`,
    `Flow tightness is ${metrics.flowTightness >= 90 ? 'excellent' : 'solid'} - keep the momentum`,
    `${barAnalysis.filter(b => b.score >= 90).length} out of ${barCount} bars scored 90% or higher`,
  ];

  if (metrics.breathControl < 85) {
    keyInsights.push('Breath control could use some work - try breathing exercises');
  }

  const coachingNotes: string[] = [
    'Your rhythm is consistent throughout most of the track',
    'Consider marking breath points in your lyrics before recording',
    'Energy delivery is strong - maintain this consistency',
  ];

  if (metrics.flowTightness < 85) {
    coachingNotes.push('Work on staying locked to the beat - practice with a metronome');
  }

  return {
    metrics,
    barAnalysis,
    keyInsights,
    coachingNotes,
    timestamp: new Date().toISOString(),
  };
}
