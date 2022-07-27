import { defineStore } from 'pinia'

export interface IUserStoreState {
  loggedIn: boolean
  counter: number
}

export const useUserStore = defineStore('user', {
  state: (): IUserStoreState => ({
    loggedIn: false,
    counter: 0,
  }),
  actions: {
    inc() {
      this.counter++
    },
  },
  getters: {
    doubled(): number {
      return this.counter * 2
    },
  },
})
