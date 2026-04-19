import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Recycle, AlertCircle, CheckCircle, X } from 'lucide-react';

const categories = [
  {
    id: 'plastic',
    name: 'Plastique',
    color: 'bg-yellow-500',
    icon: '🟨',
    items: [
      { name: 'Bouteilles PET', recyclable: true, bin: 'Bac Jaune', tips: 'Retirer le bouchon et rincer' },
      { name: 'Sacs plastique', recyclable: false, bin: 'Ordures ménagères', tips: 'Réutiliser ou déposer en magasin' },
      { name: 'Barquettes alimentaires', recyclable: true, bin: 'Bac Jaune', tips: 'Bien nettoyer avant' },
      { name: 'Film étirable', recyclable: false, bin: 'Ordures ménagères', tips: 'Éviter l\'utilisation, préférer des boîtes réutilisables' },
    ],
  },
  {
    id: 'glass',
    name: 'Verre',
    color: 'bg-green-500',
    icon: '🟩',
    items: [
      { name: 'Bouteilles en verre', recyclable: true, bin: 'Conteneur Verre', tips: 'Retirer les bouchons métalliques' },
      { name: 'Bocaux', recyclable: true, bin: 'Conteneur Verre', tips: 'Rincer et retirer les couvercles' },
      { name: 'Vaisselle en verre', recyclable: false, bin: 'Déchetterie', tips: 'Point de fusion différent, apporter en déchetterie' },
      { name: 'Miroirs', recyclable: false, bin: 'Déchetterie', tips: 'Traitement spécifique requis' },
    ],
  },
  {
    id: 'paper',
    name: 'Papier & Carton',
    color: 'bg-blue-500',
    icon: '🟦',
    items: [
      { name: 'Journaux', recyclable: true, bin: 'Bac Jaune', tips: 'Garder propres et secs' },
      { name: 'Cartons', recyclable: true, bin: 'Bac Jaune', tips: 'Aplatir les cartons' },
      { name: 'Papier d\'aluminium', recyclable: true, bin: 'Bac Jaune', tips: 'Former une boule de la taille d\'une balle de tennis' },
      { name: 'Papier gras', recyclable: false, bin: 'Ordures ménagères', tips: 'Le gras empêche le recyclage' },
    ],
  },
  {
    id: 'metal',
    name: 'Métal',
    color: 'bg-gray-500',
    icon: '⚫',
    items: [
      { name: 'Canettes aluminium', recyclable: true, bin: 'Bac Jaune', tips: 'Peuvent être compactées' },
      { name: 'Boîtes de conserve', recyclable: true, bin: 'Bac Jaune', tips: 'Rincer avant de jeter' },
      { name: 'Aérosols', recyclable: true, bin: 'Bac Jaune', tips: 'Vider complètement' },
      { name: 'Piles', recyclable: false, bin: 'Point de collecte spécial', tips: 'Déposer en magasin ou déchetterie' },
    ],
  },
  {
    id: 'organic',
    name: 'Organique',
    color: 'bg-amber-700',
    icon: '🟫',
    items: [
      { name: 'Épluchures', recyclable: true, bin: 'Compost', tips: 'Idéal pour le compostage domestique' },
      { name: 'Marc de café', recyclable: true, bin: 'Compost', tips: 'Excellent pour le compost' },
      { name: 'Restes de viande', recyclable: true, bin: 'Compost industriel', tips: 'Uniquement dans le compost collectif' },
      { name: 'Huile de cuisine', recyclable: false, bin: 'Déchetterie', tips: 'Ne jamais verser dans l\'évier' },
    ],
  },
];

export default function RecyclingGuide() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const filteredCategories = categories.map(cat => ({
    ...cat,
    items: cat.items.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  })).filter(cat => cat.items.length > 0);

  return (
    <div className="p-8 space-y-6">
      <div>
        <h2 className="text-foreground mb-1">Guide de Tri Intelligent</h2>
        <p className="text-muted-foreground">Apprenez à trier correctement vos déchets</p>
      </div>

      {/* Barre de recherche */}
      <div className="relative max-w-2xl">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Rechercher un type de déchet..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-4 bg-card border border-border rounded-[20px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Catégories */}
      <div className="flex gap-3 flex-wrap">
        {categories.map((cat) => (
          <motion.button
            key={cat.id}
            onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
            className={`px-6 py-3 rounded-[16px] font-medium transition-all ${
              selectedCategory === cat.id
                ? `${cat.color} text-white shadow-lg`
                : 'bg-card border border-border text-foreground hover:border-primary'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="mr-2">{cat.icon}</span>
            {cat.name}
          </motion.button>
        ))}
      </div>

      {/* Grille d'items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCategories
          .filter(cat => !selectedCategory || cat.id === selectedCategory)
          .map((category) =>
            category.items.map((item, index) => (
              <motion.div
                key={`${category.id}-${item.name}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedItem(item)}
                className="bg-card border border-border rounded-[20px] p-5 cursor-pointer hover:border-primary transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${category.color}`} />
                    <h3 className="font-semibold text-foreground">{item.name}</h3>
                  </div>
                  {item.recyclable ? (
                    <CheckCircle className="w-5 h-5 text-primary" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-destructive" />
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Recycle className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{item.bin}</span>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">{item.tips}</p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full mt-4 py-2 bg-primary/10 text-primary rounded-[12px] text-sm font-medium hover:bg-primary hover:text-white transition-colors"
                >
                  Voir détails
                </motion.button>
              </motion.div>
            ))
          )}
      </div>

      {/* Modal détails */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card border border-border rounded-[24px] p-8 max-w-lg w-full"
            >
              <div className="flex items-start justify-between mb-6">
                <h2 className="text-2xl font-semibold text-foreground">{selectedItem.name}</h2>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="w-8 h-8 rounded-full bg-secondary hover:bg-secondary/80 flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5 text-foreground" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-secondary rounded-[16px]">
                  {selectedItem.recyclable ? (
                    <>
                      <CheckCircle className="w-8 h-8 text-primary" />
                      <div>
                        <p className="font-semibold text-primary">Recyclable</p>
                        <p className="text-sm text-muted-foreground">Ce déchet peut être recyclé</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-8 h-8 text-destructive" />
                      <div>
                        <p className="font-semibold text-destructive">Non recyclable</p>
                        <p className="text-sm text-muted-foreground">Traitement spécial requis</p>
                      </div>
                    </>
                  )}
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Recycle className="w-5 h-5" />
                    Bac de collecte
                  </h3>
                  <p className="text-muted-foreground bg-primary/10 px-4 py-3 rounded-[12px]">
                    {selectedItem.bin}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">💡 Conseils pratiques</h3>
                  <p className="text-muted-foreground">{selectedItem.tips}</p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedItem(null)}
                  className="w-full py-3 bg-primary text-white rounded-[16px] font-semibold"
                >
                  Compris !
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Message si aucun résultat */}
      {filteredCategories.length === 0 && searchTerm && (
        <div className="text-center py-12">
          <AlertCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">
            Aucun résultat pour "{searchTerm}"
          </p>
        </div>
      )}
    </div>
  );
}
