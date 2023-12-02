"use strict";(self.webpackChunkowncast_web=self.webpackChunkowncast_web||[]).push([[4511],{"./components/modals/FollowModal/FollowModal.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Basic:()=>Basic,__namedExportsOrder:()=>__namedExportsOrder,default:()=>FollowModal_stories});var defineProperty=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/defineProperty.js"),react=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),FollowModal=__webpack_require__("./components/modals/FollowModal/FollowModal.tsx");var _Basic$parameters,_Basic$parameters2,__jsx=react.createElement;function ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,o)}return t}function _objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?ownKeys(Object(t),!0).forEach((function(r){(0,defineProperty.Z)(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):ownKeys(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}var Example=function Example(){return __jsx("div",null,__jsx(FollowModal.FollowModal,{handleClose:null,account:"@fake@server.name",name:"Fake Owncast Server"}))};Example.displayName="Example";const FollowModal_stories={title:"owncast/Modals/Follow",component:FollowModal.FollowModal,parameters:{design:{type:"image",url:{src:"static/media/follow-modal.8e821156.png",height:680,width:916,blurDataURL:"static/media/follow-modal.8e821156.png"},scale:.5},docs:{description:{component:"The Follow modal allows an end user to type in their Fediverse account information to follow this Owncast instance. It must:\n\n- Validate the input to make sure it's a valid looking account.\n- Handle errors that come back from the server.\n- Perform the redirect to the remote server when the backend response is received.\n"}}}};var Template=function Template(){return __jsx(Example,null)};Template.displayName="Template";var Basic={render:Template};Basic.parameters=_objectSpread(_objectSpread({},Basic.parameters),{},{docs:_objectSpread(_objectSpread({},null===(_Basic$parameters=Basic.parameters)||void 0===_Basic$parameters?void 0:_Basic$parameters.docs),{},{source:_objectSpread({originalSource:"{\n  render: Template\n}"},null===(_Basic$parameters2=Basic.parameters)||void 0===_Basic$parameters2||null===(_Basic$parameters2=_Basic$parameters2.docs)||void 0===_Basic$parameters2?void 0:_Basic$parameters2.source)})});const __namedExportsOrder=["Basic"]},"./components/modals/FollowModal/FollowModal.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{FollowModal:()=>FollowModal});var asyncToGenerator=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js"),react=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),regenerator=__webpack_require__("./node_modules/@babel/runtime/regenerator/index.js"),regenerator_default=__webpack_require__.n(regenerator),space=__webpack_require__("./node_modules/antd/es/space/index.js"),spin=__webpack_require__("./node_modules/antd/es/spin/index.js"),es_alert=__webpack_require__("./node_modules/antd/es/alert/index.js"),input=__webpack_require__("./node_modules/antd/es/input/index.js"),es_button=__webpack_require__("./node_modules/antd/es/button/index.js"),injectStylesIntoStyleTag=__webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"),injectStylesIntoStyleTag_default=__webpack_require__.n(injectStylesIntoStyleTag),styleDomAPI=__webpack_require__("./node_modules/style-loader/dist/runtime/styleDomAPI.js"),styleDomAPI_default=__webpack_require__.n(styleDomAPI),insertBySelector=__webpack_require__("./node_modules/style-loader/dist/runtime/insertBySelector.js"),insertBySelector_default=__webpack_require__.n(insertBySelector),setAttributesWithoutAttributes=__webpack_require__("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"),setAttributesWithoutAttributes_default=__webpack_require__.n(setAttributesWithoutAttributes),insertStyleElement=__webpack_require__("./node_modules/style-loader/dist/runtime/insertStyleElement.js"),insertStyleElement_default=__webpack_require__.n(insertStyleElement),styleTagTransform=__webpack_require__("./node_modules/style-loader/dist/runtime/styleTagTransform.js"),styleTagTransform_default=__webpack_require__.n(styleTagTransform),FollowModal_module=__webpack_require__("./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[17].use[1]!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[17].use[3]!./components/modals/FollowModal/FollowModal.module.scss"),options={};options.styleTagTransform=styleTagTransform_default(),options.setAttributes=setAttributesWithoutAttributes_default(),options.insert=insertBySelector_default().bind(null,"head"),options.domAPI=styleDomAPI_default(),options.insertStyleElement=insertStyleElement_default();injectStylesIntoStyleTag_default()(FollowModal_module.Z,options);const FollowModal_FollowModal_module=FollowModal_module.Z&&FollowModal_module.Z.locals?FollowModal_module.Z.locals:void 0;var validators=__webpack_require__("./utils/validators.ts"),__jsx=react.createElement,FollowModal=function FollowModal(_ref){var handleClose=_ref.handleClose,account=_ref.account,name=_ref.name,_useState=(0,react.useState)(null),remoteAccount=_useState[0],setRemoteAccount=_useState[1],_useState2=(0,react.useState)(!1),valid=_useState2[0],setValid=_useState2[1],_useState3=(0,react.useState)(!1),loading=_useState3[0],setLoading=_useState3[1],_useState4=(0,react.useState)(null),errorMessage=_useState4[0],setErrorMessage=_useState4[1],remoteFollowButtonPressed=function(){var _ref2=(0,asyncToGenerator.Z)(regenerator_default().mark((function _callee(){var sanitizedAccount,request,rawResponse,result;return regenerator_default().wrap((function _callee$(_context){for(;;)switch(_context.prev=_context.next){case 0:if(valid){_context.next=2;break}return _context.abrupt("return");case 2:return setLoading(!0),_context.prev=3,sanitizedAccount=remoteAccount.replace(/^@+/,""),request={account:sanitizedAccount},_context.next=8,fetch("/api/remotefollow",{method:"POST",body:JSON.stringify(request)});case 8:return rawResponse=_context.sent,_context.next=11,rawResponse.json();case 11:if((result=_context.sent).redirectUrl&&(window.open(result.redirectUrl,"_blank"),handleClose()),result.success){_context.next=17;break}return setErrorMessage(result.message),setLoading(!1),_context.abrupt("return");case 17:if(result.redirectUrl){_context.next=21;break}return setErrorMessage("Unable to follow."),setLoading(!1),_context.abrupt("return");case 21:_context.next=26;break;case 23:_context.prev=23,_context.t0=_context.catch(3),setErrorMessage(_context.t0.message);case 26:setLoading(!1);case 27:case"end":return _context.stop()}}),_callee,null,[[3,23]])})));return function remoteFollowButtonPressed(){return _ref2.apply(this,arguments)}}();return __jsx(space.Z,{direction:"vertical",id:"follow-modal"},__jsx("div",{className:FollowModal_FollowModal_module.header},"By following this stream you'll get notified on the Fediverse when it goes live. Now is a great time to",__jsx("a",{href:"https://owncast.online/join-fediverse",target:"_blank",rel:"noreferrer"}," learn about the Fediverse "),"if it's new to you."),__jsx(spin.Z,{spinning:loading},errorMessage&&__jsx(es_alert.Z,{message:"Follow Error",description:errorMessage,type:"error",showIcon:!0}),__jsx("div",{className:FollowModal_FollowModal_module.account},__jsx("img",{src:"/logo",alt:"logo",className:FollowModal_FollowModal_module.logo}),__jsx("div",{className:FollowModal_FollowModal_module.username},__jsx("div",{className:FollowModal_FollowModal_module.name},name),__jsx("div",null,account))),__jsx("div",null,__jsx("div",{className:FollowModal_FollowModal_module.instructions},"Enter your username @server to follow"),__jsx(input.Z,{value:remoteAccount,size:"large",onChange:function onChange(e){return function handleAccountChange(a){setRemoteAccount(a),(0,validators.ME)(a)?setValid(!0):setValid(!1)}(e.target.value)},placeholder:"Your fediverse account @account@server",defaultValue:remoteAccount}),__jsx("div",{className:FollowModal_FollowModal_module.footer},"You'll be redirected to your Fediverse server and asked to confirm the action.")),__jsx(space.Z,{className:FollowModal_FollowModal_module.buttons},__jsx(es_button.Z,{disabled:!valid,type:"primary",onClick:remoteFollowButtonPressed},"Follow"),__jsx(es_button.Z,{onClick:function joinButtonPressed(){window.open("https://owncast.online/join-fediverse","_blank")},type:"primary"},"Join the Fediverse"))))};FollowModal.displayName="FollowModal";try{FollowModal.displayName="FollowModal",FollowModal.__docgenInfo={description:"",displayName:"FollowModal",props:{handleClose:{defaultValue:null,description:"",name:"handleClose",required:!0,type:{name:"() => void"}},account:{defaultValue:null,description:"",name:"account",required:!0,type:{name:"string"}},name:{defaultValue:null,description:"",name:"name",required:!0,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["components/modals/FollowModal/FollowModal.tsx#FollowModal"]={docgenInfo:FollowModal.__docgenInfo,name:"FollowModal",path:"components/modals/FollowModal/FollowModal.tsx#FollowModal"})}catch(__react_docgen_typescript_loader_error){}},"./utils/validators.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{ME:()=>isValidFediverseAccount,jv:()=>isValidUrl});function isValidUrl(url){var validProtocols=arguments.length>1&&void 0!==arguments[1]?arguments[1]:["http:","https:"];try{var validationObject=new URL(url);if(""===validationObject.protocol||""===validationObject.hostname||!validProtocols.includes(validationObject.protocol))return!1}catch(e){return!1}return!0}function isValidFediverseAccount(account){var sanitized=account.replace(/^@+/,"");return/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(sanitized).toLowerCase())}},"./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[17].use[1]!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[17].use[3]!./components/modals/FollowModal/FollowModal.module.scss":(module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/css-loader/dist/runtime/sourceMaps.js"),_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__),_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js"),___CSS_LOADER_EXPORT___=__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());___CSS_LOADER_EXPORT___.push([module.id,".cP1iZ4E1Wt5VaDkMeNIi{font-family:var(--theme-text-display-font-family);font-size:.8rem}.nBNfX7p6mGZ87vVcWrWH{display:flex;justify-content:flex-end;margin-top:10px}.IGvfncbV5Rzjq1xsRAw4{font-family:var(--theme-text-display-font-family);font-size:.7rem;font-weight:600;margin-top:5px;margin-bottom:5px}.cE5nL3aBNivsJdj3YuEt{font-size:.5rem}.PyUMR5ILC5qCxfKotLKL{display:flex;flex-direction:row;margin-top:5px;margin-bottom:10px;font-size:.8rem;border-color:var(--color-owncast-palette-5);border-width:2px;border-style:dashed;border-radius:6px;padding:5px}.PyUMR5ILC5qCxfKotLKL .XzKb7RlJUHCxUVb4XqcJ{border-radius:50%;width:4em;height:4em}.PyUMR5ILC5qCxfKotLKL .Yxm3Xb0huuxi0WVyOqCd{display:flex;flex-direction:column;margin-left:10px;margin-top:5px}.PyUMR5ILC5qCxfKotLKL .Yxm3Xb0huuxi0WVyOqCd .MyUK7cfisH8vGQIUF7J6{font-weight:600}","",{version:3,sources:["webpack://./components/modals/FollowModal/FollowModal.module.scss"],names:[],mappings:"AAAA,sBACE,iDAAA,CACA,eAAA,CAGF,sBACE,YAAA,CACA,wBAAA,CACA,eAAA,CAGF,sBACE,iDAAA,CACA,eAAA,CACA,eAAA,CACA,cAAA,CACA,iBAAA,CAGF,sBACE,eAAA,CAGF,sBACE,YAAA,CACA,kBAAA,CACA,cAAA,CACA,kBAAA,CACA,eAAA,CACA,2CAAA,CACA,gBAAA,CACA,mBAAA,CACA,iBAAA,CACA,WAAA,CAEA,4CACE,iBAAA,CACA,SAAA,CACA,UAAA,CAGF,4CACE,YAAA,CACA,qBAAA,CACA,gBAAA,CACA,cAAA,CAEA,kEACE,eAAA",sourcesContent:[".header {\n  font-family: var(--theme-text-display-font-family);\n  font-size: 0.8rem;\n}\n\n.buttons {\n  display: flex;\n  justify-content: flex-end;\n  margin-top: 10px;\n}\n\n.instructions {\n  font-family: var(--theme-text-display-font-family);\n  font-size: 0.7rem;\n  font-weight: 600;\n  margin-top: 5px;\n  margin-bottom: 5px;\n}\n\n.footer {\n  font-size: 0.5rem;\n}\n\n.account {\n  display: flex;\n  flex-direction: row;\n  margin-top: 5px;\n  margin-bottom: 10px;\n  font-size: 0.8rem;\n  border-color: var(--color-owncast-palette-5);\n  border-width: 2px;\n  border-style: dashed;\n  border-radius: 6px;\n  padding: 5px;\n\n  .logo {\n    border-radius: 50%;\n    width: 4em;\n    height: 4em;\n  }\n\n  .username {\n    display: flex;\n    flex-direction: column;\n    margin-left: 10px;\n    margin-top: 5px;\n\n    .name {\n      font-weight: 600;\n    }\n  }\n}\n"],sourceRoot:""}]),___CSS_LOADER_EXPORT___.locals={header:"cP1iZ4E1Wt5VaDkMeNIi",buttons:"nBNfX7p6mGZ87vVcWrWH",instructions:"IGvfncbV5Rzjq1xsRAw4",footer:"cE5nL3aBNivsJdj3YuEt",account:"PyUMR5ILC5qCxfKotLKL",logo:"XzKb7RlJUHCxUVb4XqcJ",username:"Yxm3Xb0huuxi0WVyOqCd",name:"MyUK7cfisH8vGQIUF7J6"};const __WEBPACK_DEFAULT_EXPORT__=___CSS_LOADER_EXPORT___}}]);