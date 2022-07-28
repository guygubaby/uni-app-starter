import { describe, expect, it } from 'vitest'

const input = `
<template>
  <view class="flex flex-col items-center">
    <button @click="userStore.inc()">
      inc
    </button>


    <van-cell>
     <van-icon />
    </van-cell>

    <!-- <van-button>foo</van-button> -->

  </view>
</template>
`

describe('should tranform works', () => {
  it('test tranform', () => {
    expect(input).toMatchInlineSnapshot(`
      "
      <template>
        <view class=\\"flex flex-col items-center\\">
          <button @click=\\"userStore.inc()\\">
            inc
          </button>


          <van-cell>
           <van-icon />
          </van-cell>

          <!-- <van-button>foo</van-button> -->

        </view>
      </template>
      "
    `)
  })
})

