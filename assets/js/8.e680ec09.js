(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{409:function(t,e,n){"use strict";var s=n(1);e.a=new s.a},440:function(t,e,n){},453:function(t,e,n){"use strict";var s=n(440);n.n(s).a},460:function(t,e,n){"use strict";n.r(e);n(227);var s=n(409),u=n(129),i={data:function(){return{submitEvent:null}},computed:{enabled:function(){return Boolean(this.submitEvent)},message:function(){return this.submitEvent?"success"===this.submitEvent.result?"Thank you for subscribing!":"Request failed!":""},isError:function(){return!(!this.submitEvent||"error"!==this.submitEvent.result)}},created:function(){s.a.$on("submited",this.onSubmited)},methods:{onSubmited:function(t){var e=this;this.submitEvent=t,setTimeout((function(){e.submitEvent=null}),u.popupTimeout)}}},r=(n(453),n(7)),o=Object(r.a)(i,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("transition",{attrs:{name:"submit-popup"}},[t._t("default",[t.enabled?n("div",{staticClass:"submit-popup",class:{error:t.isError},attrs:{"data-cy":"popup"}},[t._v("\n      "+t._s(t.message)+"\n    ")]):t._e()],{enabled:t.enabled,message:t.message,isError:t.isError})],2)}),[],!1,null,null,null);e.default=o.exports}}]);