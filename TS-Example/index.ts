import { ethers } from "ethers";
import { Client } from "@obolnetwork/obol-sdk";
import { ClusterLock } from "@obolnetwork/obol-sdk/dist/types.js";

//To run the example in terminal, we can create a random privatekey to instanisiate obol-sdk Client
const clusterConfig = {
  name: "testSDK",
  operators:
    [
      { address: "0xC35CfCd67b9C27345a54EDEcC1033F2284148c81" },
      { address: "0x33807D6F1DCe44b9C599fFE03640762A6F08C496" },
      { address: "0xc6e76F72Ea672FAe05C357157CfC37720F0aF26f" },
      { address: "0x86B8145c98e5BD25BA722645b15eD65f024a87EC" }
    ],
  validators: [{
    fee_recipient_address: "0x3CD4958e76C317abcEA19faDd076348808424F99",
    withdrawal_address: "0xE0C5ceA4D3869F156717C66E188Ae81C80914a6e"
  }],
}
const mnemonic = ethers.Wallet.createRandom().mnemonic?.phrase || "";
const privateKey = ethers.Wallet.fromPhrase(mnemonic).privateKey;
const wallet = new ethers.Wallet(privateKey);
const signer = wallet.connect(null);
const client = new Client({ baseUrl: "https://api.obol.tech", chainId: 5 }, signer);

/** Instantiates Obol SDK CLient
 * @returns Obol SDK client
 */
const obolClient = async (): Promise<Client> => {
  const provider = new ethers.BrowserProvider((window as any).ethereum);
  try {
    const signer = await provider.getSigner();
    const client = new Client({ baseUrl: "https://api.obol.tech", chainId: 5 }, signer);
    return client
  } catch (err) {
    console.log(err, "err");
  }
}

/**
 * Returns the cluster config hash after saving cluster definition
 * @param cluster The cluster defintion
 * @returns The config hash
 */
const createObolCluster = async (): Promise<string> => {
  try {
    //const client = await obolClient();
    const configHash = await client.createClusterDefinition(clusterConfig);
    console.log(configHash, "configHash")
    return configHash;
  } catch (err) {
    console.log(err, "err");
  }
};

/**
 * Returns the cluster lock
 * @param configHash The cluster hash returned from createClusterDefinition
 * @returns The cluster lock
 */
const getObolClusterLock = async (configHash: string): Promise<ClusterLock> => {
  try {
    //const client = await obolClient();
    const lockFile = await client.getClusterLock(configHash);
    return lockFile;
  } catch (err) {
    console.log(err, "err");
  }
};


console.log(createObolCluster())