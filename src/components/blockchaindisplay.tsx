import React, {FC} from 'react';
import { Block, BlockChain as BlockChainType} from '../utils/blockchain'
import BlockDisplay from "./block";


interface BlockChainProps {
  blockChain: BlockChainType;
}

const BlockChainDisplay:FC<BlockChainProps> = ({blockChain}) => {

  return (
    <>
      {
        blockChain.map((block:Block,index) => {
          console.log(block)
          return (
          <BlockDisplay key={index} block={block}/>
          )
        })
      }
    </>
  )
}

export default BlockChainDisplay;
