'use client';

import Image from 'next/image';
import Link from 'next/link';

interface Attraction {
    id: string;
    name: string;
    image: string;
    description: string;
    ticketPrice: string;
    rating: number;
    popularity: number;
    category: string[];
}

interface AttractionCardProps {
    attraction: Attraction;
    rank?: number;
    onFavorite?: (id: string) => void;
    isFavorited?: boolean;
}

export default function AttractionCard({
    attraction,
    rank,
    onFavorite,
    isFavorited = false,
}: AttractionCardProps) {
    return (
        <div className="bg-white rounded-2xl overflow-hidden shadow-lg card-hover group">
            {/* 图片区域 */}
            <div className="relative h-48 md:h-56 overflow-hidden">
                <Image
                    src={`/${attraction.image}`}
                    alt={attraction.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* 渐变遮罩 */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* 排名徽章 */}
                {rank && (
                    <div className="absolute top-2 left-2 w-8 h-8 bg-palace-red text-white rounded-full flex items-center justify-center font-bold text-sm shadow-lg">
                        {rank}
                    </div>
                )}

                {/* 评分 */}
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center shadow-md">
                    <i className="fa fa-star text-warm-yellow mr-1"></i>
                    <span className="text-sm font-bold text-daiwa-gray">{attraction.rating}</span>
                </div>

                {/* 收藏按钮 */}
                {onFavorite && (
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            onFavorite(attraction.id);
                        }}
                        className="absolute bottom-2 right-2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-palace-red hover:text-white transition-all duration-300"
                    >
                        <i className={`fa ${isFavorited ? 'fa-heart text-palace-red' : 'fa-heart-o'}`}></i>
                    </button>
                )}
            </div>

            {/* 内容区域 */}
            <div className="p-4">
                <Link href={`/attractions/${attraction.id}`}>
                    <h3 className="text-lg font-bold text-stone-blue mb-2 hover:text-palace-red transition-colors">
                        {attraction.name}
                    </h3>
                </Link>

                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {attraction.description}
                </p>

                {/* 标签 */}
                <div className="flex flex-wrap gap-1 mb-3">
                    {attraction.category.slice(0, 3).map((cat) => (
                        <span
                            key={cat}
                            className="px-2 py-1 bg-light-beige text-daiwa-gray text-xs rounded-full"
                        >
                            {cat === 'history' && '历史人文'}
                            {cat === 'nature' && '自然景观'}
                            {cat === 'city' && '城市休闲'}
                            {cat === 'food' && '美食街区'}
                            {cat === 'family' && '亲子友好'}
                            {cat === 'photo' && '拍照打卡'}
                            {cat === 'free' && '免费'}
                            {cat === 'student' && '学生优惠'}
                        </span>
                    ))}
                </div>

                {/* 票价 */}
                <div className="flex items-center justify-between">
                    <span className="text-palace-red font-bold">
                        {attraction.ticketPrice === '免费' || attraction.ticketPrice.includes('免费')
                            ? '免费'
                            : attraction.ticketPrice}
                    </span>
                    <Link
                        href={`/attractions/${attraction.id}`}
                        className="text-stone-blue hover:text-palace-red transition-colors text-sm font-medium"
                    >
                        查看详情 <i className="fa fa-arrow-right ml-1"></i>
                    </Link>
                </div>
            </div>
        </div>
    );
}
