export interface PortfolioItem {
  id: number;
  category: 'work' | 'projects' | 'art';
  title: string;
  description: string;
  image: string;
  href?: string;
  external?: boolean;
  popoverTitle?: string;
  popoverDescription?: string;
}

export const portfolioItems: PortfolioItem[] = [
  // Work Category - Updated with the 6 images from "My Work" section
  {
    id: 1,
    category: 'work',
    title: 'Pomelo Mobile App',
    description: 'Onboarded 1.5x more users and x3 user activation',
    image: '/images/pomelothumbnail.png',
    href: 'https://www.figma.com/proto/5J0BiJ9DUAak9ADjciKolR/Ng-Evangeline-%7C-Case-Study?page-id=0%3A1&node-id=628-63951&starting-point-node-id=601%3A73257&scaling=scale-down-width&content-scaling=fixed&t=O1FOkD94Iru5awBL-1',
    external: true,
    popoverTitle: 'Pomelo Onboarding Redesign',
    popoverDescription: 'Onboarded 1.5x more users and x3 user activation.',
  },
  {
    id: 2,
    category: 'work',
    title: 'Japanese Interface',
    description: 'Mobile app with QR code functionality',
    image: '/images/newimg1.png',
    href: '/case-studies/project-1',
    popoverTitle: 'Japanese Mobile Interface',
    popoverDescription: 'Mobile app with QR code functionality and team features.',
  },
  {
    id: 3,
    category: 'work',
    title: 'Chef Claude AI',
    description: 'AI-powered cooking assistant interface',
    image: '/images/chefclaude.png',
    href: '/case-studies/project-2',
    popoverTitle: 'Chef Claude AI Assistant',
    popoverDescription: 'AI-powered cooking assistant for recipe recommendations.',
  },
  {
    id: 4,
    category: 'work',
    title: 'Enterprise Dashboard',
    description: 'Data visualization and analytics platform',
    image: '/images/enterprise.png',
    href: '/case-studies/project-1',
    popoverTitle: 'Enterprise Dashboard',
    popoverDescription: 'Data visualization and analytics platform for enterprise clients.',
  },
  {
    id: 5,
    category: 'work',
    title: 'Collections App',
    description: 'Mobile app for managing collections and returns',
    image: '/images/newimg2.png',
    href: '/case-studies/project-2',
    popoverTitle: 'Collections & Returns App',
    popoverDescription: 'Mobile app for managing collections and returns with intuitive interface.',
  },
  {
    id: 6,
    category: 'work',
    title: 'Love Letter App',
    description: 'Digital communication app for meaningful connections',
    image: '/images/loveletter.png',
    href: '/case-studies/project-1',
    popoverTitle: 'Love Letter App',
    popoverDescription: 'Digital communication app for meaningful connections.',
  },

  // Projects Category - Updated with LLMcook and Send a Love Letter
  {
    id: 7,
    category: 'projects',
    title: 'LLMcook',
    description: 'AI-powered cooking assistant interface',
    image: '/images/chefclaude.png',
    href: '/case-studies/project-2',
    popoverTitle: 'LLMcook AI Assistant',
    popoverDescription: 'AI-powered cooking assistant for recipe recommendations.',
  },
  {
    id: 8,
    category: 'projects',
    title: 'Send a Love Letter',
    description: 'Digital communication app for meaningful connections',
    image: '/images/loveletter.png',
    href: '/case-studies/project-1',
    popoverTitle: 'Send a Love Letter App',
    popoverDescription: 'Digital communication app for meaningful connections.',
  },

  // Art Category - Updated with Oregon and Portland images
  {
    id: 9,
    category: 'art',
    title: 'Oregon',
    description: 'Rustic wooden design with fresh local ingredients',
    image: '/images/portfolio/art/Oregon.png',
    href: '/case-studies/project-2',
    popoverTitle: 'Oregon',
    popoverDescription: 'Langbaan & Lovely\'s Fifty Fifty, July 2025',
  },
  {
    id: 10,
    category: 'art',
    title: 'Portland',
    description: 'Minimalist city design with organic textures',
    image: '/images/portfolio/art/Portland.png',
    href: '/case-studies/project-1',
    popoverTitle: 'Portland',
    popoverDescription: 'Portland Mt Hood and Powell\'s, July 2025',
  },
  {
    id: 11,
    category: 'art',
    title: 'Digital Art',
    description: 'Digital artwork and graphics',
    image: '/images/newimg3.png',
    href: '/case-studies/project-2',
    popoverTitle: 'Digital Art',
    popoverDescription: 'Digital artwork and graphic design.',
  },
];

export const categories = [
  { value: "all", label: "All" },
  { value: "work", label: "Work" },
  { value: "projects", label: "Projects" },
  { value: "art", label: "Art" },
]; 