'use client';

import { useState, FormEvent } from 'react';
import type { AnalysisResult } from '@/lib/analyzer';

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
      const formData = new FormData();
      formData.append('lyrics', lyrics);
      formData.append('audio', audioFile);

      const response = await fetch('/api/mock-analyze', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Analysis failed');
      }

      const result: AnalysisResult = await response.json();
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
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Lyrics Input */}
      <div>
        <label htmlFor="lyrics" className="block text-sm font-medium text-gray-200 mb-2">
          Paste Your Lyrics
        </label>
        <textarea
          id="lyrics"
          value={lyrics}
          onChange={(e) => setLyrics(e.target.value)}
          placeholder="Enter your lyrics here, one bar per line..."
          rows={12}
          className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all resize-none"
        />
      </div>

      {/* Audio File Upload */}
      <div>
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
            className="flex items-center justify-center w-full px-4 py-8 bg-white/5 backdrop-blur-sm border border-white/10 border-dashed rounded-lg cursor-pointer hover:bg-white/10 hover:border-purple-500/50 transition-all"
          >
            <div className="text-center">
              {audioFile ? (
                <>
                  <div className="text-purple-400 text-sm font-medium mb-1">
                    {audioFile.name}
                  </div>
                  <div className="text-gray-400 text-xs">
                    {(audioFile.size / 1024 / 1024).toFixed(2)} MB
                  </div>
                </>
              ) : (
                <>
                  <div className="text-gray-300 text-sm font-medium mb-1">
                    Click to upload audio file
                  </div>
                  <div className="text-gray-500 text-xs">
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
        <div className="px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-lg">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isAnalyzing}
        className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:from-gray-600 disabled:to-gray-600 text-white font-semibold rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:transform-none focus:outline-none focus:ring-2 focus:ring-purple-500/50"
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
