import type { BannerItem, CategoryTopItem } from '@/types/category'
import { http } from '@/utils/http'

///home/banner
export const getHomeBannerAPI = (distributionSite = 2) => {
  return http<BannerItem[]>({
    method: 'GET',
    url: '/home/banner',
    data: {
      distributionSite,
    },
  })
}
export const getCategoryTopAPI = () => {
  return http<CategoryTopItem[]>({
    method: 'GET',
    url: '/category/top',
  })
}
