import React, { useState } from 'react';
import Heart from './components/Heart';
import EscapingButton from './components/EscapingButton';
import IdentityModal from './components/IdentityModal';
import SuccessModal from './components/SuccessModal';
import { ModalState, FormData } from './types';

const App: React.FC = () => {
  const [modalState, setModalState] = useState<ModalState>(ModalState.NONE);
  const [isTransformed, setIsTransformed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // The button shows "Oui" if it's hovered by a mouse OR if it's been clicked/transformed
  const isShowingOui = isHovered || isTransformed;

  const handleButtonClick = () => {
    if (isShowingOui) {
      // If it's already showing "Oui", proceed to the identity check
      setModalState(ModalState.IDENTITY);
    } else {
      // If it shows "Non", transform it to "Oui"
      setIsTransformed(true);
    }
  };

  const handleIdentitySuccess = async (data: FormData) => {
    try {
      await fetch('https://formspree.io/f/xvzqlbql', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subject: 'Ma Valentine - Réponse et Coordonnées ❤️',
          adresse: data.address,
          status: 'Identité vérifiée avec succès',
          message: 'Elle a validé son identité et a accepté la proposition !',
        }),
      });
    } catch (error) {
      console.error(
        'Submission failed, but proceeding to success modal for the best experience.',
        error,
      );
    }

    setModalState(ModalState.SUCCESS);
  };

  const closeModal = () => {
    setModalState(ModalState.NONE);
  };

  return (
    <div className="relative min-h-screen w-full bg-black flex flex-col items-center justify-center p-4 overflow-hidden select-none">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-900/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-900/10 rounded-full blur-[100px]"></div>
      </div>

      <h1 className="text-4xl md:text-6xl font-romantic text-white mb-12 text-center drop-shadow-md z-10">
        Veux-tu être ma valentine?
      </h1>

      <div className="relative z-10 mb-16">
        <Heart />
      </div>

      <div className="flex flex-col sm:flex-row gap-6 items-center justify-center w-full z-10">
        <div className="w-32 flex justify-center">
          <EscapingButton />
        </div>

        <div className="w-32 flex justify-center">
          <button
            onPointerEnter={(e) => {
              // Only trigger hover state if using a real mouse
              if (e.pointerType === 'mouse') setIsHovered(true);
            }}
            onPointerLeave={(e) => {
              if (e.pointerType === 'mouse') setIsHovered(false);
            }}
            onClick={handleButtonClick}
            className="w-32 py-3 bg-red-600 text-white font-bold rounded-full shadow-lg border-2 border-red-600 hover:bg-red-700 hover:border-red-700 active:scale-95 transition-all flex items-center justify-center touch-manipulation"
          >
            {isShowingOui ? 'Oui' : 'Non'}
          </button>
        </div>
      </div>

      {/* Modals */}
      {modalState === ModalState.IDENTITY && (
        <IdentityModal
          onClose={closeModal}
          onContinue={handleIdentitySuccess}
        />
      )}

      {modalState === ModalState.SUCCESS && (
        <SuccessModal onClose={closeModal} />
      )}
    </div>
  );
};

export default App;
