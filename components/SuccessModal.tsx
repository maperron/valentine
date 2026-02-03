
import React, { useEffect } from 'react';

interface SuccessModalProps {
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ onClose }) => {
  useEffect(() => {
    // Re-initialize Tenor embed when modal opens
    const script = document.createElement('script');
    script.src = "https://tenor.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script if needed, though tenor.js is usually fine to stay
      const existingScript = document.querySelector('script[src="https://tenor.com/embed.js"]');
      if (existingScript && existingScript.parentNode) {
        // We leave it to avoid breaking other potential embeds, 
        // but re-running draw() is safer if Tenor is already on window.
        if ((window as any).Tenor) {
          (window as any).Tenor.draw();
        }
      }
    };
  }, []);

  return (
    <div 
      className="fixed inset-0 bg-black/95 backdrop-blur-xl flex items-center justify-center z-[110] p-4 cursor-pointer"
      onClick={onClose}
    >
      <div 
        className="bg-black border-2 border-red-600 rounded-[2.5rem] p-8 md:p-12 w-full max-w-xl shadow-[0_0_80px_rgba(220,38,38,0.5)] relative text-center cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle top glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-red-600 blur-sm"></div>
        
        <h2 className="text-3xl md:text-4xl font-romantic text-white mb-8 leading-tight">
          Parfait, puisque y'a que toi qui le mérite
        </h2>

        <div className="flex flex-col items-center justify-center w-full rounded-2xl overflow-hidden border-2 border-red-900/50 bg-zinc-950">
          <div 
            className="tenor-gif-embed w-full" 
            data-postid="13935913557128666445" 
            data-share-method="host" 
            data-aspect-ratio="1" 
            data-width="100%"
          >
            <a href="https://tenor.com/view/love-i-love-you-i-love-you-so-much-gif-13935913557128666445">
              Love I Love You Sticker
            </a>
            from 
            <a href="https://tenor.com/search/love-stickers">Love Stickers</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
