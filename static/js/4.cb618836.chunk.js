(this.webpackJsonpkabzdaDa=this.webpackJsonpkabzdaDa||[]).push([[4],{291:function(e,a,s){e.exports={dialogs:"Dialogs_dialogs__19NLv",dialogsItems:"Dialogs_dialogsItems__1K_cq",dialog:"Dialogs_dialog__2YVY5",massages:"Dialogs_massages__3xbtD",massage:"Dialogs_massage__1r1vQ",addMessage:"Dialogs_addMessage__Zw-sq"}},292:function(e,a,s){"use strict";s.d(a,"a",(function(){return r}));var t=s(3),i=s(87),n=(s(0),s(11)),c=s(14),d=s(1),o=function(e){return{isAuth:e.auth.isAuth}};function r(e){return Object(c.b)(o)((function(a){var s=a.isAuth,c=Object(i.a)(a,["isAuth"]);return s?Object(d.jsx)(e,Object(t.a)({},c)):Object(d.jsx)(n.a,{to:"/login"})}))}},299:function(e,a,s){"use strict";s.r(a);var t=s(0),i=s.n(t),n=s(291),c=s.n(n),d=s(12),o=s(1),r=i.a.memo((function(e){var a="/dialogs/"+e.id;return Object(o.jsxs)("div",{className:c.a.dialog+" "+c.a.active,children:[Object(o.jsx)("div",{children:Object(o.jsx)("img",{src:"https://img3.goodfon.ru/wallpaper/nbig/f/67/naruto-shippuden-uzumaki-31.jpg"})}),Object(o.jsx)(d.c,{to:a,children:e.name})]})})),g=i.a.memo((function(e){return Object(o.jsx)("div",{className:c.a.massage,children:e.message})})),l=s(127),u=s(128),j=s(63),m=s(84),b=Object(m.a)(50),O=i.a.memo((function(e){return Object(o.jsxs)("form",{onSubmit:e.handleSubmit,children:[Object(o.jsx)("div",{children:Object(o.jsx)(l.a,{component:j.b,name:"newMessageBody",placeholder:"Enter your message",validate:[m.b,b]})}),Object(o.jsx)("div",{children:Object(o.jsx)("button",{children:"Send"})})]})})),h=Object(u.a)({form:"dialogAddMessageForm"})(O),f=i.a.memo((function(e){var a=e.dialogsPage.dialogs.map((function(e){return Object(o.jsx)(r,{id:e.id,name:e.name})})),s=e.dialogsPage.messages.map((function(e){return Object(o.jsx)(g,{message:e.message})}));return Object(o.jsxs)("div",{className:c.a.dialogs,children:[Object(o.jsx)("div",{className:c.a.dialogsItems,children:a}),Object(o.jsxs)("div",{className:c.a.massages,children:[s,Object(o.jsx)("div",{className:c.a.addMessage,children:Object(o.jsx)(h,{onSubmit:function(a){e.addMessage(a.newMessageBody)}})})]})]})})),x=s(14),_=s(105),v=s(10),p=s(292);a.default=Object(v.d)(Object(x.b)((function(e){return{dialogsPage:e.dialogsPage}}),(function(e){return{addMessage:function(a){e(Object(_.a)(a))}}})),p.a)(f)}}]);
//# sourceMappingURL=4.cb618836.chunk.js.map