<template>
  <view class="flex flex-col items-center">
    <image class="w-200px h-200px" src="/static/logo.png" />

    <text class="my-4">
      {{ counter }}
    </text>

    <button class="mt-4" @click="inc">
      inc
    </button>

    <button class="mt" @click="gotoLifeCycle">
      go to lifecycle page
    </button>

    <h1 class="mt-10">
      Store
    </h1>

    <p class="my">
      {{ userStore.counter }}
    </p>

    <button @click="userStore.inc()">
      inc
    </button>

    <van-button>foo</van-button>

    <van-cell>foo</van-cell>

    <van-image width="100" height="100" src="https://img.yzcdn.cn/vant/cat.jpeg" />
  </view>
</template>

<script setup lang="ts">
let counter = $ref(0)

const inc = () => {
  counter++
}

const gotoLifeCycle = () => {
  uni.navigateTo({
    url: '../lifecycle/index',
    animationType: 'slide-in-top',
  })
}

const userStore = useUserStore()
</script>
