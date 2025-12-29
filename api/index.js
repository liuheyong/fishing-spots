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
  }
}

export default {
  spotApi
}
