'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState('');

    const navLinks = [
        { href: '/', label: '首页' },
        { href: '/#attractions', label: '景点指南' },
        { href: '/#notes', label: '精彩笔记' },
        { href: '/#routes', label: '路线规划' },
        { href: '/#about', label: '关于我们' },
        { href: '/favorites', label: '我的收藏' },
    ];

    return (
        <header className="fixed w-full z-50 transition-all duration-300 bg-white/90 backdrop-blur-md shadow-md">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                {/* Logo */}
                <Link href="/">
                    <h1 className="text-3xl md:text-4xl font-kai text-stone-blue font-bold tracking-wider">
                        金陵札记
                    </h1>
                </Link>

                {/* 桌面端导航 */}
                <nav className="hidden md:flex space-x-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-stone-blue hover:text-palace-red transition-all duration-300 font-semibold relative group"
                        >
                            {link.label}
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-palace-red transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                    ))}
                </nav>

                {/* 搜索框和移动端菜单按钮 */}
                <div className="flex items-center space-x-4">
                    {/* 桌面端搜索框 */}
                    <div className="relative hidden md:block w-64">
                        <input
                            type="text"
                            placeholder="搜索景点或攻略..."
                            value={searchKeyword}
                            onChange={(e) => setSearchKeyword(e.target.value)}
                            className="w-full px-4 py-2 pl-10 rounded-full bg-light-beige text-daiwa-gray focus:outline-none focus:ring-2 focus:ring-palace-red transition-all shadow-sm hover:shadow-md"
                        />
                        <i className="fa fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 transition-colors hover:text-palace-red"></i>
                    </div>

                    {/* 移动端菜单按钮 */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="text-stone-blue focus:outline-none hover:text-palace-red transition-colors duration-300 p-2 rounded-full hover:bg-light-beige"
                        >
                            <i className="fa fa-bars text-2xl"></i>
                        </button>
                    </div>
                </div>

                {/* 移动端菜单 */}
                {mobileMenuOpen && (
                    <div className="md:hidden bg-white shadow-xl absolute w-full top-full left-0 right-0 z-50 rounded-b-xl border-t border-gray-100">
                        <div className="container mx-auto px-4 py-4 flex flex-col space-y-3">
                            {/* 移动端搜索框 */}
                            <div className="relative mb-4">
                                <input
                                    type="text"
                                    placeholder="搜索景点或攻略..."
                                    value={searchKeyword}
                                    onChange={(e) => setSearchKeyword(e.target.value)}
                                    className="w-full px-4 py-2 pl-10 rounded-full bg-light-beige text-daiwa-gray focus:outline-none focus:ring-2 focus:ring-palace-red transition-all shadow-sm"
                                />
                                <i className="fa fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                            </div>

                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="text-stone-blue hover:text-palace-red transition-colors duration-300 font-semibold py-3 px-4 rounded-lg hover:bg-light-beige"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}
