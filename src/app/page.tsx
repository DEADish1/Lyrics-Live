import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <nav className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 mb-20">
          <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            LyricsLive
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/analyze"
              className="px-6 py-2 bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 hover:border-white/20 text-white rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            >
              Analyzer
            </Link>
            <Link
              href="/practice"
              className="flex items-center gap-2 px-6 py-2 bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 hover:border-white/20 text-white rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            >
              <span>Practice</span>
              <span className="px-1.5 py-0.5 bg-purple-500/20 border border-purple-500/40 text-purple-300 text-xs font-semibold rounded">
                BETA
              </span>
            </Link>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto text-center mt-20">
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6">
            Level Up Your{' '}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Performance
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            AI-powered performance coach for rappers and singers. Get instant feedback on flow, rhythm, breath control, and more.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/analyze"
              className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold rounded-lg transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            >
              Start Analyzing
            </Link>
            <Link
              href="/practice"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 hover:border-white/20 text-white font-semibold rounded-lg transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            >
              <span>Try Practice Mode</span>
              <span className="px-2 py-0.5 bg-purple-500/20 border border-purple-500/40 text-purple-300 text-xs font-semibold rounded">
                BETA
              </span>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mt-32 max-w-6xl mx-auto">
          <FeatureCard
            title="Flow Analysis"
            description="Get detailed insights on how tight your flow is to the beat, with bar-by-bar breakdown."
            icon="🎵"
          />
          <FeatureCard
            title="Rhythm & Timing"
            description="Analyze rhythm consistency and timing accuracy across your entire performance."
            icon="⏱️"
          />
          <FeatureCard
            title="Breath Control"
            description="Optimize your breath placement and control for cleaner, more professional takes."
            icon="🌬️"
          />
          <FeatureCard
            title="Energy Tracking"
            description="Monitor your energy curve throughout the track to maintain engagement."
            icon="⚡"
          />
          <FeatureCard
            title="Coaching Notes"
            description="Receive personalized coaching tips and actionable suggestions to improve."
            icon="📝"
          />
          <FeatureCard
            title="Live Practice"
            description="Practice with live microphone and get real-time feedback on your performance."
            icon="🎤"
            badge="BETA"
          />
        </div>

        {/* How It Works */}
        <div className="mt-32 max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16">How It Works</h2>
          <div className="space-y-8">
            <Step
              number={1}
              title="Paste Your Lyrics"
              description="Enter your lyrics, one bar per line, so we know what you're performing."
            />
            <Step
              number={2}
              title="Upload Your Take"
              description="Upload your audio recording (MP3, WAV, M4A, or WEBM format)."
            />
            <Step
              number={3}
              title="Get Instant Feedback"
              description="Receive detailed analysis with scores, insights, and coaching notes to level up."
            />
          </div>
        </div>

        {/* CTA */}
        <div className="mt-32 text-center">
          <div className="p-12 bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-sm border border-purple-500/30 rounded-2xl max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to elevate your craft?</h2>
            <p className="text-gray-300 mb-8">
              Join artists using AI to perfect their performances.
            </p>
            <Link
              href="/analyze"
              className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold rounded-lg transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            >
              Analyze Your Performance
            </Link>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-32 text-center text-gray-500 text-sm">
          <p>&copy; 2025 LyricsLive. Built for artists, by artists.</p>
        </footer>
      </div>
    </div>
  );
}

function FeatureCard({ title, description, icon, badge }: { title: string; description: string; icon: string; badge?: string }) {
  return (
    <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 hover:border-purple-500/30 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="text-4xl">{icon}</div>
        {badge && (
          <span className="px-2 py-1 bg-purple-500/20 border border-purple-500/40 text-purple-300 text-xs font-semibold rounded">
            {badge}
          </span>
        )}
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  );
}

function Step({ number, title, description }: { number: number; title: string; description: string }) {
  return (
    <div className="flex items-start space-x-4">
      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
        {number}
      </div>
      <div>
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    </div>
  );
}
