'use client';

import {
  Home,
  User,
  FileText,
  Github,
  Linkedin,
  Play,
  BookOpen,
} from 'lucide-react';
import Link from 'next/link';
import { Dock, DockIcon, DockItem, DockLabel } from '@/components/ui/dock';
import ContactPopover from '@/components/ui/contact-popover';

const navigationItems = [
  {
    title: 'Home',
    icon: <Home className='h-full w-full text-neutral-300' />,
    href: '/',
    external: false,
  },
  {
    title: 'About',
    icon: <User className='h-full w-full text-neutral-300' />,
    href: '/about',
    external: false,
  },
  // Temporarily hidden - Case Studies navigation item
  // {
  //   title: 'Case Studies',
  //   icon: <FileText className='h-full w-full text-neutral-300' />,
  //   href: '/case-studies',
  //   external: false,
  // },
  // Temporarily hidden - Play navigation item
  // {
  //   title: 'Play',
  //   icon: <Play className='h-full w-full text-neutral-300' />,
  //   href: '/play',
  //   external: false,
  // },
  {
    title: 'Medium',
    icon: <BookOpen className='h-full w-full text-neutral-300' />,
    href: 'https://yournocodefriend.medium.com/',
    external: true,
  },
  {
    title: 'GitHub',
    icon: <Github className='h-full w-full text-neutral-300' />,
    href: 'https://github.com/evangelinensy',
    external: true,
  },
  {
    title: 'LinkedIn',
    icon: <Linkedin className='h-full w-full text-neutral-300' />,
    href: 'https://www.linkedin.com/in/evangeline-ng/',
    external: true,
  },
];

export function Navigation() {
  return (
    <div className='fixed bottom-2 left-1/2 z-50 max-w-full -translate-x-1/2'>
      <Dock className='items-end pb-3'>
        {navigationItems.map((item, idx) => (
          <DockItem
            key={idx}
            className='aspect-square rounded-full bg-gray-200 dark:bg-neutral-800 hover:bg-gradient-to-br hover:from-[#79A8FF] hover:via-[#B2DDDA] hover:to-[#F2B7C8] hover:opacity-60 transition-all duration-300'
          >
            <DockLabel>{item.title}</DockLabel>
            <DockIcon>
              {item.external ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-full w-full items-center justify-center"
                >
                  {item.icon}
                </a>
              ) : (
                <Link href={item.href} className="flex h-full w-full items-center justify-center">
                  {item.icon}
                </Link>
              )}
            </DockIcon>
          </DockItem>
        ))}
        {/* Contact Popover */}
        <DockItem className='aspect-square rounded-full bg-gray-200 dark:bg-neutral-800 hover:bg-gradient-to-br hover:from-[#79A8FF] hover:via-[#B2DDDA] hover:to-[#F2B7C8] hover:opacity-60 transition-all duration-300'>
          <DockLabel>Contact</DockLabel>
          <DockIcon>
            <ContactPopover />
          </DockIcon>
        </DockItem>
      </Dock>
    </div>
  );
} 