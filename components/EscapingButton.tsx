
import React, { useState, useCallback, useRef } from 'react';

const EscapingButton: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isMoved, setIsMoved] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const moveButton = useCallback(() => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Calculate the current absolute center of the button
    const currentAbsX = rect.left + rect.width / 2;
    const currentAbsY = rect.top + rect.height / 2;

    // We want the new absolute position to be at least 'margin' away from edges
    const margin = 80;
    
    // Generate a random absolute position within the safe area
    const safeWidth = viewportWidth - 2 * margin;
    const safeHeight = viewportHeight - 2 * margin;
    
    const targetAbsX = Math.random() * safeWidth + margin;
    const targetAbsY = Math.random() * safeHeight + margin;

    // The transform is relative to its *original* position.
    const deltaX = targetAbsX - currentAbsX;
    const deltaY = targetAbsY - currentAbsY;

    setPosition(prev => ({
      x: prev.x + deltaX,
      y: prev.y + deltaY
    }));
    
    setIsMoved(true);
  }, []);

  return (
    <button
      ref={buttonRef}
      onMouseEnter={moveButton}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: isMoved ? 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'none',
      }}
      className="w-32 py-3 bg-white text-black font-bold rounded-full shadow-lg border-2 border-transparent hover:border-red-500 active:scale-95 z-50 pointer-events-auto flex items-center justify-center"
      onClick={(e) => e.preventDefault()}
    >
      Oui
    </button>
  );
};

export default EscapingButton;
