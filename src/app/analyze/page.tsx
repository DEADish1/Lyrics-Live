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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <nav className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 mb-8 sm:mb-12">
          <Link href="/" className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent transition-all hover:scale-105">
            LyricsLive
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/practice"
              className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 hover:border-white/20 text-gray-300 hover:text-white rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            >
              <span>Practice</span>
              <span className="px-1.5 py-0.5 bg-purple-500/20 border border-purple-500/40 text-purple-300 text-xs font-semibold rounded">
                BETA
              </span>
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
        <div className="max-w-5xl mx-auto">
          {!analysisResult ? (
            <div className="animate-fade-in">
              <div className="text-center mb-8 sm:mb-12 px-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4 leading-tight">
                  Analyze Your Performance
                </h1>
                <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
                  Upload your lyrics and audio to get detailed AI-powered feedback
                </p>
              </div>

              <div className="p-4 sm:p-6 md:p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl transition-all duration-300 hover:border-white/20">
                <AnalyzerForm onAnalysisComplete={handleAnalysisComplete} />
              </div>
            </div>
          ) : (
            <div className="animate-slide-up">
              <ResultsPanel result={analysisResult} onReset={handleReset} />
            </div>
          )}
        </div>

        {/* Info Section (only show when no results) */}
        {!analysisResult && (
          <div className="max-w-5xl mx-auto mt-12 sm:mt-16 animate-fade-in-delay">
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
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
    <div className="p-5 sm:p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl transition-all duration-300 hover:bg-white/10 hover:border-purple-500/30 hover:-translate-y-1">
      <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">{title}</h3>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-start group">
            <span className="text-purple-400 mr-2 group-hover:scale-125 transition-transform duration-200">•</span>
            <span className="text-gray-300 text-sm sm:text-base">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
