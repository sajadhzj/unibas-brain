import {defineNuxtModule, createResolver, installModule, addImports, addImportsDir} from '@nuxt/kit'
import {defu} from 'defu'

// Module options TypeScript interface definition
export interface ModuleOptions {
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'unibas-brain',
    configKey: 'unibas'
  },
  // Default configuration options of the Nuxt module
  defaults: {},

  async setup(options, nuxt: any) {
    //@ts-ignore
    const resolver = createResolver(import.meta.url)
    const handleUndefined = (config , value)=>{
      if (typeof config === 'undefined')
        return value

      return config
    }

    nuxt.options.app.head.title = handleUndefined(nuxt.options.unibasBrain?.seo?.title , 'UNIBAS')
    nuxt.options.app.head.meta = [
      {
        hid: 'description',
        name: 'description',
        content: handleUndefined(nuxt.options.unibasBrain?.seo?.description , 'unibas brain module')
      }
    ]
    nuxt.options.runtimeConfig.public.unibasBrain = defu(nuxt.options.runtimeConfig.public.unibasBrain,
      {
        baseURL:nuxt.options.unibasBrain?.baseURL,
        seo:{
          suffix:nuxt.options.unibasBrain?.seo?.suffix,
          title:nuxt.options.unibasBrain?.seo?.title,
          description:nuxt.options.unibasBrain?.seo?.description,
          image:nuxt.options.unibasBrain?.seo?.image,
          separate:nuxt.options.unibasBrain?.seo?.separate,
        },
        auth:{
          endpoints:{
            userInfo:nuxt.options.unibasBrain?.auth?.endpoints?.userInfo,
          },
          redirect:{
            login:nuxt.options.unibasBrain?.auth?.redirect?.login,
            logout:nuxt.options.unibasBrain?.auth?.redirect?.logout,
          }
        }
      })

    nuxt.hook('nitro:config' , async (nitro) => {
      nitro.publicAssets.push({
        dir:resolver.resolve('./runtime/public')
      })
    })

    addImportsDir(resolver.resolve('runtime/composable/useUnibasHelper'))

    addImports({
      name: 'useUnibasHelper',
      as: 'useUnibasHelper',
      from: resolver.resolve('runtime/store/AuthStore')
    })

    await installModule('@pinia/nuxt', {
      autoImports: ["defineStore", ["defineStore", "definePiniaStore"]],
    })
  }
})
