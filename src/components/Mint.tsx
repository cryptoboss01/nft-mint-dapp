import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { ethers } from "ethers";
import { Box, Button, styled, TextField } from "@mui/material";
import toast from "react-hot-toast";

import { EvolveeNFT } from "../types";
import EvolveeNftArtifact from "../artifacts/contracts/EvolveeNFT.sol/EvolveeNFT.json";
import logger from "../logger";

export const CONTRACT_DEPLOYED_ADDRESS = "0xC91272415aef53A87cC6Dc4274cbC6d3e00F0fCE";
const API_URL = "http://127.0.0.1:8000";

declare global {
  interface Window {
    ethereum: ethers.providers.ExternalProvider;
  }
}

const DropArea = styled(Box)`
  border: 4px dashed #888;
  border-radius: 10px;
  padding: 2rem;
  padding-top: 1.5rem;
  margin: 2rem 0;
  color: #ddd;
  font-size: 1rem;
  font-family: cursive;

  & p {
    text-align: center;
  }
`;

const StyledTextField = styled(TextField)`
  width: 100%;
  margin-bottom: 1rem;
`;

type FormValues = {
  name: string;
  description: string;
};

interface IMintPropsType {
  setTotal: (total: string) => void;
}

const Mint: React.FC<IMintPropsType> = ({ setTotal }): JSX.Element => {
  const { library, account } = useWeb3React();
  const { register, handleSubmit, reset } = useForm<FormValues>();

  const [files, setFiles] = useState<Array<File & { preview: string; }>>([]);

  useEffect(() => {
    fetchTotal();
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".png"],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const onSubmit = handleSubmit((data) => {
    if (files.length === 0) {
      return window.alert("Please select the image.");
    }

    startMint(data, files);
    reset();
    setFiles([]);
  });

  const fetchTotal = () => {
    logger.warn("fetchTotal");
    const provider = library || new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(
      CONTRACT_DEPLOYED_ADDRESS,
      EvolveeNftArtifact.abi,
      provider
    ) as EvolveeNFT;
    contract
      .currentCounter()
      .then((result) => setTotal(result.toString()))
      .catch(logger.error);
  };

  const handleMintNftTokeN = async (tokenUrl: string) => {
    const provider = library || new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      CONTRACT_DEPLOYED_ADDRESS,
      EvolveeNftArtifact.abi,
      signer
    ) as EvolveeNFT;

    try {
      const transaction = await contract.freeMint(account, tokenUrl);
      toast.promise(transaction.wait(), {
        loading: `Transaction submitted. Wait for confirmation...`,
        success: <b>Transaction confirmed!</b>,
        error: <b>Transaction failed!.</b>,
      });

      transaction
        .wait()
        .then(() => fetchTotal())
        .catch(logger.error);
    } catch (error) {
      logger.error(error);
    }
  }

  const handleUpload = async ({ name, description, file }: { name: string; description: string; file: File }) => {
    toast("Uploading... Please wait for a moment!");

    const formdata = new FormData();

    formdata.append("name", name);
    formdata.append("description", description);

    if (file) formdata.append("file", file);

    const response = await fetch(API_URL ? API_URL + "/nft/upload" : "/api/nft/upload", {
      method: "POST",
      body: formdata,
    });
    const result = await response.json();

    result.error && toast.error(result.message);

    if (result.url) {
      toast.success(`Uploaded ${result.url}`);

      return handleMintNftTokeN(result.url);
    }
  };

  const startMint = async (formData, files) => {

    console.log(files[0])

    handleUpload({
      name: formData.name,
      description: formData.description,
      file: files[0]
    });
  }

  return (
    <form onSubmit={onSubmit}>
      <Box>
        <Box>
          <DropArea {...getRootProps()}>
            <input {...getInputProps()} />
            {files[0] ? (
              <p>{files[0].name}</p>
            ) : (
              <>
                <p>Drag 'n' drop some file here, or click to select file</p>
                <p><em>(Only *.jpeg and *.png image will be accepted)</em></p>
              </>
            )}
          </DropArea>

          <aside>
            {files.length > 0 && (
              <Box sx={{ borderRadius: '0.5rem', marginBottom: '2rem' }}>
                <img
                  src={files[0].preview}
                  alt={files[0].name}
                  width="100%"
                  style={{
                    borderRadius: '0.5rem'
                  }}
                />
              </Box>
            )}
          </aside>
        </Box>

        <StyledTextField
          id="outlined-name"
          label="Name"
          placeholder="Name"
          fullWidth
          {...register("name", { required: true })}
        />
        <StyledTextField
          id="outlined-description"
          label="Description"
          placeholder="Description"
          multiline
          rows={3}
          {...register("description", { required: true })}
        />
      </Box>

      <Button type="submit" variant="contained" color="success" fullWidth>
        Mint
      </Button>
    </form>
  );
}

export default Mint;