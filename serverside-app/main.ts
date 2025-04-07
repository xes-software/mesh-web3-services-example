import { Web3Sdk } from "@meshsdk/web3-sdk";

const sdk = new Web3Sdk({
  appUrl: "http://localhost:3000",
  projectId: "794b0e0d-4903-4ad8-9be6-0ab139fc2652",
  apiKey: "9cbc1417-46bc-41c8-b453-f2c8933866a7",
  privateKey:
    "MIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgpZ1AxSsh91Asztf5yzFuVA/P5bd6a2B+6ErDwwhpd0mhRANCAAQ3BgV9w250L1VKgPohcyWWjesWUNoICifsWF7qyp9JBO/9ZIhtLGcuI12JWBLrUOOkpwN0277HfyFQ6X4GtPrB",
});

const createDevWallet = async () => {
  await sdk.wallet.createWallet();

  const wallets = await sdk.wallet.getWallets();

  console.log("Logging wallets:", wallets);
};

const getWalletAndSignData = async () => {
  const wallets = await sdk.wallet.getWallets();

  const { wallet, info } = await sdk.wallet.getWallet(wallets[0].id, 0);
  console.log("Logging wallet info:", info);

  const signature = await wallet.signData("Signature");

  console.log("Logging the data signature:", signature);
};

getWalletAndSignData().then();
