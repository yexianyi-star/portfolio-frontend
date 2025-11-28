import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogAPI } from '../services/api';
import { mockBlogPosts } from '../services/mockData'; // 从mockData导入

const BlogDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 根据id获取模拟博客数据
  const getMockPost = (postId) => {
    const foundPost = mockBlogPosts.find(p => p._id === postId);
    if (foundPost) {
      return foundPost;
    }
    
    // 如果没找到，返回默认的模拟数据
    return {
      _id: postId,
      title: 'React Hooks 最佳实践',
      imageUrl: 'https://picsum.photos/800/400?random=10',
      author: '张三',
      createdAt: new Date('2024-01-15'),
      content: `
        <h2>React Hooks 简介</h2>
        <p>React Hooks 是 React 16.8 引入的新特性，它让你在不编写 class 的情况下使用 state 以及其他的 React 特性。</p>
        
        <h3>useState Hook</h3>
        <p>useState 是一个允许你在函数组件中添加 state 的 Hook。</p>
        <pre><code>const [state, setState] = useState(initialState);</code></pre>
        
        <h3>useEffect Hook</h3>
        <p>useEffect 是一个允许你在函数组件中执行副作用操作的 Hook。</p>
        <p>它类似于 class 组件中的 componentDidMount、componentDidUpdate 和 componentWillUnmount 的组合。</p>
        
        <h3>最佳实践</h3>
        <ul>
          <li>只在最顶层使用 Hook</li>
          <li>只在 React 函数中调用 Hook</li>
          <li>使用多个 Effect 实现关注点分离</li>
          <li>使用自定义 Hook 复用状态逻辑</li>
        </ul>
      `,
      tags: ['React', 'Hooks', '前端', 'JavaScript'],
      comments: [
        {
          id: 1,
          author: '李四',
          content: '非常详细的介绍，对我帮助很大！',
          createdAt: new Date('2024-01-16')
        },
        {
          id: 2,
          author: '王五',
          content: '期待更多关于自定义Hook的文章。',
          createdAt: new Date('2024-01-17')
        }
      ]
    };
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await blogAPI.getById(id);
        setPost(response.data);
      } catch (err) {
        console.error('获取博客文章详情失败:', err);
        setError('获取文章详情失败，显示演示内容');
        // 使用模拟数据
        const mockPost = getMockPost(id);
        setPost(mockPost);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]); // 只依赖id，因为getMockPost不依赖组件状态

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">加载文章中...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">文章未找到</h1>
          <Link to="/blog" className="text-blue-600 hover:text-blue-800">
            返回博客列表
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* 返回按钮 */}
      <div className="mb-6">
        <Link 
          to="/blog" 
          className="inline-flex items-center text-blue-600 hover:text-blue-800"
        >
          ← 返回博客列表
        </Link>
      </div>

      {/* 错误提示 */}
      {error && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {/* 文章内容 */}
      <article className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* 文章图片 */}
        <img 
          src={post.imageUrl} 
          alt={post.title}
          className="w-full h-64 object-cover"
        />
        
        {/* 文章头部 */}
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {post.title}
          </h1>
          
          <div className="flex items-center text-gray-500 text-sm mb-6">
            <span>作者: {post.author}</span>
            <span className="mx-2">•</span>
            <span>发布于: {new Date(post.createdAt).toLocaleDateString('zh-CN')}</span>
          </div>
          
          {/* 标签 */}
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag, index) => (
              <span 
                key={index}
                className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
              >
                #{tag}
              </span>
            ))}
          </div>
          
          {/* 文章内容 */}
          <div 
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </article>

      {/* 评论区域 */}
      <div className="mt-12 bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">评论 ({post.comments?.length || 0})</h2>
        
        {/* 评论列表 */}
        <div className="space-y-6">
          {post.comments?.map((comment) => (
            <div key={comment.id} className="border-b border-gray-200 pb-6 last:border-0">
              <div className="flex justify-between items-start mb-2">
                <span className="font-semibold text-gray-800">{comment.author}</span>
                <span className="text-sm text-gray-500">
                  {new Date(comment.createdAt).toLocaleDateString('zh-CN')}
                </span>
              </div>
              <p className="text-gray-600">{comment.content}</p>
            </div>
          ))}
          
          {(!post.comments || post.comments.length === 0) && (
            <p className="text-gray-500 text-center py-4">暂无评论</p>
          )}
        </div>
        
        {/* 添加评论表单 */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">发表评论</h3>
          <form className="space-y-4">
            <div>
              <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                评论内容
              </label>
              <textarea
                id="comment"
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="请输入您的评论..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md transition-colors"
            >
              提交评论
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;