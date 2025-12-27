<template>
  <view class="container">
    <!-- 图片上传区域 -->
    <view class="form-section">
      <view class="section-title">
        <text>钓点图片</text>
        <text class="subtitle">（最多上传9张）</text>
      </view>
      <view class="image-upload">
        <view 
          v-for="(image, index) in formData.images" 
          :key="index" 
          class="image-item"
        >
          <image 
            :src="image" 
            class="preview-image"
            mode="aspectFill"
            @click="previewImage(index)"
          ></image>
          <view class="delete-icon" @click="deleteImage(index)">
            <uni-icons type="closeempty" size="16" color="#fff"></uni-icons>
          </view>
        </view>
        
        <!-- 上传按钮 -->
        <view 
          v-if="formData.images.length < 9" 
          class="upload-btn"
          @click="chooseImage"
        >
          <uni-icons type="camera" size="40" color="#999"></uni-icons>
          <text class="upload-text">上传图片</text>
        </view>
      </view>
    </view>

    <!-- 钓点名称 -->
    <view class="form-section">
      <view class="section-title">
        <text>钓点名称</text>
        <text class="required">*</text>
      </view>
      <view class="input-wrapper">
        <input 
          v-model="formData.name" 
          class="form-input"
          placeholder="请输入钓点名称"
          maxlength="50"
          @blur="validateName"
        />
      </view>
      <view v-if="errors.name" class="error-text">{{ errors.name }}</view>
    </view>

    <!-- 钓点类型 -->
    <view class="form-section">
      <view class="section-title">
        <text>钓点类型</text>
        <text class="required">*</text>
      </view>
      <view class="radio-group">
        <label class="radio-item" @click="formData.type = 'wild'">
          <view class="radio-wrapper">
            <view :class="['radio', formData.type === 'wild' ? 'radio-checked' : '']">
              <view v-if="formData.type === 'wild'" class="radio-dot"></view>
            </view>
            <text class="radio-label">野河</text>
          </view>
        </label>
        <label class="radio-item" @click="formData.type = 'black'">
          <view class="radio-wrapper">
            <view :class="['radio', formData.type === 'black' ? 'radio-checked' : '']">
              <view v-if="formData.type === 'black'" class="radio-dot"></view>
            </view>
            <text class="radio-label">黑坑</text>
          </view>
        </label>
      </view>
      <view v-if="errors.type" class="error-text">{{ errors.type }}</view>
    </view>

    <!-- 地理位置 -->
    <view class="form-section">
      <view class="section-title">地理位置</view>
      <view class="location-wrapper">
        <input 
          v-model="formData.location" 
          class="form-input"
          placeholder="请输入地理位置"
          disabled
        />
        <view class="location-btn" @click="chooseLocation">
          <uni-icons type="location" size="20" color="#3cc51f"></uni-icons>
          <text class="location-text">选择位置</text>
        </view>
      </view>
    </view>

    <!-- 联系电话 -->
    <view class="form-section">
      <view class="section-title">联系电话</view>
      <view class="input-wrapper">
        <input 
          v-model="formData.phone" 
          class="form-input"
          placeholder="请输入联系电话（选填）"
          type="number"
          maxlength="11"
        />
      </view>
    </view>

    <!-- 钓点描述 -->
    <view class="form-section">
      <view class="section-title">钓点描述</view>
      <view class="textarea-wrapper">
        <textarea 
          v-model="formData.description" 
          class="form-textarea"
          placeholder="描述一下这个钓点的特色..."
          maxlength="500"
          :show-confirm-bar="false"
        ></textarea>
        <view class="textarea-counter">{{ formData.description.length }}/500</view>
      </view>
    </view>

    <!-- 提交按钮 -->
    <view class="button-wrapper">
      <button class="submit-btn" @click="handleSubmit" :disabled="submitting">
        {{ submitting ? '提交中...' : (spotId ? '保存' : '提交') }}
      </button>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

// 钓点ID（编辑模式）
const spotId = ref('')

// 表单数据
const formData = reactive({
  images: [],
  name: '',
  type: 'wild',
  location: '',
  phone: '',
  description: ''
})

// 错误信息
const errors = reactive({
  name: '',
  type: ''
})

// 提交状态
const submitting = ref(false)

// 页面加载时
onLoad((options) => {
  if (options.id) {
    // 编辑模式
    spotId.value = options.id
    uni.setNavigationBarTitle({
      title: '编辑钓点'
    })
    loadSpotDetail()
  } else {
    // 新增模式
    uni.setNavigationBarTitle({
      title: '新增钓点'
    })
  }
})

/**
 * 加载钓点详情（编辑模式）
 */
const loadSpotDetail = async () => {
  uni.showLoading({
    title: '加载中...'
  })

  try {
    // 模拟API请求 - 实际项目中替换为真实API
    const response = await mockGetSpotDetail(spotId.value)

    if (response.success) {
      const data = response.data
      formData.images = data.images || []
      formData.name = data.name
      formData.type = data.type
      formData.location = data.location || ''
      formData.phone = data.phone || ''
      formData.description = data.description || ''
    } else {
      uni.showToast({
        title: response.message || '加载失败',
        icon: 'none'
      })
    }
  } catch (error) {
    console.error('加载钓点详情失败:', error)
  } finally {
    uni.hideLoading()
  }
}

/**
 * 选择图片
 */
const chooseImage = () => {
  const remainCount = 9 - formData.images.length
  
  uni.chooseImage({
    count: remainCount,
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    success: (res) => {
      const tempFilePaths = res.tempFilePaths
      
      // 显示上传进度
      uni.showLoading({
        title: '上传中...'
      })

      // 模拟上传 - 实际项目中替换为真实上传
      setTimeout(() => {
        formData.images.push(...tempFilePaths)
        uni.hideLoading()
        uni.showToast({
          title: '图片上传成功',
          icon: 'success'
        })
      }, 1000)

      // 实际上传代码示例：
      // tempFilePaths.forEach((filePath) => {
      //   uni.uploadFile({
      //     url: 'your-upload-api',
      //     filePath: filePath,
      //     name: 'image',
      //     success: (uploadRes) => {
      //       const data = JSON.parse(uploadRes.data)
      //       if (data.success) {
      //         formData.images.push(data.url)
      //       }
      //     }
      //   })
      // })
    }
  })
}

/**
 * 预览图片
 */
const previewImage = (index) => {
  uni.previewImage({
    urls: formData.images,
    current: index
  })
}

/**
 * 删除图片
 */
const deleteImage = (index) => {
  uni.showModal({
    title: '提示',
    content: '确定要删除这张图片吗？',
    success: (res) => {
      if (res.confirm) {
        formData.images.splice(index, 1)
      }
    }
  })
}

/**
 * 选择位置
 */
const chooseLocation = () => {
  uni.chooseLocation({
    success: (res) => {
      formData.location = res.address || res.name
    },
    fail: (err) => {
      console.error('选择位置失败:', err)
      uni.showToast({
        title: '获取位置失败',
        icon: 'none'
      })
    }
  })
}

/**
 * 验证钓点名称
 */
const validateName = () => {
  if (!formData.name.trim()) {
    errors.name = '钓点名称不能为空'
    return false
  }
  if (formData.name.length < 2) {
    errors.name = '钓点名称至少2个字符'
    return false
  }
  errors.name = ''
  return true
}

/**
 * 验证钓点类型
 */
const validateType = () => {
  if (!formData.type) {
    errors.type = '请选择钓点类型'
    return false
  }
  errors.type = ''
  return true
}

/**
 * 验证表单
 */
const validateForm = () => {
  const isNameValid = validateName()
  const isTypeValid = validateType()
  
  return isNameValid && isTypeValid
}

/**
 * 提交表单
 */
const handleSubmit = async () => {
  // 验证表单
  if (!validateForm()) {
    uni.showToast({
      title: '请检查表单信息',
      icon: 'none'
    })
    return
  }

  // 验证图片
  if (formData.images.length === 0) {
    uni.showToast({
      title: '请至少上传一张图片',
      icon: 'none'
    })
    return
  }

  submitting.value = true

  try {
    // 模拟API请求 - 实际项目中替换为真实API
    const response = spotId.value 
      ? await mockUpdateSpot(spotId.value, formData)
      : await mockAddSpot(formData)

    if (response.success) {
      uni.showToast({
        title: spotId.value ? '保存成功' : '添加成功',
        icon: 'success'
      })

      // 延迟返回上一页
      setTimeout(() => {
        uni.navigateBack()
      }, 1500)
    } else {
      uni.showToast({
        title: response.message || '操作失败',
        icon: 'none'
      })
    }
  } catch (error) {
    console.error('提交失败:', error)
    uni.showToast({
      title: '网络错误',
      icon: 'none'
    })
  } finally {
    submitting.value = false
  }
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
          type: 'wild',
          images: [
            'https://via.placeholder.com/600x400',
            'https://via.placeholder.com/600x400'
          ],
          location: '北京市朝阳区某某湖',
          phone: '13800138000',
          description: '这是一个不错的钓点'
        }
      })
    }, 500)
  })
}

/**
 * 模拟API请求 - 添加钓点
 */
const mockAddSpot = (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('添加钓点:', data)
      resolve({
        success: true,
        message: '添加成功'
      })
    }, 1000)
  })
}

/**
 * 模拟API请求 - 更新钓点
 */
const mockUpdateSpot = (id, data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('更新钓点:', id, data)
      resolve({
        success: true,
        message: '保存成功'
      })
    }, 1000)
  })
}
</script>

<style scoped>
.container {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 30rpx;
}

.form-section {
  background-color: #fff;
  padding: 30rpx;
  margin-bottom: 20rpx;
}

.section-title {
  font-size: 28rpx;
  color: #333;
  font-weight: 600;
  margin-bottom: 20rpx;
}

.subtitle {
  font-size: 24rpx;
  color: #999;
  font-weight: normal;
  margin-left: 10rpx;
}

.required {
  color: #ff5a5f;
  margin-left: 5rpx;
}

.image-upload {
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;
}

.image-item {
  position: relative;
  width: 200rpx;
  height: 200rpx;
}

.preview-image {
  width: 100%;
  height: 100%;
  border-radius: 8rpx;
}

.delete-icon {
  position: absolute;
  top: -10rpx;
  right: -10rpx;
  width: 40rpx;
  height: 40rpx;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.upload-btn {
  width: 200rpx;
  height: 200rpx;
  border: 2rpx dashed #ddd;
  border-radius: 8rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10rpx;
}

.upload-text {
  font-size: 24rpx;
  color: #999;
}

.input-wrapper {
  background-color: #f5f5f5;
  border-radius: 8rpx;
  overflow: hidden;
}

.form-input {
  width: 100%;
  height: 80rpx;
  padding: 0 20rpx;
  font-size: 28rpx;
  color: #333;
  background-color: transparent;
}

.error-text {
  font-size: 24rpx;
  color: #ff5a5f;
  margin-top: 10rpx;
}

.radio-group {
  display: flex;
  gap: 60rpx;
}

.radio-item {
  flex: 1;
}

.radio-wrapper {
  display: flex;
  align-items: center;
  gap: 15rpx;
  padding: 15rpx 0;
}

.radio {
  width: 36rpx;
  height: 36rpx;
  border: 2rpx solid #ddd;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
}

.radio-checked {
  border-color: #3cc51f;
}

.radio-dot {
  width: 20rpx;
  height: 20rpx;
  background-color: #3cc51f;
  border-radius: 50%;
}

.radio-label {
  font-size: 28rpx;
  color: #333;
}

.location-wrapper {
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 8rpx;
  overflow: hidden;
}

.location-wrapper .form-input {
  flex: 1;
}

.location-btn {
  display: flex;
  align-items: center;
  gap: 5rpx;
  padding: 0 20rpx;
  flex-shrink: 0;
}

.location-text {
  font-size: 24rpx;
  color: #3cc51f;
}

.textarea-wrapper {
  position: relative;
  background-color: #f5f5f5;
  border-radius: 8rpx;
  overflow: hidden;
}

.form-textarea {
  width: 100%;
  min-height: 200rpx;
  padding: 20rpx;
  font-size: 28rpx;
  color: #333;
  background-color: transparent;
  box-sizing: border-box;
}

.textarea-counter {
  position: absolute;
  right: 20rpx;
  bottom: 15rpx;
  font-size: 24rpx;
  color: #999;
}

.button-wrapper {
  padding: 40rpx 30rpx;
}

.submit-btn {
  width: 100%;
  height: 80rpx;
  background: linear-gradient(135deg, #3cc51f 0%, #2fb015 100%);
  color: #fff;
  font-size: 32rpx;
  font-weight: 600;
  border-radius: 40rpx;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

.submit-btn:disabled {
  opacity: 0.6;
}

.submit-btn::after {
  border: none;
}
</style>
