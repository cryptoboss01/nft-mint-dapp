import { Box } from "@mui/material";
import React, { useState } from "react";

const Image = (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  return (
    <>
      {!isLoaded ? <Box>Loading NFT Asset…</Box> : null}
      {isError && isLoaded ? (
        <Box>
          <Box>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#ff5722"
              className="w-6 h-6 mx-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
              />
            </svg>
            <label>Image Not Found</label>
          </Box>
        </Box>
      ) : null}
      <p style={{ textAlign: 'center' }}>
        <img
          {...props}
          style={{ opacity: isLoaded && !isError ? 1 : 0, width: "auto", maxHeight: '15rem' }}
          onLoad={() => {
            setIsLoaded(true);
          }}
          onError={() => {
            setIsLoaded(true);
            setIsError(true);
          }}
        />
      </p>
    </>
  );
};

export default Image;