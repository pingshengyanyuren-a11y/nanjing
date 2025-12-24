export default function Footer() {
    return (
        <footer className="bg-stone-blue text-white py-16">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    {/* 关于我们 */}
                    <div>
                        <h3 className="text-xl font-bold mb-4 font-kai">关于金陵札记</h3>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            金陵札记致力于为游客提供最全面、最实用的南京旅游攻略，带您领略六朝古都的独特魅力。
                        </p>
                    </div>

                    {/* 快速链接 */}
                    <div>
                        <h3 className="text-xl font-bold mb-4 font-kai">快速链接</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#attractions" className="text-gray-300 hover:text-white transition-colors">
                                    景点指南
                                </a>
                            </li>
                            <li>
                                <a href="#notes" className="text-gray-300 hover:text-white transition-colors">
                                    精彩笔记
                                </a>
                            </li>
                            <li>
                                <a href="#routes" className="text-gray-300 hover:text-white transition-colors">
                                    路线规划
                                </a>
                            </li>
                            <li>
                                <a href="/favorites" className="text-gray-300 hover:text-white transition-colors">
                                    我的收藏
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* 联系方式 */}
                    <div>
                        <h3 className="text-xl font-bold mb-4 font-kai">联系我们</h3>
                        <ul className="space-y-2 text-gray-300 text-sm">
                            <li className="flex items-center">
                                <i className="fa fa-envelope mr-2"></i>
                                contact@jinlingzhaji.com
                            </li>
                            <li className="flex items-center">
                                <i className="fa fa-phone mr-2"></i>
                                025-12345678
                            </li>
                            <li className="flex items-center">
                                <i className="fa fa-map-marker mr-2"></i>
                                南京市玄武区
                            </li>
                        </ul>
                    </div>

                    {/* 关注我们 */}
                    <div>
                        <h3 className="text-xl font-bold mb-4 font-kai">关注我们</h3>
                        <div className="flex space-x-4">
                            <a
                                href="#"
                                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-palace-red transition-colors"
                            >
                                <i className="fa fa-weixin"></i>
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-palace-red transition-colors"
                            >
                                <i className="fa fa-weibo"></i>
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-palace-red transition-colors"
                            >
                                <i className="fa fa-qq"></i>
                            </a>
                        </div>
                    </div>
                </div>

                {/* 版权信息 */}
                <div className="border-t border-white/20 pt-8 text-center">
                    <p className="text-gray-400 text-sm">
                        © 2024 金陵札记 - 南京城市游攻略平台 | 用心发现南京之美
                    </p>
                </div>
            </div>
        </footer>
    );
}
