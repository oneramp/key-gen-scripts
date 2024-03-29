import { SiweMessage, generateNonce } from "siwe";

async function createSiweMessage() {
  try {
    const currentDate = new Date();
    const expirationDate = new Date(currentDate.getTime() + 60 * 60 * 3000); // Add 1 hour in milliseconds

    const nonce = generateNonce();

    const formattedExpirationDate = expirationDate.toISOString();

    const message = new SiweMessage({
      statement: "Sign in with Ethereum to the app.",
      address: "0x5CBDf5f9E468dF3888e04155668CcAfC6F6C4dcf",
      domain: "sandbox.oneramp.io",
      uri: "https://sandbox.oneramp.io/auth/login",
      version: "1",
      chainId: "44787",
      nonce: nonce, // Generate and update random nonce using openssl rand -hex 16
      issuedAt: currentDate.toISOString(),
      expirationTime: formattedExpirationDate,
    });

    const prepared = message.prepareMessage();

    console.log("====================================");
    console.log(prepared);
    console.log("====================================");

    console.log("====================================");
    console.log(JSON.stringify(prepared));
    console.log("====================================");
  } catch (error) {
    console.log(error);
  }
}

createSiweMessage();
