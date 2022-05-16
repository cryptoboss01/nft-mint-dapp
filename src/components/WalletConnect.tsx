import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import { Box, Button, styled } from "@mui/material";

import { injected, walletconnect } from "../dapp/connectors";
import { useEagerConnect, useInactiveListener } from "../dapp/hooks";
import { getErrorMessage } from "../utils";

import Account from "./Account";
import Balance from "./Balance";
import Network from "./Network";

const WrappedButton = styled(Button)`
  margin-left: 0.2rem;
`;

const WalletConnect = () => {
  const context = useWeb3React<Web3Provider>();
  const { connector, library, account, activate, deactivate, active, error } = context;

  const [activatingConnector, setActivatingConnector] = useState<any>();
  const [loading, setLoading] = useState<boolean>();

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector);

  const connected = (connection: typeof injected | typeof walletconnect) => connection === connector;
  const disabled = !triedEager || !!activatingConnector || connected(injected) || connected(walletconnect) || !!error;

  // handle logic to recognize the connector currently being activated
  useEffect(() => {
    activatingConnector && activatingConnector === connector && setActivatingConnector(undefined);
  }, [activatingConnector, connector]);

  // handle error occurred while working with a wallet
  useEffect(() => {
    !!error && window.alert(getErrorMessage(error))
  }, [error]);

  // handle wallet loading
  useEffect(() => {
    setLoading(disabled === activatingConnector)
  }, [disabled]);

  const handleClickConnectBtn = () => {
    setActivatingConnector(injected);
    activate(injected);
  }

  const handleClickSignBtn = () => {
    library
      .getSigner(account)
      .signMessage("👋")
      .then((signature: any) => {
        window.alert(`Success!\n\n${signature}`);
      })
      .catch((err: Error) => {
        window.alert(`Failure!${err && err.message ? `\n\n${err.message}` : ""}`);
      });
  }

  const handleClickDeactivateBtn = () => {
    connected(walletconnect) && (connector as any).close();
    deactivate();
  }

  return (
    <Box>
      <Network />
      <Account />
      <Balance />

      {!disabled &&
        <WrappedButton variant="outlined" color="primary" onClick={handleClickConnectBtn}>
          {loading ? "loading..." : "Connect with MetaMask"}
        </WrappedButton>
      }

      {(active || error) && connected(injected) && (
        <>
          {!!(library && account) && (
            <WrappedButton variant="outlined" color="success" onClick={handleClickSignBtn}>
              Sign Message
            </WrappedButton>
          )}
          <WrappedButton variant="outlined" color="warning" onClick={handleClickDeactivateBtn}>
            Deactivate
          </WrappedButton>
        </>
      )}
    </Box>
  );
};

export default WalletConnect;
