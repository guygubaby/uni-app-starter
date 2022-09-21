const TOKENKEY = 'app-note-token'

export function getToken() {
  return uni.getStorageSync(TOKENKEY)
}

export function setToken(token: string) {
  uni.setStorageSync(TOKENKEY, token)
}

export function removeToken() {
  uni.removeStorageSync(TOKENKEY)
}
