import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Media from 'react-media';

import * as config from '../../config';

import { connect } from "react-redux";
import {replaceData} from "../../redux/actions/basic";
import {replaceDataAuth, replaceData2Auth} from "../../redux/actions/auth";

import addDeleteNotification from "../../redux/thunks/addDeleteNotification";
import dictCode from '../../others/dictCode';

import { NavLink } from 'react-router-dom';
import {Div, Button, A, NavLinkDefault} from '../../styles/DefaultStyles';

import IconLogo from '../../svgs/brand/IconLogo';

import IconLoading from '../../svgs/basic/IconLoading';
import IconLogIn from '../../svgs/basic/IconLogIn';
import IconUser from '../../svgs/basic/IconUser';




const DivProfileMd_ = styled(Div)`
	
	height:100%;
	margin: 0;
		
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	
	width: 32px; /*  icon */



	& > a {
		width: auto;
	  height: 100%;
	  
	  
	  display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		
		color: ${props => props.theme.color_normal};
		font-weight: regular;
		
		text-decoration: none;
		text-align: center;
	
		color:  ${props => props.theme.color_normal };
		text-decoration: none;
		font-weight: bold;
	}

	
`

const DivIconProfile = styled(Div)`
	width: 32px;
	height: 32px;
`


const NavLinkStyled = styled(NavLinkDefault)`
  
	
`;




// img (svg) https://www.svgrepo.com/svg/154720/hexagon
const ProfileMd_ = ({
	match, location
	
	, language
	, auth     // 변화 잘 감지하기 위해서, readyUser 만 따로 빼놓기!
	, loadingUser, readyUser
	
	, themeName
	
	,replaceData, addDeleteNotification
	
	, replaceDataAuth, replaceData2Auth
	}) => {
	
	
	
	const [battletagName, setBattletagName] = useState("");
	const [battletagNumber, setBattletagNumber] = useState("");
 
	
	useEffect(()=>{
		if(readyUser === true && auth.battletag) {
			// 배틀태그를 아직 인증하지 않은 경우도 생각해야 한다. (그 경우 auth.battletag ="")
			
			const regexBattletag = /(#\d*)$/;
		  const listNumberBattletag = auth.battletag.match(regexBattletag);
		  
		  const battletagNameTemp = auth.battletag.replace(regexBattletag, "");
		  const battletagNumberTemp = listNumberBattletag[0];
		  
		  setBattletagName(battletagNameTemp)
		  setBattletagNumber(battletagNumberTemp)
		  //console.log(battletagName, battletagNumber);
		}
	}, [readyUser])
	

	return (
 
	
  <DivProfileMd_>

  	
		{ ( function() {
      if (loadingUser) {
      	return (
      		<A>
        		<DivIconProfile> <IconLoading width={"22px"} height={"22px"} color={"color_weak"} /> </DivIconProfile>
        	</A>
      	);
    	}
    	else if (!loadingUser && !readyUser) {
      	return (
					<NavLinkStyled to="/auth/log-in" > 
						<DivIconProfile> <IconLogIn width={"22px"} height={"22px"} color={"color_weak"} /> </DivIconProfile>
					</NavLinkStyled> 

				);
    	}
    	else {
    		return (
			<NavLinkStyled to="/" >
					<DivIconProfile> <IconUser width={"32px"} height={"32px"} color={"color_weak"} /> </DivIconProfile>
			</NavLinkStyled>
				)
    	}
    	
		} )() }
  	
		
	</DivProfileMd_>
	
	)
}

function mapStateToProps(state) { 
  return { 
    themeName: state.basic.themeName
    , language: state.basic.language
    
    , auth: state.auth
    

    , loadingUser: state.basic.loading.user
    , readyUser: state.basic.ready.user
  }; 
} 

function mapDispatchToProps(dispatch) { 
  return { 
    replaceData: (which, newThemeName) => dispatch( replaceData(which, newThemeName) ) 
    
    , addDeleteNotification: (code_situation, language, message, time) => dispatch(  addDeleteNotification(code_situation, language, message, time) )
    
    ,replaceDataAuth : (which, replacement) => dispatch(replaceDataAuth(which, replacement))
    ,replaceData2Auth : (which1, which2, replacement) => dispatch(replaceData2Auth(which1, which2, replacement))
  }; 
}


// TableEntry 컴포넌트에서 redux의 state, dispatch 를 일부분 골라서 이용가능하게 된다
export default connect(mapStateToProps, mapDispatchToProps)(ProfileMd_);
