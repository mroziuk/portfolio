---
name: "Dark mode CSS"
date: "2025-03-07"
category: "post"
tags: ["CSS", "JavaScript", "React"]
---

Jak stworzyć tryb dark mode używając jedynie css? Na potrzeby tego przykładu wykorzystam React, jednak jedyne co potrzebujemy to stan, więc łatwo będzie przerobić go na wykorzystanie Angular, lub czysty JavaScript. Warto dodatkowo zapamiętać tryb w pamięci przeglądarki, np w `localStorage`

Zacznijmy od stanu `darkMode` oraz ustawienia odpowiedniej klasy css dla całego dokumentu html.
z elementu`input` można za pomocą `css` zrobić ładniejszy przełącznik lub zastosować jeden z gotowych komponentów.
```jsx
const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    document.body.className = darkMode ? "dark" : "";
  }, [darkMode]);
  
<label>
  <input
	type="checkbox"
	checked={darkMode}
	onChange={() => setDarkMode(!darkMode)}
	aria-label="Toggle dark mode"
  />
</label>
```
następnie w pliku `css` stwórzmy zmienne odpowiadające za kolory trybu jasnego i ciemnego. Po tym można już korzystać z nich w dowolnej klasie. Dodatkową zaletą jest posiadanie wszystkich kolorów w jednym miejscu, dzięki czemu łatwiej będzie wprowadzić zmiany.
```css
:root {
  --bg-light: #f9f9f9;
  --bg-light-code: #d7d7d7;
  --text-light: #1a1a1a;
  --bg-dark: #1a181b;
  --text-dark: #dee4eb;
  --accent: #4f46e5;
  --gray: #747474;
}

body {
  font-family: 'Inter', sans-serif;
  ...
  background-color: var(--bg-light);
  color: var(--text-light);
  transition: background-color 0.6s, color 0.6s;
}
body.dark {
  background-color: var(--bg-dark);
  color: var(--text-dark);
}
```