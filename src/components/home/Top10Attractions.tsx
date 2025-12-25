import attractionsData from '@/data/attractions.json';
import AttractionCard from '../shared/AttractionCard';

export default function Top10Attractions() {
    // 获取热度最高的10个景点（先复制数组，避免修改原数组导致Hydration错误）
    const top10 = [...attractionsData.attractions]
        .sort((a, b) => b.popularity - a.popularity)
        .slice(0, 10);

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl md:text-5xl font-kai text-center mb-16 text-stone-blue relative">
                    <span className="inline-block relative">
                        热门景点TOP10
                        <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-palace-red"></span>
                    </span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {top10.map((attraction, index) => (
                        <AttractionCard
                            key={attraction.id}
                            attraction={attraction}
                            rank={index + 1}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
