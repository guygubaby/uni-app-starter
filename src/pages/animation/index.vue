<template>
  <div class="flex flex-col items-center">
    <CuCustom bg-color="bg-gradual-blue" class="w-full">
      <template #content>
        <text>
          Animation
        </text>
      </template>
    </CuCustom>

    <view :animation="frame" class="w-200px h-200px mt bg-gradient-to-r from-purple-500 to-sky-500 rounded-2xl" />

    <van-button class="mt" @click="animate">
      animate
    </van-button>
  </div>
</template>

<script lang="ts" setup>
const frame = shallowRef({})

const animation = uni.createAnimation({
  duration: 1000,
  timingFunction: 'ease',
  delay: 0,
  transformOrigin: '50% 50%',
})

const animate = () => {
  const tx = Math.random() * 200
  const ty = Math.random() * 200

  animation.translate(tx, ty).step()
  frame.value = animation.export()
}
</script>
