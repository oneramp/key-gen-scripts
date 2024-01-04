import crypto from "crypto";

function createFiatConnectSignature(body, sharedSecretKey, timestamp) {
  // Ensure the body uses the provided timestamp
  //   body.timestamp = timestamp;
  const bodyString = JSON.stringify(body); // Convert body to a string

  // Create the HMAC signature
  const signature = crypto
    .createHmac("sha256", sharedSecretKey)
    .update(`${timestamp}.${bodyString}`)
    .digest("hex");

  // Construct the signature header
  return `t=${timestamp},v1=${signature}`;
}

// Example usage
const sharedSecretKey = ""; // Enter webhook shared secret key here generated from the dashboard
// const timestamp = Math.floor(Date.now() / 1000); // Current Unix timestamp

const timestamp = "1234567890";
const requestBody = {
  eventType: "WebhookTransferOutStatusEvent",
  provider: "OneRamp",
  eventId: "evt_1234567890abcdef",
  timestamp: "1234567890",
  address: "0x5272bB6A1A4d09cEef6377D9A9c28079fb402C41",
  payload: {
    status: "TransferStarted",
    transferType: "TransferOut",
    fiatType: "UGX",
    cryptoType: "cUSD",
    amountProvided: "0.9824074896517839",
    amountReceived: "0.9724841816755033",
    fiatAccountId: "6593d49ee51062c511cfe3ef",
    transferId: "6593d4c9e51062c511cfe3f6",
    transferAddress: "0x5272bB6A1A4d09cEef6377D9A9c28079fb402C41",
    userActionDetails: {
      userActionType: "AccountNumberUserAction",
      institutionName: "OneRamp",
      accountName: "OneRamp",
      accountNumber: "25656",
      transactionReference: "ref-6593d49ee51062c511cfe3ef",
    },
  },
};

const signatureHeader = createFiatConnectSignature(
  requestBody,
  sharedSecretKey,
  timestamp
);
console.log(signatureHeader);
