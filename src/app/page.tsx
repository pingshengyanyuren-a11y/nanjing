import Carousel from '@/components/home/Carousel';
import Top10Attractions from '@/components/home/Top10Attractions';
import AttractionGrid from '@/components/home/AttractionGrid';
import FoodSection from '@/components/home/FoodSection';
import NotesSection from '@/components/home/NotesSection';
import AIFoodConsultant from '@/components/home/AIFoodConsultant';
import RoutePlanner from '@/components/home/RoutePlanner';

export default function Home() {
  return (
    <>
      {/* 轮播图 */}
      <Carousel />

      {/* 热门景点TOP10 */}
      <Top10Attractions />

      {/* 南京特色景点（带筛选） */}
      <AttractionGrid />

      {/* 南京特色美食 */}
      <FoodSection />

      {/* AI 美食顾问 */}
      <AIFoodConsultant />

      {/* 精彩笔记 */}
      <NotesSection />

      {/* 路线规划 */}
      <RoutePlanner />

      {/* 关于我们 */}
      <section id="about" className="py-20 bg-gradient-to-b from-light-beige to-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-kai text-center mb-12 text-stone-blue relative">
            <span className="inline-block relative">
              关于金陵札记
              <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-palace-red"></span>
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            金陵札记是一个专注于南京旅游的平台，致力于为每一位来到六朝古都的游客提供最全面、最实用的旅游攻略。
            我们汇集了南京的历史文化景点、特色美食、文艺打卡地等信息，并通过AI技术为您提供个性化的行程规划和美食推荐。
            让每一次南京之行，都成为一段难忘的记忆。
          </p>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="w-16 h-16 bg-palace-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fa fa-map-o text-3xl text-palace-red"></i>
              </div>
              <h3 className="text-xl font-bold text-stone-blue mb-2">30+ 精选景点</h3>
              <p className="text-gray-600">涵盖历史、自然、人文等多种类型</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="w-16 h-16 bg-warm-yellow/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fa fa-cutlery text-3xl text-warm-yellow"></i>
              </div>
              <h3 className="text-xl font-bold text-stone-blue mb-2">地道美食</h3>
              <p className="text-gray-600">盐水鸭、鸭血粉丝汤、汤包...</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="w-16 h-16 bg-stone-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fa fa-magic text-3xl text-stone-blue"></i>
              </div>
              <h3 className="text-xl font-bold text-stone-blue mb-2">AI 智能推荐</h3>
              <p className="text-gray-600">个性化行程规划与美食推荐</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
