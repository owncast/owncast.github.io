(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[490],{20640:function(e,t,n){"use strict";var a=n(11742),r={"text/plain":"Text","text/html":"Url",default:"Text"};e.exports=function(e,t){var n,o,c,l,i,s,d,u,f=!1;t||(t={}),c=t.debug||!1;try{if(i=a(),s=document.createRange(),d=document.getSelection(),(u=document.createElement("span")).textContent=e,u.ariaHidden="true",u.style.all="unset",u.style.position="fixed",u.style.top=0,u.style.clip="rect(0, 0, 0, 0)",u.style.whiteSpace="pre",u.style.webkitUserSelect="text",u.style.MozUserSelect="text",u.style.msUserSelect="text",u.style.userSelect="text",u.addEventListener("copy",function(n){if(n.stopPropagation(),t.format){if(n.preventDefault(),void 0===n.clipboardData){c&&console.warn("unable to use e.clipboardData"),c&&console.warn("trying IE specific stuff"),window.clipboardData.clearData();var a=r[t.format]||r.default;window.clipboardData.setData(a,e)}else n.clipboardData.clearData(),n.clipboardData.setData(t.format,e)}t.onCopy&&(n.preventDefault(),t.onCopy(n.clipboardData))}),document.body.appendChild(u),s.selectNodeContents(u),d.addRange(s),!document.execCommand("copy"))throw Error("copy command was unsuccessful");f=!0}catch(a){c&&console.error("unable to copy using execCommand: ",a),c&&console.warn("trying IE specific stuff");try{window.clipboardData.setData(t.format||"text",e),t.onCopy&&t.onCopy(window.clipboardData),f=!0}catch(a){c&&console.error("unable to copy using clipboardData: ",a),c&&console.error("falling back to prompt"),n="message"in t?t.message:"Copy to clipboard: #{key}, Enter",o=(/mac os x/i.test(navigator.userAgent)?"⌘":"Ctrl")+"+C",l=n.replace(/#{\s*key\s*}/g,o),window.prompt(l,e)}}finally{d&&("function"==typeof d.removeRange?d.removeRange(s):d.removeAllRanges()),u&&document.body.removeChild(u),i()}return f}},54779:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/admin/help",function(){return n(8746)}])},82913:function(e,t,n){"use strict";n.d(t,{default:function(){return b}});var a=n(4942),r=n(87462),o=n(93967),c=n.n(o),l=n(55548),i=n(67294),s=n(71946),d=n(41395),u=n(23132),f=n(32839),p=function(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&0>t.indexOf(a)&&(n[a]=e[a]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var r=0,a=Object.getOwnPropertySymbols(e);r<a.length;r++)0>t.indexOf(a[r])&&Object.prototype.propertyIsEnumerable.call(e,a[r])&&(n[a[r]]=e[a[r]]);return n},m=function(e){var t=e.prefixCls,n=e.className,o=e.hoverable,l=void 0===o||o,d=p(e,["prefixCls","className","hoverable"]);return i.createElement(s.C,null,function(e){var o=(0,e.getPrefixCls)("card",t),s=c()("".concat(o,"-grid"),n,(0,a.Z)({},"".concat(o,"-grid-hoverable"),l));return i.createElement("div",(0,r.Z)({},d,{className:s}))})},v=function(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&0>t.indexOf(a)&&(n[a]=e[a]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var r=0,a=Object.getOwnPropertySymbols(e);r<a.length;r++)0>t.indexOf(a[r])&&Object.prototype.propertyIsEnumerable.call(e,a[r])&&(n[a[r]]=e[a[r]]);return n},h=i.forwardRef(function(e,t){var n,o,p=i.useContext(s.E_),h=p.getPrefixCls,g=p.direction,b=i.useContext(d.Z),x=e.prefixCls,y=e.className,w=e.extra,Z=e.headStyle,C=e.bodyStyle,E=e.title,j=e.loading,N=e.bordered,O=e.size,k=e.type,P=e.cover,S=e.actions,z=e.tabList,_=e.children,A=e.activeTabKey,R=e.defaultActiveTabKey,D=e.tabBarExtraContent,I=e.hoverable,T=e.tabProps,L=v(e,["prefixCls","className","extra","headStyle","bodyStyle","title","loading","bordered","size","type","cover","actions","tabList","children","activeTabKey","defaultActiveTabKey","tabBarExtraContent","hoverable","tabProps"]),q=h("card",x),M=i.createElement(u.Z,{loading:!0,active:!0,paragraph:{rows:4},title:!1},_),G=void 0!==A,V=(0,r.Z)((0,r.Z)({},void 0===T?{}:T),(0,a.Z)((0,a.Z)({},G?"activeKey":"defaultActiveKey",G?A:R),"tabBarExtraContent",D)),B=z&&z.length?i.createElement(f.Z,(0,r.Z)({size:"large"},V,{className:"".concat(q,"-head-tabs"),onChange:function(t){var n;null===(n=e.onTabChange)||void 0===n||n.call(e,t)},items:z.map(function(e){var t;return{label:e.tab,key:e.key,disabled:null!==(t=e.disabled)&&void 0!==t&&t}})})):null;(E||w||B)&&(o=i.createElement("div",{className:"".concat(q,"-head"),style:void 0===Z?{}:Z},i.createElement("div",{className:"".concat(q,"-head-wrapper")},E&&i.createElement("div",{className:"".concat(q,"-head-title")},E),w&&i.createElement("div",{className:"".concat(q,"-extra")},w)),B));var F=P?i.createElement("div",{className:"".concat(q,"-cover")},P):null,H=i.createElement("div",{className:"".concat(q,"-body"),style:void 0===C?{}:C},j?M:_),K=S&&S.length?i.createElement("ul",{className:"".concat(q,"-actions")},S.map(function(e,t){return i.createElement("li",{style:{width:"".concat(100/S.length,"%")},key:"action-".concat(t)},i.createElement("span",null,e))})):null,U=(0,l.Z)(L,["onTabChange"]),X=O||b,W=c()(q,(0,a.Z)((0,a.Z)((0,a.Z)((0,a.Z)((0,a.Z)((0,a.Z)((0,a.Z)((0,a.Z)({},"".concat(q,"-loading"),j),"".concat(q,"-bordered"),void 0===N||N),"".concat(q,"-hoverable"),I),"".concat(q,"-contain-grid"),(i.Children.forEach(e.children,function(e){e&&e.type&&e.type===m&&(n=!0)}),n)),"".concat(q,"-contain-tabs"),z&&z.length),"".concat(q,"-").concat(X),X),"".concat(q,"-type-").concat(k),!!k),"".concat(q,"-rtl"),"rtl"===g),y);return i.createElement("div",(0,r.Z)({ref:t},U,{className:W}),o,F,H,K)}),g=function(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&0>t.indexOf(a)&&(n[a]=e[a]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var r=0,a=Object.getOwnPropertySymbols(e);r<a.length;r++)0>t.indexOf(a[r])&&Object.prototype.propertyIsEnumerable.call(e,a[r])&&(n[a[r]]=e[a[r]]);return n};h.Grid=m,h.Meta=function(e){return i.createElement(s.C,null,function(t){var n=t.getPrefixCls,a=e.prefixCls,o=e.className,l=e.avatar,s=e.title,d=e.description,u=g(e,["prefixCls","className","avatar","title","description"]),f=n("card",a),p=c()("".concat(f,"-meta"),o),m=l?i.createElement("div",{className:"".concat(f,"-meta-avatar")},l):null,v=s?i.createElement("div",{className:"".concat(f,"-meta-title")},s):null,h=d?i.createElement("div",{className:"".concat(f,"-meta-description")},d):null,b=v||h?i.createElement("div",{className:"".concat(f,"-meta-detail")},v,h):null;return i.createElement("div",(0,r.Z)({},u,{className:p}),m,b)})};var b=h},76066:function(e,t,n){"use strict";var a=n(87462),r=n(4942),o=n(93967),c=n.n(o),l=n(67294),i=n(71946),s=function(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&0>t.indexOf(a)&&(n[a]=e[a]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var r=0,a=Object.getOwnPropertySymbols(e);r<a.length;r++)0>t.indexOf(a[r])&&Object.prototype.propertyIsEnumerable.call(e,a[r])&&(n[a[r]]=e[a[r]]);return n};t.Z=function(e){var t=l.useContext(i.E_),n=t.getPrefixCls,o=t.direction,d=e.prefixCls,u=e.type,f=void 0===u?"horizontal":u,p=e.orientation,m=void 0===p?"center":p,v=e.orientationMargin,h=e.className,g=e.children,b=e.dashed,x=e.plain,y=s(e,["prefixCls","type","orientation","orientationMargin","className","children","dashed","plain"]),w=n("divider",d),Z=m.length>0?"-".concat(m):m,C=!!g,E="left"===m&&null!=v,j="right"===m&&null!=v,N=c()(w,"".concat(w,"-").concat(f),(0,r.Z)((0,r.Z)((0,r.Z)((0,r.Z)((0,r.Z)((0,r.Z)((0,r.Z)({},"".concat(w,"-with-text"),C),"".concat(w,"-with-text").concat(Z),C),"".concat(w,"-dashed"),!!b),"".concat(w,"-plain"),!!x),"".concat(w,"-rtl"),"rtl"===o),"".concat(w,"-no-default-orientation-margin-left"),E),"".concat(w,"-no-default-orientation-margin-right"),j),h),O=(0,a.Z)((0,a.Z)({},E&&{marginLeft:v}),j&&{marginRight:v});return l.createElement("div",(0,a.Z)({className:N},y,{role:"separator"}),g&&"vertical"!==f&&l.createElement("span",{className:"".concat(w,"-inner-text"),style:O},g))}},23132:function(e,t,n){"use strict";n.d(t,{Z:function(){return Z}});var a=n(4942),r=n(87462),o=n(71002),c=n(93967),l=n.n(c),i=n(67294),s=n(71946),d=n(55548),u=function(e){var t=e.prefixCls,n=e.className,o=e.style,c=e.size,s=e.shape,d=l()((0,a.Z)((0,a.Z)({},"".concat(t,"-lg"),"large"===c),"".concat(t,"-sm"),"small"===c)),u=l()((0,a.Z)((0,a.Z)((0,a.Z)({},"".concat(t,"-circle"),"circle"===s),"".concat(t,"-square"),"square"===s),"".concat(t,"-round"),"round"===s)),f=i.useMemo(function(){return"number"==typeof c?{width:c,height:c,lineHeight:"".concat(c,"px")}:{}},[c]);return i.createElement("span",{className:l()(t,d,u,n),style:(0,r.Z)((0,r.Z)({},f),o)})},f=n(1413),p={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M888 792H200V168c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v688c0 4.4 3.6 8 8 8h752c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM288 604a64 64 0 10128 0 64 64 0 10-128 0zm118-224a48 48 0 1096 0 48 48 0 10-96 0zm158 228a96 96 0 10192 0 96 96 0 10-192 0zm148-314a56 56 0 10112 0 56 56 0 10-112 0z"}}]},name:"dot-chart",theme:"outlined"},m=n(32206),v=function(e,t){return i.createElement(m.Z,(0,f.Z)((0,f.Z)({},e),{},{ref:t,icon:p}))};v.displayName="DotChartOutlined";var h=i.forwardRef(v),g=n(74902),b=function(e){var t=function(t){var n=e.width,a=e.rows;return Array.isArray(n)?n[t]:(void 0===a?2:a)-1===t?n:void 0},n=e.prefixCls,a=e.className,r=e.style,o=e.rows,c=(0,g.Z)(Array(o)).map(function(e,n){return i.createElement("li",{key:n,style:{width:t(n)}})});return i.createElement("ul",{className:l()(n,a),style:r},c)},x=function(e){var t=e.prefixCls,n=e.className,a=e.width,o=e.style;return i.createElement("h3",{className:l()(t,n),style:(0,r.Z)({width:a},o)})};function y(e){return e&&"object"===(0,o.Z)(e)?e:{}}var w=function(e){var t=e.prefixCls,n=e.loading,o=e.className,c=e.style,d=e.children,f=e.avatar,p=void 0!==f&&f,m=e.title,v=void 0===m||m,h=e.paragraph,g=void 0===h||h,w=e.active,Z=e.round,C=i.useContext(s.E_),E=C.getPrefixCls,j=C.direction,N=E("skeleton",t);if(n||!("loading"in e)){var O=!!p,k=!!v,P=!!g;if(O){var S=(0,r.Z)((0,r.Z)({prefixCls:"".concat(N,"-avatar")},k&&!P?{size:"large",shape:"square"}:{size:"large",shape:"circle"}),y(p));z=i.createElement("div",{className:"".concat(N,"-header")},i.createElement(u,(0,r.Z)({},S)))}if(k||P){if(k){var z,_,A,R,D=(0,r.Z)((0,r.Z)({prefixCls:"".concat(N,"-title")},!O&&P?{width:"38%"}:O&&P?{width:"50%"}:{}),y(v));A=i.createElement(x,(0,r.Z)({},D))}if(P){var I,T=(0,r.Z)((0,r.Z)({prefixCls:"".concat(N,"-paragraph")},(I={},O&&k||(I.width="61%"),!O&&k?I.rows=3:I.rows=2,I)),y(g));R=i.createElement(b,(0,r.Z)({},T))}_=i.createElement("div",{className:"".concat(N,"-content")},A,R)}var L=l()(N,(0,a.Z)((0,a.Z)((0,a.Z)((0,a.Z)({},"".concat(N,"-with-avatar"),O),"".concat(N,"-active"),w),"".concat(N,"-rtl"),"rtl"===j),"".concat(N,"-round"),Z),o);return i.createElement("div",{className:L,style:c},z,_)}return void 0!==d?d:null};w.Button=function(e){var t=e.prefixCls,n=e.className,o=e.active,c=e.block,f=e.size,p=(0,i.useContext(s.E_).getPrefixCls)("skeleton",t),m=(0,d.Z)(e,["prefixCls"]),v=l()(p,"".concat(p,"-element"),(0,a.Z)((0,a.Z)({},"".concat(p,"-active"),o),"".concat(p,"-block"),void 0!==c&&c),n);return i.createElement("div",{className:v},i.createElement(u,(0,r.Z)({prefixCls:"".concat(p,"-button"),size:void 0===f?"default":f},m)))},w.Avatar=function(e){var t=e.prefixCls,n=e.className,o=e.active,c=e.shape,f=e.size,p=(0,i.useContext(s.E_).getPrefixCls)("skeleton",t),m=(0,d.Z)(e,["prefixCls","className"]),v=l()(p,"".concat(p,"-element"),(0,a.Z)({},"".concat(p,"-active"),o),n);return i.createElement("div",{className:v},i.createElement(u,(0,r.Z)({prefixCls:"".concat(p,"-avatar"),shape:void 0===c?"circle":c,size:void 0===f?"default":f},m)))},w.Input=function(e){var t=e.prefixCls,n=e.className,o=e.active,c=e.block,f=e.size,p=(0,i.useContext(s.E_).getPrefixCls)("skeleton",t),m=(0,d.Z)(e,["prefixCls"]),v=l()(p,"".concat(p,"-element"),(0,a.Z)((0,a.Z)({},"".concat(p,"-active"),o),"".concat(p,"-block"),c),n);return i.createElement("div",{className:v},i.createElement(u,(0,r.Z)({prefixCls:"".concat(p,"-input"),size:void 0===f?"default":f},m)))},w.Image=function(e){var t=e.prefixCls,n=e.className,r=e.style,o=e.active,c=(0,i.useContext(s.E_).getPrefixCls)("skeleton",t),d=l()(c,"".concat(c,"-element"),(0,a.Z)({},"".concat(c,"-active"),o),n);return i.createElement("div",{className:d},i.createElement("div",{className:l()("".concat(c,"-image"),n),style:r},i.createElement("svg",{viewBox:"0 0 1098 1024",xmlns:"http://www.w3.org/2000/svg",className:"".concat(c,"-image-svg")},i.createElement("path",{d:"M365.714286 329.142857q0 45.714286-32.036571 77.677714t-77.677714 32.036571-77.677714-32.036571-32.036571-77.677714 32.036571-77.677714 77.677714-32.036571 77.677714 32.036571 32.036571 77.677714zM950.857143 548.571429l0 256-804.571429 0 0-109.714286 182.857143-182.857143 91.428571 91.428571 292.571429-292.571429zM1005.714286 146.285714l-914.285714 0q-7.460571 0-12.873143 5.412571t-5.412571 12.873143l0 694.857143q0 7.460571 5.412571 12.873143t12.873143 5.412571l914.285714 0q7.460571 0 12.873143-5.412571t5.412571-12.873143l0-694.857143q0-7.460571-5.412571-12.873143t-12.873143-5.412571zM1097.142857 164.571429l0 694.857143q0 37.741714-26.843429 64.585143t-64.585143 26.843429l-914.285714 0q-37.741714 0-64.585143-26.843429t-26.843429-64.585143l0-694.857143q0-37.741714 26.843429-64.585143t64.585143-26.843429l914.285714 0q37.741714 0 64.585143 26.843429t26.843429 64.585143z",className:"".concat(c,"-image-path")}))))},w.Node=function(e){var t=e.prefixCls,n=e.className,r=e.style,o=e.active,c=e.children,d=(0,i.useContext(s.E_).getPrefixCls)("skeleton",t),u=l()(d,"".concat(d,"-element"),(0,a.Z)({},"".concat(d,"-active"),o),n),f=null!=c?c:i.createElement(h,null);return i.createElement("div",{className:u},i.createElement("div",{className:l()("".concat(d,"-image"),n),style:r},f))};var Z=w},60539:function(e,t,n){"use strict";var a=n(75263).default,r=n(64836).default;t.Z=void 0;var o=r(n(10434)),c=r(n(93967)),l=a(n(67294)),i=n(99739),s=function(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&0>t.indexOf(a)&&(n[a]=e[a]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var r=0,a=Object.getOwnPropertySymbols(e);r<a.length;r++)0>t.indexOf(a[r])&&Object.prototype.propertyIsEnumerable.call(e,a[r])&&(n[a[r]]=e[a[r]]);return n};t.Z=function(e){return l.createElement(i.ConfigConsumer,null,function(t){var n=t.getPrefixCls,a=e.prefixCls,r=e.className,i=e.avatar,d=e.title,u=e.description,f=s(e,["prefixCls","className","avatar","title","description"]),p=n("card",a),m=(0,c.default)("".concat(p,"-meta"),r),v=i?l.createElement("div",{className:"".concat(p,"-meta-avatar")},i):null,h=d?l.createElement("div",{className:"".concat(p,"-meta-title")},d):null,g=u?l.createElement("div",{className:"".concat(p,"-meta-description")},u):null,b=h||g?l.createElement("div",{className:"".concat(p,"-meta-detail")},h,g):null;return l.createElement("div",(0,o.default)({},f,{className:m}),v,b)})}},8746:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return j}});var a=n(85893),r=n(6647),o=n(55050),c=n(28481),l=n(90622),i=n(76066),s=n(82913),d=n(60539),u=n(14073);n(67294);var f=n(5152),p=n.n(f),m=n(695);let v=p()(()=>n.e(4917).then(n.t.bind(n,54917,23)),{loadableGenerated:{webpack:()=>[54917]},ssr:!1}),h=p()(()=>n.e(6977).then(n.t.bind(n,96977,23)),{loadableGenerated:{webpack:()=>[96977]},ssr:!1}),g=p()(()=>n.e(9663).then(n.t.bind(n,29663,23)),{loadableGenerated:{webpack:()=>[29663]},ssr:!1}),b=p()(()=>n.e(3892).then(n.t.bind(n,33892,23)),{loadableGenerated:{webpack:()=>[33892]},ssr:!1}),x=p()(()=>n.e(7418).then(n.t.bind(n,37418,23)),{loadableGenerated:{webpack:()=>[37418]},ssr:!1}),y=p()(()=>n.e(9908).then(n.t.bind(n,9908,23)),{loadableGenerated:{webpack:()=>[9908]},ssr:!1}),w=p()(()=>n.e(4434).then(n.t.bind(n,64434,23)),{loadableGenerated:{webpack:()=>[64434]},ssr:!1}),Z=p()(()=>n.e(5209).then(n.t.bind(n,5209,23)),{loadableGenerated:{webpack:()=>[5209]},ssr:!1}),C=p()(()=>n.e(8792).then(n.t.bind(n,58792,23)),{loadableGenerated:{webpack:()=>[58792]},ssr:!1}),E=p()(()=>n.e(5736).then(n.t.bind(n,95736,23)),{loadableGenerated:{webpack:()=>[95736]},ssr:!1});function j(){let e=[{icon:(0,a.jsx)(C,{style:{fontSize:"24px"}}),title:"I want to configure my owncast instance",content:(0,a.jsx)("div",{children:(0,a.jsxs)("a",{href:"https://owncast.online/docs/configuration/?source=admin",target:"_blank",rel:"noopener noreferrer",children:[(0,a.jsx)(w,{})," Learn more"]})})},{icon:(0,a.jsx)(g,{style:{fontSize:"24px"}}),title:"Help configuring my broadcasting software",content:(0,a.jsx)("div",{children:(0,a.jsxs)("a",{href:"https://owncast.online/docs/broadcasting/?source=admin",target:"_blank",rel:"noopener noreferrer",children:[(0,a.jsx)(w,{})," Learn more"]})})},{icon:(0,a.jsx)(y,{style:{fontSize:"24px"}}),title:"I want to embed my stream into another site",content:(0,a.jsx)("div",{children:(0,a.jsxs)("a",{href:"https://owncast.online/docs/embed/?source=admin",target:"_blank",rel:"noopener noreferrer",children:[(0,a.jsx)(w,{})," Learn more"]})})},{icon:(0,a.jsx)(x,{style:{fontSize:"24px"}}),title:"I want to customize my website",content:(0,a.jsx)("div",{children:(0,a.jsxs)("a",{href:"https://owncast.online/docs/website/?source=admin",target:"_blank",rel:"noopener noreferrer",children:[(0,a.jsx)(w,{})," Learn more"]})})},{icon:(0,a.jsx)(E,{style:{fontSize:"24px"}}),title:"I want to tweak my video output",content:(0,a.jsx)("div",{children:(0,a.jsxs)("a",{href:"https://owncast.online/docs/encoding/?source=admin",target:"_blank",rel:"noopener noreferrer",children:[(0,a.jsx)(w,{})," Learn more"]})})},{icon:(0,a.jsx)(b,{style:{fontSize:"24px"}}),title:"I want to use an external storage provider",content:(0,a.jsx)("div",{children:(0,a.jsxs)("a",{href:"https://owncast.online/docs/storage/?source=admin",target:"_blank",rel:"noopener noreferrer",children:[(0,a.jsx)(w,{})," Learn more"]})})}],t=[{icon:(0,a.jsx)(h,{style:{fontSize:"24px"}}),title:"I found a bug",content:(0,a.jsxs)("div",{children:["If you found a bug, then please",(0,a.jsxs)("a",{href:"https://github.com/owncast/owncast/issues/new/choose",target:"_blank",rel:"noopener noreferrer",children:[" ","let us know"]})]})},{icon:(0,a.jsx)(Z,{style:{fontSize:"24px"}}),title:"I have a general question",content:(0,a.jsxs)("div",{children:["Most general questions are answered in our",(0,a.jsxs)("a",{href:"https://owncast.online/faq/?source=admin",target:"_blank",rel:"noopener noreferrer",children:[" ","FAQ"]})," ","or exist in our"," ",(0,a.jsx)("a",{href:"https://github.com/owncast/owncast/discussions",target:"_blank",rel:"noopener noreferrer",children:"discussions"})]})},{icon:(0,a.jsx)(v,{style:{fontSize:"24px"}}),title:"I want to build add-ons for Owncast",content:(0,a.jsxs)("div",{children:["You can build your own bots, overlays, tools and add-ons with our",(0,a.jsx)("a",{href:"https://owncast.online/thirdparty?source=admin",target:"_blank",rel:"noopener noreferrer",children:"\xa0developer APIs.\xa0"})]})}];return(0,a.jsxs)("div",{className:"help-page",children:[(0,a.jsx)(u.Z,{style:{textAlign:"center"},children:"How can we help you?"}),(0,a.jsxs)(r.Z,{gutter:[16,16],justify:"space-around",align:"middle",children:[(0,a.jsxs)(o.Z,{xs:24,lg:12,style:{textAlign:"center"},children:[(0,a.jsx)(c.ZP,{status:"500"}),(0,a.jsx)(u.Z,{level:2,children:"Troubleshooting"}),(0,a.jsx)(l.Z,{target:"_blank",rel:"noopener noreferrer",href:"https://owncast.online/docs/troubleshooting/?source=admin",icon:(0,a.jsx)(w,{}),type:"primary",children:"Fix your problems"})]}),(0,a.jsxs)(o.Z,{xs:24,lg:12,style:{textAlign:"center"},children:[(0,a.jsx)(c.ZP,{status:"404"}),(0,a.jsx)(u.Z,{level:2,children:"Documentation"}),(0,a.jsx)(l.Z,{target:"_blank",rel:"noopener noreferrer",href:"https://owncast.online/docs?source=admin",icon:(0,a.jsx)(w,{}),type:"primary",children:"Read the Docs"})]})]}),(0,a.jsx)(i.Z,{}),(0,a.jsx)(u.Z,{level:2,children:"Common tasks"}),(0,a.jsx)(r.Z,{gutter:[16,16],children:e.map(e=>(0,a.jsx)(o.Z,{xs:24,lg:12,children:(0,a.jsx)(s.default,{children:(0,a.jsx)(d.Z,{avatar:e.icon,title:e.title,description:e.content})})},e.title))}),(0,a.jsx)(i.Z,{}),(0,a.jsx)(u.Z,{level:2,children:"Other"}),(0,a.jsx)(r.Z,{gutter:[16,16],children:t.map(e=>(0,a.jsx)(o.Z,{xs:24,lg:12,children:(0,a.jsx)(s.default,{children:(0,a.jsx)(d.Z,{avatar:e.icon,title:e.title,description:e.content})})},e.title))})]})}j.getLayout=function(e){return(0,a.jsx)(m.l,{page:e})}},60057:function(e,t,n){"use strict";n.d(t,{Z:function(){return y}});var a=n(4942),r=n(1413),o=n(97685),c=n(45987),l=n(67294),i=n(25645),s=n(93967),d=n.n(s),u={adjustX:1,adjustY:1},f=[0,0],p={topLeft:{points:["bl","tl"],overflow:u,offset:[0,-4],targetOffset:f},topCenter:{points:["bc","tc"],overflow:u,offset:[0,-4],targetOffset:f},topRight:{points:["br","tr"],overflow:u,offset:[0,-4],targetOffset:f},bottomLeft:{points:["tl","bl"],overflow:u,offset:[0,4],targetOffset:f},bottomCenter:{points:["tc","bc"],overflow:u,offset:[0,4],targetOffset:f},bottomRight:{points:["tr","br"],overflow:u,offset:[0,4],targetOffset:f}},m=n(79097),v=n(90985),h=n(53792),g=m.Z.ESC,b=m.Z.TAB,x=["arrow","prefixCls","transitionName","animation","align","placement","placements","getPopupContainer","showAction","hideAction","overlayClassName","overlayStyle","visible","trigger","autoFocus"],y=l.forwardRef(function(e,t){var n,s,u,f,m,y,w,Z,C,E,j,N,O,k,P,S,z=e.arrow,_=void 0!==z&&z,A=e.prefixCls,R=void 0===A?"rc-dropdown":A,D=e.transitionName,I=e.animation,T=e.align,L=e.placement,q=e.placements,M=e.getPopupContainer,G=e.showAction,V=e.hideAction,B=e.overlayClassName,F=e.overlayStyle,H=e.visible,K=e.trigger,U=void 0===K?["hover"]:K,X=e.autoFocus,W=(0,c.Z)(e,x),Y=l.useState(),Q=(0,o.Z)(Y,2),J=Q[0],$=Q[1],ee="visible"in e?H:J,et=l.useRef(null);l.useImperativeHandle(t,function(){return et.current}),u=(s={visible:ee,setTriggerVisible:$,triggerRef:et,onVisibleChange:e.onVisibleChange,autoFocus:X}).visible,f=s.setTriggerVisible,m=s.triggerRef,y=s.onVisibleChange,w=s.autoFocus,Z=l.useRef(!1),C=function(){if(u&&m.current){var e,t,n,a;null===(e=m.current)||void 0===e||null===(t=e.triggerRef)||void 0===t||null===(n=t.current)||void 0===n||null===(a=n.focus)||void 0===a||a.call(n),f(!1),"function"==typeof y&&y(!1)}},E=function(){var e,t,n,a,r=(0,h.tS)(null===(e=m.current)||void 0===e?void 0:null===(t=e.popupRef)||void 0===t?void 0:null===(n=t.current)||void 0===n?void 0:null===(a=n.getElement)||void 0===a?void 0:a.call(n))[0];return null!=r&&!!r.focus&&(r.focus(),Z.current=!0,!0)},j=function(e){switch(e.keyCode){case g:C();break;case b:var t=!1;Z.current||(t=E()),t?e.preventDefault():C()}},l.useEffect(function(){return u?(window.addEventListener("keydown",j),w&&(0,v.Z)(E,3),function(){window.removeEventListener("keydown",j),Z.current=!1}):function(){Z.current=!1}},[u]);var en=function(){var t=e.overlay;return"function"==typeof t?t():t},ea=function(){var e=en();return l.createElement(l.Fragment,null,_&&l.createElement("div",{className:"".concat(R,"-arrow")}),e)},er=V;return er||-1===U.indexOf("contextMenu")||(er=["click"]),l.createElement(i.Z,(0,r.Z)((0,r.Z)({builtinPlacements:void 0===q?p:q},W),{},{prefixCls:R,ref:et,popupClassName:d()(B,(0,a.Z)({},"".concat(R,"-show-arrow"),_)),popupStyle:F,action:U,showAction:G,hideAction:er||[],popupPlacement:void 0===L?"bottomLeft":L,popupAlign:T,popupTransitionName:D,popupAnimation:I,popupVisible:ee,stretch:(N=e.minOverlayWidthMatchTrigger,O=e.alignPoint,"minOverlayWidthMatchTrigger"in e?N:!O)?"minWidth":"",popup:"function"==typeof e.overlay?ea:ea(),onPopupVisibleChange:function(t){var n=e.onVisibleChange;$(t),"function"==typeof n&&n(t)},onPopupClick:function(t){var n=e.onOverlayClick;$(!1),n&&n(t)},getPopupContainer:M}),(P=(k=e.children).props?k.props:{},S=d()(P.className,void 0!==(n=e.openClassName)?n:"".concat(R,"-open")),ee&&k?l.cloneElement(k,{className:S}):k))})},11742:function(e){e.exports=function(){var e=document.getSelection();if(!e.rangeCount)return function(){};for(var t=document.activeElement,n=[],a=0;a<e.rangeCount;a++)n.push(e.getRangeAt(a));switch(t.tagName.toUpperCase()){case"INPUT":case"TEXTAREA":t.blur();break;default:t=null}return e.removeAllRanges(),function(){"Caret"===e.type&&e.removeAllRanges(),e.rangeCount||n.forEach(function(t){e.addRange(t)}),t&&t.focus()}}}},function(e){e.O(0,[7298,6410,8768,5414,6906,7406,4716,2862,5063,811,2839,9162,4073,8481,695,2888,9774,179],function(){return e(e.s=54779)}),_N_E=e.O()}]);