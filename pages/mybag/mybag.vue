<template>
	<view class="content">
		<view class="template_1">
			<view class="template">
				<image :src="imgUrl+'/logo.png'" mode="widthFix" class="logo"></image>
				<image :src="imgUrl+'/icon_privacy.png'" mode="widthFix" class="privacy" @click="toPrivacy"></image>
				<!-- <image :src="imgUrl+'/yylx/icon_yylx.png'" mode="widthFix" class="yylx" @click="toLx"></image> -->
				<view class="mybag">
					<text class="title">共喝青岛啤酒</text>
					<view class="num_box">
						<text>{{total}}</text>瓶
					</view>
					<view class="money_box">
						<text>账户余额：\n已领红包：</text>
						<text>{{totalMoney}} 元\n{{giftsMoney}} 元</text>
					</view>
					<button :class="['btn_com','tx',totalMoney<1?'isDisabled':'']" open-type="getPhoneNumber" @getphonenumber="getPhoneNum"
					 v-if="!haveTel&&totalMoney>=1">立即提现</button>
					<button :class="['btn_com','tx',totalMoney<1?'isDisabled':'']" v-else @click="giveSpack()">立即提现</button>
					<button class="details" @click="toDetails">扫码奖项</button>
					<button class="strcode" @click="toStrcode">串码领奖</button>
				</view>
				<text class="tips">红包累计大于等于1元后可提现\n不足1元的红包将存入零钱包</text>
			</view>
			<!-- 再次授权 -->
			<view class="authAgain mask" v-show="authAgain">
				<view class="authTip">
					<image :src="imgUrl+'/icon_close.png'" mode="widthFix" class="close" @click="authAgain=false"></image>
					<text>亲，真的要放弃\n与红包亲密接触的机会嘛</text>
					<button class="btn_com" open-type="getPhoneNumber" @getphonenumber="getPhoneNum">再 次 授 权</button>
				</view>
			</view>
			<!-- 提现成功通知 -->
			<view class="tx_tips mask" v-show="txSuc">
				<view>
					<text>亲，您已将账户余额中的{{txMoney}}元进行了提现\n看到消息后72小时内要点开收钱呦！</text>
					<image :src="imgUrl+'/tx_tip.png'" mode="widthFix" @click="txSuc=false"></image>
				</view>
			</view>
			<!-- 提现成功通知 -->
			<view class="tx_attention mask" v-show="txAttention">
				<view>
					<text class="res_tips">已将账户余额中的{{txMoney}}元提现成功!</text>
					<view class="zgh_tips">关注<text>“{{gzhName}}”</text>公众号获取更多活动信息</view>
					<image :src="imgUrl+'/attention.png?v=1'" mode="widthFix" @click="txAttention=false"></image>
					<button class="btn_com" open-type="contact" send-message-title="青岛啤酒小程序" :send-message-path="sharePath"
					 :send-message-img="shareImg" show-message-card="true">关注公众号</button>
				</view>
			</view>
			<!-- 隐私政策 -->
			<view class="privacy_alert mask" v-show="showPrivacy">
				<view class="privacy_box">
					<view class="border">
						<image :src="imgUrl+'/wxts.png'" mode="widthFix" class="tips_tittle"></image>
						<view class="privacy_content">为了方便您了解和使用本小程序，我们制定了《青岛啤酒隐私政策》在使用本小程序时，我们需要您授权自己的个人信息，以便我们更好的服务于您。如有任何疑问请与我们联系。</view>
						<view class="privacy_tips">注：我已满18周岁，并同意<text @click="toPrivacy">《青岛啤酒隐私政策》</text>
						</view>
						<button class="btn_com" @click="readPrivacy">我已了解</button>
					</view>
					<image :src="imgUrl+'/tips_bottom.png'" mode="widthFix" class="tips_bottom"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgUrl: getApp().globalData.imgUrl,
				provinceCode: getApp().globalData.provinceCode,
				totalMoney: 0, //余额
				total: 0,
				giftsMoney: 0, //已领
				haveTel: this.$Store.state.haveTel,
				txSuc: false,
				txAttention: false,
				txMoney: 0,
				isOnLoad: false,
				needTx: false,
				showPrivacy: false,
				sharePath: '',
				shareImg: 'https://xcxsite.vjifen.com/v/static/qp2020/share.png',
				authAgain: false,
				gzhName: this.$Store.state.gzhName ? this.$Store.state.gzhName : '',
			}
		},
		onLoad(options) {
			console.log(options)
			if (options.provinceCode) { //带有省区参数，必定要校验是否变更
				this.provinceCode = options.provinceCode;
				getApp().globalData.provinceCode = options.provinceCode;
				this.$Store.commit('setProjectSign', options.provinceCode);
				this.sharePath = 'pages/mybag/mybag?provinceCode=' + this.provinceCode;
				console.log(this.$Store.state.requestUrl, this.$Store.state.appid, this.$Store.state.payAppid);
				this.gzhName = this.$Store.state.gzhName;
				this.isOnLoad = true;
			}
		},
		onShow() {
			uni.getStorage({
				key: 'readPrivacy'
			}).then(res => {
				console.log('readPrivacy',res)
				let [e, r] = res;
				if (!r) {
					this.showPrivacy = true;
				}
			})
			if (this.isOnLoad) {
				this.checkProvinceCode().then(res => {
					console.log('省区关系是否变更', res)
					if (!res) { //清除缓存中各种id
						getApp().globalData.openid = '';
						getApp().globalData.hbopenid = '';
						try {
							uni.removeStorageSync('openid');
							uni.removeStorageSync('hbopenid');
						} catch (e) {
							// error
						}
					}
					this.init();
				})
			} else {
				this.init();
			}
			if (this.needTx) {
				this.needTx = false;
				this.giveSpack()
			}
		},
		methods: {
			readPrivacy() {
				this.showPrivacy = false;
				uni.setStorage({
					key: 'readPrivacy',
					data: true,
					complete: (res) => {
						console.log('setReadPrivacy',res)
					}
				})
			},
			init() {
				if (!getApp().globalData.openid && this.provinceCode) { //是否有openid
					this.sharePath = 'pages/mybag/mybag?provinceCode=' + this.provinceCode;
					this.$Store.dispatch('getOpenid').then(res => {
						let [e, r] = res;
						if (r) { //有openid
							uni.showLoading({
								title: '加载中'
							})
							getApp().globalData.openid = r.data.openid;
							this.queryAllGiftsList();
						} else { //重新获取
							console.log(e)
							uni.navigateTo({
								url: '../tool/getOpenid/getOpenid?type=openid'
							})
						}
					})
				} else if (getApp().globalData.openid) {
					this.sharePath = 'pages/mybag/mybag?provinceCode=' + this.provinceCode;
					uni.showLoading({
						title: '加载中'
					})
					this.queryAllGiftsList();
				} else if (!this.provinceCode) { //没有省区关系时只能依赖已经缓存的省区关系，此时不做校验
					this.getProvinceCode().then(res => {
						if(!res||res==undefined||res=='undefined'){//没有已缓存的数据时不往下进行
							return false;
						}
						this.provinceCode = res;
						getApp().globalData.provinceCode = res;
						uni.setStorage({ //每次都要存一下？
							key: 'provinceCode',
							data: this.provinceCode
						})
						this.sharePath = 'pages/mybag/mybag?provinceCode=' + this.provinceCode;
						this.$Store.commit('setProjectSign', res);
						this.gzhName = this.$Store.state.gzhName;
						this.$Store.dispatch('getOpenid').then(res => {
							let [e, r] = res;
							if (r) { //有openid
								uni.showLoading({
									title: '加载中'
								})
								getApp().globalData.openid = r.data.openid;
								this.queryAllGiftsList();
							} else { //重新获取
								console.log(e)
								uni.navigateTo({
									url: '../tool/getOpenid/getOpenid?type=openid'
								})
							}
						})
					})
				}
			},
			toStrcode() {
				console.log(this.provinceCode)
				uni.navigateTo({
					url: '../scan/strcode?provinceCode=' + this.provinceCode
				})
			},
			toDetails() {
				uni.navigateTo({
					url: './details'
				})
			},
			toPrivacy() {
				uni.navigateTo({
					url: '../rule/privacy'
				})
			},
			toLx(){
				console.log(this.$Store.state.vjfAppid)
				uni.navigateTo({
					url:'../yylx/hgList'
				})
			},
			async getProvinceCode() {
				let xcxOpenid = {};
				if (!getApp().globalData.xcxOpenid) {
					xcxOpenid = await this.$Store.dispatch('getXcxOpenid');
					getApp().globalData.xcxOpenid = xcxOpenid.openid;
					getApp().globalData.sessionKey = xcxOpenid.session_key;
					uni.setStorage({
						key: 'xcxOpenid',
						data: xcxOpenid
					});
				}
				let provinceCode = await this.$Store.dispatch('getProvinceCode', getApp().globalData.xcxOpenid);
				console.log(provinceCode)
				return provinceCode;
			},
			async checkProvinceCode() { //校验是否有省区编号且是否变更
				let xcxOpenid = {};
				if (!getApp().globalData.xcxOpenid) {
					xcxOpenid = await this.$Store.dispatch('getXcxOpenid');
					getApp().globalData.xcxOpenid = xcxOpenid.openid;
					getApp().globalData.sessionKey = xcxOpenid.session_key;
					uni.setStorage({
						key: 'xcxOpenid',
						data: xcxOpenid
					});
				}
				let provinceCode = await this.$Store.dispatch('getProvinceCode', getApp().globalData.xcxOpenid);
				console.log(provinceCode)
				if (provinceCode != this.provinceCode && this.provinceCode != undefined) { //存储省区code
					uni.request({
						url: `${this.$Store.state.isOnline?this.$Store.state.online.sgUrl:this.$Store.state.test.sgUrl}/api/queryProvinceCode`,
						method: 'GET',
						data: {
							xcxopenid: xcxOpenid.openid,
							provinceCode: this.provinceCode
						},
						complete: res => {
							console.log('redis', res)
						}
					})
					uni.setStorage({ //每次都要存一下？
						key: 'provinceCode',
						data: this.provinceCode
					})
					return false
				} else { //保持不变 不需要重新获取openid
					uni.setStorage({ //每次都要存一下？
						key: 'provinceCode',
						data: this.provinceCode
					})
					return true
				}

			},
			async getOpenid() {
				let xcxOpenid = await this.$Store.dispatch('getXcxOpenid');
				uni.setStorage({
					key: 'xcxOpenid',
					data: xcxOpenid
				})
				return xcxOpenid;
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
						"projectServerName":this.$Store.state.serverName
					}
				}).then(res => {
					uni.hideLoading();
					let [e, r] = res;
					console.log('提现',res);
					if (r) {
						if (r.data.result.code == 0) {
							if (r.data.result.businessCode == 0) {
								this.txMoney = r.data.reply.withdrawMoney;
								this.queryAllGiftsList();
								this.queryAttention();
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
			queryAllGiftsList() {
				uni.showLoading({
					title: '加载中'
				})
				uni.request({
					url: this.$Store.state.requestUrl + '/gifts/queryAllGiftsList',
					method: 'POST',
					data: {
						"openid": getApp().globalData.openid,
						// "searchFlag": 3,
						"currentPage": 1,
						"count": 10,
						"projectServerName":this.$Store.state.serverName
					}
				}).then(res => {
					uni.hideLoading()
					let [e, r] = res;
					if (r) {
						this.totalMoney = r.data.reply.totalMoney;
						this.total = r.data.reply.total; //累计瓶数
						this.giftsMoney = r.data.reply.giftsMoney; //已领
						this.$Store.state.haveTel = r.data.reply.phonenum;
						this.haveTel = r.data.reply.phonenum;
					} else {
						console.log(e);
						uni.showModal({
							title: '扫码记录提示',
							content: '系统繁忙',
							showCancel: false
						})
					}
				}).catch(err => {
					uni.hideLoading();
					console.log(err)
				})
			},
			getPhoneNum(e) { //没有手机号且大于1元需获取手机号
				if (e.detail.errMsg.indexOf('ok') == -1) { //拒绝授权
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
									icon:'none',
									title:'获取失败请重试'
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
							// console.log(r.data.data.decryptData.phoneNumber)
							this.$Store.state.haveTel = r.data.data.decryptData.phoneNumber;
							this.giveSpack()
						} else { //获取手机号的其他异常其他异常
							console.log(e)
						}
					}).catch(err => {
						console.log(err)
					})
				}
			},
			giveSpack(appid) {
				if (this.totalMoney >= 1) { //提现接口
					if (getApp().globalData.hbopenid) { //有红包openid直接调用提现接口
						this.tx()
					} else {
						this.$Store.dispatch('getHbOpenid', appid).then(res => { //本地缓存中是否有hbopenid
							console.log(res)
							let [e, r] = res;
							if (r) { //有hbopenid
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

				}
			},
			queryAttention() {
				uni.request({
					url: this.$Store.state.wxUrl + '/wx3/uinfo2?openid=' + getApp().globalData.openid + '&appid=' + this.$Store.state
						.appid,
					method: 'GET',
					complete: (res) => {
						console.log('关注', res)
						if (res.data.subscribe == 1) { //已关注
							this.txSuc = true;
						} else { //未关注
							this.txAttention = true;
						}
					}
				})
			}
		},
		components:{
		}
	}
</script>

<style lang="scss">
	// 阶梯
	.ladder_page{
		width: 100%;
		height: 100%;
		position: absolute;
		z-index: 100;
	}
	.template_1 {
		background: url($bgUrl+'/index_bg.png?v=5') no-repeat center;
		background-size: cover;
		.logo {
			z-index: 5;
		}

		.template{
			height: 1234rpx;
		}
		.privacy {
			position: absolute;
			right: 0;
			top: 510rpx;
			width: 110rpx;
			z-index: 1;
		}
		
		.yylx{
			width: 185rpx;
			position: absolute;
			right: 10rpx;
			bottom: 50rpx;
		}
		
		.mybag {
			display: block;
			margin: 390rpx auto 0;
			background: url($bgUrl+'/mybag_bg.png') no-repeat center;
			background-size: auto 100%;
			height: 657rpx;
			width: 100%;
			overflow: hidden;
			text-align: center;
			padding-top: 50rpx;
			box-sizing: border-box;
			color: #b36321;
			
			.title {
				font-size: 32rpx;
			}

			.num_box {
				font-size: 30rpx;

				text {
					font-size: 90rpx;
					line-height: 80rpx;
				}
			}

			.money_box {
				font-size: 24rpx;
				display: flex;
				justify-content: center;
				height: 96rpx;
				align-items: center;
				line-height: 33rpx;

				text:nth-of-type(2) {
					text-align: right;
				}
			}

			.btn_com {
				font-size: 34rpx;
				width: 330rpx;
				height: 76rpx;
				margin-top: 20rpx;
				line-height: 70rpx;
			}

			.btn_com.isDisabled {
				background: url($bgUrl+"/btn_disabled.png") no-repeat center;
				background-size: 100%;
			}

			.details,
			.strcode {
				font-size: 30rpx;
				width: 180rpx;
				height: 56rpx;
				background: url($bgUrl+'/btn_red_s.png') no-repeat center;
				background-size: 100%;
				display: block;
				color: #FFFFFF;
				line-height: 45rpx;
				text-align: center;
			}

			.details {
				margin-top: 88rpx;
			}

			.strcode {
				margin-top: 47rpx;
			}
		}

		.tips {
			display: block;
			color: #FFFFFF;
			text-align: center;
			font-size: 24rpx;
			line-height: 30rpx;
			margin-top: 10rpx;
		}

		// 隐私政策
		.privacy_alert {
			z-index: 99;
		}

		.privacy_box {
			width: 656rpx;
			border-radius: 8rpx;
			padding: 24rpx;
			box-sizing: border-box;
			overflow: hidden;
			background: linear-gradient(top, #009040, #005e2a);
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);

			.border {
				border-radius: 8rpx;
				padding: 0 27rpx;
				background: #FFFFFF;
				overflow: hidden;
				width: 100%;
				box-sizing: border-box;

				.tips_tittle {
					width: 236rpx;
					display: block;
					margin: 80rpx auto 0;
				}

				.privacy_content {
					font-size: 36rpx;
					color: #000;
					text-indent: 60rpx;
					margin: 60rpx auto 0;
					text-align: justify;
				}

				.privacy_tips {
					font-size: 28rpx;
					margin: 100rpx auto 20rpx;

					text {
						font-size: 32rpx;
						color: #f16235;
					}
				}

				.btn_com {
					width: 328rpx;
					height: 78rpx;
					line-height: 66rpx;
					position: relative;
					z-index: 1;
					margin: 90rpx auto 43rpx;
					font-size: 32rpx;
				}
			}

			.tips_bottom {
				width: 100%;
				display: block;
				position: absolute;
				bottom: 0;
				left: 0;
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
					text{
						color: #FFCA00;
					}
				}
			}
		}
	}
</style>
