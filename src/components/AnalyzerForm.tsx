'use client';

import { useState, FormEvent } from 'react';
import type { AnalysisResult } from '@/lib/analyzer';
import { analyzePerformance } from '@/lib/apiClient';

interface AnalyzerFormProps {
  onAnalysisComplete: (result: AnalysisResult) => void;
}

export default function AnalyzerForm({ onAnalysisComplete }: AnalyzerFormProps) {
  const [lyrics, setLyrics] = useState('');
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState('');

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
      onAnalysisComplete(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsAnalyzing(false);
    }
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
      {/* Lyrics Input */}
      <div className="animate-fade-in">
        <label htmlFor="lyrics" className="block text-sm font-medium text-gray-200 mb-2">
          Paste Your Lyrics
        </label>
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
                    {(audioFile.size / 1024 / 1024).toFixed(2)} MB
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
    </form>
  );
}
