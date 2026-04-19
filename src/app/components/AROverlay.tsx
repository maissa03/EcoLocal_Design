import { motion } from 'motion/react';
import { X, CheckCircle, TrendingDown, Award, Recycle } from 'lucide-react';

interface AROverlayProps {
  item: {
    name: string;
    category: string;
    recyclable: boolean;
    co2: number;
    points: number;
  };
  onValidate: () => void;
  onClose: () => void;
}

export default function AROverlay({ item, onValidate, onClose }: AROverlayProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-40"
    >
      {/* Contour de détection AR */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-80"
      >
        {/* Coins AR */}
        <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-primary rounded-tl-2xl" />
        <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-primary rounded-tr-2xl" />
        <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-primary rounded-bl-2xl" />
        <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-primary rounded-br-2xl" />

        {/* Lignes de scan */}
        <motion.div
          className="absolute inset-0 border-2 border-primary/50 rounded-2xl"
          animate={{
            boxShadow: [
              '0 0 20px rgba(82,183,136,0.5)',
              '0 0 40px rgba(82,183,136,0.8)',
              '0 0 20px rgba(82,183,136,0.5)',
            ],
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />

        {/* Label de détection */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="absolute -top-16 left-1/2 -translate-x-1/2 bg-primary px-4 py-2 rounded-[16px] whitespace-nowrap shadow-[0_0_30px_rgba(82,183,136,0.6)]"
        >
          <p className="text-white text-sm font-medium flex items-center gap-2">
            <Recycle className="w-4 h-4" />
            {item.category}
          </p>
        </motion.div>
      </motion.div>

      {/* Carte d'information AR */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="absolute bottom-32 left-4 right-4 bg-black/90 backdrop-blur-xl rounded-[24px] p-6 border border-white/20"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-white font-semibold mb-1">{item.name}</h3>
            <div className="flex items-center gap-2">
              {item.recyclable && (
                <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-xs flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  Recyclable
                </span>
              )}
              <span className="px-3 py-1 bg-white/10 text-white rounded-full text-xs">
                {item.category}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white/5 rounded-[16px] p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="w-5 h-5 text-primary" />
              <span className="text-xs text-gray-400">Impact CO₂</span>
            </div>
            <p className="text-2xl font-semibold text-white">{item.co2}g</p>
          </div>
          <div className="bg-white/5 rounded-[16px] p-4">
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-5 h-5 text-primary" />
              <span className="text-xs text-gray-400">Points</span>
            </div>
            <p className="text-2xl font-semibold text-primary">+{item.points}</p>
          </div>
        </div>

        <motion.button
          onClick={onValidate}
          className="w-full py-4 bg-primary rounded-[20px] text-white font-semibold shadow-[0_0_30px_rgba(82,183,136,0.4)]"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Valider le Tri
        </motion.button>

        <p className="text-center text-xs text-gray-400 mt-3">
          Jetez dans le bac jaune - Recyclage plastique
        </p>
      </motion.div>

      {/* Points de données AR flottants */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute top-1/3 right-8 bg-black/80 backdrop-blur-md rounded-[16px] px-3 py-2 border border-primary/30"
      >
        <p className="text-xs text-gray-400">Matériau</p>
        <p className="text-sm text-white font-medium">PET #1</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6 }}
        className="absolute top-1/2 left-8 bg-black/80 backdrop-blur-md rounded-[16px] px-3 py-2 border border-primary/30"
      >
        <p className="text-xs text-gray-400">Poids estimé</p>
        <p className="text-sm text-white font-medium">18g</p>
      </motion.div>
    </motion.div>
  );
}
