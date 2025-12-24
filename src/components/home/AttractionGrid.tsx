'use client';

import { useState } from 'react';
import attractionsData from '@/data/attractions.json';
import AttractionCard from '../shared/AttractionCard';

const filterButtons = [
    { key: 'all', label: '全部' },
    { key: 'history', label: '历史人文' },
    { key: 'nature', label: '自然景观' },
    { key: 'city', label: '城市休闲' },
    { key: 'food', label: '美食街区' },
    { key: 'family', label: '亲子友好' },
    { key: 'photo', label: '拍照打卡' },
    { key: 'free', label: '免费景点' },
    { key: 'student', label: '学生优惠' },
];

export default function AttractionGrid() {
    const [activeFilter, setActiveFilter] = useState('all');

    // 筛选景点
    const filteredAttractions = attractionsData.attractions.filter((attraction) => {
        if (activeFilter === 'all') return true;
        return attraction.category.includes(activeFilter);
    });

    return (
        <section id="attractions" className="py-24 bg-gradient-to-b from-white to-light-beige">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl md:text-5xl font-kai text-center mb-16 text-stone-blue relative">
                    <span className="inline-block relative">
                        南京特色景点
                        <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-palace-red"></span>
                    </span>
                </h2>

                {/* 分类筛选 */}
                <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-16">
                    {filterButtons.map((btn) => (
                        <button
                            key={btn.key}
                            onClick={() => setActiveFilter(btn.key)}
                            className={`px-6 py-3 rounded-full transition-all duration-300 font-medium transform hover:-translate-y-1 ${activeFilter === btn.key
                                    ? 'bg-palace-red text-white shadow-lg'
                                    : 'bg-white text-daiwa-gray hover:bg-palace-red hover:text-white shadow-md hover:shadow-lg'
                                }`}
                        >
                            {btn.label}
                        </button>
                    ))}
                </div>

                {/* 景点网格 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredAttractions.map((attraction) => (
                        <AttractionCard
                            key={attraction.id}
                            attraction={attraction}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
