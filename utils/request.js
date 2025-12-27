/**
 * API请求封装
 */

// 基础配置
const BASE_URL = 'https://your-api-domain.com' // 替换为实际的API地址
const TIMEOUT = 10000 // 请求超时时间

/**
 * 请求拦截器
 * @param {Object} config - 请求配置
 * @returns {Object} 处理后的配置
 */
function requestInterceptor(config) {
  // 添加token
  const token = uni.getStorageSync('token')
  if (token) {
    config.header = {
      ...config.header,
      'Authorization': `Bearer ${token}`
    }
  }

  // 添加公共header
  config.header = {
    ...config.header,
    'Content-Type': 'application/json'
  }

  return config
}

/**
 * 响应拦截器
 * @param {Object} response - 响应数据
 * @returns {Object} 处理后的响应
 */
function responseInterceptor(response) {
  const { statusCode, data } = response

  // HTTP状态码处理
  if (statusCode === 200) {
    // 业务状态码处理
    if (data.code === 200) {
      return {
        success: true,
        data: data.data,
        message: data.message
      }
    } else if (data.code === 401) {
      // token过期，跳转到登录页
      uni.removeStorageSync('token')
      uni.reLaunch({
        url: '/pages/login/login'
      })
      return {
        success: false,
        message: '登录已过期，请重新登录'
      }
    } else {
      return {
        success: false,
        message: data.message || '请求失败'
      }
    }
  } else {
    return {
      success: false,
      message: '网络错误'
    }
  }
}

/**
 * HTTP请求封装
 * @param {Object} options - 请求选项
 * @returns {Promise} Promise对象
 */
function request(options) {
  return new Promise((resolve, reject) => {
    // 请求拦截
    const config = requestInterceptor({
      url: BASE_URL + options.url,
      method: options.method || 'GET',
      data: options.data || {},
      header: options.header || {},
      timeout: options.timeout || TIMEOUT
    })

    // 发起请求
    uni.request({
      ...config,
      success: (response) => {
        // 响应拦截
        const result = responseInterceptor(response)
        resolve(result)
      },
      fail: (error) => {
        console.error('请求失败:', error)
        uni.showToast({
          title: '网络错误',
          icon: 'none'
        })
        reject({
          success: false,
          message: '网络错误'
        })
      }
    })
  })
}

/**
 * GET请求
 * @param {string} url - 请求地址
 * @param {Object} params - 请求参数
 * @returns {Promise} Promise对象
 */
export function get(url, params = {}) {
  // 将参数拼接到URL
  const queryString = Object.keys(params)
    .filter(key => params[key] !== undefined && params[key] !== null)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&')

  const fullUrl = queryString ? `${url}?${queryString}` : url

  return request({
    url: fullUrl,
    method: 'GET'
  })
}

/**
 * POST请求
 * @param {string} url - 请求地址
 * @param {Object} data - 请求数据
 * @returns {Promise} Promise对象
 */
export function post(url, data = {}) {
  return request({
    url,
    method: 'POST',
    data
  })
}

/**
 * PUT请求
 * @param {string} url - 请求地址
 * @param {Object} data - 请求数据
 * @returns {Promise} Promise对象
 */
export function put(url, data = {}) {
  return request({
    url,
    method: 'PUT',
    data
  })
}

/**
 * DELETE请求
 * @param {string} url - 请求地址
 * @param {Object} params - 请求参数
 * @returns {Promise} Promise对象
 */
export function del(url, params = {}) {
  return request({
    url,
    method: 'DELETE',
    data: params
  })
}

/**
 * 文件上传
 * @param {string} url - 上传地址
 * @param {string} filePath - 文件路径
 * @param {Object} formData - 额外的表单数据
 * @returns {Promise} Promise对象
 */
export function uploadFile(url, filePath, formData = {}) {
  return new Promise((resolve, reject) => {
    const token = uni.getStorageSync('token')

    uni.uploadFile({
      url: BASE_URL + url,
      filePath: filePath,
      name: 'file',
      formData: formData,
      header: {
        'Authorization': token ? `Bearer ${token}` : ''
      },
      success: (response) => {
        if (response.statusCode === 200) {
          const data = JSON.parse(response.data)
          if (data.code === 200) {
            resolve({
              success: true,
              data: data.data
            })
          } else {
            resolve({
              success: false,
              message: data.message || '上传失败'
            })
          }
        } else {
          resolve({
            success: false,
            message: '上传失败'
          })
        }
      },
      fail: (error) => {
        console.error('上传失败:', error)
        reject({
          success: false,
          message: '上传失败'
        })
      }
    })
  })
}

export default {
  get,
  post,
  put,
  del,
  uploadFile
}
