import { motion } from 'motion/react';
import { Phone, Calendar, MapPin, HelpCircle } from 'lucide-react';

export default function AssistanceMode() {
  return (
    <div className="p-6 space-y-6 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl mb-3 text-foreground">Mode Assistance</h1>
        <p className="text-xl text-muted-foreground">
          Service simplifié pour vous accompagner
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border-4 border-primary rounded-[24px] p-8"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
            <Phone className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl text-foreground">Collecteur à Domicile</h2>
            <p className="text-lg text-muted-foreground">Service gratuit</p>
          </div>
        </div>

        <p className="text-lg text-foreground mb-6 leading-relaxed">
          Un collecteur vient récupérer vos déchets recyclables directement chez vous.
          Service simple et gratuit pour les résidents.
        </p>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-6 bg-primary text-white rounded-[20px] text-2xl font-semibold"
        >
          Demander une Collecte
        </motion.button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card border-2 border-border rounded-[24px] p-6"
        >
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Calendar className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-xl text-foreground mb-2">Prochains Passages</h3>
          <p className="text-lg text-muted-foreground">
            Lundi 14 Avril à 14h00
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card border-2 border-border rounded-[24px] p-6"
        >
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <MapPin className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-xl text-foreground mb-2">Point de Dépôt</h3>
          <p className="text-lg text-muted-foreground">
            À 350m de chez vous
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-secondary border-2 border-border rounded-[24px] p-6"
      >
        <div className="flex items-start gap-4">
          <HelpCircle className="w-8 h-8 text-primary mt-1" />
          <div>
            <h3 className="text-xl text-foreground mb-2">Besoin d'aide ?</h3>
            <p className="text-lg text-muted-foreground mb-4">
              Notre équipe est disponible pour vous assister
            </p>
            <a
              href="tel:0800000000"
              className="text-2xl text-primary font-semibold"
            >
              📞 0800 000 000
            </a>
            <p className="text-sm text-muted-foreground mt-1">
              Appel gratuit, du lundi au vendredi
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
