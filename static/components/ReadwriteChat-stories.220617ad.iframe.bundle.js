(self.webpackChunkowncast_web=self.webpackChunkowncast_web||[]).push([[7638],{"./stories/ReadwriteChat.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Example:()=>Example,__namedExportsOrder:()=>__namedExportsOrder,default:()=>ReadwriteChat_stories});var jsx_runtime=__webpack_require__("./node_modules/next/dist/compiled/react/jsx-runtime.js"),react=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),es=__webpack_require__("./node_modules/recoil/es/index.js"),style=__webpack_require__("./node_modules/next/node_modules/styled-jsx/style.js"),style_default=__webpack_require__.n(style),react_error_boundary_esm=__webpack_require__("./node_modules/react-error-boundary/dist/react-error-boundary.esm.js"),ChatContainer=__webpack_require__("./components/chat/ChatContainer/ChatContainer.tsx"),ClientConfigStore=__webpack_require__("./components/stores/ClientConfigStore.tsx"),Header=__webpack_require__("./components/ui/Header/Header.tsx"),Theme=__webpack_require__("./components/theme/Theme.tsx"),ComponentError=__webpack_require__("./components/ui/ComponentError/ComponentError.tsx");function ReadWriteChatEmbed(){const currentUser=(0,es.vc)(ClientConfigStore.gN),messages=(0,es.vc)(ClientConfigStore.Qy),clientConfig=(0,es.vc)(ClientConfigStore.Ar),clientStatus=(0,es.vc)(ClientConfigStore.Bm),appState=(0,es.vc)(ClientConfigStore.uy),isChatAvailable=(0,es.vc)(ClientConfigStore.F5),{name,chatDisabled}=clientConfig,{videoAvailable}=appState,{streamTitle,online}=clientStatus,headerText=online&&streamTitle||name;return(0,react.useEffect)((()=>{document.body.classList.add("body-background")}),[]),(0,jsx_runtime.jsxs)("div",{className:"jsx-cf32fe5d739e776c",children:[(0,jsx_runtime.jsx)(style_default(),{id:"cf32fe5d739e776c",children:".body-background{background:var(--theme-color-components-chat-background)}"}),(0,jsx_runtime.jsxs)(react_error_boundary_esm.tH,{fallbackRender:({error})=>(0,jsx_runtime.jsx)(ComponentError.O,{componentName:"ReadWriteChatEmbed",message:error.message}),children:[(0,jsx_runtime.jsx)(ClientConfigStore.Xp,{}),(0,jsx_runtime.jsx)(Theme.S,{}),(0,jsx_runtime.jsx)(Header.A,{name:headerText,chatAvailable:!0,chatDisabled,online:videoAvailable}),currentUser&&(0,jsx_runtime.jsx)("div",{id:"chat-container",className:"jsx-cf32fe5d739e776c",children:(0,jsx_runtime.jsx)(ChatContainer.ChatContainer,{messages,usernameToHighlight:currentUser.displayName,chatUserId:currentUser.id,isModerator:currentUser.isModerator,showInput:!0,height:"92vh",chatAvailable:isChatAvailable})})]})]})}const ReadwriteChat_stories={title:"owncast/Chat/Embeds/Read-write chat",component:ReadWriteChatEmbed,parameters:{chromatic:{diffThreshold:.8}}},messages=JSON.parse('[{"type":"CHAT","id":"wY-MEXwnR","timestamp":"2022-04-28T20:30:27.001762726Z","user":{"id":"h_5GQ6E7R","displayName":"UserDisplayName42","displayColor":329,"createdAt":"2022-03-24T03:52:37.966584694Z","previousNames":["gifted-nobel","EliteMooseTaskForce"],"nameChangedAt":"2022-04-26T23:56:05.531287897Z","scopes":[""]},"body":"this is a test message"},{"type":"CHAT","id":"VhLGEXwnR","timestamp":"2022-04-28T20:30:28.806999545Z","user":{"id":"h_5GQ6E7R","displayName":"EliteMooseTaskForce","displayColor":329,"createdAt":"2022-03-24T03:52:37.966584694Z","previousNames":["gifted-nobel","EliteMooseTaskForce"],"nameChangedAt":"2022-04-26T23:56:05.531287897Z","scopes":[""]},"body":"Hit 3"},{"type":"CHAT","id":"GguMEuw7R","timestamp":"2022-04-28T20:30:34.500150601Z","user":{"id":"h_5GQ6E7R","displayName":"EliteMooseTaskForce","displayColor":329,"createdAt":"2022-03-24T03:52:37.966584694Z","previousNames":["gifted-nobel","EliteMooseTaskForce"],"nameChangedAt":"2022-04-26T23:56:05.531287897Z","scopes":[""]},"body":"Jkjk"},{"type":"CHAT","id":"y_-VEXwnR","timestamp":"2022-04-28T20:31:32.695583044Z","user":{"id":"h_5GQ6E7R","displayName":"EliteMooseTaskForce","displayColor":329,"createdAt":"2022-03-24T03:52:37.966584694Z","previousNames":["gifted-nobel","EliteMooseTaskForce"],"nameChangedAt":"2022-04-26T23:56:05.531287897Z","scopes":[""]},"body":"I&#39;m doing alright. How about you Hatnix?"},{"type":"CHAT","id":"qAaKEuwng","timestamp":"2022-04-28T20:34:16.22275314Z","user":{"id":"h_5GQ6E7R","displayName":"EliteMooseTaskForce","displayColor":329,"createdAt":"2022-03-24T03:52:37.966584694Z","previousNames":["gifted-nobel","EliteMooseTaskForce"],"nameChangedAt":"2022-04-26T23:56:05.531287897Z","scopes":[""]},"body":"Oh shiet I didn&#39;t think you would kill him"},{"type":"CHAT","id":"8wUFEuwnR","timestamp":"2022-04-28T20:34:21.624898714Z","user":{"id":"h_5GQ6E7R","displayName":"EliteMooseTaskForce","displayColor":329,"createdAt":"2022-03-24T03:52:37.966584694Z","previousNames":["gifted-nobel","EliteMooseTaskForce"],"nameChangedAt":"2022-04-26T23:56:05.531287897Z","scopes":[""]},"body":"Hahaha, ruthless"},{"type":"CHAT","id":"onYcPuQnR","timestamp":"2022-04-28T20:34:50.671024312Z","user":{"id":"h_5GQ6E7R","displayName":"EliteMooseTaskForce","displayColor":329,"createdAt":"2022-03-24T03:52:37.966584694Z","previousNames":["gifted-nobel","EliteMooseTaskForce"],"nameChangedAt":"2022-04-26T23:56:05.531287897Z","scopes":[""]},"body":"I&#39;ve never played it before"},{"type":"CHAT","id":"kORyEXQ7R","timestamp":"2022-04-28T20:40:29.761977233Z","user":{"id":"h_5GQ6E7R","displayName":"EliteMooseTaskForce","displayColor":329,"createdAt":"2022-03-24T03:52:37.966584694Z","previousNames":["gifted-nobel","EliteMooseTaskForce"],"nameChangedAt":"2022-04-26T23:56:05.531287897Z","scopes":[""]},"body":"brb real quick"},{"type":"CHAT","id":"F3DvsuQ7g","timestamp":"2022-04-28T20:50:29.451341783Z","user":{"id":"h_5GQ6E7R","displayName":"EliteMooseTaskForce","displayColor":329,"createdAt":"2022-03-24T03:52:37.966584694Z","previousNames":["gifted-nobel","EliteMooseTaskForce"],"nameChangedAt":"2022-04-26T23:56:05.531287897Z","scopes":[""]},"body":"I&#39;m back"},{"type":"CHAT","id":"AH2vsXwnR","timestamp":"2022-04-28T20:50:33.872156152Z","user":{"id":"h_5GQ6E7R","displayName":"EliteMooseTaskForce","displayColor":329,"createdAt":"2022-03-24T03:52:37.966584694Z","previousNames":["gifted-nobel","EliteMooseTaskForce"],"nameChangedAt":"2022-04-26T23:56:05.531287897Z","scopes":[""]},"body":"Whoa what happened here?"},{"type":"CHAT","id":"xGkOsuw7R","timestamp":"2022-04-28T20:50:53.202147658Z","user":{"id":"h_5GQ6E7R","displayName":"EliteMooseTaskForce","displayColor":329,"createdAt":"2022-03-24T03:52:37.966584694Z","previousNames":["gifted-nobel","EliteMooseTaskForce"],"nameChangedAt":"2022-04-26T23:56:05.531287897Z","scopes":[""]},"body":"Your dwarf was half naked."},{"type":"CHAT","id":"opIdsuw7g","timestamp":"2022-04-28T20:50:59.631595947Z","user":{"id":"h_5GQ6E7R","displayName":"EliteMooseTaskForce","displayColor":329,"createdAt":"2022-03-24T03:52:37.966584694Z","previousNames":["gifted-nobel","EliteMooseTaskForce"],"nameChangedAt":"2022-04-26T23:56:05.531287897Z","scopes":[""]},"body":"lol"},{"type":"CHAT","id":"JpwdsuQnR","timestamp":"2022-04-28T20:51:18.065535459Z","user":{"id":"vbh9gtPng","displayName":"𝓈𝓉𝒶𝓇𝒻𝒶𝓇𝑒𝓇™","displayColor":276,"createdAt":"2022-03-16T21:02:32.009965702Z","previousNames":["goth-volhard","𝓈𝓉𝒶𝓇𝒻𝒶𝓇𝑒𝓇™","𝒽𝒶𝓅𝓅𝓎 𝓈𝓉𝒶𝓇𝒻𝒶𝓇𝑒𝓇™","𝓈𝓉𝒶𝓇𝒻𝒶𝓇𝑒𝓇™","𝓈𝓉𝒶𝒶𝓇𝒻𝒶𝒶𝓇𝑒𝑒𝓇™","𝓈𝓉𝒶𝓇𝒻𝒶𝓇𝑒𝓇™"],"nameChangedAt":"2022-04-14T21:51:50.97992512Z","scopes":[""]},"body":"evening did i just see you running around in... nothing"},{"type":"CHAT","id":"R4WKsXw7R","timestamp":"2022-04-28T20:51:28.064914803Z","user":{"id":"vbh9gtPng","displayName":"𝓈𝓉𝒶𝓇𝒻𝒶𝓇𝑒𝓇™","displayColor":276,"createdAt":"2022-03-16T21:02:32.009965702Z","previousNames":["goth-volhard","𝓈𝓉𝒶𝓇𝒻𝒶𝓇𝑒𝓇™","𝒽𝒶𝓅𝓅𝓎 𝓈𝓉𝒶𝓇𝒻𝒶𝓇𝑒𝓇™","𝓈𝓉𝒶𝓇𝒻𝒶𝓇𝑒𝓇™","𝓈𝓉𝒶𝒶𝓇𝒻𝒶𝒶𝓇𝑒𝑒𝓇™","𝓈𝓉𝒶𝓇𝒻𝒶𝓇𝑒𝓇™"],"nameChangedAt":"2022-04-14T21:51:50.97992512Z","scopes":[""]},"body":"^^"},{"type":"CHAT","id":"g-PKyXw7g","timestamp":"2022-04-28T20:51:47.936500772Z","user":{"id":"h_5GQ6E7R","displayName":"EliteMooseTaskForce","displayColor":329,"createdAt":"2022-03-24T03:52:37.966584694Z","previousNames":["gifted-nobel","EliteMooseTaskForce"],"nameChangedAt":"2022-04-26T23:56:05.531287897Z","scopes":[""]},"body":"Lol Starfarer, so my eyes didnt deceive me."},{"type":"CHAT","id":"fV8Ksuw7R","timestamp":"2022-04-28T20:51:49.588744112Z","user":{"id":"h_5GQ6E7R","displayName":"EliteMooseTaskForce","displayColor":329,"createdAt":"2022-03-24T03:52:37.966584694Z","previousNames":["gifted-nobel","EliteMooseTaskForce"],"nameChangedAt":"2022-04-26T23:56:05.531287897Z","scopes":[""]},"body":"hahahaha"},{"type":"CHAT","id":"TaStyuwnR","timestamp":"2022-04-28T20:52:38.127528579Z","user":{"id":"vbh9gtPng","displayName":"𝓈𝓉𝒶𝓇𝒻𝒶𝓇𝑒𝓇™","displayColor":276,"createdAt":"2022-03-16T21:02:32.009965702Z","previousNames":["goth-volhard","𝓈𝓉𝒶𝓇𝒻𝒶𝓇𝑒𝓇™","𝒽𝒶𝓅𝓅𝓎 𝓈𝓉𝒶𝓇𝒻𝒶𝓇𝑒𝓇™","𝓈𝓉𝒶𝓇𝒻𝒶𝓇𝑒𝓇™","𝓈𝓉𝒶𝒶𝓇𝒻𝒶𝒶𝓇𝑒𝑒𝓇™","𝓈𝓉𝒶𝓇𝒻𝒶𝓇𝑒𝓇™"],"nameChangedAt":"2022-04-14T21:51:50.97992512Z","scopes":[""]},"body":"lol sounds nice"},{"type":"CHAT","id":"JGposuwng","timestamp":"2022-04-28T20:53:49.329567087Z","user":{"id":"GCa3J9P7R","displayName":"(ghost of)^10  * toudy49","displayColor":147,"createdAt":"2022-03-22T21:49:25.284237821Z","previousNames":["lucid-pike","toudy49","ghost of toudy49","ghost of ghost of toudy49","ghost of ghost of ghost of toudy49","ghost of ghost of ghost of ghost of toudy49","ghost of ghost of ghost of ghost of ghost of toudy49","ghost ofghost of ghost of ghost of ghost of ghost of toudy49","ghostof ghost of ghost of ghost of ghost of ghost of toudy49","(ghost of)^6  * toudy49","(ghost of)^7  * toudy49","(ghost of)^8  * toudy49","(ghost of)^9  * toudy49","(ghost of)^10  * toudy49"],"nameChangedAt":"2022-04-11T21:01:19.938445828Z","scopes":[""]},"body":"!hydrate"},{"type":"CHAT","id":"T4tTsuwng","timestamp":"2022-04-28T20:53:49.391636551Z","user":{"id":"fKINHKpnR","displayName":"hatnixbot","displayColor":325,"createdAt":"2021-11-24T08:11:32Z","previousNames":["hatnixbot"],"scopes":["CAN_SEND_SYSTEM_MESSAGES","CAN_SEND_MESSAGES","HAS_ADMIN_ACCESS"]},"body":"test 123"},{"type":"CHAT","id":"wUJTsuw7R","timestamp":"2022-04-28T20:53:54.073218761Z","user":{"id":"GCa3J9P7R","displayName":"(ghost of)^10  * toudy49","displayColor":147,"createdAt":"2022-03-22T21:49:25.284237821Z","previousNames":["lucid-pike","toudy49","ghost of toudy49","ghost of ghost of toudy49","ghost of ghost of ghost of toudy49","ghost of ghost of ghost of ghost of toudy49","ghost of ghost of ghost of ghost of ghost of toudy49","ghost ofghost of ghost of ghost of ghost of ghost of toudy49","ghostof ghost of ghost of ghost of ghost of ghost of toudy49","(ghost of)^6  * toudy49","(ghost of)^7  * toudy49","(ghost of)^8  * toudy49","(ghost of)^9  * toudy49","(ghost of)^10  * toudy49"],"nameChangedAt":"2022-04-11T21:01:19.938445828Z","scopes":[""]},"body":"!stretch"},{"type":"CHAT","id":"S_Joyuw7R","timestamp":"2022-04-28T20:53:54.119778013Z","user":{"id":"fKINHKpnR","displayName":"hatnixbot","displayColor":325,"createdAt":"2021-11-24T08:11:32Z","previousNames":["hatnixbot"],"scopes":["CAN_SEND_SYSTEM_MESSAGES","CAN_SEND_MESSAGES","HAS_ADMIN_ACCESS"]},"body":"blah blah"},{"type":"CHAT","id":"MtYTyXwnR","timestamp":"2022-04-28T20:53:57.796985761Z","user":{"id":"vbh9gtPng","displayName":"𝓈𝓉𝒶𝓇𝒻𝒶𝓇𝑒𝓇™","displayColor":276,"createdAt":"2022-03-16T21:02:32.009965702Z","previousNames":["goth-volhard","𝓈𝓉𝒶𝓇𝒻𝒶𝓇𝑒𝓇™","𝒽𝒶𝓅𝓅𝓎 𝓈𝓉𝒶𝓇𝒻𝒶𝓇𝑒𝓇™","𝓈𝓉𝒶𝓇𝒻𝒶𝓇𝑒𝓇™","𝓈𝓉𝒶𝒶𝓇𝒻𝒶𝒶𝓇𝑒𝑒𝓇™","𝓈𝓉𝒶𝓇𝒻𝒶𝓇𝑒𝓇™"],"nameChangedAt":"2022-04-14T21:51:50.97992512Z","scopes":[""]},"body":"heyy toudy"}]'),Page=()=>{const[currentUser,setCurrentUser]=(0,es.L4)(ClientConfigStore.gN),setMessages=(0,es.lZ)(ClientConfigStore.in),setClientConfig=(0,es.lZ)(ClientConfigStore.Ar),fakeConfig={chatDisabled:!1,name:"Fake Owncast Server",summary:"",logo:"",tags:[],nsfw:!1,extraPageContent:"",socialHandles:[],externalActions:[],customStyles:"",maxSocketPayloadSize:0,federation:void 0,notifications:void 0,authentication:void 0,appearanceVariables:void 0};return(0,react.useEffect)((()=>{setMessages(messages),setCurrentUser({...currentUser,displayName:"fake-chat-user"}),setClientConfig(fakeConfig)}),[]),(0,jsx_runtime.jsx)(ReadWriteChatEmbed,{})},Example={render:()=>(0,jsx_runtime.jsx)(es.bi,{children:(0,jsx_runtime.jsx)(Page,{})}),args:{}},__namedExportsOrder=["Example"];Example.parameters={...Example.parameters,docs:{...Example.parameters?.docs,source:{originalSource:"{\n  render: Template,\n  args: {}\n}",...Example.parameters?.docs?.source}}}},"./components/theme/Theme.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{S:()=>Theme});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/next/dist/compiled/react/jsx-runtime.js"),next_head__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/next/head.js"),next_head__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_1__),react__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),recoil__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/recoil/es/index.js"),_stores_ClientConfigStore__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./components/stores/ClientConfigStore.tsx");const Theme=()=>{const clientConfig=(0,recoil__WEBPACK_IMPORTED_MODULE_3__.vc)(_stores_ClientConfigStore__WEBPACK_IMPORTED_MODULE_4__.Ar),{appearanceVariables,customStyles}=clientConfig,appearanceVars=Object.keys(appearanceVariables||{}).filter((variable=>!!appearanceVariables[variable])).map((variable=>`--${variable}: ${appearanceVariables[variable]}`)),[themeColor,setThemeColor]=(0,react__WEBPACK_IMPORTED_MODULE_2__.useState)("#fff");return(0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)((()=>{const color=getComputedStyle(document.documentElement).getPropertyValue("--theme-color-background-header");setThemeColor(color)}),[appearanceVars]),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(next_head__WEBPACK_IMPORTED_MODULE_1___default(),{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("meta",{name:"theme-color",content:themeColor})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("style",{dangerouslySetInnerHTML:{__html:`\n\t\t\t\t:root {\n\t\t\t\t\t${appearanceVars.join(";\n")}\n\t\t\t\t}\n\t\t\t`}}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("style",{dangerouslySetInnerHTML:{__html:`\n\t\t\t\t${customStyles}\n\t\t\t`}})]})};try{Theme.displayName="Theme",Theme.__docgenInfo={description:"",displayName:"Theme",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["components/theme/Theme.tsx#Theme"]={docgenInfo:Theme.__docgenInfo,name:"Theme",path:"components/theme/Theme.tsx#Theme"})}catch(__react_docgen_typescript_loader_error){}},"./components/ui/Header/Header.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Y:()=>Header,A:()=>Header_Header});var jsx_runtime=__webpack_require__("./node_modules/next/dist/compiled/react/jsx-runtime.js"),avatar=__webpack_require__("./node_modules/antd/es/avatar/index.js"),tooltip=__webpack_require__("./node_modules/antd/es/tooltip/index.js"),react=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),classnames=__webpack_require__("./node_modules/classnames/index.js"),classnames_default=__webpack_require__.n(classnames),dynamic=__webpack_require__("./node_modules/next/dynamic.js"),dynamic_default=__webpack_require__.n(dynamic),next_link=__webpack_require__("./node_modules/next/link.js"),link_default=__webpack_require__.n(next_link),injectStylesIntoStyleTag=__webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"),injectStylesIntoStyleTag_default=__webpack_require__.n(injectStylesIntoStyleTag),styleDomAPI=__webpack_require__("./node_modules/style-loader/dist/runtime/styleDomAPI.js"),styleDomAPI_default=__webpack_require__.n(styleDomAPI),insertBySelector=__webpack_require__("./node_modules/style-loader/dist/runtime/insertBySelector.js"),insertBySelector_default=__webpack_require__.n(insertBySelector),setAttributesWithoutAttributes=__webpack_require__("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"),setAttributesWithoutAttributes_default=__webpack_require__.n(setAttributesWithoutAttributes),insertStyleElement=__webpack_require__("./node_modules/style-loader/dist/runtime/insertStyleElement.js"),insertStyleElement_default=__webpack_require__.n(insertStyleElement),styleTagTransform=__webpack_require__("./node_modules/style-loader/dist/runtime/styleTagTransform.js"),styleTagTransform_default=__webpack_require__.n(styleTagTransform),Header_module=__webpack_require__("./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[17].use[1]!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[17].use[3]!./components/ui/Header/Header.module.scss"),options={};options.styleTagTransform=styleTagTransform_default(),options.setAttributes=setAttributesWithoutAttributes_default(),options.insert=insertBySelector_default().bind(null,"head"),options.domAPI=styleDomAPI_default(),options.insertStyleElement=insertStyleElement_default();injectStylesIntoStyleTag_default()(Header_module.A,options);const Header_Header_module=Header_module.A&&Header_module.A.locals?Header_module.A.locals:void 0,UserDropdown=dynamic_default()((()=>Promise.all([__webpack_require__.e(5367),__webpack_require__.e(400),__webpack_require__.e(461),__webpack_require__.e(7232),__webpack_require__.e(7590),__webpack_require__.e(6230),__webpack_require__.e(9537),__webpack_require__.e(9973),__webpack_require__.e(1721),__webpack_require__.e(8805),__webpack_require__.e(7405)]).then(__webpack_require__.bind(__webpack_require__,"./components/common/UserDropdown/UserDropdown.tsx")).then((mod=>mod.UserDropdown))),{loadableGenerated:{webpack:()=>["./components/common/UserDropdown/UserDropdown.tsx"]},ssr:!1}),Header=({name,chatAvailable,chatDisabled,online})=>{const[canHideChat,setCanHideChat]=(0,react.useState)(!1);return(0,react.useEffect)((()=>{setCanHideChat(window.innerWidth>=768)}),[]),(0,jsx_runtime.jsxs)("header",{className:classnames_default()([`${Header_Header_module.header}`],"global-header"),children:[online?(0,jsx_runtime.jsx)(link_default(),{href:"#player",className:Header_Header_module.skipLink,children:"Skip to player"}):(0,jsx_runtime.jsx)(link_default(),{href:"#offline-message",className:Header_Header_module.skipLink,children:"Skip to offline message"}),(0,jsx_runtime.jsx)(link_default(),{href:"#skip-to-content",className:Header_Header_module.skipLink,children:"Skip to page content"}),(0,jsx_runtime.jsx)(link_default(),{href:"#footer",className:Header_Header_module.skipLink,children:"Skip to footer"}),(0,jsx_runtime.jsxs)("div",{className:Header_Header_module.logo,children:[(0,jsx_runtime.jsx)("div",{id:"header-logo",className:Header_Header_module.logoImage,children:(0,jsx_runtime.jsx)(avatar.A,{src:"/logo",size:"large",shape:"circle",className:Header_Header_module.avatar})}),(0,jsx_runtime.jsx)("h1",{className:Header_Header_module.title,id:"global-header-text",children:name})]}),chatAvailable&&!chatDisabled&&(0,jsx_runtime.jsx)(UserDropdown,{id:"user-menu",hideTitleOnMobile:!0,showToggleChatOption:canHideChat}),!chatAvailable&&!chatDisabled&&(0,jsx_runtime.jsx)(tooltip.A,{overlayClassName:Header_Header_module.toolTip,title:"Chat will be available when the stream is live.",placement:"left",children:(0,jsx_runtime.jsx)("span",{className:Header_Header_module.chatOfflineText,children:"Chat is offline"})})]})},Header_Header=Header;try{Header.displayName="Header",Header.__docgenInfo={description:"",displayName:"Header",props:{name:{defaultValue:null,description:"",name:"name",required:!0,type:{name:"string"}},chatAvailable:{defaultValue:null,description:"",name:"chatAvailable",required:!0,type:{name:"boolean"}},chatDisabled:{defaultValue:null,description:"",name:"chatDisabled",required:!0,type:{name:"boolean"}},online:{defaultValue:null,description:"",name:"online",required:!0,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["components/ui/Header/Header.tsx#Header"]={docgenInfo:Header.__docgenInfo,name:"Header",path:"components/ui/Header/Header.tsx#Header"})}catch(__react_docgen_typescript_loader_error){}},"./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[17].use[1]!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[17].use[3]!./components/ui/Header/Header.module.scss":(module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/css-loader/dist/runtime/sourceMaps.js"),_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__),_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js"),___CSS_LOADER_EXPORT___=__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());___CSS_LOADER_EXPORT___.push([module.id,".lExUq4dKjoRicHpyzHWE{height:var(--header-height);display:flex;align-items:center;justify-content:space-between;padding:.7rem var(--content-padding);box-shadow:0 1px 3px 1px rgba(0,0,0,.1);background-color:var(--theme-color-background-header);position:fixed;top:0;width:100%;z-index:200}.lExUq4dKjoRicHpyzHWE h1{margin-top:unset;margin-bottom:unset}@media only screen and (width <= 768px){.lExUq4dKjoRicHpyzHWE{position:fixed;top:0;width:100%}}.KraTghfB71nJvOgDmLJm{padding:.2rem;margin-right:.75rem;display:none}@media only screen and (width >= 768px){.KraTghfB71nJvOgDmLJm{display:block}}.Swta2my5HhIu7VFPCyAV{display:flex;align-items:center}.I2GuRAdZdoTdP7FMQWAQ{color:var(--theme-color-components-text-on-dark);font-family:var(--theme-text-display-font-family);margin-bottom:0;font-size:clamp(1rem,4vw,1.6rem);font-weight:600;white-space:nowrap;text-overflow:ellipsis;max-width:min(70vw,100vw - 6rem);overflow:hidden;line-height:1.4}.NZbiZO_nQVbUzMYov2JB{position:absolute;left:-10000px;top:auto;width:1px;height:1px;overflow:hidden}.NZbiZO_nQVbUzMYov2JB:focus{position:static;width:auto;height:auto}.zbc5UwkMpFUlClZn3bWy{cursor:default;color:var(--theme-color-components-text-on-light)}.sBcxSpoFymryLF2aUm1h{background-color:var(--theme-color-background-header);box-sizing:content-box;outline:hsla(0,0%,100%,.1490196078) solid 2px}.vHAxVLhIACDnZOK93V1W{color:var(--theme-color-palette-8);font-size:.75rem}.EerwGMPLNFHktLgghKaD{font-size:.8rem}","",{version:3,sources:["webpack://./components/ui/Header/Header.module.scss","webpack://./styles/mixins.scss"],names:[],mappings:"AAEA,sBACE,2BAAA,CACA,YAAA,CACA,kBAAA,CACA,6BAAA,CACA,oCAAA,CACA,uCAAA,CACA,qDAAA,CACA,cAAA,CACA,KAAA,CACA,UAAA,CACA,WAAA,CAEA,yBACE,gBAAA,CACA,mBAAA,CCFA,wCDbJ,sBAoBI,cAAA,CACA,KAAA,CACA,UAAA,CAAA,CAIJ,sBACE,aAAA,CACA,mBAAA,CACA,YAAA,CCvBE,wCDoBJ,sBAMI,aAAA,CAAA,CAIJ,sBACE,YAAA,CACA,kBAAA,CAGF,sBACE,gDAAA,CACA,iDAAA,CACA,eAAA,CACA,gCAAA,CACA,eAAA,CACA,kBAAA,CACA,sBAAA,CAIA,gCAAA,CACA,eAAA,CACA,eAAA,CAGF,sBACE,iBAAA,CACA,aAAA,CACA,QAAA,CACA,SAAA,CACA,UAAA,CACA,eAAA,CAGF,4BACE,eAAA,CACA,UAAA,CACA,WAAA,CAGF,sBACE,cAAA,CACA,iDAAA,CAGF,sBACE,qDAAA,CACA,sBAAA,CACA,6CAAA,CAGF,sBACE,kCAAA,CACA,gBAAA,CAGF,sBACE,eAAA",sourcesContent:["@import '../../../styles/mixins';\n\n.header {\n  height: var(--header-height);\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 0.7rem var(--content-padding);\n  box-shadow: 0 1px 3px 1px rgb(0 0 0 / 10%);\n  background-color: var(--theme-color-background-header);\n  position: fixed;\n  top: 0;\n  width: 100%;\n  z-index: 200;\n\n  h1 {\n    margin-top: unset;\n    margin-bottom: unset;\n  }\n\n  // fixes header on tablet and below\n  @include screen(tablet) {\n    position: fixed;\n    top: 0;\n    width: 100%;\n  }\n}\n\n.logoImage {\n  padding: 0.2rem;\n  margin-right: 0.75rem;\n  display: none;\n\n  @include screen(desktop) {\n    display: block;\n  }\n}\n\n.logo {\n  display: flex;\n  align-items: center;\n}\n\n.title {\n  color: var(--theme-color-components-text-on-dark);\n  font-family: var(--theme-text-display-font-family);\n  margin-bottom: 0;\n  font-size: clamp(1rem, 4vw, 1.6rem);\n  font-weight: 600;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n\n  // 6rem is an overapproximation of the width of\n  // the user menu\n  max-width: min(70vw, calc(100vw - 6rem));\n  overflow: hidden;\n  line-height: 1.4;\n}\n\n.skipLink {\n  position: absolute;\n  left: -10000px;\n  top: auto;\n  width: 1px;\n  height: 1px;\n  overflow: hidden;\n}\n\n.skipLink:focus {\n  position: static;\n  width: auto;\n  height: auto;\n}\n\n.offlineTag {\n  cursor: default;\n  color: var(--theme-color-components-text-on-light);\n}\n\n.avatar {\n  background-color: var(--theme-color-background-header);\n  box-sizing: content-box;\n  outline: #ffffff26 solid 2px;\n}\n\n.chatOfflineText {\n  color: var(--theme-color-palette-8);\n  font-size: 0.75rem;\n}\n\n.toolTip {\n  font-size: 0.8rem;\n}\n","@mixin flexCenter {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n@mixin screen($breakpoint) { \n    @if $breakpoint == desktop {    \n    @media only screen and (width >= 768px) {\n      @content;\n    }\n  }\n\n  // tablet will also apply to mobile as there is no cut-off for min-width, however changing this now could break CSS all over the site.\n  @if $breakpoint == tablet {\n    @media only screen and (width <= 768px) {\n      @content;\n    }\n  }\n\n  @if $breakpoint == mobile {\n    @media only screen and (width <= 481px) {\n      @content;\n    }\n  }\n}\n"],sourceRoot:""}]),___CSS_LOADER_EXPORT___.locals={header:"lExUq4dKjoRicHpyzHWE",logoImage:"KraTghfB71nJvOgDmLJm",logo:"Swta2my5HhIu7VFPCyAV",title:"I2GuRAdZdoTdP7FMQWAQ",skipLink:"NZbiZO_nQVbUzMYov2JB",offlineTag:"zbc5UwkMpFUlClZn3bWy",avatar:"sBcxSpoFymryLF2aUm1h",chatOfflineText:"vHAxVLhIACDnZOK93V1W",toolTip:"EerwGMPLNFHktLgghKaD"};const __WEBPACK_DEFAULT_EXPORT__=___CSS_LOADER_EXPORT___},"./node_modules/next/dist/shared/lib/amp-context.shared-runtime.js":(__unused_webpack_module,exports,__webpack_require__)=>{"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),Object.defineProperty(exports,"AmpStateContext",{enumerable:!0,get:function(){return AmpStateContext}});const AmpStateContext=__webpack_require__("./node_modules/@swc/helpers/cjs/_interop_require_default.cjs")._(__webpack_require__("./node_modules/next/dist/compiled/react/index.js")).default.createContext({})},"./node_modules/next/dist/shared/lib/amp-mode.js":(__unused_webpack_module,exports)=>{"use strict";function isInAmpMode(param){let{ampFirst=!1,hybrid=!1,hasQuery=!1}=void 0===param?{}:param;return ampFirst||hybrid&&hasQuery}Object.defineProperty(exports,"__esModule",{value:!0}),Object.defineProperty(exports,"isInAmpMode",{enumerable:!0,get:function(){return isInAmpMode}})},"./node_modules/next/dist/shared/lib/head.js":(module,exports,__webpack_require__)=>{var process=__webpack_require__("./node_modules/process/browser.js");Object.defineProperty(exports,"__esModule",{value:!0}),function _export(target,all){for(var name in all)Object.defineProperty(target,name,{enumerable:!0,get:all[name]})}(exports,{default:function(){return _default},defaultHead:function(){return defaultHead}});const _interop_require_default=__webpack_require__("./node_modules/@swc/helpers/cjs/_interop_require_default.cjs"),_interop_require_wildcard=__webpack_require__("./node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs"),_jsxruntime=__webpack_require__("./node_modules/next/dist/compiled/react/jsx-runtime.js"),_react=_interop_require_wildcard._(__webpack_require__("./node_modules/next/dist/compiled/react/index.js")),_sideeffect=_interop_require_default._(__webpack_require__("./node_modules/next/dist/shared/lib/side-effect.js")),_ampcontextsharedruntime=__webpack_require__("./node_modules/next/dist/shared/lib/amp-context.shared-runtime.js"),_headmanagercontextsharedruntime=__webpack_require__("./node_modules/next/dist/shared/lib/head-manager-context.shared-runtime.js"),_ampmode=__webpack_require__("./node_modules/next/dist/shared/lib/amp-mode.js");__webpack_require__("./node_modules/next/dist/shared/lib/utils/warn-once.js");function defaultHead(inAmpMode){void 0===inAmpMode&&(inAmpMode=!1);const head=[(0,_jsxruntime.jsx)("meta",{charSet:"utf-8"})];return inAmpMode||head.push((0,_jsxruntime.jsx)("meta",{name:"viewport",content:"width=device-width"})),head}function onlyReactElement(list,child){return"string"==typeof child||"number"==typeof child?list:child.type===_react.default.Fragment?list.concat(_react.default.Children.toArray(child.props.children).reduce(((fragmentList,fragmentChild)=>"string"==typeof fragmentChild||"number"==typeof fragmentChild?fragmentList:fragmentList.concat(fragmentChild)),[])):list.concat(child)}const METATYPES=["name","httpEquiv","charSet","itemProp"];function reduceComponents(headChildrenElements,props){const{inAmpMode}=props;return headChildrenElements.reduce(onlyReactElement,[]).reverse().concat(defaultHead(inAmpMode).reverse()).filter(function unique(){const keys=new Set,tags=new Set,metaTypes=new Set,metaCategories={};return h=>{let isUnique=!0,hasKey=!1;if(h.key&&"number"!=typeof h.key&&h.key.indexOf("$")>0){hasKey=!0;const key=h.key.slice(h.key.indexOf("$")+1);keys.has(key)?isUnique=!1:keys.add(key)}switch(h.type){case"title":case"base":tags.has(h.type)?isUnique=!1:tags.add(h.type);break;case"meta":for(let i=0,len=METATYPES.length;i<len;i++){const metatype=METATYPES[i];if(h.props.hasOwnProperty(metatype))if("charSet"===metatype)metaTypes.has(metatype)?isUnique=!1:metaTypes.add(metatype);else{const category=h.props[metatype],categories=metaCategories[metatype]||new Set;"name"===metatype&&hasKey||!categories.has(category)?(categories.add(category),metaCategories[metatype]=categories):isUnique=!1}}}return isUnique}}()).reverse().map(((c,i)=>{const key=c.key||i;if(process.env.__NEXT_OPTIMIZE_FONTS&&!inAmpMode&&"link"===c.type&&c.props.href&&["https://fonts.googleapis.com/css","https://use.typekit.net/"].some((url=>c.props.href.startsWith(url)))){const newProps={...c.props||{}};return newProps["data-href"]=newProps.href,newProps.href=void 0,newProps["data-optimized-fonts"]=!0,_react.default.cloneElement(c,newProps)}return _react.default.cloneElement(c,{key})}))}const _default=function Head(param){let{children}=param;const ampState=(0,_react.useContext)(_ampcontextsharedruntime.AmpStateContext),headManager=(0,_react.useContext)(_headmanagercontextsharedruntime.HeadManagerContext);return(0,_jsxruntime.jsx)(_sideeffect.default,{reduceComponentsToState:reduceComponents,headManager,inAmpMode:(0,_ampmode.isInAmpMode)(ampState),children})};("function"==typeof exports.default||"object"==typeof exports.default&&null!==exports.default)&&void 0===exports.default.__esModule&&(Object.defineProperty(exports.default,"__esModule",{value:!0}),Object.assign(exports.default,exports),module.exports=exports.default)},"./node_modules/next/dist/shared/lib/side-effect.js":(__unused_webpack_module,exports,__webpack_require__)=>{"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),Object.defineProperty(exports,"default",{enumerable:!0,get:function(){return SideEffect}});const _react=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),isServer="undefined"==typeof window,useClientOnlyLayoutEffect=isServer?()=>{}:_react.useLayoutEffect,useClientOnlyEffect=isServer?()=>{}:_react.useEffect;function SideEffect(props){const{headManager,reduceComponentsToState}=props;function emitChange(){if(headManager&&headManager.mountedInstances){const headElements=_react.Children.toArray(Array.from(headManager.mountedInstances).filter(Boolean));headManager.updateHead(reduceComponentsToState(headElements,props))}}var _headManager_mountedInstances;isServer&&(null==headManager||null==(_headManager_mountedInstances=headManager.mountedInstances)||_headManager_mountedInstances.add(props.children),emitChange());return useClientOnlyLayoutEffect((()=>{var _headManager_mountedInstances;return null==headManager||null==(_headManager_mountedInstances=headManager.mountedInstances)||_headManager_mountedInstances.add(props.children),()=>{var _headManager_mountedInstances;null==headManager||null==(_headManager_mountedInstances=headManager.mountedInstances)||_headManager_mountedInstances.delete(props.children)}})),useClientOnlyLayoutEffect((()=>(headManager&&(headManager._pendingUpdate=emitChange),()=>{headManager&&(headManager._pendingUpdate=emitChange)}))),useClientOnlyEffect((()=>(headManager&&headManager._pendingUpdate&&(headManager._pendingUpdate(),headManager._pendingUpdate=null),()=>{headManager&&headManager._pendingUpdate&&(headManager._pendingUpdate(),headManager._pendingUpdate=null)}))),null}},"./node_modules/next/dist/shared/lib/utils/warn-once.js":(__unused_webpack_module,exports)=>{"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),Object.defineProperty(exports,"warnOnce",{enumerable:!0,get:function(){return warnOnce}});let warnOnce=_=>{}},"./node_modules/next/head.js":(module,__unused_webpack_exports,__webpack_require__)=>{module.exports=__webpack_require__("./node_modules/next/dist/shared/lib/head.js")},"./node_modules/next/node_modules/styled-jsx/style.js":(module,__unused_webpack_exports,__webpack_require__)=>{module.exports=__webpack_require__("./node_modules/next/node_modules/styled-jsx/dist/index/index.js").style}}]);