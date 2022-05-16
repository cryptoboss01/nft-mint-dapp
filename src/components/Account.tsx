/* eslint-disable no-nested-ternary */
import { Button } from "@mui/material";
import { useWeb3React } from "@web3-react/core";

const Account = () => {
  const { account } = useWeb3React();

  return (
    <Button>
      <span>Account</span>
      <span role="img" aria-label="robot">
        🤖
      </span>
      <span>
        {account === null
          ? "-"
          : account
          ? `${account.substring(0, 6)}...${account.substring(account.length - 4)}`
          : ""}
      </span>
    </Button>
  );
};

export default Account;
