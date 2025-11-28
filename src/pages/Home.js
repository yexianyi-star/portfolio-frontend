import React from 'react';

const Home = () => {
  return (
    <div className="space-y-12">
      {/* 英雄区域 */}
      <section className="text-center py-16">
        <h1 className="text-5xl font-bold text-gray-800 mb-6">
          欢迎来到我的作品集
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          我是一名全栈开发者，专注于使用现代技术构建出色的Web应用。
        </p>
        <div className="space-x-4">
          <a 
            href="/projects"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg inline-block"
          >
            查看我的项目
          </a>
          <a 
            href="/contact"
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg inline-block"
          >
            联系我
          </a>
        </div>
      </section>

      {/* 特性介绍 */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center p-6">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🚀</span>
          </div>
          <h3 className="text-xl font-semibold mb-2">现代技术</h3>
          <p className="text-gray-600">使用React、Node.js等最新技术栈</p>
        </div>
        
        <div className="text-center p-6">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">💡</span>
          </div>
          <h3 className="text-xl font-semibold mb-2">创新思维</h3>
          <p className="text-gray-600">注重用户体验和代码质量</p>
        </div>
        
        <div className="text-center p-6">
          <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🔧</span>
          </div>
          <h3 className="text-xl font-semibold mb-2">全栈能力</h3>
          <p className="text-gray-600">从前端到后端的完整解决方案</p>
        </div>
      </section>
    </div>
  );
};

export default Home;