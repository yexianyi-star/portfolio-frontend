import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* 网站Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-800 hover:text-blue-600">
              我的作品集
            </Link>
          </div>
          
          {/* 导航菜单 */}
          <nav className="flex items-center space-x-6">
            <Link to="/" className="text-gray-600 hover:text-blue-600">首页</Link>
            <Link to="/projects" className="text-gray-600 hover:text-blue-600">项目</Link>
            <Link to="/blog" className="text-gray-600 hover:text-blue-600">博客</Link>
            <Link to="/contact" className="text-gray-600 hover:text-blue-600">联系</Link>
            
            {/* 用户状态 */}
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/admin" className="text-gray-600 hover:text-blue-600">
                  管理面板
                </Link>
                <span className="text-gray-600">欢迎, {user.username}</span>
                <button 
                  onClick={logout}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                >
                  退出
                </button>
              </div>
            ) : (
              <Link to="/login" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                登录
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;