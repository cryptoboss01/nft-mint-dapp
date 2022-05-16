import { AppBar, styled, Toolbar, Typography } from "@mui/material";

import WalletConnect from "./WalletConnect";

const WrappedAppBar = styled('div')`
  widht: 100%;
  display: flex;
  justify-content: center;
`;

const Header = () => {
  return (
    <WrappedAppBar>
      <AppBar
        position="static"
        color="primary"
        sx={{
          width: "90%",
          maxHeight: "80px",
          padding: "0.5rem 0",
          borderRadius: '0.5rem'
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            NFT Mint Here!
          </Typography>

          <WalletConnect />
        </Toolbar>
      </AppBar>
    </WrappedAppBar>
  );
};

export default Header;
