import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Upload, Camera, X, Sparkles, CheckCircle } from 'lucide-react';
import AROverlay from './AROverlay';

export default function DesktopImageUpload() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [detectedItem, setDetectedItem] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        analyzeImage();
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = () => {
    setIsAnalyzing(true);

    // Simuler l'analyse IA
    setTimeout(() => {
      setIsAnalyzing(false);
      setDetectedItem({
        name: 'Bouteille Plastique PET',
        category: 'Plastique',
        recyclable: true,
        co2: 82,
        points: 45,
      });
    }, 2000);
  };

  const handleReset = () => {
    setSelectedImage(null);
    setDetectedItem(null);
    setIsAnalyzing(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleValidate = () => {
    // Animation de validation
    setTimeout(() => {
      handleReset();
    }, 1000);
  };

  return (
    <div className="p-8 space-y-6">
      <div>
        <h2 className="text-foreground mb-1">Scanner IA Desktop</h2>
        <p className="text-muted-foreground">Téléchargez une image ou utilisez votre webcam</p>
      </div>

      <div className="max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          {!selectedImage ? (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              {/* Zone de drop */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="relative border-2 border-dashed border-border rounded-[24px] p-16 text-center bg-card hover:border-primary transition-all cursor-pointer group"
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />

                <div className="space-y-4">
                  <motion.div
                    className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto group-hover:bg-primary/20 transition-colors"
                    whileHover={{ rotate: 10 }}
                  >
                    <Upload className="w-12 h-12 text-primary" />
                  </motion.div>

                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Glissez votre image ici
                    </h3>
                    <p className="text-muted-foreground">
                      ou cliquez pour sélectionner un fichier
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      PNG, JPG jusqu'à 10MB
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Option webcam */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-secondary border border-border rounded-[20px] text-foreground font-semibold hover:border-primary transition-all flex items-center justify-center gap-3"
              >
                <Camera className="w-5 h-5" />
                Utiliser la webcam
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="analysis"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative"
            >
              <div className="bg-card border border-border rounded-[24px] overflow-hidden">
                {/* Image prévisualisée */}
                <div className="relative aspect-video bg-black">
                  <img
                    src={selectedImage}
                    alt="Analyse"
                    className="w-full h-full object-contain"
                  />

                  {/* Bouton fermer */}
                  <button
                    onClick={handleReset}
                    className="absolute top-4 right-4 w-10 h-10 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/80 transition-colors"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>

                  {/* Overlay d'analyse */}
                  {isAnalyzing && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center"
                    >
                      <div className="text-center text-white">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                          className="w-16 h-16 mx-auto mb-4"
                        >
                          <Sparkles className="w-full h-full" />
                        </motion.div>
                        <p className="text-lg font-semibold">Analyse IA en cours...</p>
                        <p className="text-sm text-white/80 mt-1">Identification du déchet</p>
                      </div>
                    </motion.div>
                  )}

                  {/* Résultat de détection */}
                  {detectedItem && !isAnalyzing && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <CheckCircle className="w-6 h-6 text-primary" />
                            <h3 className="text-xl font-semibold text-white">Détecté !</h3>
                          </div>
                          <p className="text-white/90">{detectedItem.name}</p>
                        </div>
                        <span className="px-4 py-2 bg-primary rounded-[12px] text-white font-semibold">
                          +{detectedItem.points} pts
                        </span>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Informations détaillées */}
                {detectedItem && !isAnalyzing && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 space-y-4"
                  >
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-secondary rounded-[16px] p-4 text-center">
                        <p className="text-sm text-muted-foreground mb-1">Catégorie</p>
                        <p className="text-lg font-semibold text-foreground">{detectedItem.category}</p>
                      </div>
                      <div className="bg-secondary rounded-[16px] p-4 text-center">
                        <p className="text-sm text-muted-foreground mb-1">Impact CO₂</p>
                        <p className="text-lg font-semibold text-foreground">{detectedItem.co2}g</p>
                      </div>
                      <div className="bg-secondary rounded-[16px] p-4 text-center">
                        <p className="text-sm text-muted-foreground mb-1">Recyclable</p>
                        <p className="text-lg font-semibold text-primary">
                          {detectedItem.recyclable ? 'Oui' : 'Non'}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <motion.button
                        onClick={handleValidate}
                        className="flex-1 py-3 bg-primary text-white rounded-[16px] font-semibold"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Valider le Tri
                      </motion.button>
                      <motion.button
                        onClick={handleReset}
                        className="px-6 py-3 bg-secondary text-foreground rounded-[16px] font-semibold hover:bg-secondary/80 transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Nouvelle analyse
                      </motion.button>
                    </div>

                    <div className="bg-primary/10 border border-primary/20 rounded-[16px] p-4">
                      <p className="text-sm text-foreground">
                        <span className="font-semibold">Consigne :</span> Jetez dans le bac jaune - Recyclage plastique. Pensez à retirer le bouchon et à rincer la bouteille.
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Instructions */}
        {!selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 grid grid-cols-3 gap-4"
          >
            {[
              { step: '1', title: 'Photographiez', desc: 'Prenez une photo nette du déchet' },
              { step: '2', title: 'Analysez', desc: 'L\'IA identifie automatiquement le type' },
              { step: '3', title: 'Triez', desc: 'Suivez les instructions de tri' },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="bg-card border border-border rounded-[16px] p-4 text-center"
              >
                <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-3 font-semibold">
                  {item.step}
                </div>
                <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
