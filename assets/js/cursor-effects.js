// ============================================
// FUTURISTIC CURSOR SYSTEM - Corrected Version
// No zoom adjustments - browser handles it automatically
// ============================================

class FuturisticCursor {
    constructor() {
        // Check if on desktop
        if (window.innerWidth <= 768) return;

        // Get canvas element
        this.canvas = document.getElementById('cursor-canvas');
        if (!this.canvas) return;

        // Setup canvas - no zoom adjustment, browser handles it
        this.ctx = this.canvas.getContext('2d', { alpha: true });
        this.setupCanvas();

        // Cursor position
        this.mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        this.cursor = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        this.isHovering = false;

        // Visual effects
        this.particles = [];
        this.ripples = [];
        
        this.init();
    }

    setupCanvas() {
        // Simple canvas setup - browser handles zoom
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    init() {
        // Mouse tracking - use e.clientX/Y directly
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
            
            // Create particle trail occasionally
            if (Math.random() > 0.85) {
                this.createParticle(e.clientX, e.clientY);
            }
        }, { passive: true });

        // Hover detection with better tracking
        const interactiveSelectors = [
            'a', 'button', 'input', 'textarea', 'select',
            '.hamburger', '.nav-link', '.hero-btn', '.about-btn',
            '.project-item', '.service-card', '.tech-item',
            '.filter-btn', '.quick-btn', '.chatbot-toggle',
            '[role="button"]', '[onclick]'
        ].join(', ');

        document.addEventListener('mouseover', (e) => {
            if (e.target.closest(interactiveSelectors)) {
                this.isHovering = true;
            }
        }, { passive: true });

        document.addEventListener('mouseout', (e) => {
            if (e.target.closest(interactiveSelectors)) {
                this.isHovering = false;
            }
        }, { passive: true });

        // Click effect
        document.addEventListener('click', (e) => {
            this.createRipple(e.clientX, e.clientY);
        }, { passive: true });

        // Window resize
        window.addEventListener('resize', () => {
            this.setupCanvas();
        }, { passive: true });

        // Start animation
        this.animate();
    }

    createParticle(x, y) {
        this.particles.push({
            x, y,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            life: 1,
            size: Math.random() * 2 + 1,
            hue: 120 + Math.random() * 60
        });

        if (this.particles.length > 50) this.particles.shift();
    }

    createRipple(x, y) {
        // Multiple ripples
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                this.ripples.push({
                    x, y,
                    radius: 0,
                    maxRadius: 60 + i * 20,
                    alpha: 1
                });
            }, i * 100);
        }

        // Burst particles
        for (let i = 0; i < 16; i++) {
            const angle = (Math.PI * 2 * i) / 16;
            const speed = 2 + Math.random() * 2;
            this.particles.push({
                x, y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 1,
                size: Math.random() * 3 + 1,
                hue: 120 + Math.random() * 60
            });
        }
    }

    updateCursor() {
        // Smooth easing
        const ease = 0.15;
        this.cursor.x += (this.mouse.x - this.cursor.x) * ease;
        this.cursor.y += (this.mouse.y - this.cursor.y) * ease;
    }

    updateParticles() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            
            p.x += p.vx;
            p.y += p.vy;
            p.vx *= 0.98;
            p.vy *= 0.98;
            p.life -= 0.015;
            p.size *= 0.98;

            if (p.life <= 0) {
                this.particles.splice(i, 1);
                continue;
            }

            this.ctx.save();
            this.ctx.globalAlpha = p.life;
            this.ctx.fillStyle = `hsl(${p.hue}, 100%, 50%)`;
            this.ctx.shadowBlur = 10;
            this.ctx.shadowColor = `hsl(${p.hue}, 100%, 50%)`;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
        }

        // Particle connections
        if (this.particles.length > 1) {
            for (let i = 0; i < this.particles.length; i++) {
                for (let j = i + 1; j < this.particles.length; j++) {
                    const p1 = this.particles[i];
                    const p2 = this.particles[j];
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 60) {
                        const alpha = (1 - dist / 60) * Math.min(p1.life, p2.life) * 0.3;
                        this.ctx.save();
                        this.ctx.globalAlpha = alpha;
                        this.ctx.strokeStyle = '#00ff00';
                        this.ctx.lineWidth = 1;
                        this.ctx.beginPath();
                        this.ctx.moveTo(p1.x, p1.y);
                        this.ctx.lineTo(p2.x, p2.y);
                        this.ctx.stroke();
                        this.ctx.restore();
                    }
                }
            }
        }
    }

    updateRipples() {
        for (let i = this.ripples.length - 1; i >= 0; i--) {
            const r = this.ripples[i];
            r.radius += 3;
            r.alpha -= 0.02;

            if (r.alpha <= 0 || r.radius >= r.maxRadius) {
                this.ripples.splice(i, 1);
                continue;
            }

            this.ctx.save();
            this.ctx.globalAlpha = r.alpha;
            this.ctx.strokeStyle = '#00ff00';
            this.ctx.lineWidth = 2;
            this.ctx.shadowBlur = 15;
            this.ctx.shadowColor = '#00ff00';
            this.ctx.beginPath();
            this.ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
            this.ctx.stroke();
            this.ctx.restore();
        }
    }

    drawCursorGlow() {
        const time = Date.now() / 1000;
        const size = this.isHovering ? 38 : 30;
        
        this.ctx.save();
        this.ctx.translate(this.cursor.x, this.cursor.y);

        // Pulsing background glow
        const pulseSize = size + Math.sin(time * 3) * 5;
        const gradient = this.ctx.createRadialGradient(0, 0, 0, 0, 0, pulseSize);
        gradient.addColorStop(0, 'rgba(0, 255, 0, 0.2)');
        gradient.addColorStop(0.5, 'rgba(0, 255, 0, 0.1)');
        gradient.addColorStop(1, 'rgba(0, 255, 0, 0)');
        this.ctx.fillStyle = gradient;
        this.ctx.beginPath();
        this.ctx.arc(0, 0, pulseSize, 0, Math.PI * 2);
        this.ctx.fill();

        // Outer rotating hexagon with trail effect
        this.ctx.rotate(time * 0.5);
        
        for (let layer = 0; layer < 2; layer++) {
            const layerAlpha = layer === 0 ? 0.8 : 0.3;
            const layerOffset = layer * 2;
            
            this.ctx.strokeStyle = '#00ff00';
            this.ctx.lineWidth = 2 - layer;
            this.ctx.shadowBlur = 20 + layer * 10;
            this.ctx.shadowColor = '#00ff00';
            this.ctx.globalAlpha = layerAlpha;
            
            this.ctx.beginPath();
            for (let i = 0; i < 6; i++) {
                const angle = (Math.PI * 2 * i) / 6;
                const x = Math.cos(angle) * (size + layerOffset);
                const y = Math.sin(angle) * (size + layerOffset);
                if (i === 0) this.ctx.moveTo(x, y);
                else this.ctx.lineTo(x, y);
            }
            this.ctx.closePath();
            this.ctx.stroke();
        }

        // Orbiting particles around hexagon
        for (let i = 0; i < 6; i++) {
            const angle = (Math.PI * 2 * i) / 6 + time * 2;
            const orbitRadius = size + 5;
            const x = Math.cos(angle) * orbitRadius;
            const y = Math.sin(angle) * orbitRadius;
            
            this.ctx.fillStyle = '#00ff00';
            this.ctx.shadowBlur = 15;
            this.ctx.shadowColor = '#00ff00';
            this.ctx.globalAlpha = 0.8;
            this.ctx.beginPath();
            this.ctx.arc(x, y, 2, 0, Math.PI * 2);
            this.ctx.fill();
        }

        // Middle rotating triangle
        this.ctx.rotate(-time * 1.2);
        this.ctx.strokeStyle = '#00ffcc';
        this.ctx.lineWidth = 2;
        this.ctx.shadowBlur = 15;
        this.ctx.shadowColor = '#00ffcc';
        this.ctx.globalAlpha = 0.7;
        
        this.ctx.beginPath();
        for (let i = 0; i < 3; i++) {
            const angle = (Math.PI * 2 * i) / 3;
            const triSize = size * 0.6;
            const x = Math.cos(angle) * triSize;
            const y = Math.sin(angle) * triSize;
            if (i === 0) this.ctx.moveTo(x, y);
            else this.ctx.lineTo(x, y);
        }
        this.ctx.closePath();
        this.ctx.stroke();

        // Inner rotating square with gradient
        this.ctx.rotate(time * 0.8);
        const squareSize = size * 0.35;
        
        // Square with corner dots
        this.ctx.strokeStyle = '#00ff00';
        this.ctx.lineWidth = 1.5;
        this.ctx.shadowBlur = 10;
        this.ctx.globalAlpha = 0.6;
        this.ctx.strokeRect(-squareSize/2, -squareSize/2, squareSize, squareSize);
        
        // Corner dots on square
        const corners = [
            [-squareSize/2, -squareSize/2],
            [squareSize/2, -squareSize/2],
            [squareSize/2, squareSize/2],
            [-squareSize/2, squareSize/2]
        ];
        
        this.ctx.fillStyle = '#00ff00';
        this.ctx.shadowBlur = 10;
        this.ctx.globalAlpha = 1;
        corners.forEach(([x, y]) => {
            this.ctx.beginPath();
            this.ctx.arc(x, y, 2, 0, Math.PI * 2);
            this.ctx.fill();
        });

        // Animated center crosshair
        this.ctx.globalAlpha = 0.8;
        this.ctx.strokeStyle = '#00ff00';
        this.ctx.lineWidth = 1;
        this.ctx.shadowBlur = 8;
        
        const crossSize = 6 + Math.sin(time * 5) * 2;
        this.ctx.beginPath();
        this.ctx.moveTo(-crossSize, 0);
        this.ctx.lineTo(crossSize, 0);
        this.ctx.moveTo(0, -crossSize);
        this.ctx.lineTo(0, crossSize);
        this.ctx.stroke();
        
        // Pulsing center dot
        const centerSize = 2 + Math.sin(time * 4) * 1;
        this.ctx.fillStyle = '#00ff00';
        this.ctx.shadowBlur = 15;
        this.ctx.globalAlpha = 1;
        this.ctx.beginPath();
        this.ctx.arc(0, 0, centerSize, 0, Math.PI * 2);
        this.ctx.fill();
        
        this.ctx.restore();

        // Interactive hover effects
        if (this.isHovering) {
            this.ctx.save();
            this.ctx.translate(this.cursor.x, this.cursor.y);
            
            // Expanding rings
            for (let i = 0; i < 2; i++) {
                const ringOffset = i * 15;
                const ringAlpha = 0.4 - i * 0.15;
                const ringSize = size + 15 + ringOffset + Math.sin(time * 3) * 3;
                
                this.ctx.rotate(time * (-0.3 - i * 0.2));
                this.ctx.strokeStyle = `rgba(0, 255, 0, ${ringAlpha})`;
                this.ctx.lineWidth = 2;
                this.ctx.shadowBlur = 20;
                this.ctx.shadowColor = '#00ff00';
                this.ctx.setLineDash([5, 5]);
                this.ctx.beginPath();
                this.ctx.arc(0, 0, ringSize, 0, Math.PI * 2);
                this.ctx.stroke();
                this.ctx.setLineDash([]);
            }
            
            // Spinning energy lines
            for (let i = 0; i < 4; i++) {
                const angle = (Math.PI * 2 * i) / 4 + time * 2;
                const lineLength = size + 20;
                
                this.ctx.strokeStyle = 'rgba(0, 255, 0, 0.5)';
                this.ctx.lineWidth = 1;
                this.ctx.shadowBlur = 10;
                this.ctx.beginPath();
                this.ctx.moveTo(0, 0);
                this.ctx.lineTo(
                    Math.cos(angle) * lineLength,
                    Math.sin(angle) * lineLength
                );
                this.ctx.stroke();
            }
            
            this.ctx.restore();
        }

        // Trailing ghost effect
        this.ctx.save();
        this.ctx.translate(this.cursor.x, this.cursor.y);
        this.ctx.rotate(time * 0.5);
        this.ctx.globalAlpha = 0.1;
        this.ctx.strokeStyle = '#00ff00';
        this.ctx.lineWidth = 1;
        
        for (let offset = 5; offset <= 15; offset += 5) {
            this.ctx.beginPath();
            for (let i = 0; i < 6; i++) {
                const angle = (Math.PI * 2 * i) / 6;
                const x = Math.cos(angle) * (size + offset);
                const y = Math.sin(angle) * (size + offset);
                if (i === 0) this.ctx.moveTo(x, y);
                else this.ctx.lineTo(x, y);
            }
            this.ctx.closePath();
            this.ctx.stroke();
        }
        
        this.ctx.restore();
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.updateCursor();
        this.updateParticles();
        this.updateRipples();
        this.drawCursorGlow();
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize
if (window.innerWidth > 768) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => new FuturisticCursor());
    } else {
        new FuturisticCursor();
    }
}
