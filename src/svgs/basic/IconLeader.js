import React from 'react';
import styled from 'styled-components';

import themes from "../../styles/themes"
import { connect } from "react-redux";
import {Div} from '../../styles/DefaultStyles';


const DivContainer = styled(Div)`

`;


const IconLeader = ({width, height, isFilled, themeName}) => {
	
	return (
		
	<DivContainer style= {{ width: `${width}`, height:`${height}` }} >
		<svg 
			
			className="icon usingHover crown"
			xmlns="http://www.w3.org/2000/svg" 
			
			
			width="100%"
			height="100%"
			viewBox="0 0 640 512"
			
			fill={(isFilled)? themes[themeName]["color_weak"] : themes[themeName]["color_very_weak"] }
			>
			
			{(isFilled)
			?	<path 
				d="M528 448H112c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h416c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm64-320c-26.5 0-48 21.5-48 48 0 7.1 1.6 13.7 4.4 19.8L476 239.2c-15.4 9.2-35.3 4-44.2-11.6L350.3 85C361 76.2 368 63 368 48c0-26.5-21.5-48-48-48s-48 21.5-48 48c0 15 7 28.2 17.7 37l-81.5 142.6c-8.9 15.6-28.9 20.8-44.2 11.6l-72.3-43.4c2.7-6 4.4-12.7 4.4-19.8 0-26.5-21.5-48-48-48S0 149.5 0 176s21.5 48 48 48c2.6 0 5.2-.4 7.7-.8L128 416h384l72.3-192.8c2.5.4 5.1.8 7.7.8 26.5 0 48-21.5 48-48s-21.5-48-48-48z">
				</path>
			: <path 
				d="M528 464H112c-8.8 0-16 7.2-16 16v16c0 8.8 7.2 16 16 16h416c8.8 0 16-7.2 16-16v-16c0-8.8-7.2-16-16-16zm64-336c-26.5 0-48 21.5-48 48 0 7.1 1.6 13.7 4.4 19.8L476 239.2c-5.2 3.1-10.8 4.6-16.4 4.6-11.1 0-21.9-5.8-27.8-16.1L350.3 85C361 76.2 368 63 368 48c0-26.5-21.5-48-48-48s-48 21.5-48 48c0 15 7 28.2 17.7 37l-81.5 142.6c-5.9 10.4-16.7 16.1-27.8 16.1-5.6 0-11.3-1.5-16.4-4.6l-72.3-43.4c2.7-6 4.4-12.7 4.4-19.8 0-26.5-21.5-48-48-48S0 149.5 0 176s21.5 48 48 48c2.6 0 5.2-.4 7.7-.8L128 416h384l72.3-192.8c2.5.4 5.1.8 7.7.8 26.5 0 48-21.5 48-48s-21.5-48-48-48zM478.7 368H161.3l-36-96.1 14 8.4c12.4 7.5 26.7 11.4 41.1 11.4 28.7 0 55.3-15.4 69.5-40.3L320 128.7l70.1 122.7c14.2 24.9 40.8 40.3 69.5 40.3 14.5 0 28.7-3.9 41.1-11.4l14-8.4-36 96.1z">
				</path>
			}
				
		</svg>
	</DivContainer>
	)
	}

function mapStateToProps(state) { 
  return { 
    themeName: state.themeName
  }; 
} 

/*
function mapDispatchToProps(dispatch) { 
  return { 
    readPlanTeam: (idPlanTeam) => dispatch(readPlanTeam(idPlanTeam)) 
  }; 
}
*/

export default connect(mapStateToProps)(IconLeader);