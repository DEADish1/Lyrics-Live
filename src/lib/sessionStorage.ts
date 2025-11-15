import type { AnalysisResult } from './analyzer';

const STORAGE_KEY = 'lyricslive_sessions';
const MAX_SESSIONS = 10;

export interface SavedSession {
  id: string;
  result: AnalysisResult;
  lyrics: string;
  audioFileName?: string;
  savedAt: string;
}

// Save a new session to localStorage
export function saveSession(
  result: AnalysisResult,
  lyrics: string,
  audioFileName?: string
): SavedSession {
  const sessions = getSessions();

  const newSession: SavedSession = {
    id: crypto.randomUUID(),
    result,
    lyrics,
    audioFileName,
    savedAt: new Date().toISOString(),
  };

  // Add to beginning of array and limit to MAX_SESSIONS
  const updatedSessions = [newSession, ...sessions].slice(0, MAX_SESSIONS);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSessions));
  return newSession;
}

// Get all saved sessions
export function getSessions(): SavedSession[] {
  if (typeof window === 'undefined') return [];

  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to load sessions:', error);
    return [];
  }
}

// Get a single session by ID
export function getSession(id: string): SavedSession | null {
  const sessions = getSessions();
  return sessions.find(s => s.id === id) || null;
}

// Delete a session
export function deleteSession(id: string): void {
  const sessions = getSessions();
  const filtered = sessions.filter(s => s.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}

// Clear all sessions
export function clearAllSessions(): void {
  localStorage.removeItem(STORAGE_KEY);
}

// Get session count
export function getSessionCount(): number {
  return getSessions().length;
}

// Export session as JSON
export function exportSessionAsJSON(session: SavedSession): void {
  const dataStr = JSON.stringify(session, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `lyricslive-session-${session.id}.json`;
  link.click();
  URL.revokeObjectURL(url);
}
