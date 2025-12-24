'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

// 景点数据类型
interface Attraction {
    id: string;
    name: string;
    image: string;
    description: string;
}

// 轮播图使用的景点
const carouselAttractions = [
    {
        id: '1',
        name: '钟山风景区',
        image: '/images/中山陵.jpg',
        description: '中山陵是中国近代伟大的民主革命先行者孙中山先生的陵寝',
    },
    {
        id: '3',
        name: '秦淮河夜景',
        image: '/images/秦淮河.jpg',
        description: '夫子庙秦淮风光带，十里秦淮的璀璨夜色',
    },
    {
        id: '7',
        name: '明孝陵',
        image: '/images/明孝陵.jpg',
        description: '明太祖朱元璋与其皇后的合葬陵墓，中国规模最大的帝王陵寝之一',
    },
    {
        id: '4',
        name: '玄武湖公园',
        image: '/images/玄武湖.jpg',
        description: '中国最大的皇家园林湖泊，被誉为"金陵明珠"',
    },
    {
        id: '11',
        name: '鸡鸣寺',
        image: '/images/鸡鸣寺.jpg',
        description: '南朝第一寺，南京最古老的梵刹和皇家寺庙之一',
    },
];

export default function Carousel() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);

    const totalSlides = carouselAttractions.length;

    // 下一张
    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, [totalSlides]);

    // 上一张
    const prevSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    }, [totalSlides]);

    // 跳转到指定幻灯片
    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };

    // 切换播放/暂停
    const togglePlayPause = () => {
        setIsPlaying((prev) => !prev);
    };

    // 自动播放
    useEffect(() => {
        if (!isPlaying) return;

        const interval = setInterval(() => {
            nextSlide();
        }, 5000);

        return () => clearInterval(interval);
    }, [isPlaying, nextSlide]);

    return (
        <section className="relative h-[60vh] md:h-[80vh] lg:h-screen overflow-hidden">
            <div className="relative h-full">
                {carouselAttractions.map((attraction, index) => (
                    <div
                        key={attraction.id}
                        className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                            }`}
                    >
                        {/* 背景图片 */}
                        <div className="absolute inset-0">
                            <Image
                                src={attraction.image}
                                alt={attraction.name}
                                fill
                                className="object-cover"
                                priority={index === 0}
                            />
                            {/* 渐变遮罩 */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
                        </div>

                        {/* 文字内容 */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center text-white px-4">
                                <h2
                                    className={`text-4xl md:text-6xl lg:text-7xl font-kai font-bold mb-4 tracking-wider ${index === currentSlide ? 'animate-fade-in-down' : ''
                                        }`}
                                    style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}
                                >
                                    {attraction.name}
                                </h2>
                                <p
                                    className={`text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto ${index === currentSlide ? 'animate-fade-in-up' : ''
                                        }`}
                                    style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)' }}
                                >
                                    {attraction.description}
                                </p>
                                <a
                                    href={`/attractions/${attraction.id}`}
                                    className={`inline-block mt-8 px-8 py-3 bg-palace-red text-white rounded-full hover:bg-stone-blue transition-all duration-300 font-bold transform hover:scale-105 shadow-lg ${index === currentSlide ? 'animate-zoom-in' : ''
                                        }`}
                                >
                                    了解更多
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* 左右控制箭头 */}
            <button
                onClick={prevSlide}
                className="absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 bg-white/20 text-white p-3 md:p-4 rounded-full hover:bg-white/40 transition-all duration-500 z-20 backdrop-blur-md shadow-lg hover:shadow-xl"
            >
                <i className="fa fa-chevron-left text-2xl md:text-3xl"></i>
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 bg-white/20 text-white p-3 md:p-4 rounded-full hover:bg-white/40 transition-all duration-500 z-20 backdrop-blur-md shadow-lg hover:shadow-xl"
            >
                <i className="fa fa-chevron-right text-2xl md:text-3xl"></i>
            </button>

            {/* 轮播控制点 */}
            <div className="absolute bottom-8 md:bottom-16 left-0 right-0 flex justify-center space-x-3 md:space-x-4 z-20">
                {carouselAttractions.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 ${index === currentSlide
                                ? 'bg-palace-red scale-125'
                                : 'bg-white/50 hover:bg-white/80'
                            }`}
                    />
                ))}
            </div>

            {/* 暂停/播放按钮 */}
            <button
                onClick={togglePlayPause}
                className="absolute top-6 md:top-10 right-6 md:right-10 bg-white/20 text-white p-3 md:p-4 rounded-full hover:bg-white/40 transition-all duration-500 z-20 backdrop-blur-md shadow-lg hover:shadow-xl"
            >
                <i className={`fa ${isPlaying ? 'fa-pause' : 'fa-play'} text-lg md:text-xl`}></i>
            </button>
        </section>
    );
}
