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
  // 检查登录状态
  checkLoginStatus()
})

// 应用显示（从后台进入前台）
onShow(() => {
  console.log('App Show')
  // 每次显示时都检查登录状态
  checkLoginStatus()
})

// 应用隐藏
onHide(() => {
  console.log('App Hide')
})

/**
 * 检查登录状态
 */
function checkLoginStatus() {
  const token = uni.getStorageSync('token')
  const userInfo = uni.getStorageSync('userInfo')
  
  // 如果没有token或用户信息，显示登录提示弹窗
  if (!token || !userInfo) {
    console.log('用户未登录，显示登录提示')
    // 延迟显示，确保页面加载完成
    setTimeout(() => {
      uni.showModal({
        title: '提示',
        content: '您还未登录，是否立即登录？',
        confirmText: '立即登录',
        cancelText: '取消',
        success: (res) => {
          if (res.confirm) {
            // 用户点击确定，触发登录事件
            // 通过事件通知钓点列表页面触发登录
            uni.$emit('triggerLogin')
          } else {
            // 用户点击取消，退出小程序
            uni.showToast({
              title: '需要登录才能使用',
              icon: 'none'
            })
          }
        }
      })
    }, 500)
  } else {
    console.log('用户已登录')
  }
}

// 非微信小程序环境的处理函数
function handleLogin() {
  // 调用微信登录
  uni.login({
    provider: 'weixin',
    success: (loginRes) => {
      console.log('登录成功，code:', loginRes.code)
      
      // #ifndef MP-WEIXIN
      // 非微信小程序环境的处理
      const mockToken = 'mock_token_' + Date.now()
      const userInfo = {
        avatar: 'http://p3.diaoyur.cn/group3/M00/0B/4C/cjd0iVhwYF-xmeuqfNBk9gLpv4atJ.jpeg',
        nickname: '游客用户',
        phone: ''
      }
      
      uni.setStorageSync('token', mockToken)
      uni.setStorageSync('userInfo', userInfo)
      
      uni.showToast({
        title: '登录成功',
        icon: 'success'
      })
      
      setTimeout(() => {
        uni.switchTab({
          url: '/pages/my/my'
        })
      }, 1500)
      // #endif
    },
    fail: (err) => {
      console.error('登录失败:', err)
      uni.showToast({
        title: '登录失败',
        icon: 'none'
      })
      // 登录失败，退出小程序
      setTimeout(() => {
        uni.exitMiniProgram()
      }, 1500)
    }
  })
}
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