import { useState } from "react";
import { Grid } from "@mui/material";
import { Toaster } from "react-hot-toast";

import Header from "./Header";
import Mint from "./Mint";
import NftList from "./NftList";

const DApp = function () {
  const [total, setTotal] = useState<string>();

  return (
    <>
      <Header />

      <Toaster position="top-right" />

      <Grid container spacing={6} paddingX="10%" marginTop="0" paddingBottom="3rem">
        <Grid item xs={6} md={4}>
          <Mint setTotal={setTotal} />
        </Grid>
        <Grid item xs={6} md={8}>
          <NftList total={total} />
        </Grid>
      </Grid>
    </>
  );
};

export default DApp;