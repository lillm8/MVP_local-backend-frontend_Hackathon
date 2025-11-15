import { Button, Badge } from '@components/ui';
import { Bell, ChevronDown, Store, Settings, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';

interface HeaderProps {
  supplierName: string;
  onOpenProfile: () => void;
  onOpenSettings: () => void;
  onLogout: () => void;
}

export function SupplierDashboardHeader({
  supplierName,
  onOpenProfile,
  onOpenSettings,
  onLogout,
}: HeaderProps) {
  return (
    <div className='border-b bg-white'>
      <div className='px-6 py-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-4'>
            <h1 className='text-2xl font-bold'>Supplier Dashboard</h1>
            <Badge variant='secondary' className='flex items-center space-x-1'>
              <div className='h-2 w-2 rounded-full bg-green-500'></div>
              <span>Online</span>
            </Badge>
          </div>
          <div className='flex items-center space-x-4'>
            <Button variant='ghost' size='sm'>
              <Bell className='h-4 w-4' />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='ghost' className='flex items-center space-x-2'>
                  <span>{supplierName}</span>
                  <ChevronDown className='h-4 w-4' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end' className='w-56'>
                <DropdownMenuItem onClick={onOpenProfile}>
                  <Store className='mr-2 h-4 w-4' /> Store Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onOpenSettings}>
                  <Settings className='mr-2 h-4 w-4' /> Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onLogout}>
                  <LogOut className='mr-2 h-4 w-4' /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
}
