'use client';

import { useState } from 'react';
import Link from 'next/link';
import AnalyzerForm from '@/components/AnalyzerForm';
import ResultsPanel from '@/components/ResultsPanel';
import type { AnalysisResult } from '@/lib/analyzer';

export default function AnalyzePage() {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const handleAnalysisComplete = (result: AnalysisResult) => {
    setAnalysisResult(result);
  };

  const handleReset = () => {
    setAnalysisResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <nav className="flex justify-between items-center mb-12">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            LyricsLive
          </Link>
          <Link
            href="/"
            className="px-4 py-2 bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 text-gray-300 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-purple-500/50"
          >
            Back to Home
          </Link>
        </nav>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {!analysisResult ? (
            <div>
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Analyze Your Performance
                </h1>
                <p className="text-gray-400 text-lg">
                  Upload your lyrics and audio to get detailed AI-powered feedback
                </p>
              </div>

              <div className="p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
                <AnalyzerForm onAnalysisComplete={handleAnalysisComplete} />
              </div>
            </div>
          ) : (
            <ResultsPanel result={analysisResult} onReset={handleReset} />
          )}
        </div>

        {/* Info Section (only show when no results) */}
        {!analysisResult && (
          <div className="max-w-4xl mx-auto mt-16">
            <div className="grid md:grid-cols-2 gap-6">
              <InfoCard
                title="What We Analyze"
                items={[
                  'Flow tightness to the beat',
                  'Rhythm consistency',
                  'Breath control & placement',
                  'Energy curve throughout track',
                  'Bar-by-bar performance quality',
                ]}
              />
              <InfoCard
                title="What You'll Get"
                items={[
                  'Overall performance score',
                  'Detailed metric breakdowns',
                  'Personalized coaching notes',
                  'Specific suggestions per bar',
                  'Key insights to improve',
                ]}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function InfoCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
      <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-start">
            <span className="text-purple-400 mr-2">•</span>
            <span className="text-gray-300 text-sm">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
