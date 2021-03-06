import dotenv from 'dotenv';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ReactPlayer from 'react-player';

import axios from 'axios';
import queryString from 'query-string';

import { connect } from "react-redux";
import * as config from '../../config';

import addDeleteNotification from "../../redux/thunks/addDeleteNotification";
import dictCode from '../../others/dictCode'

import { replaceData2 } from "../../redux/actions/basic";
import { replaceDataCompGallery, replaceData2CompGallery } from "../../redux/actions/comp_gallery";


import {  NavLink, useHistory } from 'react-router-dom';

import { Div, Input, Button } from '../../styles/DefaultStyles';

import Loading from '../_/Loading';



import shapes from "../../profile/shapes";
import palettes from "../../profile/palettes";
import borders from "../../profile/borders";


import ProfileSample from '../_/ProfileSample';





const DivProfiles = styled(Div)
`
  width: 100%;
  
  padding: 20px;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  
`;


const DivListProfile = styled(Div)
`
   
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  
  flex-wrap: wrap;
  
  margin-top: 20px;
  margin-bottom: 20px;
  
  & > div {
    margin: 2px;
  }
`





const Profiles = ({

  language
  
  , location
  
  , user
  , readyUser
  
  
  , replaceData2CompGallery, replaceData2
  
  , addDeleteNotification
}) => {

  

  return (

  <DivProfiles>


    
      <DivListProfile>
        { Object.keys(shapes).map(element=>
          
          <ProfileSample 
            key={`${element}-Default-Default`}
            
            shape = {element}
            palette = {(readyUser)? user.profile.listIdPalette[0] : "Default"}
            border = {(readyUser)? user.profile.listIdBorder[0] : "Default"}
            
            
            size = {40}
            layout = {"icon only"}
            />
        )}
      </DivListProfile>
      
      
      <DivListProfile>
        { Object.keys(palettes).map(element=>
          
          <ProfileSample 
            key={`Default-${element}-Default`}
            
            shape = {(readyUser)? user.profile.listIdShape[0] : "Default"}
            palette = {element}
            border = {(readyUser)? user.profile.listIdBorder[0] : "Default"}
           
            
            size = {40}
            layout = {"icon only"}
            />
        )}
      </DivListProfile>
      
      
      <DivListProfile>
        { Object.keys(borders).map(element=>
          
          <ProfileSample 
            key={`Default-Default-${element}`}
            
            shape = {(readyUser)? user.profile.listIdShape[0] : "Default"}
            palette = {(readyUser)? user.profile.listIdPalette[0] : "Default"}
            border = {element}
            
            
            size = {40}
            layout = {"icon only"}
            />
        )}
      </DivListProfile>
      
      

    </DivProfiles>

  )

}




function mapStateToProps(state) {
  return {

    language: state.basic.language
    
    , user: state.auth.user
    , readyUser: state.basic.ready.user
    
    , listVideo: state.comp_gallery.videos.listVideo
    , readyListVideo: state.basic.ready.listVideo
    , loadingListVideo: state.basic.loading.listVideo
    
  };
}

function mapDispatchToProps(dispatch) {
  return {

    replaceDataCompGallery: (which, replacement) => dispatch(replaceDataCompGallery(which, replacement)),
    replaceData2CompGallery: (which1, which2, replacement) => dispatch(replaceData2CompGallery(which1, which2, replacement))

    ,
    replaceData2: (which1, which2, replacement) => dispatch(replaceData2(which1, which2, replacement))

    ,
    addDeleteNotification: (code_situation, language, message, time) => dispatch(addDeleteNotification(code_situation, language, message, time))
  };
}

// 컴포넌트에서 redux의 state, dispatch 를 일부분 골라서 이용가능하게 된다
export default connect(mapStateToProps, mapDispatchToProps)(Profiles);