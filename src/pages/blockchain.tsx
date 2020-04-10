import React, {FC, useState} from 'react';
import Layout from "../components/Layout";
import BlockDisplay from "../components/block";
import {Block, BlockChain, startGenesisBlock} from '../utils/blockchain'


const Blockchain:FC = () => {
  const [blockChain,setBlockChain] = useState<BlockChain>([]);
  const [lastBlock,setLastBlock] = useState<Block>();
  const [lastBlockVisible,setLastBlockVisibility] = useState<boolean>(false);

  const morethanOneBlock = blockChain.length > 1; // to enable the get latest block button. The Blockchain.
  const atLeastOneBlock = blockChain.length > 0; // to show the blockchain

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

  const handleAddBlock = () => {

  }

  return (
    <Layout title="Account">
      <button onClick={handleBlockChainStart}>Start the blockchain</button>
      {
        atLeastOneBlock &&
          <>
            {
              blockChain.map((block:Block) => <BlockDisplay block={block}/>)
            }
            {
              morethanOneBlock &&
              <button onClick={handleGetLatestBlock}>See the last Block</button>
            }
            {
              <button onClick={handleAddBlock}>Add a new block</button>
            }
          </>
      }
      {
        lastBlock !== undefined && lastBlockVisible &&
          <>
            <BlockDisplay block={lastBlock}/>
            <button onClick={handleHideLastBlock}>Hide the last Block</button>
          </>
      }
    </Layout>
  )
}

export default Blockchain;

