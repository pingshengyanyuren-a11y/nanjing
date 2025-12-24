import type { Metadata } from "next";
import "./globals.css";
import { MusicProvider } from "@/contexts/MusicContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MusicPlayer from "@/components/layout/MusicPlayer";
import SeasonalEffects from "@/components/shared/SeasonalEffects";

export const metadata: Metadata = {
  title: "金陵札记 - 南京城市游攻略",
  description: "金陵札记致力于为游客提供最全面、最实用的南京旅游攻略，带您领略六朝古都的独特魅力。",
  keywords: ["南京旅游", "金陵", "旅游攻略", "南京景点", "美食推荐"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head>
        {/* Font Awesome */}
        <link
          href="https://cdn.jsdelivr.net/npm/font-awesome@4.7.0/css/font-awesome.min.css"
          rel="stylesheet"
        />
      </head>
      <body className="bg-moon-white font-song text-daiwa-gray">
        <MusicProvider>
          {/* 导航栏 */}
          <Header />

          {/* 主要内容 */}
          <main>{children}</main>

          {/* 页脚 */}
          <Footer />

          {/* 全局音乐播放器 - 跨页面持续播放 */}
          <MusicPlayer />

          {/* 季节粒子效果 */}
          <SeasonalEffects />
        </MusicProvider>
      </body>
    </html>
  );
}
