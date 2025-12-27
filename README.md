# 钓点管理小程序

基于 UniApp + Vue3 开发的钓点管理小程序前端项目。

## 项目简介

本项目是一个钓点管理小程序，用户可以添加、浏览、管理钓点信息。支持图片上传、位置选择、搜索筛选等功能。

## 技术栈

- **框架**: UniApp + Vue3 Composition API
- **UI组件**: uni-ui 组件库
- **状态管理**: Vue3 Reactive API
- **样式**: SCSS/CSS3

## 项目结构

```
fishing-spots/
├── pages/                  # 页面目录
│   ├── spotList/          # 钓点列表页
│   ├── spotDetail/        # 钓点详情页
│   ├── addSpot/           # 新增/编辑钓点页
│   ├── my/                # 我的页面
│   └── editInfo/          # 修改信息页
├── api/                   # API接口目录
│   └── index.js           # API接口定义
├── utils/                 # 工具类目录
│   ├── request.js         # 请求封装
│   └── util.js            # 工具函数
├── static/                # 静态资源目录
│   ├── styles/            # 全局样式
│   └── tabbar/            # TabBar图标（需自行添加）
├── App.vue                # 应用入口
├── pages.json             # 页面配置
├── manifest.json          # 应用配置
└── package.json           # 项目依赖
```

## 功能特性

### 1. 钓点列表页
- ✅ 搜索功能（按钓点名称搜索）
- ✅ 分页加载（每页15条数据）
- ✅ 下拉刷新、上拉加载更多
- ✅ 列表展示（图片、名称、类型）
- ✅ 点击跳转详情页
- ✅ 右上角"增加标点"按钮

### 2. 钓点详情页
- ✅ 图片轮播展示
- ✅ 基本信息展示
- ✅ 详细信息展示
- ✅ 编辑和删除功能

### 3. 新增/编辑钓点页
- ✅ 多图片上传（最多9张）
- ✅ 钓点名称输入（必填验证）
- ✅ 类型选择（野河/黑坑，必选）
- ✅ 地理位置选择
- ✅ 联系电话输入
- ✅ 钓点描述输入
- ✅ 表单验证机制

### 4. 我的页面
- ✅ 用户信息展示（头像、昵称、脱敏手机号）
- ✅ 统计信息展示（钓点数量、收藏数、访问次数）
- ✅ 功能菜单（我的钓点、收藏、历史记录等）
- ✅ 设置和关于

### 5. 修改信息页
- ✅ 头像上传
- ✅ 昵称输入（必填验证）
- ✅ 手机号输入（格式验证）
- ✅ 性别选择
- ✅ 个人简介输入

## 安装运行

### 1. 安装依赖

```bash
npm install
# 或
yarn install
```

### 2. 运行到微信小程序

```bash
npm run dev:mp-weixin
```

### 3. 运行到H5

```bash
npm run dev:h5
```

### 4. 运行到APP

```bash
npm run dev:app
```

## 配置说明

### 1. API配置

修改 `utils/request.js` 中的 `BASE_URL`：

```javascript
const BASE_URL = 'https://your-api-domain.com' // 替换为实际的API地址
```

### 2. TabBar图标

需要在 `static/tabbar/` 目录下添加以下图标文件：
- `spot.png` - 钓点图标（未选中）
- `spot-active.png` - 钓点图标（选中）
- `my.png` - 我的图标（未选中）
- `my-active.png` - 我的图标（选中）

建议尺寸：81px × 81px（@1x）

### 3. 微信小程序配置

在微信小程序管理后台配置以下权限：
- 用户信息
- 地理位置
- 相册/相机
- 网络请求域名

## 数据结构

### 钓点数据结构

```javascript
{
  id: 1,                              // 钓点ID
  name: '钓点名称',                    // 钓点名称
  type: 'wild',                        // 类型：wild-野河，black-黑坑
  imageUrl: 'https://...',             // 主图片URL
  images: ['https://...'],             // 图片列表
  location: '北京市朝阳区某某湖',       // 地理位置
  phone: '13800138000',                // 联系电话
  description: '钓点描述',             // 钓点描述
  createTime: '2023-12-25T12:00:00Z'  // 创建时间
}
```

### 用户数据结构

```javascript
{
  avatar: 'https://...',    // 头像URL
  nickname: '昵称',          // 昵称
  phone: '13812345678',     // 手机号
  gender: 'male',           // 性别：male-男，female-女
  bio: '个人简介'            // 个人简介
}
```

## 注意事项

1. **模拟数据**：当前代码使用模拟数据，实际项目中需要替换为真实的API调用
2. **图片上传**：需要实现真实的图片上传接口
3. **地理位置**：需要在manifest.json中配置地理位置权限
4. **uni-ui组件库**：需要安装 `@dcloudio/uni-ui` 组件库
5. **响应式适配**：已适配移动端，建议在真机上测试

## API接口文档

### 钓点相关

| 接口 | 方法 | 说明 |
|------|------|------|
| /api/spots | GET | 获取钓点列表 |
| /api/spots/:id | GET | 获取钓点详情 |
| /api/spots | POST | 添加钓点 |
| /api/spots/:id | PUT | 更新钓点 |
| /api/spots/:id | DELETE | 删除钓点 |
| /api/upload/spot | POST | 上传钓点图片 |

### 用户相关

| 接口 | 方法 | 说明 |
|------|------|------|
| /api/user/info | GET | 获取用户信息 |
| /api/user/info | PUT | 更新用户信息 |
| /api/user/stats | GET | 获取用户统计 |
| /api/upload/avatar | POST | 上传头像 |
| /api/user/login | POST | 用户登录 |
| /api/user/logout | POST | 用户登出 |

## 常见问题

### 1. uni-ui组件不显示？

确保已安装uni-ui组件库：
```bash
npm install @dcloudio/uni-ui
```

### 2. 图片上传失败？

检查：
- API地址是否正确
- 服务器是否支持文件上传
- 是否配置了正确的域名白名单

### 3. 位置选择失败？

检查：
- 是否在manifest.json中配置了位置权限
- 微信小程序是否授权了位置权限

## 开发建议

1. 使用真实API替换模拟数据
2. 添加登录功能和token验证
3. 完善错误处理和异常提示
4. 添加loading状态和骨架屏
5. 优化图片加载和缓存策略
6. 添加数据埋点和统计分析

## 版本历史

- v1.0.0 (2024-12-25)
  - 初始版本
  - 实现基础功能

## 许可证

MIT License
