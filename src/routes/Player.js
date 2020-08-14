import React, {useEffect, useRef} from 'react';
import dotenv from 'dotenv';

import styled from 'styled-components';
import axios from 'axios';
import queryString from 'query-string';
import { Route, NavLink, Switch } from 'react-router-dom';

import * as config from '../config';

import General from "../components/Stats/General"

import SubPlayer from "../components/Stats/SubPlayer"

import { connect } from "react-redux";

import {replaceData, replaceReady, replaceLoading, replaceWorking, replaceAuthority, replaceData2} from "../redux/actions/basic";



import addDeleteNotification from "../redux/thunks/addDeleteNotification";
import dictCode from '../others/dictCode';

import {Div, Input, Button} from '../styles/DefaultStyles';

import Loading from '../components/_/Loading'



const DivPlayer = styled(Div)`
  width: 100%;
  
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  
  @media (min-width:  ${props => props.theme.media.md }px) {
    
  }
`;





const Main = styled(Div)`
  
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  
  width: 360px; /* 여기서 부터 360 고정! */ 
  height: auto;
  
  
  margin-top: 50px; 
  
  
  @media (min-width:  ${props => (props.theme.media.md) }px) {
    
    width: 100%;
    margin-top: 60px; 
    
    overflow: auto; /* important!!! */
    
  }
`




const Player = ({
  
  match, location
  
  , authority, language
  
  , readyDictAllHeroBasic
  , readyListAllMap
  , readyListMapStandardRanked
  
  //, replaceAuthority
  
  , replaceDataHots
  , replaceData2Hots
  
  , replaceData
  , replaceData2
  
  , addDeleteNotification
  
}) => {
  
  
   return (
   <DivPlayer>
    
      <SubPlayer/>
      
    
      <Main>
        <Switch>
        
          <Route path="/player/general" component={General} />
          <Route path="/player/general/:battletag" component={General} />
          
        </Switch>
      </Main>
    
  
    </DivPlayer>
    )
}
  
 
    
 //CompGallery



function mapStateToProps(state) { 
  return { 
    authority: state.basic.authority.comp_gallery
    , language: state.basic.language
    
    //, readyDictAllHeroBasic: state.basic.ready.dictAllHeroBasic
  }; 
} 

function mapDispatchToProps(dispatch) { 
  return { 
    //readPlanTeam: (idPlanTeam) => dispatch(readPlanTeam(idPlanTeam)) 
    
    //,replaceData: (which, newData) => dispatch(replaceData(which, newData))
    //,replaceLoading: (which, true_false) => dispatch(replaceLoading(which, true_false)) 
    //,replaceReady: (which, true_false) => dispatch(replaceReady(which, true_false)) 
    
    //replaceAuthority: (which, authority) => dispatch(replaceAuthority(which, authority))
    
    replaceDataHots : (which, replacement) => dispatch(replaceDataHots(which, replacement))
    ,replaceData2Hots : (which1, which2, replacement) => dispatch(replaceData2Hots(which1, which2, replacement))
    
    ,replaceData : (which, replacement) => dispatch(replaceData(which, replacement))
    ,replaceData2 : (which1, which2, replacement) => dispatch(replaceData2(which1, which2, replacement))
    
    , addDeleteNotification: (code_situation, language, message, time) => dispatch(  addDeleteNotification(code_situation, language, message, time) )
  }; 
}

// 컴포넌트에서 redux의 state, dispatch 를 일부분 골라서 이용가능하게 된다
export default connect(mapStateToProps, mapDispatchToProps)(Player);
