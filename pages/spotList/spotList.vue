<template>
  <view class="container">
    <!-- 搜索栏 -->
    <view class="search-wrapper">
      <uni-search-bar 
        v-model="searchKeyword" 
        placeholder="搜索钓点名称" 
        @confirm="handleSearch"
        @clear="handleClear"
        cancelButton="none"
      ></uni-search-bar>
    </view>

    <!-- 钓点列表 -->
    <view class="list-wrapper">
      <view 
        v-for="item in spotList" 
        :key="item.id" 
        class="list-item"
        @click="goToDetail(item.id)"
      >
        <image 
          :src="item.imageUrl || '/static/default-spot.png'" 
          class="spot-image"
          mode="aspectFill"
        ></image>
        <view class="spot-info">
          <view class="spot-name">{{ item.name }}</view>
          <view class="spot-type">
            <uni-tag 
              :text="item.type === 'wild' ? '野河' : '黑坑'" 
              :type="item.type === 'wild' ? 'success' : 'primary'"
              size="small"
            ></uni-tag>
          </view>
        </view>
      </view>

      <!-- 空状态 -->
      <view v-if="spotList.length === 0 && !loading" class="empty-state">
        <uni-icons type="location" size="80" color="#ccc"></uni-icons>
        <text class="empty-text">暂无钓点数据</text>
      </view>

      <!-- 加载状态 -->
      <view v-if="loading" class="loading-wrapper">
        <uni-icons type="spinner-cycle" size="30" color="#3cc51f"></uni-icons>
        <text class="loading-text">加载中...</text>
      </view>

      <!-- 加载更多提示 -->
      <view v-if="spotList.length > 0 && !hasMore" class="no-more">
        已加载全部数据
      </view>
    </view>

    <!-- 增加标点按钮 -->
    <view class="add-btn" @click="goToAdd">
      <uni-icons type="plusempty" size="28" color="#fff"></uni-icons>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { onLoad, onReachBottom, onPullDownRefresh } from '@dcloudio/uni-app'

// 响应式数据
const searchKeyword = ref('') // 搜索关键词
const spotList = ref([]) // 钓点列表
const currentPage = ref(1) // 当前页码
const pageSize = ref(15) // 每页数量
const totalPages = ref(0) // 总页数
const loading = ref(false) // 加载状态
const hasMore = ref(true) // 是否还有更多数据

// 页面加载时
onLoad(() => {
  loadSpotList()
})

// 页面挂载时
onMounted(() => {
  // 可以在这里执行其他初始化操作
})

/**
 * 加载钓点列表
 */
const loadSpotList = async (isRefresh = false) => {
  if (loading.value) return
  
  // 如果是刷新，重置页码
  if (isRefresh) {
    currentPage.value = 1
    spotList.value = []
    hasMore.value = true
  }

  loading.value = true

  try {
    // 模拟API请求 - 实际项目中替换为真实API
    const response = await mockGetSpotList({
      page: currentPage.value,
      pageSize: pageSize.value,
      keyword: searchKeyword.value
    })

    if (response.success) {
      // 如果是第一页，直接替换数据；否则追加数据
      if (currentPage.value === 1) {
        spotList.value = response.data.list
      } else {
        spotList.value = [...spotList.value, ...response.data.list]
      }

      totalPages.value = response.data.totalPages
      hasMore.value = currentPage.value < totalPages.value

      // 如果还有更多数据，页码+1
      if (hasMore.value) {
        currentPage.value++
      }
    } else {
      uni.showToast({
        title: response.message || '加载失败',
        icon: 'none'
      })
    }
  } catch (error) {
    console.error('加载钓点列表失败:', error)
    uni.showToast({
      title: '网络错误',
      icon: 'none'
    })
  } finally {
    loading.value = false
  }
}

/**
 * 搜索处理
 */
const handleSearch = () => {
  currentPage.value = 1
  loadSpotList(true)
}

/**
 * 清空搜索
 */
const handleClear = () => {
  searchKeyword.value = ''
  currentPage.value = 1
  loadSpotList(true)
}

/**
 * 跳转到钓点详情
 */
const goToDetail = (id) => {
  uni.navigateTo({
    url: `/pages/spotDetail/spotDetail?id=${id}`
  })
}

/**
 * 跳转到新增钓点
 */
const goToAdd = () => {
  uni.navigateTo({
    url: '/pages/addSpot/addSpot'
  })
}

/**
 * 下拉刷新
 */
onPullDownRefresh(() => {
  loadSpotList(true).then(() => {
    uni.stopPullDownRefresh()
  })
})

/**
 * 上拉加载更多
 */
onReachBottom(() => {
  if (hasMore.value && !loading.value) {
    loadSpotList()
  }
})

/**
 * 模拟API请求 - 获取钓点列表
 * 实际项目中应替换为真实的API请求
 */
const mockGetSpotList = ({ page, pageSize, keyword }) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // 模拟数据
      const mockData = []
      const totalCount = 45 // 模拟总数据量

      const startIndex = (page - 1) * pageSize
      const endIndex = Math.min(startIndex + pageSize, totalCount)

      for (let i = startIndex; i < endIndex; i++) {
        mockData.push({
          id: i + 1,
          name: keyword ? `${keyword}相关钓点${i + 1}` : `钓点${i + 1}`,
          imageUrl: 'http://p3.diaoyur.cn/group3/M00/0B/4C/cjd0iVhwYF-xmeuqfNBk9gLpv4atJ.jpeg',
          type: i % 2 === 0 ? 'wild' : 'black',
          createTime: new Date().toISOString()
        })
      }

      // 如果有搜索关键词，过滤数据
      const filteredData = keyword 
        ? mockData.filter(item => item.name.includes(keyword))
        : mockData

      resolve({
        success: true,
        data: {
          list: filteredData,
          totalPages: Math.ceil(totalCount / pageSize),
          currentPage: page
        }
      })
    }, 500)
  })
}
</script>

<style scoped>
.container {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 100rpx;
}

.search-wrapper {
  background-color: #fff;
  padding: 20rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
}

.list-wrapper {
  padding: 20rpx;
}

.list-item {
  display: flex;
  background-color: #fff;
  border-radius: 12rpx;
  overflow: hidden;
  margin-bottom: 20rpx;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.08);
  transition: all 0.3s;
}

.list-item:active {
  transform: scale(0.98);
  opacity: 0.9;
}

.spot-image {
  width: 200rpx;
  height: 150rpx;
  flex-shrink: 0;
}

.spot-info {
  flex: 1;
  padding: 20rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.spot-name {
  font-size: 32rpx;
  font-weight: 600;
  color: #333;
  margin-bottom: 10rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.spot-type {
  display: flex;
  align-items: center;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100rpx 0;
}

.empty-text {
  margin-top: 20rpx;
  font-size: 28rpx;
  color: #999;
}

.loading-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40rpx 0;
}

.loading-text {
  margin-left: 10rpx;
  font-size: 28rpx;
  color: #999;
}

.no-more {
  text-align: center;
  padding: 30rpx 0;
  font-size: 26rpx;
  color: #999;
}

.add-btn {
  position: fixed;
  right: 40rpx;
  bottom: 120rpx;
  width: 100rpx;
  height: 100rpx;
  background: linear-gradient(135deg, #3cc51f 0%, #2fb015 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8rpx 20rpx rgba(60, 197, 31, 0.4);
  z-index: 999;
  transition: all 0.3s;
}

.add-btn:active {
  transform: scale(0.9);
}
</style>
