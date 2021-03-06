
import React, {useState} from 'react';
import styled from 'styled-components';

import axios from 'axios';
import * as config from '../../../config';

import { connect } from "react-redux";

import { replaceData2 } from "../../../redux/actions/basic";
import addDeleteNotification from "../../../redux/thunks/addDeleteNotification";


import { NavLink, useHistory } from 'react-router-dom';

import {Div, Input, Button, A} from '../../../styles/DefaultStyles';

import IconDelete from '../../../svgs/basic/IconDelete'
import IconShapesRegular from '../../../svgs/basic/IconShapesRegular';


const DivRowComp = styled(Div)`
  width: auto;
  max-width: 360px;
  height: 50px;
  
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  
  &:nth-child(n+2){
    border-top: 1px solid ${props=>props.theme.color_very_weak};
  }
  
  
  &>div:nth-child(n+2){
    margn-left: 20px;
  }
  
  
  &>div:nth-child(1){
    width:36px;
    
  }
  
  &>div:nth-child(2){
    
    width:160px;
    display: block;
    text-align: left;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    
    font-size: 1rem;
    font-weight: bold;
    
    cursor: pointer;
  }
  
  &>div:nth-child(3){
    width:40px;
    font-size: 0.9rem;
  }
  
  &>div:nth-child(4){
    width:60px;
    font-size: 0.9rem;
  }
  
  &>div:nth-child(5){
    width:36px;
    
    cursor: pointer;
    
  }
`

const ButtonDelete = styled(Button)`
  background-color: ${props => (props.stage === 0)? props.theme.COLOR_bg : props.theme.COLOR_delete};
  color: ${props => (props.stage === 0)? props.theme.color_very_weak : props.theme.color_delete};
  
  width: 30px;
  height: 30px;
  
  border-radius: 6px;
  
`

const RowComp =({
  language
  , comp
  
  , replaceData2
}) => {
  
  const history = useHistory();
  
  
  return (
    
    <DivRowPlan>
      
      <Div
        onClick={(event)=>{history.push(`/team-planner/${plan._id}`)} }
      > <IconFile width={"24px"} height={"24px"} color={"color_weak"} /> </Div>
      
      <Div
        onClick={(event)=>{history.push(`/team-planner/${plan._id}`)} }
      > {plan.title} </Div>
      
      <Div> {plan.listPlayerEntry.length} {(() => {
            switch (language) {
              case 'ko': 
                return '명';
              case 'ja': 
                return '名';
              default: // eng
                return 'ppl';
            }
  	      })()}</Div>
      
      <Div> {`${month} / ${day}`} </Div>
      
      <ButtonDelete
        onClick={(event) => onClick_ButtonDelete(event)}
        stage={stageDelete}
      > <IconDelete width={"18px"} height={"18px"} color={(stageDelete===0)? "color_weak" : "color_delete"} /> </ButtonDelete>
    
    </DivRowPlan>
    
  )
}



const DivListPlan = styled(Div)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  
`;



 const ListPlan = ({
   
  listPlan
  , user
  , language
  
  , replaceData2
  , addDeleteNotification
  
 }) => {
  
  
  return (
  
  <DivListPlan>
    {listPlan.map(plan=>{
      return(
        <RowPlan
          key={plan._id}
          plan={plan}
          language={language}
          replaceData2={replaceData2}
        />
      )
    })}
  </DivListPlan>
  
  )

}
  
	  


function mapStateToProps(state) { 
  return { 
    
    listPlan: state.team_planner.listPlan
    
    , user: state.auth.user
    , language: state.basic.language
    
    , readyListPlan: state.basic.ready.listPlan
    , loadingListPlan: state.basic.loading.listPlan
  }; 
} 

function mapDispatchToProps(dispatch) { 
  return { 
    addDeleteNotification: (code_situation, language, message, time) => dispatch(  addDeleteNotification(code_situation, language, message, time) )
    
    , replaceData2: (which1, which2, replacement) => dispatch(replaceData2(which1, which2, replacement))

  }; 
}

// 컴포넌트에서 redux의 state, dispatch 를 일부분 골라서 이용가능하게 된다
export default connect(mapStateToProps, mapDispatchToProps)(ListPlan);