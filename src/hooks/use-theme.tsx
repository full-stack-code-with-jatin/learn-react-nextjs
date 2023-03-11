import { Theme, ThemeContextProps } from "@/context/theme-context";
import { useEffect, useState } from "react";

const useTheme = () => {
    const [theme, setTheme] = useState(Theme.LIGHT);
    const toggleTheme = (theme: Theme) => {
        if (theme === Theme.LIGHT) {
            setTheme(Theme.DARK);
        }
        else {
            setTheme(Theme.LIGHT)
        }
    }
    const value: ThemeContextProps = {
        theme,
        toggleTheme
    };

    useEffect(() => {
        document.getElementsByTagName('html')[0].className = `h-full ${theme === Theme.LIGHT ? 'light' : 'dark'}`;
    }, [theme]);

    return value;
}

export { useTheme };