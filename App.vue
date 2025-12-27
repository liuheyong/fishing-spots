<template>
  <view class="app">
    <!-- 应用主容器 -->
    
    <!-- 授权登录弹窗 -->
    <uni-popup ref="loginPopup" type="dialog" :mask-click="false">
      <view class="login-dialog">
        <view class="dialog-title">登录提示</view>
        <view class="dialog-content">
          <text class="content-text">为了给您提供更好的服务，需要获取您的微信授权信息。</text>
        </view>
        <view class="dialog-buttons">
          <button class="cancel-btn" @click="handleCancelLogin">取消</button>
          <button class="confirm-btn" @click="handleLogin">授权登录</button>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'

// 登录弹窗引用
const loginPopup = ref(null)

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
  
  // 如果没有token或用户信息，显示登录弹窗
  if (!token || !userInfo) {
    console.log('用户未登录，显示授权弹窗')
    // 延迟显示弹窗，确保页面已加载
    setTimeout(() => {
      if (loginPopup.value) {
        loginPopup.value.open()
      }
    }, 500)
  } else {
    console.log('用户已登录')
  }
}

/**
 * 处理用户授权登录
 */
function handleLogin() {
  // 调用微信登录
  uni.login({
    provider: 'weixin',
    success: (loginRes) => {
      console.log('登录成功，code:', loginRes.code)
      
      // 获取用户信息
      // #ifdef MP-WEIXIN
      uni.getUserProfile({
        desc: '用于完善用户资料',
        success: (userRes) => {
          console.log('获取用户信息成功:', userRes.userInfo)
          
          // 这里应该将code和用户信息发送到后端服务器
          // 后端验证后返回token
          // 这里使用模拟数据
          const mockToken = 'mock_token_' + Date.now()
          const userInfo = {
            avatar: userRes.userInfo.avatarUrl,
            nickname: userRes.userInfo.nickName,
            phone: '' // 手机号需要单独授权获取
          }
          
          // 存储token和用户信息
          uni.setStorageSync('token', mockToken)
          uni.setStorageSync('userInfo', userInfo)
          
          // 关闭弹窗
          if (loginPopup.value) {
            loginPopup.value.close()
          }
          
          // 显示登录成功提示
          uni.showToast({
            title: '登录成功',
            icon: 'success',
            duration: 1500
          })
          
          // 跳转到"我的"页面
          setTimeout(() => {
            uni.switchTab({
              url: '/pages/my/my'
            })
          }, 1500)
        },
        fail: (err) => {
          console.error('获取用户信息失败:', err)
          uni.showToast({
            title: '获取用户信息失败',
            icon: 'none'
          })
          // 用户拒绝授权，退出小程序
          setTimeout(() => {
            uni.exitMiniProgram()
          }, 1500)
        }
      })
      // #endif
      
      // #ifndef MP-WEIXIN
      // 非微信小程序环境的处理
      const mockToken = 'mock_token_' + Date.now()
      const userInfo = {
        avatar: 'https://via.placeholder.com/200',
        nickname: '游客用户',
        phone: ''
      }
      
      uni.setStorageSync('token', mockToken)
      uni.setStorageSync('userInfo', userInfo)
      
      if (loginPopup.value) {
        loginPopup.value.close()
      }
      
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

/**
 * 处理取消登录
 */
function handleCancelLogin() {
  uni.showModal({
    title: '提示',
    content: '未登录将无法使用完整功能，确定要退出吗？',
    success: (res) => {
      if (res.confirm) {
        // 关闭弹窗
        if (loginPopup.value) {
          loginPopup.value.close()
        }
        // 退出小程序
        uni.exitMiniProgram()
      }
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

/* 登录弹窗样式 */
.login-dialog {
  background-color: #fff;
  border-radius: 16rpx;
  padding: 40rpx;
  width: 580rpx;
}

.dialog-title {
  font-size: 36rpx;
  font-weight: 600;
  color: #333;
  text-align: center;
  margin-bottom: 30rpx;
}

.dialog-content {
  margin-bottom: 40rpx;
}

.content-text {
  font-size: 28rpx;
  color: #666;
  line-height: 1.6;
  text-align: center;
  display: block;
}

.dialog-buttons {
  display: flex;
  gap: 20rpx;
}

.cancel-btn,
.confirm-btn {
  flex: 1;
  height: 80rpx;
  border-radius: 40rpx;
  font-size: 28rpx;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cancel-btn {
  background-color: #f5f5f5;
  color: #666;
}

.confirm-btn {
  background: linear-gradient(135deg, #3cc51f 0%, #2fb015 100%);
  color: #fff;
}

.cancel-btn::after,
.confirm-btn::after {
  border: none;
}
</style>
