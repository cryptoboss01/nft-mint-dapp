import { Alert, AlertTitle, Button, Card, CardContent, CardMedia, Link, Typography } from "@mui/material";
import React from "react";
import { useNft } from "use-nft";

import Image from "./Image";
import { CONTRACT_DEPLOYED_ADDRESS } from "./Mint";

interface INftPropsType {
  tokenId: string;
}

const Nft: React.FC<INftPropsType> = ({ tokenId }): JSX.Element => {
  const { loading, error, nft } = useNft(CONTRACT_DEPLOYED_ADDRESS, tokenId);

  if (loading) {
    return (
      <Card>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            #{tokenId}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            loading...
          </Typography>
        </CardContent>
      </Card>
    );
  }

  if (error || !nft) {
    return (
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {error?.message}
      </Alert>
    );
  }

  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          #{tokenId} - {nft.name}
        </Typography>
        <CardMedia>
          <Image src={nft.image} alt={nft.name} />
        </CardMedia>
        <Typography variant="body2" color="text.secondary" lineHeight="2rem">
          Description: {nft.description}
          <br />Owner: {nft.owner}
        </Typography>
        <Link target="_blank" href={nft.metadataUrl}>
          <Button>More info</Button>
        </Link>
      </CardContent>
    </Card>
  );
}

export default Nft;