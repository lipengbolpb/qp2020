<template>
	<view class="content">
		<view class="template_1">
			<view class="cover" v-show="open&&bizcode==0">
				<view class="template">
					<image v-if="imgUrl" :src="imgUrl+'/logo.png'" mode="widthFix" class="logo"></image>
					<image v-if="imgUrl" :src="imgUrl+'/bdd.png?v=1'" mode="widthFix" class="bdd" :animation="bddAni"></image>
					<image v-if="imgUrl" :src="imgUrl+'/slogan.png'" mode="widthFix" class="slogan"></image>
					<button class="open btn_com" @click="openCash">点 击 领 取</button>
				</view>
			</view>
			<view class="cash" v-show="bizcode==0">
				<view class="template">
					<image v-if="imgUrl" :src="imgUrl+'/logo.png'" mode="widthFix" class="logo"></image>
					<image v-if="imgUrl" :src="imgUrl+'/icon_rule.png'" mode="widthFix" class="rule" @click="toRule"></image>
					<image v-if="imgUrl&&provinceCode=='N'" :src="imgUrl+'/btn-to-home-new.png'" mode="widthFix" class="toSend" @click="toSend"></image>
					<view class="money_box">
						<image v-if="imgUrl" :src="imgUrl+'/cash_cover.png'" mode="widthFix" class="cash_cover"></image>
						<image v-if="imgUrl" :src="imgUrl+'/coin.png'" mode="widthFix" class="coin" :animation="coinAni"></image>
						<view class="title" v-show="!open" :style="{'opacity':reply.currentMoney!=0?1:0}">恭喜您获得</view>
						<view class="money" :animation="moneyAni">
							<text v-if="reply.currentMoney!=0">{{reply.currentMoney}}</text>
							<text v-else class="zeroTips">您离红包只差一点点~\n再扫一支试试看</text>{{reply.currentMoney!=0?'元':''}}
						</view>
					</view>
					<button class="btn_com getTel" @getphonenumber="getPhoneNum" v-if="!haveTel&&reply.totalAccountMoney>=1" open-type="getPhoneNumber">立即提现</button>
					<button class="btn_com tx" v-else @click="giveSpack()">{{reply.totalAccountMoney<1?'我收下了':'立即提现'}}</button>
					<text class="tips">您的账户余额为{{reply.totalAccountMoney}}元\n个人账户余额大于1元，可直接提现</text>
				</view>
			</view>
			<view class="repcash" v-show="bizcode==11">
				<view class="template">
					<image v-if="imgUrl" :src="imgUrl+'/logo.png'" mode="widthFix" class="logo"></image>
					<image v-if="imgUrl" :src="imgUrl+'/icon_rule.png'" mode="widthFix" class="rule" @click="toRule"></image>
					<text class="tips_1">您已扫过</text>
					<text class="tips_2" v-if="isLx">您已于{{reply.earnTime}}扫过这支酒</text>
					<text class="tips_2" v-else>您已于{{reply.earnTime}}扫过这支酒\n并获得{{reply.currentMoney}}元</text>
					<button class="btn_com getTel" @getphonenumber="getPhoneNum" v-if="!haveTel&&reply.totalAccountMoney>=1" open-type="getPhoneNumber">立即提现</button>
					<button class="btn_com tx" v-else @click="giveSpack()">{{reply.totalAccountMoney<1?'我收下了':'立即提现'}}</button>
					<text class="tips">您的账户余额为{{reply.totalAccountMoney}}元\n个人账户余额大于1元，可直接提现</text>
				</view>
			</view>
			<!-- 再次授权 -->
			<view class="authAgain mask" v-show="authAgain">
				<view class="authTip">
					<image v-if="imgUrl" :src="imgUrl+'/icon_close.png'" mode="widthFix" class="close" @click="closeAuth"></image>
					<text>亲，真的要放弃\n与红包亲密接触的机会嘛</text>
					<button class="btn_com" @getphonenumber="getPhoneNum" open-type="getPhoneNumber">再 次 授 权</button>
				</view>
			</view>
			<!-- 提现成功通知 -->
			<view class="tx_tips mask" v-show="txSuc">
				<view>
					<text>亲，您已将账户余额中的{{txMoney}}元进行了提现\n看到消息后72小时内要点开收钱呦！</text>
					<image v-if="imgUrl" :src="imgUrl+'/tx_tip.png'" mode="widthFix" @click="closeTx"></image>
				</view>
			</view>

			<!-- 提现成功通知 -->
			<view class="tx_attention mask" v-show="txAttention">
				<view>
					<text class="res_tips">已将账户余额中的{{txMoney}}元提现成功!</text>
					<view class="zgh_tips">关注<text>“{{gzhName}}”</text>公众号获取更多活动信息</view>
					<image v-if="imgUrl" :src="imgUrl+'/attention.png?v=1'" mode="widthFix" @click="closeAttention"></image>
					<button class="btn_com" open-type="contact" send-message-title="青岛啤酒小程序" :send-message-path="sharePath"
					 :send-message-img="shareImg" show-message-card="true">关注公众号</button>
				</view>
			</view>
		</view>
		<!-- 阶梯 -->
		<ladder_page :showLadder="showLadder" :index="ladderIndex" :provinceCode="provinceCode"></ladder_page>
		<!-- 广告弹窗 -->
		<view class="active" v-if="showActive">
			<image v-if="imgUrl" :src="imgUrl+'/618/advertisement.png'" mode="widthFix" class="activeImg"></image>
			<image v-if="imgUrl" :src="imgUrl+'/618/close.png'" mode="widthFix" class="activeClose" @click="closeActive"></image>
		</view>
		<!-- 618活动淘彩蛋及入会 -->
		<view class="egg" v-if="showEgg">
			<view class="template">
				<block v-if="taoMemberOrderFlag">
					<image v-if="imgUrl" :src="imgUrl+'/618/close.png'" mode="widthFix" class="eggClose" @click="closeEgg"></image>
					<image v-if="imgUrl" :src="imgUrl+'/618/vip.png'" mode="widthFix" class="eggImg order"></image>
					<image v-if="imgUrl" :src="imgUrl+'/618/copy.png'" mode="widthFix" class="copy" @click="copy"></image>
				</block>
				<block v-else>
					<image v-if="imgUrl" :src="imgUrl+'/618/close.png'" mode="widthFix" class="eggClose" @click="closeEgg"></image>
					<image v-if="imgUrl" :src="imgUrl+'/618/colorEgg.png'" mode="widthFix" class="eggImg"></image>
					<image v-if="imgUrl" :src="imgUrl+'/618/copy.png'" mode="widthFix" class="copy" @click="copy"></image>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
	import ladder_page from '@/components/ladder.vue';
	import config from '@/config/config.js'
	export default {
		data() {
			return {
				imgUrl: config.imgUrl,
				open: true,
				txSuc: false,
				txAttention: false,
				bddAni: '',
				coinAni: '',
				moneyAni: '',
				bizcode: 0,
				haveTel: this.$Store.state.haveTel,
				txMoney: 0,
				reply: getApp().globalData.reply,
				needTx: false,
				sharePath: '',
				shareImg: 'https://xcxsite.vjifen.com/v/static/qp2020/share.png',
				authAgain: false,
				gzhName: this.$Store.state.gzhName,
				isEcjx: getApp().globalData.reply.doubleSurpriseFlag == 1 ? true : false,
				isLx: false, //是否是一元乐享奖品
				showLadder: getApp().globalData.reply.scanLadderFlag == 1 ? true : false, //是否有阶梯
				ladderIndex: getApp().globalData.reply.scanLadderNum ? Number(getApp().globalData.reply.scanLadderNum) : 0,
				provinceCode: getApp().globalData.provinceCode,
				showActive:false,//广告
				showEgg:false,//彩蛋
				canOpenCash:false,//是否可拆
				taoMemberOrderFlag:getApp().globalData.reply.taoMemberOrderFlag==1?true:false//是否如入会口令
			}
		},
		onLoad(options) {
			this.bizcode = options.bizcode;
			this.sharePath = `pages/result/getcash?bizcode=${this.bizcode}&provinceCode=${getApp().globalData.provinceCode}`;
		},
		onShow() {
			if (this.needTx) {
				this.needTx = false;
				this.giveSpack()
			}
			if (this.reply.prizeType && this.reply.prizeType.indexOf('LX') != -1) {
				this.isLx = true;
			}
			if(this.reply.dayScanNum<4&&this.bizcode==0&&Date.parse(new Date())>Date.parse(new Date(2020,4,25))&&Date.parse(new Date())<Date.parse(new Date(2020,5,21))){//5.25-6.20
				setTimeout(()=>{
					this.showActive = true;
					this.canOpenCash = true;
				},1000);
			}else{
				this.canOpenCash = true;
				this.showActive = false;
			}
			if(this.reply.taoEasterEgg&&this.bizcode==11){//重复扫码也弹
				setTimeout(()=>{
					this.showEgg = true;
				},1000);
			}
		},
		onReady() {
			// 冰墩墩动画
			let bddAni = uni.createAnimation({
				duration: 1000,
				delay: 0,
				timingFunction: 'linear',
				transformOrigin: 'top right'
			})
			bddAni.right('160rpx').top('230rpx').scale(2).step().right('-50rpx').top('260rpx').scale(3).step({
				duration: 500
			})
			this.bddAni = bddAni.export()
		},
		onHide() {},
		onUnload() {},
		methods: {
			closeActive(){
				this.showActive = false;
			},
			closeEgg(){
				this.showEgg = false;
			},
			copy(){
				uni.setClipboardData({
					data:this.reply.taoEasterEgg,
					complete: (res) => {
						this.showEgg = false;
					}
				})
			},
			toSend() {
				uni.navigateTo({
					url: '../tool/webview?type=send'
				})
			},
			closeAttention() {
				this.txAttention = false;
			},
			closeTx() {
				this.txSuc = false;
			},
			closeAuth() {
				this.authAgain = false;
			},
			openCash() {
				if(!this.canOpenCash){
					return false;
				}
				if (getApp().globalData.provinceCode == 'U' && !getApp().globalData.isFromStrcode) { //华南且不是输入串码拆红包调接口
					this.sweep();
				} else {
					this.openAni();
				}
				getApp().globalData.isFromStrcode = false; //清空标志防止未关闭小程序时会产生bug
			},
			openAni() {
				let bddAni2 = uni.createAnimation({
					transformOrigin: 'top right',
					duration: 500,
					timingFunction: 'linear'
				});
				this.bddAni = bddAni2.export()
				bddAni2.right('-705rpx').top('500rpx').scale(3).step()
				this.bddAni = bddAni2.export();
				let coinAni = uni.createAnimation({
					duration: 300,
					transformOrigin: 'top center',
					timingFunction: 'linear'
				});
				coinAni.scale(1.2).step();
				let moneyAni = uni.createAnimation({
					duration: 100,
					delay: 200
				});
				moneyAni.opacity(1).step();
				setTimeout(() => {
					this.open = false;
					this.coinAni = coinAni.export();
					this.moneyAni = moneyAni.export();
				}, 500);
				if(this.bizcode==0&&this.reply.taoEasterEgg){
					setTimeout(()=>{
						this.showEgg = true;
					},1500);
				}
			},
			getPhoneNum(e) {
				if (e.detail.errMsg.indexOf('ok') == -1) {
					return this.authAgain = true;
				}
				if (getApp().globalData.sessionKey) {
					uni.request({
						url: this.$Store.state.sgUrl + '/api/decrypt',
						method: "POST",
						data: {
							provinceCode: 'all',
							sessionKey: getApp().globalData.sessionKey,
							encryptedData: e.detail.encryptedData,
							iv: e.detail.iv
						}
					}).then(res => {
						console.log(res)
						let [e, r] = res;
						if (r) { //获取成功 提现
							if (!r.data.data.decryptData.phoneNumber && r.data.data.decryptData.indexOf('error') != -1) { //解析失败，删除sessionkey
								getApp().globalData.sessionKey = '';
								uni.removeStorage({
									key: 'xcxOpenid',
									success(res) {
										console.log(res)
									}
								})
								uni.showToast({
									icon: 'none',
									title: '获取失败请重试'
								})
							} else {
								this.authAgain = false;
								this.$Store.state.haveTel = r.data.data.decryptData.phoneNumber;
								this.haveTel = r.data.data.decryptData.phoneNumber;
								this.giveSpack()
							}
						} else { //获取手机号的其他异常其他异常
							console.log(e)
						}
					}).catch(err => {
						console.log(err)
					})
				} else {
					this.getOpenid().then(res => {
						getApp().globalData.xcxOpenid = res.openid;
						getApp().globalData.sessionKey = res.session_key;
						return uni.request({
							url: this.$Store.state.sgUrl + '/api/decrypt',
							method: "POST",
							data: {
								provinceCode: 'all',
								sessionKey: getApp().globalData.sessionKey,
								encryptedData: e.detail.encryptedData,
								iv: e.detail.iv
							}
						})
					}).then(res => {
						console.log(res)
						let [e, r] = res;
						if (r) { //获取成功 提现
							this.$Store.state.haveTel = r.data.data.decryptData.phoneNumber;
							this.haveTel = r.data.data.decryptData.phoneNumber;
							this.giveSpack()
						} else { //获取手机号的其他异常其他异常
							console.log(e)
						}
					}).catch(err => {
						console.log(err)
					})
				}

			},
			async getOpenid() {
				let xcxOpenid = await this.$Store.dispatch('getXcxOpenid')
				uni.setStorage({
					key: 'xcxOpenid',
					data: xcxOpenid
				})
				return xcxOpenid
			},
			giveSpack(appid) { //提现
				if (this.reply.totalAccountMoney >= 1) {
					if (getApp().globalData.hbopenid) {
						//提现接口
						this.tx()
					} else {
						this.$Store.dispatch('getHbOpenid', appid).then(res => {
							console.log(res)
							let [e, r] = res;
							if (r) { //有hbopenid
								uni.showLoading({
									title: '加载中'
								})
								getApp().globalData.hbopenid = r.data.hbopenid;
								//提现接口
								this.tx()
							} else { //重新获取 获取之后自动提现
								this.needTx = true;
								uni.navigateTo({
									url: '../tool/getOpenid/getOpenid?type=hbopenid&appid=' + (appid ? appid : this.$Store.state.payAppid)
								})
							}
						})
					}
				} else {
					if (this.isEcjx) {
						getApp().globalData.ecjx = true;
						uni.switchTab({
							url: '../index/index'
						})
					} else {
						getApp().globalData.ecjx = false;
						uni.switchTab({
							url: '../mybag/mybag'
						})
					}
				}
			},
			toRule() {
				uni.navigateTo({
					url: '../rule/webview?provinceCode=' + getApp().globalData.provinceCode
				})
			},
			tx() { //提现接口
				uni.showLoading({
					title: '提现中'
				})
				uni.request({
					url: this.$Store.state.requestUrl + '/gifts/getGiftspack',
					method: 'POST',
					data: {
						"openid": getApp().globalData.openid,
						"hbopenid": getApp().globalData.hbopenid,
						"phoneNumber": this.$Store.state.haveTel,
						"headimgurl": this.$Store.state.hasUserInfo ? this.$Store.state.userInfo.avatarUrl : '',
						"nickname": this.$Store.state.hasUserInfo ? this.$Store.state.userInfo.nickName : '',
						"sex": this.$Store.state.hasUserInfo ? this.$Store.state.userInfo.gender : '', //1男
						"projectServerName": this.$Store.state.serverName
					}
				}).then(res => {
					uni.hideLoading();
					let [e, r] = res;
					console.log('提现', res);
					if (r) {
						if (r.data.result.code == 0) {
							if (r.data.result.businessCode == 0) {
								this.txMoney = r.data.reply.withdrawMoney;
								this.reply.totalAccountMoney = this.reply.totalAccountMoney - this.txMoney;
								this.queryAttention(); //查询关注
							} else if (r.data.result.businessCode == 1) {
								uni.showModal({
									title: '提现提示',
									content: '您的红包金额不足，再喝几瓶攒够1元发红包！',
									showCancel: false
								});
							} else if (r.data.result.businessCode == 2) {
								uni.showModal({
									title: '提现提示',
									content: '系统开了个小差',
									showCancel: false
								});
							} else if (r.data.result.businessCode == 3) {
								uni.showModal({
									title: '提现提示',
									content: '根据国家法规对支付服务实名制的要求，请到微信中进行实名认证\n实名认证方法：进入【微信】->【我】->【钱包】->【···】->【支付管理】，即可实名认证。',
									showCancel: false
								});
							} else if (r.data.result.businessCode == 4) {
								uni.showModal({
									title: '提现提示',
									content: '提现处理中，请稍后查看详细记录',
									showCancel: false
								});
							} else if (r.data.result.businessCode == -2) {
								uni.showModal({
									title: '提现提示',
									content: '操作频繁，稍作歇息',
									showCancel: false
								});
							} else if (r.data.result.businessCode == -1) {
								uni.showModal({
									title: '提现提示',
									content: '系统升级中，稍后再试',
									showCancel: false
								});
							} else {
								uni.showModal({
									title: '提现接口提示',
									content: r.data.result.msg ? r.data.result.msg : '系统开了个小差，请稍后再试~',
									showCancel: false
								})
							}
						} else {
							uni.showModal({
								title: '提现接口提示',
								content: '系统开了个小差~',
								showCancel: false
							})
						}
					} else {
						console.log(e)
						uni.showModal({
							title: '提现接口提示',
							content: '系统繁忙',
							showCancel: false
						})
					}
				})
			},
			queryAttention() {
				uni.request({
					url: this.$Store.state.wxUrl + '/wx3/uinfo2?openid=' + getApp().globalData.openid + '&appid=' + this.$Store.state
						.appid,
					method: 'GET',
					complete: (res) => {
						console.log('关注', res)
						if (res.data.subscribe == 1) { //已关注
							if (this.isEcjx) {
								getApp().globalData.txSuc = true;
								getApp().globalData.ecjx = true;
								uni.switchTab({
									url: '../index/index'
								})
							} else {
								getApp().globalData.ecjx = false;
								this.txSuc = true;
							}
						} else { //未关注
							if (this.isEcjx) {
								getApp().globalData.txSuc = false;
								getApp().globalData.needAttention = true;
								getApp().globalData.ecjx = true;
								uni.switchTab({
									url: '../index/index'
								})
							} else {
								getApp().globalData.needAttention = false;
								getApp().globalData.ecjx = false;
								this.txAttention = true;
							}
						}
					}
				})
			},
			sweep() { //华南海南等扫码不占码专用
				uni.showLoading({
					title: '加载中',
					mask: true
				})
				uni.request({
					url: this.$Store.state.requestUrl + '/sweep/sweepQrcode',
					method: 'POST',
					data: {
						"openid": getApp().globalData.openid,
						"vjifenOpenid": getApp().globalData.vjfOpenid,
						"paOpenid": '', //省区小程序openid
						"appletOpenid": getApp().globalData.xcxOpenid, //通用小程序openid
						"sweepstr": getApp().globalData.qr,
						"longitude": getApp().globalData.longitude ? getApp().globalData.longitude : '00', //"经度"
						"latitude": getApp().globalData.latitude ? getApp().globalData.latitude : '00', //"纬度"
						"headimgurl": this.$Store.state.hasUserInfo ? this.$Store.state.userInfo.avatarUrl : '',
						"nickname": this.$Store.state.hasUserInfo ? this.$Store.state.userInfo.nickName : '',
						"sex": this.$Store.state.hasUserInfo ? this.$Store.state.userInfo.gender : '', //1男
						"projectServerName": this.$Store.state.serverName
					}
				}).then(res => {
					uni.hideLoading()
					console.log(res)
					let [e, r] = res;
					if (r) {
						if (r.data.result.code == 0) {
							getApp().globalData.reply = r.data.reply;
							getApp().globalData.result = r.data.result;
							getApp().globalData.replyTime = r.data.replyTime;
							this.isEcjx = r.data.reply.doubleSurpriseFlag == 1 ? true : false;
							this.reply = r.data.reply;
							this.$Store.state.haveTel = r.data.reply.phonenum; //全局缓存手机号
							setTimeout(() => {
								this.showLadder = r.data.reply.scanLadderFlag == 1 ? true : false; //是否有阶梯
								this.ladderIndex = r.data.reply.scanLadderNum ? Number(r.data.reply.scanLadderNum) : 0;
							}, 1000);
							if (this.reply.prizeType && this.reply.prizeType.indexOf('LX') != -1) { //是否中一元乐享
								this.isLx = true;
							}
							this.taoMemberOrderFlag=r.data.reply.taoMemberOrderFlag==1?true:false//是否如入会口令
							if (r.data.result.businessCode == 0) { //扫码成功 拆红包
								this.openAni();
							} else if (r.data.result.businessCode == 11) { //重复
								this.bizcode = 11;
							} else if (r.data.result.businessCode == 7 || r.data.result.businessCode == 21) { //大奖 
								uni.redirectTo({
									url: 'prize?bizcode=' + r.data.result.businessCode
								});
							} else if (r.data.result.businessCode == 12 || r.data.result.businessCode == 13) { //可疑 黑名单
								uni.redirectTo({
									url: 'getMsg?bizcode=' + r.data.result.businessCode
								});
							} else if (r.data.result.businessCode == 30) { //核销
								uni.redirectTo({
									url: 'verification'
								});
							} else if (r.data.result.businessCode == 24) { //一元乐享
								uni.redirectTo({
									url: '../yylx/yylx'
								});
							} else { //其他异常
								uni.redirectTo({
									url: 'fail?bizcode=' + r.data.result.businessCode
								});
							}
						} else {
							uni.showModal({
								title: '扫码接口提示',
								content: '系统开了个小差',
								showCancel: false,
								complete: res => {
									if (res.confirm) {
										uni.switchTab({
											url: '../index/index'
										})
									}
								}
							})
						}
					} else {
						uni.showModal({
							title: '扫码接口提示',
							content: '系统繁忙',
							showCancel: false,
							complete: res => {
								if (res.confirm) {
									uni.switchTab({
										url: '../index/index'
									})
								}
							}
						})
					}
				})
			}
		},
		components: {
			ladder_page
		}
	}
</script>

<style lang="scss">
	// 阶梯
	.ladder_page {
		width: 100%;
		height: 100%;
		position: absolute;
		z-index: 100;
	}

	.template_1 {
		background: url($bgUrl+'/bg_2.png?v=2') no-repeat center;
		background-size: cover;

		.logo {
			z-index: 10;
		}

		.cover {
			width: 100%;
			height: 100%;
			overflow: hidden;
			position: absolute;
			top: 0;
			left: 0;
			z-index: 2;
			background: url($bgUrl+'/index_bg_2.png?v=5') no-repeat center;
			background-size: cover;

			.bdd {
				position: absolute;
				width: 235rpx;
				right: 40rpx;
				top: 100rpx;
				// width: 705rpx;最终数据
				// right: 0;
				// top: 260rpx;
			}

			.slogan {
				width: 530rpx;
				margin: 860rpx auto 0;
				display: block;
			}

			.open {
				width: 492rpx;
				height: 144rpx;
				position: absolute;
				top: 1079rpx;
				left: 50%;
				margin-left: -246rpx;
				background: url($bgUrl+'/button_open.png') no-repeat center;
				background-size: 100% auto;
				line-height: 176rpx;
				text-indent: 140rpx;
				animation: open 2s linear both infinite;
			}

			@keyframes open {

				0%,
				50%,
				100% {
					transform: rotate(0)
				}

				6%,
				32% {
					transform: rotate(10deg)
				}

				19%,
				44% {
					transform: rotate(-10deg)
				}
			}
		}

		.cash {
			width: 100%;
			height: 100%;
			overflow: hidden;
			position: absolute;
			top: 0;
			left: 0;

			.rule {
				position: absolute;
				right: 0;
				top: 310rpx;
				width: 110rpx;
				z-index: 1;
			}

			.toSend {
				width: 169rpx;
				position: absolute;
				top: 130rpx;
				right: 40rpx;
				animation: tosend .8s linear both infinite;
			}

			@keyframes tosend {

				20%,
				60% {
					transform: rotate(-5deg);
				}

				40%,
				80% {
					transform: rotate(5deg);
				}

				0%,
				10%,
				90%,
				100% {
					transform: rotate(0deg);
				}
			}

			.money_box {
				margin: 315rpx auto 220rpx;
				height: 589rpx;
				background: url($bgUrl+'/cash_bg.png?v=1') no-repeat center;
				background-size: auto 100%;
				overflow: hidden;
				text-align: center;
				position: relative;

				.title {
					line-height: 88rpx;
					color: #FFFFFF;
					margin-top: 45rpx;
					font-size: 40rpx;
					position: relative;
					z-index: 2;
				}

				.money {
					font-size: 48rpx;
					color: #FFFFFF;
					position: relative;
					z-index: 2;
					opacity: 0;

					text {
						font-size: 105rpx;
					}

					text.zeroTips {
						font-size: 32rpx;
					}
				}

				.cash_cover {
					position: absolute;
					width: 549rpx;
					top: 0;
					left: 50%;
					transform: translateX(-50%);
					z-index: 1;
				}

				.coin {
					position: absolute;
					// width: 552rpx;
					width: 460rpx;
					top: 240rpx;
					left: 50%;
					margin-left: -230rpx;
				}
			}

			.tips {
				font-size: 20rpx;
				color: #FFFFFF;
				line-height: 26rpx;
				display: block;
				text-align: center;
				margin-top: 15rpx;
			}
		}

		//重复扫码
		.repcash {
			background: url($bgUrl+'/bg_2.png?v=2') no-repeat center;
			background-size: cover;
			text-align: center;
			color: #FFFFFF;
			position: absolute;
			z-index: 5;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;

			.rule {
				position: absolute;
				right: 0;
				top: 310rpx;
				width: 110rpx;
				z-index: 1;
			}

			.tips_1 {
				display: block;
				margin-top: 468rpx;
				line-height: 100rpx;
				font-size: 60rpx;
			}

			.tips_2 {
				font-size: 28rpx;
				line-height: 42rpx;
				padding: 0 110rpx;
				display: block;
			}

			.btn_com {
				position: absolute;
				top: 1120rpx;
				transform: translateX(-50%);
				left: 50%;
			}

			.tips {
				font-size: 20rpx;
				color: #FFFFFF;
				line-height: 26rpx;
				position: absolute;
				top: 1235rpx;
				display: block;
				width: 100%;
			}
		}

		// 再次授权
		.authAgain {
			z-index: 10;

			.authTip {
				width: 528rpx;
				height: 650rpx;
				background: url($bgUrl+'/auth_again.png') no-repeat center;
				background-size: 100%;
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				align-items: center;
				text-align: center;

				.close {
					align-self: flex-end;
					width: 45rpx;
					margin-right: 30rpx;
					margin-top: -5rpx;
				}

				text {
					margin-top: -120rpx;
					font-size: 36rpx;
					color: #e30000;
					font-weight: bold;
				}

				.btn_com {
					width: 330rpx;
					height: 76rpx;
					line-height: 66rpx;
					margin-bottom: 50rpx;
				}
			}
		}

		// 提现结果
		.tx_tips {
			z-index: 10;

			view {
				overflow: hidden;
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				text-align: center;
			}

			image {
				width: 597rpx;
				display: block;
			}

			text {
				font-size: 28rpx;
				color: #FFFFFF;
				position: absolute;
				top: 40rpx;
				width: 590rpx;
				transform: translateX(-50%);
				left: 50%;
				line-height: 43rpx;
			}
		}

		// 提现成功提示关注
		.tx_attention {
			z-index: 10;

			>view {
				width: 100%;
				// height: 1094rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				flex-direction: column;
				position: absolute;
				top: 52%;
				transform: translateY(-50%);
				text-align: center;

				image {
					width: 623rpx;
				}

				button {
					margin-top: 39rpx;
				}

				text.res_tips {
					font-size: 30rpx;
					color: #FFFFFF;
					display: block;
					line-height: 43rpx;
					margin-bottom: 35rpx;
				}

				view.zgh_tips {
					font-size: 27rpx;
					color: #000;
					font-weight: bold;
					position: absolute;
					top: 80rpx;
					width: 623rpx;
					transform: translateX(-50%);
					left: 50%;
					line-height: 85rpx;
					color: #FFFFFF;

					text {
						color: #FFCA00;
					}
				}
			}
		}
	}
	// 前置广告弹窗
	.active{
		width: 100%;
		height: 100%;
		background-color: rgba($color: #000000, $alpha: .8);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 100;
		.activeImg{
			width: 80%;
			display: block;
		}
		.activeClose{
			width: 70rpx;
			display: block;
			margin-top: 30rpx;
		}
	}
	// 淘彩蛋
	.egg{
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 10;
		background-color: rgba($color: #000000, $alpha: 0.8);
		.eggClose{
			position: absolute;
			width: 58rpx;
			top: 299rpx;
			right: 92rpx;
			z-index: 1;
		}
		.eggImg{
			position: absolute;
			width: 630rpx;
			top: 290rpx;
			left: 50%;
			transform: translateX(-50%);
		}
		.eggImg,.order{
			width: 658rpx;
		}
		.copy{
			position: absolute;
			top: 692rpx;
			width: 330rpx;
			left: 50%;
			margin-left: -165rpx;
			animation: open 2s linear both infinite;
		}
	}
</style>
