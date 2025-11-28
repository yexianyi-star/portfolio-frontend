import React, { useState, useEffect } from 'react';
import { projectsAPI, blogAPI } from '../services/api';
import { mockProjects, mockBlogPosts } from '../services/mockData';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('projects');
  const [projects, setProjects] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  // 加载数据
  useEffect(() => {
    loadProjects();
    loadBlogPosts();
  }, []);

  const loadProjects = async () => {
    setLoading(true);
    try {
      const response = await projectsAPI.getAll();
      setProjects(response.data);
    } catch (error) {
      console.error('加载项目失败:', error);
      setProjects(mockProjects);
    } finally {
      setLoading(false);
    }
  };

  const loadBlogPosts = async () => {
    setLoading(true);
    try {
      const response = await blogAPI.getAll();
      setBlogPosts(response.data);
    } catch (error) {
      console.error('加载博客文章失败:', error);
      setBlogPosts(mockBlogPosts);
    } finally {
      setLoading(false);
    }
  };

  // 项目管理函数
  const addProject = () => {
    const newProject = {
      _id: Date.now().toString(),
      title: '新项目',
      description: '项目描述',
      imageUrl: 'https://picsum.photos/400/300?random=' + Date.now(),
      projectUrl: '#',
      technologies: ['React', 'Node.js'],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setProjects([...projects, newProject]);
  };

  const deleteProject = (id) => {
    if (window.confirm('确定要删除这个项目吗？')) {
      setProjects(projects.filter(project => project._id !== id));
    }
  };

  // 博客管理函数
  const addBlogPost = () => {
    const newPost = {
      _id: Date.now().toString(),
      title: '新博客文章',
      imageUrl: 'https://picsum.photos/800/400?random=' + Date.now(),
      author: '管理员',
      createdAt: new Date(),
      summary: '文章摘要',
      tags: ['新标签'],
      content: '文章内容'
    };
    setBlogPosts([...blogPosts, newPost]);
  };

  const deleteBlogPost = (id) => {
    if (window.confirm('确定要删除这篇文章吗？')) {
      setBlogPosts(blogPosts.filter(post => post._id !== id));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">管理面板</h1>
        <p className="text-gray-600">管理您的项目和博客内容</p>
      </div>

      {/* 标签页导航 */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('projects')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'projects'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            项目管理
          </button>
          <button
            onClick={() => setActiveTab('blog')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'blog'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            博客管理
          </button>
        </nav>
      </div>

      {/* 项目管理标签页 */}
      {activeTab === 'projects' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">项目列表</h2>
            <button
              onClick={addProject}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              添加项目
            </button>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-2 text-gray-600">加载中...</p>
            </div>
          ) : (
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {projects.map((project) => (
                  <li key={project._id}>
                    <div className="px-4 py-4 flex items-center justify-between hover:bg-gray-50">
                      <div className="flex items-center">
                        <img
                          className="h-10 w-10 rounded object-cover"
                          src={project.imageUrl}
                          alt={project.title}
                        />
                        <div className="ml-4">
                          <h3 className="text-sm font-medium text-gray-900">
                            {project.title}
                          </h3>
                          <p className="text-sm text-gray-500 truncate max-w-md">
                            {project.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-900 text-sm font-medium">
                          编辑
                        </button>
                        <button
                          onClick={() => deleteProject(project._id)}
                          className="text-red-600 hover:text-red-900 text-sm font-medium"
                        >
                          删除
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {projects.length === 0 && !loading && (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <div className="text-gray-400 text-6xl mb-4">📁</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">暂无项目</h3>
              <p className="text-gray-500 mb-4">您还没有添加任何项目</p>
              <button
                onClick={addProject}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                添加第一个项目
              </button>
            </div>
          )}
        </div>
      )}

      {/* 博客管理标签页 */}
      {activeTab === 'blog' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">博客文章</h2>
            <button
              onClick={addBlogPost}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              添加文章
            </button>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-2 text-gray-600">加载中...</p>
            </div>
          ) : (
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {blogPosts.map((post) => (
                  <li key={post._id}>
                    <div className="px-4 py-4 flex items-center justify-between hover:bg-gray-50">
                      <div className="flex items-center">
                        <img
                          className="h-10 w-10 rounded object-cover"
                          src={post.imageUrl}
                          alt={post.title}
                        />
                        <div className="ml-4">
                          <h3 className="text-sm font-medium text-gray-900">
                            {post.title}
                          </h3>
                          <p className="text-sm text-gray-500">
                            作者: {post.author} | 发布时间: {new Date(post.createdAt).toLocaleDateString('zh-CN')}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-900 text-sm font-medium">
                          编辑
                        </button>
                        <button
                          onClick={() => deleteBlogPost(post._id)}
                          className="text-red-600 hover:text-red-900 text-sm font-medium"
                        >
                          删除
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {blogPosts.length === 0 && !loading && (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <div className="text-gray-400 text-6xl mb-4">📝</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">暂无博客文章</h3>
              <p className="text-gray-500 mb-4">您还没有添加任何博客文章</p>
              <button
                onClick={addBlogPost}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                添加第一篇文章
              </button>
            </div>
          )}
        </div>
      )}

      {/* 模拟数据提示 */}
      <div className="mt-8 p-4 bg-yellow-50 rounded-md">
        <p className="text-sm text-yellow-700">
          <strong>注意：</strong> 当前使用模拟数据管理。刷新页面后更改将丢失。
          要持久化数据，需要连接真实的后端API和数据库。
        </p>
      </div>
    </div>
  );
};

export default Admin;