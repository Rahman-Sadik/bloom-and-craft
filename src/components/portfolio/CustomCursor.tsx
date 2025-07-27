import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHidden(false);
    const handleMouseLeave = () => setIsHidden(true);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = target.closest('button, a, input, textarea, [role="button"]');
      setIsPointer(!!isClickable);
    };

    document.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      {/* Main cursor */}
      <div
        className={cn(
          "fixed top-0 left-0 pointer-events-none z-[9999] transition-all duration-150",
          isHidden ? "opacity-0" : "opacity-100"
        )}
        style={{
          transform: `translate(${position.x - 10}px, ${position.y - 10}px)`,
        }}
      >
        <div className={cn(
          "w-5 h-5 rounded-full border-2 border-primary/60 transition-all duration-200",
          isPointer ? "scale-150 border-accent bg-accent/20" : "scale-100"
        )} />
      </div>

      {/* Trailing effect */}
      <div
        className={cn(
          "fixed top-0 left-0 pointer-events-none z-[9998] transition-all duration-300",
          isHidden ? "opacity-0" : "opacity-30"
        )}
        style={{
          transform: `translate(${position.x - 4}px, ${position.y - 4}px)`,
        }}
      >
        <div className="w-2 h-2 bg-primary rounded-full" />
      </div>
    </>
  );
};

export default CustomCursor;