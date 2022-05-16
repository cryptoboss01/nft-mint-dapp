import { useEffect } from "react";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { styled } from '@mui/material/styles';
import { Web3ReactProvider } from "@web3-react/core";
import { NftProvider } from "use-nft";
import { getDefaultProvider } from "ethers";

import DApp from "./components/DApp";
import useLocalStorage from "./hooks/useLocalStorage";
import { getLibrary } from "./utils";

const customTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const MainContainer = styled('div')`
  background: #555;
  min-height: 100vh;
`;

const ethersConfig = {
  provider: getDefaultProvider("ropsten"),
};

const App = function () {
  const [theme, setTheme] = useLocalStorage<"dark" | "light">("theme", "dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, []);

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ThemeProvider theme={customTheme}>
        <NftProvider fetcher={["ethers", ethersConfig]}>
          <MainContainer>
            <DApp />
          </MainContainer>
        </NftProvider>
      </ThemeProvider>
    </Web3ReactProvider>
  );
};

export default App;
