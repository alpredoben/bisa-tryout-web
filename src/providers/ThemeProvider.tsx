import type React from "react";
import { useTheme } from "../hooks/useTheme";


export const ThemeProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const {theme, switchTheme} = useTheme();

  return (
    <div className={theme === 'dark' ? 'dark' : 'light'}>
      {children}
      <button onClick={switchTheme}>Toogle Theme</button>
    </div>
  )
}