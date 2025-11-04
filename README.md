# Weather App

A modern, production-ready weather application built with Next.js, TypeScript, and Redux Toolkit. View current weather for cities across Nigeria, manage favorites, and add personal notes.

## Features

- 🌍 **15 Nigerian Cities** - Pre-loaded with major cities (Lagos, Abuja, Kano, etc.)
- 🔍 **Global Search** - Search and add any city worldwide
- ⭐ **Favorites** - Quick access to your favorite cities
- 📝 **Notes** - Add personal notes for each city
- 📍 **Geolocation** - Auto-detect your current location
- 🔄 **Offline Support** - Weather data cached for 10 minutes
- 📱 **Responsive Design** - Works seamlessly on all devices
- ⚡ **Optimized Performance** - Code splitting, lazy loading, React.memo
- 🎨 **Modern UI** - Built with Tailwind CSS v4

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (strict mode)
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS v4
- **APIs**: Weatherstack & Geonames
- **Testing**: Jest + React Testing Library
- **Package Manager**: pnpm

## Quick Start

### Prerequisites

- Node.js 18+
- pnpm (or npm/yarn)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Mancha01/weather-app.git
cd weather-app
```

2. Install dependencies:

```bash
pnpm install
```

3. Create `.env.local` file:

```env
NEXT_PUBLIC_WEATHERSTACK_API_KEY=your_weatherstack_api_key
NEXT_PUBLIC_GEONAMES_USERNAME=your_geonames_username
```

4. Run the development server:

```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
pnpm build
pnpm start
```

### Run Tests

```bash
pnpm test
```

## Project Structure

```
weather-app/
├── app/                  # Next.js app router pages
├── components/           # React components
│   ├── ui/              # Reusable UI components
│   └── __tests__/       # Component tests
├── hooks/               # Custom React hooks
├── services/            # API services & caching
├── store/               # Redux slices & store
│   └── __tests__/       # Redux tests
├── types/               # TypeScript types
└── utils/               # Utility functions
    └── __tests__/       # Utility tests
```

## Key Features Explained

### Weather Caching

- API responses cached for 10 minutes
- Reduces API calls and improves performance
- Works offline with cached data

### Favorites System

- Persistent storage using localStorage
- Auto-sorted: favorites appear first
- Toggle with a single click

### Notes System

- Add, edit, delete notes per city
- Persistent storage using localStorage
- Timestamps for created/updated dates

### Performance Optimizations

- React.memo for expensive components
- Dynamic imports for code splitting
- Next.js Image optimization
- Loading skeletons for better UX

## Environment Variables

| Variable                           | Description          | Required |
| ---------------------------------- | -------------------- | -------- |
| `NEXT_PUBLIC_WEATHERSTACK_API_KEY` | Weatherstack API key | Yes      |
| `NEXT_PUBLIC_GEONAMES_USERNAME`    | Geonames username    | Yes      |

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - feel free to use this project for learning or personal use.

## Author

Mancha01

---

Built using Next.js and TypeScript
