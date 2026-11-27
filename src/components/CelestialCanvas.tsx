import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  alpha: number;
  baseAlpha: number;
  twinkleSpeed: number;
  vx: number;
  vy: number;
  color: string;
}

export const CelestialCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initStars();
    };

    window.addEventListener('resize', handleResize);

    const colors = [
      'rgba(245, 222, 152, ', // Champagne gold
      'rgba(236, 200, 114, ', // Warm gold
      'rgba(255, 255, 255, ', // Pure starlight
      'rgba(212, 229, 247, ', // Diamond blue
    ];

    let stars: Star[] = [];
    const count = Math.min(85, Math.floor((width * height) / 14000));

    const initStars = () => {
      stars = [];
      for (let i = 0; i < count; i++) {
        const baseAlpha = 0.2 + Math.random() * 0.6;
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: 0.8 + Math.random() * 2.2,
          alpha: baseAlpha,
          baseAlpha,
          twinkleSpeed: 0.01 + Math.random() * 0.03,
          vx: (Math.random() - 0.5) * 0.25,
          vy: -0.15 - Math.random() * 0.25, // Gentle upward stardust drift
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    initStars();

    let scrollY = window.scrollY;
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    let time = 0;
    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      // Draw subtle celestial nebulae in corners
      const grad1 = ctx.createRadialGradient(
        width * 0.2,
        height * 0.25,
        10,
        width * 0.2,
        height * 0.25,
        width * 0.45
      );
      grad1.addColorStop(0, 'rgba(27, 54, 93, 0.15)');
      grad1.addColorStop(1, 'rgba(7, 11, 25, 0)');
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      const grad2 = ctx.createRadialGradient(
        width * 0.8,
        height * 0.75,
        10,
        width * 0.8,
        height * 0.75,
        width * 0.45
      );
      grad2.addColorStop(0, 'rgba(201, 155, 59, 0.08)');
      grad2.addColorStop(1, 'rgba(7, 11, 25, 0)');
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // Render stars & drifting stardust
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];

        // Update position
        s.x += s.vx;
        s.y += s.vy;

        // Wrap around screen edges
        if (s.y < -10) s.y = height + 10;
        if (s.x < -10) s.x = width + 10;
        if (s.x > width + 10) s.x = -10;

        // Gentle sinusoidal twinkle
        const alpha = s.baseAlpha + Math.sin(time * s.twinkleSpeed * 100 + i) * 0.25;
        const clampedAlpha = Math.max(0.1, Math.min(1, alpha));

        // Parallax offset relative to scroll
        const parallaxY = (s.y - (scrollY * 0.08 * (s.size / 2))) % height;
        const renderY = parallaxY < 0 ? parallaxY + height : parallaxY;

        ctx.beginPath();
        ctx.arc(s.x, renderY, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `${s.color}${clampedAlpha})`;
        ctx.shadowColor = s.color === colors[0] || s.color === colors[1] ? '#ECC872' : '#FFFFFF';
        ctx.shadowBlur = s.size > 1.8 ? 8 : 4;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 w-full h-full"
      style={{ opacity: 0.9 }}
      aria-hidden="true"
    />
  );
};
