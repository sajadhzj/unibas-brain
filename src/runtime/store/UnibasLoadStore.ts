import {defineStore} from "pinia";

export const UnibasLoadStore: any = defineStore('UnibasLoadStore', {
  actions: {
    add(key: string): void {
      this[key] = true
    },
    remove(key: string): void {
      delete this[key]
    }
  }
})
