import{j as e}from"./jsx-runtime-BjG_zV1W.js";const v={title:"Design System/Colors",tags:["autodocs"],parameters:{layout:"padded"}};function s({name:l,bg:d,fg:o,cssVar:h}){return e.jsxs("div",{className:"flex flex-col gap-1",children:[e.jsx("div",{className:`h-16 w-full rounded-lg border ${d} flex items-center justify-center`,children:o&&e.jsx("span",{className:`text-xs font-medium ${o}`,children:"Aa"})}),e.jsx("p",{className:"text-xs font-semibold",children:l}),e.jsx("p",{className:"text-[10px] text-muted-foreground font-mono",children:h})]})}function t({label:l,children:d}){return e.jsxs("div",{className:"space-y-3",children:[e.jsx("h3",{className:"text-sm font-semibold text-foreground border-b pb-2",children:l}),e.jsx("div",{className:"grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4",children:d})]})}const a={render:()=>e.jsxs("div",{className:"space-y-8 max-w-4xl",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"text-2xl font-bold tracking-tight",children:"Color System"}),e.jsx("p",{className:"text-muted-foreground",children:"HSL CSS variables powering the design system. All colors adapt to light and dark themes."})]}),e.jsxs(t,{label:"Core",children:[e.jsx(s,{name:"Background",bg:"bg-background",cssVar:"--background"}),e.jsx(s,{name:"Foreground",bg:"bg-foreground",fg:"text-background",cssVar:"--foreground"}),e.jsx(s,{name:"Border",bg:"bg-border",cssVar:"--border"}),e.jsx(s,{name:"Input",bg:"bg-input",cssVar:"--input"}),e.jsx(s,{name:"Ring",bg:"bg-ring",cssVar:"--ring"})]}),e.jsxs(t,{label:"Primary",children:[e.jsx(s,{name:"Primary",bg:"bg-primary",fg:"text-primary-foreground",cssVar:"--primary"}),e.jsx(s,{name:"Primary FG",bg:"bg-primary-foreground",fg:"text-primary",cssVar:"--primary-foreground"})]}),e.jsxs(t,{label:"Secondary",children:[e.jsx(s,{name:"Secondary",bg:"bg-secondary",fg:"text-secondary-foreground",cssVar:"--secondary"}),e.jsx(s,{name:"Secondary FG",bg:"bg-secondary-foreground",fg:"text-secondary",cssVar:"--secondary-foreground"})]}),e.jsxs(t,{label:"Destructive",children:[e.jsx(s,{name:"Destructive",bg:"bg-destructive",fg:"text-destructive-foreground",cssVar:"--destructive"}),e.jsx(s,{name:"Destructive FG",bg:"bg-destructive-foreground",fg:"text-destructive",cssVar:"--destructive-foreground"})]}),e.jsxs(t,{label:"Muted",children:[e.jsx(s,{name:"Muted",bg:"bg-muted",fg:"text-muted-foreground",cssVar:"--muted"}),e.jsx(s,{name:"Muted FG",bg:"bg-muted-foreground",fg:"text-muted",cssVar:"--muted-foreground"})]}),e.jsxs(t,{label:"Accent",children:[e.jsx(s,{name:"Accent",bg:"bg-accent",fg:"text-accent-foreground",cssVar:"--accent"}),e.jsx(s,{name:"Accent FG",bg:"bg-accent-foreground",fg:"text-accent",cssVar:"--accent-foreground"})]}),e.jsxs(t,{label:"Card & Popover",children:[e.jsx(s,{name:"Card",bg:"bg-card",fg:"text-card-foreground",cssVar:"--card"}),e.jsx(s,{name:"Card FG",bg:"bg-card-foreground",fg:"text-card",cssVar:"--card-foreground"}),e.jsx(s,{name:"Popover",bg:"bg-popover",fg:"text-popover-foreground",cssVar:"--popover"}),e.jsx(s,{name:"Popover FG",bg:"bg-popover-foreground",fg:"text-popover",cssVar:"--popover-foreground"})]}),e.jsxs(t,{label:"Sidebar",children:[e.jsx(s,{name:"Sidebar",bg:"bg-sidebar",fg:"text-sidebar-foreground",cssVar:"--sidebar"}),e.jsx(s,{name:"Sidebar FG",bg:"bg-sidebar-foreground",fg:"text-sidebar",cssVar:"--sidebar-foreground"}),e.jsx(s,{name:"Sidebar Primary",bg:"bg-sidebar-primary",fg:"text-sidebar-primary-foreground",cssVar:"--sidebar-primary"}),e.jsx(s,{name:"Sidebar Accent",bg:"bg-sidebar-accent",fg:"text-sidebar-accent-foreground",cssVar:"--sidebar-accent"}),e.jsx(s,{name:"Sidebar Border",bg:"bg-sidebar-border",cssVar:"--sidebar-border"})]})]})},n={render:()=>e.jsxs("div",{className:"space-y-8 max-w-4xl",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"text-2xl font-bold tracking-tight",children:"Semantic Colors"}),e.jsx("p",{className:"text-muted-foreground",children:"Status and data visualization colors used throughout the app."})]}),e.jsxs(t,{label:"Status Colors (Tailwind utility)",children:[e.jsxs("div",{className:"flex flex-col gap-1",children:[e.jsx("div",{className:"h-16 w-full rounded-lg bg-emerald-500 flex items-center justify-center",children:e.jsx("span",{className:"text-xs font-medium text-white",children:"Success"})}),e.jsx("p",{className:"text-xs font-semibold",children:"Emerald 500"}),e.jsx("p",{className:"text-[10px] text-muted-foreground font-mono",children:"Income, active, positive"})]}),e.jsxs("div",{className:"flex flex-col gap-1",children:[e.jsx("div",{className:"h-16 w-full rounded-lg bg-red-500 flex items-center justify-center",children:e.jsx("span",{className:"text-xs font-medium text-white",children:"Error"})}),e.jsx("p",{className:"text-xs font-semibold",children:"Red 500"}),e.jsx("p",{className:"text-[10px] text-muted-foreground font-mono",children:"Expense, delete, negative"})]}),e.jsxs("div",{className:"flex flex-col gap-1",children:[e.jsx("div",{className:"h-16 w-full rounded-lg bg-amber-500 flex items-center justify-center",children:e.jsx("span",{className:"text-xs font-medium text-white",children:"Warning"})}),e.jsx("p",{className:"text-xs font-semibold",children:"Amber 500"}),e.jsx("p",{className:"text-[10px] text-muted-foreground font-mono",children:"Budget alert, pending"})]}),e.jsxs("div",{className:"flex flex-col gap-1",children:[e.jsx("div",{className:"h-16 w-full rounded-lg bg-blue-500 flex items-center justify-center",children:e.jsx("span",{className:"text-xs font-medium text-white",children:"Info"})}),e.jsx("p",{className:"text-xs font-semibold",children:"Blue 500"}),e.jsx("p",{className:"text-[10px] text-muted-foreground font-mono",children:"Transfer, info, link"})]})]}),e.jsxs(t,{label:"Chart / Data Visualization",children:[e.jsxs("div",{className:"flex flex-col gap-1",children:[e.jsx("div",{className:"h-16 w-full rounded-lg flex items-center justify-center",style:{backgroundColor:"#6366f1"},children:e.jsx("span",{className:"text-xs font-medium text-white",children:"Indigo"})}),e.jsx("p",{className:"text-xs font-semibold",children:"#6366f1"}),e.jsx("p",{className:"text-[10px] text-muted-foreground font-mono",children:"Primary charts, checking"})]}),e.jsxs("div",{className:"flex flex-col gap-1",children:[e.jsx("div",{className:"h-16 w-full rounded-lg flex items-center justify-center",style:{backgroundColor:"#10b981"},children:e.jsx("span",{className:"text-xs font-medium text-white",children:"Emerald"})}),e.jsx("p",{className:"text-xs font-semibold",children:"#10b981"}),e.jsx("p",{className:"text-[10px] text-muted-foreground font-mono",children:"Income, savings"})]}),e.jsxs("div",{className:"flex flex-col gap-1",children:[e.jsx("div",{className:"h-16 w-full rounded-lg flex items-center justify-center",style:{backgroundColor:"#f43f5e"},children:e.jsx("span",{className:"text-xs font-medium text-white",children:"Rose"})}),e.jsx("p",{className:"text-xs font-semibold",children:"#f43f5e"}),e.jsx("p",{className:"text-[10px] text-muted-foreground font-mono",children:"Expenses, credit"})]}),e.jsxs("div",{className:"flex flex-col gap-1",children:[e.jsx("div",{className:"h-16 w-full rounded-lg flex items-center justify-center",style:{backgroundColor:"#8b5cf6"},children:e.jsx("span",{className:"text-xs font-medium text-white",children:"Violet"})}),e.jsx("p",{className:"text-xs font-semibold",children:"#8b5cf6"}),e.jsx("p",{className:"text-[10px] text-muted-foreground font-mono",children:"Investment, entertainment"})]}),e.jsxs("div",{className:"flex flex-col gap-1",children:[e.jsx("div",{className:"h-16 w-full rounded-lg flex items-center justify-center",style:{backgroundColor:"#06b6d4"},children:e.jsx("span",{className:"text-xs font-medium text-white",children:"Cyan"})}),e.jsx("p",{className:"text-xs font-semibold",children:"#06b6d4"}),e.jsx("p",{className:"text-[10px] text-muted-foreground font-mono",children:"Transport, wallet"})]}),e.jsxs("div",{className:"flex flex-col gap-1",children:[e.jsx("div",{className:"h-16 w-full rounded-lg flex items-center justify-center",style:{backgroundColor:"#eab308"},children:e.jsx("span",{className:"text-xs font-medium text-white",children:"Yellow"})}),e.jsx("p",{className:"text-xs font-semibold",children:"#eab308"}),e.jsx("p",{className:"text-[10px] text-muted-foreground font-mono",children:"Utilities, emergency"})]}),e.jsxs("div",{className:"flex flex-col gap-1",children:[e.jsx("div",{className:"h-16 w-full rounded-lg flex items-center justify-center",style:{backgroundColor:"#f97316"},children:e.jsx("span",{className:"text-xs font-medium text-white",children:"Orange"})}),e.jsx("p",{className:"text-xs font-semibold",children:"#f97316"}),e.jsx("p",{className:"text-[10px] text-muted-foreground font-mono",children:"Shopping"})]}),e.jsxs("div",{className:"flex flex-col gap-1",children:[e.jsx("div",{className:"h-16 w-full rounded-lg flex items-center justify-center",style:{backgroundColor:"#ec4899"},children:e.jsx("span",{className:"text-xs font-medium text-white",children:"Pink"})}),e.jsx("p",{className:"text-xs font-semibold",children:"#ec4899"}),e.jsx("p",{className:"text-[10px] text-muted-foreground font-mono",children:"Subscriptions"})]}),e.jsxs("div",{className:"flex flex-col gap-1",children:[e.jsx("div",{className:"h-16 w-full rounded-lg flex items-center justify-center",style:{backgroundColor:"#94a3b8"},children:e.jsx("span",{className:"text-xs font-medium text-white",children:"Slate"})}),e.jsx("p",{className:"text-xs font-semibold",children:"#94a3b8"}),e.jsx("p",{className:"text-[10px] text-muted-foreground font-mono",children:"Insurance, secondary"})]})]}),e.jsxs(t,{label:"Account Type Colors",children:[e.jsxs("div",{className:"flex flex-col gap-1",children:[e.jsx("div",{className:"h-16 w-full rounded-lg flex items-center justify-center",style:{backgroundColor:"#6366f1"},children:e.jsx("span",{className:"text-xs font-medium text-white",children:"Checking"})}),e.jsx("p",{className:"text-xs font-semibold",children:"#6366f1"})]}),e.jsxs("div",{className:"flex flex-col gap-1",children:[e.jsx("div",{className:"h-16 w-full rounded-lg flex items-center justify-center",style:{backgroundColor:"#10b981"},children:e.jsx("span",{className:"text-xs font-medium text-white",children:"Savings"})}),e.jsx("p",{className:"text-xs font-semibold",children:"#10b981"})]}),e.jsxs("div",{className:"flex flex-col gap-1",children:[e.jsx("div",{className:"h-16 w-full rounded-lg flex items-center justify-center",style:{backgroundColor:"#f43f5e"},children:e.jsx("span",{className:"text-xs font-medium text-white",children:"Credit"})}),e.jsx("p",{className:"text-xs font-semibold",children:"#f43f5e"})]}),e.jsxs("div",{className:"flex flex-col gap-1",children:[e.jsx("div",{className:"h-16 w-full rounded-lg flex items-center justify-center",style:{backgroundColor:"#8b5cf6"},children:e.jsx("span",{className:"text-xs font-medium text-white",children:"Investment"})}),e.jsx("p",{className:"text-xs font-semibold",children:"#8b5cf6"})]}),e.jsxs("div",{className:"flex flex-col gap-1",children:[e.jsx("div",{className:"h-16 w-full rounded-lg flex items-center justify-center",style:{backgroundColor:"#06b6d4"},children:e.jsx("span",{className:"text-xs font-medium text-white",children:"Wallet"})}),e.jsx("p",{className:"text-xs font-semibold",children:"#06b6d4"})]})]})]})},r={render:()=>e.jsxs("div",{className:"space-y-8 max-w-4xl",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"text-2xl font-bold tracking-tight",children:"Color Usage Guide"}),e.jsx("p",{className:"text-muted-foreground",children:"How colors are applied across the application."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h3",{className:"text-sm font-semibold border-b pb-2",children:"Transaction Types"}),e.jsxs("div",{className:"grid grid-cols-3 gap-4",children:[e.jsxs("div",{className:"rounded-lg border p-4 space-y-2",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("div",{className:"h-3 w-3 rounded-full bg-emerald-500"}),e.jsx("span",{className:"text-sm font-medium",children:"Income"})]}),e.jsx("p",{className:"text-xs text-muted-foreground",children:"text-emerald-600, bg-emerald-100"}),e.jsx("div",{className:"text-emerald-600 font-semibold",children:"+$5,200.00"})]}),e.jsxs("div",{className:"rounded-lg border p-4 space-y-2",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("div",{className:"h-3 w-3 rounded-full bg-red-500"}),e.jsx("span",{className:"text-sm font-medium",children:"Expense"})]}),e.jsx("p",{className:"text-xs text-muted-foreground",children:"text-red-600, bg-red-100"}),e.jsx("div",{className:"text-red-600 font-semibold",children:"-$1,650.00"})]}),e.jsxs("div",{className:"rounded-lg border p-4 space-y-2",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("div",{className:"h-3 w-3 rounded-full bg-blue-500"}),e.jsx("span",{className:"text-sm font-medium",children:"Transfer"})]}),e.jsx("p",{className:"text-xs text-muted-foreground",children:"text-blue-600, bg-blue-100"}),e.jsx("div",{className:"text-blue-600 font-semibold",children:"$500.00"})]})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h3",{className:"text-sm font-semibold border-b pb-2",children:"Budget Progress"}),e.jsxs("div",{className:"space-y-3 max-w-md",children:[e.jsxs("div",{className:"space-y-1",children:[e.jsxs("div",{className:"flex justify-between text-xs",children:[e.jsx("span",{children:"Under budget (0-70%)"}),e.jsx("span",{className:"text-emerald-600",children:"45%"})]}),e.jsx("div",{className:"h-3 rounded-full bg-muted overflow-hidden",children:e.jsx("div",{className:"h-full rounded-full bg-emerald-500",style:{width:"45%"}})})]}),e.jsxs("div",{className:"space-y-1",children:[e.jsxs("div",{className:"flex justify-between text-xs",children:[e.jsx("span",{children:"Near limit (70-100%)"}),e.jsx("span",{className:"text-amber-600",children:"85%"})]}),e.jsx("div",{className:"h-3 rounded-full bg-muted overflow-hidden",children:e.jsx("div",{className:"h-full rounded-full bg-amber-500",style:{width:"85%"}})})]}),e.jsxs("div",{className:"space-y-1",children:[e.jsxs("div",{className:"flex justify-between text-xs",children:[e.jsx("span",{children:"Over budget (100%+)"}),e.jsx("span",{className:"text-red-600",children:"120%"})]}),e.jsx("div",{className:"h-3 rounded-full bg-muted overflow-hidden",children:e.jsx("div",{className:"h-full rounded-full bg-red-500",style:{width:"100%"}})})]})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h3",{className:"text-sm font-semibold border-b pb-2",children:"Toast / Alert Colors"}),e.jsxs("div",{className:"grid grid-cols-2 gap-3 max-w-lg",children:[e.jsxs("div",{className:"rounded-lg border border-emerald-200 bg-emerald-50 p-3",children:[e.jsx("p",{className:"text-xs font-semibold text-emerald-800",children:"Success"}),e.jsx("p",{className:"text-[10px] text-emerald-800/70",children:"bg-emerald-50, border-emerald-200, text-emerald-800"})]}),e.jsxs("div",{className:"rounded-lg border border-red-200 bg-red-50 p-3",children:[e.jsx("p",{className:"text-xs font-semibold text-red-800",children:"Error"}),e.jsx("p",{className:"text-[10px] text-red-800/70",children:"bg-red-50, border-red-200, text-red-800"})]}),e.jsxs("div",{className:"rounded-lg border border-amber-200 bg-amber-50 p-3",children:[e.jsx("p",{className:"text-xs font-semibold text-amber-800",children:"Warning"}),e.jsx("p",{className:"text-[10px] text-amber-800/70",children:"bg-amber-50, border-amber-200, text-amber-800"})]}),e.jsxs("div",{className:"rounded-lg border border-blue-200 bg-blue-50 p-3",children:[e.jsx("p",{className:"text-xs font-semibold text-blue-800",children:"Info"}),e.jsx("p",{className:"text-[10px] text-blue-800/70",children:"bg-blue-50, border-blue-200, text-blue-800"})]})]})]})]})};var c,i,x;a.parameters={...a.parameters,docs:{...(c=a.parameters)==null?void 0:c.docs,source:{originalSource:`{
  render: () => <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Color System</h1>
        <p className="text-muted-foreground">HSL CSS variables powering the design system. All colors adapt to light and dark themes.</p>
      </div>

      <ColorRow label="Core">
        <Swatch name="Background" bg="bg-background" cssVar="--background" />
        <Swatch name="Foreground" bg="bg-foreground" fg="text-background" cssVar="--foreground" />
        <Swatch name="Border" bg="bg-border" cssVar="--border" />
        <Swatch name="Input" bg="bg-input" cssVar="--input" />
        <Swatch name="Ring" bg="bg-ring" cssVar="--ring" />
      </ColorRow>

      <ColorRow label="Primary">
        <Swatch name="Primary" bg="bg-primary" fg="text-primary-foreground" cssVar="--primary" />
        <Swatch name="Primary FG" bg="bg-primary-foreground" fg="text-primary" cssVar="--primary-foreground" />
      </ColorRow>

      <ColorRow label="Secondary">
        <Swatch name="Secondary" bg="bg-secondary" fg="text-secondary-foreground" cssVar="--secondary" />
        <Swatch name="Secondary FG" bg="bg-secondary-foreground" fg="text-secondary" cssVar="--secondary-foreground" />
      </ColorRow>

      <ColorRow label="Destructive">
        <Swatch name="Destructive" bg="bg-destructive" fg="text-destructive-foreground" cssVar="--destructive" />
        <Swatch name="Destructive FG" bg="bg-destructive-foreground" fg="text-destructive" cssVar="--destructive-foreground" />
      </ColorRow>

      <ColorRow label="Muted">
        <Swatch name="Muted" bg="bg-muted" fg="text-muted-foreground" cssVar="--muted" />
        <Swatch name="Muted FG" bg="bg-muted-foreground" fg="text-muted" cssVar="--muted-foreground" />
      </ColorRow>

      <ColorRow label="Accent">
        <Swatch name="Accent" bg="bg-accent" fg="text-accent-foreground" cssVar="--accent" />
        <Swatch name="Accent FG" bg="bg-accent-foreground" fg="text-accent" cssVar="--accent-foreground" />
      </ColorRow>

      <ColorRow label="Card & Popover">
        <Swatch name="Card" bg="bg-card" fg="text-card-foreground" cssVar="--card" />
        <Swatch name="Card FG" bg="bg-card-foreground" fg="text-card" cssVar="--card-foreground" />
        <Swatch name="Popover" bg="bg-popover" fg="text-popover-foreground" cssVar="--popover" />
        <Swatch name="Popover FG" bg="bg-popover-foreground" fg="text-popover" cssVar="--popover-foreground" />
      </ColorRow>

      <ColorRow label="Sidebar">
        <Swatch name="Sidebar" bg="bg-sidebar" fg="text-sidebar-foreground" cssVar="--sidebar" />
        <Swatch name="Sidebar FG" bg="bg-sidebar-foreground" fg="text-sidebar" cssVar="--sidebar-foreground" />
        <Swatch name="Sidebar Primary" bg="bg-sidebar-primary" fg="text-sidebar-primary-foreground" cssVar="--sidebar-primary" />
        <Swatch name="Sidebar Accent" bg="bg-sidebar-accent" fg="text-sidebar-accent-foreground" cssVar="--sidebar-accent" />
        <Swatch name="Sidebar Border" bg="bg-sidebar-border" cssVar="--sidebar-border" />
      </ColorRow>
    </div>
}`,...(x=(i=a.parameters)==null?void 0:i.docs)==null?void 0:x.source}}};var m,f,u;n.parameters={...n.parameters,docs:{...(m=n.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: () => <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Semantic Colors</h1>
        <p className="text-muted-foreground">Status and data visualization colors used throughout the app.</p>
      </div>

      <ColorRow label="Status Colors (Tailwind utility)">
        <div className="flex flex-col gap-1">
          <div className="h-16 w-full rounded-lg bg-emerald-500 flex items-center justify-center"><span className="text-xs font-medium text-white">Success</span></div>
          <p className="text-xs font-semibold">Emerald 500</p>
          <p className="text-[10px] text-muted-foreground font-mono">Income, active, positive</p>
        </div>
        <div className="flex flex-col gap-1">
          <div className="h-16 w-full rounded-lg bg-red-500 flex items-center justify-center"><span className="text-xs font-medium text-white">Error</span></div>
          <p className="text-xs font-semibold">Red 500</p>
          <p className="text-[10px] text-muted-foreground font-mono">Expense, delete, negative</p>
        </div>
        <div className="flex flex-col gap-1">
          <div className="h-16 w-full rounded-lg bg-amber-500 flex items-center justify-center"><span className="text-xs font-medium text-white">Warning</span></div>
          <p className="text-xs font-semibold">Amber 500</p>
          <p className="text-[10px] text-muted-foreground font-mono">Budget alert, pending</p>
        </div>
        <div className="flex flex-col gap-1">
          <div className="h-16 w-full rounded-lg bg-blue-500 flex items-center justify-center"><span className="text-xs font-medium text-white">Info</span></div>
          <p className="text-xs font-semibold">Blue 500</p>
          <p className="text-[10px] text-muted-foreground font-mono">Transfer, info, link</p>
        </div>
      </ColorRow>

      <ColorRow label="Chart / Data Visualization">
        <div className="flex flex-col gap-1">
          <div className="h-16 w-full rounded-lg flex items-center justify-center" style={{
          backgroundColor: "#6366f1"
        }}><span className="text-xs font-medium text-white">Indigo</span></div>
          <p className="text-xs font-semibold">#6366f1</p>
          <p className="text-[10px] text-muted-foreground font-mono">Primary charts, checking</p>
        </div>
        <div className="flex flex-col gap-1">
          <div className="h-16 w-full rounded-lg flex items-center justify-center" style={{
          backgroundColor: "#10b981"
        }}><span className="text-xs font-medium text-white">Emerald</span></div>
          <p className="text-xs font-semibold">#10b981</p>
          <p className="text-[10px] text-muted-foreground font-mono">Income, savings</p>
        </div>
        <div className="flex flex-col gap-1">
          <div className="h-16 w-full rounded-lg flex items-center justify-center" style={{
          backgroundColor: "#f43f5e"
        }}><span className="text-xs font-medium text-white">Rose</span></div>
          <p className="text-xs font-semibold">#f43f5e</p>
          <p className="text-[10px] text-muted-foreground font-mono">Expenses, credit</p>
        </div>
        <div className="flex flex-col gap-1">
          <div className="h-16 w-full rounded-lg flex items-center justify-center" style={{
          backgroundColor: "#8b5cf6"
        }}><span className="text-xs font-medium text-white">Violet</span></div>
          <p className="text-xs font-semibold">#8b5cf6</p>
          <p className="text-[10px] text-muted-foreground font-mono">Investment, entertainment</p>
        </div>
        <div className="flex flex-col gap-1">
          <div className="h-16 w-full rounded-lg flex items-center justify-center" style={{
          backgroundColor: "#06b6d4"
        }}><span className="text-xs font-medium text-white">Cyan</span></div>
          <p className="text-xs font-semibold">#06b6d4</p>
          <p className="text-[10px] text-muted-foreground font-mono">Transport, wallet</p>
        </div>
        <div className="flex flex-col gap-1">
          <div className="h-16 w-full rounded-lg flex items-center justify-center" style={{
          backgroundColor: "#eab308"
        }}><span className="text-xs font-medium text-white">Yellow</span></div>
          <p className="text-xs font-semibold">#eab308</p>
          <p className="text-[10px] text-muted-foreground font-mono">Utilities, emergency</p>
        </div>
        <div className="flex flex-col gap-1">
          <div className="h-16 w-full rounded-lg flex items-center justify-center" style={{
          backgroundColor: "#f97316"
        }}><span className="text-xs font-medium text-white">Orange</span></div>
          <p className="text-xs font-semibold">#f97316</p>
          <p className="text-[10px] text-muted-foreground font-mono">Shopping</p>
        </div>
        <div className="flex flex-col gap-1">
          <div className="h-16 w-full rounded-lg flex items-center justify-center" style={{
          backgroundColor: "#ec4899"
        }}><span className="text-xs font-medium text-white">Pink</span></div>
          <p className="text-xs font-semibold">#ec4899</p>
          <p className="text-[10px] text-muted-foreground font-mono">Subscriptions</p>
        </div>
        <div className="flex flex-col gap-1">
          <div className="h-16 w-full rounded-lg flex items-center justify-center" style={{
          backgroundColor: "#94a3b8"
        }}><span className="text-xs font-medium text-white">Slate</span></div>
          <p className="text-xs font-semibold">#94a3b8</p>
          <p className="text-[10px] text-muted-foreground font-mono">Insurance, secondary</p>
        </div>
      </ColorRow>

      <ColorRow label="Account Type Colors">
        <div className="flex flex-col gap-1">
          <div className="h-16 w-full rounded-lg flex items-center justify-center" style={{
          backgroundColor: "#6366f1"
        }}><span className="text-xs font-medium text-white">Checking</span></div>
          <p className="text-xs font-semibold">#6366f1</p>
        </div>
        <div className="flex flex-col gap-1">
          <div className="h-16 w-full rounded-lg flex items-center justify-center" style={{
          backgroundColor: "#10b981"
        }}><span className="text-xs font-medium text-white">Savings</span></div>
          <p className="text-xs font-semibold">#10b981</p>
        </div>
        <div className="flex flex-col gap-1">
          <div className="h-16 w-full rounded-lg flex items-center justify-center" style={{
          backgroundColor: "#f43f5e"
        }}><span className="text-xs font-medium text-white">Credit</span></div>
          <p className="text-xs font-semibold">#f43f5e</p>
        </div>
        <div className="flex flex-col gap-1">
          <div className="h-16 w-full rounded-lg flex items-center justify-center" style={{
          backgroundColor: "#8b5cf6"
        }}><span className="text-xs font-medium text-white">Investment</span></div>
          <p className="text-xs font-semibold">#8b5cf6</p>
        </div>
        <div className="flex flex-col gap-1">
          <div className="h-16 w-full rounded-lg flex items-center justify-center" style={{
          backgroundColor: "#06b6d4"
        }}><span className="text-xs font-medium text-white">Wallet</span></div>
          <p className="text-xs font-semibold">#06b6d4</p>
        </div>
      </ColorRow>
    </div>
}`,...(u=(f=n.parameters)==null?void 0:f.docs)==null?void 0:u.source}}};var g,p,b;r.parameters={...r.parameters,docs:{...(g=r.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: () => <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Color Usage Guide</h1>
        <p className="text-muted-foreground">How colors are applied across the application.</p>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-semibold border-b pb-2">Transaction Types</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="rounded-lg border p-4 space-y-2">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-emerald-500" />
              <span className="text-sm font-medium">Income</span>
            </div>
            <p className="text-xs text-muted-foreground">text-emerald-600, bg-emerald-100</p>
            <div className="text-emerald-600 font-semibold">+$5,200.00</div>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500" />
              <span className="text-sm font-medium">Expense</span>
            </div>
            <p className="text-xs text-muted-foreground">text-red-600, bg-red-100</p>
            <div className="text-red-600 font-semibold">-$1,650.00</div>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-blue-500" />
              <span className="text-sm font-medium">Transfer</span>
            </div>
            <p className="text-xs text-muted-foreground">text-blue-600, bg-blue-100</p>
            <div className="text-blue-600 font-semibold">$500.00</div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-semibold border-b pb-2">Budget Progress</h3>
        <div className="space-y-3 max-w-md">
          <div className="space-y-1">
            <div className="flex justify-between text-xs"><span>Under budget (0-70%)</span><span className="text-emerald-600">45%</span></div>
            <div className="h-3 rounded-full bg-muted overflow-hidden"><div className="h-full rounded-full bg-emerald-500" style={{
              width: "45%"
            }} /></div>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-xs"><span>Near limit (70-100%)</span><span className="text-amber-600">85%</span></div>
            <div className="h-3 rounded-full bg-muted overflow-hidden"><div className="h-full rounded-full bg-amber-500" style={{
              width: "85%"
            }} /></div>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-xs"><span>Over budget (100%+)</span><span className="text-red-600">120%</span></div>
            <div className="h-3 rounded-full bg-muted overflow-hidden"><div className="h-full rounded-full bg-red-500" style={{
              width: "100%"
            }} /></div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-semibold border-b pb-2">Toast / Alert Colors</h3>
        <div className="grid grid-cols-2 gap-3 max-w-lg">
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3">
            <p className="text-xs font-semibold text-emerald-800">Success</p>
            <p className="text-[10px] text-emerald-800/70">bg-emerald-50, border-emerald-200, text-emerald-800</p>
          </div>
          <div className="rounded-lg border border-red-200 bg-red-50 p-3">
            <p className="text-xs font-semibold text-red-800">Error</p>
            <p className="text-[10px] text-red-800/70">bg-red-50, border-red-200, text-red-800</p>
          </div>
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
            <p className="text-xs font-semibold text-amber-800">Warning</p>
            <p className="text-[10px] text-amber-800/70">bg-amber-50, border-amber-200, text-amber-800</p>
          </div>
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-3">
            <p className="text-xs font-semibold text-blue-800">Info</p>
            <p className="text-[10px] text-blue-800/70">bg-blue-50, border-blue-200, text-blue-800</p>
          </div>
        </div>
      </div>
    </div>
}`,...(b=(p=r.parameters)==null?void 0:p.docs)==null?void 0:b.source}}};const j=["ThemeColors","SemanticColors","ColorUsage"];export{r as ColorUsage,n as SemanticColors,a as ThemeColors,j as __namedExportsOrder,v as default};
