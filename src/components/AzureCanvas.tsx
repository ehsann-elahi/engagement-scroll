import React, { useEffect, useRef } from 'react';

interface SparkMote {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  speedY: number;
  speedX: number;
  phase: number;
  kind: 'orb' | 'sparkle' | 'ring';
}

export const AzureCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId = 0;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const buildMotes = (): SparkMote[] => {
      const count = Math.min(72, Math.max(32, Math.floor((width * height) / 19000)));
      const list: SparkMote[] = [];
      for (let i = 0; i < count; i++) {
        const roll = Math.random();
        const kind: SparkMote['kind'] = roll < 0.55 ? 'orb' : roll < 0.88 ? 'sparkle' : 'ring';
        list.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: kind === 'orb' ? 2 + Math.random() * 6 : kind === 'sparkle' ? 2 + Math.random() * 4.5 : 8 + Math.random() * 16,
          baseAlpha: kind === 'orb' ? 0.14 + Math.random() * 0.24 : kind === 'sparkle' ? 0.35 + Math.random() * 0.5 : 0.08 + Math.random() * 0.12,
          speedY: -0.18 - Math.random() * 0.35,
          speedX: (Math.random() - 0.5) * 0.22,
          phase: Math.random() * Math.PI * 2,
          kind,
        });
      }
      return list;
    };

    let motes = buildMotes();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      motes = buildMotes();
    };
    window.addEventListener('resize', handleResize);

    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;
    const handleScroll = () => {
      const current = window.scrollY;
      scrollVelocity = Math.max(-28, Math.min(28, current - lastScrollY));
      lastScrollY = current;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    let pointerX = width * 0.5;
    let pointerY = height * 0.35;
    const handlePointer = (e: MouseEvent) => {
      pointerX = e.clientX;
      pointerY = e.clientY;
    };
    window.addEventListener('mousemove', handlePointer, { passive: true });

    let t = 0;
    const drawFourPointStar = (cx: number, cy: number, r: number, alpha: number) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.beginPath();
      ctx.moveTo(0, -r * 1.9);
      ctx.quadraticCurveTo(0, 0, r * 1.9, 0);
      ctx.quadraticCurveTo(0, 0, 0, r * 1.9);
      ctx.quadraticCurveTo(0, 0, -r * 1.9, 0);
      ctx.quadraticCurveTo(0, 0, 0, -r * 1.9);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    const render = () => {
      if (document.hidden) {
        rafId = requestAnimationFrame(render);
        return;
      }

      t += 0.016;
      scrollVelocity *= 0.9; // Smooth kinetic decay

      ctx.clearRect(0, 0, width, height);

      // Deep royal blue celestial atmospheric aura bloom
      const topGlow = ctx.createRadialGradient(
        width * 0.5,
        height * 0.14,
        10,
        width * 0.5,
        height * 0.14,
        width * 0.62
      );
      topGlow.addColorStop(0, 'rgba(37, 99, 235, 0.24)');
      topGlow.addColorStop(0.5, 'rgba(29, 78, 216, 0.10)');
      topGlow.addColorStop(1, 'rgba(11, 29, 66, 0)');
      ctx.fillStyle = topGlow;
      ctx.fillRect(0, 0, width, height);

      // Subtle interactive white starlight spotlight following pointer
      if (!prefersReduced) {
        const cursorGlow = ctx.createRadialGradient(
          pointerX,
          pointerY,
          0,
          pointerX,
          pointerY,
          Math.min(width, height) * 0.34
        );
        cursorGlow.addColorStop(0, 'rgba(191, 219, 254, 0.09)');
        cursorGlow.addColorStop(1, 'rgba(11, 29, 66, 0)');
        ctx.fillStyle = cursorGlow;
        ctx.fillRect(0, 0, width, height);
      }

      // Draw drifting crystalline motes with scroll-velocity parallax
      for (let i = 0; i < motes.length; i++) {
        const m = motes[i];
        if (!prefersReduced) {
          m.x += m.speedX + Math.sin(t + m.phase) * 0.12;
          m.y += m.speedY - scrollVelocity * (0.12 + m.radius * 0.015);
        }

        if (m.y < -30) m.y = height + 30;
        if (m.y > height + 30) m.y = -30;
        if (m.x < -30) m.x = width + 30;
        if (m.x > width + 30) m.x = -30;

        const twinkle = m.baseAlpha + Math.sin(t * 2.1 + m.phase) * 0.14;
        const alpha = Math.max(0.05, Math.min(0.95, twinkle));

        if (m.kind === 'orb') {
          const orbGrad = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, m.radius * 2.2);
          orbGrad.addColorStop(0, `rgba(255, 255, 255, ${alpha})`);
          orbGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
          ctx.fillStyle = orbGrad;
          ctx.beginPath();
          ctx.arc(m.x, m.y, m.radius * 2.2, 0, Math.PI * 2);
          ctx.fill();
        } else if (m.kind === 'sparkle') {
          drawFourPointStar(m.x, m.y, m.radius, alpha);
        } else {
          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(m.x, m.y, m.radius, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      rafId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handlePointer);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 w-full h-full"
      aria-hidden="true"
    />
  );
};
