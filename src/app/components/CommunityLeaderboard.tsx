import { useState } from 'react';
import { motion } from 'motion/react';
import { Trophy, Medal, Award, Lock, Unlock, Eye, EyeOff } from 'lucide-react';

interface User {
  rank: number;
  name: string;
  score: number;
  badge: string;
  isCurrentUser?: boolean;
}

const leaderboardData: User[] = [
  { rank: 1, name: 'Marie L.', score: 12847, badge: 'Eco-Champion' },
  { rank: 2, name: 'Thomas B.', score: 11203, badge: 'Gardien Vert' },
  { rank: 3, name: 'Sophie M.', score: 10589, badge: 'Héros Zero' },
  { rank: 4, name: 'Vous', score: 8542, badge: 'Trieur Expert', isCurrentUser: true },
  { rank: 5, name: 'Lucas D.', score: 7934, badge: 'Eco-Warrior' },
  { rank: 6, name: 'Emma R.', score: 7421, badge: 'Nature Lover' },
  { rank: 7, name: 'Alex P.', score: 6892, badge: 'Green Star' },
  { rank: 8, name: 'Julien C.', score: 6345, badge: 'Eco-Novice' },
];

export default function CommunityLeaderboard() {
  const [privacyMode, setPrivacyMode] = useState<'public' | 'anonymous' | 'private'>('public');

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-6 h-6 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-400" />;
    if (rank === 3) return <Medal className="w-6 h-6 text-amber-600" />;
    return <Award className="w-5 h-5 text-muted-foreground" />;
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-foreground mb-1">Classement Communautaire</h2>
          <p className="text-muted-foreground">Hall of Fame - Compétition locale</p>
        </div>

        <div className="bg-card border border-border rounded-[24px] p-4">
          <p className="text-sm text-muted-foreground mb-3">Confidentialité</p>
          <div className="flex gap-2">
            <motion.button
              onClick={() => setPrivacyMode('public')}
              className={`px-4 py-2 rounded-[16px] flex items-center gap-2 transition-colors ${
                privacyMode === 'public'
                  ? 'bg-primary text-white'
                  : 'bg-secondary text-secondary-foreground'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Eye className="w-4 h-4" />
              Public
            </motion.button>
            <motion.button
              onClick={() => setPrivacyMode('anonymous')}
              className={`px-4 py-2 rounded-[16px] flex items-center gap-2 transition-colors ${
                privacyMode === 'anonymous'
                  ? 'bg-primary text-white'
                  : 'bg-secondary text-secondary-foreground'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <EyeOff className="w-4 h-4" />
              Anonyme
            </motion.button>
            <motion.button
              onClick={() => setPrivacyMode('private')}
              className={`px-4 py-2 rounded-[16px] flex items-center gap-2 transition-colors ${
                privacyMode === 'private'
                  ? 'bg-primary text-white'
                  : 'bg-secondary text-secondary-foreground'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Lock className="w-4 h-4" />
              Privé
            </motion.button>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-card border border-border rounded-[24px] overflow-hidden"
        style={{
          boxShadow: '8px 8px 16px rgba(0,0,0,0.1), -8px -8px 16px rgba(255,255,255,0.05)'
        }}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary border-b border-border">
              <tr>
                <th className="px-6 py-4 text-left">Rang</th>
                <th className="px-6 py-4 text-left">Utilisateur</th>
                <th className="px-6 py-4 text-left">Badge</th>
                <th className="px-6 py-4 text-right">Score</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData.map((user, index) => {
                const displayName = privacyMode === 'anonymous' && user.isCurrentUser
                  ? 'Utilisateur Anonyme'
                  : privacyMode === 'private' && user.isCurrentUser
                  ? 'Masqué'
                  : user.name;

                const showScore = privacyMode !== 'private' || !user.isCurrentUser;

                return (
                  <motion.tr
                    key={user.rank}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`border-b border-border transition-colors ${
                      user.isCurrentUser
                        ? 'bg-primary/10'
                        : 'hover:bg-secondary/50'
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {getRankIcon(user.rank)}
                        <span className="font-semibold">#{user.rank}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
                          {displayName.charAt(0)}
                        </div>
                        <span className="font-medium">{displayName}</span>
                        {user.isCurrentUser && (
                          <span className="px-2 py-1 bg-primary text-white text-xs rounded-full">
                            Vous
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-primary/20 text-primary rounded-[12px] text-sm">
                        {user.badge}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {showScore ? (
                        <span className="font-semibold text-lg">{user.score.toLocaleString()}</span>
                      ) : (
                        <Lock className="w-5 h-5 text-muted-foreground ml-auto" />
                      )}
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>

      {privacyMode === 'public' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-primary/10 border border-primary/20 rounded-[24px] p-4 flex items-start gap-3"
        >
          <Unlock className="w-5 h-5 text-primary mt-0.5" />
          <div>
            <p className="text-sm text-foreground font-medium">Mode Public activé</p>
            <p className="text-xs text-muted-foreground mt-1">
              Votre nom, score et badges sont visibles par la communauté
            </p>
          </div>
        </motion.div>
      )}

      {privacyMode === 'anonymous' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-secondary border border-border rounded-[24px] p-4 flex items-start gap-3"
        >
          <EyeOff className="w-5 h-5 text-muted-foreground mt-0.5" />
          <div>
            <p className="text-sm text-foreground font-medium">Mode Anonyme activé</p>
            <p className="text-xs text-muted-foreground mt-1">
              Seul votre score est visible, votre nom est masqué
            </p>
          </div>
        </motion.div>
      )}

      {privacyMode === 'private' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-secondary border border-border rounded-[24px] p-4 flex items-start gap-3"
        >
          <Lock className="w-5 h-5 text-muted-foreground mt-0.5" />
          <div>
            <p className="text-sm text-foreground font-medium">Mode Privé activé</p>
            <p className="text-xs text-muted-foreground mt-1">
              Votre profil est complètement masqué du classement public
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
