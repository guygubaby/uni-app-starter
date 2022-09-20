<template>
  <div class="flex flex-col items-center">
    <CustomNav bg-color="bg-gradual-purple">
      <template #content>
        <text>
          Animation
        </text>
      </template>
    </CustomNav>

    <view :animation="frame" class="w-200px h-200px mt bg-gradient-to-r from-purple-500 to-sky-500 rounded-2xl" />

    <van-button class="mt" @click="animate">
      animate
    </van-button>
  </div>
</template>

<script lang="ts" setup>
import CustomNav from '~/components/CustomNav.vue'

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
