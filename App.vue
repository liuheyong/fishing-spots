<template>
  <view class="app">
    <!-- 应用主容器 -->
  </view>
</template>

<script setup>
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'

// 应用启动
onLaunch(() => {
  console.log('App Launch')
})

// 应用显示（从后台进入前台）
onShow(() => {
  console.log('App Show')
})

// 应用隐藏
onHide(() => {
  console.log('App Hide')
})
</script>

<style>
/* 全局样式 */
@import './static/styles/common.css';

/* 重置默认样式 */
page {
  background-color: #f5f5f5;
  font-size: 28rpx;
  color: #333;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
}

/* 清除按钮默认样式 */
button::after {
  border: none;
}

/* 图片默认样式 */
image {
  display: block;
}
</style>