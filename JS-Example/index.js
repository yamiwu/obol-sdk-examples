import {Client} from "@obolnetwork/obol-sdk";
import { ethers } from "ethers";

/**
 * @returns instantiates and returns Obol SDK Client
 */
const obolClient = async () => {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const client = new Client({ baseUrl: "https://api.obol.tech", chainId: 5 }, signer);
  return client
}

/**
 * Returns the cluster config hash after saving cluster definition
 * @param cluster The cluster defintion { name:string, operators:{address:string}[], validators:{fee_recipient_address:string,withdrawal_address:string}[]}
 * @returns The config hash
 */
const createObolCluster = async (clusterConfig) => {
  try {
    const client = await obolClient();
    const configHash = await client.createClusterDefinition(clusterConfig);
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
const getObolClusterLock = async (configHash) => {
  try {
    const client = await obolClient();
    const lockFile = await client.getClusterLock(configHash);
    return lockFile;
  } catch (err) {
    console.log(err, "err");
  }
};
