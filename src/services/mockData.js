// 模拟项目数据
export const mockProjects = [
  {
    _id: '1',
    title: '个人作品集网站',
    description: '使用React和Node.js构建的全栈作品集网站，展示了我的技术能力和项目经验。',
    imageUrl: 'https://picsum.photos/400/300?random=1',
    projectUrl: 'https://github.com',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '2',
    title: '电商平台',
    description: '一个完整的电子商务解决方案，包含用户认证、商品管理和支付集成。',
    imageUrl: 'https://picsum.photos/400/300?random=2',
    projectUrl: 'https://github.com',
    technologies: ['React', 'Redux', 'Node.js', 'Stripe API'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '3',
    title: '任务管理应用',
    description: '帮助用户组织日常任务和项目的生产力工具，支持团队协作。',
    imageUrl: 'https://picsum.photos/400/300?random=3',
    projectUrl: 'https://github.com',
    technologies: ['Vue.js', 'Firebase', 'Tailwind CSS'],
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// 模拟博客数据
export const mockBlogPosts = [
  {
    _id: '1',
    title: 'React Hooks 最佳实践',
    imageUrl: 'https://picsum.photos/800/400?random=10',
    author: '张三',
    createdAt: new Date('2024-01-15'),
    summary: '深入探讨React Hooks的使用技巧和最佳实践，帮助您编写更高效的React组件。包括useState、useEffect、useContext等核心Hook的详细解析。',
    tags: ['React', 'Hooks', '前端', 'JavaScript'],
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
  },
  {
    _id: '2',
    title: 'Tailwind CSS 入门指南',
    imageUrl: 'https://picsum.photos/800/400?random=11',
    author: '李四',
    createdAt: new Date('2024-01-10'),
    summary: '学习如何使用Tailwind CSS快速构建现代化的用户界面，提高开发效率。包含实用技巧和常见布局解决方案。',
    tags: ['Tailwind', 'CSS', '前端', 'UI设计'],
    content: `
      <h2>什么是 Tailwind CSS？</h2>
      <p>Tailwind CSS 是一个功能优先的 CSS 框架，它提供了大量的工具类，让你能够快速构建自定义设计。</p>
      
      <h3>核心概念</h3>
      <ul>
        <li>实用工具优先</li>
        <li>响应式设计</li>
        <li>组件化思维</li>
        <li>高度可定制</li>
      </ul>
      
      <h3>基本使用</h3>
      <pre><code>&lt;div className="bg-blue-500 text-white p-4 rounded-lg"&gt;
  Hello Tailwind!
&lt;/div&gt;</code></pre>
    `,
    comments: [
      {
        id: 1,
        author: '赵六',
        content: 'Tailwind 确实提高了开发效率！',
        createdAt: new Date('2024-01-12')
      }
    ]
  },
  {
    _id: '3',
    title: 'Node.js 后端开发实战',
    imageUrl: 'https://picsum.photos/800/400?random=12',
    author: '王五',
    createdAt: new Date('2024-01-05'),
    summary: '通过实际项目案例，掌握Node.js后端开发的完整流程和最佳实践。涵盖Express框架、数据库集成和API设计。',
    tags: ['Node.js', '后端', 'JavaScript', 'Express'],
    content: `
      <h2>Node.js 简介</h2>
      <p>Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境，让开发者能够使用 JavaScript 编写服务器端代码。</p>
      
      <h3>核心特性</h3>
      <ul>
        <li>事件驱动</li>
        <li>非阻塞 I/O</li>
        <li>单线程</li>
        <li>跨平台</li>
      </ul>
      
      <h3>Express 框架</h3>
      <p>Express 是 Node.js 最流行的 Web 框架，提供了简洁的 API 来构建 Web 应用和 API。</p>
      <pre><code>const express = require('express');
const app = express();
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.listen(3000);</code></pre>
    `,
    comments: []
  },
  {
    _id: '4',
    title: 'MongoDB 数据库设计原则',
    imageUrl: 'https://picsum.photos/800/400?random=13',
    author: '赵六',
    createdAt: new Date('2024-01-01'),
    summary: '了解MongoDB文档数据库的设计原则和最佳实践，学习如何优化查询性能和数据结构。',
    tags: ['MongoDB', '数据库', 'NoSQL', '后端'],
    content: `
      <h2>MongoDB 概述</h2>
      <p>MongoDB 是一个基于分布式文件存储的 NoSQL 数据库，使用文档模型存储数据。</p>
      
      <h3>文档结构</h3>
      <pre><code>{
  "_id": ObjectId("5099803df3f4948bd2f98391"),
  "name": "张三",
  "age": 25,
  "hobbies": ["编程", "阅读", "运动"]
}</code></pre>
      
      <h3>设计原则</h3>
      <ul>
        <li>嵌入式文档 vs 引用</li>
        <li>预聚合数据</li>
        <li>考虑查询模式</li>
        <li>适当使用索引</li>
      </ul>
    `,
    comments: [
      {
        id: 1,
        author: '钱七',
        content: '文档数据库的设计思路确实和关系型数据库很不同。',
        createdAt: new Date('2024-01-03')
      }
    ]
  }
];

// 模拟用户数据
export const mockUsers = {
  'admin@example.com': {
    id: '1',
    username: 'admin',
    email: 'admin@example.com',
    password: 'password'
  },
  'test@example.com': {
    id: '2', 
    username: 'testuser',
    email: 'test@example.com',
    password: 'password'
  }
};