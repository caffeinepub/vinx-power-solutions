import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  twinkleSpeed: number;
  twinklePhase: number;
  color: string;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  opacity: number;
  active: boolean;
  trail: number;
}

interface NebulaBlob {
  x: number;
  y: number;
  radius: number;
  color: string;
  opacity: number;
  driftX: number;
  driftY: number;
  pulsePhase: number;
  pulseSpeed: number;
}

export default function UniverseBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const starsRef = useRef<Star[]>([]);
  const shootingStarsRef = useRef<ShootingStar[]>([]);
  const nebulaBlobsRef = useRef<NebulaBlob[]>([]);
  const lastShootingStarTime = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initScene();
    };

    function initScene() {
      if (!canvas) return;
      const w = canvas.width;
      const h = canvas.height;

      // ─── Stars ────────────────────────────────────────────────────────
      const count = Math.floor((w * h) / 3000); // density scales with viewport
      const starColors = [
        "255,255,255",
        "220,240,255",
        "200,220,255",
        "255,250,230",
        "180,200,255",
      ];
      starsRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        radius:
          Math.random() < 0.92
            ? Math.random() * 1.2 + 0.2
            : Math.random() * 2.0 + 1.2,
        opacity: Math.random() * 0.6 + 0.3,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinklePhase: Math.random() * Math.PI * 2,
        color: starColors[Math.floor(Math.random() * starColors.length)],
      }));

      // ─── Shooting stars ───────────────────────────────────────────────
      shootingStarsRef.current = Array.from({ length: 6 }, () => ({
        x: 0,
        y: 0,
        length: 0,
        speed: 0,
        angle: 0,
        opacity: 0,
        active: false,
        trail: 0,
      }));

      // ─── Nebula blobs ─────────────────────────────────────────────────
      const nebulaColors = [
        "rgba(60, 20, 120,", // deep violet
        "rgba(20, 30, 120,", // deep blue
        "rgba(80, 0, 80,", // dark magenta
        "rgba(10, 50, 100,", // dark cyan-blue
        "rgba(40, 0, 100,", // indigo
      ];
      nebulaBlobsRef.current = Array.from({ length: 6 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        radius: Math.random() * 300 + 150,
        color: nebulaColors[Math.floor(Math.random() * nebulaColors.length)],
        opacity: Math.random() * 0.07 + 0.03,
        driftX: (Math.random() - 0.5) * 0.08,
        driftY: (Math.random() - 0.5) * 0.08,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.003 + 0.001,
      }));
    }

    function spawnShootingStar() {
      if (!canvas) return;
      const slot = shootingStarsRef.current.find((s) => !s.active);
      if (!slot) return;
      const w = canvas.width;
      const h = canvas.height;
      const angle = (Math.random() * 40 + 20) * (Math.PI / 180); // 20–60°
      slot.x = Math.random() * w * 0.8;
      slot.y = Math.random() * h * 0.4;
      slot.length = Math.random() * 120 + 60;
      slot.speed = Math.random() * 12 + 8;
      slot.angle = angle;
      slot.opacity = 1;
      slot.active = true;
      slot.trail = 0;
    }

    function drawNebulae(renderCtx: CanvasRenderingContext2D) {
      if (!canvas) return;
      const w = canvas.width;
      const h = canvas.height;
      for (const blob of nebulaBlobsRef.current) {
        blob.x += blob.driftX;
        blob.y += blob.driftY;
        blob.pulsePhase += blob.pulseSpeed;

        // wrap around edges
        if (blob.x < -blob.radius) blob.x = w + blob.radius;
        if (blob.x > w + blob.radius) blob.x = -blob.radius;
        if (blob.y < -blob.radius) blob.y = h + blob.radius;
        if (blob.y > h + blob.radius) blob.y = -blob.radius;

        const pulse = Math.sin(blob.pulsePhase) * 0.015;
        const alpha = Math.max(0, blob.opacity + pulse);

        const grad = renderCtx.createRadialGradient(
          blob.x,
          blob.y,
          0,
          blob.x,
          blob.y,
          blob.radius,
        );
        grad.addColorStop(0, `${blob.color} ${alpha})`);
        grad.addColorStop(0.5, `${blob.color} ${alpha * 0.4})`);
        grad.addColorStop(1, `${blob.color} 0)`);

        renderCtx.fillStyle = grad;
        renderCtx.beginPath();
        renderCtx.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2);
        renderCtx.fill();
      }
    }

    function drawStars(renderCtx: CanvasRenderingContext2D) {
      for (const star of starsRef.current) {
        star.twinklePhase += star.twinkleSpeed;
        const twinkle = Math.sin(star.twinklePhase) * 0.3 + 0.7;
        const alpha = star.opacity * twinkle;

        // Glow for larger stars
        if (star.radius > 1.5) {
          const glow = renderCtx.createRadialGradient(
            star.x,
            star.y,
            0,
            star.x,
            star.y,
            star.radius * 3,
          );
          glow.addColorStop(0, `rgba(${star.color}, ${alpha * 0.8})`);
          glow.addColorStop(1, `rgba(${star.color}, 0)`);
          renderCtx.fillStyle = glow;
          renderCtx.beginPath();
          renderCtx.arc(star.x, star.y, star.radius * 3, 0, Math.PI * 2);
          renderCtx.fill();
        }

        renderCtx.fillStyle = `rgba(${star.color}, ${alpha})`;
        renderCtx.beginPath();
        renderCtx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        renderCtx.fill();
      }
    }

    function drawShootingStars(
      renderCtx: CanvasRenderingContext2D,
      now: number,
    ) {
      // Spawn a new shooting star every 3–7 seconds
      if (now - lastShootingStarTime.current > Math.random() * 4000 + 3000) {
        spawnShootingStar();
        lastShootingStarTime.current = now;
      }

      for (const s of shootingStarsRef.current) {
        if (!s.active) continue;

        s.trail += s.speed;
        s.opacity -= 0.012;

        if (s.opacity <= 0 || s.trail > s.length + 200) {
          s.active = false;
          continue;
        }

        const headX = s.x + Math.cos(s.angle) * s.trail;
        const headY = s.y + Math.sin(s.angle) * s.trail;
        const tailDist = Math.min(s.trail, s.length);
        const tailX = headX - Math.cos(s.angle) * tailDist;
        const tailY = headY - Math.sin(s.angle) * tailDist;

        const grad = renderCtx.createLinearGradient(tailX, tailY, headX, headY);
        grad.addColorStop(0, "rgba(255, 255, 255, 0)");
        grad.addColorStop(0.6, `rgba(200, 230, 255, ${s.opacity * 0.5})`);
        grad.addColorStop(1, `rgba(255, 255, 255, ${s.opacity})`);

        renderCtx.strokeStyle = grad;
        renderCtx.lineWidth = 1.5;
        renderCtx.lineCap = "round";
        renderCtx.beginPath();
        renderCtx.moveTo(tailX, tailY);
        renderCtx.lineTo(headX, headY);
        renderCtx.stroke();
      }
    }

    function animate(now: number) {
      if (!canvas || !ctx) return;

      // Clear to deep space black
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw layers back to front
      drawNebulae(ctx);
      drawStars(ctx);
      drawShootingStars(ctx, now);

      animationRef.current = requestAnimationFrame(animate);
    }

    resize();
    window.addEventListener("resize", resize);

    // Stagger first shooting star
    lastShootingStarTime.current = performance.now() - 2000;
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        pointerEvents: "none",
        display: "block",
        background: "oklch(0.09 0.015 248)",
      }}
    />
  );
}
