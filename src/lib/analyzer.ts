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
  energyTimeline: number[]; // Energy level per bar (0-100)
  timestamp: string;
}

// Helper: Detect repeated words in a line
function detectRepeatedWords(text: string): string[] {
  const words = text.toLowerCase().split(/\s+/);
  const wordCount: Record<string, number> = {};
  const repeated: string[] = [];

  words.forEach(word => {
    const cleaned = word.replace(/[^a-z0-9]/g, '');
    if (cleaned.length > 0) {
      wordCount[cleaned] = (wordCount[cleaned] || 0) + 1;
    }
  });

  Object.entries(wordCount).forEach(([word, count]) => {
    if (count > 1 && word.length > 2) {
      repeated.push(word);
    }
  });

  return repeated;
}

// Helper: Calculate syllable density (rough approximation)
function estimateSyllables(text: string): number {
  const vowelGroups = text.toLowerCase().match(/[aeiouy]+/g);
  return vowelGroups ? vowelGroups.length : 0;
}

// Helper: Detect density changes between consecutive bars
function calculateDensityChange(prevLine: string, currentLine: string): number {
  const prevDensity = estimateSyllables(prevLine) / Math.max(prevLine.length, 1);
  const currDensity = estimateSyllables(currentLine) / Math.max(currentLine.length, 1);
  return Math.abs(currDensity - prevDensity);
}

// Mock analyzer function with intelligent content analysis
export function mockAnalyze(lyrics: string, audioFileName: string): AnalysisResult {
  const lines = lyrics.split('\n').filter(line => line.trim().length > 0);
  const barCount = lines.length;

  // Generate energy timeline (simulated wave pattern)
  const energyTimeline: number[] = lines.map((_, index) => {
    const position = index / Math.max(barCount - 1, 1);
    const baseEnergy = 60 + Math.sin(position * Math.PI) * 30; // Bell curve
    const noise = (Math.random() - 0.5) * 15;
    return Math.max(40, Math.min(100, Math.floor(baseEnergy + noise)));
  });

  // Analyze each bar with content-aware logic
  const barAnalysis: BarAnalysis[] = lines.map((line, index) => {
    const issues: string[] = [];
    const suggestions: string[] = [];
    let baseScore = 85;

    // Detect long lines (potential breath control issues)
    const wordCount = line.split(/\s+/).length;
    const syllableCount = estimateSyllables(line);

    if (wordCount > 15) {
      baseScore -= 8;
      issues.push('Long bar - breath control challenge detected');
      suggestions.push('Consider breaking into shorter phrases or plan breath points');
    } else if (wordCount > 12) {
      baseScore -= 4;
      issues.push('Moderately long bar - watch your breath');
      suggestions.push('Mark a clear breath point mid-bar');
    }

    // Detect repeated words
    const repeatedWords = detectRepeatedWords(line);
    if (repeatedWords.length > 0) {
      baseScore -= 5;
      issues.push(`Repeated word "${repeatedWords[0]}" - ensure intentional emphasis`);
      suggestions.push('If repetition is intentional, vary your delivery for each instance');
    }

    // Detect density changes (sudden syllable density shift)
    if (index > 0) {
      const densityChange = calculateDensityChange(lines[index - 1], line);
      if (densityChange > 0.15) {
        baseScore -= 6;
        issues.push('Sudden density shift from previous bar');
        suggestions.push('Practice the transition between bars 10x to smooth the flow');
      }
    }

    // Detect very short lines
    if (wordCount < 4 && index < barCount - 1) {
      baseScore -= 3;
      issues.push('Short bar - risk of feeling empty');
      suggestions.push('Extend the last word or add ad-libs to fill the space');
    }

    // Energy consistency check
    const barEnergy = energyTimeline[index];
    if (barEnergy < 60 && index < barCount * 0.8) {
      baseScore -= 5;
      issues.push('Energy dip detected - push harder here');
      suggestions.push('Increase vocal projection and intensity');
    }

    // Random timing variations (simulate realistic analysis)
    if (Math.random() > 0.7) {
      baseScore -= Math.floor(Math.random() * 5);
      issues.push('Minor timing inconsistency');
      suggestions.push('Use a metronome to tighten up the delivery');
    }

    // Clamp score to valid range
    const score = Math.max(65, Math.min(100, baseScore + Math.floor(Math.random() * 10)));

    return {
      barNumber: index + 1,
      text: line,
      score,
      issues,
      suggestions,
    };
  });

  // Calculate intelligent metrics
  const avgBarScore = barAnalysis.reduce((sum, bar) => sum + bar.score, 0) / barCount;
  const avgEnergy = energyTimeline.reduce((sum, e) => sum + e, 0) / energyTimeline.length;

  const longBars = barAnalysis.filter((_, i) => lines[i].split(/\s+/).length > 12).length;
  const breathControlScore = Math.max(70, Math.floor(95 - (longBars / barCount) * 30));

  const densityVariance = barAnalysis.filter(b => b.issues.some(i => i.includes('density'))).length;
  const flowScore = Math.max(75, Math.floor(92 - (densityVariance / barCount) * 20));

  const metrics: PerformanceMetrics = {
    flowTightness: flowScore,
    rhythmConsistency: Math.floor(avgBarScore * 0.9 + Math.random() * 8),
    breathControl: breathControlScore,
    energyCurve: Math.floor(avgEnergy),
    overallScore: Math.floor(avgBarScore),
  };

  // Generate intelligent key insights
  const keyInsights: string[] = [];

  keyInsights.push(`Overall performance scored ${metrics.overallScore}% - ${
    metrics.overallScore >= 90 ? 'exceptional work!' :
    metrics.overallScore >= 80 ? 'strong execution' :
    'solid foundation with room to grow'
  }`);

  const excellentBars = barAnalysis.filter(b => b.score >= 90).length;
  if (excellentBars > 0) {
    keyInsights.push(`${excellentBars} out of ${barCount} bars (${Math.floor(excellentBars/barCount*100)}%) scored 90% or higher`);
  }

  if (longBars > barCount * 0.3) {
    keyInsights.push(`${longBars} long bars detected - breath control is key to your performance`);
  }

  const repeatedWordBars = barAnalysis.filter(b => b.issues.some(i => i.includes('Repeated word'))).length;
  if (repeatedWordBars > 0) {
    keyInsights.push(`${repeatedWordBars} bars use word repetition - ensure this is intentional for emphasis`);
  }

  if (metrics.energyCurve >= 85) {
    keyInsights.push('Energy delivery is strong and consistent throughout');
  } else if (metrics.energyCurve < 70) {
    keyInsights.push('Energy levels fluctuate - work on maintaining consistent intensity');
  }

  // Generate intelligent coaching notes
  const coachingNotes: string[] = [];

  if (metrics.flowTightness >= 90) {
    coachingNotes.push('Flow is tight and locked to the beat - excellent pocket awareness');
  } else if (metrics.flowTightness < 80) {
    coachingNotes.push('Focus on locking your syllables to the grid - practice with a metronome');
  }

  if (breathControlScore < 85) {
    coachingNotes.push('Pre-plan your breath points and practice them until they feel natural');
  } else {
    coachingNotes.push('Breath control is solid - you\'re managing long phrases well');
  }

  if (densityVariance > barCount * 0.2) {
    coachingNotes.push('Practice bar-to-bar transitions - smooth out the density changes');
  }

  const weakBars = barAnalysis.filter(b => b.score < 80);
  if (weakBars.length > 0 && weakBars.length < barCount * 0.4) {
    coachingNotes.push(`Focus extra practice on bars ${weakBars.slice(0, 3).map(b => b.barNumber).join(', ')}`);
  }

  coachingNotes.push('Record yourself and compare to the beat - self-review is crucial for improvement');

  return {
    metrics,
    barAnalysis,
    keyInsights,
    coachingNotes,
    energyTimeline,
    timestamp: new Date().toISOString(),
  };
}
