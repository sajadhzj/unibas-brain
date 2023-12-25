export default defineNuxtConfig({
  modules: ['../src/module'],
  unibasBrain:{
    baseURL:process.env.BASE_URL,
    seo:{
      title:'sallam 6'
    },
    auth:{
      redirect:{
        logout:'/'
      },
      endpoints:{
        userInfo:'/user'
      }
    }
  },
  devtools: { enabled: true }
})
