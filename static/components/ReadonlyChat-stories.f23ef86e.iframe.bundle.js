(self.webpackChunkowncast_web=self.webpackChunkowncast_web||[]).push([[9343],{"./stories/ReadonlyChat.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Example:()=>Example,__namedExportsOrder:()=>__namedExportsOrder,default:()=>ReadonlyChat_stories});var jsx_runtime=__webpack_require__("./node_modules/next/dist/compiled/react/jsx-runtime.js"),react=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),es=__webpack_require__("./node_modules/recoil/es/index.js"),react_error_boundary_esm=__webpack_require__("./node_modules/react-error-boundary/dist/react-error-boundary.esm.js"),ChatContainer=__webpack_require__("./components/chat/ChatContainer/ChatContainer.tsx"),ClientConfigStore=__webpack_require__("./components/stores/ClientConfigStore.tsx"),Theme=__webpack_require__("./components/theme/Theme.tsx"),ComponentError=__webpack_require__("./components/ui/ComponentError/ComponentError.tsx");function ReadOnlyChatEmbed(){const currentUser=(0,es.vc)(ClientConfigStore.gN),messages=(0,es.vc)(ClientConfigStore.Qy),isChatAvailable=(0,es.vc)(ClientConfigStore.F5);return(0,jsx_runtime.jsx)("div",{children:(0,jsx_runtime.jsxs)(react_error_boundary_esm.tH,{fallbackRender:({error})=>(0,jsx_runtime.jsx)(ComponentError.O,{componentName:"ReadWriteChatEmbed",message:error.message}),children:[(0,jsx_runtime.jsx)(ClientConfigStore.Xp,{}),(0,jsx_runtime.jsx)(Theme.S,{}),currentUser&&(0,jsx_runtime.jsx)(ChatContainer.ChatContainer,{messages,usernameToHighlight:currentUser.displayName,chatUserId:currentUser.id,isModerator:!1,showInput:!1,height:"100vh",chatAvailable:isChatAvailable})]})})}const ReadonlyChat_stories={title:"owncast/Chat/Embeds/Read-only chat",component:ReadOnlyChatEmbed,parameters:{}},messages=JSON.parse('[{"type":"CHAT","id":"wY-MEXwnR","timestamp":"2022-04-28T20:30:27.001762726Z","user":{"id":"h_5GQ6E7R","displayName":"UserDisplayName42","displayColor":329,"createdAt":"2022-03-24T03:52:37.966584694Z","previousNames":["gifted-nobel","EliteMooseTaskForce"],"nameChangedAt":"2022-04-26T23:56:05.531287897Z","scopes":[""]},"body":"this is a test message"},{"type":"CHAT","id":"VhLGEXwnR","timestamp":"2022-04-28T20:30:28.806999545Z","user":{"id":"h_5GQ6E7R","displayName":"EliteMooseTaskForce","displayColor":329,"createdAt":"2022-03-24T03:52:37.966584694Z","previousNames":["gifted-nobel","EliteMooseTaskForce"],"nameChangedAt":"2022-04-26T23:56:05.531287897Z","scopes":[""]},"body":"Hit 3"},{"type":"CHAT","id":"GguMEuw7R","timestamp":"2022-04-28T20:30:34.500150601Z","user":{"id":"h_5GQ6E7R","displayName":"EliteMooseTaskForce","displayColor":329,"createdAt":"2022-03-24T03:52:37.966584694Z","previousNames":["gifted-nobel","EliteMooseTaskForce"],"nameChangedAt":"2022-04-26T23:56:05.531287897Z","scopes":[""]},"body":"Jkjk"},{"type":"CHAT","id":"y_-VEXwnR","timestamp":"2022-04-28T20:31:32.695583044Z","user":{"id":"h_5GQ6E7R","displayName":"EliteMooseTaskForce","displayColor":329,"createdAt":"2022-03-24T03:52:37.966584694Z","previousNames":["gifted-nobel","EliteMooseTaskForce"],"nameChangedAt":"2022-04-26T23:56:05.531287897Z","scopes":[""]},"body":"I&#39;m doing alright. How about you Hatnix?"},{"type":"CHAT","id":"qAaKEuwng","timestamp":"2022-04-28T20:34:16.22275314Z","user":{"id":"h_5GQ6E7R","displayName":"EliteMooseTaskForce","displayColor":329,"createdAt":"2022-03-24T03:52:37.966584694Z","previousNames":["gifted-nobel","EliteMooseTaskForce"],"nameChangedAt":"2022-04-26T23:56:05.531287897Z","scopes":[""]},"body":"Oh shiet I didn&#39;t think you would kill him"},{"type":"CHAT","id":"8wUFEuwnR","timestamp":"2022-04-28T20:34:21.624898714Z","user":{"id":"h_5GQ6E7R","displayName":"EliteMooseTaskForce","displayColor":329,"createdAt":"2022-03-24T03:52:37.966584694Z","previousNames":["gifted-nobel","EliteMooseTaskForce"],"nameChangedAt":"2022-04-26T23:56:05.531287897Z","scopes":[""]},"body":"Hahaha, ruthless"},{"type":"CHAT","id":"onYcPuQnR","timestamp":"2022-04-28T20:34:50.671024312Z","user":{"id":"h_5GQ6E7R","displayName":"EliteMooseTaskForce","displayColor":329,"createdAt":"2022-03-24T03:52:37.966584694Z","previousNames":["gifted-nobel","EliteMooseTaskForce"],"nameChangedAt":"2022-04-26T23:56:05.531287897Z","scopes":[""]},"body":"I&#39;ve never played it before"},{"type":"CHAT","id":"kORyEXQ7R","timestamp":"2022-04-28T20:40:29.761977233Z","user":{"id":"h_5GQ6E7R","displayName":"EliteMooseTaskForce","displayColor":329,"createdAt":"2022-03-24T03:52:37.966584694Z","previousNames":["gifted-nobel","EliteMooseTaskForce"],"nameChangedAt":"2022-04-26T23:56:05.531287897Z","scopes":[""]},"body":"brb real quick"},{"type":"CHAT","id":"F3DvsuQ7g","timestamp":"2022-04-28T20:50:29.451341783Z","user":{"id":"h_5GQ6E7R","displayName":"EliteMooseTaskForce","displayColor":329,"createdAt":"2022-03-24T03:52:37.966584694Z","previousNames":["gifted-nobel","EliteMooseTaskForce"],"nameChangedAt":"2022-04-26T23:56:05.531287897Z","scopes":[""]},"body":"I&#39;m back"},{"type":"CHAT","id":"AH2vsXwnR","timestamp":"2022-04-28T20:50:33.872156152Z","user":{"id":"h_5GQ6E7R","displayName":"EliteMooseTaskForce","displayColor":329,"createdAt":"2022-03-24T03:52:37.966584694Z","previousNames":["gifted-nobel","EliteMooseTaskForce"],"nameChangedAt":"2022-04-26T23:56:05.531287897Z","scopes":[""]},"body":"Whoa what happened here?"},{"type":"CHAT","id":"xGkOsuw7R","timestamp":"2022-04-28T20:50:53.202147658Z","user":{"id":"h_5GQ6E7R","displayName":"EliteMooseTaskForce","displayColor":329,"createdAt":"2022-03-24T03:52:37.966584694Z","previousNames":["gifted-nobel","EliteMooseTaskForce"],"nameChangedAt":"2022-04-26T23:56:05.531287897Z","scopes":[""]},"body":"Your dwarf was half naked."},{"type":"CHAT","id":"opIdsuw7g","timestamp":"2022-04-28T20:50:59.631595947Z","user":{"id":"h_5GQ6E7R","displayName":"EliteMooseTaskForce","displayColor":329,"createdAt":"2022-03-24T03:52:37.966584694Z","previousNames":["gifted-nobel","EliteMooseTaskForce"],"nameChangedAt":"2022-04-26T23:56:05.531287897Z","scopes":[""]},"body":"lol"},{"type":"CHAT","id":"JpwdsuQnR","timestamp":"2022-04-28T20:51:18.065535459Z","user":{"id":"vbh9gtPng","displayName":"𝓈𝓉𝒶𝓇𝒻𝒶𝓇𝑒𝓇™","displayColor":276,"createdAt":"2022-03-16T21:02:32.009965702Z","previousNames":["goth-volhard","𝓈𝓉𝒶𝓇𝒻𝒶𝓇𝑒𝓇™","𝒽𝒶𝓅𝓅𝓎 𝓈𝓉𝒶𝓇𝒻𝒶𝓇𝑒𝓇™","𝓈𝓉𝒶𝓇𝒻𝒶𝓇𝑒𝓇™","𝓈𝓉𝒶𝒶𝓇𝒻𝒶𝒶𝓇𝑒𝑒𝓇™","𝓈𝓉𝒶𝓇𝒻𝒶𝓇𝑒𝓇™"],"nameChangedAt":"2022-04-14T21:51:50.97992512Z","scopes":[""]},"body":"evening did i just see you running around in... nothing"},{"type":"CHAT","id":"R4WKsXw7R","timestamp":"2022-04-28T20:51:28.064914803Z","user":{"id":"vbh9gtPng","displayName":"𝓈𝓉𝒶𝓇𝒻𝒶𝓇𝑒𝓇™","displayColor":276,"createdAt":"2022-03-16T21:02:32.009965702Z","previousNames":["goth-volhard","𝓈𝓉𝒶𝓇𝒻𝒶𝓇𝑒𝓇™","𝒽𝒶𝓅𝓅𝓎 𝓈𝓉𝒶𝓇𝒻𝒶𝓇𝑒𝓇™","𝓈𝓉𝒶𝓇𝒻𝒶𝓇𝑒𝓇™","𝓈𝓉𝒶𝒶𝓇𝒻𝒶𝒶𝓇𝑒𝑒𝓇™","𝓈𝓉𝒶𝓇𝒻𝒶𝓇𝑒𝓇™"],"nameChangedAt":"2022-04-14T21:51:50.97992512Z","scopes":[""]},"body":"^^"},{"type":"CHAT","id":"g-PKyXw7g","timestamp":"2022-04-28T20:51:47.936500772Z","user":{"id":"h_5GQ6E7R","displayName":"EliteMooseTaskForce","displayColor":329,"createdAt":"2022-03-24T03:52:37.966584694Z","previousNames":["gifted-nobel","EliteMooseTaskForce"],"nameChangedAt":"2022-04-26T23:56:05.531287897Z","scopes":[""]},"body":"Lol Starfarer, so my eyes didnt deceive me."},{"type":"CHAT","id":"fV8Ksuw7R","timestamp":"2022-04-28T20:51:49.588744112Z","user":{"id":"h_5GQ6E7R","displayName":"EliteMooseTaskForce","displayColor":329,"createdAt":"2022-03-24T03:52:37.966584694Z","previousNames":["gifted-nobel","EliteMooseTaskForce"],"nameChangedAt":"2022-04-26T23:56:05.531287897Z","scopes":[""]},"body":"hahahaha"},{"type":"CHAT","id":"TaStyuwnR","timestamp":"2022-04-28T20:52:38.127528579Z","user":{"id":"vbh9gtPng","displayName":"𝓈𝓉𝒶𝓇𝒻𝒶𝓇𝑒𝓇™","displayColor":276,"createdAt":"2022-03-16T21:02:32.009965702Z","previousNames":["goth-volhard","𝓈𝓉𝒶𝓇𝒻𝒶𝓇𝑒𝓇™","𝒽𝒶𝓅𝓅𝓎 𝓈𝓉𝒶𝓇𝒻𝒶𝓇𝑒𝓇™","𝓈𝓉𝒶𝓇𝒻𝒶𝓇𝑒𝓇™","𝓈𝓉𝒶𝒶𝓇𝒻𝒶𝒶𝓇𝑒𝑒𝓇™","𝓈𝓉𝒶𝓇𝒻𝒶𝓇𝑒𝓇™"],"nameChangedAt":"2022-04-14T21:51:50.97992512Z","scopes":[""]},"body":"lol sounds nice"},{"type":"CHAT","id":"JGposuwng","timestamp":"2022-04-28T20:53:49.329567087Z","user":{"id":"GCa3J9P7R","displayName":"(ghost of)^10  * toudy49","displayColor":147,"createdAt":"2022-03-22T21:49:25.284237821Z","previousNames":["lucid-pike","toudy49","ghost of toudy49","ghost of ghost of toudy49","ghost of ghost of ghost of toudy49","ghost of ghost of ghost of ghost of toudy49","ghost of ghost of ghost of ghost of ghost of toudy49","ghost ofghost of ghost of ghost of ghost of ghost of toudy49","ghostof ghost of ghost of ghost of ghost of ghost of toudy49","(ghost of)^6  * toudy49","(ghost of)^7  * toudy49","(ghost of)^8  * toudy49","(ghost of)^9  * toudy49","(ghost of)^10  * toudy49"],"nameChangedAt":"2022-04-11T21:01:19.938445828Z","scopes":[""]},"body":"!hydrate"},{"type":"CHAT","id":"T4tTsuwng","timestamp":"2022-04-28T20:53:49.391636551Z","user":{"id":"fKINHKpnR","displayName":"hatnixbot","displayColor":325,"createdAt":"2021-11-24T08:11:32Z","previousNames":["hatnixbot"],"scopes":["CAN_SEND_SYSTEM_MESSAGES","CAN_SEND_MESSAGES","HAS_ADMIN_ACCESS"]},"body":"test 123"},{"type":"CHAT","id":"wUJTsuw7R","timestamp":"2022-04-28T20:53:54.073218761Z","user":{"id":"GCa3J9P7R","displayName":"(ghost of)^10  * toudy49","displayColor":147,"createdAt":"2022-03-22T21:49:25.284237821Z","previousNames":["lucid-pike","toudy49","ghost of toudy49","ghost of ghost of toudy49","ghost of ghost of ghost of toudy49","ghost of ghost of ghost of ghost of toudy49","ghost of ghost of ghost of ghost of ghost of toudy49","ghost ofghost of ghost of ghost of ghost of ghost of toudy49","ghostof ghost of ghost of ghost of ghost of ghost of toudy49","(ghost of)^6  * toudy49","(ghost of)^7  * toudy49","(ghost of)^8  * toudy49","(ghost of)^9  * toudy49","(ghost of)^10  * toudy49"],"nameChangedAt":"2022-04-11T21:01:19.938445828Z","scopes":[""]},"body":"!stretch"},{"type":"CHAT","id":"S_Joyuw7R","timestamp":"2022-04-28T20:53:54.119778013Z","user":{"id":"fKINHKpnR","displayName":"hatnixbot","displayColor":325,"createdAt":"2021-11-24T08:11:32Z","previousNames":["hatnixbot"],"scopes":["CAN_SEND_SYSTEM_MESSAGES","CAN_SEND_MESSAGES","HAS_ADMIN_ACCESS"]},"body":"blah blah"},{"type":"CHAT","id":"MtYTyXwnR","timestamp":"2022-04-28T20:53:57.796985761Z","user":{"id":"vbh9gtPng","displayName":"𝓈𝓉𝒶𝓇𝒻𝒶𝓇𝑒𝓇™","displayColor":276,"createdAt":"2022-03-16T21:02:32.009965702Z","previousNames":["goth-volhard","𝓈𝓉𝒶𝓇𝒻𝒶𝓇𝑒𝓇™","𝒽𝒶𝓅𝓅𝓎 𝓈𝓉𝒶𝓇𝒻𝒶𝓇𝑒𝓇™","𝓈𝓉𝒶𝓇𝒻𝒶𝓇𝑒𝓇™","𝓈𝓉𝒶𝒶𝓇𝒻𝒶𝒶𝓇𝑒𝑒𝓇™","𝓈𝓉𝒶𝓇𝒻𝒶𝓇𝑒𝓇™"],"nameChangedAt":"2022-04-14T21:51:50.97992512Z","scopes":[""]},"body":"heyy toudy"}]'),Page=()=>{const setMessages=(0,es.lZ)(ClientConfigStore.in);return(0,react.useEffect)((()=>{setMessages(messages)}),[]),(0,jsx_runtime.jsx)(ReadOnlyChatEmbed,{})},Example={render:()=>(0,jsx_runtime.jsx)(es.bi,{children:(0,jsx_runtime.jsx)(Page,{})}),args:{}},__namedExportsOrder=["Example"];Example.parameters={...Example.parameters,docs:{...Example.parameters?.docs,source:{originalSource:"{\n  render: Template,\n  args: {}\n}",...Example.parameters?.docs?.source}}}},"./components/theme/Theme.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{S:()=>Theme});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/next/dist/compiled/react/jsx-runtime.js"),next_head__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/next/head.js"),next_head__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_1__),react__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),recoil__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/recoil/es/index.js"),_stores_ClientConfigStore__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./components/stores/ClientConfigStore.tsx");const Theme=()=>{const clientConfig=(0,recoil__WEBPACK_IMPORTED_MODULE_3__.vc)(_stores_ClientConfigStore__WEBPACK_IMPORTED_MODULE_4__.Ar),{appearanceVariables,customStyles}=clientConfig,appearanceVars=Object.keys(appearanceVariables||{}).filter((variable=>!!appearanceVariables[variable])).map((variable=>`--${variable}: ${appearanceVariables[variable]}`)),[themeColor,setThemeColor]=(0,react__WEBPACK_IMPORTED_MODULE_2__.useState)("#fff");return(0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)((()=>{const color=getComputedStyle(document.documentElement).getPropertyValue("--theme-color-background-header");setThemeColor(color)}),[appearanceVars]),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(next_head__WEBPACK_IMPORTED_MODULE_1___default(),{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("meta",{name:"theme-color",content:themeColor})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("style",{dangerouslySetInnerHTML:{__html:`\n\t\t\t\t:root {\n\t\t\t\t\t${appearanceVars.join(";\n")}\n\t\t\t\t}\n\t\t\t`}}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("style",{dangerouslySetInnerHTML:{__html:`\n\t\t\t\t${customStyles}\n\t\t\t`}})]})};try{Theme.displayName="Theme",Theme.__docgenInfo={description:"",displayName:"Theme",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["components/theme/Theme.tsx#Theme"]={docgenInfo:Theme.__docgenInfo,name:"Theme",path:"components/theme/Theme.tsx#Theme"})}catch(__react_docgen_typescript_loader_error){}},"./node_modules/next/dist/shared/lib/amp-context.shared-runtime.js":(__unused_webpack_module,exports,__webpack_require__)=>{"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),Object.defineProperty(exports,"AmpStateContext",{enumerable:!0,get:function(){return AmpStateContext}});const AmpStateContext=__webpack_require__("./node_modules/@swc/helpers/cjs/_interop_require_default.cjs")._(__webpack_require__("./node_modules/next/dist/compiled/react/index.js")).default.createContext({})},"./node_modules/next/dist/shared/lib/amp-mode.js":(__unused_webpack_module,exports)=>{"use strict";function isInAmpMode(param){let{ampFirst=!1,hybrid=!1,hasQuery=!1}=void 0===param?{}:param;return ampFirst||hybrid&&hasQuery}Object.defineProperty(exports,"__esModule",{value:!0}),Object.defineProperty(exports,"isInAmpMode",{enumerable:!0,get:function(){return isInAmpMode}})},"./node_modules/next/dist/shared/lib/head.js":(module,exports,__webpack_require__)=>{var process=__webpack_require__("./node_modules/process/browser.js");Object.defineProperty(exports,"__esModule",{value:!0}),function _export(target,all){for(var name in all)Object.defineProperty(target,name,{enumerable:!0,get:all[name]})}(exports,{default:function(){return _default},defaultHead:function(){return defaultHead}});const _interop_require_default=__webpack_require__("./node_modules/@swc/helpers/cjs/_interop_require_default.cjs"),_interop_require_wildcard=__webpack_require__("./node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs"),_jsxruntime=__webpack_require__("./node_modules/next/dist/compiled/react/jsx-runtime.js"),_react=_interop_require_wildcard._(__webpack_require__("./node_modules/next/dist/compiled/react/index.js")),_sideeffect=_interop_require_default._(__webpack_require__("./node_modules/next/dist/shared/lib/side-effect.js")),_ampcontextsharedruntime=__webpack_require__("./node_modules/next/dist/shared/lib/amp-context.shared-runtime.js"),_headmanagercontextsharedruntime=__webpack_require__("./node_modules/next/dist/shared/lib/head-manager-context.shared-runtime.js"),_ampmode=__webpack_require__("./node_modules/next/dist/shared/lib/amp-mode.js");__webpack_require__("./node_modules/next/dist/shared/lib/utils/warn-once.js");function defaultHead(inAmpMode){void 0===inAmpMode&&(inAmpMode=!1);const head=[(0,_jsxruntime.jsx)("meta",{charSet:"utf-8"})];return inAmpMode||head.push((0,_jsxruntime.jsx)("meta",{name:"viewport",content:"width=device-width"})),head}function onlyReactElement(list,child){return"string"==typeof child||"number"==typeof child?list:child.type===_react.default.Fragment?list.concat(_react.default.Children.toArray(child.props.children).reduce(((fragmentList,fragmentChild)=>"string"==typeof fragmentChild||"number"==typeof fragmentChild?fragmentList:fragmentList.concat(fragmentChild)),[])):list.concat(child)}const METATYPES=["name","httpEquiv","charSet","itemProp"];function reduceComponents(headChildrenElements,props){const{inAmpMode}=props;return headChildrenElements.reduce(onlyReactElement,[]).reverse().concat(defaultHead(inAmpMode).reverse()).filter(function unique(){const keys=new Set,tags=new Set,metaTypes=new Set,metaCategories={};return h=>{let isUnique=!0,hasKey=!1;if(h.key&&"number"!=typeof h.key&&h.key.indexOf("$")>0){hasKey=!0;const key=h.key.slice(h.key.indexOf("$")+1);keys.has(key)?isUnique=!1:keys.add(key)}switch(h.type){case"title":case"base":tags.has(h.type)?isUnique=!1:tags.add(h.type);break;case"meta":for(let i=0,len=METATYPES.length;i<len;i++){const metatype=METATYPES[i];if(h.props.hasOwnProperty(metatype))if("charSet"===metatype)metaTypes.has(metatype)?isUnique=!1:metaTypes.add(metatype);else{const category=h.props[metatype],categories=metaCategories[metatype]||new Set;"name"===metatype&&hasKey||!categories.has(category)?(categories.add(category),metaCategories[metatype]=categories):isUnique=!1}}}return isUnique}}()).reverse().map(((c,i)=>{const key=c.key||i;if(process.env.__NEXT_OPTIMIZE_FONTS&&!inAmpMode&&"link"===c.type&&c.props.href&&["https://fonts.googleapis.com/css","https://use.typekit.net/"].some((url=>c.props.href.startsWith(url)))){const newProps={...c.props||{}};return newProps["data-href"]=newProps.href,newProps.href=void 0,newProps["data-optimized-fonts"]=!0,_react.default.cloneElement(c,newProps)}return _react.default.cloneElement(c,{key})}))}const _default=function Head(param){let{children}=param;const ampState=(0,_react.useContext)(_ampcontextsharedruntime.AmpStateContext),headManager=(0,_react.useContext)(_headmanagercontextsharedruntime.HeadManagerContext);return(0,_jsxruntime.jsx)(_sideeffect.default,{reduceComponentsToState:reduceComponents,headManager,inAmpMode:(0,_ampmode.isInAmpMode)(ampState),children})};("function"==typeof exports.default||"object"==typeof exports.default&&null!==exports.default)&&void 0===exports.default.__esModule&&(Object.defineProperty(exports.default,"__esModule",{value:!0}),Object.assign(exports.default,exports),module.exports=exports.default)},"./node_modules/next/dist/shared/lib/side-effect.js":(__unused_webpack_module,exports,__webpack_require__)=>{"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),Object.defineProperty(exports,"default",{enumerable:!0,get:function(){return SideEffect}});const _react=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),isServer="undefined"==typeof window,useClientOnlyLayoutEffect=isServer?()=>{}:_react.useLayoutEffect,useClientOnlyEffect=isServer?()=>{}:_react.useEffect;function SideEffect(props){const{headManager,reduceComponentsToState}=props;function emitChange(){if(headManager&&headManager.mountedInstances){const headElements=_react.Children.toArray(Array.from(headManager.mountedInstances).filter(Boolean));headManager.updateHead(reduceComponentsToState(headElements,props))}}var _headManager_mountedInstances;isServer&&(null==headManager||null==(_headManager_mountedInstances=headManager.mountedInstances)||_headManager_mountedInstances.add(props.children),emitChange());return useClientOnlyLayoutEffect((()=>{var _headManager_mountedInstances;return null==headManager||null==(_headManager_mountedInstances=headManager.mountedInstances)||_headManager_mountedInstances.add(props.children),()=>{var _headManager_mountedInstances;null==headManager||null==(_headManager_mountedInstances=headManager.mountedInstances)||_headManager_mountedInstances.delete(props.children)}})),useClientOnlyLayoutEffect((()=>(headManager&&(headManager._pendingUpdate=emitChange),()=>{headManager&&(headManager._pendingUpdate=emitChange)}))),useClientOnlyEffect((()=>(headManager&&headManager._pendingUpdate&&(headManager._pendingUpdate(),headManager._pendingUpdate=null),()=>{headManager&&headManager._pendingUpdate&&(headManager._pendingUpdate(),headManager._pendingUpdate=null)}))),null}},"./node_modules/next/dist/shared/lib/utils/warn-once.js":(__unused_webpack_module,exports)=>{"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),Object.defineProperty(exports,"warnOnce",{enumerable:!0,get:function(){return warnOnce}});let warnOnce=_=>{}},"./node_modules/next/head.js":(module,__unused_webpack_exports,__webpack_require__)=>{module.exports=__webpack_require__("./node_modules/next/dist/shared/lib/head.js")}}]);