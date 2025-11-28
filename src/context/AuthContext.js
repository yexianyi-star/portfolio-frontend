import React, { createContext, useState, useContext, useEffect } from 'react';

// 创建认证上下文
const AuthContext = createContext();

// 认证提供者组件
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);

  // 从localStorage恢复登录状态
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // 登录函数
  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    // 保存到localStorage
    localStorage.setItem('token', authToken);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // 登出函数
  const logout = () => {
    setUser(null);
    setToken(null);
    // 清除localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  // 注册函数
  const register = async (userData) => {
    setLoading(true);
    try {
      // 这里以后会调用真实的注册API
      console.log('注册信息:', userData);
      // 模拟注册成功
      const mockUser = {
        id: '2',
        username: userData.username,
        email: userData.email
      };
      const mockToken = 'mock-jwt-token-' + Date.now();
      
      login(mockUser, mockToken);
      return { success: true, user: mockUser };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // 提供的值
  const value = {
    user,
    token,
    loading,
    login,
    logout,
    register,
    isAuthenticated: !!user && !!token
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// 自定义Hook，方便使用认证上下文
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth必须在AuthProvider内部使用');
  }
  return context;
};

export default AuthContext;