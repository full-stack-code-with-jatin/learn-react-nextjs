import { ThemeContext } from "@/context/theme-context";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useContext } from "react";

const ToggleThemeButton = () => {
    const themeContext = useContext(ThemeContext);
    return (
        <button
            type="button"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                if (themeContext) {
                    themeContext.toggleTheme(themeContext.theme);
                }
            }}
            className="mr-2 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
        >
            <span className="sr-only">Dark mode</span>
            <MoonIcon className="hidden dark:inline h-6 w-6" aria-hidden="true" />
            <SunIcon className="dark:hidden h-6 w-6" aria-hidden="true" />
        </button>
    );
}

export default ToggleThemeButton;