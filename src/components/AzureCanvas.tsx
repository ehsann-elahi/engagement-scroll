import React, { useEffect, useRef } from 'react';

interface SparkMote {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  speedY: number;
  speedX: number;
  phase: number;
  isGold: boolean;
  kind: 'orb' | 'sparkle';
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
      const count = Math.min(78, Math.max(36, Math.floor((width * height) / 17000)));
      const list: SparkMote[] = [];
      for (let i = 0; i < count; i++) {
        const isGold = Math.random() < 0.56;
        const kind: SparkMote['kind'] = Math.random() < 0.72 ? 'orb' : 'sparkle';
        list.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: kind === 'orb' ? 1.3 + Math.random() * 2.6 : 2 + Math.random() * 3.5,
          baseAlpha: 0.25 + Math.random() * 0.55,
          speedY: -0.15 - Math.random() * 0.3,
          speedX: (Math.random() - 0.5) * 0.2,
          phase: Math.random() * Math.PI * 2,
          isGold,
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
      scrollVelocity = Math.max(-24, Math.min(24, current - lastScrollY));
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
    const drawFourPointStar = (cx: number, cy: number, r: number, rgb: string, alpha: number) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.fillStyle = `rgba(${rgb}, ${alpha})`;
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
      scrollVelocity *= 0.9;

      ctx.clearRect(0, 0, width, height);

      // Soft twilight slate-blue ambient haze (upper-left)
      const glow1 = ctx.createRadialGradient(
        width * 0.22,
        height * 0.25,
        10,
        width * 0.22,
        height * 0.25,
        width * 0.48
      );
      glow1.addColorStop(0, 'rgba(65, 102, 168, 0.22)');
      glow1.addColorStop(1, 'rgba(20, 32, 56, 0)');
      ctx.fillStyle = glow1;
      ctx.fillRect(0, 0, width, height);

      // Warm subtle champagne gold candlelight bloom (lower-right)
      const glow2 = ctx.createRadialGradient(
        width * 0.8,
        height * 0.76,
        10,
        width * 0.8,
        height * 0.76,
        width * 0.44
      );
      glow2.addColorStop(0, 'rgba(236, 200, 114, 0.11)');
      glow2.addColorStop(1, 'rgba(20, 32, 56, 0)');
      ctx.fillStyle = glow2;
      ctx.fillRect(0, 0, width, height);

      // Subtle interactive starlight spotlight
      if (!prefersReduced) {
        const cursorGlow = ctx.createRadialGradient(
          pointerX,
          pointerY,
          0,
          pointerX,
          pointerY,
          Math.min(width, height) * 0.3
        );
        cursorGlow.addColorStop(0, 'rgba(255, 241, 197, 0.06)');
        cursorGlow.addColorStop(1, 'rgba(20, 32, 56, 0)');
        ctx.fillStyle = cursorGlow;
        ctx.fillRect(0, 0, width, height);
      }

      for (let i = 0; i < motes.length; i++) {
        const m = motes[i];
        if (!prefersReduced) {
          m.x += m.speedX + Math.sin(t + m.phase) * 0.1;
          m.y += m.speedY - scrollVelocity * (0.1 + m.radius * 0.02);
        }

        if (m.y < -20) m.y = height + 20;
        if (m.y > height + 20) m.y = -20;
        if (m.x < -20) m.x = width + 20;
        if (m.x > width + 20) m.x = -20;

        const twinkle = m.baseAlpha + Math.sin(t * 2.2 + m.phase) * 0.2;
        const alpha = Math.max(0.1, Math.min(0.95, twinkle));
        const rgb = m.isGold ? '236, 200, 114' : '248, 250, 252';

        if (m.kind === 'orb') {
          const orbGrad = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, m.radius * 2.4);
          orbGrad.addColorStop(0, `rgba(${rgb}, ${alpha})`);
          orbGrad.addColorStop(1, `rgba(${rgb}, 0)`);
          ctx.fillStyle = orbGrad;
          ctx.beginPath();
          ctx.arc(m.x, m.y, m.radius * 2.4, 0, Math.PI * 2);
          ctx.fill();
        } else {
          drawFourPointStar(m.x, m.y, m.radius, rgb, alpha);
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
