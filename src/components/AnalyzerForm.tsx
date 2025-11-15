'use client';

import { useState, FormEvent } from 'react';
import type { AnalysisResult } from '@/lib/analyzer';
import { analyzePerformance } from '@/lib/apiClient';
import { DEMO_CONFIGS } from '@/lib/sampleData';

interface AnalyzerFormProps {
  onAnalysisComplete: (result: AnalysisResult, lyrics: string, audioFileName?: string) => void;
}

export default function AnalyzerForm({ onAnalysisComplete }: AnalyzerFormProps) {
  const [lyrics, setLyrics] = useState('');
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState('');
  const [showDemoOptions, setShowDemoOptions] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!lyrics.trim()) {
      setError('Please enter your lyrics');
      return;
    }

    if (!audioFile) {
      setError('Please upload an audio file');
      return;
    }

    setIsAnalyzing(true);

    try {
      const result = await analyzePerformance(lyrics, audioFile);
      onAnalysisComplete(result, lyrics, audioFile.name);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleDemoMode = async (demoId: string) => {
    const demo = DEMO_CONFIGS.find(d => d.id === demoId);
    if (!demo) return;

    setLyrics(demo.lyrics);
    setShowDemoOptions(false);
    setError('');

    // Create a fake audio file for demo
    const fakeAudio = new File([''], `demo-${demo.id}.mp3`, { type: 'audio/mp3' });
    setAudioFile(fakeAudio);

    // Auto-analyze after short delay
    setIsAnalyzing(true);
    setTimeout(async () => {
      try {
        const result = await analyzePerformance(demo.lyrics, fakeAudio);
        onAnalysisComplete(result, demo.lyrics, `Demo: ${demo.name}`);
      } catch (err) {
        setError('Demo analysis failed');
      } finally {
        setIsAnalyzing(false);
      }
    }, 800);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate audio file types
      const validTypes = ['audio/mpeg', 'audio/wav', 'audio/mp3', 'audio/m4a', 'audio/webm'];
      if (!validTypes.some(type => file.type.includes(type.split('/')[1]))) {
        setError('Please upload a valid audio file (MP3, WAV, M4A, or WEBM)');
        return;
      }
      setAudioFile(file);
      setError('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
      {/* Demo Mode Button */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-300">Try a Demo</h3>
        <button
          type="button"
          onClick={() => setShowDemoOptions(!showDemoOptions)}
          className="px-4 py-2 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 hover:border-purple-500/50 text-purple-300 text-sm font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
        >
          {showDemoOptions ? 'Hide Demos' : 'Load Demo'}
        </button>
      </div>

      {/* Demo Options */}
      {showDemoOptions && (
        <div className="grid sm:grid-cols-3 gap-3 animate-fade-in">
          {DEMO_CONFIGS.map((demo) => (
            <button
              key={demo.id}
              type="button"
              onClick={() => handleDemoMode(demo.id)}
              className="p-4 bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 hover:border-purple-500/50 rounded-lg text-left transition-all duration-300 group"
            >
              <div className="text-sm font-semibold text-white mb-1 group-hover:text-purple-300 transition-colors">
                {demo.name}
              </div>
              <div className="text-xs text-gray-400">{demo.description}</div>
            </button>
          ))}
        </div>
      )}

      {/* Lyrics Input */}
      <div className="animate-fade-in">
        <div className="flex items-center justify-between mb-2">
          <label htmlFor="lyrics" className="block text-sm font-medium text-gray-200">
            Paste Your Lyrics
          </label>
          <span className="text-xs text-gray-500">
            {lyrics.split('\n').filter(l => l.trim()).length} bars
          </span>
        </div>
        <textarea
          id="lyrics"
          value={lyrics}
          onChange={(e) => setLyrics(e.target.value)}
          placeholder="Enter your lyrics here, one bar per line..."
          rows={10}
          className="w-full px-3 sm:px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 resize-none hover:bg-white/10 text-sm sm:text-base"
        />
      </div>

      {/* Audio File Upload */}
      <div className="animate-fade-in-delay">
        <label htmlFor="audio" className="block text-sm font-medium text-gray-200 mb-2">
          Upload Audio Recording
        </label>
        <div className="relative">
          <input
            type="file"
            id="audio"
            accept="audio/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <label
            htmlFor="audio"
            className="flex items-center justify-center w-full px-4 py-6 sm:py-8 bg-white/5 backdrop-blur-sm border border-white/10 border-dashed rounded-lg cursor-pointer hover:bg-white/10 hover:border-purple-500/50 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99]"
          >
            <div className="text-center transition-all duration-300">
              {audioFile ? (
                <div className="animate-fade-in">
                  <div className="text-purple-400 text-sm sm:text-base font-medium mb-1">
                    {audioFile.name}
                  </div>
                  <div className="text-gray-400 text-xs sm:text-sm">
                    {audioFile.size > 0 ? `${(audioFile.size / 1024 / 1024).toFixed(2)} MB` : 'Demo file'}
                  </div>
                </div>
              ) : (
                <>
                  <div className="text-gray-300 text-sm sm:text-base font-medium mb-1">
                    Click to upload audio file
                  </div>
                  <div className="text-gray-500 text-xs sm:text-sm">
                    MP3, WAV, M4A, or WEBM
                  </div>
                </>
              )}
            </div>
          </label>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="px-3 sm:px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-lg animate-shake">
          <p className="text-red-400 text-xs sm:text-sm">{error}</p>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isAnalyzing}
        className="w-full px-6 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:from-gray-600 disabled:to-gray-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/25 active:scale-[0.98] disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-sm sm:text-base"
      >
        {isAnalyzing ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Analyzing Performance...
          </span>
        ) : (
          'Analyze My Performance'
        )}
      </button>

      {/* Keyboard Shortcut Hint */}
      <div className="text-center text-xs text-gray-500">
        <span className="inline-flex items-center gap-1">
          <kbd className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-xs">Ctrl</kbd>
          <span>+</span>
          <kbd className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-xs">Enter</kbd>
          <span>to analyze</span>
        </span>
      </div>
    </form>
  );
}
