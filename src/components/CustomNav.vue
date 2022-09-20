<template>
  <view class="w-full">
    <view class="cu-custom w-full" :style="{ height: `${customBarHeight}px` }">
      <view
        class="cu-bar fixed"
        :style="style"
        :class="[bgImage !== '' ? 'none-bg text-white bg-img' : '', bgColor]"
      >
        <view v-if="isBack" class="action" @click="handleBackClicked">
          <text class="cuIcon-back" />
          <slot name="backText" />
        </view>
        <view class="content" :style="{ top: `${statusBarHeight}px` }">
          <slot name="content" />
        </view>
        <slot name="right" />
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
interface Props {
  bgColor?: string
  isBack?: boolean
  bgImage?: string
}

const { bgColor = '', isBack = false, bgImage = '' } = defineProps<Props>()

const { statusBarHeight, customBarHeight } = useColorUI()

const style = computed(() => {
  let style = `
    height:${customBarHeight.value}px;
    padding-top:${statusBarHeight.value}px;
  `

  if (bgImage)
    style = `${style}background-image:url(${bgImage});`

  return style
})

const handleBackClicked = () => {
  uni.navigateBack({
    delta: 1,
  })
}
</script>
