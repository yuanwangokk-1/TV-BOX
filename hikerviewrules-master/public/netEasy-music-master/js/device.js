let width = document.documentElement.clientWidth
console.log(width)
let css = `
  html{
    font-size: ${width / 10}px;
  }
`
let style = `<style>${css}</style>`

document.write(style)