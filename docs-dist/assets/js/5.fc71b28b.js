(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{222:function(e,t,a){},333:function(e,t,a){"use strict";var l=a(222);a.n(l).a},339:function(e,t,a){"use strict";a.r(t);var l={labelRequired:{type:"label",label:"依赖非空",span:12},depRequired:{label:"依赖",type:"text"},textRequired:{label:"文本",type:"text",depRules:[{dep:{key:"depRequired",opt:"eq",val:"1"},type:"string",required:!0,message:"依赖为1时, 文本不能为空"},{dep:{key:"depRequired",opt:"gt",val:"10"},type:"string",required:!0,message:"依赖大于10时, 文本不能为空"}]},labelPattern:{type:"label",label:"依赖正则",span:12},depPattern:{label:"依赖",type:"text"},textPattern:{label:"文本",type:"text",default:"1",depRules:[{dep:{key:"depPattern",opt:"reg",val:"^([1][3,4,5,6,7,8,9])\\d{9}$"},type:"string",pattern:"^([1][3,4,5,6,7,8,9])\\d{9}$",message:"依赖符合正则时, 文本不符合正则"},{dep:{key:"depPattern",opt:"in",val:"1,3,5"},type:"string",pattern:"^([1][3,4,5,6,7,8,9])\\d{9}$",message:"依赖为1,3,5其中之一时, 文本不符合正则"}]},labelLen:{type:"label",label:"依赖大小",span:12},depLen:{label:"依赖",type:"text"},textLen:{label:"文本",type:"text",default:"1",depRules:[{dep:{key:"depLen",opt:"nie"},type:"string",len:10,message:"依赖不为空时, 文本长度需为10"}]}},n={data:function(){return{formData:{},schema:l}},methods:{onClick:function(){var e=this;this.$refs.formEditor.validate(function(t){e.$toast.success("验证成功"),console.log("验证成功",t)},function(t){e.$toast.error("验证失败"),console.log("验证失败",t)})}}},r=(a(333),a(0)),p=Object(r.a)(n,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"wrapper"},[a("form-editor",{ref:"formEditor",attrs:{colcount:2,schema:e.schema,value:e.formData}}),e._v(" "),a("p",{staticStyle:{"padding-bottom":"20px"}},[a("gd-button",{on:{click:e.onClick}},[e._v("表单校验\n    ")])],1),e._v("\n  "+e._s(e.formData)+"\n")],1)},[],!1,null,null,null);t.default=p.exports}}]);