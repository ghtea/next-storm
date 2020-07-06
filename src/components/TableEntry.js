import React from 'react';
import styled from 'styled-components';

import { NavLink } from 'react-router-dom';
import {Div, Table, Tr, Td} from '../styles/DefaultStyles';





const DivTableEntry = styled(Div)`
  
  padding-left: 20px;
  padding-right: 20px;
  
  
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  
`


/*
display:grid;
*/

const DivRow = styled(Div)`
  display: grid;
  grid-template-columns: 1fr 60px ${30*4}px 40px 40px; // min entire = 400 - 20*2 = 360
  grid-template-rows: 40px;
  
  background-color: ${props => props.theme.COLOR_normal};
  border-bottom: 1px solid ${props => props.theme.color_very_weak};
  
  
  &:nth-child(1) {
    border-top-left-radius:    10px;
    border-top-right-radius:   10px;
    
  }
  
  &:last-child {
    border-bottom-right-radius: 10px;
    border-bottom-left-radius:  10px;
    
    border-bottom-style: none;
    
  }
`



const RowPlayer = ({_id, mmr}) => {
  return (
    
    <DivRow >
      
         <DivBattletag> {_id}</DivBattletag>
         <Div> {mmr}</Div>
         
         <Div> Tank, Bruiser</Div>
         <Div> A </Div>
         <Div> View </Div>
         
      </DivRow>
  )
}



const DivBattletag = styled(Div)`
  padding-left: 5px;
  display: block;
  text-algin: left;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`




const TableEntry = () => {
   
  
    return (
    
    <DivTableEntry>
    
      
    
    </DivTableEntry>
    )
}

  
	  

export default TableEntry;