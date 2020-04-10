import React, {FC} from 'react';
import {Block as BlockType} from '../utils/blockchain'
import styled from "styled-components";
import {Box, Flex} from "rebass";


interface BlockProps {
  block: BlockType;
}

const MorphFlex = styled(Flex)`
  border-radius: 20px;
  background: #feffff;
  box-shadow:  20px 20px 60px #d8d9d9,
               -20px -20px 60px #ffffff;
`;

const MorphBox = styled(Box)`
  font-size: xx-small;
`;

const Block:FC<BlockProps> = ({block}) => {


  return (
      <MorphFlex flexWrap="wrap">
        <MorphBox width={1} p={1}>Hash: {block.hash.substr(0,10)}</MorphBox>
        <MorphBox width={1} p={1}>Previous Hash: {block.previousHash.substr(0,10)}</MorphBox>
        <MorphBox width={1} p={1}>Message: {block.content.message}</MorphBox>
        <MorphBox width={1} p={1} >Timestamp: {block.timestamp}</MorphBox>
        <MorphBox width={1} p={1}>Index: {block.index}</MorphBox>
      </MorphFlex>
  )
}

export default Block;

