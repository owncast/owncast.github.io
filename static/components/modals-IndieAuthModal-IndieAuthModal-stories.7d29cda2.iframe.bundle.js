"use strict";(self.webpackChunkowncast_web=self.webpackChunkowncast_web||[]).push([[4436],{"./components/modals/IndieAuthModal/IndieAuthModal.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Basic:()=>Basic,__namedExportsOrder:()=>__namedExportsOrder,default:()=>IndieAuthModal_stories});var react=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),IndieAuthModal=__webpack_require__("./components/modals/IndieAuthModal/IndieAuthModal.tsx");var __jsx=react.createElement,Example=function Example(){return __jsx("div",null,__jsx(IndieAuthModal.N,{authenticated:!0,displayName:"fakeChatName",accessToken:"fakeaccesstoken"}))};Example.displayName="Example";const IndieAuthModal_stories={title:"owncast/Modals/IndieAuth",component:IndieAuthModal.N,parameters:{design:{type:"image",url:{src:"static/media/indieauth-modal.b350aa21.png",height:632,width:1084,blurDataURL:"static/media/indieauth-modal.b350aa21.png"},scale:.5}}};var Template=function Template(){return __jsx(Example,null)};Template.displayName="Template";var Basic={render:Template};Basic.parameters={...Basic.parameters,docs:{...Basic.parameters?.docs,source:{originalSource:"{\n  render: Template\n}",...Basic.parameters?.docs?.source}}};const __namedExportsOrder=["Basic"]},"./components/modals/IndieAuthModal/IndieAuthModal.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{N:()=>IndieAuthModal});var _tmp_tmp_Egm6q9DMkI_owncast_web_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js"),_tmp_tmp_Egm6q9DMkI_owncast_web_node_modules_babel_runtime_regenerator_index_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@babel/runtime/regenerator/index.js"),_tmp_tmp_Egm6q9DMkI_owncast_web_node_modules_babel_runtime_regenerator_index_js__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(_tmp_tmp_Egm6q9DMkI_owncast_web_node_modules_babel_runtime_regenerator_index_js__WEBPACK_IMPORTED_MODULE_1__),antd__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/antd/es/collapse/index.js"),antd__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/antd/es/typography/index.js"),antd__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./node_modules/antd/es/spin/index.js"),antd__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("./node_modules/antd/es/space/index.js"),antd__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__("./node_modules/antd/es/alert/index.js"),antd__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__("./node_modules/antd/es/input/index.js"),antd__WEBPACK_IMPORTED_MODULE_11__=__webpack_require__("./node_modules/antd/es/button/index.js"),next_dynamic__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/next/dynamic.js"),next_dynamic__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(next_dynamic__WEBPACK_IMPORTED_MODULE_2__),react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),_utils_validators__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./utils/validators.ts"),__jsx=react__WEBPACK_IMPORTED_MODULE_0__.createElement,Panel=antd__WEBPACK_IMPORTED_MODULE_3__.Z.Panel,Link=antd__WEBPACK_IMPORTED_MODULE_4__.Z.Link,CheckCircleOutlined=next_dynamic__WEBPACK_IMPORTED_MODULE_2___default()((function(){return Promise.all([__webpack_require__.e(2074),__webpack_require__.e(7996)]).then(__webpack_require__.t.bind(__webpack_require__,"./node_modules/@ant-design/icons/CheckCircleOutlined.js",23))}),{ssr:!1,loadableGenerated:{webpack:function webpack(){return["./node_modules/@ant-design/icons/CheckCircleOutlined.js"]}}}),IndieAuthModal=function IndieAuthModal(_ref){var authenticated=_ref.authenticated,username=_ref.displayName,accessToken=_ref.accessToken,_useState=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),errorMessage=_useState[0],setErrorMessage=_useState[1],_useState2=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1),loading=_useState2[0],setLoading=_useState2[1],_useState3=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1),valid=_useState3[0],setValid=_useState3[1],_useState4=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),host=_useState4[0],setHost=_useState4[1],message=authenticated?__jsx("span",null,__jsx("b",null,"You are already authenticated"),". However, you can add other domains or log in as a different user."):__jsx("span",null,"Use your own domain to authenticate ",__jsx("span",null,username)," or login as a previously"," ","authenticated chat user using IndieAuth."),errorMessageText=errorMessage;errorMessageText&&errorMessageText.includes("url does not support indieauth")&&(errorMessageText="The provided URL is either invalid or does not support IndieAuth.");var submitButtonPressed=function(){var _ref2=(0,_tmp_tmp_Egm6q9DMkI_owncast_web_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_6__.Z)(_tmp_tmp_Egm6q9DMkI_owncast_web_node_modules_babel_runtime_regenerator_index_js__WEBPACK_IMPORTED_MODULE_1___default().mark((function _callee(){var url,h,data,rawResponse,content,redirect;return _tmp_tmp_Egm6q9DMkI_owncast_web_node_modules_babel_runtime_regenerator_index_js__WEBPACK_IMPORTED_MODULE_1___default().wrap((function _callee$(_context){for(;;)switch(_context.prev=_context.next){case 0:if(valid){_context.next=2;break}return _context.abrupt("return");case 2:return setLoading(!0),_context.prev=3,url="/api/auth/indieauth?accessToken=".concat(accessToken),h="https://".concat(host),data={authHost:h},_context.next=9,fetch(url,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(data)});case 9:return rawResponse=_context.sent,_context.next=12,rawResponse.json();case 12:if(!(content=_context.sent).message){_context.next=17;break}return setErrorMessage(content.message),setLoading(!1),_context.abrupt("return");case 17:if(content.redirect){_context.next=21;break}return setErrorMessage("Auth provider did not return a redirect URL."),setLoading(!1),_context.abrupt("return");case 21:content.redirect&&(redirect=content.redirect,window.location=redirect),_context.next=27;break;case 24:_context.prev=24,_context.t0=_context.catch(3),setErrorMessage(_context.t0.message);case 27:setLoading(!1);case 28:case"end":return _context.stop()}}),_callee,null,[[3,24]])})));return function submitButtonPressed(){return _ref2.apply(this,arguments)}}();return __jsx(antd__WEBPACK_IMPORTED_MODULE_7__.Z,{spinning:loading},__jsx(antd__WEBPACK_IMPORTED_MODULE_8__.Z,{direction:"vertical"},message,errorMessageText&&__jsx(antd__WEBPACK_IMPORTED_MODULE_9__.Z,{message:"Error",description:errorMessageText,type:"error",showIcon:!0}),__jsx("div",null,"Your domain"),__jsx(antd__WEBPACK_IMPORTED_MODULE_10__.Z.Search,{addonBefore:"https://",onInput:function onInput(e){":"!==e.nativeEvent.data&&(setHost(e.target.value),function validate(url){(0,_utils_validators__WEBPACK_IMPORTED_MODULE_5__.jv)(url)&&url.includes(".")?setValid(!0):setValid(!1)}("https://".concat(e.target.value)))},type:"url",value:host,placeholder:"yoursite.com",status:!valid&&host.length>0?"error":void 0,onSearch:submitButtonPressed,enterButton:__jsx(antd__WEBPACK_IMPORTED_MODULE_11__.Z,{type:valid?"primary":"default",disabled:!valid||0===host.length},__jsx(CheckCircleOutlined,null))}),__jsx(antd__WEBPACK_IMPORTED_MODULE_3__.Z,{ghost:!0},__jsx(Panel,{key:"header",header:"Learn more about using IndieAuth to authenticate with chat."},__jsx("p",null,"IndieAuth allows for a completely independent and decentralized way of identifying yourself using your own domain."),__jsx("p",null,"If you run an Owncast instance, you can use that domain here. Otherwise,"," ",__jsx(Link,{href:"https://indieauth.net/#providers"},"learn more about how you can support IndieAuth"),"."))),__jsx("div",null,__jsx("strong",null,"Note"),": This is for authentication purposes only, and no personal information will be accessed or stored.")))};IndieAuthModal.displayName="IndieAuthModal";try{IndieAuthModal.displayName="IndieAuthModal",IndieAuthModal.__docgenInfo={description:"",displayName:"IndieAuthModal",props:{authenticated:{defaultValue:null,description:"",name:"authenticated",required:!0,type:{name:"boolean"}},displayName:{defaultValue:null,description:"",name:"displayName",required:!0,type:{name:"string"}},accessToken:{defaultValue:null,description:"",name:"accessToken",required:!0,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["components/modals/IndieAuthModal/IndieAuthModal.tsx#IndieAuthModal"]={docgenInfo:IndieAuthModal.__docgenInfo,name:"IndieAuthModal",path:"components/modals/IndieAuthModal/IndieAuthModal.tsx#IndieAuthModal"})}catch(__react_docgen_typescript_loader_error){}},"./utils/validators.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{ME:()=>isValidFediverseAccount,jv:()=>isValidUrl});function isValidUrl(url){var validProtocols=arguments.length>1&&void 0!==arguments[1]?arguments[1]:["http:","https:"];try{var validationObject=new URL(url);if(""===validationObject.protocol||""===validationObject.hostname||!validProtocols.includes(validationObject.protocol))return!1}catch(e){return!1}return!0}function isValidFediverseAccount(account){var sanitized=account.replace(/^@+/,"");return/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(sanitized).toLowerCase())}}}]);