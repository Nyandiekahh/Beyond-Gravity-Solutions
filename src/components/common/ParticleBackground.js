// components/common/ParticleBackground.js
import React, { useEffect, useRef } from 'react';
import styled from '@emotion/styled';

const Canvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
`;

class Particle {
  constructor(canvas, ctx, options = {}) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * (options.maxSize || 3) + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    this.color = options.color || `rgba(${Math.random() * 255}, ${Math.random() * 255}, 255, ${Math.random() * 0.5 + 0.2})`;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x > this.canvas.width) {
      this.x = 0;
    } else if (this.x < 0) {
      this.x = this.canvas.width;
    }

    if (this.y > this.canvas.height) {
      this.y = 0;
    } else if (this.y < 0) {
      this.y = this.canvas.height;
    }
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
  }
}

const ParticleBackground = ({ options = {} }) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let particles = [];

    const init = () => {
      particles = [];
      for (let i = 0; i < (options.particleCount || 50); i++) {
        particles.push(new Particle(canvas, ctx, options));
      }
    };

    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      init();
    };

    const animate = () => {
      ctx.fillStyle = options.backgroundColor || 'rgba(10, 10, 10, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Connect particles with lines if they're close enough
      if (options.connectParticles) {
        connectParticles();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    const connectParticles = () => {
      const maxDistance = options.connectionDistance || 100;
      particles.forEach((particle1, i) => {
        particles.slice(i + 1).forEach(particle2 => {
          const dx = particle1.x - particle2.x;
          const dy = particle1.y - particle2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / maxDistance})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particle1.x, particle1.y);
            ctx.lineTo(particle2.x, particle2.y);
            ctx.stroke();
          }
        });
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [options]);

  return <Canvas ref={canvasRef} />;
};

export default ParticleBackground;