import { useTheme } from "@/hooks/use-theme";
import { createContext, ReactElement } from "react";

export enum Theme {
    LIGHT,
    DARK
}

export type ThemeContextProps = {
    theme: Theme;
    toggleTheme: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextProps>({
    theme: Theme.LIGHT,
    toggleTheme: (theme: Theme) => { }
});

export const ThemeProvider = ({ children }: { children: ReactElement }) => {
    const value = useTheme();

    return (
        <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    )
}