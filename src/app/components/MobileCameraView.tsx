import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, X, Zap, Leaf, Award } from 'lucide-react';
import AROverlay from './AROverlay';

export default function MobileCameraView() {
  const [isScanning, setIsScanning] = useState(false);
  const [detectedItem, setDetectedItem] = useState<any>(null);
  const [showPlantAnimation, setShowPlantAnimation] = useState(false);

  const startScan = () => {
    setIsScanning(true);

    // Simuler la détection après 2 secondes
    setTimeout(() => {
      setDetectedItem({
        name: 'Bouteille Plastique PET',
        category: 'Plastique',
        recyclable: true,
        co2: 82,
        points: 45,
      });
    }, 2000);
  };

  const validateTri = () => {
    setShowPlantAnimation(true);

    setTimeout(() => {
      setShowPlantAnimation(false);
      setIsScanning(false);
      setDetectedItem(null);
    }, 3000);
  };

  return (
    <div className="relative w-full h-full bg-black overflow-hidden">
      {/* Simulateur de caméra */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gray-700 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-gray-600 rounded-full blur-3xl" />
        </div>
      </div>

      {/* Grille de scan AR */}
      {isScanning && !detectedItem && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 grid grid-cols-8 grid-rows-12 gap-0.5 opacity-30">
            {Array.from({ length: 96 }).map((_, i) => (
              <div key={i} className="border border-primary/50" />
            ))}
          </div>
          <motion.div
            className="absolute inset-x-0 h-0.5 bg-primary shadow-[0_0_20px_rgba(82,183,136,0.8)]"
            animate={{ y: [0, window.innerHeight, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      )}

      {/* AR Overlay avec détection */}
      <AnimatePresence>
        {detectedItem && !showPlantAnimation && (
          <AROverlay item={detectedItem} onValidate={validateTri} onClose={() => {
            setDetectedItem(null);
            setIsScanning(false);
          }} />
        )}
      </AnimatePresence>

      {/* Animation de plante 3D */}
      <AnimatePresence>
        {showPlantAnimation && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm z-50"
          >
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              {/* Plante qui pousse */}
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="flex flex-col items-center origin-bottom"
              >
                {/* Feuilles */}
                <motion.div
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="relative mb-4"
                >
                  <Leaf className="w-24 h-24 text-primary drop-shadow-[0_0_30px_rgba(82,183,136,0.8)]" />
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ delay: 1, duration: 0.5 }}
                    className="absolute -top-6 -right-6"
                  >
                    <Leaf className="w-16 h-16 text-primary/80 rotate-45 drop-shadow-[0_0_20px_rgba(82,183,136,0.6)]" />
                  </motion.div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ delay: 1.2, duration: 0.5 }}
                    className="absolute -top-6 -left-6"
                  >
                    <Leaf className="w-16 h-16 text-primary/80 -rotate-45 drop-shadow-[0_0_20px_rgba(82,183,136,0.6)]" />
                  </motion.div>
                </motion.div>

                {/* Tige */}
                <motion.div
                  className="w-2 h-40 bg-gradient-to-t from-primary to-primary/60 rounded-full"
                />
              </motion.div>

              {/* Particules */}
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{
                    opacity: 0,
                    x: 0,
                    y: 0,
                    scale: 0
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    x: Math.random() * 200 - 100,
                    y: Math.random() * -200,
                    scale: [0, 1, 0]
                  }}
                  transition={{
                    delay: 0.5 + Math.random() * 0.5,
                    duration: 2,
                    ease: "easeOut"
                  }}
                  className="absolute w-2 h-2 bg-primary rounded-full"
                  style={{
                    filter: 'blur(1px)',
                    boxShadow: '0 0 10px rgba(82,183,136,0.8)'
                  }}
                />
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="text-center mt-8 space-y-2"
            >
              <div className="flex items-center justify-center gap-2 text-primary">
                <Award className="w-6 h-6" />
                <span className="text-2xl font-semibold">+45 Points</span>
              </div>
              <p className="text-white text-lg">Bravo ! Tri validé</p>
              <p className="text-gray-400 text-sm">Un arbre planté virtuellement</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bouton de scan */}
      {!isScanning && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={startScan}
          className="absolute bottom-32 left-1/2 -translate-x-1/2 w-20 h-20 bg-primary rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(82,183,136,0.6)]"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Camera className="w-10 h-10 text-white" />
        </motion.button>
      )}

      {/* Instructions */}
      {!isScanning && !detectedItem && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-24 left-0 right-0 text-center px-6"
        >
          <div className="bg-black/60 backdrop-blur-md rounded-[24px] p-6 border border-white/10">
            <Zap className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="text-white mb-2">Scan IA en Réalité Augmentée</h3>
            <p className="text-gray-300 text-sm">
              Pointez votre caméra vers un déchet pour identifier son type et son impact
            </p>
          </div>
        </motion.div>
      )}

      {isScanning && !detectedItem && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute top-24 left-0 right-0 text-center"
        >
          <div className="bg-black/60 backdrop-blur-md rounded-[24px] p-4 mx-6 border border-primary/50">
            <div className="flex items-center justify-center gap-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Zap className="w-6 h-6 text-primary" />
              </motion.div>
              <p className="text-white">Analyse en cours...</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
