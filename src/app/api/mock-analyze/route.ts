import { NextRequest, NextResponse } from 'next/server';
import { mockAnalyze } from '@/lib/analyzer';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const lyrics = formData.get('lyrics') as string;
    const audioFile = formData.get('audio') as File;

    if (!lyrics || !audioFile) {
      return NextResponse.json(
        { error: 'Missing lyrics or audio file' },
        { status: 400 }
      );
    }

    // Simulate processing delay (remove in production with real analyzer)
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Use mock analyzer
    const result = mockAnalyze(lyrics, audioFile.name);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Analysis error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze performance' },
      { status: 500 }
    );
  }
}
