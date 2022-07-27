<template>
  <div class="flex flex-col items-center">
    <image :animation="frame" class="w-120px h-120px" src="/static/logo.png" />

    <button class="mt" @click="animate">
      animate
    </button>
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
