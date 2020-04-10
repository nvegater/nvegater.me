import {SHA256, WordArray} from 'crypto-js';

/*
*
* Utilities to handle interactive Blockchain interactions.
*
* */

interface BlockContent {
  message:string;
}

export interface Block {
  index:number;
  timestamp:string;
  content:BlockContent;
  previousHash:string;
  hash: string;
}

export type BlockChain = Block[];

function blockSHA256Hash(
  index:number,
  timestamp:string,
  data:BlockContent | string,
  previousHash:string,
): string {
  let blockHash:WordArray = SHA256(index + previousHash + timestamp + JSON.stringify(data));
  return blockHash.toString()
}

export function startGenesisBlock():Block {

  const blockContent:BlockContent = {
    message:'Initial Block in the chain'
  }
  const hash = blockSHA256Hash(0,Date.now().toString(),blockContent,"0");

  return {
    index: 0,
    timestamp: Date.now().toString(),
    content: blockContent,
    previousHash: "0",
    hash:hash
  };
}
export const newBlock = (blockChain:BlockChain):Block => {

  const timestamp:string = Date.now().toString();
  const previousHash = lastBlockInChain(blockChain).hash;
  const newIndex = indexOfLastBlock(blockChain)+1;
  const blockContent:BlockContent = {
    message:'this is a new Block'
  };

  const hash = blockSHA256Hash(newIndex,timestamp,blockContent,previousHash);

  return {
    index: newIndex,
    timestamp: timestamp,
    content: blockContent,
    previousHash: previousHash,
    hash: hash
  };
}

export const lastBlockInChain = (blockChain:BlockChain) => {
  return blockChain[indexOfLastBlock(blockChain)]
}

export const indexOfLastBlock = (blockChain:BlockChain):number => {
  return blockChain.length - 1;
}
