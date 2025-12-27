/**
 * API接口定义
 */

import { get, post, put, del, uploadFile } from './request.js'

/**
 * 钓点相关API
 */
export const spotApi = {
  /**
   * 获取钓点列表
   * @param {Object} params - 查询参数
   * @param {number} params.page - 页码
   * @param {number} params.pageSize - 每页数量
   * @param {string} params.keyword - 搜索关键词
   * @returns {Promise} Promise对象
   */
  getSpotList(params) {
    return get('/api/spots', params)
  },

  /**
   * 获取钓点详情
   * @param {string|number} id - 钓点ID
   * @returns {Promise} Promise对象
   */
  getSpotDetail(id) {
    return get(`/api/spots/${id}`)
  },

  /**
   * 添加钓点
   * @param {Object} data - 钓点数据
   * @returns {Promise} Promise对象
   */
  addSpot(data) {
    return post('/api/spots', data)
  },

  /**
   * 更新钓点
   * @param {string|number} id - 钓点ID
   * @param {Object} data - 钓点数据
   * @returns {Promise} Promise对象
   */
  updateSpot(id, data) {
    return put(`/api/spots/${id}`, data)
  },

  /**
   * 删除钓点
   * @param {string|number} id - 钓点ID
   * @returns {Promise} Promise对象
   */
  deleteSpot(id) {
    return del(`/api/spots/${id}`)
  },

  /**
   * 上传钓点图片
   * @param {string} filePath - 文件路径
   * @returns {Promise} Promise对象
   */
  uploadSpotImage(filePath) {
    return uploadFile('/api/upload/spot', filePath)
  }
}

/**
 * 用户相关API
 */
export const userApi = {
  /**
   * 获取用户信息
   * @returns {Promise} Promise对象
   */
  getUserInfo() {
    return get('/api/user/info')
  },

  /**
   * 更新用户信息
   * @param {Object} data - 用户数据
   * @returns {Promise} Promise对象
   */
  updateUserInfo(data) {
    return put('/api/user/info', data)
  },

  /**
   * 获取用户统计信息
   * @returns {Promise} Promise对象
   */
  getUserStats() {
    return get('/api/user/stats')
  },

  /**
   * 上传用户头像
   * @param {string} filePath - 文件路径
   * @returns {Promise} Promise对象
   */
  uploadAvatar(filePath) {
    return uploadFile('/api/upload/avatar', filePath)
  },

  /**
   * 用户登录
   * @param {Object} data - 登录数据
   * @param {string} data.phone - 手机号
   * @param {string} data.code - 验证码
   * @returns {Promise} Promise对象
   */
  login(data) {
    return post('/api/user/login', data)
  },

  /**
   * 用户退出登录
   * @returns {Promise} Promise对象
   */
  logout() {
    return post('/api/user/logout')
  },

  /**
   * 获取验证码
   * @param {string} phone - 手机号
   * @returns {Promise} Promise对象
   */
  getVerifyCode(phone) {
    return post('/api/user/verify-code', { phone })
  }
}

/**
 * 收藏相关API
 */
export const favoriteApi = {
  /**
   * 获取收藏列表
   * @param {Object} params - 查询参数
   * @returns {Promise} Promise对象
   */
  getFavoriteList(params) {
    return get('/api/favorites', params)
  },

  /**
   * 添加收藏
   * @param {string|number} spotId - 钓点ID
   * @returns {Promise} Promise对象
   */
  addFavorite(spotId) {
    return post('/api/favorites', { spotId })
  },

  /**
   * 取消收藏
   * @param {string|number} spotId - 钓点ID
   * @returns {Promise} Promise对象
   */
  removeFavorite(spotId) {
    return del(`/api/favorites/${spotId}`)
  }
}

/**
 * 历史记录相关API
 */
export const historyApi = {
  /**
   * 获取历史记录
   * @param {Object} params - 查询参数
   * @returns {Promise} Promise对象
   */
  getHistoryList(params) {
    return get('/api/history', params)
  },

  /**
   * 添加历史记录
   * @param {string|number} spotId - 钓点ID
   * @returns {Promise} Promise对象
   */
  addHistory(spotId) {
    return post('/api/history', { spotId })
  },

  /**
   * 清空历史记录
   * @returns {Promise} Promise对象
   */
  clearHistory() {
    return del('/api/history')
  }
}

export default {
  spotApi,
  userApi,
  favoriteApi,
  historyApi
}
