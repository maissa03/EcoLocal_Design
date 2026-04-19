import { useEffect } from 'react';
import { motion } from 'motion/react';
import { X, Share2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SuccessModalProps {
  data: {
    points: number;
    message: string;
    badge: string;
    progress: number;
  };
  onClose: () => void;
}

export default function SuccessModal({ data, onClose }: SuccessModalProps) {
  useEffect(() => {
    // Explosion de confettis en forme de feuilles vertes
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      zIndex: 9999,
    };

    function fire(particleRatio: number, opts: any) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
        colors: ['#52B788', '#40916C', '#2D6A4F', '#95D5B2', '#74C69D'],
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    fire(0.2, {
      spread: 60,
    });

    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });

    // Animation continue de feuilles qui tombent
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors: ['#52B788', '#40916C', '#95D5B2'],
        zIndex: 9999,
      });

      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors: ['#52B788', '#40916C', '#95D5B2'],
        zIndex: 9999,
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 z-[9998]"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 50 }}
        transition={{ type: 'spring', duration: 0.5 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-card border border-border rounded-[32px] p-8 max-w-lg w-full text-center relative overflow-hidden"
      >
        {/* Bouton fermer */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-secondary hover:bg-secondary/80 flex items-center justify-center transition-colors z-10"
        >
          <X className="w-5 h-5 text-foreground" />
        </button>

        {/* Animation de fond */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-primary to-green-600"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>

        {/* Contenu */}
        <div className="relative z-10">
          {/* Points animés */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="mb-6"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="inline-block px-8 py-4 bg-primary rounded-[24px] shadow-[0_0_50px_rgba(82,183,136,0.5)]"
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-5xl font-bold text-white"
              >
                +{data.points}
              </motion.span>
            </motion.div>
          </motion.div>

          {/* Titre */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-3xl font-semibold text-foreground mb-4"
          >
            🎉 Félicitations !
          </motion.h2>

          {/* Message */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-lg text-muted-foreground mb-6"
          >
            {data.message}
          </motion.p>

          {/* Jauge de progression circulaire */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="mb-6"
          >
            <div className="relative w-48 h-48 mx-auto">
              {/* Cercle de fond */}
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="80"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="none"
                  className="text-secondary"
                />
                {/* Cercle de progression */}
                <motion.circle
                  cx="96"
                  cy="96"
                  r="80"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="none"
                  strokeLinecap="round"
                  className="text-primary"
                  initial={{ strokeDasharray: '0 502' }}
                  animate={{ strokeDasharray: `${(data.progress / 100) * 502} 502` }}
                  transition={{ delay: 0.7, duration: 1, ease: 'easeOut' }}
                />
              </svg>

              {/* Texte au centre */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.span
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 }}
                  className="text-4xl font-bold text-foreground"
                >
                  {data.progress}%
                </motion.span>
                <span className="text-sm text-muted-foreground mt-1">vers le badge</span>
              </div>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="text-primary font-semibold mt-4"
            >
              🏆 {data.badge}
            </motion.p>
          </motion.div>

          {/* Boutons d'action */}
          <div className="flex gap-3">
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 }}
              onClick={onClose}
              className="flex-1 py-3 bg-primary text-white rounded-[16px] font-semibold hover:bg-primary/90 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Continuer
            </motion.button>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              className="flex-1 py-3 bg-secondary text-foreground rounded-[16px] font-semibold hover:bg-secondary/80 transition-colors flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Share2 className="w-5 h-5" />
              Partager mon impact
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
