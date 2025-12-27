<template>
  <view class="container">
    <!-- 头像上传 -->
    <view class="form-section">
      <view class="section-title">头像</view>
      <view class="avatar-upload">
        <image 
          :src="formData.avatar || '/static/default-avatar.png'" 
          class="avatar-preview"
          mode="aspectFill"
          @click="chooseAvatar"
        ></image>
        <view class="upload-tip" @click="chooseAvatar">
          <uni-icons type="camera" size="20" color="#999"></uni-icons>
          <text class="tip-text">点击更换头像</text>
        </view>
      </view>
    </view>

    <!-- 昵称输入 -->
    <view class="form-section">
      <view class="section-title">
        <text>昵称</text>
        <text class="required">*</text>
      </view>
      <view class="input-wrapper">
        <input 
          v-model="formData.nickname" 
          class="form-input"
          placeholder="请输入昵称"
          maxlength="20"
          @blur="validateNickname"
        />
      </view>
      <view v-if="errors.nickname" class="error-text">{{ errors.nickname }}</view>
    </view>

    <!-- 手机号输入 -->
    <view class="form-section">
      <view class="section-title">
        <text>手机号</text>
        <text class="required">*</text>
      </view>
      <view class="input-wrapper">
        <input 
          v-model="formData.phone" 
          class="form-input"
          placeholder="请输入手机号"
          type="number"
          maxlength="11"
          @blur="validatePhone"
        />
      </view>
      <view v-if="errors.phone" class="error-text">{{ errors.phone }}</view>
    </view>

    <!-- 性别选择 -->
    <view class="form-section">
      <view class="section-title">性别</view>
      <view class="radio-group">
        <label class="radio-item" @click="formData.gender = 'male'">
          <view class="radio-wrapper">
            <view :class="['radio', formData.gender === 'male' ? 'radio-checked' : '']">
              <view v-if="formData.gender === 'male'" class="radio-dot"></view>
            </view>
            <text class="radio-label">男</text>
          </view>
        </label>
        <label class="radio-item" @click="formData.gender = 'female'">
          <view class="radio-wrapper">
            <view :class="['radio', formData.gender === 'female' ? 'radio-checked' : '']">
              <view v-if="formData.gender === 'female'" class="radio-dot"></view>
            </view>
            <text class="radio-label">女</text>
          </view>
        </label>
      </view>
    </view>

    <!-- 个人简介 -->
    <view class="form-section">
      <view class="section-title">个人简介</view>
      <view class="textarea-wrapper">
        <textarea 
          v-model="formData.bio" 
          class="form-textarea"
          placeholder="介绍一下自己吧..."
          maxlength="200"
          :show-confirm-bar="false"
        ></textarea>
        <view class="textarea-counter">{{ formData.bio.length }}/200</view>
      </view>
    </view>

    <!-- 保存按钮 -->
    <view class="button-wrapper">
      <button class="save-btn" @click="handleSubmit" :disabled="submitting">
        {{ submitting ? '保存中...' : '保存' }}
      </button>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

// 表单数据
const formData = reactive({
  avatar: '',
  nickname: '',
  phone: '',
  gender: 'male',
  bio: ''
})

// 错误信息
const errors = reactive({
  nickname: '',
  phone: ''
})

// 提交状态
const submitting = ref(false)

// 页面加载时
onLoad(() => {
  loadUserInfo()
})

/**
 * 加载用户信息
 */
const loadUserInfo = async () => {
  uni.showLoading({
    title: '加载中...'
  })

  try {
    // 模拟API请求 - 实际项目中替换为真实API
    const response = await mockGetUserInfo()

    if (response.success) {
      Object.assign(formData, response.data)
    } else {
      uni.showToast({
        title: response.message || '加载失败',
        icon: 'none'
      })
    }
  } catch (error) {
    console.error('加载用户信息失败:', error)
  } finally {
    uni.hideLoading()
  }
}

/**
 * 选择头像
 */
const chooseAvatar = () => {
  uni.chooseImage({
    count: 1,
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    success: (res) => {
      const tempFilePath = res.tempFilePaths[0]
      
      // 显示上传进度
      uni.showLoading({
        title: '上传中...'
      })

      // 模拟上传 - 实际项目中替换为真实上传
      setTimeout(() => {
        formData.avatar = tempFilePath
        uni.hideLoading()
        uni.showToast({
          title: '头像上传成功',
          icon: 'success'
        })
      }, 1000)

      // 实际上传代码示例：
      // uni.uploadFile({
      //   url: 'your-upload-api',
      //   filePath: tempFilePath,
      //   name: 'avatar',
      //   success: (uploadRes) => {
      //     const data = JSON.parse(uploadRes.data)
      //     if (data.success) {
      //       formData.avatar = data.url
      //       uni.showToast({
      //         title: '头像上传成功',
      //         icon: 'success'
      //       })
      //     }
      //   },
      //   complete: () => {
      //     uni.hideLoading()
      //   }
      // })
    }
  })
}

/**
 * 验证昵称
 */
const validateNickname = () => {
  if (!formData.nickname.trim()) {
    errors.nickname = '昵称不能为空'
    return false
  }
  if (formData.nickname.length < 2) {
    errors.nickname = '昵称至少2个字符'
    return false
  }
  errors.nickname = ''
  return true
}

/**
 * 验证手机号
 */
const validatePhone = () => {
  const phoneRegex = /^1[3-9]\d{9}$/
  
  if (!formData.phone) {
    errors.phone = '手机号不能为空'
    return false
  }
  if (!phoneRegex.test(formData.phone)) {
    errors.phone = '请输入正确的手机号'
    return false
  }
  errors.phone = ''
  return true
}

/**
 * 验证表单
 */
const validateForm = () => {
  const isNicknameValid = validateNickname()
  const isPhoneValid = validatePhone()
  
  return isNicknameValid && isPhoneValid
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

  submitting.value = true

  try {
    // 模拟API请求 - 实际项目中替换为真实API
    const response = await mockUpdateUserInfo(formData)

    if (response.success) {
      uni.showToast({
        title: '保存成功',
        icon: 'success'
      })

      // 延迟返回上一页
      setTimeout(() => {
        uni.navigateBack()
      }, 1500)
    } else {
      uni.showToast({
        title: response.message || '保存失败',
        icon: 'none'
      })
    }
  } catch (error) {
    console.error('保存用户信息失败:', error)
    uni.showToast({
      title: '网络错误',
      icon: 'none'
    })
  } finally {
    submitting.value = false
  }
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
          phone: '13812345678',
          gender: 'male',
          bio: '热爱钓鱼，享受宁静的时光。'
        }
      })
    }, 500)
  })
}

/**
 * 模拟API请求 - 更新用户信息
 */
const mockUpdateUserInfo = (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('更新用户信息:', data)
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

.required {
  color: #ff5a5f;
  margin-left: 5rpx;
}

.avatar-upload {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20rpx;
  padding: 20rpx 0;
}

.avatar-preview {
  width: 160rpx;
  height: 160rpx;
  border-radius: 80rpx;
  border: 2rpx solid #f0f0f0;
}

.upload-tip {
  display: flex;
  align-items: center;
  gap: 10rpx;
}

.tip-text {
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

.save-btn {
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

.save-btn:disabled {
  opacity: 0.6;
}

.save-btn::after {
  border: none;
}
</style>
