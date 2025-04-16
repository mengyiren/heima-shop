export type CartParams = {
  skuId: string
  count: number
}

export type CartItem = {
  skuId: string
  name: string
  attrsText: string
  picture: string
  price: string
  nowPrice: number
  selected: boolean
  stock: number
  count: number
  discount: string
  isCollect: boolean
  isEffective: boolean
  //SPUID
  id: string
}
