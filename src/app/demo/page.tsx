import {
  Activity,
  Component,
  HomeIcon,
  Mail,
  Package,
  ScrollText,
  SunMoon,
} from 'lucide-react';

const data = [
  {
    title: 'Home',
    icon: (
      <HomeIcon className='h-full w-full text-gray-600' />
    ),
    href: '#',
  },
  {
    title: 'Products',
    icon: (
      <Package className='h-full w-full text-gray-600' />
    ),
    href: '#',
  },
  {
    title: 'Components',
    icon: (
      <Component className='h-full w-full text-gray-600' />
    ),
    href: '#',
  },
  {
    title: 'Activity',
    icon: (
      <Activity className='h-full w-full text-gray-600' />
    ),
    href: '#',
  },
  {
    title: 'Change Log',
    icon: (
      <ScrollText className='h-full w-full text-gray-600' />
    ),
    href: '#',
  },
  {
    title: 'Email',
    icon: (
      <Mail className='h-full w-full text-gray-600' />
    ),
    href: '#',
  },
  {
    title: 'Theme',
    icon: (
      <SunMoon className='h-full w-full text-gray-600' />
    ),
    href: '#',
  },
];

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Dock Navigation Demo
        </h1>
        <p className="text-lg text-gray-600 mb-12">
          Hover over the dock items to see the magnification effect
        </p>
        
        <div className='absolute bottom-2 left-1/2 max-w-full -translate-x-1/2'>
          <div className='flex items-end gap-2 pb-3 bg-gray-100/80 backdrop-blur-sm rounded-full p-2 border border-gray-200/50'>
            {data.map((item, idx) => (
              <div
                key={idx}
                className='aspect-square rounded-full bg-gray-200/80 backdrop-blur-sm border border-gray-300/50 flex items-center justify-center hover:bg-gray-300/80 transition-colors group'
              >
                <div className='flex h-6 w-6 items-center justify-center'>
                  {item.icon}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 