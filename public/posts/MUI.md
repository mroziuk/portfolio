---
name: "MUI"
date: "2024-10-12"
category: "micro"
tags: ["CSS", "React"]
---
## components
1. Container - wrapper całej aplikacji, można dodać tło, marginesy odpowiednie
2. Typography - każdy tekst, można zrobić h1,h2... ( variant= "h3" )
3. Box - div ze stylami jako props
4. Paper - taki box ale ma cień i można ustawić **elevation**
5. Button - outlined, contained
## style
w sx = {{ ...}} można wpisać zwykłe style css, skróty
działa też ":hover", pseudo elements
## shortcuts
- p - padding
- m - margin
- py - padding top & bottom
- px -
- bgcolor - background-color
- 1 - 8px => sx={{p: 1}}  padding: 8px
## theme
```jsx
const theme = createTheme()
```

## responsive
```jsx
flexDirection: {xs: "column", md: "row" } // xs, sm, md, lg, xl
```