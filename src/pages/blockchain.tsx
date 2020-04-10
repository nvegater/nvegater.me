import React, {FC, useState} from 'react';
import Layout from "../components/Layout";
import BlockDisplay from "../components/block";
import BlockChainDisplay from "../components/blockchaindisplay";
import {Block, BlockChain, lastBlockInChain, newBlock, startGenesisBlock} from '../utils/blockchain'


const Blockchain:FC = () => {
  const [blockChain,setBlockChain] = useState<BlockChain>([]);
  const [lastBlock,setLastBlock] = useState<Block>();
  const [lastBlockVisible,setLastBlockVisibility] = useState<boolean>(false);

  const emptyBlockChain = blockChain.length === 0; // to show the blockchain
  const atLeastOneBlock = blockChain.length > 0; // to show the blockchain
  const morethanOneBlock = blockChain.length > 1; // to enable the get latest block button. The Blockchain.

  const handleBlockChainStart = () => {
    let firstBlockChain:BlockChain = [];
    let firstBlock:Block = startGenesisBlock()
    firstBlockChain.push(firstBlock)
    console.log(firstBlockChain);
    setBlockChain(firstBlockChain)
  }

  const handleGetLatestBlock = () => {
    if (blockChain.length > 0) {
      setLastBlock(lastBlockInChain(blockChain));
      setLastBlockVisibility(true)
    }
  }

  const handleHideLastBlock = () => {
    setLastBlockVisibility(false)
  }

  const handleAddBlock = () => {
    const block = newBlock(blockChain);
    setBlockChain([...blockChain,block]);
  }

  return (
    <Layout title="Account">
      {
        emptyBlockChain &&
        <button onClick={handleBlockChainStart}>Start the blockchain</button>
      }
      {
        morethanOneBlock &&
        <button onClick={handleGetLatestBlock}>See the last Block</button>
      }
      {
        lastBlock !== undefined && lastBlockVisible &&
        <button onClick={handleHideLastBlock}>Hide the last Block</button>
      }
      {
        atLeastOneBlock &&
        <button onClick={handleAddBlock}>Add a new block</button>
      }
      {
        lastBlock !== undefined && lastBlockVisible && <BlockDisplay block={lastBlock}/>
      }
      <BlockChainDisplay blockChain={blockChain}/>
    </Layout>
  )
}

export default Blockchain;

