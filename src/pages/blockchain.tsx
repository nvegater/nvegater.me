import React, {FC, useState} from 'react';
import Layout from "../components/Layout";
import {Block, BlockChain, startGenesisBlock} from '../utils/blockchain.ts'


const Blockchain:FC = () => {
  const [blockChain,setBlockChain] = useState<BlockChain>([]);
  const [lastBlock,setLastBlock] = useState<Block>();
  const [lastBlockVisible,setLastBlockVisibility] = useState<boolean>(false);

  const handleBlockChainStart = () => {
    let firstBlockChain:BlockChain = [];
    let firstBlock:Block = startGenesisBlock()
    firstBlockChain.push(firstBlock)
    console.log(firstBlockChain);
    setBlockChain(firstBlockChain)
  }

  const handleGetLatestBlock = () => {
    if (blockChain.length > 0) {
      setLastBlock(blockChain[blockChain.length - 1]);
      setLastBlockVisibility(true)
    }
  }

  const handleHideLastBlock = () => {
    setLastBlockVisibility(false)
  }

  return (
    <Layout title="Account">
      <button onClick={handleBlockChainStart}>Start the blockchain</button>
      {
        blockChain.length > 0 &&
        blockChain.map((block:Block)=>
          <ul>
            <li>Timestamp: {block.timestamp}</li>
            <li>Index: {block.index}</li>
            <li>Message: {block.content.message}</li>
            <li>Hash: {block.hash}</li>
            <li>Previous Hash: {block.previousHash}</li>
          </ul>
        )
      }
      <button onClick={handleGetLatestBlock}>See the last Block</button>
      {
        lastBlock !== undefined && lastBlockVisible &&
          <>
            <ul>
              <li>Timestamp: {lastBlock.timestamp}</li>
              <li>Index: {lastBlock.index}</li>
              <li>Message: {lastBlock.content.message}</li>
              <li>Hash: {lastBlock.hash}</li>
              <li>Previous Hash: {lastBlock.previousHash}</li>
            </ul>
            <button onClick={handleHideLastBlock}>Hide the last Block</button>
          </>
      }
    </Layout>
  )
}

export default Blockchain;

