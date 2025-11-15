# LyricsLive

AI-powered performance coach for rappers and singers. Get instant feedback on flow, rhythm, breath control, and more.

## Features

- **Flow Analysis** - Detailed insights on how tight your flow is to the beat
- **Rhythm & Timing** - Analyze rhythm consistency and timing accuracy
- **Breath Control** - Optimize breath placement for cleaner takes
- **Energy Tracking** - Monitor energy curve throughout your track
- **Bar-by-Bar Feedback** - See exactly which bars need work
- **Coaching Notes** - Personalized tips and actionable suggestions

## Tech Stack

- **Next.js 15** (App Router)
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Node.js** runtime

## Project Structure

```
src/
├── app/
│   ├── page.tsx                    # Landing page
│   ├── analyze/page.tsx            # Analyzer UI
│   ├── api/mock-analyze/route.ts   # Mock API endpoint
│   ├── layout.tsx                  # Root layout
│   └── globals.css                 # Global styles
├── components/
│   ├── AnalyzerForm.tsx            # Lyrics/audio upload form
│   └── ResultsPanel.tsx            # Analysis results display
└── lib/
    └── analyzer.ts                 # Types & mock analyzer logic
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd Lyrics-Live
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. Navigate to the **Analyze** page
2. Paste your lyrics (one bar per line)
3. Upload your audio recording (MP3, WAV, M4A, or WEBM)
4. Click "Analyze My Performance"
5. Review your results with detailed metrics and coaching notes

## Current Status

**Mock Analysis Mode** - The app currently uses a mock analyzer that generates realistic but simulated feedback. This allows you to test the full UI/UX flow.

### Roadmap

- [ ] Real-time practice mode (live mic input)
- [ ] Python microservice for actual audio analysis
- [ ] User authentication & saved sessions
- [ ] Performance history & progress tracking
- [ ] Custom coaching profiles

## Development

### Build for Production

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## Architecture Notes

- **Dark, glassy UI** - Modern creative-tool vibe with backdrop blur effects
- **Reusable components** - All UI components in `src/components`
- **Type safety** - Full TypeScript coverage with strict mode
- **Accessibility** - ARIA labels, focus states, keyboard navigation

## Contributing

This is a personal project, but suggestions and feedback are welcome!

## License

MIT

---

Built for artists, by artists. 🎤
