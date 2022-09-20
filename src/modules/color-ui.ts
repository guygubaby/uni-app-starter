import type { App } from 'vue'

const ColorList = [{
  title: '嫣红',
  name: 'red',
  color: '#e54d42',
},
{
  title: '桔橙',
  name: 'orange',
  color: '#f37b1d',
},
{
  title: '明黄',
  name: 'yellow',
  color: '#fbbd08',
},
{
  title: '橄榄',
  name: 'olive',
  color: '#8dc63f',
},
{
  title: '森绿',
  name: 'green',
  color: '#39b54a',
},
{
  title: '天青',
  name: 'cyan',
  color: '#1cbbb4',
},
{
  title: '海蓝',
  name: 'blue',
  color: '#0081ff',
},
{
  title: '姹紫',
  name: 'purple',
  color: '#6739b6',
},
{
  title: '木槿',
  name: 'mauve',
  color: '#9c26b0',
},
{
  title: '桃粉',
  name: 'pink',
  color: '#e03997',
},
{
  title: '棕褐',
  name: 'brown',
  color: '#a5673f',
},
{
  title: '玄灰',
  name: 'grey',
  color: '#8799a3',
},
{
  title: '草灰',
  name: 'gray',
  color: '#aaaaaa',
},
{
  title: '墨黑',
  name: 'black',
  color: '#333333',
},
{
  title: '雅白',
  name: 'white',
  color: '#ffffff',
},
]

// Source from https://github.com/gek6/easy-app/blob/master/src/color-ui/init.ts
const install = (app: App<Element>) => {
  const statusBarHeight = ref<number>(0)
  const customBarHeight = ref<number>(0)

  uni.getSystemInfo({
    success(e: any) {
      // #ifdef MP-WEIXIN
      statusBarHeight.value = e.statusBarHeight
      // @ts-expect-error ignore wx
      const customHeight = wx.getMenuButtonBoundingClientRect()
      customBarHeight.value = customHeight.bottom + customHeight.top - statusBarHeight.value

      app.provide($StatusBarHeight, statusBarHeight)
      app.provide($CustomBarHeight, customBarHeight)
      // #endif
    },
  })

  app.provide($ColorList, ColorList)
}

export default install
