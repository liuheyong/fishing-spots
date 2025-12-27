<template>
  <view class="container">
    <!-- 图片轮播 -->
    <view class="swiper-wrapper">
      <swiper 
        class="swiper" 
        :indicator-dots="images.length > 1" 
        :autoplay="true" 
        :interval="3000"
        :circular="true"
      >
        <swiper-item v-for="(image, index) in images" :key="index">
          <image 
            :src="image" 
            class="swiper-image" 
            mode="aspectFill"
            @click="previewImage(index)"
          ></image>
        </swiper-item>
      </swiper>
    </view>

    <!-- 基本信息 -->
    <view class="info-card">
      <view class="spot-title">{{ spotInfo.name }}</view>
      <view class="spot-meta">
        <view class="meta-item">
          <uni-tag 
            :text="spotInfo.type === 'wild' ? '野河' : '黑坑'" 
            :type="spotInfo.type === 'wild' ? 'success' : 'primary'"
          ></uni-tag>
        </view>
        <view class="meta-item">
          <uni-icons type="calendar" size="16" color="#999"></uni-icons>
          <text class="meta-text">{{ formatDate(spotInfo.createTime) }}</text>
        </view>
      </view>
    </view>

    <!-- 详细信息 -->
    <view class="detail-card">
      <view class="card-title">
        <uni-icons type="info" size="18" color="#3cc51f"></uni-icons>
        <text class="title-text">详细信息</text>
      </view>
      <view class="detail-item">
        <text class="detail-label">钓点名称</text>
        <text class="detail-value">{{ spotInfo.name }}</text>
      </view>
      <view class="detail-item">
        <text class="detail-label">钓点类型</text>
        <text class="detail-value">{{ spotInfo.type === 'wild' ? '野河' : '黑坑' }}</text>
      </view>
      <view class="detail-item">
        <text class="detail-label">创建时间</text>
        <text class="detail-value">{{ formatDateTime(spotInfo.createTime) }}</text>
      </view>
      <view class="detail-item">
        <text class="detail-label">地理位置</text>
        <text class="detail-value">{{ spotInfo.location || '暂未标记' }}</text>
      </view>
      <view class="detail-item">
        <text class="detail-label">联系电话</text>
        <text class="detail-value">{{ spotInfo.phone || '暂无' }}</text>
      </view>
    </view>

    <!-- 钓点描述 -->
    <view class="detail-card" v-if="spotInfo.description">
      <view class="card-title">
        <uni-icons type="compose" size="18" color="#3cc51f"></uni-icons>
        <text class="title-text">钓点描述</text>
      </view>
      <view class="description-text">
        {{ spotInfo.description }}
      </view>
    </view>

    <!-- 操作按钮 -->
    <view class="action-bar">
      <button class="action-btn edit-btn" @click="handleEdit">
        <uni-icons type="compose" size="20" color="#fff"></uni-icons>
        <text class="btn-text">编辑</text>
      </button>
      <button class="action-btn delete-btn" @click="handleDelete">
        <uni-icons type="trash" size="20" color="#fff"></uni-icons>
        <text class="btn-text">删除</text>
      </button>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

// 响应式数据
const spotId = ref('') // 钓点ID
const spotInfo = ref({}) // 钓点信息
const images = ref([]) // 钓点图片列表

// 页面加载时
onLoad((options) => {
  if (options.id) {
    spotId.value = options.id
    loadSpotDetail()
  } else {
    uni.showToast({
      title: '参数错误',
      icon: 'none'
    })
    setTimeout(() => {
      uni.navigateBack()
    }, 1500)
  }
})

/**
 * 加载钓点详情
 */
const loadSpotDetail = async () => {
  uni.showLoading({
    title: '加载中...'
  })

  try {
    // 模拟API请求 - 实际项目中替换为真实API
    const response = await mockGetSpotDetail(spotId.value)

    if (response.success) {
      spotInfo.value = response.data
      // 处理图片列表
      if (response.data.images && response.data.images.length > 0) {
        images.value = response.data.images
      } else if (response.data.imageUrl) {
        images.value = [response.data.imageUrl]
      } else {
        images.value = ['/static/default-spot.png']
      }
    } else {
      uni.showToast({
        title: response.message || '加载失败',
        icon: 'none'
      })
    }
  } catch (error) {
    console.error('加载钓点详情失败:', error)
    uni.showToast({
      title: '网络错误',
      icon: 'none'
    })
  } finally {
    uni.hideLoading()
  }
}

/**
 * 预览图片
 */
const previewImage = (index) => {
  uni.previewImage({
    urls: images.value,
    current: index
  })
}

/**
 * 编辑钓点
 */
const handleEdit = () => {
  uni.navigateTo({
    url: `/pages/addSpot/addSpot?id=${spotId.value}`
  })
}

/**
 * 删除钓点
 */
const handleDelete = () => {
  uni.showModal({
    title: '提示',
    content: '确定要删除这个钓点吗？',
    success: async (res) => {
      if (res.confirm) {
        try {
          // 模拟API请求 - 实际项目中替换为真实API
          const response = await mockDeleteSpot(spotId.value)

          if (response.success) {
            uni.showToast({
              title: '删除成功',
              icon: 'success'
            })
            setTimeout(() => {
              uni.navigateBack()
            }, 1500)
          } else {
            uni.showToast({
              title: response.message || '删除失败',
              icon: 'none'
            })
          }
        } catch (error) {
          console.error('删除钓点失败:', error)
          uni.showToast({
            title: '网络错误',
            icon: 'none'
          })
        }
      }
    }
  })
}

/**
 * 格式化日期（简单格式）
 */
const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

/**
 * 格式化日期时间（完整格式）
 */
const formatDateTime = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${year}-${month}-${day} ${hours}:${minutes}`
}

/**
 * 模拟API请求 - 获取钓点详情
 */
const mockGetSpotDetail = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: {
          id: id,
          name: `钓点${id}`,
          type: parseInt(id) % 2 === 0 ? 'wild' : 'black',
          imageUrl: 'https://via.placeholder.com/600x400',
          images: [
            'https://via.placeholder.com/600x400/3cc51f',
            'https://via.placeholder.com/600x400/2fb015',
            'https://via.placeholder.com/600x400/1a8a0f'
          ],
          location: '北京市朝阳区某某湖',
          phone: '13800138000',
          description: '这是一个不错的钓点，水质清澈，鱼类丰富，适合休闲垂钓。周边环境优美，交通便利，是周末休闲的好去处。',
          createTime: new Date().toISOString()
        }
      })
    }, 500)
  })
}

/**
 * 模拟API请求 - 删除钓点
 */
const mockDeleteSpot = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: '删除成功'
      })
    }, 500)
  })
}
</script>

<style scoped>
.container {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 120rpx;
}

.swiper-wrapper {
  width: 100%;
  height: 500rpx;
  background-color: #000;
}

.swiper {
  width: 100%;
  height: 100%;
}

.swiper-image {
  width: 100%;
  height: 100%;
}

.info-card {
  background-color: #fff;
  padding: 30rpx;
  margin-bottom: 20rpx;
}

.spot-title {
  font-size: 36rpx;
  font-weight: 600;
  color: #333;
  margin-bottom: 20rpx;
}

.spot-meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 20rpx;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 8rpx;
}

.meta-text {
  font-size: 24rpx;
  color: #999;
}

.detail-card {
  background-color: #fff;
  padding: 30rpx;
  margin-bottom: 20rpx;
}

.card-title {
  display: flex;
  align-items: center;
  gap: 10rpx;
  margin-bottom: 25rpx;
  padding-bottom: 15rpx;
  border-bottom: 1rpx solid #f0f0f0;
}

.title-text {
  font-size: 30rpx;
  font-weight: 600;
  color: #333;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx 0;
  border-bottom: 1rpx solid #f5f5f5;
}

.detail-item:last-child {
  border-bottom: none;
}

.detail-label {
  font-size: 28rpx;
  color: #666;
  flex-shrink: 0;
}

.detail-value {
  font-size: 28rpx;
  color: #333;
  text-align: right;
  flex: 1;
  margin-left: 20rpx;
}

.description-text {
  font-size: 28rpx;
  color: #666;
  line-height: 1.8;
  text-align: justify;
}

.action-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  background-color: #fff;
  padding: 20rpx;
  box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);
  gap: 20rpx;
}

.action-btn {
  flex: 1;
  height: 80rpx;
  border-radius: 40rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10rpx;
  font-size: 28rpx;
  border: none;
}

.edit-btn {
  background: linear-gradient(135deg, #3cc51f 0%, #2fb015 100%);
  color: #fff;
}

.delete-btn {
  background: linear-gradient(135deg, #ff5a5f 0%, #e74c3c 100%);
  color: #fff;
}

.btn-text {
  font-size: 28rpx;
  font-weight: 500;
}
</style>
