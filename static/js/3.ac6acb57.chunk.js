(this.webpackJsonpkabzda=this.webpackJsonpkabzda||[]).push([[3],{393:function(t,e,s){"use strict";s.d(e,"a",(function(){return l}));var o=s(6),c=s(148),n=(s(0),s(22)),a=s(18),i=s(1),r=function(t){return{isAuth:t.auth.isAuth}};function l(t){return Object(a.b)(r)((function(e){var s=e.isAuth,a=Object(c.a)(e,["isAuth"]);return s?Object(i.jsx)(t,Object(o.a)({},a)):Object(i.jsx)(n.a,{to:"/login"})}))}},394:function(t,e,s){t.exports={content:"ProfileInfo_content__2ONw7",mainPhoto:"ProfileInfo_mainPhoto__2UnZt",contact:"ProfileInfo_contact__93i0i",formProfile:"ProfileInfo_formProfile__3CiVQ",Edit:"ProfileInfo_Edit__3xxS6",photoContainer:"ProfileInfo_photoContainer__usyb3",uploadPhoto:"ProfileInfo_uploadPhoto__2JzhI",profileContainer:"ProfileInfo_profileContainer__2a4AB",status:"ProfileInfo_status__2q2o5",statusInput:"ProfileInfo_statusInput__1tWF2"}},395:function(t,e,s){t.exports={content:"Profile_content__1GKQ3",mainimg:"Profile_mainimg__10R4y"}},396:function(t,e,s){t.exports={postsBlock:"MyPosts_postsBlock__24D9b",posts:"MyPosts_posts__1JATQ",addPostBlock:"MyPosts_addPostBlock__1bSNh",addPostAreaBlock:"MyPosts_addPostAreaBlock__21kQy",addPostButtonBlock:"MyPosts_addPostButtonBlock__fCzOZ"}},397:function(t,e,s){t.exports={content:"Post_content__3jI-E",item:"Post_item__1Pbaz",avatar:"Post_avatar__3m3Vh",like:"Post_like__i7Pcq",messages:"Post_messages__1wQBr",text:"Post_text__1qovt",corner:"Post_corner__1wQxJ",removeBtn:"Post_removeBtn__37R2Y"}},398:function(t,e,s){t.exports={btn:"AddPostForm_btn__20ZhT"}},400:function(t,e,s){"use strict";s.r(e);var o=s(6),c=s(163),n=s(164),a=s(198),i=s(196),r=s(0),l=s.n(r),j=s(395),u=s.n(j),d=s(161),b=s(394),f=s.n(b),h=s(115),p=s(1),O=l.a.memo((function(t){var e=Object(r.useState)(!1),s=Object(d.a)(e,2),o=s[0],c=s[1],n=Object(r.useState)(t.status),a=Object(d.a)(n,2),i=a[0],l=a[1];Object(r.useEffect)((function(){l(t.status)}),[t.status]);return Object(p.jsxs)("div",{children:[!o&&Object(p.jsxs)("div",{className:f.a.status,children:[Object(p.jsx)("b",{children:"Status: "}),Object(p.jsx)("span",{onDoubleClick:function(){c(!0)},children:t.status||"----"})]}),o&&Object(p.jsx)("div",{children:Object(p.jsx)("input",{value:i,onChange:function(t){l(t.currentTarget.value)},onBlur:function(){c(!1),t.updateStatus(i)},autoFocus:!0,className:f.a.statusInput})})]})})),m=s(162),x=s(58),_=s(195),v=s(78),P=s.n(v),g=Object(_.a)({form:"edit-profile"})((function(t){var e=t.handleSubmit,s=t.profile,o=t.error;return Object(p.jsxs)("form",{onSubmit:e,className:f.a.formProfile,children:[Object(p.jsx)("div",{children:Object(p.jsx)("button",{className:f.a.Edit,children:"Save"})}),o&&Object(p.jsx)("div",{className:P.a.someError,children:o}),Object(p.jsxs)("div",{children:[Object(p.jsx)("b",{children:"Full name"}),":",Object(x.c)("Full name","fullName",[],x.a)]}),Object(p.jsxs)("div",{children:[Object(p.jsx)("b",{children:"Looking for a job"}),":",Object(x.c)("","lookingForAJob",[],x.a,{type:"checkbox"})]}),Object(p.jsxs)("div",{children:[Object(p.jsx)("b",{children:"My prof skill"}),":",Object(x.c)("My prof skill","lookingForAJobDescription",[],x.b)]}),Object(p.jsxs)("div",{children:[Object(p.jsx)("b",{children:"About me"}),":",Object(x.c)("About me","aboutMe",[],x.b)]}),Object(p.jsxs)("div",{children:[Object(p.jsx)("b",{children:"Contacts"}),":",Object.keys(s.contacts).map((function(t){return Object(p.jsx)("div",{className:f.a.contact,children:Object(p.jsxs)("b",{children:[t,": ",Object(x.c)(t,"contacts."+t,[],x.a)]})},t)}))]})]})})),k=l.a.memo((function(t){var e=Object(r.useState)(!1),s=Object(d.a)(e,2),o=s[0],c=s[1];if(!t.profile)return Object(p.jsx)(h.a,{});return Object(p.jsxs)("div",{className:f.a.content,children:[Object(p.jsxs)("div",{className:f.a.photoContainer,children:[Object(p.jsx)("img",{src:t.profile.photos.large||m.a,className:f.a.mainPhoto}),t.isOwner&&Object(p.jsxs)("label",{className:f.a.uploadPhoto,children:[Object(p.jsx)("span",{children:"Upload new photo"}),Object(p.jsx)("input",{type:"file",onChange:function(e){e.target.files&&e.target.files.length&&t.savePhoto(e.target.files[0])}})]})]}),Object(p.jsxs)("div",{className:f.a.profileContainer,children:[Object(p.jsx)(O,{status:t.status,updateStatus:t.updateStatus}),o?Object(p.jsx)(g,{initialValues:t.profile,profile:t.profile,onSubmit:function(e){t.saveProfile(e).then((function(){c(!1)}))}}):Object(p.jsx)(N,{profile:t.profile,isOwner:t.isOwner,goToEditMode:function(){c(!0)}})]})]})})),N=function(t){var e=t.profile,s=t.isOwner,o=t.goToEditMode;return Object(p.jsxs)("div",{className:f.a.formProfile,children:[s&&Object(p.jsx)("div",{children:Object(p.jsx)("button",{onClick:o,className:f.a.Edit,children:"Edit"})}),Object(p.jsxs)("div",{children:[Object(p.jsx)("b",{children:"Full name"}),":",e.fullName]}),Object(p.jsxs)("div",{children:[Object(p.jsx)("b",{children:"Looking for a job"}),":",e.lookingForAJob]}),e.lookingForAJob&&Object(p.jsxs)("div",{children:[Object(p.jsx)("b",{children:"My prof skill"}),":",e.lookingForAJobDescription]}),Object(p.jsxs)("div",{children:[Object(p.jsx)("b",{children:"About me"}),":",e.aboutMe]}),Object(p.jsxs)("div",{children:[Object(p.jsx)("b",{children:"Contacts"}),":",Object.keys(e.contacts).map((function(t){return Object(p.jsx)(I,{contactTitle:t,contactValue:e.contacts[t]},t)}))]})]})},I=function(t){var e=t.contactTitle,s=t.contactValue;return Object(p.jsxs)("div",{className:f.a.contact,children:[Object(p.jsx)("b",{children:e}),": ",s," "]})},S=k,y=s(57),A=s(396),C=s.n(A),B=s(397),M=s.n(B),w=s(18),F=l.a.memo((function(t){var e=Object(w.d)((function(t){var e;return null===(e=t.profilePage.profile)||void 0===e?void 0:e.photos.large}));return Object(p.jsxs)("div",{className:M.a.content,children:[Object(p.jsxs)("div",{className:M.a.item,children:[Object(p.jsx)("img",{src:e||m.a,alt:"",className:M.a.avatar}),Object(p.jsxs)("div",{className:M.a.like,children:[Object(p.jsx)("span",{children:"Like: "})," ",t.likeCounts]})]}),Object(p.jsxs)("div",{className:M.a.messages,children:[Object(p.jsx)("span",{className:M.a.text,children:t.message}),Object(p.jsx)("div",{className:M.a.corner}),Object(p.jsx)("button",{onClick:t.removeMessage,className:M.a.removeBtn,children:"x"})]})]})})),E=s(160),J=s(113),T=s(398),U=s.n(T),z=Object(_.a)({form:"dialogAddMessageForm"})((function(t){return Object(p.jsxs)("form",{onSubmit:t.handleSubmit,children:[Object(p.jsx)("div",{children:Object(x.c)("Your post","newPostText",[J.b],x.b)}),Object(p.jsx)("div",{children:Object(p.jsx)("button",{className:U.a.btn,children:"Send"})})]})})),D=s(159),Q=function(t){var e=Object(w.c)(),s=Object(y.a)(t.posts).reverse().map((function(t){return Object(p.jsx)(F,{message:t.message,likeCounts:t.likeCounts,id:Object(D.a)(),removeMessage:function(){e(E.a.deletePostAC(t.id))}},t.id)}));return Object(p.jsxs)("div",{className:C.a.postsBlock,children:[Object(p.jsx)("h3",{children:"My post"}),Object(p.jsx)("div",{children:Object(p.jsx)("div",{className:C.a.addPostAreaBlock,children:Object(p.jsx)(z,{onSubmit:function(e){t.addPost(e.newPostText)}})})}),Object(p.jsx)("div",{className:C.a.posts,children:s})]})},V=Object(w.b)((function(t){return{profilePage:t.profilePage,posts:t.profilePage.posts}}),{addPost:E.a.addPostAC})(Q),q=l.a.memo((function(t){return Object(p.jsxs)("div",{className:u.a.content,children:[Object(p.jsx)(S,{profile:t.profile,savePhoto:t.savePhoto,saveProfile:t.saveProfile,status:t.status,updateStatus:t.updateStatus,isOwner:t.isOwner}),Object(p.jsx)(V,{})]})})),L=s(22),R=s(393),Z=s(21),Y=function(t){Object(a.a)(s,t);var e=Object(i.a)(s);function s(){return Object(c.a)(this,s),e.apply(this,arguments)}return Object(n.a)(s,[{key:"refreshProfile",value:function(){var t=+this.props.match.params.userId;t||(t=this.props.authorizedUserId)||this.props.history.push("/login"),t?(this.props.getUserProfile(t),this.props.getStatus(t)):console.error("ID should exists in URI params or in state ('authorizedUserId')")}},{key:"componentDidMount",value:function(){this.refreshProfile()}},{key:"componentDidUpdate",value:function(t,e){this.props.match.params.userId!=t.match.params.userId&&this.refreshProfile()}},{key:"render",value:function(){return Object(p.jsx)("div",{className:u.a.content,children:Object(p.jsx)(q,Object(o.a)(Object(o.a)({},this.props),{},{profile:this.props.profile,status:this.props.status,updateStatus:this.props.updateStatus,savePhoto:this.props.savePhoto,isOwner:!this.props.match.params.userId}))})}}]),s}(l.a.Component);e.default=Object(Z.d)(Object(w.b)((function(t){return{profile:t.profilePage.profile,status:t.profilePage.status,authorizedUserId:t.auth.id}}),{getUserProfile:E.d,getStatus:E.c,updateStatus:E.g,savePhoto:E.e,saveProfile:E.f}),L.g,R.a)(Y)}}]);
//# sourceMappingURL=3.ac6acb57.chunk.js.map