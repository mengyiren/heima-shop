import type { CartItem, CartParams } from '@/types/cart'
import { http } from '@/utils/http'

export const postMemberCartAPI = (data: CartParams) => {
  return http<CartItem>({
    method: 'POST',
    url: '/member/cart',
    data,
  })
}

export const getMemberCartAPI = () => {
  return http<CartItem[]>({
    method: 'GET',
    url: '/member/cart',
  })
}

export const deleteMemberCartAPI = (data: { ids: string[] }) => {
  return http({
    method: 'DELETE',
    url: '/member/cart',
    data,
  })
}

export const putMemberCartAPI = (skuId: string, data: { selected?: boolean; count?: number }) => {
  return http({
    method: 'PUT',
    url: `/member/cart/${skuId}`,
    data,
  })
}

export const putMemberCartSelectAllAPI = (data: { selected: boolean }) => {
  return http({
    method: 'PUT',
    url: '/member/cart/selected',
    data,
  })
}
