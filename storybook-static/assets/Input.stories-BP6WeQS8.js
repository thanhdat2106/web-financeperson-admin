import{j as e}from"./jsx-runtime-BjG_zV1W.js";import{r as C}from"./index-B3TfwC44.js";import{c as F}from"./utils-BQHNewu7.js";import{L as s}from"./label-KcdJRyYB.js";import{c as R}from"./createLucideIcon-CgL17_8h.js";import"./index-CLF8vIaC.js";import"./index-DNLakH_k.js";import"./index-CU6i5cbR.js";/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const V=[["path",{d:"m21 21-4.34-4.34",key:"14j7rj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}]],O=R("search",V),a=C.forwardRef(({className:_,type:W,...k},A)=>e.jsx("input",{type:W,className:F("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",_),ref:A,...k}));a.displayName="Input";a.__docgenInfo={description:"",methods:[],displayName:"Input"};const M={title:"UI/Input",component:a,tags:["autodocs"],argTypes:{type:{control:"select",options:["text","email","password","number","search","color"]},disabled:{control:"boolean"},placeholder:{control:"text"}}},r={args:{placeholder:"Enter text..."}},l={render:()=>e.jsxs("div",{className:"space-y-2 max-w-sm",children:[e.jsx(s,{htmlFor:"email",children:"Email"}),e.jsx(a,{id:"email",type:"email",placeholder:"you@example.com"})]})},o={render:()=>e.jsxs("div",{className:"relative max-w-sm",children:[e.jsx(O,{className:"absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"}),e.jsx(a,{placeholder:"Search...",className:"pl-9"})]})},c={args:{placeholder:"Disabled input",disabled:!0}},t={args:{type:"password",placeholder:"Enter password..."}},d={args:{type:"number",placeholder:"0.00",step:"0.01"}},p={render:()=>e.jsxs("div",{className:"space-y-3 max-w-sm",children:[e.jsxs("div",{className:"space-y-1",children:[e.jsx(s,{children:"Text"}),e.jsx(a,{type:"text",placeholder:"Text input"})]}),e.jsxs("div",{className:"space-y-1",children:[e.jsx(s,{children:"Email"}),e.jsx(a,{type:"email",placeholder:"Email input"})]}),e.jsxs("div",{className:"space-y-1",children:[e.jsx(s,{children:"Password"}),e.jsx(a,{type:"password",placeholder:"Password"})]}),e.jsxs("div",{className:"space-y-1",children:[e.jsx(s,{children:"Number"}),e.jsx(a,{type:"number",placeholder:"0"})]}),e.jsxs("div",{className:"space-y-1",children:[e.jsx(s,{children:"Search"}),e.jsx(a,{type:"search",placeholder:"Search..."})]}),e.jsxs("div",{className:"space-y-1",children:[e.jsx(s,{children:"Color"}),e.jsx(a,{type:"color",defaultValue:"#6366f1"})]})]})};var n,i,m;r.parameters={...r.parameters,docs:{...(n=r.parameters)==null?void 0:n.docs,source:{originalSource:`{
  args: {
    placeholder: "Enter text..."
  }
}`,...(m=(i=r.parameters)==null?void 0:i.docs)==null?void 0:m.source}}};var u,h,x;l.parameters={...l.parameters,docs:{...(u=l.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: () => <div className="space-y-2 max-w-sm">
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" placeholder="you@example.com" />
    </div>
}`,...(x=(h=l.parameters)==null?void 0:h.docs)==null?void 0:x.source}}};var y,b,f;o.parameters={...o.parameters,docs:{...(y=o.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: () => <div className="relative max-w-sm">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input placeholder="Search..." className="pl-9" />
    </div>
}`,...(f=(b=o.parameters)==null?void 0:b.docs)==null?void 0:f.source}}};var v,j,N;c.parameters={...c.parameters,docs:{...(v=c.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    placeholder: "Disabled input",
    disabled: true
  }
}`,...(N=(j=c.parameters)==null?void 0:j.docs)==null?void 0:N.source}}};var g,w,L;t.parameters={...t.parameters,docs:{...(g=t.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    type: "password",
    placeholder: "Enter password..."
  }
}`,...(L=(w=t.parameters)==null?void 0:w.docs)==null?void 0:L.source}}};var I,S,E;d.parameters={...d.parameters,docs:{...(I=d.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    type: "number",
    placeholder: "0.00",
    step: "0.01"
  }
}`,...(E=(S=d.parameters)==null?void 0:S.docs)==null?void 0:E.source}}};var T,D,P;p.parameters={...p.parameters,docs:{...(T=p.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => <div className="space-y-3 max-w-sm">
      <div className="space-y-1"><Label>Text</Label><Input type="text" placeholder="Text input" /></div>
      <div className="space-y-1"><Label>Email</Label><Input type="email" placeholder="Email input" /></div>
      <div className="space-y-1"><Label>Password</Label><Input type="password" placeholder="Password" /></div>
      <div className="space-y-1"><Label>Number</Label><Input type="number" placeholder="0" /></div>
      <div className="space-y-1"><Label>Search</Label><Input type="search" placeholder="Search..." /></div>
      <div className="space-y-1"><Label>Color</Label><Input type="color" defaultValue="#6366f1" /></div>
    </div>
}`,...(P=(D=p.parameters)==null?void 0:D.docs)==null?void 0:P.source}}};const Q=["Default","WithLabel","WithIcon","Disabled","Password","Number","AllTypes"];export{p as AllTypes,r as Default,c as Disabled,d as Number,t as Password,o as WithIcon,l as WithLabel,Q as __namedExportsOrder,M as default};
