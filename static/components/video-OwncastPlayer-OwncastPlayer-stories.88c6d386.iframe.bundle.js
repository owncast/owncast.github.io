"use strict";(self.webpackChunkowncast_web=self.webpackChunkowncast_web||[]).push([[5704],{"./components/video/OwncastPlayer/OwncastPlayer.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{LiveDemo:()=>LiveDemo,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/next/dist/compiled/react/jsx-runtime.js"),recoil__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/recoil/es/index.js"),_OwncastPlayer__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./components/video/OwncastPlayer/OwncastPlayer.tsx");const streams={DemoServer:"https://watch.owncast.online/hls/stream.m3u8",RetroStrangeTV:"https://live.retrostrange.com/hls/stream.m3u8",localhost:"http://localhost:8080/hls/stream.m3u8"},__WEBPACK_DEFAULT_EXPORT__={title:"owncast/Player/Player",component:_OwncastPlayer__WEBPACK_IMPORTED_MODULE_2__.OwncastPlayer,argTypes:{source:{options:Object.keys(streams),mapping:streams,control:{type:"select"}}},parameters:{}},LiveDemo={render:args=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(recoil__WEBPACK_IMPORTED_MODULE_1__.bi,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_OwncastPlayer__WEBPACK_IMPORTED_MODULE_2__.OwncastPlayer,{...args})}),args:{online:!0,source:"https://watch.owncast.online/hls/stream.m3u8",title:"Stream title"}},__namedExportsOrder=["LiveDemo"];LiveDemo.parameters={...LiveDemo.parameters,docs:{...LiveDemo.parameters?.docs,source:{originalSource:"{\n  render: Template,\n  args: {\n    online: true,\n    source: 'https://watch.owncast.online/hls/stream.m3u8',\n    title: 'Stream title'\n  }\n}",...LiveDemo.parameters?.docs?.source}}}},"./components/ui/ComponentError/ComponentError.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{O:()=>ComponentError});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/next/dist/compiled/react/jsx-runtime.js"),_barrel_optimize_names_Alert_Button_antd__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/antd/es/alert/index.js"),_barrel_optimize_names_Alert_Button_antd__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/antd/es/button/index.js");const openBugReport=()=>{window.open("https://github.com/owncast/owncast/issues/new?assignees=&labels=&template=bug-report-feature-request.yml","_blank")},ErrorContent=({message,componentName,details,canRetry})=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div",{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p",{children:"There was an unexpected error. It would be appreciated if you would report this so it can be fixed in the future."}),!!canRetry&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p",{children:"You may optionally retry, however functionality might not work as expected."}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("code",{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div",{children:message&&`Error: ${message}`}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div",{children:["Component: ",componentName]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div",{children:details&&details})]})]}),ComponentError=({message,componentName,details,retryFunction})=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Alert_Button_antd__WEBPACK_IMPORTED_MODULE_1__.A,{message:"Error",showIcon:!0,description:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ErrorContent,{message,details,componentName,canRetry:!!retryFunction}),type:"error",action:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment,{children:[retryFunction&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Alert_Button_antd__WEBPACK_IMPORTED_MODULE_2__.A,{ghost:!0,size:"small",onClick:retryFunction,children:"Retry"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Alert_Button_antd__WEBPACK_IMPORTED_MODULE_2__.A,{ghost:!0,size:"small",danger:!0,onClick:openBugReport,children:"Report Error"})]})});try{ComponentError.displayName="ComponentError",ComponentError.__docgenInfo={description:"",displayName:"ComponentError",props:{message:{defaultValue:null,description:"",name:"message",required:!1,type:{name:"string"}},componentName:{defaultValue:null,description:"",name:"componentName",required:!0,type:{name:"string"}},details:{defaultValue:null,description:"",name:"details",required:!1,type:{name:"string"}},retryFunction:{defaultValue:null,description:"",name:"retryFunction",required:!1,type:{name:"() => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["components/ui/ComponentError/ComponentError.tsx#ComponentError"]={docgenInfo:ComponentError.__docgenInfo,name:"ComponentError",path:"components/ui/ComponentError/ComponentError.tsx#ComponentError"})}catch(__react_docgen_typescript_loader_error){}},"./services/video-settings-service.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{L:()=>VideoSettingsServiceContext});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),console=__webpack_require__("./node_modules/console-browserify/index.js");class VideoSettingsService{static async getVideoQualities(){let qualities=[];try{const response=await fetch(VideoSettingsService.VIDEO_CONFIG_URL);qualities=await response.json()}catch(e){console.error(e)}return qualities}}VideoSettingsService.VIDEO_CONFIG_URL="/api/video/variants";const VideoSettingsServiceContext=(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(VideoSettingsService)}}]);