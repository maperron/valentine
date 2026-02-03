
import React, { useState } from 'react';
import { FormData } from '../types';

interface IdentityModalProps {
  onContinue: (data: FormData) => void;
  onClose: () => void;
}

const IdentityModal: React.FC<IdentityModalProps> = ({ onContinue, onClose }) => {
  const [formData, setFormData] = useState<FormData>({
    prenom: '',
    nom: '',
    dobDay: '01',
    dobMonth: '01',
    dobYear: '2001',
    address: '',
  });

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString().padStart(2, '0'));
  const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
  const years = Array.from({ length: 100 }, (_, i) => (2024 - i).toString());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    // Strict Verification
    const isMaeva = formData.prenom.trim().toLowerCase() === 'maëva' || formData.prenom.trim().toLowerCase() === 'maeva';
    const isBagur = formData.nom.trim().toLowerCase() === 'bagur';
    const isDate = formData.dobDay === '27' && formData.dobMonth === '01' && formData.dobYear === '2001';

    if (isMaeva && isBagur && isDate) {
      setError('');
      setIsSubmitting(true);
      // We wrap the callback to ensure state is handled
      await onContinue(formData);
      // Note: isSubmitting stays true until component unmounts for smoothness
    } else {
      setError("Désolé, l'identité ne correspond pas à ma Valentine.");
    }
  };

  const inputClasses = "mt-1 w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none text-white transition-all disabled:opacity-50";
  const labelClasses = "block text-sm font-medium text-gray-400";

  return (
    <div 
      className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-[100] p-4"
      onClick={onClose}
    >
      <div 
        className="bg-black border-2 border-red-600 rounded-3xl p-8 w-full max-w-md shadow-[0_0_40px_rgba(220,38,38,0.3)] relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-white mb-6 text-center border-b border-zinc-800 pb-4 uppercase tracking-widest">
          Vérifier l'identité
        </h2>
        
        {error && (
          <div className="mb-6 p-3 bg-red-900/40 text-red-200 border border-red-800 rounded-lg text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className={labelClasses}>Prénom</label>
            <input
              type="text"
              required
              disabled={isSubmitting}
              className={inputClasses}
              value={formData.prenom}
              onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
              placeholder="Ex: Maëva"
            />
          </div>

          <div>
            <label className={labelClasses}>Nom</label>
            <input
              type="text"
              required
              disabled={isSubmitting}
              className={inputClasses}
              value={formData.nom}
              onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
              placeholder="Ex: Bagur"
            />
          </div>

          <div>
            <label className={labelClasses}>Date de naissance</label>
            <div className="grid grid-cols-3 gap-2 mt-1">
              <select 
                disabled={isSubmitting}
                className={inputClasses}
                value={formData.dobDay}
                onChange={(e) => setFormData({ ...formData, dobDay: e.target.value })}
              >
                {days.map(d => <option key={d} value={d} className="bg-zinc-900">{d}</option>)}
              </select>
              <select 
                disabled={isSubmitting}
                className={inputClasses}
                value={formData.dobMonth}
                onChange={(e) => setFormData({ ...formData, dobMonth: e.target.value })}
              >
                {months.map(m => <option key={m} value={m} className="bg-zinc-900">{m}</option>)}
              </select>
              <select 
                disabled={isSubmitting}
                className={inputClasses}
                value={formData.dobYear}
                onChange={(e) => setFormData({ ...formData, dobYear: e.target.value })}
              >
                {years.map(y => <option key={y} value={y} className="bg-zinc-900">{y}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className={labelClasses}>Adresse</label>
            <textarea
              required
              disabled={isSubmitting}
              rows={3}
              className={inputClasses}
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="Où habites-tu ?"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-red-600 text-white py-4 rounded-xl font-bold hover:bg-red-700 active:scale-95 transition-all shadow-[0_0_20px_rgba(220,38,38,0.4)] mt-6 uppercase tracking-tighter flex items-center justify-center disabled:bg-zinc-800 disabled:shadow-none"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Vérification en cours...
              </span>
            ) : "Continuer"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default IdentityModal;
