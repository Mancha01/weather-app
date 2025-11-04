# Weather App Component Architecture

## Component Hierarchy

```
App (app/layout.tsx & app/page.tsx)
├── Providers (Redux Provider)
├── Layout
│   └── Header
│       ├── Logo
│       └── OfflineIndicator
└── Pages
    ├── HomePage (app/page.tsx)
    │   ├── SearchBar
    │   ├── LocationPrompt
    │   └── CityList
    │       └── CityCard (multiple)
    │           └── FavoriteToggle
    └── CityDetailsPage (app/city/[id]/page.tsx)
        ├── CityDetails
        │   ├── WeatherInfo
        │   ├── FavoriteToggle
        │   └── NotesSection
        └── BackButton

## Atomic Components (ui/)
- Button
- Input
- Card
- Spinner
- ErrorMessage
- Badge

## Feature Components
- SearchBar (with debouncing)
- CityCard (list item view)
- CityList (sorted list with favorites)
- CityDetails (detailed weather view)
- NotesSection (CRUD for notes)
- FavoriteToggle (star/heart button)
- LocationPrompt (geolocation request)
- OfflineIndicator (online/offline status)

## Layout Components
- Header (navigation and branding)
- Layout (wrapper with header)
```
