import * as React from 'react';
import { Popover } from '@base-ui-components/react/popover';

interface GalleryPopoverProps {
  children: React.ReactNode;
  title: string;
  description: string;
}

export default function GalleryPopover({ children, title, description }: GalleryPopoverProps) {
  return (
    <Popover.Root>
      <Popover.Trigger className="flex h-full w-full items-center justify-center">
        {children}
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner sideOffset={8}>
          <Popover.Popup className="origin-[var(--transform-origin)] rounded-lg bg-[#ECF1F3] dark:bg-neutral-800 px-6 py-4 text-gray-900 dark:text-gray-100 shadow-lg shadow-gray-200 outline outline-1 outline-gray-200 transition-[transform,scale,opacity] data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:scale-90 data-[starting-style]:opacity-0 dark:shadow-none dark:-outline-offset-1 dark:outline-gray-300 z-50 max-w-[600px] w-full">
            <Popover.Arrow className="data-[side=bottom]:top-[-8px] data-[side=left]:right-[-13px] data-[side=left]:rotate-90 data-[side=right]:left-[-13px] data-[side=right]:-rotate-90 data-[side=top]:bottom-[-8px] data-[side=top]:rotate-180">
              <ArrowSvg />
            </Popover.Arrow>
            <Popover.Title className="text-base font-medium mb-2">
              {title}
            </Popover.Title>
            <Popover.Description className="text-base text-gray-600 dark:text-gray-400">
              {description}
            </Popover.Description>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}

const ArrowSvg = () => (
  <svg
    width="10"
    height="5"
    viewBox="0 0 30 10"
    preserveAspectRatio="none"
    className="fill-[#ECF1F3] dark:fill-neutral-800"
  >
    <polygon points="0,0 30,0 15,10" />
  </svg>
); 