(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/reply/main"],{"0adf":function(t,n,e){"use strict";e.r(n);var o=e("1a4c"),r=e("117b");for(var s in r)"default"!==s&&function(t){e.d(n,t,function(){return r[t]})}(s);e("645f");var i=e("2877"),u=Object(i["a"])(r["default"],o["a"],o["b"],!1,null,"123678e6",null);n["default"]=u.exports},"117b":function(t,n,e){"use strict";e.r(n);var o=e("31bc"),r=e.n(o);for(var s in o)"default"!==s&&function(t){e.d(n,t,function(){return o[t]})}(s);n["default"]=r.a},"1a4c":function(t,n,e){"use strict";var o=function(){var t=this,n=t.$createElement,o=(t._self._c,e("524f"));t.$mp.data=Object.assign({},{$root:{m0:o}})},r=[];e.d(n,"a",function(){return o}),e.d(n,"b",function(){return r})},"31bc":function(t,n,e){"use strict";(function(t,o){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r=u(e("a34a")),s=(e("faf3"),e("fb86")),i=e("0d80");function u(t){return t&&t.__esModule?t:{default:t}}function a(t,n,e,o,r,s,i){try{var u=t[s](i),a=u.value}catch(c){return void e(c)}u.done?n(a):Promise.resolve(a).then(o,r)}function c(t){return function(){var n=this,e=arguments;return new Promise(function(o,r){var s=t.apply(n,e);function i(t){a(s,o,r,i,u,"next",t)}function u(t){a(s,o,r,i,u,"throw",t)}i(void 0)})}}var l=function(){return Promise.all([e.e("common/vendor"),e.e("components/sendReply")]).then(e.bind(null,"da35"))},d=function(){return e.e("components/login").then(e.bind(null,"6a4f"))},f=function(){return(0,s.debounce)(function(t){this.top=t.target.scrollTop})},p={components:{sendReply:l,login:d},mounted:function(){this.getData()},computed:{formatCreateAt:function(){return(0,s.passTime)(this.reply.createtime)}},onShow:function(){var n=this,e=t.getStorageSync("t");(0,i.checkT)(e,function(){n.loginVisible=!0},function(){})},methods:{onScroll:f(),getData:function(){var n=c(r.default.mark(function n(){var e;return r.default.wrap(function(n){while(1)switch(n.prev=n.next){case 0:e=t.getStorageSync("t"),t.showLoading({title:"加载中"}),this.$http({t:e,act:"reply.detail",replyId:this.currentReplyId,size:5,pageNum:0},function(n){this.reply=n.data,t.hideLoading()});case 3:case"end":return n.stop()}},n,this)}));function e(){return n.apply(this,arguments)}return e}(),goTop:function(){this.top=0},getMore:function(){},showReplyModal:function(n){var e=t.getStorageSync("userId"),o=n.currentTarget.dataset.username,r=n.currentTarget.dataset.replyid;this.content=o?"@".concat(o,":"):"",e==this.postUserId&&(this.isPostUserId=!0),this.replyId=r,this.replyUserName=o,this.sendVisible=!0},replySuccess:function(){this.closeModal(),t.showToast({title:"评论成功",icon:"none",duration:1500}),this.getData()},closeModal:function(){this.sendVisible=!1}},onLoad:function(){this.currentReplyId=this.$root.$mp.query.replyId,this.postId=this.$root.$mp.query.postId,this.postAnonymous=this.$root.$mp.query.anonymous,this.postUserId=this.$root.$mp.query.postUserId,console.log(o("postUserId="+this.postUserId," at pages/reply/main.vue:172")),console.log(o("postAnonymous="+this.postAnonymous," at pages/reply/main.vue:173"))},data:function(){return{reply:{},sendVisible:!1,replyId:0,top:0,currentReplyId:0,postId:0,postAnonymous:0,postUserId:0,isPostUserId:!1,loginVisible:!1}}};n.default=p}).call(this,e("6e42")["default"],e("0de9")["default"])},5409:function(t,n,e){},"645f":function(t,n,e){"use strict";var o=e("5409"),r=e.n(o);r.a}},[["d661","common/runtime","common/vendor"]]]);