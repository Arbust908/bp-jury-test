import { defineConfig } from 'vite'
import React from '@vitejs/plugin-react'
import Unocss from 'unocss/vite';
import { presetAttributify, presetUno } from 'unocss'
import presetIcons from '@unocss/preset-icons'

export default defineConfig({
  plugins: [
    React(),
    Unocss({
      presets: [
        presetAttributify(),
        presetUno(),
        presetIcons({
          extraProperties: {
          'display': 'inline-block',
          'vertical-align': 'middle',
          },
        })],
    }),
  ]
})
