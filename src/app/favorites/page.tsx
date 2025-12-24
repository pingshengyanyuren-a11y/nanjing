'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import attractionsData from '@/data/attractions.json';

interface FavoriteItem {
    id: string;
    type: 'attraction';
    addedAt: string;
}

export default function FavoritesPage() {
    const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

    // 从 localStorage 加载收藏
    useEffect(() => {
        const saved = localStorage.getItem('favorites');
        if (saved) {
            setFavorites(JSON.parse(saved));
        }
    }, []);

    // 获取收藏的景点详情
    const favoriteAttractions = favorites
        .filter((f) => f.type === 'attraction')
        .map((f) => attractionsData.attractions.find((a) => a.id === f.id))
        .filter(Boolean);

    // 删除收藏
    const removeFavorite = (id: string) => {
        const updated = favorites.filter((f) => f.id !== id);
        setFavorites(updated);
        localStorage.setItem('favorites', JSON.stringify(updated));
    };

    return (
        <div className="pt-24 pb-16 min-h-screen bg-gradient-to-b from-light-beige to-white">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl md:text-5xl font-kai text-center mb-12 text-stone-blue">
                    <span className="inline-block relative">
                        我的收藏
                        <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-palace-red"></span>
                    </span>
                </h1>

                {favoriteAttractions.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <i className="fa fa-heart-o text-4xl text-gray-400"></i>
                        </div>
                        <h3 className="text-xl text-gray-600 mb-4">还没有收藏任何内容</h3>
                        <p className="text-gray-500 mb-8">去探索南京的精彩景点吧！</p>
                        <Link
                            href="/#attractions"
                            className="inline-block px-8 py-3 bg-palace-red text-white rounded-full hover:bg-stone-blue transition-all duration-300 font-bold"
                        >
                            浏览景点
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {favoriteAttractions.map((attraction) => (
                            <div
                                key={attraction!.id}
                                className="bg-white rounded-2xl overflow-hidden shadow-lg card-hover"
                            >
                                <div className="relative h-48">
                                    <Image
                                        src={attraction!.image}
                                        alt={attraction!.name}
                                        fill
                                        className="object-cover"
                                    />
                                    <button
                                        onClick={() => removeFavorite(attraction!.id)}
                                        className="absolute top-3 right-3 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-md hover:bg-palace-red hover:text-white transition-all"
                                    >
                                        <i className="fa fa-trash-o"></i>
                                    </button>
                                </div>
                                <div className="p-5">
                                    <Link href={`/attractions/${attraction!.id}`}>
                                        <h3 className="text-lg font-bold text-stone-blue mb-2 hover:text-palace-red transition-colors">
                                            {attraction!.name}
                                        </h3>
                                    </Link>
                                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                        {attraction!.description}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-palace-red font-bold">
                                            {attraction!.ticketPrice}
                                        </span>
                                        <Link
                                            href={`/attractions/${attraction!.id}`}
                                            className="text-stone-blue hover:text-palace-red transition-colors text-sm"
                                        >
                                            查看详情 →
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
