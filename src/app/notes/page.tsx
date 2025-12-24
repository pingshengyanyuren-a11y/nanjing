'use client';

import { useState } from 'react';
import Image from 'next/image';
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
    source?: string;
}

export default function NotesPage() {
    const [activeFilter, setActiveFilter] = useState('all');
    const [sortBy, setSortBy] = useState('default');

    const notes = notesData.notes as Note[];

    // 筛选
    const filteredNotes = notes.filter((note) => {
        if (activeFilter === 'all') return true;
        return note.category === activeFilter;
    });

    // 排序
    const sortedNotes = [...filteredNotes].sort((a, b) => {
        if (sortBy === 'likes') return b.likes - a.likes;
        if (sortBy === 'bookmarks') return b.bookmarks - a.bookmarks;
        if (sortBy === 'newest') return new Date(b.date).getTime() - new Date(a.date).getTime();
        return 0;
    });

    return (
        <div className="pt-24 pb-16 min-h-screen bg-gradient-to-b from-light-beige to-white">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl md:text-5xl font-kai text-center mb-12 text-stone-blue">
                    <span className="inline-block relative">
                        精彩笔记
                        <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-palace-red"></span>
                    </span>
                </h1>

                {/* 筛选和排序 */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 p-6 bg-white rounded-2xl shadow-lg">
                    <div className="flex flex-wrap gap-3 mb-6 md:mb-0">
                        {['all', '亲子攻略', '避坑指南', '路线规划', '美食攻略'].map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`px-6 py-3 rounded-full transition-all duration-300 ${activeFilter === filter
                                        ? 'bg-palace-red text-white shadow-lg'
                                        : 'bg-light-beige text-daiwa-gray hover:bg-palace-red hover:text-white'
                                    }`}
                            >
                                {filter === 'all' ? '全部' : filter}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center space-x-4 bg-light-beige p-3 rounded-xl">
                        <span className="text-gray-700 font-medium">排序:</span>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-palace-red"
                        >
                            <option value="default">默认</option>
                            <option value="likes">按点赞数</option>
                            <option value="bookmarks">按收藏数</option>
                            <option value="newest">最新</option>
                        </select>
                    </div>
                </div>

                {/* 笔记列表 */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {sortedNotes.map((note) => (
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

                                <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                                    {note.content}
                                </p>

                                {/* 互动数据 */}
                                <div className="flex items-center justify-between text-sm text-gray-500 pt-3 border-t border-gray-100">
                                    <div className="flex items-center gap-4">
                                        <span className="cursor-pointer hover:text-palace-red transition-colors">
                                            <i className="fa fa-heart-o mr-1"></i>
                                            {note.likes}
                                        </span>
                                        <span>
                                            <i className="fa fa-bookmark-o mr-1"></i>
                                            {note.bookmarks}
                                        </span>
                                    </div>
                                    <a
                                        href={note.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-stone-blue hover:text-palace-red transition-colors"
                                    >
                                        <i className="fa fa-external-link"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
