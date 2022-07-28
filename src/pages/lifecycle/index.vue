<template>
  <view class="flex flex-col items-center">
    <view class="my">
      lifecycle
    </view>
    <button @click="handleClick">
      click me
    </button>

    <button class="mt" @click="back">
      back
    </button>

    <van-button>foo</van-button>
  </view>
</template>

<script lang="ts" setup>
import { uuid } from '@bryce-loskie/utils'

const back = () => {
  uni.navigateBack()
}

const handleClick = () => {
  uni.showToast({
    title: uuid(),
    icon: 'none',
  })
}

onShow(() => {
  console.log('show', uuid())
})

onUnload(() => {
  console.log('unload')
})
</script>
