import React, { useState, useEffect } from 'react';
import { projectsAPI } from '../services/api';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await projectsAPI.getAll();
        setProjects(response.data);
      } catch (error) {
        console.error('获取项目失败:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // 处理链接点击
  const handleProjectLinkClick = (e, projectUrl, projectTitle) => {
    if (projectUrl === 'https://github.com') {
      e.preventDefault();
      alert(`项目 "${projectTitle}" 的GitHub链接是示例链接，实际项目中请替换为真实的项目仓库地址。`);
    }
    // 其他链接正常跳转
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">加载项目中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">我的项目</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          这里展示了我开发的一些项目，涵盖了前端、后端和全栈应用。
        </p>
      </div>

      {/* 项目链接提示 */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <p className="text-blue-700 text-sm">
          <strong>提示：</strong> 项目链接目前是示例链接。在实际部署时，请将它们替换为您真实的GitHub项目地址。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div key={project._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <img 
              src={project.imageUrl} 
              alt={project.title}
              className="w-full h-48 object-cover"
              onError={(e) => {
                e.target.src = `https://picsum.photos/400/300?random=${project._id}`;
              }}
            />
            
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {project.title}
              </h3>
              
              <p className="text-gray-600 mb-4">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech, index) => (
                  <span 
                    key={index}
                    className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              <div className="flex space-x-3">
                <a 
                  href={project.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => handleProjectLinkClick(e, project.projectUrl, project.title)}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-center py-2 px-4 rounded transition-colors"
                >
                  查看代码
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;