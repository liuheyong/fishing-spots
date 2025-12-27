<template>
  <view class="container">
    <!-- 用户信息卡片 -->
    <view class="user-card">
      <view class="user-header">
        <image 
          :src="userInfo.avatar || '/static/default-avatar.png'" 
          class="user-avatar"
          mode="aspectFill"
        ></image>
        <view class="user-info">
          <view class="user-name">{{ userInfo.nickname || '未设置昵称' }}</view>
          <view class="user-phone">{{ maskedPhone }}</view>
        </view>
        <view class="edit-icon" @click="goToEdit">
          <uni-icons type="compose" size="20" color="#3cc51f"></uni-icons>
          <text class="edit-text">修改信息</text>
        </view>
      </view>
    </view>

    <!-- 统计信息 -->
    <view class="stats-card">
      <view class="stats-item">
        <view class="stats-number">{{ userStats.spotCount }}</view>
        <view class="stats-label">钓点数量</view>
      </view>
      <view class="stats-divider"></view>
      <view class="stats-item">
        <view class="stats-number">{{ userStats.favoriteCount }}</view>
        <view class="stats-label">收藏钓点</view>
      </view>
      <view class="stats-divider"></view>
      <view class="stats-item">
        <view class="stats-number">{{ userStats.visitCount }}</view>
        <view class="stats-label">访问次数</view>
      </view>
    </view>

    <!-- 功能菜单 -->
    <view class="menu-card">
      <uni-list>
        <uni-list-item 
          title="我的钓点" 
          :show-arrow="true"
          clickable
          @click="goToMySpots"
        >
          <template v-slot:header>
            <view class="menu-icon">
              <uni-icons type="location-filled" size="22" color="#3cc51f"></uni-icons>
            </view>
          </template>
        </uni-list-item>
        
        <uni-list-item 
          title="收藏钓点" 
          :show-arrow="true"
          clickable
          @click="goToFavorites"
        >
          <template v-slot:header>
            <view class="menu-icon">
              <uni-icons type="star-filled" size="22" color="#ff9500"></uni-icons>
            </view>
          </template>
        </uni-list-item>

        <uni-list-item 
          title="历史记录" 
          :show-arrow="true"
          clickable
          @click="goToHistory"
        >
          <template v-slot:header>
            <view class="menu-icon">
              <uni-icons type="clock-filled" size="22" color="#007aff"></uni-icons>
            </view>
          </template>
        </uni-list-item>
      </uni-list>
    </view>

    <!-- 设置菜单 -->
    <view class="menu-card">
      <uni-list>
        <uni-list-item 
          title="设置" 
          :show-arrow="true"
          clickable
          @click="goToSettings"
        >
          <template v-slot:header>
            <view class="menu-icon">
              <uni-icons type="gear-filled" size="22" color="#8e8e93"></uni-icons>
            </view>
          </template>
        </uni-list-item>

        <uni-list-item 
          title="关于我们" 
          :show-arrow="true"
          clickable
          @click="goToAbout"
        >
          <template v-slot:header>
            <view class="menu-icon">
              <uni-icons type="info-filled" size="22" color="#5ac8fa"></uni-icons>
            </view>
          </template>
        </uni-list-item>
      </uni-list>
    </view>

    <!-- 退出登录按钮 -->
    <view class="logout-wrapper">
      <button class="logout-btn" @click="handleLogout">退出登录</button>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { onShow } from '@dcloudio/uni-app'

// 响应式数据
const userInfo = ref({
  avatar: '',
  nickname: '',
  phone: ''
})

const userStats = ref({
  spotCount: 0,
  favoriteCount: 0,
  visitCount: 0
})

// 计算属性 - 脱敏手机号
const maskedPhone = computed(() => {
  if (!userInfo.value.phone) return '未绑定手机号'
  const phone = userInfo.value.phone
  return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
})

// 页面显示时
onShow(() => {
  loadUserInfo()
  loadUserStats()
})

// 页面挂载时
onMounted(() => {
  // 可以在这里执行其他初始化操作
})

/**
 * 加载用户信息
 */
const loadUserInfo = async () => {
  try {
    // 首先从本地缓存获取用户信息
    const cachedUserInfo = uni.getStorageSync('userInfo')
    if (cachedUserInfo) {
      userInfo.value = cachedUserInfo
      console.log('从缓存加载用户信息:', cachedUserInfo)
    }
    
    // 然后从服务器获取最新信息（可选）
    // 模拟API请求 - 实际项目中替换为真实API
    const response = await mockGetUserInfo()

    if (response.success) {
      // 合并服务器返回的信息
      userInfo.value = {
        ...userInfo.value,
        ...response.data
      }
      // 更新缓存
      uni.setStorageSync('userInfo', userInfo.value)
    } else {
      uni.showToast({
        title: response.message || '加载失败',
        icon: 'none'
      })
    }
  } catch (error) {
    console.error('加载用户信息失败:', error)
  }
}

/**
 * 加载用户统计信息
 */
const loadUserStats = async () => {
  try {
    // 模拟API请求 - 实际项目中替换为真实API
    const response = await mockGetUserStats()

    if (response.success) {
      userStats.value = response.data
    }
  } catch (error) {
    console.error('加载统计信息失败:', error)
  }
}

/**
 * 跳转到编辑信息页
 */
const goToEdit = () => {
  uni.navigateTo({
    url: '/pages/editInfo/editInfo'
  })
}

/**
 * 跳转到我的钓点
 */
const goToMySpots = () => {
  uni.showToast({
    title: '功能开发中',
    icon: 'none'
  })
}

/**
 * 跳转到收藏钓点
 */
const goToFavorites = () => {
  uni.showToast({
    title: '功能开发中',
    icon: 'none'
  })
}

/**
 * 跳转到历史记录
 */
const goToHistory = () => {
  uni.showToast({
    title: '功能开发中',
    icon: 'none'
  })
}

/**
 * 跳转到设置
 */
const goToSettings = () => {
  uni.showToast({
    title: '功能开发中',
    icon: 'none'
  })
}

/**
 * 跳转到关于我们
 */
const goToAbout = () => {
  uni.showToast({
    title: '功能开发中',
    icon: 'none'
  })
}

/**
 * 退出登录
 */
const handleLogout = () => {
  uni.showModal({
    title: '提示',
    content: '确定要退出登录吗？',
    success: (res) => {
      if (res.confirm) {
        // 清除本地存储的用户信息
        uni.removeStorageSync('userInfo')
        uni.removeStorageSync('token')
        
        uni.showToast({
          title: '已退出登录',
          icon: 'success',
          duration: 1500
        })

        // 延迟后退出小程序或重启应用
        setTimeout(() => {
          // 方式1：退出小程序
          uni.exitMiniProgram()
          
          // 方式2：重新加载应用（会触发登录检查）
          // uni.reLaunch({
          //   url: '/pages/spotList/spotList'
          // })
        }, 1500)
      }
    }
  })
}

/**
 * 模拟API请求 - 获取用户信息
 */
const mockGetUserInfo = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: {
          avatar: 'https://via.placeholder.com/200',
          nickname: '钓鱼爱好者',
          phone: '13812345678'
        }
      })
    }, 300)
  })
}

/**
 * 模拟API请求 - 获取用户统计信息
 */
const mockGetUserStats = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: {
          spotCount: 12,
          favoriteCount: 8,
          visitCount: 156
        }
      })
    }, 300)
  })
}
</script>

<style scoped>
.container {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 30rpx;
}

.user-card {
  background: linear-gradient(135deg, #3cc51f 0%, #2fb015 100%);
  padding: 40rpx 30rpx;
  margin-bottom: 20rpx;
}

.user-header {
  display: flex;
  align-items: center;
  gap: 20rpx;
}

.user-avatar {
  width: 120rpx;
  height: 120rpx;
  border-radius: 60rpx;
  border: 4rpx solid rgba(255, 255, 255, 0.3);
  flex-shrink: 0;
}

.user-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10rpx;
}

.user-name {
  font-size: 36rpx;
  font-weight: 600;
  color: #fff;
}

.user-phone {
  font-size: 26rpx;
  color: rgba(255, 255, 255, 0.8);
}

.edit-icon {
  display: flex;
  align-items: center;
  gap: 5rpx;
  padding: 10rpx 20rpx;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 20rpx;
  flex-shrink: 0;
}

.edit-text {
  font-size: 24rpx;
  color: #3cc51f;
}

.stats-card {
  background-color: #fff;
  padding: 30rpx;
  margin-bottom: 20rpx;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.stats-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10rpx;
}

.stats-number {
  font-size: 40rpx;
  font-weight: 600;
  color: #3cc51f;
}

.stats-label {
  font-size: 24rpx;
  color: #999;
}

.stats-divider {
  width: 1rpx;
  height: 60rpx;
  background-color: #f0f0f0;
}

.menu-card {
  background-color: #fff;
  margin-bottom: 20rpx;
}

.menu-icon {
  width: 44rpx;
  height: 44rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logout-wrapper {
  padding: 0 30rpx;
  margin-top: 40rpx;
}

.logout-btn {
  width: 100%;
  height: 80rpx;
  background-color: #fff;
  color: #ff5a5f;
  font-size: 28rpx;
  border-radius: 40rpx;
  border: 1rpx solid #ff5a5f;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logout-btn::after {
  border: none;
}
</style>
