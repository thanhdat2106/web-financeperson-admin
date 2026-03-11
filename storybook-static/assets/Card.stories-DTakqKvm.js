import{j as e}from"./jsx-runtime-BjG_zV1W.js";import{C as t,a as g,b,c as s,d as v,e as w}from"./card-CR29Wu2-.js";import{B as o}from"./button-peMBUCVJ.js";import{B}from"./badge-BbH4Dh94.js";import"./index-B3TfwC44.js";import"./utils-BQHNewu7.js";import"./index-DNLakH_k.js";import"./index-CU6i5cbR.js";import"./index-D1SQP9Z-.js";const F={title:"UI/Card",component:t,tags:["autodocs"]},a={render:()=>e.jsxs(t,{className:"w-[350px]",children:[e.jsxs(g,{children:[e.jsx(b,{children:"Card Title"}),e.jsx(v,{children:"Card description goes here"})]}),e.jsx(s,{children:e.jsx("p",{className:"text-sm text-muted-foreground",children:"This is the card content area."})}),e.jsxs(w,{className:"flex justify-between",children:[e.jsx(o,{variant:"outline",children:"Cancel"}),e.jsx(o,{children:"Save"})]})]})},r={render:()=>e.jsx(t,{className:"w-[250px]",children:e.jsxs(s,{className:"pt-6",children:[e.jsx("p",{className:"text-sm text-muted-foreground",children:"Total Balance"}),e.jsx("p",{className:"text-2xl font-bold",children:"$90,555.95"}),e.jsx("p",{className:"text-xs text-emerald-600 mt-1",children:"+4.2% vs last month"})]})})},n={render:()=>e.jsxs(t,{className:"w-[320px] relative overflow-hidden",children:[e.jsx("div",{className:"absolute top-0 left-0 right-0 h-1 bg-indigo-500"}),e.jsxs(g,{className:"flex flex-row items-center justify-between pb-2",children:[e.jsxs("div",{children:[e.jsx(b,{className:"text-base",children:"Main Checking"}),e.jsx("p",{className:"text-xs text-muted-foreground",children:"Chase Bank •••• 4521"})]}),e.jsx(B,{variant:"success",children:"Active"})]}),e.jsxs(s,{children:[e.jsx("p",{className:"text-xs text-muted-foreground uppercase",children:"Checking"}),e.jsx("p",{className:"text-xl font-bold",children:"$8,450.32"})]})]})},d={render:()=>e.jsxs("div",{className:"grid grid-cols-3 gap-4 max-w-2xl",children:[e.jsx(t,{children:e.jsxs(s,{className:"pt-6",children:[e.jsx("p",{className:"text-sm text-muted-foreground",children:"Net Worth"}),e.jsx("p",{className:"text-2xl font-bold",children:"$90,555"})]})}),e.jsx(t,{children:e.jsxs(s,{className:"pt-6",children:[e.jsx("p",{className:"text-sm text-muted-foreground",children:"Assets"}),e.jsx("p",{className:"text-2xl font-bold text-emerald-600",children:"$91,801"})]})}),e.jsx(t,{children:e.jsxs(s,{className:"pt-6",children:[e.jsx("p",{className:"text-sm text-muted-foreground",children:"Liabilities"}),e.jsx("p",{className:"text-2xl font-bold text-red-600",children:"$1,245"})]})})]})};var l,c,i;a.parameters={...a.parameters,docs:{...(l=a.parameters)==null?void 0:l.docs,source:{originalSource:`{
  render: () => <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">This is the card content area.</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Save</Button>
      </CardFooter>
    </Card>
}`,...(i=(c=a.parameters)==null?void 0:c.docs)==null?void 0:i.source}}};var x,m,p;r.parameters={...r.parameters,docs:{...(x=r.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: () => <Card className="w-[250px]">
      <CardContent className="pt-6">
        <p className="text-sm text-muted-foreground">Total Balance</p>
        <p className="text-2xl font-bold">$90,555.95</p>
        <p className="text-xs text-emerald-600 mt-1">+4.2% vs last month</p>
      </CardContent>
    </Card>
}`,...(p=(m=r.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};var C,u,h;n.parameters={...n.parameters,docs:{...(C=n.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: () => <Card className="w-[320px] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-indigo-500" />
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-base">Main Checking</CardTitle>
          <p className="text-xs text-muted-foreground">Chase Bank •••• 4521</p>
        </div>
        <Badge variant="success">Active</Badge>
      </CardHeader>
      <CardContent>
        <p className="text-xs text-muted-foreground uppercase">Checking</p>
        <p className="text-xl font-bold">$8,450.32</p>
      </CardContent>
    </Card>
}`,...(h=(u=n.parameters)==null?void 0:u.docs)==null?void 0:h.source}}};var N,f,j;d.parameters={...d.parameters,docs:{...(N=d.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: () => <div className="grid grid-cols-3 gap-4 max-w-2xl">
      <Card><CardContent className="pt-6"><p className="text-sm text-muted-foreground">Net Worth</p><p className="text-2xl font-bold">$90,555</p></CardContent></Card>
      <Card><CardContent className="pt-6"><p className="text-sm text-muted-foreground">Assets</p><p className="text-2xl font-bold text-emerald-600">$91,801</p></CardContent></Card>
      <Card><CardContent className="pt-6"><p className="text-sm text-muted-foreground">Liabilities</p><p className="text-2xl font-bold text-red-600">$1,245</p></CardContent></Card>
    </div>
}`,...(j=(f=d.parameters)==null?void 0:f.docs)==null?void 0:j.source}}};const E=["Default","MetricCard","AccountCard","CardGrid"];export{n as AccountCard,d as CardGrid,a as Default,r as MetricCard,E as __namedExportsOrder,F as default};
