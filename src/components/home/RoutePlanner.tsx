'use client';

import { useState } from 'react';

export default function RoutePlanner() {
    const [days, setDays] = useState('3');
    const [budget, setBudget] = useState('');
    const [interests, setInterests] = useState<string[]>([]);
    const [specialNeeds, setSpecialNeeds] = useState('');

    const interestOptions = [
        { value: 'history', label: '历史人文' },
        { value: 'nature', label: '自然景观' },
        { value: 'city', label: '城市休闲' },
        { value: 'food', label: '美食街区' },
        { value: 'free', label: '免费景点' },
        { value: 'student', label: '学生优惠' },
        { value: 'family', label: '亲子友好' },
        { value: 'photo', label: '拍照打卡' },
    ];

    const toggleInterest = (value: string) => {
        setInterests((prev) =>
            prev.includes(value) ? prev.filter((i) => i !== value) : [...prev, value]
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: 生成行程
        console.log({ days, budget, interests, specialNeeds });
    };

    const handleReset = () => {
        setDays('3');
        setBudget('');
        setInterests([]);
        setSpecialNeeds('');
    };

    return (
        <section id="routes" className="py-20 bg-gradient-to-b from-light-beige to-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-kai text-center mb-12 text-stone-blue">
                    精选南京游玩路线
                </h2>

                {/* 自定义规划表单 */}
                <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-12">
                    <h3 className="text-2xl font-bold mb-6 text-center text-stone-blue">
                        定制我的行程
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* 出行天数 */}
                            <div>
                                <label className="block text-gray-700 font-bold mb-2">出行天数</label>
                                <select
                                    value={days}
                                    onChange={(e) => setDays(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-palace-red transition-all"
                                >
                                    <option value="1">1日游</option>
                                    <option value="2">2日游</option>
                                    <option value="3">3日游</option>
                                    <option value="4">4日游</option>
                                    <option value="5">5日游</option>
                                </select>
                            </div>

                            {/* 预算范围 */}
                            <div>
                                <label className="block text-gray-700 font-bold mb-2">预算范围</label>
                                <input
                                    type="number"
                                    value={budget}
                                    onChange={(e) => setBudget(e.target.value)}
                                    placeholder="请输入预算金额（元/人）"
                                    min="0"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-palace-red transition-all"
                                />
                                <p className="text-xs text-gray-500 mt-1">请输入您的预算金额，如：500</p>
                            </div>
                        </div>

                        {/* 兴趣标签 */}
                        <div>
                            <label className="block text-gray-700 font-bold mb-3">兴趣标签</label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                {interestOptions.map((option) => (
                                    <label
                                        key={option.value}
                                        className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${interests.includes(option.value)
                                                ? 'bg-palace-red/20 border border-palace-red'
                                                : 'bg-light-beige hover:bg-palace-red/10'
                                            }`}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={interests.includes(option.value)}
                                            onChange={() => toggleInterest(option.value)}
                                            className="mr-3 text-palace-red"
                                        />
                                        <span>{option.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* 特殊需求 */}
                        <div>
                            <label className="block text-gray-700 font-bold mb-2">特殊需求</label>
                            <textarea
                                value={specialNeeds}
                                onChange={(e) => setSpecialNeeds(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-palace-red transition-all"
                                rows={3}
                                placeholder="如：不爬山、需要无障碍设施、素食偏好等"
                            />
                        </div>

                        {/* 提交按钮 */}
                        <div className="text-center">
                            <button
                                type="submit"
                                className="px-10 py-3 bg-palace-red text-white rounded-full hover:bg-stone-blue transition-all duration-300 font-bold mr-4 transform hover:scale-105 shadow-lg hover:shadow-xl"
                            >
                                生成我的行程 <i className="fa fa-magic ml-2"></i>
                            </button>
                            <button
                                type="button"
                                onClick={handleReset}
                                className="px-10 py-3 bg-stone-blue text-white rounded-full hover:bg-palace-red transition-all duration-300 font-bold transform hover:scale-105 shadow-lg hover:shadow-xl"
                            >
                                重新开始 <i className="fa fa-refresh ml-2"></i>
                            </button>
                        </div>
                    </form>
                </div>

                {/* 示例行程 */}
                <div className="mb-12">
                    <h3 className="text-2xl font-bold mb-8 text-center text-stone-blue">示例行程</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* 经典3日游 */}
                        <div className="bg-white rounded-xl overflow-hidden shadow-lg card-hover">
                            <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-palace-red/10 to-white">
                                <h3 className="text-2xl font-bold flex items-center text-stone-blue">
                                    <span className="w-10 h-10 rounded-full bg-palace-red text-white flex items-center justify-center mr-3 text-lg">
                                        3
                                    </span>
                                    南京经典3日游
                                </h3>
                                <p className="text-gray-500 mt-2">覆盖核心景点，感受六朝古都魅力</p>
                            </div>
                            <div className="p-6">
                                {/* Day 1 */}
                                <div className="mb-6">
                                    <h4 className="font-bold text-lg text-palace-red mb-3 flex items-center">
                                        <i className="fa fa-calendar-check-o mr-2"></i> Day 1：历史文化线
                                    </h4>
                                    <ul className="space-y-3">
                                        <li className="flex items-start">
                                            <span className="text-palace-red mr-3 mt-1">
                                                <i className="fa fa-map-marker"></i>
                                            </span>
                                            <div>
                                                <strong>上午：</strong>中山陵（免费，需预约）→ 音乐台（10元）喂白鸽
                                            </div>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-palace-red mr-3 mt-1">
                                                <i className="fa fa-cutlery"></i>
                                            </span>
                                            <div>
                                                <strong>中午：</strong>陵园路梧桐餐厅（美龄粥必点）
                                            </div>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-palace-red mr-3 mt-1">
                                                <i className="fa fa-map-marker"></i>
                                            </span>
                                            <div>
                                                <strong>下午：</strong>明孝陵（70元）→ 石象路拍照
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="p-6 bg-light-beige flex justify-between items-center rounded-b-xl">
                                <div>
                                    <span className="text-gray-500">预算参考：</span>
                                    <span className="font-bold text-palace-red text-lg">¥600-800/人</span>
                                </div>
                                <a
                                    href="#"
                                    className="text-stone-blue hover:text-palace-red transition-colors font-bold flex items-center"
                                >
                                    下载完整行程 <i className="fa fa-download ml-1"></i>
                                </a>
                            </div>
                        </div>

                        {/* 文艺2日游 */}
                        <div className="bg-white rounded-xl overflow-hidden shadow-lg card-hover">
                            <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-stone-blue/10 to-white">
                                <h3 className="text-2xl font-bold flex items-center text-stone-blue">
                                    <span className="w-10 h-10 rounded-full bg-stone-blue text-white flex items-center justify-center mr-3 text-lg">
                                        2
                                    </span>
                                    文艺小众2日游
                                </h3>
                                <p className="text-gray-500 mt-2">避开人潮，发现南京的文艺一面</p>
                            </div>
                            <div className="p-6">
                                {/* Day 1 */}
                                <div className="mb-6">
                                    <h4 className="font-bold text-lg text-stone-blue mb-3 flex items-center">
                                        <i className="fa fa-calendar-check-o mr-2"></i> Day 1：老城烟火线
                                    </h4>
                                    <ul className="space-y-3">
                                        <li className="flex items-start">
                                            <span className="text-stone-blue mr-3 mt-1">
                                                <i className="fa fa-map-marker"></i>
                                            </span>
                                            <div>
                                                <strong>上午：</strong>老门东三条营 → 芥子园（30元）
                                            </div>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-stone-blue mr-3 mt-1">
                                                <i className="fa fa-cutlery"></i>
                                            </span>
                                            <div>
                                                <strong>中午：</strong>老门东"小潘记鸭血粉丝"
                                            </div>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-stone-blue mr-3 mt-1">
                                                <i className="fa fa-map-marker"></i>
                                            </span>
                                            <div>
                                                <strong>下午：</strong>愚园（20元）→ 胡家花园
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="p-6 bg-light-beige flex justify-between items-center rounded-b-xl">
                                <div>
                                    <span className="text-gray-500">预算参考：</span>
                                    <span className="font-bold text-stone-blue text-lg">¥300-500/人</span>
                                </div>
                                <a
                                    href="#"
                                    className="text-stone-blue hover:text-palace-red transition-colors font-bold flex items-center"
                                >
                                    下载完整行程 <i className="fa fa-download ml-1"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
