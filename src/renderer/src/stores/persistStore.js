import { defineStore } from 'pinia'
export const usePersistStore = defineStore('persistStore', {
  state: () => ({
    token: ''
  }),
  actions: {
    logout() {
      this.token = null
    }
  },
  persist: true
})
