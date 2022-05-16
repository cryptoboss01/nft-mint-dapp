import React from "react";
import { Grid } from "@mui/material";

import Nft from "./Nft";

interface INftListPropsType {
  total: string;
}

const NftList: React.FC<INftListPropsType> = ({ total }): JSX.Element => {
  return (
    <Grid container spacing={2}>
      {total && Array.from(Array(parseInt(total)).keys())
        .map((ind: number) => (
          <Grid item xs={12} md={6} key={`nft-key-${ind}`}>
            <Nft tokenId={ind.toString()} />
          </Grid>
        ))
      }
    </Grid>
  );
};

export default NftList;
