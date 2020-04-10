import React, {FC, useState} from 'react';
import Layout from "../components/Layout";
import BlockDisplay from "../components/block";
import {Block, BlockChain, startGenesisBlock} from '../utils/blockchain'


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
        blockChain.map((block:Block) => {
          console.log("About to send: ",block)
            return (<BlockDisplay block={block}/>)
          }
        )
      }
      <button onClick={handleGetLatestBlock}>See the last Block</button>
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

