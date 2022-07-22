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
        })
      ],
      rules: [
        // [/^icon-(\d+)$/, ([, d]) => ({ margin: `${d / 4}rem` })],
      ],
      shortcuts: [
        [/^icon-(\d+)$/, ([, d]) => `w-${d} h-${d}`],
        {'flex-mid': 'flex justify-center align-center'},
      ],
      safelist: [
        'i-logos:php',
        'i-logos:javascript',
        'i-logos:typescript-icon',
        'i-logos:vue',
        'i-logos:c-sharp',
        'i-logos:html-5',
        'i-logos:css-3',
        'i-logos:rust',
        'i-logos:perl',
        'i-logos:hack',
        'i-logos:c-plusplus',
        'i-ic:round-question-mark'
      ]
    }),
  ]
})
