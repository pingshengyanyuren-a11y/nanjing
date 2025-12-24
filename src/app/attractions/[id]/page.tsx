import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import attractionsData from '@/data/attractions.json';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function AttractionDetail({ params }: PageProps) {
    const { id } = await params;
    const attraction = attractionsData.attractions.find((a) => a.id === id);

    if (!attraction) {
        notFound();
    }

    // 获取类别标签的中文名称
    const getCategoryLabel = (cat: string) => {
        const labels: Record<string, string> = {
            history: '历史人文',
            nature: '自然景观',
            city: '城市休闲',
            food: '美食街区',
            family: '亲子友好',
            photo: '拍照打卡',
            free: '免费',
            student: '学生优惠',
        };
        return labels[cat] || cat;
    };

    return (
        <div className="pt-20">
            {/* 封面图片 */}
            <div className="relative h-[50vh] md:h-[60vh]">
                <Image
                    src={`/${attraction.image}`}
                    alt={attraction.name}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* 标题和基本信息 */}
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <div className="container mx-auto">
                        <h1 className="text-4xl md:text-5xl font-kai font-bold mb-4">
                            {attraction.name}
                        </h1>
                        <div className="flex flex-wrap items-center gap-4 mb-4">
                            {/* 评分 */}
                            <div className="flex items-center bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                                <i className="fa fa-star text-warm-yellow mr-1"></i>
                                <span className="font-bold">{attraction.rating}</span>
                            </div>
                            {/* 热度 */}
                            <div className="flex items-center bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                                <i className="fa fa-fire text-palace-red mr-1"></i>
                                <span>热度 {attraction.popularity}</span>
                            </div>
                            {/* 票价 */}
                            <div className="bg-palace-red px-4 py-1 rounded-full font-bold">
                                {attraction.ticketPrice}
                            </div>
                        </div>
                        {/* 标签 */}
                        <div className="flex flex-wrap gap-2">
                            {attraction.category.map((cat) => (
                                <span
                                    key={cat}
                                    className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm"
                                >
                                    {getCategoryLabel(cat)}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* 详细信息 */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* 左侧：景点介绍 */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                            <h2 className="text-2xl font-bold text-stone-blue mb-6 flex items-center">
                                <i className="fa fa-info-circle mr-3 text-palace-red"></i>
                                景点介绍
                            </h2>
                            <p className="text-gray-700 leading-relaxed text-lg">
                                {attraction.description}
                            </p>
                        </div>

                        {/* 返回按钮 */}
                        <Link
                            href="/#attractions"
                            className="inline-block px-8 py-3 bg-stone-blue text-white rounded-full hover:bg-palace-red transition-all duration-300 font-bold"
                        >
                            <i className="fa fa-arrow-left mr-2"></i>
                            返回景点列表
                        </Link>
                    </div>

                    {/* 右侧：实用信息 */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                            <h3 className="text-xl font-bold text-stone-blue mb-6">实用信息</h3>

                            {/* 开放时间 */}
                            <div className="mb-6">
                                <div className="flex items-center text-gray-600 mb-2">
                                    <i className="fa fa-clock-o w-6 text-palace-red"></i>
                                    <span className="font-bold">开放时间</span>
                                </div>
                                <p className="text-gray-700 ml-6">{attraction.openingHours}</p>
                            </div>

                            {/* 门票价格 */}
                            <div className="mb-6">
                                <div className="flex items-center text-gray-600 mb-2">
                                    <i className="fa fa-ticket w-6 text-palace-red"></i>
                                    <span className="font-bold">门票价格</span>
                                </div>
                                <p className="text-gray-700 ml-6">{attraction.ticketPrice}</p>
                            </div>

                            {/* 地址 */}
                            <div className="mb-6">
                                <div className="flex items-center text-gray-600 mb-2">
                                    <i className="fa fa-map-marker w-6 text-palace-red"></i>
                                    <span className="font-bold">景点地址</span>
                                </div>
                                <p className="text-gray-700 ml-6">{attraction.address}</p>
                            </div>

                            {/* 交通方式 */}
                            <div className="mb-6">
                                <div className="flex items-center text-gray-600 mb-2">
                                    <i className="fa fa-bus w-6 text-palace-red"></i>
                                    <span className="font-bold">交通方式</span>
                                </div>
                                <p className="text-gray-700 ml-6 text-sm">{attraction.transportation}</p>
                            </div>

                            {/* 操作按钮 */}
                            <div className="flex gap-3">
                                <button className="flex-1 py-3 bg-palace-red text-white rounded-lg hover:bg-stone-blue transition-colors font-bold">
                                    <i className="fa fa-heart mr-2"></i>收藏
                                </button>
                                <button className="flex-1 py-3 bg-stone-blue text-white rounded-lg hover:bg-palace-red transition-colors font-bold">
                                    <i className="fa fa-share-alt mr-2"></i>分享
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// 生成静态路径
export async function generateStaticParams() {
    return attractionsData.attractions.map((attraction) => ({
        id: attraction.id,
    }));
}
