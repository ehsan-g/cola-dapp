import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ethers } from "ethers";
import LazyFactory from "../../build/artifacts/contracts/LazyFactory.sol/LazyFactory.json";
import { Signature } from "../../Signature";

export interface SignatureState {
  result: any;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | undefined;
}

export interface Config {
  headers: {
    "Content-Type": "application/json";
    Authorization: any;
  };
}

const initialState: SignatureState = {
  result: "",
  status: "idle",
  error: "",
};

export const signTransaction = createAsyncThunk(
  "contracts/Sign",
  async (signerContractAddress: any) => {
    window.ethereum.request({ method: "eth_requestAccounts" });
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const signer = provider.getSigner();
    const signerFactory = new ethers.ContractFactory(
      LazyFactory.abi,
      LazyFactory.bytecode,
      signer
    );

    const signerContract = await signerFactory.attach(signerContractAddress);

    const theSignature = new Signature({ contract: signerContract, signer });

    const voucher = await theSignature.signTransaction(
      "firstName",
      "lastName",
      "tokenUri"
    );

    return { voucher, signer };
  }
);

export const deployLazyContract = createAsyncThunk(
  "contracts/Deploy",
  async () => {
    let signerContract;
    let signerFactory;

    window.ethereum.request({ method: "eth_requestAccounts" });

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const { chainId } = await provider.getNetwork();
    console.log(`chain Id here: ${chainId}`);

    const signer = provider.getSigner();
    const walletAddress = await signer.getAddress();

    signerFactory = new ethers.ContractFactory(
      LazyFactory.abi,
      LazyFactory.bytecode,
      signer
    );

    signerContract = await signerFactory.deploy(
      "1L",
      "name",
      signer.getAddress()
    );

    return await signerContract.deployTransaction.wait(); // loading before confirmed transaction
  }
);

const LazyFactorySlice = createSlice({
  name: "buildings",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(deployLazyContract.pending, (state, action) => {
        state.status = "loading";
        state.result = "";
      })
      .addCase(deployLazyContract.fulfilled, (state, action) => {
        state.result = "";
        console.log(action);
        state.result = action.payload;
        state.status = "succeeded";
      })
      .addCase(deployLazyContract.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default LazyFactorySlice.reducer;
