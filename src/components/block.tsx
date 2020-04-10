import React, {FC} from 'react';
import {Block as BlockType} from '../utils/blockchain'


interface BlockProps {
  block: BlockType;
}

const Block:FC<BlockProps> = ({block}) => {


  return (
      <ul>
        <li>Timestamp: {block.timestamp}</li>
        <li>Index: {block.index}</li>
        <li>Message: {block.content.message}</li>
        <li>Hash: {block.hash}</li>
        <li>Previous Hash: {block.previousHash}</li>
      </ul>
  )
}

export default Block;

