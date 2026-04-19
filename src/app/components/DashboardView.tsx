import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { motion } from 'motion/react';
import { TrendingDown, Droplet, Leaf, Award } from 'lucide-react';

const co2Data = [
  { month: 'Jan', co2: 45, eau: 120 },
  { month: 'Fév', co2: 38, eau: 105 },
  { month: 'Mar', co2: 32, eau: 98 },
  { month: 'Avr', co2: 28, eau: 85 },
  { month: 'Mai', co2: 22, eau: 78 },
  { month: 'Juin', co2: 18, eau: 65 },
];

const triData = [
  { category: 'Plastique', count: 245 },
  { category: 'Verre', count: 189 },
  { category: 'Papier', count: 312 },
  { category: 'Métal', count: 156 },
  { category: 'Organique', count: 423 },
];

const stats = [
  { label: 'CO₂ Économisé', value: '187 kg', icon: TrendingDown, trend: '-24%' },
  { label: 'Eau Préservée', value: '651 L', icon: Droplet, trend: '-18%' },
  { label: 'Score EcoLocal', value: '8,542', icon: Award, trend: '+32%' },
  { label: 'Arbres Plantés', value: '23', icon: Leaf, trend: '+15%' },
];

export default function DashboardView() {
  return (
    <div className="p-8 space-y-6">
      <div>
        <h2 className="text-foreground mb-1">Tableau de Bord</h2>
        <p className="text-muted-foreground">Votre impact environnemental en temps réel</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-card border border-border rounded-[24px] p-6"
              style={{
                boxShadow: '8px 8px 16px rgba(0,0,0,0.1), -8px -8px 16px rgba(255,255,255,0.05)'
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-[16px] bg-primary/10 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <span className={`text-sm px-2 py-1 rounded-full ${
                  stat.trend.startsWith('+') ? 'bg-primary/10 text-primary' : 'bg-primary/10 text-primary'
                }`}>
                  {stat.trend}
                </span>
              </div>
              <div className="text-3xl font-semibold text-foreground mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-card border border-border rounded-[24px] p-6"
          style={{
            boxShadow: '8px 8px 16px rgba(0,0,0,0.1), -8px -8px 16px rgba(255,255,255,0.05)'
          }}
        >
          <h3 className="text-foreground mb-4">Évolution CO₂ & Eau</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={co2Data}>
              <defs>
                <linearGradient id="colorCo2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#52B788" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#52B788" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorEau" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#40916C" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#40916C" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" stroke="#a0a0a0" />
              <YAxis stroke="#a0a0a0" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1a1a1a',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                }}
              />
              <Area type="monotone" dataKey="co2" stroke="#52B788" fillOpacity={1} fill="url(#colorCo2)" strokeWidth={2} />
              <Area type="monotone" dataKey="eau" stroke="#40916C" fillOpacity={1} fill="url(#colorEau)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-card border border-border rounded-[24px] p-6"
          style={{
            boxShadow: '8px 8px 16px rgba(0,0,0,0.1), -8px -8px 16px rgba(255,255,255,0.05)'
          }}
        >
          <h3 className="text-foreground mb-4">Répartition par Matériau</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={triData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="category" stroke="#a0a0a0" />
              <YAxis stroke="#a0a0a0" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1a1a1a',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                }}
              />
              <Bar dataKey="count" fill="#52B788" radius={[12, 12, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="bg-card border border-border rounded-[24px] p-6"
        style={{
          boxShadow: '8px 8px 16px rgba(0,0,0,0.1), -8px -8px 16px rgba(255,255,255,0.05)'
        }}
      >
        <h3 className="text-foreground mb-4">Projection IA - Impact Futur (6 mois)</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={[
            { month: 'Juil', predicted: 15 },
            { month: 'Août', predicted: 13 },
            { month: 'Sep', predicted: 10 },
            { month: 'Oct', predicted: 8 },
            { month: 'Nov', predicted: 6 },
            { month: 'Déc', predicted: 4 },
          ]}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="month" stroke="#a0a0a0" />
            <YAxis stroke="#a0a0a0" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1a1a1a',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
              }}
            />
            <Line type="monotone" dataKey="predicted" stroke="#52B788" strokeWidth={3} strokeDasharray="5 5" />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}
