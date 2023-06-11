import Footer from "./Components/Footer";
import TypingBox from "./Components/TypingBox";
import Header from './Components/Header'
import { GlobalStyles } from "./Styles/global";
import { ThemeProvider } from "styled-components";
import { useTheme } from "./Context/ThemeContext";


function App() {
  const { theme } = useTheme();
  return (
    <ThemeProvider theme={theme}>
      <div className="canvas">
        <GlobalStyles />
        <Header/>
        <TypingBox />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
