
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import axios from 'axios';
import queryString from 'query-string';

import { connect } from "react-redux";
import * as config from '../../config';
import storage from '../../tools/vanilla/storage';

import addDeleteNotification from "../../redux/thunks/addDeleteNotification";
import dictCode from '../../others/dictCode'

import { replaceData2 } from "../../redux/actions/basic";
import { replaceDataPlayer, replaceData2Player } from "../../redux/actions/player";


import {  NavLink, useHistory, useParams } from 'react-router-dom';

import { Div, Input, Button, Img } from '../../styles/DefaultStyles';

import Loading from '../_/Loading'

import useInput from '../../tools/hooks/useInput';

import IconSync from '../../svgs/basic/IconSync';
import flagNA from '../../images/flags/NA.png';
import flagEU from '../../images/flags/EU.png';
import flagKR from '../../images/flags/KR.png';
import flagCN from '../../images/flags/CN.png';

import IconTank from '../../svgs/roles/IconTank'
import IconBruiser from '../../svgs/roles/IconBruiser'
import IconMelee from '../../svgs/roles/IconMeleeAssassin'
import IconRanged from '../../svgs/roles/IconRangedAssassin'
import IconHealer from '../../svgs/roles/IconHealer'
import IconSupport from '../../svgs/roles/IconSupport'

import borders from "../../profile/borders";


const DivGeneral = styled(Div)
`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  
`;


const DivInputBattletag = styled(Div)`
  width: auto;
  
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  
  & > *:nth-child(1){
    border-radius: 8px 0 0 8px;
    width: 180px;
    height: 40px;
    margin: 0;
  }
  
  & > *:nth-child(2){
    background-color: ${props => props.theme.color_very_weak};
    border-radius: 0 8px 8px 0;
    width: 40px;
    height: 40px;
    margin: 0;
  }
  
`

const DivUpdated = styled(Div)`
  margin-top: 20px;
  margin-bottom: 5px;
  
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  
  & > div {
    width: auto;
    color: ${props => props.theme.color_weak};
  }
  
  & > div:nth-child(n+2){ margin-left: 8px;}
`


const DivContainer = styled(Div)`

  width: 350px;
  border-radius: 15px;
  
  margin-bottom: 20px;
  
  background-color: ${props => props.theme.COLOR_normal};
  
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`

const DivHeader = styled(Div)`
  width: 100%;
  height: 60px;
  
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  
  & > div {
    width: auto;
    
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    
    &:first-child { margin-left: 10px; }
    &:last-child {margin-right: 10px; }
    
    & > div {
      width: auto;
      margin: 2px;
    }
  }
  
  
`
const DivIdentification = styled(Div)`
  & > *:nth-child(2) {
    font-size: 1.2rem;
    font-weight: bold;
    
    width: auto;
    max-width: 140px;
    display: block;
    text-align: left;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  
  & > *:nth-child(3) {
    font-size: 1rem;
    font-weight: normal;
  }
`

const ImgFlagMain = styled(Img)`
  width: auto;
  height: 30px;
`

const DivFlagNormal = styled(Div)`
  padding-top: 6px;
  padding-bottom: 2px;
  border-bottom: 4px solid  ${props => (props.active)? props.theme.color_active : "transparent"};
`

const ImgFlagNormal = styled(Img)`
  width: auto; /* 26.667 로 예상 */
  height: 20px;
`



/////
const DivBody = styled(Div)`
  width: 100%;
  
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  
  padding-bottom: 10px;
`


const DivStatAll = styled(Div)`
  width: 100%;
  height: 200px;
  
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  
  &>div {
    width: 50%;
  }
  
`

const DivModeTitle = styled(Div)`
  font-size: 1.2rem;
  font-weight: bold;

  color: ${props => props.theme.color_normal};

`



const DivGamesAll = styled(Div)`
  
  margin-top: 5px;
  margin-bottom: 5px;
  
  width: auto;
  height: 40px;
  
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  
  & > div:nth-child(1){
    
    display: block;
    text-align: right;
    font-weight: bold;
    
    color: ${props => props.theme.color_normal};
    
    font-size: ${props => {
      if (props.games_played > 1000) { return 1.7; }  
      else if (props.games_played > 700) { return 1.5; }  
      else if (props.games_played > 400) { return 1.3; }  
      else if (props.games_played > 200) { return 1.1; }  
      else if (props.games_played > 50) { return 0.9; }  
    }}rem;
  }
  
  & > div:nth-child(2){
    
    display: block;
    text-align: left;
    margin-left: 3px;
    font-size: 0.8rem;
    color: ${props => props.theme.color_weak}
  }
`


const DivRank = styled(Div)`
  width: 90px;
  height: 50px;
  
  border-radius: 9px;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  color: ${props => props.theme.COLOR_normal};
  ${props => {
    switch (props.league_tier) {
      case 'bronze':
        return borders['Bronze'];
      case 'silver':
        return borders['Silver'];
      case 'gold':
        return borders['Gold'];
      case 'platinum':
        return borders['Platinum'];
      case 'diamond':
        return borders['Diamond'];
      case 'master':
        return borders['Master'];
      default:
        return `background-color: ${props => props.theme.color_very_weak};`
    }
  }}
  
  & > div:nth-child(1){
    height: 18px;
    font-size: 1rem;
  }
  & > div:nth-child(2){
    height: 18px;
    font-size: 1rem;
  }
`


const DivStatRoles = styled(Div)`
  width: 100%;
  
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  
`

const DivEachRole = styled(Div)`
  width: 50px;
    
  &:nth-child(n+2){ margin-left: 5px; }
  
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  
`

const DivGraph = styled(Div)`
  height: 140px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
`

const DivGames = styled(Div)`
  color: ${props => props.theme.color_weak};
  width: auto;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  & > div:nth-child(1) {
    font-size: 1rem;
    height: 16px;
  }
  & > div:nth-child(2) {
    font-size: 0.8rem;
    height: 12px;
  }
  margin-bottom: 4px;
`

// 현재 최대 width px: 50
const DivBar = styled(Div)`
  border-radius: 3px 3px 0 0;
  
  background-color: ${props => {
    if (props.ratio > 0.3) { return props.theme.color_active }
    else if (props.ratio > 0.16) { return props.theme.color_weak }
    else { return props.theme.color_very_weak }
  }};
  
  
  height: ${props => props.ratioAgainstMax * 90 }px;
  width: ${props => {
    if (props.games < 50){
      return props.games / 50 * 50
    } 
    else {
      return 50
    }
  }}px;
`



const DivIconRole = styled(Div)`
  height: 40px;
  /*border-top: 2px solid ${props => props.theme.color_weak};*/
`

const DivMmr = styled(Div)`
  height: 30px;
  width: 40px;
  border-radius: 5px;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  
  ${props => {
    switch (props.league_tier) {
      case 'bronze':
        return borders['Bronze'];
      case 'silver':
        return borders['Silver'];
      case 'gold':
        return borders['Gold'];
      case 'platinum':
        return borders['Platinum'];
      case 'diamond':
        return borders['Diamond'];
      case 'master':
        return borders['Master'];
      default:
        return `background-color: ${props => props.theme.color_very_weak};`
    }
  }}
    
  
  color: ${props => props.theme.COLOR_normal};
  
  & > div:nth-child(1) { font-size: 0.8rem;  height: 12px; }  
  & > div:nth-child(2) { font-size: 0.9rem;  height: 15px; }  
`



const DivChooseMode = styled(Div)`
  
  margin-top: 10px;
  
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  
  & > * {
    font-size: 0.9rem;
    width: auto;
    height: 24px;
    &:nth-child(n+2) { margin-left: 4px; }
  }
`

const ButtonChooseMode = styled(Button)`
  background-color: transparent;
  border-radius: 0;
  padding: 0;
  margin:0;
  &:nth-child(n+2) { margin-left: 8px; }
  
  font-size: 1rem;
  width: auto;
  height: 24px;
  
  font-weight: ${props => (props.active)? "bold" : "normal"};
  color: ${props => (props.active)? props.theme.color_active : props.theme.color_weak};
  
  padding-top: 2px;
  
  border: none;
  border-bottom: 2px solid  ${props => (props.active)? props.theme.color_active : "transparent"};
`


const General = ({

  language
  , user
  
  , playerGeneral
  , readyPlayerGeneral
  , loadingPlayerGeneral
  
  , replaceData2
  , replaceDataPlayer
  , replaceData2Player

  , addDeleteNotification
}) => {
  
  // input 안의 battletag 있는 상태로 update 버튼 ->   history.push() ? 
  
  // params 에 battletag 있으면 ->
    // local storage 에 있고, 업데이트 하루 안이면 local storage 꺼 읽기
    // local sotrge에 없거나 업데이트 오래전이면 -> @업데이트
    
  // input 에 battletag 담긴 상태에서 유저가 update 버튼 누르면 -> @업데이트
  
  const history = useHistory();
  const params = useParams();
  
  const inputBattletag = useInput("");
  const [triggerUpdate, setTriggerUpdate] = useState("")
  const [updatedText, setUpdatedText] = useState("")
  
  // 화면에 표시할 정보 정리
  const [nameRegionShowing, setNameRegionShowing] = useState("");
  const [modeShowing, setModeShowing] = useState("Both"); // for roles 
  
  const [readyShowing, setReadyShowing] = useState(false);
  
  const [showing, setShowing] = useState({
    battletagName: ""
    , battletagNumber: ""
    , orderNameRegion: []
    , stats : {
      All: {}
      ,  "Tank": {}
      ,  "Bruiser": {}
      ,  "Melee Assassin": {}
      ,  "Ranged Assassin": {}
      ,  "Healer": {}
      ,  "Support": {}
    }
  })
  
  // const urlBattletag = encodeURIComponent(battletag);
  
  useEffect(()=>{
    if (params.battletagEncoded){
      
      
      if (params.battletagEncoded === "undefined") {
        return;
      }
      
      else {  
        const battletag = decodeURIComponent(params.battletagEncoded)
        replaceData2("ready", "playerGeneral", false);
        replaceData2("loading", "playerGeneral", true);
        
        
        inputBattletag.setValue(battletag);
        
        //const updated = Date.parse( storage.get("updatedPlayerGeneral") );
        const dictUpdatedPlayerGeneral = storage.get("dictUpdatedPlayerGeneral"); // 우선 JSON.parse 는 거친다
        
        if (dictUpdatedPlayerGeneral &&  dictUpdatedPlayerGeneral[battletag] && ( dictUpdatedPlayerGeneral[battletag] > new Date().getTime() - 1000 * 60 * 60 * 24 * 1 ) ) {
          
          const dictPlayerGeneral = storage.get("dictPlayerGeneral"); // 우선 JSON.parse 는 거친다
          
          if (dictPlayerGeneral && dictPlayerGeneral[ battletag ]) {
            
            const updatedDate = new Date (dictUpdatedPlayerGeneral[battletag]);
            const month = updatedDate.getUTCMonth() + 1; //months from 1-12
            const day = updatedDate.getUTCDate();
            const year = updatedDate.getUTCFullYear();
            
            setUpdatedText(`${year}. ${month}. ${day}`);
            
            const thisPlayerGeneral = dictPlayerGeneral[ battletag ];
                      
            
            let replacement = { };
            replacement[battletag] = thisPlayerGeneral;
            replaceDataPlayer("general", replacement );
            
            replaceData2("loading", "playerGeneral", false);
            replaceData2("ready", "playerGeneral", true); 
            
          }
          
        }
        
        else {
          
          setTriggerUpdate(Date.now().toString());
          
        }
        
        
      } // else
      
    } // if
  },[])
  
  
  const onClick_Update = () => {
    if (inputBattletag.value) {
      history.push(`/player/general/${encodeURIComponent(inputBattletag.value)}`);
      setTriggerUpdate(Date.now().toString());
    }
  }
  
  
  // trigger 변하면 무조건 업데이트
  useEffect(() => {
    (async() => {
      
      if ( inputBattletag.value ) {
        try {
          
           
          replaceData2("ready", "playerGeneral", false);
          replaceData2("loading", "playerGeneral", true);
          
          const resRegions = await axios.get(`${config.URL_API_NS}/player/regions/${encodeURIComponent(inputBattletag.value)}`);
          const listNameRegion = resRegions.data.listNameRegion;
          // [ 'NA', 'KR' ]
          
          //console.log(listNameRegion);
          
          const query = queryString.stringify({
            listNameRegion: listNameRegion
          });
          
          
          const resPlayerGeneral = await axios.get(`${config.URL_API_NS}/player/general/${encodeURIComponent(inputBattletag.value)}?` + query);
          const playerGeneralNew = resPlayerGeneral.data;
          
          
          
          let dictPlayerGeneralTemp = storage.get("dictPlayerGeneral") || {};
          dictPlayerGeneralTemp[ inputBattletag.value ] = playerGeneralNew;
          storage.set("dictPlayerGeneral", dictPlayerGeneralTemp );
          
          
          let dictUpdatedPlayerGeneralTemp = storage.get("dictUpdatedPlayerGeneral") || {};
          dictUpdatedPlayerGeneralTemp[ inputBattletag.value ] =  Date.now();
          storage.set("dictUpdatedPlayerGeneral", dictUpdatedPlayerGeneralTemp );
          
          let replacement = { };
          replacement[inputBattletag.value] = playerGeneralNew;
          replaceDataPlayer("general", replacement );
          replaceData2("loading", "playerGeneral", false);
          replaceData2("ready", "playerGeneral", true);
          
          
          const updatedText = new Date();
          const month = updatedText.getUTCMonth() + 1; //months from 1-12
          const day = updatedText.getUTCDate();
          const year = updatedText.getUTCFullYear();
          setUpdatedText(`${year}. ${month}. ${day}`);
    
        } catch (error) {
          replaceData2("ready", "playerGeneral", false);
          replaceData2("loading", "playerGeneral", false);
          
          addDeleteNotification("basic01", language);
          console.log(error)
        }
        
      }
     
    })() // async

  }, [ triggerUpdate ])
  
  
  
  
  
  
  
  
  // 처음 데이터 불러왔을 때 / 로컬 스토리지에서 읽었을 때
  useEffect(()=>{
    
    if (readyPlayerGeneral) {
      
      let showingTemp = showing;
      
        const battletagFull = Object.keys(playerGeneral)[0]
        
        
        const regexBattletag = /(#\d*)$/;
  		  const listNumberBattletag = battletagFull.match(regexBattletag);
  		  const battletagName = battletagFull.replace(regexBattletag, "");
  		  const battletagNumber = listNumberBattletag[0];
  		  
  		showingTemp['battletagName'] = battletagName;
  		showingTemp['battletagNumber'] = battletagNumber;
  		  
  		  const orderNameRegion = Object.keys(playerGeneral[battletagFull]);
  		  //console.log(orderNameRegion)
  		
  		
  		showingTemp['orderNameRegion'] = orderNameRegion;
  		
    		if (nameRegionShowing === ""){
    		  setNameRegionShowing(orderNameRegion[0])
    		}
    
    
      	// finally  
  		setShowing(showingTemp);
		  
    } // if
    
  }, [readyPlayerGeneral])
  		
    
    
    // 메인 지역 알아냈을 때/ 보일 지역 변경했을 때
  useEffect(()=>{
    
    
    setReadyShowing(false);
    
    if (readyPlayerGeneral && nameRegionShowing !== "" ) {
      

      
      const battletagFull = Object.keys(playerGeneral)[0]
      let showingTemp = showing;
      
		  const listRole_withAll = ['All', 'Tank', 'Bruiser', 'Melee Assassin', 'Ranged Assassin', 'Healer', 'Support'];
		  for (const role of listRole_withAll) {
		    
		    showingTemp['stats'][role] = {
		      "Quick Match": { games_played: 0, mmr:0, league_tier: ""}
    		  , "Storm League": { games_played: 0, mmr:0, league_tier: ""}
    		  , "Both": { games_played: 0 }
		    }
		    
		    if (playerGeneral[battletagFull][nameRegionShowing][role] && playerGeneral[battletagFull][nameRegionShowing][role]['Quick Match']) {
		      showingTemp['stats'][role]["Quick Match"] = playerGeneral[battletagFull][nameRegionShowing][role]['Quick Match'];
		      showingTemp['stats'][role]["Both"]['games_played'] += playerGeneral[battletagFull][nameRegionShowing][role]['Quick Match']['games_played'];
		    }
		    
		    if (playerGeneral[battletagFull][nameRegionShowing][role] && playerGeneral[battletagFull][nameRegionShowing][role]['Storm League']) {
		      showingTemp['stats'][role]["Storm League"] = playerGeneral[battletagFull][nameRegionShowing][role]['Storm League'];
		      showingTemp['stats'][role]["Both"]['games_played'] += playerGeneral[battletagFull][nameRegionShowing][role]['Storm League']['games_played'];
		    }
		    
		    showingTemp['stats'][role]["Quick Match"]['ratio'] = showingTemp['stats'][role]['Quick Match']['games_played'] / showingTemp['stats']["All"]['Quick Match']['games_played'];
		    showingTemp['stats'][role]["Storm League"]['ratio'] = showingTemp['stats'][role]['Storm League']['games_played'] / showingTemp['stats']["All"]['Storm League']['games_played'];
		    showingTemp['stats'][role]["Both"]['ratio'] = showingTemp['stats'][role]['Both']['games_played'] / showingTemp['stats']["All"]['Both']['games_played'];

		  } // for
		  
		  
		  // 역할 중에서 ratio 최대값 찾기 (모드 별로!)
		  // listRoel 하나 가지고 sort 하면 이해는 못하겠지만 sort 가 한번만 된다!! (listRole 을 let 으로 해도 마찬가지..)
      const listRole1 = ['Tank', 'Bruiser', 'Melee Assassin', 'Ranged Assassin', 'Healer', 'Support'];
      const listRole2 = ['Tank', 'Bruiser', 'Melee Assassin', 'Ranged Assassin', 'Healer', 'Support'];
      const listRole3 = ['Tank', 'Bruiser', 'Melee Assassin', 'Ranged Assassin', 'Healer', 'Support'];
      
       
      const orderRole_QM = listRole1.sort((role1, role2) => showingTemp['stats'][role2]["Quick Match"]['games_played'] - showingTemp['stats'][role1]["Quick Match"]['games_played']  );
      const orderRole_SL = listRole2.sort((role1, role2) => showingTemp['stats'][role2]["Storm League"]['games_played'] - showingTemp['stats'][role1]["Storm League"]['games_played'] );
      const orderRole_Both = listRole3.sort((role1, role2) => showingTemp['stats'][role2]["Both"]['games_played'] - showingTemp['stats'][role1]["Both"]['games_played'] );
      
      const mostRole_QM = orderRole_QM[0];
      const mostRole_SL = orderRole_SL[0];
      const mostRole_Both = orderRole_Both[0];
      
      showingTemp['graph'] = {
        'Quick Match': { ratioMax: showingTemp['stats'][mostRole_QM]['Quick Match']['ratio'] }
        , 'Storm League': { ratioMax: showingTemp['stats'][mostRole_SL]['Storm League']['ratio'] }
        , 'Both': { ratioMax: showingTemp['stats'][mostRole_Both]['Both']['ratio'] }
      }
      
		// finally  

		
		setShowing(showingTemp);
		setReadyShowing(true);
		
    } // if
  
    
  }, [readyPlayerGeneral, nameRegionShowing] )
  
  
  
  const objFlag = {
    NA: flagNA,
    EU: flagEU,
    KR: flagKR,
    CN: flagCN
  };
  
  
  const returnIconRole = (nameRole, ratio) => {
    
    let color;
    
    if ( ratio > 0.3) { color = 'color_active' }
    else if ( ratio > 0.16) { color = 'color_weak' }
    else { color = 'color_very_weak' }
    
    
    switch(nameRole) {
      case "Tank": 
        return (<IconTank width={"24px"} height={"24px"}  color={color} />)
      case "Bruiser": 
        return (<IconBruiser width={"24px"} height={"24px"}  color={color} />)
      case "Melee Assassin": 
        return (<IconMelee width={"24px"} height={"24px"}  color={color} />)
      case "Ranged Assassin": 
        return (<IconRanged width={"24px"} height={"24px"}  color={color} />)
      case "Healer": 
        return (<IconHealer width={"24px"} height={"24px"}  color={color} />)
      case "Support": 
        return (<IconSupport width={"24px"} height={"24px"} color={color} />)
    }
  }
  
  
  const returnDivEachRole = (nameRole) => {
    
    return (
      
      <DivEachRole> 
        <DivGraph> 
          <DivGames>
            <Div> {showing['stats'][nameRole][modeShowing]['games_played']} </Div>
            <Div> {(() => {
                      switch (language) {
                        case 'ko': 
                          return '게임';
                        case 'ja': 
                          return 'ゲーム';
                        default: // eng
                          return 'games';
                      }
                    })()}  </Div>
          </DivGames>
          
          <DivBar 
            ratio={ showing['stats'][nameRole][modeShowing]['ratio']}
            ratioAgainstMax={ showing['stats'][nameRole][modeShowing]['ratio'] / showing['graph'][modeShowing]['ratioMax']}
            games={ showing['stats'][nameRole][modeShowing]['games_played'] }
          >  
          </DivBar>
        </DivGraph>
        
        <DivIconRole> {returnIconRole(nameRole, showing['stats'][nameRole][modeShowing]['ratio'] )}  </DivIconRole>
        
        {(modeShowing === "Quick Match" || modeShowing === "Storm League") &&
          <DivMmr
            league_tier={showing['stats'][nameRole][modeShowing]['league_tier']}
          >    <Div> mmr </Div>    <Div> {showing['stats'][nameRole][modeShowing]['mmr']} </Div>    
          </DivMmr>
        }
      </DivEachRole>
        
    )
  }
  
  
  
  
  return (
    
      <DivGeneral>
        
        <DivInputBattletag>
          <Input {...inputBattletag} placeholder="battletag#1234" />
          <Button onClick={onClick_Update} > <IconSync width={'24px'}  height={'24px'} color={'COLOR_normal'} /> </Button>
        </DivInputBattletag>
        
        { (!loadingPlayerGeneral && readyPlayerGeneral && readyShowing) &&
          <DivUpdated>
            <Div> {(() => {
                          switch (language) {
                            case 'ko': 
                              return '업데이트: ';
                            case 'ja': 
                              return 'アップデート: ';
                            default: // eng
                              return 'updated: ';
                          }
                        })()} </Div>
            <Div> {updatedText} </Div>
          </DivUpdated>
        }
        
        { loadingPlayerGeneral && <Loading/> }
        
        { (!loadingPlayerGeneral && readyPlayerGeneral && readyShowing) &&
          <DivContainer>
          
            <DivHeader>  
            
              <DivIdentification> 
                <Div> <ImgFlagMain src={objFlag[nameRegionShowing]} /> </Div>
                <Div> {showing["battletagName"] } </Div>
                <Div> {showing["battletagNumber"] } </Div>
              </DivIdentification>
              
              <Div> 
                {showing['orderNameRegion'].map(element=>
                  <DivFlagNormal
                    key={`flagNormal-${element}`}
                    active={element === nameRegionShowing}
                    onClick={(event=>{
                      setNameRegionShowing(element)
                      setReadyShowing(false)
                    })}
                    > <ImgFlagNormal src={objFlag[element]} /> 
                  </DivFlagNormal>
                )}
              </Div>
              
            </DivHeader>
            
            
            <DivBody>  
              
              <Div>
              
                <DivStatAll> 
                
                  <Div>
                    <DivModeTitle>  {(() => {
                      switch (language) {
                        case 'ko': 
                          return '빠른 대전';
                        case 'ja': 
                          return 'Quick Match';
                        default: // eng
                          return 'Quick Match';
                      }
                    })()}  </DivModeTitle>
                    
                    <DivGamesAll
                      games_played={showing['stats']['All']['Quick Match']['games_played']}
                    >    
                      <Div> {showing['stats']['All']['Quick Match']['games_played']} </Div>
                      <Div> {(() => {
                      switch (language) {
                        case 'ko': 
                          return '게임';
                        case 'ja': 
                          return 'ゲーム';
                        default: // eng
                          return 'games';
                      }
                    })()}  </Div>
                    </DivGamesAll>
                    
                    <DivRank
                      league_tier={showing['stats']['All']['Quick Match']['league_tier']}
                    >
                      <Div> {showing['stats']['All']['Quick Match']['league_tier']} </Div>
                      <Div> {showing['stats']['All']['Quick Match']['mmr']} </Div>
                    </DivRank>
                  </Div>
                  
                  <Div>
                    <DivModeTitle>  {(() => {
                      switch (language) {
                        case 'ko': 
                          return '폭풍 리그';
                        case 'ja': 
                          return 'Storm League';
                        default: // eng
                          return 'Storm League';
                      }
                    })()}  </DivModeTitle>
                    
                    <DivGamesAll
                      games_played={showing['stats']['All']['Storm League']['games_played']}
                    >    
                      <Div> {showing['stats']['All']['Storm League']['games_played']} </Div>
                      <Div>  {(() => {
                      switch (language) {
                        case 'ko': 
                          return '게임';
                        case 'ja': 
                          return 'ゲーム';
                        default: // eng
                          return 'games';
                      }
                    })()} </Div>
                    </DivGamesAll>
                    
                    <DivRank
                      league_tier={showing['stats']['All']['Storm League']['league_tier']}
                    >
                      <Div> {showing['stats']['All']['Storm League']['league_tier']} </Div>
                      <Div> {showing['stats']['All']['Storm League']['mmr']} </Div>
                    </DivRank>
                  </Div>
                  
                </DivStatAll>
                
              </Div>
              
              
              <Div> 
                <DivStatRoles> 
                  
                  {returnDivEachRole("Tank")}
                  {returnDivEachRole("Bruiser")}
                  {returnDivEachRole("Melee Assassin")}
                  {returnDivEachRole("Ranged Assassin")}
                  {returnDivEachRole("Healer")}
                  {returnDivEachRole("Support")}
                
                </DivStatRoles>
                
                
                <DivChooseMode>
                
                  <ButtonChooseMode 
                    onClick={ (event)=>{setModeShowing("Quick Match")} }
                    active={(modeShowing==="Quick Match")}
                    > {(() => {
                      switch (language) {
                        case 'ko': 
                          return '빠른 대전';
                        case 'ja': 
                          return 'Quick Match';
                        default: // eng
                          return 'Quick Match';
                      }
                    })()}  </ButtonChooseMode>
                    
                  <ButtonChooseMode 
                    onClick={ (event)=>{setModeShowing("Storm League")} }
                    active={(modeShowing==="Storm League")}
                    > {(() => {
                      switch (language) {
                        case 'ko': 
                          return '폭풍 리그';
                        case 'ja': 
                          return 'Storm League';
                        default: // eng
                          return 'Storm League';
                      }
                    })()}  </ButtonChooseMode>
                    
                  <ButtonChooseMode 
                    onClick={ (event)=>{setModeShowing("Both")} }
                    active={(modeShowing==="Both")}
                    > {(() => {
                      switch (language) {
                        case 'ko': 
                          return '둘다';
                        case 'ja': 
                          return 'Both';
                        default: // eng
                          return 'Both';
                      }
                    })()}  </ButtonChooseMode>
                    
                </DivChooseMode>
              
              </Div> 
              
            </DivBody>
          
          </DivContainer>
        }
  
      </DivGeneral>

  )

}

/*
<Div> <ImgFlagNormal src={objFlag["NA"]} /> </Div>
                <Div> <ImgFlagNormal src={objFlag["KR"]} /> </Div>
                <Div> <ImgFlagNormal src={objFlag["CN"]} /> </Div>
                <Div> <ImgFlagNormal src={objFlag["EU"]} /> </Div>
*/


/*

const { idComp } = useParams();
  
  
  useEffect(() => {

    (async() => {
      
      if (!readyFocusingComp) {
        try {
            
          replaceData2("ready", "focusingComp", false);
          replaceData2("loading", "focusingComp", true);
          
          const {
            data
          } = await axios.get(`${config.URL_API_NS}/comp/${idComp}`);
          
          
          replaceData2CompGallery("focus", "comp", data);
          replaceData2("loading", "focusingComp", false);
          replaceData2("ready", "focusingComp", true);
          
    
        } catch (error) {
          replaceData2("ready", "focusingComp", false);
          replaceData2("loading", "focusingComp", false);
          
          addDeleteNotification("basic01", language);
          console.log(error)
        }
        
      }
     
    })() // async

  }, [readyFocusingComp, idComp])
  
  
  
  */


/*
<>
    { (loadingFocusingComp || !readyFocusingComp) ? <DivFocus> <Loading /> </DivFocus>

*/



function mapStateToProps(state) {
  return {

    language: state.basic.language
    
    , user: state.auth.user
    , readyUser: state.basic.ready.user
    
    , playerGeneral: state.player.general
    , readyPlayerGeneral: state.basic.ready.playerGeneral
    , loadingPlayerGeneral: state.basic.loading.playerGeneral
  };
}

function mapDispatchToProps(dispatch) {
  return {
  
    replaceDataPlayer: (which, replacement) => dispatch(replaceDataPlayer(which, replacement))
    , replaceData2Player: (which1, which2, replacement) => dispatch(replaceData2Player(which1, which2, replacement))

    , replaceData2: (which1, which2, replacement) => dispatch(replaceData2(which1, which2, replacement))

    , addDeleteNotification: (code_situation, language, message, time) => dispatch(addDeleteNotification(code_situation, language, message, time))
  };
}

// 컴포넌트에서 redux의 state, dispatch 를 일부분 골라서 이용가능하게 된다
export default connect(mapStateToProps, mapDispatchToProps)(General);