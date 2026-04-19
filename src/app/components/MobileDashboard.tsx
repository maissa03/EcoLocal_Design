import { motion } from 'motion/react';
import { TrendingDown, Droplet, Leaf, Award, ArrowRight } from 'lucide-react';

const stats = [
  { label: 'CO₂ Économisé', value: '187 kg', icon: TrendingDown, color: 'bg-primary' },
  { label: 'Eau Préservée', value: '651 L', icon: Droplet, color: 'bg-blue-500' },
  { label: 'Score EcoLocal', value: '8,542', icon: Award, color: 'bg-primary' },
  { label: 'Arbres Plantés', value: '23', icon: Leaf, color: 'bg-green-600' },
];

const recentActivity = [
  { type: 'Bouteille Plastique', points: 45, time: 'Il y a 2h' },
  { type: 'Carton', points: 30, time: 'Il y a 5h' },
  { type: 'Verre', points: 25, time: 'Hier' },
];

export default function MobileDashboard() {
  return (
    <div className="pb-20 overflow-y-auto h-full bg-background">
      {/* Header */}
      <div className="bg-primary px-6 pt-12 pb-8 rounded-b-[32px]">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-white/80 text-sm">Bonjour,</p>
            <h1 className="text-white text-2xl">Marie L.</h1>
          </div>
          <img
            src="/src/imports/image.png"
            alt="EcoLocal"
            className="w-12 h-12 object-contain opacity-80"
          />
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-[20px] p-4">
          <p className="text-white/80 text-sm mb-2">Votre Rang</p>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-white text-3xl font-semibold">#4</p>
              <p className="text-white/80 text-sm">Classement Local</p>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-white text-primary rounded-[16px] text-sm font-medium"
            >
              Voir plus
            </motion.button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="px-6 py-6 grid grid-cols-2 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-card border border-border rounded-[20px] p-4"
            >
              <div className={`w-10 h-10 ${stat.color} rounded-[12px] flex items-center justify-center mb-3`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <p className="text-2xl font-semibold text-foreground mb-1">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Activité Récente */}
      <div className="px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-foreground">Activité Récente</h3>
          <button className="text-primary text-sm flex items-center gap-1">
            Tout voir
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3">
          {recentActivity.map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="bg-card border border-border rounded-[20px] p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-foreground font-medium">{activity.type}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
              <div className="text-primary font-semibold">+{activity.points}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Scan */}
      <div className="px-6 py-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-gradient-to-br from-primary to-primary/80 rounded-[24px] p-6 text-white"
        >
          <h3 className="mb-2">Scannez un nouveau déchet</h3>
          <p className="text-white/80 text-sm mb-4">
            Utilisez la caméra AR pour identifier et trier instantanément
          </p>
          <button className="w-full py-3 bg-white text-primary rounded-[16px] font-semibold">
            Lancer le Scan
          </button>
        </motion.div>
      </div>
    </div>
  );
}
