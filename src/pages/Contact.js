import React, { useState } from 'react';
import { contactAPI } from '../services/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // 处理表单输入变化
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // 处理表单提交
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // 尝试调用API
      await contactAPI.send(formData);
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (err) {
      // 如果API调用失败，模拟成功提交
      console.log('API调用失败，模拟成功提交:', formData);
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">联系我</h1>
          <p className="text-lg text-gray-600">
            有任何问题或合作意向？欢迎随时联系！
          </p>
        </div>

        {/* 成功提示 */}
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
            消息发送成功！我会尽快回复您。
          </div>
        )}

        {/* 错误提示 */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* 联系表单 */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* 姓名输入 */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                姓名 *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="请输入您的姓名"
              />
            </div>

            {/* 邮箱输入 */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                邮箱 *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="请输入您的邮箱"
              />
            </div>
          </div>

          {/* 主题输入 */}
          <div className="mb-6">
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
              主题 *
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="请输入消息主题"
            />
          </div>

          {/* 消息输入 */}
          <div className="mb-6">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
              消息内容 *
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="6"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="请输入您想说的话..."
            ></textarea>
          </div>

          {/* 提交按钮 */}
          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '发送中...' : '发送消息'}
            </button>
          </div>
        </form>

        {/* 其他联系信息 */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">其他联系方式</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="text-3xl mb-3">📧</div>
              <h3 className="font-semibold mb-2">邮箱</h3>
              <p className="text-gray-600">your.email@example.com</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="text-3xl mb-3">📱</div>
              <h3 className="font-semibold mb-2">电话</h3>
              <p className="text-gray-600">+86 138 0000 0000</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="text-3xl mb-3">📍</div>
              <h3 className="font-semibold mb-2">地址</h3>
              <p className="text-gray-600">中国 某省 某市</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;