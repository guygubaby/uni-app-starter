import { describe, it } from 'vitest'
import { transform } from '../vite-plugins/auto-import'

const input = `
<template>
  <view class="flex flex-col items-center">
    <button @click="userStore.inc()">
      inc
    </button>

    <van-button>foo</van-button>

    <van-button> foo </van-button>

    <van-cell>
     <van-icon />
    </van-cell>

  </view>
</template>
`

describe('should tranform works', () => {
  it('test tranform', () => {
    transform(input, 'index/index.vue')
  })
})

