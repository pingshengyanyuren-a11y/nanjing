'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import notesData from '@/data/notes.json';

interface Note {
    id: number;
    title: string;
    category: string;
    content: string;
    author: string;
    likes: number;
    bookmarks: number;
    date: string;
    image: string;
    url: string;
}

export default function NotesSection() {
    const [activeFilter, setActiveFilter] = useState('all');

    const notes = notesData.notes as Note[];

    // 筛选笔记
    const filteredNotes = notes
        .filter((note) => {
            if (activeFilter === 'all') return true;
            return note.category === activeFilter;
        })
        .slice(0, 6); // 首页只显示6条

    return (
        <section id="notes" className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl md:text-5xl font-kai text-center mb-16 text-stone-blue relative">
                    <span className="inline-block relative">
                        最近被南京游客翻烂的笔记
                        <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-40 h-1 bg-palace-red"></span>
                    </span>
                </h2>

                {/* 筛选按钮 */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 p-6 bg-gradient-to-r from-light-beige to-white rounded-2xl shadow-lg">
                    <div className="flex flex-wrap gap-3 mb-6 md:mb-0">
                        {['all', '亲子攻略', '避坑指南', '路线规划'].map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`px-6 py-3 rounded-full transition-all duration-300 transform hover:-translate-y-1 ${activeFilter === filter
                                        ? 'bg-palace-red text-white shadow-lg'
                                        : 'bg-white text-daiwa-gray hover:bg-palace-red hover:text-white shadow-md'
                                    }`}
                            >
                                {filter === 'all' ? '全部' : filter}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 笔记列表 */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredNotes.map((note) => (
                        <div
                            key={note.id}
                            className="bg-white rounded-2xl overflow-hidden shadow-lg card-hover"
                        >
                            {/* 封面图片 */}
                            <div className="relative h-48 overflow-hidden">
                                <Image
                                    src={note.image.startsWith('./') ? note.image.slice(1) : `/${note.image}`}
                                    alt={note.title}
                                    fill
                                    className="object-cover"
                                />
                                {/* 分类标签 */}
                                <div className="absolute top-3 left-3">
                                    <span className="px-3 py-1 bg-palace-red/90 text-white text-xs rounded-full">
                                        {note.category}
                                    </span>
                                </div>
                            </div>

                            {/* 内容 */}
                            <div className="p-5">
                                {/* 作者信息 */}
                                <div className="flex items-center mb-3">
                                    <div className="w-8 h-8 rounded-full bg-stone-blue text-white flex items-center justify-center text-sm font-bold">
                                        {note.author.charAt(0)}
                                    </div>
                                    <span className="ml-2 text-sm text-gray-600 truncate max-w-[120px]">{note.author}</span>
                                    <span className="ml-auto text-xs text-gray-400">{note.date}</span>
                                </div>

                                <h3 className="text-lg font-bold text-stone-blue mb-2 line-clamp-2">
                                    {note.title}
                                </h3>

                                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                    {note.content}
                                </p>

                                {/* 互动数据 */}
                                <div className="flex items-center justify-between text-sm text-gray-500">
                                    <div className="flex items-center gap-4">
                                        <span>
                                            <i className="fa fa-heart-o mr-1"></i>
                                            {note.likes}
                                        </span>
                                        <span>
                                            <i className="fa fa-bookmark-o mr-1"></i>
                                            {note.bookmarks}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 查看更多按钮 */}
                <div className="text-center mt-16">
                    <Link
                        href="/notes"
                        className="inline-block px-10 py-4 bg-palace-red text-white rounded-full hover:bg-stone-blue transition-all duration-500 font-bold transform hover:scale-105 shadow-xl hover:shadow-2xl text-lg"
                    >
                        查看更多笔记 <i className="fa fa-long-arrow-right ml-2"></i>
                    </Link>
                </div>
            </div>
        </section>
    );
}
