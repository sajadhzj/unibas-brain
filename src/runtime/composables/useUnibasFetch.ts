import {useRuntimeConfig} from "nuxt/app";
import {unibasHelper} from "./useUnibasHelper";
import {UnibasAuthStore} from "../store/UnibasAuthStore";
import {UnibasLoadStore} from "../store/UnibasLoadStore";
import {UnibasFormStore} from "../store/UnibasFormStore";

interface optionsInterface {
  method?: "POST" | "PUT" | "GET" | "DELETE",
  body?: object
  query?: object,
  params?: object,
  formKey?: string,
  loadingKey?: string,
}
export default function (url: string , opt:optionsInterface = {}){
  let header = {
    'Accept': 'application/json'
  }
  const options: any = useRuntimeConfig()

  //START set token if login
  const storeAuth = UnibasAuthStore()
  if(storeAuth.token !== null)
    header = {...header , ...{'Authorization':storeAuth.token}}
  //END set token if login

  const unibasStoreLoad = UnibasLoadStore()
  const loadKey: string = typeof opt.loadingKey !== "undefined"
    ? opt.loadingKey
    : url.split('/')[url.split('/').length - 1]

  const unibasStoreForm = UnibasFormStore()
  const formKey: string = typeof opt.formKey !== "undefined"
    ? opt.formKey
    : url.split('/')[url.split('/').length - 1]

  return $fetch(url , {
    ...opt,
    headers:header,
    baseURL: unibasHelper.handler.undefined(options.public.unibasBrain.baseURL , '/'),
    onRequest(): Promise<void> | void {
      unibasStoreLoad.add(loadKey)
    },
    onResponse(): Promise<void> | void {
      unibasStoreLoad.remove(loadKey)
    },
    onResponseError(res): Promise<void> | void {
      switch (res.response.status){
        case 422:
          unibasStoreForm.initError(formKey , res.response._data)
          break
      }
    }
  })

}
