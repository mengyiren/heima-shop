<script setup lang="ts">
import { useMemberStore } from '@/stores'
import { http } from '@/utils/http'

const memberStore = useMemberStore()

const getData = async () => {
  // 获取用户信息
  const res = await http({
    method: 'GET',
    url: '/home/banner',
    header: {},
  })
  console.log('请求成功', res)
}
</script>

<template>
  <view class="my">
    <view>会员信息：{{ memberStore.profile }}</view>
    <button
      @click="
        memberStore.setProfile({
          nickname: '黑马先锋',
          token: '123456',
        })
      "
      size="mini"
      plain
      type="primary"
    >
      保存用户信息
    </button>
    <button @click="memberStore.clearProfile()" size="mini" plain type="warn">清理用户信息</button>
    <button @click="getData" size="mini" plain type="primary">获取数据</button>
  </view>
</template>

<style lang="scss">
//
</style>
