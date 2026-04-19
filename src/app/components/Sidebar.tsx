import { LayoutDashboard, Map, Recycle, Trophy, Settings, User, Zap, Upload } from 'lucide-react';
import { motion } from 'motion/react';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'challenges', label: 'Défis', icon: Zap },
  { id: 'scan', label: 'Scanner IA', icon: Upload },
  { id: 'map', label: 'Carte Interactive', icon: Map },
  { id: 'guide', label: 'Guide de Tri', icon: Recycle },
  { id: 'community', label: 'Classement', icon: Trophy },
];

export default function Sidebar({ activeView, onViewChange }: SidebarProps) {
  return (
    <motion.aside
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      className="w-[280px] h-screen bg-sidebar border-r border-sidebar-border flex flex-col"
    >
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="EcoLocal"
            className="w-12 h-12 object-contain"
          />
          <div>
            <h1 className="text-sidebar-foreground">EcoLocal</h1>
            <p className="text-xs text-muted-foreground">Intelligence Collective</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;

          return (
            <motion.button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-[24px] transition-colors ${
                isActive
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </motion.button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-sidebar-border space-y-2">
        <button
          onClick={() => onViewChange('profile')}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-[24px] text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
        >
          <User className="w-5 h-5" />
          <span>Mon Profil</span>
        </button>
        <button
          onClick={() => onViewChange('settings')}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-[24px] text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
        >
          <Settings className="w-5 h-5" />
          <span>Paramètres</span>
        </button>
      </div>
    </motion.aside>
  );
}
