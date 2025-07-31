import ExamplePopover from "@/components/ui/popover-1";

export default function DemoPopover() {
  return (
    <div className="min-h-screen bg-background pt-[50px] px-[50px] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">Popover Demo</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Click the bell icon to see the notifications popover
        </p>
        <ExamplePopover />
      </div>
    </div>
  );
} 