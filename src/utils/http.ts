type Methods = UniApp.RequestOptions['method']
type ParamType = UniApp.RequestOptions['data']
// type ResType = UniApp.RequestSuccessCallbackResult['data']
interface ResType {
  [key: string]: any
}

declare global {
  interface HttpResponse<T extends ResType> {
    data: T
    code: number
  }
}

const TIME_OUT = 10 * 1000

const request = <T extends ResType>(url: string, data?: ParamType, method: Methods = 'GET'): Promise<HttpResponse<T>> => {
  return new Promise((resolve, reject) => {
    uni.request({
      url,
      data,
      method,
      header: {
        'Content-Type': 'application/json',
      },
      dataType: 'json',
      timeout: TIME_OUT,
      success: (res) => {
        const { statusCode: code, data } = res
        return resolve({
          code,
          data: data as any,
        })
      },
      fail: (error) => {
        return reject(error)
      },
    })
  })
}

export const http = {
  get<T extends ResType>(url: string, params?: ParamType) {
    return request<T>(url, params, 'GET')
  },
  post<T extends ResType>(url: string, params?: ParamType) {
    return request<T>(url, params, 'POST')
  },
}
