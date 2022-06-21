/* eslint-disable no-underscore-dangle */
// These constants must match the ones used in the smart contract.
const SIGNING_DOMAIN_NAME = "PEPSI_COKE";
const SIGNING_DOMAIN_VERSION = "1";

class Signature {
  constructor({ contract, signer }) {
    this.contract = contract;
    this.signer = signer;
  }

  // design your domain separator
  async designDomain() {
    if (this.domainData != null) {
      return this.domainData;
    }
    const chainId = await this.contract.getChainID();
    // console.log(`chainId: ${chainId.toString()}`);

    this.domainData = {
      name: SIGNING_DOMAIN_NAME,
      version: SIGNING_DOMAIN_VERSION,
      verifyingContract: this.contract.address,
      chainId,
      // the address of the contract that will verify the signature. The user-agent may do contract specific phishing prevention.
    };
    return this.domainData;
  }

  async signTransaction(firstName, lastName, tokenUri) {
    const domain = await this.designDomain();
    // define your data types
    const types = {
      Voucher: [
        { name: "firstName", type: "string" },
        { name: "lastName", type: "string" },
        { name: "tokenUri", type: "string" },
        { name: "content", type: "string" },
      ],
    };

    // the data to sign / signature will be added to our solidity struct
    const voucher = {
      firstName: firstName,
      lastName: lastName,
      tokenUri,
      content: "You are signing this item to be on sale on market!",
    };

    // signer._signTypedData(domain, types, value) =>  returns a raw signature
    const signature = await this.signer._signTypedData(domain, types, voucher);

    return {
      ...voucher,
      signature,
    };
  }
}

module.exports = {
  Signature,
};
