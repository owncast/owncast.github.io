"use strict";(self.webpackChunkowncast_web=self.webpackChunkowncast_web||[]).push([[7383],{"./node_modules/@storybook/addon-docs/node_modules/@mdx-js/react/lib/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{BN:()=>MDXContext,RP:()=>useMDXComponents,gz:()=>withMDXComponents,xA:()=>MDXProvider});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/next/dist/compiled/react/index.js");const MDXContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext({});function withMDXComponents(Component){return function boundMDXComponent(props){const allComponents=useMDXComponents(props.components);return react__WEBPACK_IMPORTED_MODULE_0__.createElement(Component,{...props,allComponents})}}function useMDXComponents(components){const contextComponents=react__WEBPACK_IMPORTED_MODULE_0__.useContext(MDXContext);return react__WEBPACK_IMPORTED_MODULE_0__.useMemo((()=>"function"==typeof components?components(contextComponents):{...contextComponents,...components}),[contextComponents,components])}const emptyObject={};function MDXProvider({components,children,disableParentContext}){let allComponents;return allComponents=disableParentContext?"function"==typeof components?components({}):components||emptyObject:useMDXComponents(components),react__WEBPACK_IMPORTED_MODULE_0__.createElement(MDXContext.Provider,{value:allComponents},children)}},"./.storybook/stories-category-doc-pages/colors/ComponentColors.stories.mdx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:()=>__namedExportsOrder,__page:()=>__page,default:()=>__WEBPACK_DEFAULT_EXPORT__});__webpack_require__("./node_modules/next/dist/compiled/react/index.js");var _tmp_tmp_OR70vSFkV7_owncast_web_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@storybook/addon-docs/node_modules/@mdx-js/react/lib/index.js"),_storybook_addon_docs__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@storybook/addon-docs/dist/index.mjs"),_Color__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./.storybook/stories-category-doc-pages/colors/Color.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/next/dist/compiled/react/jsx-runtime.js");function _createMdxContent(props){const _components=Object.assign({h2:"h2",p:"p"},(0,_tmp_tmp_OR70vSFkV7_owncast_web_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim__WEBPACK_IMPORTED_MODULE_4__.RP)(),props.components);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_storybook_addon_docs__WEBPACK_IMPORTED_MODULE_1__.W8,{title:"owncast/Styles/Colors/Components",parameters:{previewTabs:{canvas:{hidden:!0}},chromatic:{disableSnapshot:!0}}}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_components.h2,{id:"component-colors",children:"Component Colors"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_components.p,{children:"These are the specific colors used for components in the web application. They point to colors in the Owncast color palette but CSS variable names can be overwritten for customizing the theme."}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_storybook_addon_docs__WEBPACK_IMPORTED_MODULE_1__.rE,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_storybook_addon_docs__WEBPACK_IMPORTED_MODULE_1__.Jl,{title:"Text",subtitle:"",colors:{...(0,_Color__WEBPACK_IMPORTED_MODULE_2__.oU)("theme-color-components-text-on-light"),...(0,_Color__WEBPACK_IMPORTED_MODULE_2__.oU)("theme-color-components-text-on-dark")}}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_storybook_addon_docs__WEBPACK_IMPORTED_MODULE_1__.Jl,{title:"Primary Button",subtitle:"",colors:{...(0,_Color__WEBPACK_IMPORTED_MODULE_2__.oU)("theme-color-components-primary-button-background"),...(0,_Color__WEBPACK_IMPORTED_MODULE_2__.oU)("theme-color-components-primary-button-background-disabled"),...(0,_Color__WEBPACK_IMPORTED_MODULE_2__.oU)("theme-color-components-primary-button-text"),...(0,_Color__WEBPACK_IMPORTED_MODULE_2__.oU)("theme-color-components-primary-button-text-disabled"),...(0,_Color__WEBPACK_IMPORTED_MODULE_2__.oU)("theme-color-components-primary-button-border")}}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_storybook_addon_docs__WEBPACK_IMPORTED_MODULE_1__.Jl,{title:"Secondary Button",subtitle:"",colors:{...(0,_Color__WEBPACK_IMPORTED_MODULE_2__.oU)("theme-color-components-secondary-button-background"),...(0,_Color__WEBPACK_IMPORTED_MODULE_2__.oU)("theme-color-components-secondary-button-background-disabled"),...(0,_Color__WEBPACK_IMPORTED_MODULE_2__.oU)("theme-color-components-secondary-button-text"),...(0,_Color__WEBPACK_IMPORTED_MODULE_2__.oU)("theme-color-components-secondary-button-text-disabled"),...(0,_Color__WEBPACK_IMPORTED_MODULE_2__.oU)("theme-color-components-secondary-button-border")}}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_storybook_addon_docs__WEBPACK_IMPORTED_MODULE_1__.Jl,{title:"Chat",subtitle:"",colors:{...(0,_Color__WEBPACK_IMPORTED_MODULE_2__.oU)("theme-color-components-chat-background"),...(0,_Color__WEBPACK_IMPORTED_MODULE_2__.oU)("theme-color-components-chat-text")}}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_storybook_addon_docs__WEBPACK_IMPORTED_MODULE_1__.Jl,{title:"Modals",subtitle:"",colors:{...(0,_Color__WEBPACK_IMPORTED_MODULE_2__.oU)("theme-color-components-modal-header-background"),...(0,_Color__WEBPACK_IMPORTED_MODULE_2__.oU)("theme-color-components-modal-header-text"),...(0,_Color__WEBPACK_IMPORTED_MODULE_2__.oU)("theme-color-components-modal-content-background"),...(0,_Color__WEBPACK_IMPORTED_MODULE_2__.oU)("theme-color-components-modal-content-text")}}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_storybook_addon_docs__WEBPACK_IMPORTED_MODULE_1__.Jl,{title:"Page Content",subtitle:"Tabbed content",colors:{...(0,_Color__WEBPACK_IMPORTED_MODULE_2__.oU)("theme-color-components-content-background")}}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_storybook_addon_docs__WEBPACK_IMPORTED_MODULE_1__.Jl,{title:"Menus",subtitle:"",colors:{...(0,_Color__WEBPACK_IMPORTED_MODULE_2__.oU)("theme-color-components-menu-background"),...(0,_Color__WEBPACK_IMPORTED_MODULE_2__.oU)("theme-color-components-menu-item-text"),...(0,_Color__WEBPACK_IMPORTED_MODULE_2__.oU)("theme-color-components-menu-item-bg"),...(0,_Color__WEBPACK_IMPORTED_MODULE_2__.oU)("theme-color-components-menu-item-text"),...(0,_Color__WEBPACK_IMPORTED_MODULE_2__.oU)("theme-color-components-menu-item-hover-bg"),...(0,_Color__WEBPACK_IMPORTED_MODULE_2__.oU)("theme-color-components-menu-item-focus-bg")}}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_storybook_addon_docs__WEBPACK_IMPORTED_MODULE_1__.Jl,{title:"Form Fields",subtitle:"",colors:{...(0,_Color__WEBPACK_IMPORTED_MODULE_2__.oU)("theme-color-components-form-field-background"),...(0,_Color__WEBPACK_IMPORTED_MODULE_2__.oU)("theme-color-components-form-field-placeholder"),...(0,_Color__WEBPACK_IMPORTED_MODULE_2__.oU)("theme-color-components-form-field-text"),...(0,_Color__WEBPACK_IMPORTED_MODULE_2__.oU)("theme-color-components-menu-item-text"),...(0,_Color__WEBPACK_IMPORTED_MODULE_2__.oU)("theme-color-components-form-field-border")}}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_storybook_addon_docs__WEBPACK_IMPORTED_MODULE_1__.Jl,{title:"Video Player Status Bar",subtitle:"Displays duration and viewer count.",colors:{...(0,_Color__WEBPACK_IMPORTED_MODULE_2__.oU)("theme-color-components-video-status-bar-background"),...(0,_Color__WEBPACK_IMPORTED_MODULE_2__.oU)("theme-color-components-video-status-bar-foreground")}})]})]})}const __page=()=>{throw new Error("Docs-only story")};__page.parameters={docsOnly:!0};const componentMeta={title:"owncast/Styles/Colors/Components",parameters:{previewTabs:{canvas:{hidden:!0}},chromatic:{disableSnapshot:!0}},tags:["stories-mdx"],includeStories:["__page"]};componentMeta.parameters=componentMeta.parameters||{},componentMeta.parameters.docs={...componentMeta.parameters.docs||{},page:function MDXContent(props={}){const{wrapper:MDXLayout}=Object.assign({},(0,_tmp_tmp_OR70vSFkV7_owncast_web_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim__WEBPACK_IMPORTED_MODULE_4__.RP)(),props.components);return MDXLayout?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(MDXLayout,{...props,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_createMdxContent,{...props})}):_createMdxContent(props)}};const __WEBPACK_DEFAULT_EXPORT__=componentMeta,__namedExportsOrder=["__page"]},"./.storybook/stories-category-doc-pages/colors/Color.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{oU:()=>getColor});var _tmp_tmp_OR70vSFkV7_owncast_web_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/defineProperty.js"),__jsx=__webpack_require__("./node_modules/next/dist/compiled/react/index.js").createElement,Color=function Color(_ref){var color=_ref.color,resolvedColor=getComputedStyle(document.documentElement).getPropertyValue("--".concat(color));return __jsx("figure",{style:{borderRadius:"20px",width:"12vw",height:"12vw",minWidth:"100px",minHeight:"100px",borderWidth:"1.5px",borderStyle:"solid",borderColor:"lightgray",overflow:"hidden",margin:"0.3vw"}},__jsx("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",textShadow:"0 0 15px black",height:"70%",width:"100%",backgroundColor:resolvedColor}},__jsx("div",{style:{color:"white",alignText:"center"}},resolvedColor)),__jsx("figcaption",{style:{margin:"5px",color:"gray",fontSize:"0.95vw",textAlign:"center",lineHeight:1}},color))};Color.displayName="Color";var rowStyle={display:"flex",flexDirection:"row",flexWrap:"wrap",alignItems:"center"},ColorRow=function ColorRow(props){var colors=props.colors;return __jsx("div",{style:rowStyle},colors.map((function(color){return __jsx(Color,{key:color,color})})))};ColorRow.displayName="ColorRow";var getColor=function getColor(color){var colorValue=getComputedStyle(document.documentElement).getPropertyValue("--".concat(color));return(0,_tmp_tmp_OR70vSFkV7_owncast_web_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__.A)({},color,colorValue)};try{Color.displayName="Color",Color.__docgenInfo={description:"",displayName:"Color",props:{color:{defaultValue:null,description:"",name:"color",required:!0,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES[".storybook/stories-category-doc-pages/colors/Color.tsx#Color"]={docgenInfo:Color.__docgenInfo,name:"Color",path:".storybook/stories-category-doc-pages/colors/Color.tsx#Color"})}catch(__react_docgen_typescript_loader_error){}try{ColorRow.displayName="ColorRow",ColorRow.__docgenInfo={description:"",displayName:"ColorRow",props:{colors:{defaultValue:null,description:"",name:"colors",required:!0,type:{name:"string[]"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES[".storybook/stories-category-doc-pages/colors/Color.tsx#ColorRow"]={docgenInfo:ColorRow.__docgenInfo,name:"ColorRow",path:".storybook/stories-category-doc-pages/colors/Color.tsx#ColorRow"})}catch(__react_docgen_typescript_loader_error){}try{getColor.displayName="getColor",getColor.__docgenInfo={description:"",displayName:"getColor",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES[".storybook/stories-category-doc-pages/colors/Color.tsx#getColor"]={docgenInfo:getColor.__docgenInfo,name:"getColor",path:".storybook/stories-category-doc-pages/colors/Color.tsx#getColor"})}catch(__react_docgen_typescript_loader_error){}},"./node_modules/next/dist/compiled/react/cjs/react-jsx-runtime.production.min.js":(__unused_webpack_module,exports,__webpack_require__)=>{var f=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),k=Symbol.for("react.element"),l=Symbol.for("react.fragment"),m=Object.prototype.hasOwnProperty,n=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner;function p(c,a,g){var b,d={},e=null,h=null;for(b in void 0!==g&&(e=""+g),void 0!==a.key&&(e=""+a.key),void 0!==a.ref&&(h=a.ref),a)m.call(a,b)&&"key"!==b&&"ref"!==b&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps)void 0===d[b]&&(d[b]=a[b]);return{$$typeof:k,type:c,key:e,ref:h,props:d,_owner:n.current}}exports.Fragment=l,exports.jsx=p,exports.jsxs=p},"./node_modules/next/dist/compiled/react/jsx-runtime.js":(module,__unused_webpack_exports,__webpack_require__)=>{module.exports=__webpack_require__("./node_modules/next/dist/compiled/react/cjs/react-jsx-runtime.production.min.js")}}]);