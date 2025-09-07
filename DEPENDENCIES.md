# Project Dependencies Guide

This document explains **all external dependencies** used in this project:  
- What they are  
- Why we need them  
- How to use them  

It also includes **ready-to-use setup scripts** for Linux/Mac and Windows.

---

## 1. `lucide-react`

- **Why we use it:** To show icons in your UI (like a globe, search, or arrow).  
- **Use case:** Buttons, menus, navigation, or any visual element that needs an icon.  
- **Benefit:** Makes your app visually appealing and easier to understand.

---

## 2. `@radix-ui/react-slot`

- **Why we use it:** Allows a component to “act like” another element.  
- **Use case:** A button component can also behave as a link `<a>` or another HTML element without rewriting code.  
- **Benefit:** Makes your components flexible and reusable across the app.

---

## 3. `@radix-ui/react-dropdown-menu`

- **Why we use it:** To create interactive dropdown menus easily.  
- **Use case:** Language selector, settings menu, profile menu, etc.  
- **Benefit:** Menus are accessible, keyboard-friendly, and easy to implement.

---

## 4. `class-variance-authority (CVA)`

- **Why we use it:** To manage multiple variations of a component’s styles.  
- **Use case:** Buttons with different sizes, colors, or styles without repeating CSS.  
- **Benefit:** Keeps styling consistent, clean, and maintainable.

---

## 5. `clsx`

- **Why we use it:** To combine CSS classes conditionally.  
- **Use case:** Add a class if a condition is true (like active state) and remove it if false.  
- **Benefit:** Makes your JSX cleaner and easier to read.

---

## 6. `tailwind-merge`

- **Why we use it:** To fix conflicts between Tailwind CSS classes automatically.  
- **Use case:** If two classes try to set the same property (like `bg-red-500` and `bg-blue-500`), it keeps the last one.  
- **Benefit:** Prevents styling bugs and ensures the intended style always applies.

---

## 7. `@types/react` & `@types/node`

- **Why we use it:** Provides TypeScript definitions for React and Node.js.  
- **Use case:** Lets TypeScript understand React components, props, hooks, and Node.js objects.  
- **Benefit:** Prevents type errors and improves developer productivity and code safety.
