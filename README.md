# 🌍 EcoTerra Journeys

A modern, professional platform for sustainable tourism and climate change awareness. Calculate your carbon footprint, discover eco-friendly destinations, and make informed travel decisions for a better planet.

![EcoTerra Preview](https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&h=600&fit=crop)

## ✨ Features

### 🧮 Carbon Footprint Calculator
- Calculate CO2 emissions for different transport modes
- Save and track your travel footprint history
- Get suggestions for greener alternatives
- Firebase integration for cloud storage

### 🏞️ AI-Powered Destination Recommendations
- Get personalized eco-friendly destination suggestions
- Powered by Google Gemini AI
- Filter by interests, budget, and sustainability criteria

### 📊 Interactive Statistics & Charts
- Real-time data visualization using Chart.js
- Tourism carbon footprint breakdown
- Climate change impact metrics
- Transport emissions comparison

### 🎯 Gamified Eco Tips
- Interactive checklist of sustainable travel practices
- Point-based achievement system
- Progress tracking with visual indicators
- Multiple impact categories

### 📰 Latest News & Updates
- Curated sustainable tourism news
- Climate change and travel industry updates
- Trending stories with visual cards

### 🎨 Modern UI/UX
- Responsive design for all devices
- Smooth animations and transitions
- Professional component library using Radix UI
- Tailwind CSS for modern styling

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Firebase project (optional)
- Google AI API key (for destination recommendations)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/abhaysingh-22/EcoTerra.git
   cd EcoTerra
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   # Copy the example environment file
   cp .env.example .env.local
   ```

4. **Configure environment variables**
   Edit `.env.local` with your API keys:
   ```env
   # Firebase Configuration (Optional)
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

   # Google AI (Required for destination recommendations)
   GOOGLE_GENAI_API_KEY=your_google_ai_api_key
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run dev:turbo` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run typecheck` - Run TypeScript checks
- `npm run genkit:dev` - Start Genkit AI development
- `npm run firebase:emulators` - Start Firebase emulators

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js 15 app directory
│   ├── globals.css        # Global styles with animations
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── ui/               # Base UI components (Radix)
│   ├── app-header.tsx    # Navigation header
│   ├── app-footer.tsx    # Footer with links
│   ├── carbon-calculator.tsx
│   ├── destination-recommender.tsx
│   ├── statistics-charts.tsx
│   ├── eco-tips.tsx
│   ├── news-section.tsx
│   └── feedback-form.tsx
├── lib/                  # Utility functions
│   ├── firebase.ts       # Firebase configuration
│   ├── actions.ts        # Server actions
│   ├── constants.ts      # App constants
│   └── utils.ts          # Helper functions
├── ai/                   # AI/Genkit configuration
│   ├── genkit.ts
│   └── flows/
└── hooks/                # Custom React hooks
```

## 🔥 Firebase Setup (Optional)

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com)
2. Enable Firestore Database
3. Get your configuration from Project Settings
4. Add the config to your `.env.local` file
5. Update Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /feedback/{document} {
      allow write: if true;
      allow read: if false;
    }
    match /carbonFootprints/{document} {
      allow write: if true;
      allow read: if true;
    }
  }
}
```

## 🤖 Google AI Setup

1. Get a Google AI API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Add it to your `.env.local` file as `GOOGLE_GENAI_API_KEY`
3. The destination recommender will use Gemini AI for personalized suggestions

## 🎨 Features & Components

### Carbon Calculator
- **Location**: `/src/components/carbon-calculator.tsx`
- **Features**: Trip calculations, history tracking, Firebase storage
- **Data**: Stores in localStorage and optionally Firestore

### Statistics Dashboard
- **Location**: `/src/components/statistics-charts.tsx`
- **Charts**: Bar charts, doughnut charts, key metrics
- **Library**: Chart.js with react-chartjs-2

### Eco Tips Gamification
- **Location**: `/src/components/eco-tips.tsx`
- **Features**: Progress tracking, achievements, categorized tips
- **Storage**: localStorage for progress

### AI Destination Recommendations
- **Location**: `/src/components/destination-recommender.tsx`
- **AI**: Google Gemini integration via Genkit
- **Features**: Personalized suggestions based on preferences

## 📱 Responsive Design

The application is fully responsive and tested on:
- 📱 Mobile (320px+)
- 📱 Tablet (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Large screens (1440px+)

## 🎯 Performance

- ⚡ Next.js 15 with App Router
- 🏃 Turbopack for fast development
- 📦 Optimized bundle size
- 🖼️ Image optimization with Next.js Image
- 🎨 CSS-in-JS with Tailwind CSS

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Radix UI](https://www.radix-ui.com/) - Component primitives
- [Chart.js](https://www.chartjs.org/) - Data visualization
- [Firebase](https://firebase.google.com/) - Backend services
- [Google AI](https://ai.google.dev/) - AI recommendations
- [Lucide](https://lucide.dev/) - Icon library

## 📞 Support

If you have any questions or need help, please:
- 📧 Email: hello@ecoterra.com
- 🐛 Open an issue on GitHub
- 💬 Join our community discussions

---

**Made with 💚 for a sustainable future**
