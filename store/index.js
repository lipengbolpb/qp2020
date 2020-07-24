import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
export default new Vuex.Store({
	state: {
		isOnline: false,
		imgUrl: 'https://xcxsite.vjifen.com/v/static/qp2020',
		goodsImgRoot: 'http://img.vjifen.com:8000/images/vma/',
		hasUserInfo: false,
		userInfo: '',
		requestUrl:'',
		qrUrl: '',
		wxUrl: '',
		sgUrl:'',
		appid:'',
		payAppid:'',
		vjfAppid:'',
		requestUrl_lx:'',
		haveTel:false,
		gzhName:'',
		companyKey:'',
		serverName:'',
		online: {
			qrUrl: 'HTTP://VJ1.TV',
			wxUrl: 'https://x.vjifen.com',
			sgUrl: 'https://xcxact.vjifen.com',
			vjfAppid:'wxe2a3ba29612c0e0e',
			requestUrl:'https://mapi.vjifen.com/vjifenInterface',
			requestUrl_lx:'https://sdqp.vjifen.com/DBTLXInterface',
			appid_hn: 'wxff61f0c805b996c3',//华南
			payAppid_hn: 'wxa42a20606316e2e9',
			appid_jx: 'wxaf6578e142e7b480',//江西
			payAppid_jx: 'wxa42a20606316e2e9',
			appid_hp: 'wx83f837b74f25eb06',//河南瓶装
			payAppid_hp: 'wxa42a20606316e2e9',
			appid_cq: 'wxce2c134a4b75904e',//重庆
			payAppid_cq: 'wxa42a20606316e2e9',
			appid_fj: 'wx2bfe8f8e91c938da',//福建
			payAppid_fj: 'wxa42a20606316e2e9',
			appid_ah: 'wx48365b8f25cee189',//安徽
			payAppid_ah: 'wxa42a20606316e2e9',
			companyKey_ah:'85f57fb1-585b-11ea-ba2a-6e6d36e3ad65',
			appid_cs: 'wx31c43eea5be02920',//湖南
			payAppid_cs: 'wxa42a20606316e2e9',
			mallAppid: 'wx5d6354fbe0f28336',
			mallVersion: 'release',//release正式版 trial体验版
		},
		test: {
			qrUrl: 'https://xt.vjifen.com',
			wxUrl: 'https://xt.vjifen.com',
			sgUrl: 'https://xcxact.vjifen.com',
			vjfAppid:'wx1ce2ca65ccc5aa5e',
			// requestUrl: 'https://vtt.vjifen.com:447/vjifenInterface',
			requestUrl: 'https://jxqp.vjifen.com:444/vjifenInterface',
			requestUrl_lx:'https://vtt.vjifen.com/DBTLXInterface',
			appid_hn: 'wx1ce2ca65ccc5aa5e',
			payAppid_hn: 'wx459ee9aa61f38da3',
			appid_cq: 'wx1ce2ca65ccc5aa5e',
			payAppid_cq: 'wx459ee9aa61f38da3',
			appid_hp: 'wx1ce2ca65ccc5aa5e',
			payAppid_hp: 'wx459ee9aa61f38da3',
			appid_jx: 'wx1ce2ca65ccc5aa5e',
			payAppid_jx: 'wx459ee9aa61f38da3',
			appid_fj: 'wx1ce2ca65ccc5aa5e',
			payAppid_fj: 'wx459ee9aa61f38da3',
			appid_ah: 'wx1ce2ca65ccc5aa5e',
			payAppid_ah: 'wx459ee9aa61f38da3',
			companyKey_ah:'85f57fb1-585b-11ea-ba2a-6e6d36e3ad65',
			appid_cs: 'wx1ce2ca65ccc5aa5e',
			payAppid_cs: 'wx459ee9aa61f38da3',
			mallAppid: 'wxfed4510289adce32',
			mallVersion: 'trial'
		},
		openscan: true, //控制扫码打开
	},
	mutations: { //计算属性 同步 commit
		parseTime(state, str) {
			if (str) {
				let time = str.split('.')[0];
				let year = time.split(' ')[0].split('-')[0],
					month = time.split(' ')[0].split('-')[1] - 1,
					day = time.split(' ')[0].split('-')[2],
					hour = time.split(' ')[1].split(':')[0],
					min = time.split(' ')[1].split(':')[1],
					sec = time.split(' ')[1].split(':')[2];
				return Date.parse(new Date(year, month, day, hour, min, sec));
			}
		},
		setProjectSign(state, provinceCode) {//根据省区编码 确定接口 appid等
			state.qrUrl = state.isOnline?state.online.qrUrl:state.test.qrUrl;
			state.wxUrl = state.isOnline?state.online.wxUrl:state.test.wxUrl;
			state.sgUrl = state.isOnline?state.online.sgUrl:state.test.sgUrl;
			state.vjfAppid = state.isOnline?state.online.vjfAppid:state.test.vjfAppid;
			state.requestUrl = state.isOnline?state.online.requestUrl:state.test.requestUrl;
			state.requestUrl_lx = state.isOnline?state.online.requestUrl_lx:state.test.requestUrl_lx;
			switch (provinceCode) {
				case 'U':
					state.appid = state.isOnline?state.online.appid_hn:state.test.appid_hn;
					state.payAppid = state.isOnline?state.online.payAppid_hn:state.test.payAppid_hn;
					state.gzhName = '青岛啤酒华南';
					state.serverName = 'huanan';
					break;
				case 'Q':
					state.appid = state.isOnline?state.online.appid_cq:state.test.appid_cq;
					state.payAppid = state.isOnline?state.online.payAppid_cq:state.test.payAppid_cq;
					state.gzhName = '青岛啤酒重庆';
					state.serverName = 'chongqing';
					break;
				case 'HP':
					state.appid = state.isOnline?state.online.appid_hp:state.test.appid_hp;
					state.payAppid = state.isOnline?state.online.payAppid_hp:state.test.payAppid_hp;
					state.gzhName = '青啤华中';
					state.serverName = 'henanpz';
					break;
				case 'I':
					state.appid = state.isOnline?state.online.appid_jx:state.test.appid_jx;
					state.payAppid = state.isOnline?state.online.payAppid_jx:state.test.payAppid_jx;
					state.gzhName = '青岛啤酒江西省区';
					state.serverName = 'jiangxi';
					break;
				case 'F':
					state.appid = state.isOnline?state.online.appid_fj:state.test.appid_fj;
					state.payAppid = state.isOnline?state.online.payAppid_fj:state.test.payAppid_fj;
					state.gzhName = '青岛啤酒东南营销';
					state.serverName = 'fujian';
					break;
				case 'AH':
					state.appid = state.isOnline?state.online.appid_ah:state.test.appid_ah;
					state.payAppid = state.isOnline?state.online.payAppid_ah:state.test.payAppid_ah;
					state.companyKey = state.isOnline?state.online.companyKey_ah:state.test.companyKey_ah;
					state.gzhName = '青岛啤酒醉美安徽';
					state.serverName = 'anhui';
					break;
				case 'N':
					state.appid = state.isOnline?state.online.appid_cs:state.test.appid_cs;
					state.payAppid = state.isOnline?state.online.payAppid_cs:state.test.payAppid_cs;
					state.gzhName = '青啤湖南';
					state.serverName = 'hunan';
					break;
			}
		}
	},
	actions: { //异步方法 dispatch
		getLocation() {
			return uni.getLocation({
				type: 'wgs84'
			})
		},
		getXcxOpenid() {//获取小程序openid
			return new Promise((resolve, reject) => {
				uni.getStorage({
					key: 'xcxOpenid'
				}).then(res => {
					let [e, r] = res;
					if (r) {
						uni.checkSession({
							complete:res=>{
								if(res.errCode==0){
									console.log(r.data)
									resolve(r.data)
								}else{
									uni.login().then(res=>{
										if (res) {
											let [e, r] = res;
											if (r) {
												uni.request({
													url: `${this.state.isOnline?this.state.online.sgUrl:this.state.test.sgUrl}/api/getOpenid`,
													method: 'POST',
													data: {
														code: r.code,
														provinceCode: 'all'
													},
													complete: res => {
														resolve(res.data.data.uinfo)
													}
												});
											}
										}
									})
								}
							}
						})
					} else {
						uni.login().then(res=>{
							if (res) {
								let [e, r] = res;
								if (r) {
									uni.request({
										url: `${this.state.isOnline?this.state.online.sgUrl:this.state.test.sgUrl}/api/getOpenid`,
										method: 'POST',
										data: {
											code: r.code,
											provinceCode: 'all'
										},
										complete: res => {
											resolve(res.data.data.uinfo)
										}
									});
								}
							}
						})
					}
				})
			})
		},
		getProvinceCode(store,xcxOpenid){//获取省区编号
			return new Promise((resolve,reject) => {
				uni.getStorage({
					key:'provinceCode'
				}).then(res=>{
					let [e,r] = res;
					console.log('storage',res)
					if(r){
						resolve(r.data)
					}else{
						uni.request({
							url: `${this.state.isOnline?this.state.online.sgUrl:this.state.test.sgUrl}/api/queryProvinceCode`,
							method: 'GET',
							data: {
								xcxopenid: xcxOpenid,
							},
							complete: res => {
								console.log('redis',res)
								resolve(res.data.provinceCode)
							}
						})
					}
				})
			})
		},
		getOpenid() {
			return uni.getStorage({
				key: 'openid'
			})
		},
		getVjfOpenid() {
			return uni.getStorage({
				key: 'vjfOpenid'
			})
		},
		getHbOpenid(store, appid) {
			let k = 'hbopenid_';
			if (appid) {
				k += appid;
			} else {
				k += this.state.payAppid
			}
			console.log(k)
			return uni.getStorage({
				key: k
			})
		},
		getIdcardValidateCode(state,idds){
		  let weight = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2],
		    validate = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
		  let reg2 = /^[1-9][0-9xX]{17}$/;
		  let sum = 0, mod = 0, ymd = [];
		  if (reg2.test(idds)) {
		    for (let i = 0; i < 17; ++i) {
		      sum += parseInt(idds[i], 10) * weight[i];
		      if (i > 5 && i < 14) ymd.push(idds[i]);
		    }
		    mod = sum % 11;
		    return validate[mod] === idds[17].toUpperCase() && reg2.test(idds);
		  } else {
		    return reg2.test(idds);
		  }
		
		}
	}
})
