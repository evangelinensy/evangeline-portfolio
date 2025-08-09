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
  // Work Category
  {
    id: 1,
    category: 'work',
    title: 'Pomelo Case Study',
    description: 'Onboarded 1.5x more users and x3 user activation',
    image: '/images/portfolio/work/pomelo-case-study.jpg',
    href: 'https://www.figma.com/proto/5J0BiJ9DUAak9ADjciKolR/Ng-Evangeline-%7C-Case-Study?page-id=0%3A1&node-id=628-63951&starting-point-node-id=601%3A73257&scaling=scale-down-width&content-scaling=fixed&t=O1FOkD94Iru5awBL-1',
    external: true,
    popoverTitle: 'Pomelo Onboarding Redesign',
    popoverDescription: 'Onboarded 1.5x more users and x3 user activation.',
  },
  {
    id: 2,
    category: 'work',
    title: 'Locker Mobile App',
    description: 'Mobile app design for secure storage',
    image: '/images/portfolio/work/locker-mobile-app.jpg',
    href: '/case-studies/project-1',
    popoverTitle: 'Locker Mobile App',
    popoverDescription: 'Mobile app design for secure storage solutions.',
  },
  {
    id: 3,
    category: 'work',
    title: 'TechBio Enterprise',
    description: 'Enterprise platform redesign',
    image: '/images/portfolio/work/techbio-enterprise.jpg',
    href: '/case-studies/project-2',
    popoverTitle: 'TechBio Enterprise Platform',
    popoverDescription: 'Enterprise platform redesign for biotech company.',
  },
  
  // Projects Category
  {
    id: 4,
    category: 'projects',
    title: 'Learn LLM Game',
    description: 'Educational game for learning LLMs',
    image: '/images/portfolio/projects/learn-llm-game.jpg',
    href: '/case-studies/project-1',
    popoverTitle: 'Learn LLM with a Game',
    popoverDescription: 'Interactive educational game for learning Large Language Models.',
  },
  {
    id: 5,
    category: 'projects',
    title: 'Web3 Campaigns',
    description: 'Marketing campaigns for Web3 projects',
    image: '/images/portfolio/projects/web3-campaigns.jpg',
    href: '/case-studies/project-2',
    popoverTitle: 'Web3 Campaigns',
    popoverDescription: 'Marketing campaigns for Web3 and blockchain projects.',
  },
  {
    id: 6,
    category: 'projects',
    title: 'Design System',
    description: 'Comprehensive design system',
    image: '/images/portfolio/projects/design-system.jpg',
    href: '/case-studies/project-1',
    popoverTitle: 'Design System',
    popoverDescription: 'Comprehensive design system for consistent UI.',
  },
  
  // Art Category
  {
    id: 7,
    category: 'art',
    title: 'Creative Process',
    description: 'Artistic design exploration',
    image: '/images/portfolio/art/creative-process.jpg',
    href: '/case-studies/project-2',
    popoverTitle: 'Creative Process',
    popoverDescription: 'Artistic design exploration and creative process.',
  },
  {
    id: 8,
    category: 'art',
    title: 'Visual Design',
    description: 'Visual design and illustration',
    image: '/images/portfolio/art/visual-design.jpg',
    href: '/case-studies/project-1',
    popoverTitle: 'Visual Design',
    popoverDescription: 'Visual design and illustration work.',
  },
  {
    id: 9,
    category: 'art',
    title: 'Digital Art',
    description: 'Digital artwork and graphics',
    image: '/images/portfolio/art/digital-art.jpg',
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