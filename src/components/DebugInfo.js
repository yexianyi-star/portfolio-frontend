import React from 'react';

const DebugInfo = () => {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', margin: '10px' }}>
      <h3>🔧 调试信息</h3>
      <p><strong>API URL:</strong> {process.env.REACT_APP_API_URL || '未设置'}</p>
      <p><strong>环境:</strong> {process.env.NODE_ENV}</p>
      <button 
        onClick={() => {
          fetch(`${process.env.REACT_APP_API_URL}/api/projects`)
            .then(r => r.json())
            .then(data => alert(`API连接成功！项目数量: ${data.length}`))
            .catch(err => alert(`API连接失败: ${err.message}`));
        }}
      >
        测试API连接
      </button>
    </div>
  );
};

export default DebugInfo;