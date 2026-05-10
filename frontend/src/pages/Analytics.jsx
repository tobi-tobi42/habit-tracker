import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Eye, Clock, Share2, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const AnalyticsCard = ({ title, value, change, isPositive, icon: Icon, delay }) => (
  <motion.div 
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay }}
    className="glass-panel p-6"
  >
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 rounded-xl bg-white/5 border border-white/10">
        <Icon className="w-5 h-5 text-[#8B5CF6]" />
      </div>
      <div className={`flex items-center gap-1 text-sm font-bold ${isPositive ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
        {isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
        {change}
      </div>
    </div>
    <p className="text-gray-400 text-sm font-medium mb-1">{title}</p>
    <h3 className="text-2xl font-bold text-white">{value}</h3>
  </motion.div>
);

const Analytics = () => {
  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        fill: true,
        label: 'Views',
        data: [4500, 5900, 8000, 7100, 9500, 12000],
        borderColor: '#8B5CF6',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const barData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Engagement',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: '#10B981',
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#64748b' } },
      x: { grid: { display: false }, ticks: { color: '#64748b' } },
    },
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Channel Analytics</h1>
          <p className="text-gray-400">Real-time data for your creator journey.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm font-medium hover:bg-white/10 transition-all">Last 30 Days</button>
          <button className="px-4 py-2 bg-[#8B5CF6] text-white rounded-xl text-sm font-bold shadow-[0_0_15px_rgba(139,92,246,0.3)]">Export Report</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnalyticsCard title="Total Views" value="1.2M" change="+12.5%" isPositive={true} icon={Eye} delay={0.1} />
        <AnalyticsCard title="Subscribers" value="45,200" change="+8.2%" isPositive={true} icon={Users} delay={0.2} />
        <AnalyticsCard title="Avg. Watch Time" value="4m 32s" change="-2.1%" isPositive={false} icon={Clock} delay={0.3} />
        <AnalyticsCard title="Shares" value="12,840" change="+24.1%" isPositive={true} icon={Share2} delay={0.4} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="glass-panel p-6"
        >
          <h2 className="text-xl font-bold text-white mb-6">Views Growth</h2>
          <div className="h-80">
            <Line data={lineData} options={options} />
          </div>
        </motion.div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="glass-panel p-6"
        >
          <h2 className="text-xl font-bold text-white mb-6">Weekly Engagement</h2>
          <div className="h-80">
            <Bar data={barData} options={options} />
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="glass-panel overflow-hidden"
      >
        <div className="p-6 border-b border-white/5">
          <h2 className="text-xl font-bold text-white">Top Performing Content</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-500 text-sm border-b border-white/5">
                <th className="px-6 py-4 font-medium">Video Title</th>
                <th className="px-6 py-4 font-medium">Views</th>
                <th className="px-6 py-4 font-medium">CTR</th>
                <th className="px-6 py-4 font-medium">Revenue</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {[
                { title: '10 Tips for Better Editing', views: '250K', ctr: '12.4%', rev: '₹12,400' },
                { title: 'My $5000 Studio Setup', views: '180K', ctr: '8.9%', rev: '₹9,200' },
                { title: 'Day in the Life of a Creator', views: '145K', ctr: '15.2%', rev: '₹7,800' },
              ].map((video, i) => (
                <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-all">
                  <td className="px-6 py-4 text-white font-medium">{video.title}</td>
                  <td className="px-6 py-4 text-gray-400">{video.views}</td>
                  <td className="px-6 py-4 text-[#10B981] font-bold">{video.ctr}</td>
                  <td className="px-6 py-4 text-white font-bold">{video.rev}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default Analytics;
