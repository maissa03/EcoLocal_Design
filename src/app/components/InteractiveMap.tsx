import { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Navigation, Clock, Phone, Star } from 'lucide-react';

const workshops = [
  {
    id: 1,
    name: 'Centre de Tri Municipal',
    type: 'Point de collecte',
    address: '12 Rue de la République',
    distance: '350m',
    hours: 'Lun-Sam 8h-18h',
    phone: '01 23 45 67 89',
    rating: 4.8,
    lat: 48.8566,
    lng: 2.3522,
  },
  {
    id: 2,
    name: 'Atelier Repair Café',
    type: 'Réparation',
    address: '45 Avenue des Écoles',
    distance: '680m',
    hours: 'Mer-Ven 14h-19h',
    phone: '01 23 45 67 90',
    rating: 4.9,
    lat: 48.8576,
    lng: 2.3532,
  },
  {
    id: 3,
    name: 'Ressourcerie du Quartier',
    type: 'Réemploi',
    address: '78 Boulevard Vert',
    distance: '1.2km',
    hours: 'Mar-Sam 10h-17h',
    phone: '01 23 45 67 91',
    rating: 4.7,
    lat: 48.8586,
    lng: 2.3542,
  },
  {
    id: 4,
    name: 'EcoPoint Déchetterie',
    type: 'Déchets spéciaux',
    address: '23 Rue du Développement',
    distance: '1.8km',
    hours: 'Lun-Dim 9h-20h',
    phone: '01 23 45 67 92',
    rating: 4.5,
    lat: 48.8556,
    lng: 2.3512,
  },
];

export default function InteractiveMap() {
  const [selectedWorkshop, setSelectedWorkshop] = useState<number | null>(null);

  return (
    <div className="p-8 space-y-6">
      <div>
        <h2 className="text-foreground mb-1">Carte Interactive</h2>
        <p className="text-muted-foreground">Points de collecte et ateliers à proximité</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Carte */}
        <div className="lg:col-span-2">
          <div
            className="bg-card border border-border rounded-[24px] overflow-hidden relative"
            style={{ height: '600px' }}
          >
            {/* Carte simulée avec zones cliquables */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-card to-secondary/5">
              {/* Grille de rues */}
              <svg className="absolute inset-0 w-full h-full opacity-20">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-muted-foreground" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>

              {/* Points sur la carte */}
              {workshops.map((workshop, index) => {
                const positions = [
                  { top: '35%', left: '30%' },
                  { top: '50%', left: '60%' },
                  { top: '70%', left: '40%' },
                  { top: '25%', left: '70%' },
                ];

                return (
                  <motion.div
                    key={workshop.id}
                    className="absolute"
                    style={positions[index]}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <motion.button
                      onClick={() => setSelectedWorkshop(workshop.id)}
                      className={`relative group ${
                        selectedWorkshop === workshop.id ? 'z-20' : 'z-10'
                      }`}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <motion.div
                        className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg ${
                          selectedWorkshop === workshop.id
                            ? 'bg-primary ring-4 ring-primary/30'
                            : 'bg-primary/80 hover:bg-primary'
                        }`}
                        animate={
                          selectedWorkshop === workshop.id
                            ? { scale: [1, 1.1, 1] }
                            : {}
                        }
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        <MapPin className="w-6 h-6 text-white" />
                      </motion.div>

                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        <div className="bg-card border border-border rounded-[12px] p-2 whitespace-nowrap shadow-xl">
                          <p className="text-sm font-medium text-foreground">{workshop.name}</p>
                          <p className="text-xs text-muted-foreground">{workshop.distance}</p>
                        </div>
                      </div>

                      {/* Cercle animé */}
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-primary"
                        initial={{ scale: 1, opacity: 0.8 }}
                        animate={{ scale: 2, opacity: 0 }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </motion.button>
                  </motion.div>
                );
              })}

              {/* Position utilisateur */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              >
                <div className="w-4 h-4 bg-blue-500 rounded-full ring-4 ring-blue-500/30" />
              </motion.div>
            </div>

            {/* Contrôles */}
            <div className="absolute top-4 right-4 space-y-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 bg-card border border-border rounded-[12px] flex items-center justify-center shadow-lg"
              >
                <Navigation className="w-5 h-5 text-foreground" />
              </motion.button>
            </div>

            {/* Légende */}
            <div className="absolute bottom-4 left-4 bg-card/95 backdrop-blur-sm border border-border rounded-[16px] p-3">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 bg-blue-500 rounded-full" />
                <span className="text-foreground">Votre position</span>
              </div>
            </div>
          </div>
        </div>

        {/* Liste des ateliers */}
        <div className="space-y-4 overflow-y-auto" style={{ maxHeight: '600px' }}>
          {workshops.map((workshop, index) => (
            <motion.div
              key={workshop.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedWorkshop(workshop.id)}
              className={`bg-card border-2 rounded-[20px] p-4 cursor-pointer transition-all ${
                selectedWorkshop === workshop.id
                  ? 'border-primary shadow-[0_0_20px_rgba(82,183,136,0.3)]'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{workshop.name}</h3>
                  <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                    {workshop.type}
                  </span>
                </div>
                <div className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-full">
                  <Star className="w-3 h-3 text-primary fill-primary" />
                  <span className="text-xs text-primary font-semibold">{workshop.rating}</span>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <div>
                    <p>{workshop.address}</p>
                    <p className="text-primary font-semibold">{workshop.distance}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-4 h-4 flex-shrink-0" />
                  <p>{workshop.hours}</p>
                </div>

                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <a href={`tel:${workshop.phone}`} className="hover:text-primary transition-colors">
                    {workshop.phone}
                  </a>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-4 py-2 bg-primary/10 text-primary rounded-[12px] font-medium hover:bg-primary hover:text-white transition-colors"
              >
                Itinéraire
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
