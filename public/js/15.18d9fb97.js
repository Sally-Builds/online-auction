(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[15],{df3b:function(s,t,a){"use strict";a.r(t);var e=function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("q-page",{attrs:{padding:"","data-aos":"fade-in"}},[s.getUser!={}?a("div",{staticClass:"row q-pa-lg"},[a("div",{staticClass:"col-12 q-pa-md text-center text-h6 headings"},[s._v("\n      Account Details\n    ")]),a("div",{staticClass:"col-12"},[a("q-separator")],1),a("q-form",{staticClass:"col-12",on:{submit:s.userUpdate}},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-12 col-md-6 q-pa-md q-px-lg"},[a("q-input",{attrs:{type:"text",label:"Name","lazy-rules":"",filled:"",dense:""},model:{value:s.name,callback:function(t){s.name=t},expression:"name"}})],1),a("div",{staticClass:"col-md-6 col-12 q-pa-md q-px-lg"},[a("q-input",{attrs:{type:"email",label:"email","lazy-rules":"",filled:"",dense:""},model:{value:s.email,callback:function(t){s.email=t},expression:"email"}})],1),a("div",{staticClass:"col-12 q-pa-md text-center"},[a("q-btn",{staticClass:"text-white bg-primary",staticStyle:{width:"200px"},attrs:{"no-caps":"",type:"submit"}},[s._v("Update")])],1)])])],1):s._e(),a("div",{staticClass:"row q-pa-lg"},[a("div",{staticClass:"col-12 q-pa-md text-center text-h6 headings"},[s._v("\n      Change Password\n    ")]),a("div",{staticClass:"col-12"},[a("q-separator")],1),a("q-form",{staticClass:"col-12",on:{submit:s.passwordChange}},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-4 col-12 q-pa-md"},[a("q-input",{attrs:{rules:s.passwordRules,type:s.isCurPwd?"password":"text",label:"Current Password *",filled:"",dense:""},scopedSlots:s._u([{key:"append",fn:function(){return[a("q-icon",{staticClass:"cursor-pointer",attrs:{name:s.isCurPwd?"visibility_off":"visibility"},on:{click:function(t){s.isCurPwd=!s.isCurPwd}}})]},proxy:!0}]),model:{value:s.currentPassword,callback:function(t){s.currentPassword=t},expression:"currentPassword"}})],1),a("div",{staticClass:"col-md-4 col-12 q-pa-md"},[a("q-input",{attrs:{rules:s.passwordRules,type:s.isPwd?"password":"text",label:"password *",filled:"",dense:""},scopedSlots:s._u([{key:"append",fn:function(){return[a("q-icon",{staticClass:"cursor-pointer",attrs:{name:s.isPwd?"visibility_off":"visibility"},on:{click:function(t){s.isPwd=!s.isPwd}}})]},proxy:!0}]),model:{value:s.password,callback:function(t){s.password=t},expression:"password"}})],1),a("div",{staticClass:"col-md-4 col-12 q-pa-md"},[a("q-input",{attrs:{rules:s.confirmPasswordRules,type:s.isConPwd?"password":"text",label:"confirm password *",filled:"",dense:""},scopedSlots:s._u([{key:"append",fn:function(){return[a("q-icon",{staticClass:"cursor-pointer",attrs:{name:s.isConPwd?"visibility_off":"visibility"},on:{click:function(t){s.isConPwd=!s.isConPwd}}})]},proxy:!0}]),model:{value:s.confirmPassword,callback:function(t){s.confirmPassword=t},expression:"confirmPassword"}})],1),a("div",{staticClass:"col-12 q-pa-md text-center"},[a("q-btn",{staticClass:"text-grey-3 bg-primary",staticStyle:{width:"200px"},attrs:{"no-caps":"",type:"submit"}},[s._v("Change password")])],1)])])],1)])},i=[],r=a("ded3"),o=a.n(r),n=a("2f62"),l={meta:{title:"Account Settings | Ófelos"},data(){return{name:"",email:"",currentPassword:"",confirmPassword:"",password:"",isPwd:!0,isConPwd:!0,isCurPwd:!0,passwordRules:[s=>!!s||"Password is required",s=>s.length>=8||"Password must be greater than 8 characters"],confirmPasswordRules:[s=>!!s||"Confirm Password",s=>s===this.password||"Password does not match"]}},computed:o()({},Object(n["c"])("users",["getUser"])),async mounted(){this.name=this.getUser.name,this.email=this.getUser.email},methods:o()(o()({},Object(n["b"])("users",["updateUser","changePassword"])),{},{userUpdate(){const s={name:this.name,email:this.email};this.updateUser(s)},passwordChange(){const s={password:this.password,currentPassword:this.currentPassword,confirmPassword:this.confirmPassword};this.changePassword(s)}})},d=l,c=a("2877"),p=a("9989"),u=a("eb85"),m=a("0378"),w=a("27f9"),f=a("9c40"),C=a("0016"),P=a("eebe"),b=a.n(P),h=Object(c["a"])(d,e,i,!1,null,null,null);t["default"]=h.exports;b()(h,"components",{QPage:p["a"],QSeparator:u["a"],QForm:m["a"],QInput:w["a"],QBtn:f["a"],QIcon:C["a"]})}}]);