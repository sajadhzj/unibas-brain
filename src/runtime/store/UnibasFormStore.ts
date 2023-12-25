import {defineStore} from "pinia";

export const UnibasFormStore: any = defineStore('UnibasFormStore', {
  actions: {
    create(key: string): void {
      this[key] = {}
      this[key + 'Error'] = {}
    },
    initError(key:string , value:any):void {
      this[key + 'Error'] = value
    },
    remove(key: string): void {
      delete this[key]
    }
  }
})
