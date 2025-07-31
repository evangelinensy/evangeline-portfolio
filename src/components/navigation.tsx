'use client';

import {
  Home,
  User,
  FileText,
  Github,
  Linkedin,
} from 'lucide-react';
import Link from 'next/link';
import { Dock, DockIcon, DockItem, DockLabel } from '@/components/ui/dock';
import ContactPopover from '@/components/ui/contact-popover';

const navigationItems = [
  {
    title: 'Home',
    icon: <Home className='h-full w-full text-neutral-600 dark:text-neutral-300' />,
    href: '/',
    external: false,
  },
  {
    title: 'About',
    icon: <User className='h-full w-full text-neutral-600 dark:text-neutral-300' />,
    href: '/about',
    external: false,
  },
  {
    title: 'Case Studies',
    icon: <FileText className='h-full w-full text-neutral-600 dark:text-neutral-300' />,
    href: '/case-studies',
    external: false,
  },
  {
    title: 'GitHub',
    icon: <Github className='h-full w-full text-neutral-600 dark:text-neutral-300' />,
    href: 'https://github.com/evangelinensy',
    external: true,
  },
  {
    title: 'LinkedIn',
    icon: <Linkedin className='h-full w-full text-neutral-600 dark:text-neutral-300' />,
    href: 'https://www.linkedin.com/in/evangeline-ng/',
    external: true,
  },
];

export function Navigation() {
  return (
    <div className='fixed bottom-4 left-1/2 z-50 max-w-full -translate-x-1/2 px-4 md:px-0'>
      <Dock className='items-end pb-3'>
        {navigationItems.map((item, idx) => (
          <DockItem
            key={idx}
            className='aspect-square cursor-pointer rounded-full bg-gray-200 transition-colors hover:bg-gray-300 dark:bg-neutral-800 dark:hover:bg-neutral-700'
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
        <DockItem className='aspect-square cursor-pointer rounded-full bg-gray-200 transition-colors hover:bg-gray-300 dark:bg-neutral-800 dark:hover:bg-neutral-700'>
          <DockLabel>Contact</DockLabel>
          <DockIcon>
            <ContactPopover />
          </DockIcon>
        </DockItem>
      </Dock>
    </div>
  );
} 