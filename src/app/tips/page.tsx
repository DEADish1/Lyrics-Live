import Link from 'next/link';

export default function TipsPage() {
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
              href="/analyze"
              className="px-4 py-2 bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 hover:border-white/20 text-gray-300 hover:text-white rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            >
              Analyzer
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
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Tips & Best Practices</h1>
            <p className="text-gray-400 text-lg">Get the most out of LyricsLive with these expert tips</p>
          </div>

          <div className="space-y-6">
            {/* Recording Tips */}
            <TipSection
              title="📝 Before Recording"
              tips={[
                {
                  heading: 'Write one bar per line',
                  description: 'This helps the analyzer understand your phrasing and identify exactly where issues occur.',
                },
                {
                  heading: 'Mark your breath points',
                  description: 'Before recording, plan where you\'ll breathe. Use asterisks (*) or commas in your lyrics as reminders.',
                },
                {
                  heading: 'Practice without recording first',
                  description: 'Run through your verse 5-10 times with the beat before hitting record. This builds muscle memory.',
                },
                {
                  heading: 'Know your tempo',
                  description: 'Practice at 70-80% speed first, then work up to full tempo. This builds accuracy.',
                },
              ]}
            />

            {/* Recording Quality */}
            <TipSection
              title="🎤 Recording Quality"
              tips={[
                {
                  heading: 'Find a quiet space',
                  description: 'Background noise can affect analysis accuracy. Record in the quietest room available.',
                },
                {
                  heading: 'Use a decent microphone',
                  description: 'You don\'t need a professional setup, but earbuds or a USB mic work better than laptop mics.',
                },
                {
                  heading: 'Maintain consistent distance',
                  description: 'Stay 6-12 inches from the mic throughout your take to avoid volume fluctuations.',
                },
                {
                  heading: 'Record multiple takes',
                  description: 'Record 3-5 takes and analyze the best one. Each take teaches you something new.',
                },
              ]}
            />

            {/* Understanding Results */}
            <TipSection
              title="📊 Understanding Your Results"
              tips={[
                {
                  heading: 'Overall Score (85%+)',
                  description: 'Excellent! Focus on consistency and try more challenging material.',
                },
                {
                  heading: 'Overall Score (70-84%)',
                  description: 'Solid foundation. Focus on the weak bars identified in your breakdown.',
                },
                {
                  heading: 'Overall Score (<70%)',
                  description: 'Room to grow! Break into 4-bar sections and master each individually.',
                },
                {
                  heading: 'Flow Tightness',
                  description: 'Measures how locked you are to the beat. Low scores mean you\'re rushing or dragging.',
                },
                {
                  heading: 'Breath Control',
                  description: 'Low scores often mean bars are too long. Plan breath points or shorten phrases.',
                },
                {
                  heading: 'Energy Curve',
                  description: 'Tracks your intensity throughout. Great performers maintain energy even on long verses.',
                },
              ]}
            />

            {/* Practice Tips */}
            <TipSection
              title="💪 Effective Practice"
              tips={[
                {
                  heading: 'Isolate problem bars',
                  description: 'If the analyzer flags specific bars, practice those 20x before running the full verse.',
                },
                {
                  heading: 'Use the metronome method',
                  description: 'Practice at 70%, 80%, 90%, 100%, then 110% speed. Only move up when you hit 90%+ accuracy.',
                },
                {
                  heading: 'Record yourself daily',
                  description: 'Track improvement over time. Save your sessions in History to see progress.',
                },
                {
                  heading: 'Practice transitions',
                  description: 'If density changes are flagged, drill the transition between those two bars specifically.',
                },
                {
                  heading: 'Breath training exercises',
                  description: 'Try 4-count inhale, hold for 4, exhale for 8. Do this 10x daily to build lung capacity.',
                },
              ]}
            />

            {/* Demo Mode */}
            <TipSection
              title="🎮 Using Demo Mode"
              tips={[
                {
                  heading: 'Try different demos',
                  description: 'Use demo mode to see how the analyzer works without uploading your own material first.',
                },
                {
                  heading: 'Compare your results',
                  description: 'Run a demo, then record yourself doing the same lyrics. Compare scores to identify your weaknesses.',
                },
                {
                  heading: '"Breath Challenge" demo',
                  description: 'This demo has intentionally long bars to test breath control. Use it to practice breath planning.',
                },
              ]}
            />

            {/* Advanced Tips */}
            <TipSection
              title="🚀 Advanced Techniques"
              tips={[
                {
                  heading: 'Keyboard shortcuts',
                  description: 'Press Ctrl+Enter to quickly analyze after pasting lyrics. Saves time during practice sessions.',
                },
                {
                  heading: 'Session history',
                  description: 'Review your past sessions to track improvement over weeks. Look for upward trends in specific metrics.',
                },
                {
                  heading: 'Practice Mode (Beta)',
                  description: 'Use Practice Mode to capture live mic sessions without formal recording. Great for warm-ups.',
                },
                {
                  heading: 'Analyze the same verse weekly',
                  description: 'Pick one verse and analyze it every week for a month. Watch your scores climb as muscle memory builds.',
                },
              ]}
            />

            {/* CTA */}
            <div className="p-8 bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-sm border border-purple-500/30 rounded-2xl text-center mt-12">
              <h2 className="text-2xl font-bold text-white mb-4">Ready to improve?</h2>
              <p className="text-gray-300 mb-6">
                Apply these tips in your next session and watch your scores improve
              </p>
              <Link
                href="/analyze"
                className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold rounded-lg transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              >
                Start Practicing
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TipSection({ title, tips }: { title: string; tips: Array<{ heading: string; description: string }> }) {
  return (
    <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
      <h2 className="text-xl font-bold text-white mb-4">{title}</h2>
      <div className="space-y-4">
        {tips.map((tip, index) => (
          <div key={index} className="border-l-2 border-purple-500/50 pl-4">
            <h3 className="text-sm font-semibold text-purple-300 mb-1">{tip.heading}</h3>
            <p className="text-sm text-gray-400">{tip.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
