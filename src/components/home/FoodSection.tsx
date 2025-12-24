import Image from 'next/image';
import foodData from '@/data/food.json';

interface FoodItem {
    id: string;
    name: string;
    image: string;
    description: string;
    price: string;
    rating: number;
    tag: string;
    location: { lat: number; lng: number };
}

export default function FoodSection() {
    const foods = foodData.food as FoodItem[];

    return (
        <section id="food" className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl md:text-5xl font-kai text-center mb-16 text-stone-blue relative">
                    <span className="inline-block relative">
                        南京特色美食
                        <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-warm-yellow"></span>
                    </span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {foods.map((food) => (
                        <div
                            key={food.id}
                            className="bg-white rounded-2xl overflow-hidden shadow-lg card-hover group"
                        >
                            {/* 图片区域 */}
                            <div className="relative h-48 overflow-hidden">
                                <Image
                                    src={`/${food.image}`}
                                    alt={food.name}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                {/* 标签 */}
                                <div className="absolute top-3 left-3">
                                    <span className="px-3 py-1 bg-warm-yellow/90 text-white text-xs rounded-full font-bold">
                                        {food.tag}
                                    </span>
                                </div>
                            </div>

                            {/* 内容区域 */}
                            <div className="p-5">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-xl font-bold text-stone-blue">
                                        {food.name}
                                    </h3>
                                    <div className="flex items-center">
                                        <i className="fa fa-star text-warm-yellow mr-1"></i>
                                        <span className="text-sm font-bold text-daiwa-gray">{food.rating}</span>
                                    </div>
                                </div>
                                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                    {food.description}
                                </p>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-palace-red font-bold">{food.price}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
