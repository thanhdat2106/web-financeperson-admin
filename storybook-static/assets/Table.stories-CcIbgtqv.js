import{j as e}from"./jsx-runtime-BjG_zV1W.js";import{r as o}from"./index-B3TfwC44.js";import{c as r}from"./utils-BQHNewu7.js";import{B as T}from"./badge-BbH4Dh94.js";import"./index-D1SQP9Z-.js";const i=o.forwardRef(({className:a,...l},s)=>e.jsx("div",{className:"relative w-full overflow-auto",children:e.jsx("table",{ref:s,className:r("w-full caption-bottom text-sm",a),...l})}));i.displayName="Table";const b=o.forwardRef(({className:a,...l},s)=>e.jsx("thead",{ref:s,className:r("[&_tr]:border-b",a),...l}));b.displayName="TableHeader";const x=o.forwardRef(({className:a,...l},s)=>e.jsx("tbody",{ref:s,className:r("[&_tr:last-child]:border-0",a),...l}));x.displayName="TableBody";const g=o.forwardRef(({className:a,...l},s)=>e.jsx("tfoot",{ref:s,className:r("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",a),...l}));g.displayName="TableFooter";const n=o.forwardRef(({className:a,...l},s)=>e.jsx("tr",{ref:s,className:r("border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",a),...l}));n.displayName="TableRow";const d=o.forwardRef(({className:a,...l},s)=>e.jsx("th",{ref:s,className:r("h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",a),...l}));d.displayName="TableHead";const t=o.forwardRef(({className:a,...l},s)=>e.jsx("td",{ref:s,className:r("p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",a),...l}));t.displayName="TableCell";const y=o.forwardRef(({className:a,...l},s)=>e.jsx("caption",{ref:s,className:r("mt-4 text-sm text-muted-foreground",a),...l}));y.displayName="TableCaption";i.__docgenInfo={description:"",methods:[],displayName:"Table"};b.__docgenInfo={description:"",methods:[],displayName:"TableHeader"};x.__docgenInfo={description:"",methods:[],displayName:"TableBody"};g.__docgenInfo={description:"",methods:[],displayName:"TableFooter"};d.__docgenInfo={description:"",methods:[],displayName:"TableHead"};n.__docgenInfo={description:"",methods:[],displayName:"TableRow"};t.__docgenInfo={description:"",methods:[],displayName:"TableCell"};y.__docgenInfo={description:"",methods:[],displayName:"TableCaption"};const v={title:"UI/Table",component:i,tags:["autodocs"]},c={render:()=>e.jsx("div",{className:"rounded-md border max-w-2xl",children:e.jsxs(i,{children:[e.jsx(b,{children:e.jsxs(n,{children:[e.jsx(d,{children:"Description"}),e.jsx(d,{children:"Category"}),e.jsx(d,{children:"Type"}),e.jsx(d,{className:"text-right",children:"Amount"})]})}),e.jsxs(x,{children:[e.jsxs(n,{children:[e.jsx(t,{className:"font-medium",children:"Monthly salary"}),e.jsx(t,{children:e.jsx(T,{variant:"outline",children:"Salary"})}),e.jsx(t,{className:"text-emerald-600",children:"Income"}),e.jsx(t,{className:"text-right text-emerald-600 font-semibold",children:"+$5,200.00"})]}),e.jsxs(n,{children:[e.jsx(t,{className:"font-medium",children:"Rent payment"}),e.jsx(t,{children:e.jsx(T,{variant:"outline",children:"Housing"})}),e.jsx(t,{className:"text-red-600",children:"Expense"}),e.jsx(t,{className:"text-right text-red-600 font-semibold",children:"-$1,650.00"})]}),e.jsxs(n,{children:[e.jsx(t,{className:"font-medium",children:"Weekly groceries"}),e.jsx(t,{children:e.jsx(T,{variant:"outline",children:"Food & Dining"})}),e.jsx(t,{className:"text-red-600",children:"Expense"}),e.jsx(t,{className:"text-right text-red-600 font-semibold",children:"-$87.50"})]})]})]})})},m={render:()=>e.jsx("div",{className:"rounded-md border max-w-2xl",children:e.jsxs(i,{children:[e.jsx(b,{children:e.jsxs(n,{children:[e.jsx(d,{children:"Description"}),e.jsx(d,{children:"Amount"})]})}),e.jsx(x,{children:e.jsx(n,{children:e.jsx(t,{colSpan:2,className:"h-24 text-center text-muted-foreground",children:"No transactions found."})})})]})})};var p,h,f;c.parameters={...c.parameters,docs:{...(p=c.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: () => <div className="rounded-md border max-w-2xl">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Description</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Monthly salary</TableCell>
            <TableCell><Badge variant="outline">Salary</Badge></TableCell>
            <TableCell className="text-emerald-600">Income</TableCell>
            <TableCell className="text-right text-emerald-600 font-semibold">+$5,200.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Rent payment</TableCell>
            <TableCell><Badge variant="outline">Housing</Badge></TableCell>
            <TableCell className="text-red-600">Expense</TableCell>
            <TableCell className="text-right text-red-600 font-semibold">-$1,650.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Weekly groceries</TableCell>
            <TableCell><Badge variant="outline">Food & Dining</Badge></TableCell>
            <TableCell className="text-red-600">Expense</TableCell>
            <TableCell className="text-right text-red-600 font-semibold">-$87.50</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
}`,...(f=(h=c.parameters)==null?void 0:h.docs)==null?void 0:f.source}}};var N,u,j;m.parameters={...m.parameters,docs:{...(N=m.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: () => <div className="rounded-md border max-w-2xl">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Description</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell colSpan={2} className="h-24 text-center text-muted-foreground">
              No transactions found.
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
}`,...(j=(u=m.parameters)==null?void 0:u.docs)==null?void 0:j.source}}};const B=["Default","Empty"];export{c as Default,m as Empty,B as __namedExportsOrder,v as default};
