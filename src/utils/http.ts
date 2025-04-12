import { useMemberStore } from '@/stores'
import { h } from 'vue'

//请求基地址)
const baseUrl = 'https://pcapi-xiaotuxian-front-devtest.itheima.net'

//拦截器配置

const httpInterceptor = {
  invoke(options: UniApp.RequestOptions) {
    //1. 非 http 开头需拼接地址
    if (!options.url.startsWith('http')) {
      options.url = baseUrl + options.url
    }
    //请求超时时间
    options.timeout = 10000
    // 3. 添加小程序端请求头标识
    options.header = {
      ...options.header,
      'source-client': 'miniapp',
    }
    // 4. 添加 token 请求头标识
    const memberStore = useMemberStore()
    const token = memberStore.profile?.token
    if (token) {
      options.header.Authorization = token
    }
  },
}

uni.addInterceptor('request', httpInterceptor)
uni.addInterceptor('uploadFile', httpInterceptor)
