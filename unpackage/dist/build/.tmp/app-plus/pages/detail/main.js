(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/detail/main"],{"16ee":function(t,e,n){"use strict";var a=n("2332"),i=n.n(a);i.a},2332:function(t,e,n){},"91ce":function(t,e,n){"use strict";n.r(e);var a=n("a4c0"),i=n("b822");for(var o in i)"default"!==o&&function(t){n.d(e,t,function(){return i[t]})}(o);n("16ee");var s=n("2877"),r=Object(s["a"])(i["default"],a["a"],a["b"],!1,null,"4bc4a442",null);e["default"]=r.exports},a4c0:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,a=(t._self._c,n("524f")),i=n("9212"),o=n("f15f"),s=n("524f"),r=n("3e27"),c=n("dd67"),u=n("f4d5");t.$mp.data=Object.assign({},{$root:{m0:a,m1:i,m2:o,m3:s,m4:r,m5:c,m6:u}})},i=[];n.d(e,"a",function(){return a}),n.d(e,"b",function(){return i})},b822:function(t,e,n){"use strict";n.r(e);var a=n("f4e0"),i=n.n(a);for(var o in a)"default"!==o&&function(t){n.d(e,t,function(){return a[t]})}(o);e["default"]=i.a},f4e0:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=r(n("a34a")),i=n("faf3"),o=n("fb86"),s=n("0d80");function r(t){return t&&t.__esModule?t:{default:t}}function c(t,e,n,a,i,o,s){try{var r=t[o](s),c=r.value}catch(u){return void n(u)}r.done?e(c):Promise.resolve(c).then(a,i)}function u(t){return function(){var e=this,n=arguments;return new Promise(function(a,i){var o=t.apply(e,n);function s(t){c(o,a,i,s,r,"next",t)}function r(t){c(o,a,i,s,r,"throw",t)}s(void 0)})}}function l(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},a=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(a=a.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),a.forEach(function(e){p(t,e,n[e])})}return t}function p(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var d=function(){return Promise.all([n.e("common/vendor"),n.e("components/login")]).then(n.bind(null,"6a4f"))},h=function(){return n.e("components/sendReply").then(n.bind(null,"da35"))},f=function(){return n.e("components/loginTips").then(n.bind(null,"32a8"))},g=function(){return(0,o.debounce)(function(t){this.cursor=t.target.scrollTop})},m={components:{sendReply:h,login:d,loginTips:f},onUnload:function(){this.$http.get("".concat(i.api),{act:"post.updateCursor",postId:this.id,pageNum:this.pageNum,t:this.t,cursor:this.cursor}),this.detailData={},this.currentReplies=[]},mounted:function(){var t=this;setTimeout(function(){t.cursor=t.cursorTmp},1e3)},computed:{culculatePageNum:function(){return Math.floor(this.level1ReplySize/i.reply_size_per_page)+1},formatCreateAt:function(){return(0,o.passTime)(this.detailData.createtime)},formatReplies:function(){return this.currentReplies.map(function(t){return l({},t,{createtime:(0,o.passTime)(t.createtime)})})},culBuildingIndex:function(){return function(t){}}},onShareAppMessage:function(){return{title:this.detailData.title,path:"/pages/detail/main?postId="+this.id+"&share=1"}},methods:{backPage:function(){0!=this.pageNum&&(1==this.pageNum?(this.pageNum=this.pageNum-1,this.includePostContent=1,wx.showLoading({title:"加载中"}),this.getReplyData(this.pageNum)):(this.pageNum=this.pageNum-1,this.getReplyData(this.pageNum)))},closeModalEvent:function(){this.loginVisible=!1,this.t=wx.getStorageSync("t"),this.getPostData(),this.getReplyData(-1)},goPage:function(){this.pageNum!=this.culculatePageNum&&(0==this.pageNum&&(this.includePostContent=0),this.pageNum++,this.getReplyData(this.pageNum))},doOrUndoCollect:function(){var t=u(a.default.mark(function t(){var e,n;return a.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:if(1!=this.detailData.isCollection){t.next=7;break}return t.next=3,this.$http.get("".concat(i.api),{act:"collection.post.delete",t:this.t,postId:this.id});case 3:e=t.sent,30003==e.data.code?wx.showToast({title:"已经取消收藏了",icon:"none",duration:2e3}):null!=e.data.code?wx.showToast({title:"服务正在失去联系，请稍后",icon:"none",duration:2e3}):(wx.showToast({title:"取消收藏成功",icon:"none",duration:2e3}),this.detailData.isCollection=0),t.next=11;break;case 7:return t.next=9,this.$http.get("".concat(i.api),{act:"collection.post.add",t:this.t,postId:this.id});case 9:n=t.sent,30002==n.data.code?wx.showToast({title:"已经收藏了",icon:"none",duration:2e3}):null!=n.data.code?wx.showToast({title:"服务正在失去联系，请稍后",icon:"none",duration:2e3}):(wx.showToast({title:"收藏成功",icon:"none",duration:2e3}),this.detailData.isCollection=1);case 11:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),previewImg:function(t){for(var e=[],n=0;n<this.detailData.imgList.length;n++)e.push(this.detailData.imgList[n].url);wx.previewImage({current:this.detailData.imgList[t].url,urls:e})},navigateToReply:function(t){var e=t.currentTarget.dataset.replyid,n=t.currentTarget.dataset.postid,a=t.currentTarget.dataset.anonymous,i=this.detailData.userId;wx.navigateTo({url:"../reply/main?replyId=".concat(e,"&postId=").concat(n,"&anonymous=").concat(a,"&postUserId=").concat(i)})},onScroll:g(),getPostData:function(){var t=u(a.default.mark(function t(){var e;return a.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return wx.showLoading({title:"加载中"}),t.next=3,this.$http.get("".concat(i.api),{act:"post.detail",postId:this.id,t:this.t});case 3:e=t.sent,this.detailData=e.data,this.level1ReplySize=e.data.level1ReplySize,wx.hideLoading();case 7:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),getReplyData:function(){var e=u(a.default.mark(function e(n){var o;return a.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return wx.showLoading({title:"加载中"}),e.next=3,this.$http.get("".concat(i.api),{act:this.requestAction,pageNum:n,postId:this.id,t:this.t});case 3:o=e.sent,this.pageNum=n,this.currentReplies=o.data.data,this.pageNum=o.data.cursorInfo.pageNum,console.log(t("cursor="+this.cursor+" pageNum="+this.pageNum," at pages/detail/main.vue:362")),0!=this.pageNum&&(this.includePostContent=0),-1==n?this.cursorTmp=o.data.cursorInfo.cursor:this.cursor=0,wx.hideLoading();case 11:case"end":return e.stop()}},e,this)}));function n(t){return e.apply(this,arguments)}return n}(),collect:function(){var t=u(a.default.mark(function t(){var e,n,o,s;return a.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:if(e=wx.getStorageSync("accesstoken"),n=this.id,!this.detailData.is_collect){t.next=9;break}return t.next=5,this.$http.post("".concat(i.api,"/topic_collect/de_collect"),{accesstoken:e,topic_id:n});case 5:o=t.sent,o.data.success&&(wx.showToast({title:"取消收藏成功",icon:"none",duration:2e3}),this.detailData.is_collect=!1),t.next=14;break;case 9:return t.next=11,this.$http.post("".concat(i.api,"/topic_collect/collect"),{accesstoken:e,topic_id:n});case 11:s=t.sent,s.data.success&&wx.showToast({title:"收藏成功",icon:"none",duration:2e3}),this.detailData.is_collect=!0;case 14:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),goBottom:function(){this.top=1e3*this.currentReplies.length},backHome:function(){wx.reLaunch({url:"/pages/index/main"})},upOrCancel:function(){var t=u(a.default.mark(function t(e){var n,o;return a.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:if(n=wx.getStorageSync("accesstoken"),!n){t.next=14;break}return t.prev=2,t.next=5,this.$http.post("".concat(i.api,"/reply/").concat(e.currentTarget.dataset.replyid,"/ups"),{accesstoken:n});case 5:o=t.sent,o.data.success&&(wx.showToast({title:"200",icon:"none",duration:2e3}),"up"===o.data.action?this.currentReplies[e.currentTarget.dataset.originindex].ups.length+=1:this.currentReplies[e.currentTarget.dataset.originindex].ups.length-=1,this.currentReplies[e.currentTarget.dataset.originindex].is_uped="up"===o.data.action),t.next=12;break;case 9:t.prev=9,t.t0=t["catch"](2),wx.showToast({title:t.t0.response.data.error_msg,icon:"none",duration:2e3});case 12:t.next=15;break;case 14:wx.showToast({title:"请先登录",icon:"none",duration:2e3});case 15:case"end":return t.stop()}},t,this,[[2,9]])}));function e(e){return t.apply(this,arguments)}return e}(),showReplyModal:function(t){var e=this;this.t=wx.getStorageSync("t"),(0,s.checkT)(this.t,function(){e.loginVisible=!0},function(){var n=wx.getStorageSync("userId"),a=t.currentTarget.dataset.username,i=t.currentTarget.dataset.replyid,o=e.detailData.anonymous;e.content=a?"@".concat(a,":"):"",n==e.detailData.userId&&(e.isPostUserId=!0),e.postAnonymous=o,e.replyId=i,e.replyUserName=a,e.sendVisible=!0})},replySuccess:function(){this.closeModal(),wx.showToast({title:"评论成功",icon:"none",duration:1500}),this.getReplyData(this.pageNum)},closeModal:function(){this.sendVisible=!1}},onLoad:function(){this.id=this.$root.$mp.query.postId,1==this.$root.$mp.query.share&&(this.isShare=1)},onShow:function(){this.reply_size_per_page=i.reply_size_per_page,this.includePostContent=1;var t=this;this.t=wx.getStorageSync("t"),(0,s.checkT)(this.t,function(){wx.setStorageSync("t",i.no_token_value),t.t=0,t.getPostData(),t.getReplyData(-1)},function(){t.t=wx.getStorageSync("t"),t.getPostData(),t.getReplyData(-1)})},onReady:function(){},data:function(){return{detailData:{},remainReplies:[],currentReplies:[],content:"",sendVisible:!1,id:"",replyId:"",timer:null,replyUserName:"",isPostUserId:!1,postAnonymous:0,bottom:0,pageNum:0,replySearchType:0,requestAction:"reply.list",loginVisible:!1,isShare:0,t:0,level1ReplySize:0,includePostContent:1,cursor:-1,reply_size_per_page:0,cursorTmp:0}}};e.default=m}).call(this,n("0de9")["default"])}},[["4372","common/runtime","common/vendor"]]]);