import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Leaf, Sparkles } from 'lucide-react';

interface OnboardingProps {
  onComplete: (profile: any) => void;
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({
    routine: '',
    motivation: '',
    engagement: '',
  });

  const handleAnswer = (key: string, value: string) => {
    setAnswers({ ...answers, [key]: value });

    if (step < 3) {
      setTimeout(() => setStep(step + 1), 300);
    }
  };

  const completeOnboarding = () => {
    setStep(4);
    setTimeout(() => {
      onComplete(answers);
    }, 3000);
  };

  return (
    <div className="size-full bg-background flex items-center justify-center p-6">
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center max-w-2xl"
          >
            <motion.img
              src="/logo.png"
              alt="EcoLocal"
              className="w-48 h-48 mx-auto mb-8"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.8 }}
            />

            <h1 className="text-5xl mb-4 text-foreground">
              Agissez local, impactez global
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Transformez vos gestes quotidiens en impact environnemental mesurable
            </p>

            <motion.button
              onClick={() => setStep(1)}
              className="px-8 py-4 bg-primary text-white rounded-[24px] text-xl font-semibold inline-flex items-center gap-3 shadow-[0_0_40px_rgba(82,183,136,0.3)]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Découvrir mon profil éco
              <ArrowRight className="w-6 h-6" />
            </motion.button>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="q1"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="max-w-3xl w-full"
          >
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex-1 h-2 bg-primary rounded-full" />
                <div className="flex-1 h-2 bg-secondary rounded-full" />
                <div className="flex-1 h-2 bg-secondary rounded-full" />
              </div>
              <p className="text-sm text-muted-foreground">Question 1 sur 3</p>
            </div>

            <h2 className="text-3xl mb-4 text-foreground">Comment gérez-vous vos déchets aujourd\'hui ?</h2>
            <p className="text-muted-foreground mb-8">Soyez honnête, il n\'y a pas de mauvaise réponse</p>

            <div className="space-y-4">
              {[
                { value: 'beginner', label: '🌱 Je débute', desc: 'Je découvre le tri et l\'écologie' },
                { value: 'habit', label: '♻️ C\'est une habitude', desc: 'Je trie régulièrement' },
                { value: 'need_help', label: '🤝 J\'ai besoin d\'aide', desc: 'Je souhaite un accompagnement simplifié' },
              ].map((option) => (
                <motion.button
                  key={option.value}
                  onClick={() => handleAnswer('routine', option.value)}
                  className="w-full p-6 bg-card border-2 border-border rounded-[24px] text-left hover:border-primary transition-all"
                  whileHover={{ scale: 1.02, x: 10 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="text-xl font-semibold text-foreground mb-1">{option.label}</div>
                  <div className="text-muted-foreground">{option.desc}</div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="q2"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="max-w-3xl w-full"
          >
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex-1 h-2 bg-primary rounded-full" />
                <div className="flex-1 h-2 bg-primary rounded-full" />
                <div className="flex-1 h-2 bg-secondary rounded-full" />
              </div>
              <p className="text-sm text-muted-foreground">Question 2 sur 3</p>
            </div>

            <h2 className="text-3xl mb-4 text-foreground">Qu\'est-ce qui vous rendrait fier ?</h2>
            <p className="text-muted-foreground mb-8">Choisissez votre motivation principale</p>

            <div className="space-y-4">
              {[
                { value: 'stats', label: '📊 Voir mes stats', desc: 'Suivre mon impact en temps réel' },
                { value: 'community', label: '🏘️ Agir avec mon quartier', desc: 'Rejoindre une communauté locale' },
                { value: 'learn', label: '📚 Apprendre les bases', desc: 'Comprendre les enjeux écologiques' },
              ].map((option) => (
                <motion.button
                  key={option.value}
                  onClick={() => handleAnswer('motivation', option.value)}
                  className="w-full p-6 bg-card border-2 border-border rounded-[24px] text-left hover:border-primary transition-all"
                  whileHover={{ scale: 1.02, x: 10 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="text-xl font-semibold text-foreground mb-1">{option.label}</div>
                  <div className="text-muted-foreground">{option.desc}</div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="q3"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="max-w-3xl w-full"
          >
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex-1 h-2 bg-primary rounded-full" />
                <div className="flex-1 h-2 bg-primary rounded-full" />
                <div className="flex-1 h-2 bg-primary rounded-full" />
              </div>
              <p className="text-sm text-muted-foreground">Question 3 sur 3</p>
            </div>

            <h2 className="text-3xl mb-4 text-foreground">Quel est votre rythme ?</h2>
            <p className="text-muted-foreground mb-8">À vous de choisir votre niveau d\'engagement</p>

            <div className="space-y-4">
              {[
                { value: 'express', label: '⚡ Mode Express 2 min', desc: 'Actions rapides et efficaces' },
                { value: 'engaged', label: '🎯 Mode Engagé', desc: 'Suivi détaillé et challenges' },
                { value: 'zen', label: '🧘 Mode Zen', desc: 'À mon rythme, sans pression' },
              ].map((option) => (
                <motion.button
                  key={option.value}
                  onClick={() => {
                    handleAnswer('engagement', option.value);
                    setTimeout(completeOnboarding, 300);
                  }}
                  className="w-full p-6 bg-card border-2 border-border rounded-[24px] text-left hover:border-primary transition-all"
                  whileHover={{ scale: 1.02, x: 10 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="text-xl font-semibold text-foreground mb-1">{option.label}</div>
                  <div className="text-muted-foreground">{option.desc}</div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <motion.div
              className="relative w-64 h-64 mx-auto mb-8"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-64 h-64 text-primary" />
            </motion.div>

            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="relative inline-block mb-4">
                <Leaf className="w-32 h-32 text-primary mx-auto" />
                <motion.div
                  className="absolute inset-0"
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="w-full h-full rounded-full border-4 border-primary/30" />
                </motion.div>
              </div>

              <h2 className="text-3xl mb-2 text-foreground">
                Création de votre jardin numérique personnalisé...
              </h2>
              <p className="text-muted-foreground">
                Nous préparons votre expérience sur mesure
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
