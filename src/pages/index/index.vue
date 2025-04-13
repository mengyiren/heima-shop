<script setup lang="ts">
import { http } from '@/utils/http'
import CustomNavbar from './components/CustomNavbar.vue'
import { getHomeBannerAPI } from '@/services/home'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import type { BannerItem } from '@/types/home'

//
const bannerList = ref<BannerItem[]>([])
const getBannerData = async () => {
  const res = await getHomeBannerAPI()
  bannerList.value = res.result
}

onLoad(() => {
  getBannerData()
})
</script>

<template>
  <CustomNavbar />
  <XtxSwiper :list="bannerList" />
  <view class="index">index</view>
</template>

<style lang="ts" setup>
//
</style>
