import { motion } from 'motion/react';
import { Award, TrendingUp, Calendar, Package, Droplet, Zap, Crown, Star, Shield, Flame } from 'lucide-react';

const badges = [
  { id: 1, name: 'Éco-Champion', icon: Crown, color: 'text-yellow-500', unlocked: true, score: 10000, desc: 'Atteindre 10 000 points' },
  { id: 2, name: 'Gardien Vert', icon: Shield, color: 'text-green-500', unlocked: true, score: 5000, desc: '5 000 points débloqués' },
  { id: 3, name: 'Trieur Expert', icon: Star, color: 'text-blue-500', unlocked: true, score: 2000, desc: '2 000 points cumulés' },
  { id: 4, name: 'Série 30 jours', icon: Flame, color: 'text-orange-500', unlocked: true, score: 0, desc: '30 jours consécutifs' },
  { id: 5, name: 'Héros Zero', icon: Award, color: 'text-purple-500', unlocked: false, score: 15000, desc: 'Objectif: 15 000 points' },
  { id: 6, name: 'Maître Compost', icon: Package, color: 'text-amber-600', unlocked: false, score: 0, desc: '100 déchets organiques triés' },
];

const impactData = [
  { period: 'Cette semaine', plastic: 12, glass: 8, paper: 15, metal: 5, organic: 22 },
  { period: 'Ce mois-ci', plastic: 48, glass: 32, paper: 67, metal: 18, organic: 95 },
  { period: 'Cette année', plastic: 245, glass: 189, paper: 312, metal: 156, organic: 423 },
  { period: 'Total', plastic: 892, glass: 534, paper: 1124, metal: 445, organic: 1567 },
];

export default function ProfileView() {
  const currentScore = 8542;

  return (
    <div className="p-8 space-y-6 overflow-y-auto pb-20">
      {/* Header profil */}
      <div className="bg-gradient-to-br from-primary to-primary/70 rounded-[24px] p-8 text-white">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-4xl backdrop-blur-sm">
              ML
            </div>
            <div>
              <h1 className="text-3xl font-semibold mb-2">Marie L.</h1>
              <p className="text-white/80 mb-4">Membre depuis Mars 2025</p>
              <div className="flex items-center gap-4">
                <div className="bg-white/20 px-4 py-2 rounded-[12px] backdrop-blur-sm">
                  <p className="text-sm text-white/80">Score Total</p>
                  <p className="text-2xl font-semibold">{currentScore.toLocaleString()}</p>
                </div>
                <div className="bg-white/20 px-4 py-2 rounded-[12px] backdrop-blur-sm">
                  <p className="text-sm text-white/80">Rang</p>
                  <p className="text-2xl font-semibold">#4</p>
                </div>
              </div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-white text-primary rounded-[16px] font-semibold"
          >
            Modifier le profil
          </motion.button>
        </div>
      </div>

      {/* Badges */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-foreground">Mes Badges & Trophées</h2>
          <span className="text-sm text-muted-foreground">
            {badges.filter(b => b.unlocked).length} / {badges.length} débloqués
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {badges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className={`relative bg-card border-2 rounded-[20px] p-6 text-center ${
                  badge.unlocked
                    ? 'border-primary shadow-[0_0_20px_rgba(82,183,136,0.2)]'
                    : 'border-border opacity-50'
                }`}
              >
                <div className={`w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center ${
                  badge.unlocked ? 'bg-primary/10' : 'bg-secondary'
                }`}>
                  <Icon className={`w-8 h-8 ${badge.unlocked ? badge.color : 'text-muted-foreground'}`} />
                </div>
                <h3 className="font-semibold text-foreground text-sm mb-1">{badge.name}</h3>
                <p className="text-xs text-muted-foreground">{badge.desc}</p>

                {badge.unlocked && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center"
                  >
                    <Award className="w-4 h-4 text-white" />
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Impact Cumulé */}
      <div>
        <h2 className="text-foreground mb-4">Impact Cumulé par Période</h2>

        <div className="space-y-4">
          {impactData.map((period, index) => (
            <motion.div
              key={period.period}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-card border border-border rounded-[20px] p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-foreground">{period.period}</h3>
                </div>
                <span className="text-sm text-muted-foreground">
                  {period.plastic + period.glass + period.paper + period.metal + period.organic} items
                </span>
              </div>

              <div className="grid grid-cols-5 gap-4">
                <div className="text-center">
                  <div className="w-12 h-12 bg-yellow-500/10 rounded-[12px] flex items-center justify-center mx-auto mb-2">
                    <Package className="w-6 h-6 text-yellow-600" />
                  </div>
                  <p className="text-2xl font-semibold text-foreground">{period.plastic}</p>
                  <p className="text-xs text-muted-foreground">Plastique</p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-green-500/10 rounded-[12px] flex items-center justify-center mx-auto mb-2">
                    <Droplet className="w-6 h-6 text-green-600" />
                  </div>
                  <p className="text-2xl font-semibold text-foreground">{period.glass}</p>
                  <p className="text-xs text-muted-foreground">Verre</p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-[12px] flex items-center justify-center mx-auto mb-2">
                    <Package className="w-6 h-6 text-blue-600" />
                  </div>
                  <p className="text-2xl font-semibold text-foreground">{period.paper}</p>
                  <p className="text-xs text-muted-foreground">Papier</p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-gray-500/10 rounded-[12px] flex items-center justify-center mx-auto mb-2">
                    <Zap className="w-6 h-6 text-gray-600" />
                  </div>
                  <p className="text-2xl font-semibold text-foreground">{period.metal}</p>
                  <p className="text-xs text-muted-foreground">Métal</p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-amber-700/10 rounded-[12px] flex items-center justify-center mx-auto mb-2">
                    <Package className="w-6 h-6 text-amber-800" />
                  </div>
                  <p className="text-2xl font-semibold text-foreground">{period.organic}</p>
                  <p className="text-xs text-muted-foreground">Organique</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Statistiques globales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-[20px] p-6 text-center"
        >
          <TrendingUp className="w-12 h-12 text-primary mx-auto mb-3" />
          <p className="text-3xl font-semibold text-foreground mb-1">4,561 kg</p>
          <p className="text-sm text-muted-foreground">Total déchets triés</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card border border-border rounded-[20px] p-6 text-center"
        >
          <Flame className="w-12 h-12 text-orange-500 mx-auto mb-3" />
          <p className="text-3xl font-semibold text-foreground mb-1">42 jours</p>
          <p className="text-sm text-muted-foreground">Série active</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card border border-border rounded-[20px] p-6 text-center"
        >
          <Award className="w-12 h-12 text-primary mx-auto mb-3" />
          <p className="text-3xl font-semibold text-foreground mb-1">187 kg</p>
          <p className="text-sm text-muted-foreground">CO₂ économisé</p>
        </motion.div>
      </div>
    </div>
  );
}
