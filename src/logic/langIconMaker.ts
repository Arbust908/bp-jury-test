export const langIconMaker = (lang: string) => {
  const newLang = lang.toLowerCase();
  let iconStr = ''
  const passthrough = ['php', 'javascript', 'vue', 'rust', 'perl', 'hack']
  const langObject: { [key: string]: string } = {
    html: 'html-5',
    'c#': 'csharp',
    css: 'css-3',
    'c++': 'c-plusplus',
    'typescript': 'typescript-icon',
  }
  if (passthrough.includes(newLang)) {
    iconStr = newLang
  } else if (langObject[newLang]) {
    iconStr = langObject[newLang]
  }
  return iconStr ? `i-logos:${iconStr}` : 'i-ic:round-question-mark'
}
