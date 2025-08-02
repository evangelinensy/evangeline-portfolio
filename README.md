# Evangeline - UX Designer Portfolio

A modern, responsive portfolio website built with Next.js, featuring an interactive dock navigation inspired by macOS.

## 🚀 Features

- **Interactive Dock Navigation**: Apple-style dock with hover magnification effects
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Dark Mode Support**: Built-in dark/light theme support
- **Modern Tech Stack**: Next.js 15, TypeScript, Tailwind CSS, Framer Motion
- **Performance Optimized**: Fast loading and smooth animations

## 🛠️ Tech Stack

- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **UI Components**: Custom components with shadcn/ui structure

## 📁 Project Structure

```
evangeline-portfolio/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx           # Homepage
│   │   ├── demo/              # Demo page
│   │   ├── layout.tsx         # Root layout
│   │   └── globals.css        # Global styles
│   ├── components/
│   │   ├── ui/               # Base UI components
│   │   │   └── dock.tsx      # Dock navigation component
│   │   └── navigation.tsx    # Main navigation component
│   └── lib/
│       └── utils.ts          # Utility functions
├── public/                    # Static assets
└── package.json              # Dependencies
```

## 🎨 Components

### Dock Navigation (`/components/ui/dock.tsx`)
- **Dock**: Main container with hover detection
- **DockItem**: Individual navigation items
- **DockIcon**: Icon container with dynamic sizing
- **DockLabel**: Tooltip labels on hover

### Navigation (`/components/navigation.tsx`)
- Portfolio-specific navigation items
- External link handling
- Responsive positioning

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd evangeline-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Navigation Items

The dock navigation includes:

- **Home** (`/`) - Landing page
- **About** (`/about`) - About page
- **Work** (`/work`) - Portfolio showcase
- **Case Studies** (`/case-studies`) - Detailed case studies
- **Design System** (`/design-system`) - Design system showcase
- **Contact** (`/contact`) - Contact information
- **GitHub** - External link to GitHub profile
- **LinkedIn** - External link to LinkedIn profile

## 🎯 Customization

### Adding New Navigation Items

1. Update the `navigationItems` array in `/components/navigation.tsx`
2. Add your icon from Lucide React
3. Set the appropriate `href` and `external` properties

### Styling the Dock

The dock uses Tailwind CSS classes. Key customization points:

- **Background**: `bg-gray-50 dark:bg-neutral-900`
- **Item styling**: `bg-gray-200 dark:bg-neutral-800`
- **Hover effects**: `hover:bg-gray-300 dark:hover:bg-neutral-700`

### Animation Settings

The dock animations can be customized in the `Dock` component:

- **Magnification**: `DEFAULT_MAGNIFICATION = 80`
- **Distance**: `DEFAULT_DISTANCE = 150`
- **Spring settings**: `{ mass: 0.1, stiffness: 150, damping: 12 }`

## 🌙 Dark Mode

The portfolio supports dark mode out of the box. The dock and all components automatically adapt to the system theme.

## 📱 Responsive Design

The dock navigation is optimized for:
- **Desktop**: Full dock with hover effects
- **Mobile**: Touch-friendly with appropriate sizing
- **Tablet**: Responsive layout with maintained functionality

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms

The project can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript check

### Code Quality

- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting (recommended)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For questions or support, please open an issue on GitHub or contact [your-email@example.com].

---

Built with ❤️ using Next.js and Framer Motion
