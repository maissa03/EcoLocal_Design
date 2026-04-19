import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, Droplet, Recycle, Users, CheckCircle, Trophy, Filter } from 'lucide-react';
import SuccessModal from './SuccessModal';

const challenges = [
  {
    id: 1,
    title: 'Zéro Plastique cette semaine',
    description: 'Éliminez l\'utilisation de plastique jetable pendant 7 jours',
    category: 'Tri',
    points: 150,
    participants: 85,
    icon: Recycle,
    color: 'from-primary to-green-600',
    progress: 0,
    total: 7,
    active: false,
  },
  {
    id: 2,
    title: 'Économie d\'Eau',
    description: 'Réduisez votre consommation d\'eau de 20% ce mois-ci',
    category: 'Eau',
    points: 200,
    participants: 124,
    icon: Droplet,
    color: 'from-blue-500 to-cyan-500',
    progress: 0,
    total: 30,
    active: false,
  },
  {
    id: 3,
    title: 'Tri Expert - 50 items',
    description: 'Scannez et triez correctement 50 déchets différents',
    category: 'Tri',
    points: 100,
    participants: 203,
    icon: Trophy,
    color: 'from-primary to-emerald-600',
    progress: 0,
    total: 50,
    active: false,
  },
  {
    id: 4,
    title: 'Défi Communautaire',
    description: 'Participez à un atelier de réparation local',
    category: 'Communauté',
    points: 75,
    participants: 56,
    icon: Users,
    color: 'from-purple-500 to-pink-500',
    progress: 0,
    total: 1,
    active: false,
  },
  {
    id: 5,
    title: 'Énergie Verte',
    description: 'Réduisez votre consommation électrique de 15%',
    category: 'Énergie',
    points: 180,
    participants: 142,
    icon: Zap,
    color: 'from-yellow-500 to-orange-500',
    progress: 0,
    total: 30,
    active: false,
  },
  {
    id: 6,
    title: 'Champion du Compost',
    description: 'Compostez tous vos déchets organiques pendant 14 jours',
    category: 'Tri',
    points: 120,
    participants: 98,
    icon: Recycle,
    color: 'from-amber-600 to-amber-800',
    progress: 0,
    total: 14,
    active: false,
  },
];

const categories = ['Tous', 'Tri', 'Eau', 'Énergie', 'Communauté'];

export default function ChallengesView() {
  const [activeChallenges, setActiveChallenges] = useState<Set<number>>(new Set());
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [showSuccess, setShowSuccess] = useState(false);
  const [successData, setSuccessData] = useState<any>(null);

  const handleJoinChallenge = (challengeId: number) => {
    const newActive = new Set(activeChallenges);
    newActive.add(challengeId);
    setActiveChallenges(newActive);
  };

  const handleCompleteChallenge = (challenge: any) => {
    setSuccessData({
      points: challenge.points,
      message: `Incroyable ! Vous venez d'économiser l'équivalent de 15 bouteilles d'eau.`,
      badge: 'Gardien des Océans',
      progress: 80,
    });
    setShowSuccess(true);

    const newActive = new Set(activeChallenges);
    newActive.delete(challenge.id);
    setActiveChallenges(newActive);
  };

  const filteredChallenges = challenges.filter(
    c => selectedCategory === 'Tous' || c.category === selectedCategory
  );

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-foreground mb-1">Défis Communautaires</h2>
          <p className="text-muted-foreground">Relevez des challenges et gagnez des points</p>
        </div>

        {/* Filtres */}
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-muted-foreground" />
          <div className="flex gap-2">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-[12px] text-sm font-medium transition-colors ${
                  selectedCategory === cat
                    ? 'bg-primary text-white'
                    : 'bg-card border border-border text-foreground hover:border-primary'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Grille de challenges */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredChallenges.map((challenge, index) => {
          const Icon = challenge.icon;
          const isActive = activeChallenges.has(challenge.id);

          return (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`bg-card border-2 rounded-[24px] overflow-hidden ${
                isActive
                  ? 'border-primary shadow-[0_0_30px_rgba(82,183,136,0.3)]'
                  : 'border-border'
              }`}
            >
              {/* Header avec gradient */}
              <div className={`bg-gradient-to-r ${challenge.color} p-6 text-white relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                  <Icon className="w-full h-full" />
                </div>
                <Icon className="w-12 h-12 mb-3" />
                <h3 className="text-xl font-semibold mb-2">{challenge.title}</h3>
                <p className="text-white/90 text-sm">{challenge.description}</p>
              </div>

              {/* Contenu */}
              <div className="p-6 space-y-4">
                {/* Tag et participants */}
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                    {challenge.category}
                  </span>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>{challenge.participants} voisins participent</span>
                  </div>
                </div>

                {/* Récompense */}
                <div className="flex items-center justify-between p-4 bg-primary/5 rounded-[16px]">
                  <span className="text-muted-foreground">Récompense</span>
                  <span className="text-2xl font-semibold text-primary">+{challenge.points} pts</span>
                </div>

                {/* Bouton d'action */}
                {!isActive ? (
                  <motion.button
                    onClick={() => handleJoinChallenge(challenge.id)}
                    className="w-full py-3 bg-primary text-white rounded-[16px] font-semibold"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Relever le défi
                  </motion.button>
                ) : (
                  <div className="space-y-3">
                    {/* Barre de progression */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Progression</span>
                        <span className="text-primary font-semibold">
                          {Math.floor((challenge.progress / challenge.total) * 100)}%
                        </span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(challenge.progress / challenge.total) * 100}%` }}
                          className="h-full bg-primary rounded-full"
                        />
                      </div>
                    </div>

                    {/* Bouton simuler complétion */}
                    <motion.button
                      onClick={() => handleCompleteChallenge(challenge)}
                      className="w-full py-3 bg-primary/10 text-primary rounded-[16px] font-semibold border-2 border-primary hover:bg-primary hover:text-white transition-colors flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <CheckCircle className="w-5 h-5" />
                      Valider une étape
                    </motion.button>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Modal de succès */}
      <AnimatePresence>
        {showSuccess && successData && (
          <SuccessModal
            data={successData}
            onClose={() => setShowSuccess(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
