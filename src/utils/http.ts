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
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
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

//结果封装
interface Data<T> {
  code: number
  msg: string
  result: T
}

//封装promise请求函数
export const http = <T>(options: UniApp.RequestOptions) => {
  //返回promise对象
  return new Promise<Data<T>>((resolve, reject) => {
    uni.request({
      ...options,
      //请求成功
      success(res) {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          //请求成功
          resolve(res.data as Data<T>)
        } else if (res.statusCode === 401) {
          const memberStore = useMemberStore()
          memberStore.clearProfile()
          uni.navigateTo({ url: '/pages/login/login' })
          reject(res)
        } else {
          uni.showToast({
            icon: 'none',
            title: (res.data as Data<T>).msg || '请求错误',
          })
          reject(res)
        }
      },
      fail(err) {
        uni.showToast({
          icon: 'none',
          title: '网络错误，换个网络试试',
        })
        reject(err)
      },
    })
  })
}
