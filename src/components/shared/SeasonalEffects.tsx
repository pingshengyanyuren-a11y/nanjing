'use client';

import { useEffect, useRef } from 'react';

// 获取当前季节
function getCurrentSeason(): 'spring' | 'summer' | 'autumn' | 'winter' {
    const month = new Date().getMonth() + 1;
    if (month >= 3 && month <= 5) return 'spring';
    if (month >= 6 && month <= 8) return 'summer';
    if (month >= 9 && month <= 11) return 'autumn';
    return 'winter';
}

// 季节配置
const seasonConfig = {
    spring: {
        particleImage: '/images/particles/spring.png',
        particleCount: 30,
        fallSpeed: { min: 1, max: 3 },
        swayAmount: 2,
        particleSize: { min: 15, max: 30 },
    },
    summer: {
        particleImage: '/images/particles/summer.png',
        particleCount: 15,
        fallSpeed: { min: 0.5, max: 1.5 },
        swayAmount: 3,
        particleSize: { min: 20, max: 40 },
    },
    autumn: {
        particleImage: '/images/particles/autumn.png',
        particleCount: 25,
        fallSpeed: { min: 1.5, max: 4 },
        swayAmount: 4,
        particleSize: { min: 20, max: 35 },
    },
    winter: {
        particleImage: '/images/particles/winter.png',
        particleCount: 40,
        fallSpeed: { min: 1, max: 2 },
        swayAmount: 1.5,
        particleSize: { min: 5, max: 15 },
    },
};

interface Particle {
    x: number;
    y: number;
    size: number;
    speedY: number;
    speedX: number;
    rotation: number;
    rotationSpeed: number;
    opacity: number;
    swayOffset: number;
}

export default function SeasonalEffects() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const animationRef = useRef<number>(0);
    const imageRef = useRef<HTMLImageElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const season = getCurrentSeason();
        const config = seasonConfig[season];

        // 设置画布大小
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // 加载粒子图片
        const img = new Image();
        img.src = config.particleImage;
        imageRef.current = img;

        // 创建粒子
        const createParticle = (): Particle => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            size: config.particleSize.min + Math.random() * (config.particleSize.max - config.particleSize.min),
            speedY: config.fallSpeed.min + Math.random() * (config.fallSpeed.max - config.fallSpeed.min),
            speedX: (Math.random() - 0.5) * config.swayAmount,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 2,
            opacity: 0.5 + Math.random() * 0.5,
            swayOffset: Math.random() * Math.PI * 2,
        });

        // 初始化粒子
        particlesRef.current = Array.from({ length: config.particleCount }, createParticle);

        // 动画循环
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particlesRef.current.forEach((particle, index) => {
                // 更新位置
                particle.y += particle.speedY;
                particle.x += Math.sin(particle.swayOffset + particle.y * 0.01) * particle.speedX;
                particle.rotation += particle.rotationSpeed;

                // 重置超出边界的粒子
                if (particle.y > canvas.height) {
                    particlesRef.current[index] = createParticle();
                    particlesRef.current[index].y = -particle.size;
                }

                // 绘制粒子
                ctx.save();
                ctx.translate(particle.x, particle.y);
                ctx.rotate((particle.rotation * Math.PI) / 180);
                ctx.globalAlpha = particle.opacity;

                if (imageRef.current && imageRef.current.complete) {
                    ctx.drawImage(
                        imageRef.current,
                        -particle.size / 2,
                        -particle.size / 2,
                        particle.size,
                        particle.size
                    );
                }

                ctx.restore();
            });

            animationRef.current = requestAnimationFrame(animate);
        };

        img.onload = () => {
            animate();
        };

        // 如果图片已缓存，直接开始动画
        if (img.complete) {
            animate();
        }

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationRef.current);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-[100]"
            style={{ opacity: 0.8 }}
        />
    );
}
