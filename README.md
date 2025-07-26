# Event Mesh

A modern web application that helps users discover events based on their social media interests using AI-powered analysis.

## Features

- **Social Media Integration**: Connect Instagram and LinkedIn profiles
- **AI-Powered Analysis**: LLM backend extracts user interests from social media activity
- **Personalized Recommendations**: Get event suggestions tailored to your interests
- **Modern UI**: Built with Next.js, Tailwind CSS, and shadcn/ui
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **Frontend**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Language**: TypeScript
- **Package Manager**: pnpm

## Prerequisites

- Node.js 18+ 
- pnpm

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd event-mesh
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Run the development server**
   ```bash
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

1. **Home Page**: Learn about Event Mesh and how it works
2. **Setup Profile**: Enter your Instagram and LinkedIn handles
3. **Dashboard**: View your extracted interests and recommended events

## Project Structure

```
event-mesh/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── page.tsx        # Home page
│   │   ├── setup/          # Profile setup page
│   │   ├── dashboard/      # User dashboard
│   │   └── layout.tsx      # Root layout
│   ├── components/         # React components
│   │   ├── ui/            # shadcn/ui components
│   │   ├── Navigation.tsx # Main navigation
│   │   ├── SocialMediaForm.tsx # Social media input form
│   │   ├── InterestCard.tsx # Interest display component
│   │   └── EventCard.tsx   # Event display component
│   ├── types/             # TypeScript type definitions
│   └── lib/               # Utility functions
├── public/                # Static assets
└── package.json           # Dependencies and scripts
```

## Key Components

### Social Media Form
- Validates Instagram handles (must start with @)
- Validates LinkedIn URLs (must contain linkedin.com/in/)
- Shows processing state during AI analysis

### Interest Cards
- Displays extracted interests with confidence scores
- Color-coded confidence levels (High/Medium/Low)
- Progress bars showing confidence percentages

### Event Cards
- Shows event recommendations with relevance scores
- Displays event details (date, location, category)
- Relevance matching indicators

## Development

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

### Adding New Components

To add new shadcn/ui components:
```bash
pnpm dlx shadcn@latest add <component-name>
```


## Future Enhancements

- [ ] Real LLM backend integration
- [ ] User authentication
- [ ] Event registration functionality
- [ ] Social media API integration
- [ ] Advanced filtering and search
- [ ] Event calendar integration
- [ ] Push notifications for new events
