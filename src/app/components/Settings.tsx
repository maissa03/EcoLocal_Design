import { useState } from 'react';
import { motion } from 'motion/react';
import { Moon, Sun, Bell, Lock, Globe, Smartphone, HelpCircle, LogOut } from 'lucide-react';

interface SettingsProps {
  theme: 'light' | 'dark';
  onThemeChange: (theme: 'light' | 'dark') => void;
}

export default function Settings({ theme, onThemeChange }: SettingsProps) {
  const [notifications, setNotifications] = useState(true);
  const [locationServices, setLocationServices] = useState(true);

  return (
    <div className="p-8 space-y-6 max-w-4xl">
      <div>
        <h2 className="text-foreground mb-1">Paramètres</h2>
        <p className="text-muted-foreground">Personnalisez votre expérience EcoLocal</p>
      </div>

      {/* Section Apparence */}
      <div className="bg-card border border-border rounded-[24px] p-6 space-y-6">
        <h3 className="font-semibold text-foreground flex items-center gap-2">
          <Sun className="w-5 h-5" />
          Apparence
        </h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Thème de l'interface</p>
              <p className="text-sm text-muted-foreground">Choisissez entre le mode clair et sombre</p>
            </div>

            <div className="flex gap-2">
              <motion.button
                onClick={() => onThemeChange('light')}
                className={`px-4 py-2 rounded-[12px] flex items-center gap-2 transition-all ${
                  theme === 'light'
                    ? 'bg-primary text-white'
                    : 'bg-secondary text-foreground hover:bg-secondary/80'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Sun className="w-4 h-4" />
                Clair
              </motion.button>

              <motion.button
                onClick={() => onThemeChange('dark')}
                className={`px-4 py-2 rounded-[12px] flex items-center gap-2 transition-all ${
                  theme === 'dark'
                    ? 'bg-primary text-white'
                    : 'bg-secondary text-foreground hover:bg-secondary/80'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Moon className="w-4 h-4" />
                Sombre
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Section Notifications */}
      <div className="bg-card border border-border rounded-[24px] p-6 space-y-6">
        <h3 className="font-semibold text-foreground flex items-center gap-2">
          <Bell className="w-5 h-5" />
          Notifications
        </h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Notifications push</p>
              <p className="text-sm text-muted-foreground">Recevoir des rappels et alertes</p>
            </div>

            <motion.button
              onClick={() => setNotifications(!notifications)}
              className={`w-14 h-8 rounded-full transition-colors relative ${
                notifications ? 'bg-primary' : 'bg-secondary'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="w-6 h-6 bg-white rounded-full absolute top-1"
                animate={{ left: notifications ? '28px' : '4px' }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </motion.button>
          </div>

          {notifications && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="pl-4 space-y-3 border-l-2 border-primary/20"
            >
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded accent-primary" />
                <span className="text-sm text-foreground">Défis et challenges</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded accent-primary" />
                <span className="text-sm text-foreground">Points de collecte à proximité</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded accent-primary" />
                <span className="text-sm text-foreground">Rappels de tri quotidiens</span>
              </label>
            </motion.div>
          )}
        </div>
      </div>

      {/* Section Confidentialité */}
      <div className="bg-card border border-border rounded-[24px] p-6 space-y-6">
        <h3 className="font-semibold text-foreground flex items-center gap-2">
          <Lock className="w-5 h-5" />
          Confidentialité & Données
        </h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Services de localisation</p>
              <p className="text-sm text-muted-foreground">Pour trouver les points de collecte</p>
            </div>

            <motion.button
              onClick={() => setLocationServices(!locationServices)}
              className={`w-14 h-8 rounded-full transition-colors relative ${
                locationServices ? 'bg-primary' : 'bg-secondary'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="w-6 h-6 bg-white rounded-full absolute top-1"
                animate={{ left: locationServices ? '28px' : '4px' }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </motion.button>
          </div>

          <div className="bg-primary/10 border border-primary/20 rounded-[16px] p-4">
            <div className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground mb-1">
                  Vos données sont cryptées et 100% privées
                </p>
                <p className="text-xs text-muted-foreground">
                  EcoLocal ne partage jamais vos informations personnelles. Consultez notre politique de confidentialité pour en savoir plus.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section Préférences */}
      <div className="bg-card border border-border rounded-[24px] p-6 space-y-6">
        <h3 className="font-semibold text-foreground flex items-center gap-2">
          <Globe className="w-5 h-5" />
          Préférences
        </h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Langue</p>
              <p className="text-sm text-muted-foreground">Français</p>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-4 py-2 bg-secondary text-foreground rounded-[12px] hover:bg-secondary/80 transition-colors"
            >
              Modifier
            </motion.button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Mode assistance senior</p>
              <p className="text-sm text-muted-foreground">Interface simplifiée et contrastes élevés</p>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-4 py-2 bg-secondary text-foreground rounded-[12px] hover:bg-secondary/80 transition-colors"
            >
              Activer
            </motion.button>
          </div>
        </div>
      </div>

      {/* Section Aide */}
      <div className="bg-card border border-border rounded-[24px] p-6 space-y-4">
        <h3 className="font-semibold text-foreground flex items-center gap-2">
          <HelpCircle className="w-5 h-5" />
          Aide & Support
        </h3>

        <div className="space-y-2">
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="w-full flex items-center justify-between p-4 bg-secondary rounded-[16px] hover:bg-secondary/80 transition-colors"
          >
            <span className="text-foreground">Centre d'aide</span>
            <span className="text-muted-foreground">→</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="w-full flex items-center justify-between p-4 bg-secondary rounded-[16px] hover:bg-secondary/80 transition-colors"
          >
            <span className="text-foreground">Contacter le support</span>
            <span className="text-muted-foreground">→</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="w-full flex items-center justify-between p-4 bg-secondary rounded-[16px] hover:bg-secondary/80 transition-colors"
          >
            <span className="text-foreground">Conditions d'utilisation</span>
            <span className="text-muted-foreground">→</span>
          </motion.button>
        </div>
      </div>

      {/* Bouton de déconnexion */}
      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className="w-full py-4 bg-destructive/10 text-destructive rounded-[20px] font-semibold flex items-center justify-center gap-2 hover:bg-destructive/20 transition-colors"
      >
        <LogOut className="w-5 h-5" />
        Se déconnecter
      </motion.button>
    </div>
  );
}
