(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/result/prize"],{"03aa":function(e,t,a){"use strict";(function(e){a("519c");i(a("66fd"));var t=i(a("c098"));function i(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,a("543d")["createPage"])},"0c99":function(e,t,a){"use strict";var i=a("1456"),r=a.n(i);r.a},1456:function(e,t,a){},aaac:function(e,t,a){"use strict";var i={simpleAddress:function(){return Promise.all([a.e("common/vendor"),a.e("components/simple-address/simple-address")]).then(a.bind(null,"baec"))}},r=function(){var e=this,t=e.$createElement;e._self._c;e._isMounted||(e.e0=function(t){e.writeMsg=!1})},l=[];a.d(t,"b",(function(){return r})),a.d(t,"c",(function(){return l})),a.d(t,"a",(function(){return i}))},ae88:function(e,t,a){"use strict";(function(e){function i(e,t){return n(e)||o(e,t)||l(e,t)||r()}function r(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function l(e,t){if(e){if("string"===typeof e)return s(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);return"Object"===a&&e.constructor&&(a=e.constructor.name),"Map"===a||"Set"===a?Array.from(a):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?s(e,t):void 0}}function s(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,i=new Array(t);a<t;a++)i[a]=e[a];return i}function o(e,t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e)){var a=[],i=!0,r=!1,l=void 0;try{for(var s,o=e[Symbol.iterator]();!(i=(s=o.next()).done);i=!0)if(a.push(s.value),t&&a.length===t)break}catch(n){r=!0,l=n}finally{try{i||null==o["return"]||o["return"]()}finally{if(r)throw l}}return a}}function n(e){if(Array.isArray(e))return e}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var p={},c=null,d=function(){Promise.all([a.e("common/vendor"),a.e("components/simple-address/simple-address")]).then(function(){return resolve(a("baec"))}.bind(null,a)).catch(a.oe)},g={data:function(){return{imgUrl:getApp().globalData.imgUrl,prizeImg:"",pickerText:"",cityPickerValueDefault:[0,0,0],writeMsg:!1,isGet:!1,username:"",address:"",tel:"",yzcode:"",idcard:"",sec:0,stop:!1,showTip:!1,needIdcard:!1,expireFlag:!1,coverClosed:!1,isEcjx:1==getApp().globalData.reply.doubleSurpriseFlag}},onLoad:function(t){var a=this;if(getApp().globalData.reply){p=getApp().globalData.reply;var i=p.expireTime.split("-")[0],r=p.expireTime.split("-")[1]-1,l=p.expireTime.split("-")[2];if(console.log(i,r,l),console.log(Date.parse(new Date(i,r,l))+864e5),console.log(getApp().globalData.replyTime),Date.parse(new Date(i,r,l))+864e5<getApp().globalData.replyTime&&(this.expireFlag=!0),this.isGet=!(!p.username||!p.phonenum),"U"==getApp().globalData.provinceCode)switch(p.grandPrizeType.toUpperCase()){case"U":this.prizeImg=getApp().globalData.imgUrl+"/prize_bdd.png";break;case"T":this.prizeImg=getApp().globalData.imgUrl+"/prize_yyt_hn.png?v=1";break;case"V":this.prizeImg=getApp().globalData.imgUrl+"/prize_hwp30.png";break;case"Q":this.prizeImg=getApp().globalData.imgUrl+"/prize_hqzl.png";break;case"R":this.prizeImg=getApp().globalData.imgUrl+"/prize_dly.png";break;default:e.redirectTo({url:"../fail/fail"});break}else if("AH"==getApp().globalData.provinceCode)switch(p.grandPrizeType.toUpperCase()){case"S":this.prizeImg=getApp().globalData.imgUrl+"/prize_bdd.png";break;case"R":this.prizeImg=getApp().globalData.imgUrl+"/prize_yyt.png?v=2";break;default:e.redirectTo({url:"../fail/fail"});break}else if("HP"==getApp().globalData.provinceCode)switch(p.grandPrizeType.toUpperCase()){default:e.redirectTo({url:"../fail/fail"});break}else if("I"==getApp().globalData.provinceCode)switch(p.grandPrizeType.toUpperCase()){case"P":this.prizeImg=getApp().globalData.imgUrl+"/prize_hqzl.png";break;case"Q":this.prizeImg=getApp().globalData.imgUrl+"/prize_xyzl.png";break;case"R":this.prizeImg=getApp().globalData.imgUrl+"/prize_dly.png";break;case"S":this.prizeImg=getApp().globalData.imgUrl+"/prize_yyt_hn.png?v=1";break;case"T":this.prizeImg=getApp().globalData.imgUrl+"/prize_bdd.png?v=1";break;default:e.redirectTo({url:"../fail/fail"});break}else if("Q"==getApp().globalData.provinceCode)switch(p.grandPrizeType.toUpperCase()){case"Q":this.prizeImg=getApp().globalData.imgUrl+"/prize_jq.png";break;case"P":this.prizeImg=getApp().globalData.imgUrl+"/prize_bdd.png";break;default:e.redirectTo({url:"../fail/fail"});break}else if("F"==getApp().globalData.provinceCode)switch(p.grandPrizeType.toUpperCase()){case"W":this.prizeImg=getApp().globalData.imgUrl+"/prize_bdd.png";break;case"2":this.prizeImg=getApp().globalData.imgUrl+"/prize_yyt_fj.png";break;default:e.redirectTo({url:"../fail/fail"});break}else if("N"==getApp().globalData.provinceCode)switch(p.grandPrizeType.toUpperCase()){case"Q":this.prizeImg=getApp().globalData.imgUrl+"/prize_dly.png";break;case"P":this.prizeImg=getApp().globalData.imgUrl+"/prize_hqzl.png";break;case"R":this.prizeImg=getApp().globalData.imgUrl+"/prize_yyt_hn.png";break;default:e.redirectTo({url:"../fail/fail"});break}this.isGet||(c=setTimeout((function(){a.coverClosed=!0}),3e3))}},methods:{openAddres:function(){this.$refs.simpleAddress.open()},onConfirm:function(e){this.pickerText=e.label},inputYzm:function(e){this.yzcode=e.detail.value},inputName:function(e){this.username=e.detail.value},inputTel:function(e){this.tel=e.detail.value},inputAddress:function(e){this.address=e.detail.value},inputIdcard:function(e){this.idcard=e.detail.value},openInput:function(){this.isGet||this.expireFlag?e.switchTab({url:"../mybag/mybag"}):this.writeMsg=!0},closeCover:function(){this.coverClosed=!0,clearTimeout(c)},closeTip:function(){this.showTip=!1,this.isEcjx&&(getApp().globalData.ecjx=!0,getApp().globalData.getPrize=!0,e.switchTab({url:"../index/index"}))},toRule:function(){e.navigateTo({url:"../rule/webview?provinceCode="+getApp().globalData.provinceCode})},submsg:function(){var t=this;if(this.isGet)return this.writeMsg=!1;""==this.username||" "==this.username?e.showModal({title:"提示",content:"请填写正确的姓名哦！~",showCancel:!1}):this.needIdcard&&!this.$Store.dispatch(this.idcard)?e.showModal({title:"提示",content:"请填写正确的身份证号码哦！~",showCancel:!1}):/^[1]{1}[0-9]{10}$/.test(this.tel)?""==this.pickerText?e.showModal({title:"提示",content:"请选择所在地区",showCancel:!1}):""==this.address||" "==this.address?e.showModal({title:"提示",content:"请输入正确的详细地址",showCancel:!1}):/^[0-9]{4}$/.test(this.yzcode)?(e.showLoading({title:"提交中"}),e.setStorage({key:"address",data:getApp().globalData.address}),e.request({url:this.$Store.state.requestUrl+"/user/savePrize",method:"POST",data:{openid:getApp().globalData.openid,address:this.pickerText+"-"+this.address,username:this.username,idcard:this.needIdcard?this.idcard:"idcard",skukey:getApp().globalData.reply.skukey,phonenum:this.tel,grandPrizeType:getApp().globalData.reply.grandPrizeType,prizeVcode:getApp().globalData.reply.prizeVcode,projectServerName:this.$Store.state.serverName,captcha:this.yzcode}}).then((function(a){e.hideLoading();var r=i(a,2),l=r[0],s=r[1];s?0==s.data.result.code?0==s.data.result.businessCode?(t.showTip=!0,t.yzcode="",t.writeMsg=!1,t.isGet=!0):e.showModal({title:"提示",content:s.data.result.msg?s.data.result.msg:"系统开了个小差",showCancel:!1}):e.showModal({title:"大奖提交提示",content:s.data.result.msg?s.data.result.msg:"系统开了个小差",showCancel:!1}):(console.log(l),e.showModal({title:"大奖提交提示",content:"系统繁忙",showCancel:!1}))}))):e.showModal({title:"提示",content:"请输入验证码",showCancel:!1}):e.showModal({title:"提示",content:"请输入正确的手机号",showCancel:!1})},timeout:function(){var e=this;if(this.sec-=1,this.sec<=0||this.stop)return this.sec=0;setTimeout((function(){e.timeout()}),1e3)},getVerifyCode:function(){var t=this;if(0!=this.sec)return!1;/^1[0-9]{10}$/.test(this.tel)?(e.showLoading({title:"获取验证码",mask:!0}),e.request({url:this.$Store.state.requestUrl+"/user/getCaptcha",method:"POST",data:{phonenum:this.tel,projectServerName:this.$Store.state.serverName}}).then((function(a){e.hideLoading();var r=i(a,2),l=(r[0],r[1]);l?0==l.data.result.code&&0==l.data.result.businessCode?(t.sec=60,t.timeout()):0==l.data.result.code&&2==l.data.result.businessCode?e.showModal({title:"提示",content:"您填写的手机号错误，发送验证码失败！",showCancel:!1}):e.showModal({title:"获取验证码提示",content:"验证码获取失败！请稍后再试并确认手机号是否输入正确",showCancel:!1}):e.showModal({title:"获取验证码提示",content:"系统繁忙",showCancel:!1})}))):e.showModal({title:"提示",content:"请输入正确的手机号",showCancel:!1})}},components:{simpleAddress:d}};t.default=g}).call(this,a("543d")["default"])},c098:function(e,t,a){"use strict";a.r(t);var i=a("aaac"),r=a("e8e8");for(var l in r)"default"!==l&&function(e){a.d(t,e,(function(){return r[e]}))}(l);a("0c99");var s,o=a("f0c5"),n=Object(o["a"])(r["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],s);t["default"]=n.exports},e8e8:function(e,t,a){"use strict";a.r(t);var i=a("ae88"),r=a.n(i);for(var l in i)"default"!==l&&function(e){a.d(t,e,(function(){return i[e]}))}(l);t["default"]=r.a}},[["03aa","common/runtime","common/vendor"]]]);