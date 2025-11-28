import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { blogAPI } from '../services/api';
import { mockBlogPosts } from '../services/mockData'; // 从mockData导入

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [usingMockData, setUsingMockData] = useState(false);

  // 使用useCallback包装fetchPosts函数，包含所有依赖
  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      setUsingMockData(false);
      
      console.log('开始获取博客数据...');
      const response = await blogAPI.getAll();
      console.log('博客API响应:', response);
      
      if (response.data && Array.isArray(response.data)) {
        setPosts(response.data);
      } else {
        throw new Error('API返回数据格式不正确');
      }
    } catch (err) {
      console.error('获取博客文章失败:', err);
      
      // 提供详细的错误信息
      let errorMessage = '获取博客文章失败';
      if (err.response) {
        // 服务器响应了错误状态码
        errorMessage = `服务器错误: ${err.response.status} - ${err.response.data?.message || '未知错误'}`;
      } else if (err.request) {
        // 请求发送了但没有收到响应
        errorMessage = '网络错误：无法连接到服务器，请检查网络连接';
      } else {
        // 其他错误
        errorMessage = `请求错误: ${err.message}`;
      }
      
      setError(errorMessage);
      
      // 使用模拟数据作为备选
      console.log('使用模拟博客数据');
      setPosts(mockBlogPosts); // 使用导入的mockBlogPosts
      setUsingMockData(true);
    } finally {
      setLoading(false);
    }
  }, []); // 空依赖数组，因为mockBlogPosts现在是外部导入的常量

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // 加载状态
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">加载博客文章中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 页面标题 */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">技术博客</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          分享开发经验、技术学习和项目心得。
        </p>
      </div>

      {/* 演示数据提示 */}
      {usingMockData && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-6 text-center">
          <p>博客API暂时不可用，当前显示演示数据</p>
          <p className="text-sm mt-1">错误详情: {error}</p>
        </div>
      )}

      {/* 错误提示（仅当没有使用模拟数据时显示） */}
      {error && !usingMockData && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 text-center">
          {error}
          <div className="mt-2">
            <button 
              onClick={fetchPosts}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-2"
            >
              重试
            </button>
            <button 
              onClick={() => {
                setPosts(mockBlogPosts);
                setUsingMockData(true);
                setError('');
              }}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
            >
              使用演示数据
            </button>
          </div>
        </div>
      )}

      {/* 博客文章列表 */}
      <div className="max-w-4xl mx-auto">
        {posts.map((post) => (
          <article key={post._id} className="bg-white rounded-lg shadow-md overflow-hidden mb-8 hover:shadow-lg transition-shadow">
            {/* 文章图片 */}
            <img 
              src={post.imageUrl} 
              alt={post.title}
              className="w-full h-64 object-cover"
              onError={(e) => {
                // 如果图片加载失败，使用备用图片
                e.target.src = `https://picsum.photos/800/400?random=${post._id}`;
              }}
            />
            
            {/* 文章内容 */}
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                {post.title}
              </h2>
              
              <div className="flex items-center text-gray-500 text-sm mb-4">
                <span>作者: {post.author}</span>
                <span className="mx-2">•</span>
                <span>发布于: {new Date(post.createdAt).toLocaleDateString('zh-CN')}</span>
              </div>
              
              <p className="text-gray-600 mb-4 leading-relaxed">
                {post.summary}
              </p>
              
              <div className="flex justify-between items-center">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                
                <Link 
                  to={`/blog/${post._id}`}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
                >
                  阅读更多
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* 空状态 */}
      {posts.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">📝</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">暂无博客文章</h3>
          <p className="text-gray-500">当前没有可展示的博客文章</p>
        </div>
      )}
    </div>
  );
};

export default Blog;