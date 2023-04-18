import { DefaultTheme, ThemeProvider } from "styled-components"; 
import React, { ReactNode, createContext, useState } from "react";

interface MyTheme extends DefaultTheme {
  colors: {
    background: string;
    text: string;
    primary: string;
    secondary: string;
  };
  fonts :{
    body : string
    heading : string
  }
}

const lightTheme: MyTheme = {
  colors: {
    background: "#FFFEFA",
    text: "#000",
    primary: "#000",
    secondary: "#595856",
  },
  fonts: {
    body: "Helvetica, Arial, sans-serif",
    heading: "Helvetica, Arial, sans-serif",
  },
};

const darkTheme: MyTheme = {
  colors: {
    background: "#0C090A",
    text: "#fff",
    primary: "#fff",
    secondary: "#DADBDD",
  },
  fonts: {
    body: "Helvetica, Arial, sans-serif",
    heading: "Helvetica, Arial, sans-serif",
  },
};

interface ThemeContextType {
  theme: MyTheme;
  setTheme: React.Dispatch<React.SetStateAction<MyTheme>>;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: lightTheme,
  setTheme: () => {},
});
interface ThemeProviderProps {
  initialTheme?: MyTheme;
  children: ReactNode
}

const ThemeProviderWrap: React.FC<ThemeProviderProps> = ({
  initialTheme = lightTheme,
  children,
}) => {
  const [theme, setTheme] = useState(initialTheme);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};


export { lightTheme, darkTheme, ThemeProviderWrap, ThemeContext };  export type { MyTheme };

