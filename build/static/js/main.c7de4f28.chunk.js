(this.webpackJsonpnocovy=this.webpackJsonpnocovy||[]).push([[0],{534:function(e,t,a){e.exports=a(813)},539:function(e,t,a){},813:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(16),i=a.n(o),c=(a(539),a(26)),l=a(20),s=a(30),u=a(31),m=a(32),d=a(42),p=a(107),h=a(23),f=a(33),g=a(108),E=a.n(g),b=a(84),v=a(837),y=a(510),O=a.n(y),j=a(333),w=a(231),S=a(464),N=a(334),C=a.n(N);function k(){var e=r.a.useState(null),t=Object(h.a)(e,2),a=t[0],n=t[1],o=Boolean(a),i=function(){n(null)};return r.a.createElement("div",null,r.a.createElement(j.a,{"aria-label":"more","aria-controls":"long-menu","aria-haspopup":"true",onClick:function(e){n(e.currentTarget)}},r.a.createElement(C.a,null)),r.a.createElement(w.a,{id:"long-menu",anchorEl:a,keepMounted:!0,open:o,onClose:i},r.a.createElement(d.c,{to:"/myproducts",style:{color:"black"}},r.a.createElement(S.a,{onClick:i},"My Products")),r.a.createElement(d.c,{to:"/reports",style:{color:"black"}},r.a.createElement(S.a,{onClick:i},"Product Reports"))))}var x=Object(f.b)((function(e){return{auth:e.firebase.auth}}),(function(e){return{signOut:function(){return e((function(e,t){E.a.auth().signOut().then((function(){e({type:"SIGNOUT_SUCCESS"})}))}))}}}))((function(e){return r.a.createElement("div",null,r.a.createElement(v.a,{container:!0,spacing:3},r.a.createElement(v.a,{item:!0,xs:6},r.a.createElement(k,null)),r.a.createElement(v.a,{item:!0,xs:6},r.a.createElement(j.a,{onClick:e.signOut},r.a.createElement(O.a,null)))))})),R=a(232),I=a(838),U=a(466),P=a(465),F=function(){return r.a.createElement("div",null,r.a.createElement(v.a,{container:!0,spacing:3},r.a.createElement(v.a,{item:!0,xs:6},r.a.createElement(d.c,{to:"/signup"},r.a.createElement(P.a,null,"Signup"))),r.a.createElement(v.a,{item:!0,xs:6},r.a.createElement(d.c,{to:"/signin"},r.a.createElement(P.a,null,"Login")))))},L=Object(R.a)((function(e){return{root:{flexGrow:1,color:"black"},title:{flexGrow:1}}})),A=Object(f.b)((function(e){return{auth:e.firebase.auth,profile:e.firebase.profile}}))((function(e){var t=e.auth,a=L(),n=t.uid?r.a.createElement(x,{props:e}):r.a.createElement(F,null);return r.a.createElement("div",null,r.a.createElement(I.a,{position:"static",style:{background:"transparent",boxShadow:"none"}},r.a.createElement(U.a,null,r.a.createElement(d.b,{to:"/"},r.a.createElement("img",{src:"LogoNocovy.png",style:{width:"120px"}})),r.a.createElement("div",{className:a.root}),n)))})),G=a(39),_=a(511),B=a(512);function T(){var e=Object(_.a)(["\n  background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);\n  border-radius: 3px;\n  border: 0;\n  color: white;\n  height: 48px;\n  padding: 0 30px;\n  box-shadow: 0 3px 5px 2px rgba(255, 105, 135, 0.3);\n"]);return T=function(){return e},e}var W=Object(B.a)(P.a)(T()),D=(a(2),a(344)),M=(a(841),a(843),a(842),a(523),a(524),a(525),Object(D.a)((function(){return{card:{marginTop:"10%",transition:"0.3s",width:"100%",overflow:"initial",background:"#ffffff"}}})),a(5)),z=a(11),J=a(468),Q=Object(M.a)({colorPrimary:{background:Object(z.i)("#ff8e53",.4)},barColorPrimary:{background:"linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%)"}})(J.a),V=function(e){function t(){return Object(c.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this.props,t=e.auth;e.products;if(!t.uid)return r.a.createElement(p.a,{to:"/signin"});return r.a.createElement("div",{className:"container",style:{textAlign:"center"}},r.a.createElement("h1",{style:{fontFamily:"Muli",marginBottom:"5%"}},"Welcome To Nocovy"),r.a.createElement(d.c,{to:"/reports",style:{marginRight:"2%",marginBottom:"2%"}},r.a.createElement(W,null,"Product Report")),r.a.createElement(d.c,{to:"/products",style:{marginBottom:"2%"}},r.a.createElement(W,null,"Product Manangerment")))}}]),t}(n.Component),Y=Object(G.d)(Object(f.b)((function(e){return console.log(e),{auth:e.firebase.auth}})))(V),K=a(10),Z=a(844),$=a(835),q=Object(M.a)({colorPrimary:{background:"#ffff"},barColorPrimary:{background:"linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%)"}})(J.a),H=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(s.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={email:"",password:"",logging:!1,authError:""},a.handleChange=function(e){a.setState(Object(K.a)({},e.target.id,e.target.value))},a.handleSubmit=function(e){e.preventDefault(),a.setState({logging:!0}),a.props.signIn(a.state)},a}return Object(m.a)(t,e),Object(l.a)(t,[{key:"componentDidUpdate",value:function(e,t){e.authError!==this.props.authError&&(void 0===this.props.authError&&null===this.props.authError||this.setState({logging:!1}))}},{key:"render",value:function(){var e=this.props,t=e.authError;return e.auth.uid?r.a.createElement(p.a,{to:"/"}):r.a.createElement("div",null,r.a.createElement(Z.a,{style:{marginTop:"2%"}},r.a.createElement("form",{className:"white auth",onSubmit:this.handleSubmit,style:{padding:"2%"}},r.a.createElement("h5",{className:"grey-text text-darken-3",style:{marginBottom:"3%"}},"Sign In"),r.a.createElement("div",{className:"input-field"},r.a.createElement("label",{htmlFor:"email"},"Email"),r.a.createElement("input",{type:"email",id:"email",onChange:this.handleChange})),r.a.createElement("div",{className:"input-field"},r.a.createElement("label",{htmlFor:"password"},"Password"),r.a.createElement("input",{type:"password",id:"password",onChange:this.handleChange})),r.a.createElement("div",{className:"input-field"},r.a.createElement($.a,null,r.a.createElement(W,{onClick:this.handleSubmit},"Login")),this.state.logging?r.a.createElement(q,{style:{marginBottom:"2%",marginTop:"2%",padding:"5px"}}):null,r.a.createElement("div",{className:"center red-text"},t?r.a.createElement("p",null,t):null)))))}}],[{key:"getDerivedStateFromProps",value:function(e,t){return e.authError!==t.authError?(e.authError,{authError:e.authError,logging:!1}):null}}]),t}(n.Component),X=Object(f.b)((function(e){return{authError:e.auth.authError,auth:e.firebase.auth}}),(function(e){return{signIn:function(t){return e((a=t,function(e,t,n){E.a.auth().signInWithEmailAndPassword(a.email,a.password).then((function(){e({type:"LOGIN_SUCCESS"})})).catch((function(t){e({type:"LOGIN_ERROR",err:t})}))}));var a}}}))(H),ee=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(s.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={email:"",password:"",firstName:"",lastName:""},a.handleChange=function(e){a.setState(Object(K.a)({},e.target.id,e.target.value))},a.handleSubmit=function(e){e.preventDefault(),a.props.signUp(a.state)},a}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this.props,t=e.auth,a=e.authError;return t.uid?r.a.createElement(p.a,{to:"/"}):r.a.createElement("div",{className:"container"},r.a.createElement("form",{className:"white",onSubmit:this.handleSubmit},r.a.createElement("h5",{className:"grey-text text-darken-3"},"Sign Up"),r.a.createElement("div",{className:"input-field"},r.a.createElement("label",{htmlFor:"email"},"Email"),r.a.createElement("input",{type:"email",id:"email",onChange:this.handleChange})),r.a.createElement("div",{className:"input-field"},r.a.createElement("label",{htmlFor:"password"},"Password"),r.a.createElement("input",{type:"password",id:"password",onChange:this.handleChange})),r.a.createElement("div",{className:"input-field"},r.a.createElement("label",{htmlFor:"firstName"},"First Name"),r.a.createElement("input",{type:"text",id:"firstName",onChange:this.handleChange})),r.a.createElement("div",{className:"input-field"},r.a.createElement("label",{htmlFor:"lastName"},"Last Name"),r.a.createElement("input",{type:"text",id:"lastName",onChange:this.handleChange})),r.a.createElement("div",{className:"input-field"},r.a.createElement("button",{className:"btn lighten-1 z-depth-0",color:"#39B04B"},"Sign Up"),r.a.createElement("div",{className:"center red-text"},a?r.a.createElement("p",null,a):null))))}}]),t}(n.Component),te=Object(f.b)((function(e){return{auth:e.firebase.auth,authError:e.auth.authError}}),(function(e){return{signUp:function(t){return e((a=t,function(e,t){E.a.auth().createUserWithEmailAndPassword(a.email,a.password).then((function(e){return fe.collection("users").doc(e.user.uid).set({displayName:a.firstName+" "+a.lastName,email:a.email})})).then((function(){e({type:"SIGNUP_SUCCESS"})})).catch((function(t){e({type:"SIGNUP_ERROR",err:t})}))}));var a}}}))(ee),ae=(a(711),function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(s.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={reports:[],search:"",searching:!1,searchResult:[]},a}return Object(m.a)(t,e),Object(l.a)(t,[{key:"componentDidUpdate",value:function(e,t){e.reports!==this.props.reports&&this.setState({reports:this.props.reports})}},{key:"render",value:function(){console.log(this.state);var e=this.props,t=e.auth;e.products;return t.uid?r.a.createElement("div",{className:"container",style:{textAlign:"center"}},r.a.createElement("h1",{style:{fontFamily:"Muli",marginBottom:"5%"}},"Product Report"),r.a.createElement("div",{className:"input-field"},r.a.createElement("input",{type:"text",id:"search"}),r.a.createElement("label",{htmlFor:"title"},"Search"))):r.a.createElement(p.a,{to:"/signin"})}}],[{key:"getDerivedStateFromProps",value:function(e,t){return e.reports!==t.reports?{reports:e.reports}:null}}]),t}(n.Component)),ne=(Object(f.b)((function(e){return console.log(e),{auth:e.firebase.auth}}))(ae),function(e){function t(){return Object(c.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this.props;e.productobj,e.productlist,e.reports;return r.a.createElement(d.a,null,r.a.createElement("div",{className:"App"},r.a.createElement(A,null),r.a.createElement(p.d,null,r.a.createElement(p.b,{exact:!0,path:"/",component:Y}),r.a.createElement(p.b,{path:"/signin",component:X}),r.a.createElement(p.b,{path:"/signup",component:te}))))}}]),t}(n.Component)),re=Object(G.d)(Object(f.b)((function(e){return console.log(e),{auth:e.firebase.auth}})))(ne),oe=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function ie(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var a=e.installing;null!=a&&(a.onstatechange=function(){"installed"===a.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}a(777),a(779);var ce=a(178),le=a(522),se=a(126),ue={authError:null},me=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ue,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"LOGIN_ERROR":return console.log("login error"),Object(se.a)({},e,{authError:"Login failed"});case"LOGIN_GOOGLE_SUCCESS":return console.log("login success"),Object(se.a)({},e,{authError:null});case"LOGIN_GOOGLE_ERROR":return console.log("login error"),Object(se.a)({},e);case"LOGIN_SUCCESS":return console.log("login success"),Object(se.a)({},e,{authError:null});case"SIGNOUT_SUCCESS":return console.log("signout success"),e;case"SIGNUP_SUCCESS":return console.log("signup success"),Object(se.a)({},e,{authError:null});case"SIGNUP_ERROR":return console.log("signup error"),Object(se.a)({},e,{authError:t.err.message});default:return e}},de=Object(G.c)({auth:me,firestore:ce.firestoreReducer,firebase:b.firebaseReducer}),pe=[le.a.withExtraArgument(b.getFirebase,ce.getFirestore)];E.a.initializeApp({apiKey:"AIzaSyBtUJtrxFAiL06xfxey92cfYQkRldODuSg",authDomain:"sepm-nocovy.firebaseapp.com",databaseURL:"https://sepm-nocovy.firebaseio.com",projectId:"sepm-nocovy",storageBucket:"sepm-nocovy.appspot.com",messagingSenderId:"110375007293",appId:"1:110375007293:web:128c32d83c23de38b0e654",measurementId:"G-WQY5VFTZVL"});var he=E.a.firestore(),fe=t.default=he;var ge=window&&window.__INITIAL_STATE__,Ee=Object(G.e)(de,ge,Object(G.d)(G.a.apply(void 0,pe))),be={firebase:E.a,config:{userProfile:"users",useFirestoreForProfile:!0},dispatch:Ee.dispatch,createFirestoreInstance:ce.createFirestoreInstance};i.a.render(r.a.createElement(f.a,{store:Ee},r.a.createElement(b.ReactReduxFirebaseProvider,be,r.a.createElement("div",{id:"bckgrd",className:"bckgrd"},r.a.createElement((function(e){var t=e.children,a=Object(f.c)((function(e){return e.firebase.auth}));return Object(b.isLoaded)(a)?t:r.a.createElement("div",{style:{textAlign:"center"}},r.a.createElement("h1",{style:{fontFamily:"Muli",marginBottom:"5%"}},"Loading...")," ",r.a.createElement(Q,{style:{padding:"0.3%"}}))}),null,r.a.createElement(re,null))),"  ")),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat("","/service-worker.js");oe?(!function(e,t){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(a){var n=a.headers.get("content-type");404===a.status||null!=n&&-1===n.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):ie(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):ie(t,e)}))}}()}},[[534,1,2]]]);
//# sourceMappingURL=main.c7de4f28.chunk.js.map