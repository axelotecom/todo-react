const switchTheme = ($themeCtx: string, exp: string, theme: any): string => {
    const { darkTheme, lightTheme } = theme;

    switch ($themeCtx) {
        case 'dark':
            return darkTheme[exp];
        case 'light':
            return lightTheme[exp];
        default:
            return lightTheme[exp];
    }
};
export default switchTheme;
