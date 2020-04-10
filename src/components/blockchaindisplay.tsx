import React, {FC} from 'react';
import { Block, BlockChain as BlockChainType} from '../utils/blockchain'
import BlockDisplay from "./block";
import {Box, Flex} from "rebass";



interface BlockChainProps {
  blockChain: BlockChainType;
}

const BlockChainDisplay:FC<BlockChainProps> = ({blockChain}) => {

  const widthForBlocks = (blockChain:BlockChainType):number => {
    let numberOfBlocksPerLine = 7;
    let lengthOfChain = blockChain.length;

    let width:number;
    if (lengthOfChain <= numberOfBlocksPerLine){
      width = 1/numberOfBlocksPerLine;
    } else {
      width = 1/(lengthOfChain > numberOfBlocksPerLine ? numberOfBlocksPerLine :blockChain.length)
    }
    return width;
  }



  return (
      <Flex flexWrap="wrap" pt="20px" className="elements">
        {
          blockChain.map((block:Block,index) => {
            console.log(block)
            return (
              <Box
                width={widthForBlocks(blockChain)}
                pr="5px"
                minWidth={100}
                minHeight={100}>
                <BlockDisplay key={index} block={block}/>
              </Box>
            )
          })
        }
      </Flex>
  )
}

export default BlockChainDisplay;
