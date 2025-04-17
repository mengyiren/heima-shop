<template>
  <scroll-view scroll-y class="orders">
    <view class="card" v-for="item in orderList" :key="item.id">
      <!-- 订单信息 -->
      <view class="status">
        <text class="date">{{ item.createTime }}</text>
        <!-- 订单状态文字 -->
        <text>{{ OrderStateList.find((v) => v.id === item.orderState)?.text }}</text>
        <!-- 待评价/已完成/已取消 状态: 展示删除订单 -->
        <text v-if="item.orderState >= OrderState.DaiPingJia" class="icon-delete"></text>
      </view>
      <!-- 商品信息，点击商品跳转到订单详情，不是商品详情 -->
      <navigator
        v-for="sku in item.skus"
        :key="sku.id"
        class="goods"
        :url="`/pagesOrder/detail/detail?id=${item.id}`"
        hover-class="none"
      >
        <view class="cover">
          <image mode="aspectFit" :src="sku.image"></image>
        </view>
        <view class="meta">
          <view class="name ellipsis">{{ sku.name }}</view>
          <view class="type">{{ sku.attrsText }}</view>
        </view>
      </navigator>
      <!-- 支付信息 -->
      <view class="payment">
        <text class="quantity">共{{ item.totalNum }}件商品</text>
        <text>实付</text>
        <text class="amount"> <text class="symbol">¥</text>{{ item.payMoney }}</text>
      </view>
      <!-- 订单操作按钮 -->
      <view class="action">
        <!-- 待付款状态：显示去支付按钮 -->
        <template v-if="item.orderState === OrderState.DaiFuKuan">
          <view class="button primary">去支付</view>
        </template>
        <template v-else>
          <navigator
            class="button secondary"
            :url="`/pagesOrder/create/create?orderId=id`"
            hover-class="none"
          >
            再次购买
          </navigator>
          <!-- 待收货状态: 展示确认收货 -->
          <view v-if="item.orderState === OrderState.DaiShouHuo" class="button primary"
            >确认收货</view
          >
        </template>
      </view>
    </view>
    <!-- 底部提示文字 -->
    <view class="loading-text" :style="{ paddingBottom: safeAreaInsets?.bottom + 'px' }">
      {{ true ? '没有更多数据~' : '正在加载...' }}
    </view>
  </scroll-view>
</template>

<script setup lang="ts">
import { OrderState, OrderStateList } from '@/services/constants'
import { getMemberOrderListAPI } from '@/services/order'
import type { OrderItem } from '@/types/order'
import { skipHydrate } from 'pinia'
import { onMounted, reactive, ref } from 'vue'

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getWindowInfo()

const query = defineProps<{
  orderState: number
}>()

const orderPageParams = reactive({
  page: 1,
  pageSize: 10,
  orderState: query.orderState,
})

const orderList = ref<OrderItem[]>([])
const getOrderData = async () => {
  const res = await getMemberOrderListAPI(orderPageParams)
  orderList.value = res.result.items
}

onMounted(() => {
  getOrderData()
})
</script>

<style scoped></style>
