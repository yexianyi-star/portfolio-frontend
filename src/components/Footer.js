import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* 版权信息 */}
          <div className="mb-4 md:mb-0">
            <p>&copy; {currentYear} 我的作品集. 保留所有权利.</p>
          </div>
          
          {/* 社交链接 */}
          <div className="flex space-x-4">
            <a href="#" className="hover:text-blue-300 transition-colors">GitHub</a>
            <a href="#" className="hover:text-blue-300 transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-blue-300 transition-colors">Twitter</a>
            <a href="#" className="hover:text-blue-300 transition-colors">Email</a>
          </div>
        </div>
        
        {/* 底部说明 */}
        <div className="text-center mt-6 pt-6 border-t border-gray-700">
          <p className="text-gray-400 text-sm">
            使用 React + Tailwind CSS 构建
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;