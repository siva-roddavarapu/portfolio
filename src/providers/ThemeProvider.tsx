"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";

const ThemeContext = createContext({
    theme: "dark" as Theme,
    toggleTheme: ()=>{},
})

interface ThemeProviderProps{
    children: ReactNode;
}

export const ThemeProvider = ({children}: ThemeProviderProps ) =>{
    const [theme, setTheme] = useState<Theme>('dark');

    useEffect(()=>{
        const saved = localStorage.getItem("theme") as Theme;
        if(saved) setTheme(saved);
    },[]);

    useEffect(()=>{
       const root = document.documentElement; 
        root.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    },[theme])

    const toggleTheme = ()=>{
        setTheme((prev)=> (prev==="dark"? "light":"dark"));
    }

    return <ThemeContext.Provider value={{theme,toggleTheme}} >
        {children}
    </ThemeContext.Provider>
}

export const useTheme = ()=> useContext(ThemeContext)