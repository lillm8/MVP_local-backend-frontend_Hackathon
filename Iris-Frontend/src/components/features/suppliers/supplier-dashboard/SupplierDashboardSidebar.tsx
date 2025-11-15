import { Button } from '@components/ui';

interface SidebarTab {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface SidebarProps {
  tabs: SidebarTab[];
  activeTab: string;
  onSelect: (id: string) => void;
}

export function SupplierDashboardSidebar({
  tabs,
  activeTab,
  onSelect,
}: SidebarProps) {
  return (
    <div className='min-h-screen w-64 border-r bg-white'>
      <div className='p-4'>
        <nav className='space-y-2'>
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? 'default' : 'ghost'}
                className='w-full justify-start'
                onClick={() => onSelect(tab.id)}
              >
                <Icon className='mr-3 h-4 w-4' />
                {tab.label}
              </Button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
