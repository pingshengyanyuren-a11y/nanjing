'use client';

import { useState } from 'react';

export default function AIFoodConsultant() {
    const [question, setQuestion] = useState('');
    const [response, setResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showResponse, setShowResponse] = useState(false);

    const handleSubmit = async () => {
        if (!question.trim()) return;

        setIsLoading(true);
        setShowResponse(false);

        try {
            const res = await fetch('/api/ai-consultant', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question }),
            });

            const data = await res.json();
            setResponse(data.response || '抱歉，暂时无法获取推荐。');
            setShowResponse(true);
        } catch (error) {
            setResponse('抱歉，服务暂时不可用，请稍后再试。');
            setShowResponse(true);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section id="ai-food-consultant" className="py-20 relative overflow-hidden">
            {/* 装饰背景 */}
            <div className="absolute inset-0 bg-gradient-to-b from-stone-50/80 to-white z-0"></div>
            <div
                className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none z-0"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233D5A80' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
            ></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-bold text-stone-blue mb-4 tracking-tight relative inline-block font-kai">
                        AI 美食私厨
                        <span className="absolute -bottom-2 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-palace-red to-transparent opacity-80 rounded-full"></span>
                    </h2>
                    <p className="text-lg text-gray-500 font-song mt-4">
                        "金陵烟火气，最抚凡人心" —— 让大模型为您寻觅那一口地道滋味
                    </p>
                </div>

                <div className="max-w-4xl mx-auto">
                    {/* 玻璃拟态卡片 */}
                    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/50 p-8 md:p-10 transition-all duration-500 hover:shadow-[0_25px_60px_rgba(61,90,128,0.15)]">
                        <div className="flex flex-col md:flex-row items-start gap-6 mb-8">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-palace-red to-red-600 text-white flex items-center justify-center flex-shrink-0 shadow-lg transform rotate-3 hover:rotate-6 transition-transform duration-300">
                                <i className="fa fa-cutlery text-3xl"></i>
                            </div>
                            <div className="flex-1 w-full">
                                <label className="block text-xl font-bold text-stone-blue mb-3 font-song">
                                    今天想吃点什么？
                                    <span className="text-sm font-normal text-gray-400 ml-2">
                                        (支持此时此地、预算偏好、口味忌口)
                                    </span>
                                </label>
                                <div className="relative group">
                                    <textarea
                                        value={question}
                                        onChange={(e) => setQuestion(e.target.value)}
                                        rows={3}
                                        className="w-full px-6 py-4 rounded-xl bg-gray-50/50 border border-gray-200 text-gray-700 text-lg placeholder-gray-400 focus:bg-white focus:border-stone-blue/30 focus:ring-4 focus:ring-stone-blue/10 outline-none transition-all resize-none shadow-inner"
                                        placeholder={`试试问：\n"我是大学生，想在夫子庙附近找一家人均50元以内的地道南京菜，不要太辣..."`}
                                    />
                                    <div className="absolute bottom-3 right-3 text-xs text-gray-300 pointer-events-none">
                                        Qwen/QwQ-32B Supported
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end items-center gap-4 border-b border-gray-100 pb-8 mb-8">
                            <span className="text-xs text-gray-400 italic font-serif">
                                DeepSeek/SiliconFlow 提供算力支持
                            </span>
                            <button
                                onClick={handleSubmit}
                                disabled={isLoading}
                                className="group relative px-8 py-3 bg-gradient-to-r from-stone-blue to-blue-700 text-white rounded-xl shadow-lg hover:shadow-blue-500/30 transition-all duration-300 font-bold overflow-hidden disabled:opacity-50"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    <i className="fa fa-magic group-hover:animate-pulse"></i>
                                    {isLoading ? '寻味中...' : '开始寻味'}
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-palace-red to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </button>
                        </div>

                        {/* AI 回答区域 */}
                        {showResponse && (
                            <div className="animate-fade-in-down">
                                <div className="flex items-start gap-5">
                                    <div className="w-12 h-12 rounded-full bg-stone-blue p-1 shadow-md flex-shrink-0">
                                        <i className="fa fa-cutlery text-2xl text-white flex items-center justify-center h-full w-full"></i>
                                    </div>
                                    <div className="flex-1">
                                        <div className="bg-gradient-to-br from-blue-50/80 to-white rounded-2xl rounded-tl-none p-6 shadow-sm border border-blue-50/50 text-left">
                                            <div className="flex items-center justify-between mb-4 pb-2 border-b border-blue-100/50">
                                                <h4 className="font-bold text-stone-blue font-kai text-lg">
                                                    南京老饕 · 智能推荐
                                                </h4>
                                            </div>
                                            <div
                                                className="prose prose-stone max-w-none text-gray-700 leading-relaxed font-sans text-base"
                                                dangerouslySetInnerHTML={{ __html: response }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* 加载状态 */}
                        {isLoading && (
                            <div className="text-center py-12">
                                <div className="relative w-20 h-20 mx-auto mb-4">
                                    <div className="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
                                    <div className="absolute inset-0 border-4 border-t-palace-red border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                                    <i className="fa fa-cutlery absolute inset-0 flex items-center justify-center text-gray-300 text-xl"></i>
                                </div>
                                <p className="text-stone-blue font-kai text-lg animate-pulse">
                                    正在穿梭于南京的大街小巷...
                                </p>
                                <p className="text-xs text-gray-400 mt-2">Connecting to QwQ-32B...</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
