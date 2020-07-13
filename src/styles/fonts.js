import styled, {createGlobalStyle} from 'styled-components';



 const fonts = createGlobalStyle`
 
 
 
 // basic, KR & ENG
 
 @font-face {
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: thin;
  src:
    local('Noto Sans KR'),
    local('Noto-Sans-KR'),
    url(./fonts/Noto_Sans_KR/NotoSansKR-Thin.otf) format('opentype');
 }
 
 @font-face {
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: regular;
  src:
    local('Noto Sans KR'),
    local('Noto-Sans-KR'),
    url(./fonts/Noto_Sans_KR/NotoSansKR-Regular.otf) format('opentype');
 }
 
 @font-face {
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: medium;
  src:
    local('Noto Sans KR'),
    local('Noto-Sans-KR'),
    url(./fonts/Noto_Sans_KR/NotoSansKR-Medium.otf) format('opentype');
 }
 
  @font-face {
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: bold;
  src:
    local('Noto Sans KR'),
    local('Noto-Sans-KR'),
    url(./fonts/Noto_Sans_KR/NotoSansKR-Bold.otf) format('opentype');
 }
 
 
 
 // basic, JP & ENG
 
 @font-face {
  font-family: 'Noto Sans JP';
  font-style: normal;
  font-weight: thin;
  src:
    local('Noto Sans JP'),
    local('Noto-Sans-JP'),
    url(./fonts/Noto_Sans_JP/NotoSansJP-Thin.otf) format('opentype');
 }
 
 @font-face {
  font-family: 'Noto Sans JP';
  font-style: normal;
  font-weight: regular;
  src:
    local('Noto Sans JP'),
    local('Noto-Sans-JP'),
    url(./fonts/Noto_Sans_JP/NotoSansJP-Regular.otf) format('opentype');
 }
 
 @font-face {
  font-family: 'Noto Sans JP';
  font-style: normal;
  font-weight: medium;
  src:
    local('Noto Sans JP'),
    local('Noto-Sans-JP'),
    url(./fonts/Noto_Sans_JP/NotoSansJP-Medium.otf) format('opentype');
 }
 
  @font-face {
  font-family: 'Noto Sans JP';
  font-style: normal;
  font-weight: bold;
  src:
    local('Noto Sans JP'),
    local('Noto-Sans-JP'),
    url(./fonts/Noto_Sans_JP/NotoSansJP-Bold.otf) format('opentype');
 }
 
 `
 
 export default fonts;