import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
  lang: 'en-US',
  title: 'Bolin Shen',
  description: 'blshen.org',

  bundler: viteBundler(),
  theme: defaultTheme({
    navbar: [
      {
        text: 'Home',
        link: '/index',
      },
      {
        text: 'Publications',
        link: '/pubs',
      },
      {
        text: 'Misc',
        link: '/misc',
      },
    ],
    sidebar: false,
  }),
})
