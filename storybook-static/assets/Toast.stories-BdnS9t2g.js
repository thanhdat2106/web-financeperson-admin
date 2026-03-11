import{j as i}from"./jsx-runtime-BjG_zV1W.js";import{R as w}from"./index-B3TfwC44.js";import{c as b}from"./utils-BQHNewu7.js";import{c as k}from"./createLucideIcon-CgL17_8h.js";import{B as h}from"./button-peMBUCVJ.js";import"./index-DNLakH_k.js";import"./index-CU6i5cbR.js";import"./index-D1SQP9Z-.js";/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const se=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]],ae=k("circle-alert",se);/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ie=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]],ce=k("circle-check",ie);/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const de=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 16v-4",key:"1dtifu"}],["path",{d:"M12 8h.01",key:"e9boi3"}]],le=k("info",de);/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ue=[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]],me=k("triangle-alert",ue);/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pe=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],fe=k("x",pe),R=e=>{let o;const t=new Set,n=(f,s)=>{const u=typeof f=="function"?f(o):f;if(!Object.is(u,o)){const v=o;o=s??(typeof u!="object"||u===null)?u:Object.assign({},o,u),t.forEach(m=>m(o,v))}},r=()=>o,c={setState:n,getState:r,getInitialState:()=>S,subscribe:f=>(t.add(f),()=>t.delete(f))},S=o=e(n,r,c);return c},ge=e=>e?R(e):R,he=e=>e;function Se(e,o=he){const t=w.useSyncExternalStore(e.subscribe,w.useCallback(()=>o(e.getState()),[e,o]),w.useCallback(()=>o(e.getInitialState()),[e,o]));return w.useDebugValue(t),t}const F=e=>{const o=ge(e),t=n=>Se(o,n);return Object.assign(t,o),t},ve=e=>e?F(e):F,P={BASE_URL:"./",DEV:!1,MODE:"production",PROD:!0,SSR:!1,STORYBOOK:"true"},W=e=>!!e.dispatchFromDevtools&&typeof e.dispatch=="function",x=new Map,C=e=>{const o=x.get(e);return o?Object.fromEntries(Object.entries(o.stores).map(([t,n])=>[t,n.getState()])):{}},ye=(e,o,t)=>{if(e===void 0)return{type:"untracked",connection:o.connect(t)};const n=x.get(t.name);if(n)return{type:"tracked",store:e,...n};const r={connection:o.connect(t),stores:{}};return x.set(t.name,r),{type:"tracked",store:e,...r}},be=(e,o)=>{if(o===void 0)return;const t=x.get(e);t&&(delete t.stores[o],Object.keys(t.stores).length===0&&x.delete(e))},xe=e=>{var o,t;if(!e)return;const n=e.split(`
`),r=n.findIndex(T=>T.includes("api.setState"));if(r<0)return;const y=((o=n[r+1])==null?void 0:o.trim())||"";return(t=/.+ (.+) .+/.exec(y))==null?void 0:t[1]},ke=(e,o={})=>(t,n,r)=>{const{enabled:y,anonymousActionType:T,store:c,...S}=o;let f;try{f=(y??(P?"production":void 0)!=="production")&&window.__REDUX_DEVTOOLS_EXTENSION__}catch{}if(!f)return e(t,n,r);const{connection:s,...u}=ye(c,f,S);let v=!0;r.setState=(d,g,a)=>{const l=t(d,g);if(!v)return l;const M=a===void 0?{type:T||xe(new Error().stack)||"anonymous"}:typeof a=="string"?{type:a}:a;return c===void 0?(s==null||s.send(M,n()),l):(s==null||s.send({...M,type:`${c}/${M.type}`},{...C(S.name),[c]:r.getState()}),l)},r.devtools={cleanup:()=>{s&&typeof s.unsubscribe=="function"&&s.unsubscribe(),be(S.name,c)}};const m=(...d)=>{const g=v;v=!1,t(...d),v=g},_=e(r.setState,n,r);if(u.type==="untracked"?s==null||s.init(_):(u.stores[u.store]=r,s==null||s.init(Object.fromEntries(Object.entries(u.stores).map(([d,g])=>[d,d===u.store?_:g.getState()])))),W(r)){let d=!1;const g=r.dispatch;r.dispatch=(...a)=>{(P?"production":void 0)!=="production"&&a[0].type==="__setState"&&!d&&(console.warn('[zustand devtools middleware] "__setState" action type is reserved to set state from the devtools. Avoid using it.'),d=!0),g(...a)}}return s.subscribe(d=>{var g;switch(d.type){case"ACTION":if(typeof d.payload!="string"){console.error("[zustand devtools middleware] Unsupported action format");return}return A(d.payload,a=>{if(a.type==="__setState"){if(c===void 0){m(a.state);return}Object.keys(a.state).length!==1&&console.error(`
                    [zustand devtools middleware] Unsupported __setState action format.
                    When using 'store' option in devtools(), the 'state' should have only one key, which is a value of 'store' that was passed in devtools(),
                    and value of this only key should be a state object. Example: { "type": "__setState", "state": { "abc123Store": { "foo": "bar" } } }
                    `);const l=a.state[c];if(l==null)return;JSON.stringify(r.getState())!==JSON.stringify(l)&&m(l);return}W(r)&&r.dispatch(a)});case"DISPATCH":switch(d.payload.type){case"RESET":return m(_),c===void 0?s==null?void 0:s.init(r.getState()):s==null?void 0:s.init(C(S.name));case"COMMIT":if(c===void 0){s==null||s.init(r.getState());return}return s==null?void 0:s.init(C(S.name));case"ROLLBACK":return A(d.state,a=>{if(c===void 0){m(a),s==null||s.init(r.getState());return}m(a[c]),s==null||s.init(C(S.name))});case"JUMP_TO_STATE":case"JUMP_TO_ACTION":return A(d.state,a=>{if(c===void 0){m(a);return}JSON.stringify(r.getState())!==JSON.stringify(a[c])&&m(a[c])});case"IMPORT_STATE":{const{nextLiftedState:a}=d.payload,l=(g=a.computedStates.slice(-1)[0])==null?void 0:g.state;if(!l)return;m(c===void 0?l:l[c]),s==null||s.send(null,a);return}case"PAUSE_RECORDING":return v=!v}return}}),_},Te=ke,A=(e,o)=>{let t;try{t=JSON.parse(e)}catch(n){console.error("[zustand devtools middleware] Could not parse the received json",n)}t!==void 0&&o(t)},re=ve()(Te(e=>({toasts:[],addToast:o=>{const t=Date.now().toString(36)+Math.random().toString(36).slice(2);e(n=>({toasts:[...n.toasts,{...o,id:t}]}),!1,"toast/add"),setTimeout(()=>{e(n=>({toasts:n.toasts.filter(r=>r.id!==t)}),!1,"toast/autoRemove")},4e3)},removeToast:o=>e(t=>({toasts:t.toasts.filter(n=>n.id!==o)}),!1,"toast/remove")}),{name:"ToastStore"}));function p(e,o,t){re.getState().addToast({type:e,title:o,message:t})}const _e={success:{icon:ce,bg:"bg-emerald-50 dark:bg-emerald-950/50",border:"border-emerald-200 dark:border-emerald-800",text:"text-emerald-800 dark:text-emerald-200"},error:{icon:ae,bg:"bg-red-50 dark:bg-red-950/50",border:"border-red-200 dark:border-red-800",text:"text-red-800 dark:text-red-200"},warning:{icon:me,bg:"bg-amber-50 dark:bg-amber-950/50",border:"border-amber-200 dark:border-amber-800",text:"text-amber-800 dark:text-amber-200"},info:{icon:le,bg:"bg-blue-50 dark:bg-blue-950/50",border:"border-blue-200 dark:border-blue-800",text:"text-blue-800 dark:text-blue-200"}};function D(){const{toasts:e,removeToast:o}=re();return e.length===0?null:i.jsx("div",{className:"fixed bottom-4 right-4 z-[100] flex flex-col gap-2 w-80",children:e.map(t=>{const n=_e[t.type],r=n.icon;return i.jsxs("div",{className:b("flex items-start gap-3 rounded-lg border p-4 shadow-lg animate-in slide-in-from-right-full fade-in duration-300",n.bg,n.border),children:[i.jsx(r,{className:b("h-5 w-5 shrink-0 mt-0.5",n.text)}),i.jsxs("div",{className:"flex-1 min-w-0",children:[i.jsx("p",{className:b("text-sm font-semibold",n.text),children:t.title}),t.message&&i.jsx("p",{className:b("text-xs mt-0.5 opacity-80",n.text),children:t.message})]}),i.jsx("button",{onClick:()=>o(t.id),className:b("shrink-0 rounded-md p-0.5 opacity-60 hover:opacity-100 transition-opacity",n.text),children:i.jsx(fe,{className:"h-4 w-4"})})]},t.id)})})}D.__docgenInfo={description:"",methods:[],displayName:"Toaster"};const Me={title:"UI/Toast",component:D,tags:["autodocs"],decorators:[e=>i.jsxs("div",{className:"min-h-[200px]",children:[i.jsx(e,{}),i.jsx(D,{})]})]},j={render:()=>i.jsx(h,{onClick:()=>p("success","Account created",'"Main Checking" has been added'),children:"Show Success Toast"})},I={render:()=>i.jsx(h,{variant:"destructive",onClick:()=>p("error","Failed to delete","Please try again"),children:"Show Error Toast"})},N={render:()=>i.jsx(h,{variant:"outline",onClick:()=>p("warning","Budget alert","Food & Dining budget is at 75%"),children:"Show Warning Toast"})},E={render:()=>i.jsx(h,{variant:"secondary",onClick:()=>p("info","Notification marked as read"),children:"Show Info Toast"})},O={render:()=>i.jsxs("div",{className:"flex flex-wrap gap-3",children:[i.jsx(h,{onClick:()=>p("success","Success","Operation completed successfully"),children:"Success"}),i.jsx(h,{variant:"destructive",onClick:()=>p("error","Error","Something went wrong"),children:"Error"}),i.jsx(h,{variant:"outline",onClick:()=>p("warning","Warning","Please check your input"),children:"Warning"}),i.jsx(h,{variant:"secondary",onClick:()=>p("info","Info","Here is some information"),children:"Info"})]})},B={render:()=>i.jsx(h,{onClick:()=>{p("success","Account created","New checking account added"),setTimeout(()=>p("info","Syncing","Fetching latest transactions..."),500),setTimeout(()=>p("warning","Budget alert","Shopping is at 78%"),1e3)},children:"Trigger Multiple Toasts"})};var L,J,U;j.parameters={...j.parameters,docs:{...(L=j.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: () => <Button onClick={() => toast("success", "Account created", '"Main Checking" has been added')}>
      Show Success Toast
    </Button>
}`,...(U=(J=j.parameters)==null?void 0:J.docs)==null?void 0:U.source}}};var $,z,H;I.parameters={...I.parameters,docs:{...($=I.parameters)==null?void 0:$.docs,source:{originalSource:`{
  render: () => <Button variant="destructive" onClick={() => toast("error", "Failed to delete", "Please try again")}>
      Show Error Toast
    </Button>
}`,...(H=(z=I.parameters)==null?void 0:z.docs)==null?void 0:H.source}}};var V,X,q;N.parameters={...N.parameters,docs:{...(V=N.parameters)==null?void 0:V.docs,source:{originalSource:`{
  render: () => <Button variant="outline" onClick={() => toast("warning", "Budget alert", "Food & Dining budget is at 75%")}>
      Show Warning Toast
    </Button>
}`,...(q=(X=N.parameters)==null?void 0:X.docs)==null?void 0:q.source}}};var K,G,Y;E.parameters={...E.parameters,docs:{...(K=E.parameters)==null?void 0:K.docs,source:{originalSource:`{
  render: () => <Button variant="secondary" onClick={() => toast("info", "Notification marked as read")}>
      Show Info Toast
    </Button>
}`,...(Y=(G=E.parameters)==null?void 0:G.docs)==null?void 0:Y.source}}};var Q,Z,ee;O.parameters={...O.parameters,docs:{...(Q=O.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap gap-3">
      <Button onClick={() => toast("success", "Success", "Operation completed successfully")}>Success</Button>
      <Button variant="destructive" onClick={() => toast("error", "Error", "Something went wrong")}>Error</Button>
      <Button variant="outline" onClick={() => toast("warning", "Warning", "Please check your input")}>Warning</Button>
      <Button variant="secondary" onClick={() => toast("info", "Info", "Here is some information")}>Info</Button>
    </div>
}`,...(ee=(Z=O.parameters)==null?void 0:Z.docs)==null?void 0:ee.source}}};var te,oe,ne;B.parameters={...B.parameters,docs:{...(te=B.parameters)==null?void 0:te.docs,source:{originalSource:`{
  render: () => <Button onClick={() => {
    toast("success", "Account created", "New checking account added");
    setTimeout(() => toast("info", "Syncing", "Fetching latest transactions..."), 500);
    setTimeout(() => toast("warning", "Budget alert", "Shopping is at 78%"), 1000);
  }}>
      Trigger Multiple Toasts
    </Button>
}`,...(ne=(oe=B.parameters)==null?void 0:oe.docs)==null?void 0:ne.source}}};const Ae=["Success","Error","Warning","Info","AllTypes","MultipleToasts"];export{O as AllTypes,I as Error,E as Info,B as MultipleToasts,j as Success,N as Warning,Ae as __namedExportsOrder,Me as default};
