import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, DollarSign, ArrowUpRight, ArrowDownRight, CreditCard, PieChart, Activity, X } from 'lucide-react';

const FinanceCard = ({ title, value, subtext, icon: Icon, isPositive }) => (
  <div className="glass-panel p-6 border border-white/5">
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 rounded-xl bg-white/5 border border-white/10">
        <Icon className="w-5 h-5 text-[#10B981]" />
      </div>
      <span className={`text-xs font-bold px-2 py-1 rounded-full ${isPositive ? 'bg-[#10B981]/10 text-[#10B981]' : 'bg-[#EF4444]/10 text-[#EF4444]'}`}>
        {isPositive ? '+12%' : '-4%'}
      </span>
    </div>
    <p className="text-gray-400 text-xs uppercase tracking-widest font-bold mb-1">{title}</p>
    <h3 className="text-2xl font-bold text-white mb-2">{value}</h3>
    <p className="text-[10px] text-gray-500">{subtext}</p>
  </div>
);

const Finance = () => {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('creator_transactions');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'YouTube AdSense', date: 'Oct 24, 2023', amount: 18500, type: 'income' },
      { id: 2, name: 'Adobe Creative Cloud', date: 'Oct 22, 2023', amount: 4200, type: 'expense' },
      { id: 3, name: 'Sponsorship - TechBrand', date: 'Oct 20, 2023', amount: 25000, type: 'income' },
    ];
  });

  const [showForm, setShowForm] = useState(false);
  const [newTx, setNewTx] = useState({ name: '', amount: '', type: 'income' });

  useEffect(() => {
    localStorage.setItem('creator_transactions', JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (e) => {
    e.preventDefault();
    if (!newTx.name || !newTx.amount) return;

    const tx = {
      id: Date.now(),
      name: newTx.name,
      amount: parseFloat(newTx.amount),
      type: newTx.type,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    };

    setTransactions([tx, ...transactions]);
    setNewTx({ name: '', amount: '', type: 'income' });
    setShowForm(false);
  };

  const revenue = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
  const expenses = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
  const balance = revenue - expenses;

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Money Tracker</h1>
          <p className="text-gray-400">Manage your creator earnings manually.</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-[#10B981] text-[#0B0F19] px-6 py-3 rounded-xl font-black hover:bg-[#10B981]/80 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)]"
        >
          {showForm ? 'Cancel' : 'Add Transaction'}
        </button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <form onSubmit={addTransaction} className="glass-panel p-6 grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div className="space-y-2">
                <label className="text-xs text-gray-500 font-bold uppercase">Transaction Name</label>
                <input 
                  type="text" 
                  value={newTx.name}
                  onChange={(e) => setNewTx({...newTx, name: e.target.value})}
                  placeholder="e.g. AdSense"
                  className="w-full bg-[#0B0F19] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:border-[#10B981] outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-gray-500 font-bold uppercase">Amount (₹)</label>
                <input 
                  type="number" 
                  value={newTx.amount}
                  onChange={(e) => setNewTx({...newTx, amount: e.target.value})}
                  placeholder="0.00"
                  className="w-full bg-[#0B0F19] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:border-[#10B981] outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-gray-500 font-bold uppercase">Type</label>
                <select 
                  value={newTx.type}
                  onChange={(e) => setNewTx({...newTx, type: e.target.value})}
                  className="w-full bg-[#0B0F19] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:border-[#10B981] outline-none appearance-none"
                >
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </div>
              <button type="submit" className="bg-white text-black h-[42px] rounded-xl font-bold hover:bg-gray-200 transition-all">
                Submit
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <FinanceCard title="Total Balance" value={`₹${balance.toLocaleString()}`} subtext="Calculated from your entries" icon={Wallet} isPositive={balance >= 0} />
        <FinanceCard title="Monthly Revenue" value={`₹${revenue.toLocaleString()}`} subtext="All manual income entries" icon={DollarSign} isPositive={true} />
        <FinanceCard title="Total Expenses" value={`₹${expenses.toLocaleString()}`} subtext="All manual expense entries" icon={CreditCard} isPositive={false} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="glass-panel p-6"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold text-white">Manual Transactions</h2>
              <button 
                onClick={() => {
                  if (confirm('Clear all transactions?')) setTransactions([]);
                }}
                className="text-sm text-[#EF4444] hover:underline"
              >
                Clear All
              </button>
            </div>
            <div className="space-y-4">
              {transactions.length === 0 ? (
                <div className="text-center py-20 text-gray-500 italic">No transactions added yet.</div>
              ) : (
                transactions.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-all group">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${tx.type === 'income' ? 'bg-[#10B981]/10 text-[#10B981]' : 'bg-[#EF4444]/10 text-[#EF4444]'}`}>
                        {tx.type === 'income' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">{tx.name}</p>
                        <p className="text-[10px] text-gray-500">{tx.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`text-sm font-black ${tx.type === 'income' ? 'text-[#10B981]' : 'text-white'}`}>
                        {tx.type === 'income' ? '+' : '-'}₹{tx.amount.toLocaleString()}
                      </span>
                      <button 
                        onClick={() => setTransactions(transactions.filter(t => t.id !== tx.id))}
                        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-[#EF4444]/20 rounded transition-all text-[#EF4444]"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </div>

        <div className="space-y-6">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="glass-panel p-6"
          >
            <h2 className="text-xl font-bold text-white mb-6">Revenue Breakdown</h2>
            <div className="space-y-6">
              {[
                { label: 'AdSense', value: 35, color: '#8B5CF6' },
                { label: 'Sponsorships', value: 45, color: '#10B981' },
                { label: 'Affiliates', value: 20, color: '#3B82F6' },
              ].map((item, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400 font-bold">{item.label}</span>
                    <span className="text-white font-black">{item.value}%</span>
                  </div>
                  <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${item.value}%`, backgroundColor: item.color }}></div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="glass-panel p-6 bg-gradient-to-br from-[#8B5CF6]/20 to-transparent border border-[#8B5CF6]/20"
          >
            <PieChart className="w-8 h-8 text-[#8B5CF6] mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Smart Savings</h3>
            <p className="text-xs text-gray-400 mb-6">Quest AI identified ₹4,500 in redundant subscriptions you can cancel.</p>
            <button className="w-full py-2 bg-[#8B5CF6] text-white font-bold text-xs rounded-lg hover:bg-[#8B5CF6]/80 transition-all">
              VIEW SAVINGS
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Finance;
