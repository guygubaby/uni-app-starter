<template>
  <view class="flex flex-col items-center">
    <CuCustom bg-color="bg-gradual-blue" class="w-full">
      <template #content>
        <text>
          Home
        </text>
      </template>
    </CuCustom>

    <!-- <image class="w-200px h-200px mt" src="/static/logo.png" /> -->

    <view class="w-200px h-200px mt bg-gradient-to-r from-purple-500 to-sky-500 rounded-2xl" />

    <text class="my-4">
      {{ counter }}
    </text>

    <van-button class="mt-4" @click="inc">
      inc
    </van-button>

    <van-button class="mt" @click="gotoLifeCycle">
      go to lifecycle page
    </van-button>

    <h1 class="mt-10">
      Store
    </h1>

    <p class="my">
      {{ userStore.counter }}
    </p>

    <van-button @click="userStore.inc()">
      inc
    </van-button>

    <view class="padding flex flex-wrap justify-between align-center bg-white">
      <button class="cu-btn round sm">
        小尺寸
      </button>
      <button class="cu-btn round">
        默认
      </button>
      <button class="cu-btn round lg">
        大尺寸
      </button>
    </view>
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
  })
}

const userStore = useUserStore()
</script>
