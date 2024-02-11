import React from 'react'

const ThemeContext = React.createContext({
  savedVideosList: [],
  addSavedVideosList: () => {},
  isDarkTheme: false,
  toggleTheme: () => {},
})

export default ThemeContext
