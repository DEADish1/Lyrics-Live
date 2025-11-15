'use client';

import { useState, useRef, useEffect } from 'react';

interface MicRecorderProps {
  onRecordingChange?: (isRecording: boolean) => void;
  onAudioChunks?: (chunks: Blob[]) => void;
}

export default function MicRecorder({ onRecordingChange, onAudioChunks }: MicRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [error, setError] = useState('');
  const [audioLevel, setAudioLevel] = useState(0);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Check microphone permission on mount
  useEffect(() => {
    checkMicrophonePermission();
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const checkMicrophonePermission = async () => {
    try {
      const result = await navigator.permissions.query({ name: 'microphone' as PermissionName });
      setHasPermission(result.state === 'granted');
    } catch {
      // Permissions API not supported, will check on first recording attempt
      setHasPermission(null);
    }
  };

  const updateAudioLevel = () => {
    if (!analyserRef.current) return;

    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteFrequencyData(dataArray);

    const average = dataArray.reduce((sum, value) => sum + value, 0) / dataArray.length;
    const normalizedLevel = Math.min(100, (average / 128) * 100);
    setAudioLevel(normalizedLevel);

    animationFrameRef.current = requestAnimationFrame(updateAudioLevel);
  };

  const startRecording = async () => {
    try {
      setError('');

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100,
        },
      });

      setHasPermission(true);

      // Set up audio analyzer for visualization
      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);
      analyser.fftSize = 256;

      audioContextRef.current = audioContext;
      analyserRef.current = analyser;

      // Start visualizing audio levels
      updateAudioLevel();

      // Set up media recorder
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm',
      });

      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
          console.log('Audio chunk recorded:', event.data.size, 'bytes');
        }
      };

      mediaRecorder.onstop = () => {
        console.log('Recording stopped. Total chunks:', audioChunksRef.current.length);
        if (onAudioChunks) {
          onAudioChunks(audioChunksRef.current);
        }
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start(1000); // Collect data every second
      mediaRecorderRef.current = mediaRecorder;

      setIsRecording(true);
      if (onRecordingChange) {
        onRecordingChange(true);
      }
    } catch (err) {
      console.error('Microphone access error:', err);
      setError('Failed to access microphone. Please check permissions.');
      setHasPermission(false);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current = null;

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      if (audioContextRef.current) {
        audioContextRef.current.close();
      }

      setIsRecording(false);
      setAudioLevel(0);

      if (onRecordingChange) {
        onRecordingChange(false);
      }
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <div className="space-y-4">
      {/* Microphone Toggle Button */}
      <button
        onClick={toggleRecording}
        className={`w-full px-6 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 ${
          isRecording
            ? 'bg-red-600 hover:bg-red-500 text-white focus:ring-red-500 animate-pulse'
            : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white focus:ring-purple-500'
        }`}
      >
        <div className="flex items-center justify-center space-x-2">
          {isRecording ? (
            <>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <rect x="6" y="6" width="8" height="8" rx="1" />
              </svg>
              <span>Stop Recording</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
              </svg>
              <span>Start Recording</span>
            </>
          )}
        </div>
      </button>

      {/* Recording Status */}
      {isRecording && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg animate-fade-in">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              <span className="text-red-400 font-medium text-sm">Recording in progress...</span>
            </div>
          </div>

          {/* Audio Level Visualizer */}
          <div className="mt-3">
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-400">Level:</span>
              <div className="flex-1 h-2 bg-gray-700/50 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 transition-all duration-100"
                  style={{ width: `${audioLevel}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg animate-shake">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {/* Permission Status */}
      {hasPermission === false && !error && (
        <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
          <p className="text-yellow-400 text-sm">
            Microphone access denied. Please enable microphone permissions in your browser settings.
          </p>
        </div>
      )}

      {/* Info */}
      {!isRecording && !error && (
        <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <p className="text-blue-400 text-sm">
            Click "Start Recording" to begin practicing. Audio will be captured for real-time feedback.
          </p>
        </div>
      )}
    </div>
  );
}
