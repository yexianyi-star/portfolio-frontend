import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// 保护路由组件，只有登录用户才能访问
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  // 如果正在检查认证状态，显示加载中
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // 如果未认证，重定向到登录页
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // 如果已认证，渲染子组件
  return children;
};

export default ProtectedRoute;