/**
 * og:title
 * og:url address for page content
 * og:image image address for content validation => [minSize=200px*200px | maxSize:8mb]
 * og:type type=>[article , website , book , music , video , etc...]
 * og:description => max content 2 paragraph is okay
 * og:local language for content fx fa_IR
 */
import {useSeoMeta} from "@unhead/vue";
import {useRuntimeConfig} from "nuxt/app";

interface headInterface {
  title: string,
  description: string,
  image: string,
  type: 'website' | 'article' | 'book' | 'profile' | 'music.song' | 'music.album' | 'music.playlist' | 'music.radio_status' | 'video.movie' | 'video.episode' | 'video.tv_show' | 'video.other'
}

export default function (object: headInterface) {
  const options: any = useRuntimeConfig()
  const computeValue = (key , value):any => {
    if (typeof object[key] !== 'undefined')
      return object[key]

    return options.public.unibasBrain?.seo[key] === '' ? value : options.public.unibasBrain?.seo[key]
  }
  const suffix: string = options.public.unibasBrain?.seo?.suffix === '' ? 'UNIBAS' : options.public.unibasBrain?.seo?.suffix
  const separate: string = options.public.unibasBrain?.seo?.separate === '' ? '|' : options.public.unibasBrain?.seo?.separate
  const title: string = computeValue('title' , 'UNIBAS')
  const description: string = computeValue('description' , 'UNIBAS')
  const type: any = computeValue('description' , 'website')
  const image = computeValue('image' , '/unibas/images/64.png')

  useSeoMeta({
    title: () => `${title + ` ${separate} ` + suffix}`,
    ogTitle: () => `${title + ` ${separate} ` + suffix}`,
    description: () => `${description}`,
    ogDescription: () => `${description}`,
    ogImage: () => `${image}`,
    ogType: () => type,
  })

}
