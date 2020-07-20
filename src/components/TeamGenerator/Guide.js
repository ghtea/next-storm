import dotenv from 'dotenv';
import React, {useEffect, useState} from 'react';
import styled from 'styled-components';


import { NavLink, useHistory } from 'react-router-dom';

import {Div, Input, Button} from '../../styles/DefaultStyles';



import IconPlus from '../../svgs/basic/IconPlus'

import {CopyToClipboard} from 'react-copy-to-clipboard';



// STYLES
const DivGuide = styled(Div)`
  
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;



const DivGuideTitle = styled(Div)`
  margin-top: 20px;
  font-size: 1.2rem;
  font-weight: bold;
`



const DivBody = styled(Div)`
  
  width: 100%;
  max-width: 450px;
  
  margin-top: 20px;
  margin-left: 10px;
  margin-right: 10px;
  
	display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
`

const Part = styled(Div)`
  
  margin-top: 6px;
  margin-bottom: 6px;
  
	display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  
`

/*
border-bottom: 1px solid ${props => props.theme.color_weak};
  
  &:last-child {
    border: none;
  }
*/


const DivTitlePart = styled(Div)`
  
  width: 60px;
  height: 100%;
`

const DivGroupSentence = styled(Div)`
  font-size: 0.9rem;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  
  & > div {
  
    color: ${props => props.theme.color_normal};
    display: block;
    margin-left: 12px;
    
    margin-top: 3px;
    margin-bottom: 3px;
    
    text-align: left;
  }
`





 const Guide = ({
  
   
 }) => {

  
  
  return (
  <DivGuide>
    
    <DivGuideTitle> Guide </DivGuideTitle>

    
   <DivBody>
   
    <Part>
      <DivTitlePart> LINK </DivTitlePart>
      <DivGroupSentence>
        <Div> viewer link: for players who request to join </Div>
        <Div> editing link: for administrator who manage event </Div>
      </DivGroupSentence>
    </Part>
    
    <Part>
      <DivTitlePart> TEAMS </DivTitlePart>
      <DivGroupSentence>
        <Div> automatically generated teams using data of mmr, roles, leaders, ... </Div>
        <Div> leaders (crown) join teams first, being separated into different teams </Div>
      </DivGroupSentence>
    </Part>
    
    <Part>
      <DivTitlePart> JOIN </DivTitlePart>
      <DivGroupSentence>
        <Div> pending (clock): not confirmed for joining </Div>
        <Div> confirmed (check): confirmed for joining </Div>
      </DivGroupSentence>
    </Part>
    
    <Part>
      <DivTitlePart> MMR </DivTitlePart>
      <DivGroupSentence>
        <Div> required games: 100 (> 40 > 10) </Div>
        <Div> Storm League in current region > Quick Match in current region > Storm League in other region > ... </Div>
      </DivGroupSentence>
    </Part>
    
    <Part>
      <DivTitlePart> ROLES </DivTitlePart>
      <DivGroupSentence>
        <Div> choose main roles for each playe based on game number of each role</Div>
        <Div> the players who play less roles are separated into different teams </Div>
      </DivGroupSentence>
    </Part>
    
  
	    
   </DivBody>
  
  </DivGuide>
        
  
  )
}
  
  

// 컴포넌트에서 redux의 state, dispatch 를 일부분 골라서 이용가능하게 된다
export default Guide;