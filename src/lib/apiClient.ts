import type { AnalysisResult } from './analyzer';

// Get API base URL from environment or default to local API routes
const getApiBaseUrl = (): string => {
  return process.env.NEXT_PUBLIC_API_BASE_URL || '/api';
};

/**
 * Analyze performance with lyrics and audio file
 * @param lyrics - The lyrics text to analyze
 * @param audioFile - Optional audio file to analyze
 * @returns Promise resolving to analysis results
 */
export async function analyzePerformance(
  lyrics: string,
  audioFile?: File
): Promise<AnalysisResult> {
  const baseUrl = getApiBaseUrl();
  const endpoint = `${baseUrl}/mock-analyze`;

  const formData = new FormData();
  formData.append('lyrics', lyrics);

  if (audioFile) {
    formData.append('audio', audioFile);
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Analysis failed with status ${response.status}`);
  }

  const result: AnalysisResult = await response.json();
  return result;
}

/**
 * Future: Real-time practice analysis endpoint
 * @param audioChunks - Audio chunks from live recording
 */
export async function analyzeLivePerformance(
  audioChunks: Blob[]
): Promise<{ feedback: string; timestamp: number }> {
  // Placeholder for future real-time analysis
  const baseUrl = getApiBaseUrl();
  const endpoint = `${baseUrl}/live-analyze`;

  const formData = new FormData();
  audioChunks.forEach((chunk, index) => {
    formData.append(`chunk_${index}`, chunk);
  });

  const response = await fetch(endpoint, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Live analysis failed');
  }

  return response.json();
}

/**
 * Future: Save analysis session
 * @param result - Analysis result to save
 */
export async function saveAnalysisSession(
  result: AnalysisResult
): Promise<{ sessionId: string; shareUrl: string }> {
  const baseUrl = getApiBaseUrl();
  const endpoint = `${baseUrl}/save-session`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(result),
  });

  if (!response.ok) {
    throw new Error('Failed to save session');
  }

  return response.json();
}
