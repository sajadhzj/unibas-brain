import {defineStore} from "pinia";
import {navigateTo, useCookie, useRuntimeConfig} from "nuxt/app";
import useUnibasFetch from "../composables/useUnibasFetch";
import {unibasHelper} from "../composables/useUnibasHelper";

export const UnibasAuthStore: any = defineStore('UnibasAuthStore', {
  state: () => ({
    user: {},
    loaded: false,
    isLogin: false
  }),
  getters: {
    token(): string | null {
      let token: any = useCookie('ua-token')

      if (typeof token.value === "undefined")
        return null


      if (token.value !== null)
        token = `Bearer ${token.value}`

      return token
    },
  },
  actions: {
    logout() {
      const config: any = useRuntimeConfig()
      const token: any = useCookie('ua-token')
      token.value = null
      this.isLogin = false

      return navigateTo(unibasHelper.handler.empty(config.public.unibasBrain.auth.redirect.logout , '/login'))
    },
    getUser() {
      const config: any = useRuntimeConfig()
      useUnibasFetch(config.public.unibasBrain.auth.endpoints.userInfo)
        .then((data: any) => (this.user = data.data))
        .finally(() => (this.loaded = true))
    },
    setToken(token: string): void {
      const config: any = useRuntimeConfig()
      const decode = this.parseToken(token)
      const cookieToken = useCookie('ua-token', {
        expires: new Date(Math.floor(decode.exp * 1000))
      })
      cookieToken.value = token

      navigateTo(unibasHelper.handler.empty(config.public.unibasBrain.auth.redirect.login , '/dashboard'))
    },
    parseToken(token: string): any {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      return JSON.parse(jsonPayload);
    },
  }
})
