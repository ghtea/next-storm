import dotenv from 'dotenv';
import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';

//import path from 'path'
import { NavLink, useParams } from 'react-router-dom';

import { connect } from "react-redux";
import {replacePlayerTags} from "../../redux/store";
import {replacePlayerStatus} from "../../redux/store";
import readPlanTeam from "../../redux/thunks/readPlanTeam";
import addRemoveNotification from "../../redux/thunks/addRemoveNotification";

// https://reacttraining.com/blog/react-router-v5-1/

import {Div, Table, Tr, Td} from '../../styles/DefaultStyles';

import IconLoading from '../../svgs/IconLoading'

import IconConfirmed from '../../svgs/IconConfirmed'
import IconPending from '../../svgs/IconPending'
import IconInfo from '../../svgs/IconInfo'
import IconLeader from '../../svgs/basic/IconLeader'

import IconTank from '../../svgs/roles/IconTank'
import IconBruiser from '../../svgs/roles/IconBruiser'
import IconMeleeAssassin from '../../svgs/roles/IconMeleeAssassin'
import IconRangedAssassin from '../../svgs/roles/IconRangedAssassin'
import IconHealer from '../../svgs/roles/IconHealer'
import {CopyToClipboard} from 'react-copy-to-clipboard';

// 이상하게 dotenv.config() 안해도 된다 (오히려 하면 에러 발생...)
//dotenv.config() ;
//dotenv.config({ path: path.join(__dirname, '../../.env') });

const DivEntry = styled(Div)`
  width: auto;
  
  
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  
  padding-bottom: 10px;
`;

const DivEntryTitle = styled(Div)`
  font-size: 1.2rem;
  font-weight: bold;
  
  margin-top: 10px;
  height: 20px;
  margin-bottom: 5px;
`

const DivDescription = styled(Div)`
  font-weight: medium;
  margin-top: 5px;
  height: 15px;
  margin-bottom: 15px;
`



const DivTableEntry = styled(Div)`
  
  margin-left: 10px;
  margin-right: 10px;
  
  
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  
  @media (max-width: ${props => (props.theme.media.mid_big -1) }px ) {
    overflow-y: scroll;
    height: 320px;
  }
  
`

const DivIconLoading = styled(Div)`
  margin-top: 10px;
`

/*
display:grid;
*/

const DivRowHeader = styled(Div)`
  color: ${props => props.theme.color_weak};

  display: grid;
  grid-template-columns: 30px 150px 120px 60px 30px; // 20(padding) + 30 + 150 + 120 + 60 + 30 = 410 => 안전하게 small_mid 420 으로 하자
  grid-template-rows: 24px;
  
  @media (max-width: ${props => (props.theme.media.small_mid -1) }px ) {
    grid-template-columns: 30px 90px minmax(72px, auto) 60px 30px; // 
    grid-template-rows: 60px;
  }
  
  & > Div {
    font-weight: thin;
  }
  //background-color: ${props => props.theme.COLOR_normal};
   
  //border-radius:  8px;
`


const DivRowPlayer = styled(Div)`
  display: grid;
  grid-template-columns: 30px 150px 120px 60px 30px; // 20(padding) + 30 + 150 + 120 + 60 + 30 = 410
  grid-template-rows: 40px;
  
  @media (max-width: ${props => (props.theme.media.small_mid -1) }px ) {
    grid-template-columns: 30px 100px 80px 60px 30px; // 
    grid-template-rows: 60px;
  }
  
  
  border-bottom: 1px solid ${props => props.theme.color_very_weak};
  &:last-child {
    border-bottom-style: none;
  }
`

/*
const DivRowPlayer = styled(Div)`
  display: grid;
  grid-template-columns: 1fr 60px ${30*4}px 40px 40px; 
  grid-template-rows: 40px;
  
  background-color: ${props => props.theme.COLOR_normal};
  border-bottom: 1px solid ${props => props.theme.color_very_weak};
  
  
  &:nth-child(2) {
    border-top-left-radius:    10px;
    border-top-right-radius:   10px;
    
  }
  
  &:last-child {
    border-bottom-right-radius: 10px;
    border-bottom-left-radius:  10px;
    
    border-bottom-style: none;
    
  }

*/

const DivLeader = styled(Div)`
  
    
`

const DivBattletagHeader = styled(Div)`
  padding-left: 10px;
  
  display: block;
  text-algin: left;
`

const DivBattletag = styled(Div)`
  justify-self: start;
  
  padding-left: 10px;
  
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-end;
  
  cursor: pointer;
  
  @media (max-width: ${props => (props.theme.media.small_mid -1) }px ) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
`

const DivBattletagName = styled(Div)`
  
  width: auto;
  max-width: inherit;
  
  display: inline;
  text-algin: left;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const DivBattletagNumber = styled(Div)`
  font-size: 0.9rem;
  
  width: auto;
   
  color: ${props => props.theme.color_weak};
  display: inline;
  text-algin: left;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`


const DivRoles = styled(Div)`
  
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  
  & > div {
    width: auto;   // important!!!
    height: auto;
  }
  
  & > div > div {
    width: 20px;
    height: 20px;
    margin: 2px;
  }
`
const DivMmr = styled(Div)`
  font-size: 0.9rem;
`

const DivStatus = styled(Div)`
  
`;


const RowPlayer = ({
  idPlanTeam, battletag, mmr, regions, roles, statusPlayer, isLeader
  , replacePlayerTags, replacePlayerStatus, addRemoveNotification
}) => {
  
  useEffect(()=>{console.log("Each row has been rerendered")})
  
  
  
  const IconStatus = {
    pending: <IconPending width={"20px"} height={"20px"} />
    ,confirmed: <IconConfirmed width={"20px"} height={"20px"} />
  };
  
  const regexBattletag = /(#\d*)$/;
  const listNumberBattletag = battletag.match(regexBattletag);
  
  const battletagNumber = listNumberBattletag[0];
  const battletagName = battletag.replace(regexBattletag, "")
  
  
  const onClick_DivLeader = async (event) => {
    
    if (!isLeader) { 
      replacePlayerTags(battletag, "leader", true);
      
      
      await axios.put (`${process.env.REACT_APP_URL_AHR}/player/update-tags`,
        { 
          idPlanTeam: idPlanTeam
          , battletag: battletag
          , tag: "leader"
          , true_false: true
        }
      );
      
      if (statusPlayer === "pending") { // 만약 status 가 pending 때는 status 도 confirmed 로 한꺼번에 바꿔주기!
        replacePlayerStatus(battletag, "confirmed");
        
        await axios.put (`${process.env.REACT_APP_URL_AHR}/player/update-status`,
          { 
            idPlanTeam: idPlanTeam
            , battletag: battletag
            , status: "confirmed"
          }
        );
      }
      
    }
    
    else {
      replacePlayerTags(battletag, "leader", false);
      
      await axios.put (`${process.env.REACT_APP_URL_AHR}/player/update-tags`,
        { 
          idPlanTeam: idPlanTeam
          , battletag: battletag
          , tag: "leader"
          , true_false: false
        }
      );
      
      
    }
    
  }
  
  
  
  const onClick_DivStatus = async (event) => {
    
    let newStatus;
    if (statusPlayer === "pending") {
      replacePlayerStatus(battletag, "confirmed");
    
      await axios.put (`${process.env.REACT_APP_URL_AHR}/player/update-status`,
        { 
          idPlanTeam: idPlanTeam
          , battletag: battletag
          , status: "confirmed"
        }
      );
      
    }
    else { // if status was "confirmed"
      replacePlayerStatus(battletag, "pending");
    
      await axios.put (`${process.env.REACT_APP_URL_AHR}/player/update-status`,
        { 
          idPlanTeam: idPlanTeam
          , battletag: battletag
          , status: "pending"
        }
      );
      
      if (isLeader === true) {
        replacePlayerTags(battletag, "leader", false);
        
        await axios.put (`${process.env.REACT_APP_URL_AHR}/player/update-tags`,
          { 
            idPlanTeam: idPlanTeam
            , battletag: battletag
            , tag: "leader"
            , true_false: false
          }
        );
      }
    }
    
    
    replacePlayerStatus(battletag, newStatus);
    
    await axios.put (`${process.env.REACT_APP_URL_AHR}/player/update-status`,
      { 
        idPlanTeam: idPlanTeam
        , battletag: battletag
        , status: newStatus
      }
    );
    
  }
  
  

  return (
    
    <DivRowPlayer >
      
      <DivLeader onClick={onClick_DivLeader} > 
        <IconLeader
          
          width={"23px"}
          height={"18px"}
          isFilled={isLeader}
        />  
      </DivLeader >
      
      <CopyToClipboard 
        text={battletag}
        onCopy={ () => { addRemoveNotification("success", `'${battletag}' has been copied`) } } >
        
        <DivBattletag> 
          <DivBattletagName> {battletagName} </DivBattletagName>
          <DivBattletagNumber> {battletagNumber} </DivBattletagNumber>
        </DivBattletag>
        
      </CopyToClipboard>
      
      <DivRoles> 
        <Div> {(roles.includes("Tank"))? <IconTank width={"20px"} height={"20px"} /> : <Div></Div>} </Div>
        <Div> {(roles.includes("Bruiser"))? <IconBruiser width={"20px"} height={"20px"} /> : <Div></Div>} </Div>
        <Div> {(roles.includes("Melee Assassin"))? <IconMeleeAssassin width={"18px"} height={"20px"} /> : <Div></Div>} </Div>
        <Div> {(roles.includes("Ranged Assassin"))? <IconRangedAssassin width={"20px"} height={"20px"} /> : <Div></Div>} </Div>
        <Div> {(roles.includes("Healer"))? <IconHealer width={"15px"} height={"20px"} /> : <Div></Div>} </Div>
      </DivRoles>
      
      
      <DivMmr> 
        {mmr}
      </DivMmr>
       
      <DivStatus onClick={onClick_DivStatus}> 
        {IconStatus[statusPlayer]}
      </DivStatus>
        
       
         
    </DivRowPlayer>
  )
}




const Entry = ({
  idPlanTeam, listPlayerEntry
  , replacePlayerTags, replacePlayerStatus, addRemoveNotification
  
}) => {
  
  useEffect(()=>{console.log("Entry has been rerendered")})
  
  let listPlayer = (Object.keys(listPlayerEntry)).map(element=>listPlayerEntry[element]._id); // list of battletags
  
  
  
  const listPlayerConfirmed = listPlayer.filter(battletag => {
    const objPlayer = listPlayerEntry.find(objPlayer => objPlayer._id === battletag)
    return objPlayer.status === "confirmed"
  } )
  
  const listPlayerConfirmedLeader = listPlayerConfirmed.filter(battletag => {
    const objPlayer = listPlayerEntry.find(objPlayer => objPlayer._id === battletag)
    return objPlayer.tags.includes("leader");
  } )
  
  const listPlayerConfirmedNonLeader= listPlayerConfirmed.filter(battletag => {
    const objPlayer = listPlayerEntry.find(objPlayer => objPlayer._id === battletag)
    return !(objPlayer.tags.includes("leader"));
  } )
  
  
  
  const listPlayerPending = listPlayer.filter(battletag => {
    const objPlayer = listPlayerEntry.find(objPlayer => objPlayer._id === battletag)
    return objPlayer.status === "pending"
  } )
  
  const listPlayerShowing = [...listPlayerConfirmedLeader, ...listPlayerConfirmedNonLeader, ...listPlayerPending];
  
  
  return (
  
  <DivEntry>
    
    <DivEntryTitle> Entry </DivEntryTitle>
    <DivDescription> {`${listPlayerEntry.length} players`} </DivDescription>
    
    
    <DivTableEntry> 
    
    <DivRowHeader> 
      <Div>  </Div>
      <DivBattletagHeader>  battletag </DivBattletagHeader>
      <Div> roles </Div>
      <Div> mmr </Div>
      <Div>  </Div>
      
    </DivRowHeader>
    
    { 
      ( listPlayerShowing ).map( (battletag, i) => {
        
        const player = listPlayerEntry.find(objPlayer => objPlayer._id === battletag);
      
      return (
        < RowPlayer 
          
          key={ `${player._id}_${(new Date().getTime()).toString()}` }
          
          idPlanTeam={idPlanTeam}
          
          battletag={player._id} 
          
          regions ={player.regions}
          
          mmr={player.mmr.standard.NA} 
          
          roles ={player.roles}
          
          isLeader = {player.tags.includes("leader")}
          statusPlayer={player.status} 
          
          replacePlayerTags = {replacePlayerTags}
          replacePlayerStatus = {replacePlayerStatus}
          addRemoveNotification = {addRemoveNotification}
        />)
      }
      ) 
    }
      
    </DivTableEntry>
    
    
  </DivEntry>
    
  )
}

	  
//<button onClick= {refetch} > Refectch </button>



function mapStateToProps(state) { 
  return { 
    listPlayerEntry: [...state.planTeam.listPlayerEntry]
    ,idPlanTeam: state.planTeam._id
    //,workingAddPlayerToListPlayerEntry: state.working.addPlayerToListPlayerEntry
    //,readyPlanTeam: state.ready.planTeam
    //,loading: state.loading
  }; 
} 

function mapDispatchToProps(dispatch) { 
  return { 
    replacePlayerTags: (battletag, tag, true_false) => dispatch(replacePlayerTags(battletag, tag, true_false))
    ,replacePlayerStatus: (battletag, status) => dispatch(replacePlayerStatus(battletag, status))
    ,addRemoveNotification: (situation, message, time) => dispatch( addRemoveNotification(situation, message, time) )

  }; 
}


// TableEntry 컴포넌트에서 redux의 state, dispatch 를 일부분 골라서 이용가능하게 된다
// connect(mapStateToProps, mapDispatchToProps)(RowPlayer);    https://stackoverflow.com/questions/46276810/what-is-the-necessity-of-export-default-connect-when-you-are-connecting-your-r
export default connect(mapStateToProps, mapDispatchToProps)(Entry);