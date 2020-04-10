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
  precedingHash:string,
): string {
  let blockHash:WordArray = SHA256(index + precedingHash + timestamp + JSON.stringify(data));
  return blockHash.toString()
}

export function startGenesisBlock():Block {

  const blockContent:BlockContent = {
    message:'Initial Block in the chain'
  }
  let hash = blockSHA256Hash(0,"09/04/2020",blockContent,"0");

  return {
    index: 0,
    timestamp: '09/04/2020',
    content: blockContent,
    previousHash: "0",
    hash:hash
  };
}
