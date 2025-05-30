'use client';

import { useEffect, useRef, useCallback } from 'react';

class FlowLine {
  x: number;
  y: number;
  vx: number;
  vy: number;
  points: { x: number; y: number }[];
  maxPoints: number;
  hue: number;
  lineWidth: number;
  opacity: number;
  amplitude: number;
  frequency: number;
  offset: number;
  speed: number;
  decay: number;

  constructor(canvas: HTMLCanvasElement) {
    this.maxPoints = 15 + Math.floor(Math.random() * 20);
    this.amplitude = 2 + Math.random() * 3;
    this.frequency = 0.01 + Math.random() * 0.02;
    this.offset = Math.random() * 1000;
    this.speed = 0.2 + Math.random() * 0.8;
    this.decay = 0.9 + Math.random() * 0.08;
    
    // Random starting position on edges
    const side = Math.floor(Math.random() * 4);
    if (side === 0) { // top
      this.x = Math.random() * canvas.width;
      this.y = 0;
    } else if (side === 1) { // right
      this.x = canvas.width;
      this.y = Math.random() * canvas.height;
    } else if (side === 2) { // bottom
      this.x = Math.random() * canvas.width;
      this.y = canvas.height;
    } else { // left
      this.x = 0;
      this.y = Math.random() * canvas.height;
    }
    
    // Random direction
    const angle = Math.random() * Math.PI * 2;
    this.vx = Math.cos(angle) * this.speed;
    this.vy = Math.sin(angle) * this.speed;
    
    this.points = [];
    this.hue = 180 + Math.random() * 60; // Blue/teal colors
    this.lineWidth = 0.5 + Math.random() * 1.5;
    this.opacity = 0.05 + Math.random() * 0.1;
    
    // Initialize points
    for (let i = 0; i < this.maxPoints; i++) {
      this.points.push({ x: this.x, y: this.y });
    }
  }

  update(canvas: HTMLCanvasElement) {
    // Move the line
    this.x += this.vx;
    this.y += this.vy;
    
    // Add wave motion
    const wave = Math.sin((this.x * this.frequency) + this.offset) * this.amplitude;
    this.y += wave;
    
    // Add new point
    this.points.unshift({ x: this.x, y: this.y });
    if (this.points.length > this.maxPoints) {
      this.points.pop();
    }
    
    // Update offset for wave animation
    this.offset += 0.05;
    
    // Check if out of bounds
    return !this.isOutOfBounds(canvas);
  }
  
  isOutOfBounds(canvas: HTMLCanvasElement) {
    const margin = 100;
    return (
      this.x < -margin ||
      this.x > canvas.width + margin ||
      this.y < -margin ||
      this.y > canvas.height + margin
    );
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.points.length < 2) return;

    ctx.beginPath();
    ctx.moveTo(this.points[0].x, this.points[0].y);
    
    // Draw a smooth curve through the points
    for (let i = 1; i < this.points.length - 1; i++) {
      const xc = (this.points[i].x + this.points[i + 1].x) / 2;
      const yc = (this.points[i].y + this.points[i + 1].y) / 2;
      ctx.quadraticCurveTo(this.points[i].x, this.points[i].y, xc, yc);
    }

    // Fade out the end of the line
    const gradient = ctx.createLinearGradient(
      this.points[0].x, 
      this.points[0].y, 
      this.points[this.points.length - 1].x, 
      this.points[this.points.length - 1].y
    );
    
    gradient.addColorStop(0, `hsla(${this.hue}, 80%, 60%, ${this.opacity * 0.8})`);
    gradient.addColorStop(0.5, `hsla(${this.hue}, 80%, 60%, ${this.opacity * 0.4})`);
    gradient.addColorStop(1, `hsla(${this.hue}, 80%, 60%, 0)`);
    
    ctx.strokeStyle = gradient;
    ctx.lineWidth = this.lineWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
  }
}

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number>();
  const lines = useRef<FlowLine[]>([]);
  const frameCount = useRef(0);

  // Handle window resize
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Store the current scroll position
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;
    
    // Update canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Restore scroll position
    window.scrollTo(scrollX, scrollY);
  }, []);

  // Initialize animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set initial canvas size
    handleResize();
    
    // Initialize lines
    const initLines = () => {
      const density = Math.min(1, Math.max(0.5, window.innerWidth / 1920));
      const count = Math.floor((window.innerWidth * window.innerHeight) / 100000 * density);
      lines.current = Array.from({ length: count }, () => new FlowLine(canvas));
    };

    // Animation loop
    const animate = (time: number) => {
      if (!ctx) return;

      // Clear canvas with a subtle fade effect
      ctx.fillStyle = 'rgba(8, 12, 18, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw lines
      lines.current = lines.current.filter(line => {
        const isAlive = line.update(canvas);
        if (isAlive) {
          line.draw(ctx);
          return true;
        }
        return false;
      });

      // Add new lines occasionally
      if (frameCount.current % 5 === 0 && lines.current.length < 50) {
        lines.current.push(new FlowLine(canvas));
      }

      frameCount.current++;
      animationFrameId.current = requestAnimationFrame(animate);
    };

    // Start animation
    initLines();
    animationFrameId.current = requestAnimationFrame(animate);

    // Add event listeners
    window.addEventListener('resize', handleResize);
    
    // Handle visibility change for better performance
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (animationFrameId.current) {
          cancelAnimationFrame(animationFrameId.current);
          animationFrameId.current = undefined;
        }
      } else if (!animationFrameId.current) {
        animationFrameId.current = requestAnimationFrame(animate);
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [handleResize]);

  return (
    <canvas
      ref={canvasRef}
      className="animated-bg"
    />
  );
};
