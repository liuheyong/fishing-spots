# TabBar 图标说明

由于图标文件是二进制文件，本项目未包含实际的图标图片。

## 需要准备的图标

请在 `static/tabbar/` 目录下添加以下图标文件：

### 1. 钓点图标
- **文件名**: `spot.png` (未选中状态)
- **文件名**: `spot-active.png` (选中状态)
- **建议尺寸**: 81px × 81px (@1x), 162px × 162px (@2x), 243px × 243px (@3x)
- **图标建议**: 位置标记、地图pin、钓鱼竿等相关图标

### 2. 我的图标
- **文件名**: `my.png` (未选中状态)
- **文件名**: `my-active.png` (选中状态)
- **建议尺寸**: 81px × 81px (@1x), 162px × 162px (@2x), 243px × 243px (@3x)
- **图标建议**: 用户头像、个人中心等相关图标

## 设计规范

### 颜色
- **未选中状态**: #7A7E83 (灰色)
- **选中状态**: #3cc51f (绿色)

### 尺寸要求
- 微信小程序推荐使用 81px × 81px 尺寸
- 建议提供 @1x, @2x, @3x 三种分辨率
- 格式支持：PNG (推荐透明背景)

## 图标获取方式

### 方式一：使用IconFont
访问 [iconfont.cn](https://www.iconfont.cn/) 下载所需图标

### 方式二：使用开源图标库
- [Feather Icons](https://feathericons.com/)
- [Material Icons](https://fonts.google.com/icons)
- [Font Awesome](https://fontawesome.com/)

### 方式三：自行设计
使用 Sketch、Figma、Adobe Illustrator 等设计工具制作

## 临时解决方案

如果暂时没有图标，可以：
1. 使用纯文字作为TabBar
2. 使用uni-icons组件替代
3. 使用占位图标

修改 `pages.json` 的tabBar配置：
```json
{
  "tabBar": {
    "color": "#7A7E83",
    "selectedColor": "#3cc51f",
    "borderStyle": "black",
    "backgroundColor": "#ffffff",
    "list": [
      {
        "pagePath": "pages/spotList/spotList",
        "text": "钓点"
        // 暂时去掉 iconPath 和 selectedIconPath
      },
      {
        "pagePath": "pages/my/my",
        "text": "我的"
        // 暂时去掉 iconPath 和 selectedIconPath
      }
    ]
  }
}
```

## 其他静态资源

如需要，还可以添加：
- `static/default-avatar.png` - 默认头像
- `static/default-spot.png` - 默认钓点图片
- `static/logo.png` - 应用Logo
