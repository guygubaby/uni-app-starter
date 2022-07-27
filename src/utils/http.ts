type Methods = UniApp.RequestOptions['method']
type ParamType = UniApp.RequestOptions['data']
type ResType = UniApp.RequestSuccessCallbackResult['data']

declare global {
  interface HttpResponse<T extends ResType> {
    data: T
    code: number
  }
}

const request = <T extends ResType>(url: string, data?: ParamType, method: Methods = 'GET'): Promise<HttpResponse<T>> => {
  return new Promise((resolve, reject) => {
    uni.request({
      url,
      data,
      method,
      header: {
        'Content-Type': 'application/json',
      },
      responseType: 'text',
      dataType: 'json',
      timeout: 10 * 1000,
      success: (res) => {
        const { statusCode: code, data } = res
        try {
          const parsedData = JSON.parse(data as string) as T
          return resolve({
            data: parsedData,
            code,
          })
        }
        catch (error) {
          return reject(error)
        }
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
