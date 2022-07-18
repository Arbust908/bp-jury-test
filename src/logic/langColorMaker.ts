import * as colors from '../assets/colors.json';

export const langColorMaker = (lang: string) => {
  const foundColor = colors[lang]
  if (foundColor) return foundColor.color
  const newLang = lang.toLowerCase();
  const langColor: { [key: string]: string } = {
    'c#': '#178600',
    'c++': '#f34b7d',
    'hack': '#c3c3c3',
    'javascript': '#f1e05a',
    'perl': '#c3c3c3',
    'php': '#4F5D95',
    'rust': '#c3c3c3',
    'typescript': '#3178c6',
    'vue': '#41b883',
    css: '#563d7c',
    html: '#2e1052'
  }

  return langColor[newLang] || '#c3c3c3'
}
