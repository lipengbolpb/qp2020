<template>
	<view class="content">
		<view class="template_1">
			<go-back :style="{'top':safeAreaTop}"></go-back>
			<view class="tip_box">
				<view class="tip_content">
					<text v-if="first" class="first">青岛啤酒\n码上领</text>
					<block v-else>
						<text>{{tipsText1}}</text>
						<text>{{tipsText2}}</text>
					</block>
				</view>
			</view>
			<view class="inputs">
				<view class="strcode_box">
					<input type="text" id="strcode" value="" placeholder="输入12位字母数字瓶盖码" @input="inputStr" maxlength="12" :disabled="tooMany" />
				</view>
				<block v-if="needVerifyCode">
					<view class="tel_box">
						<input type="number" id="tel" value="" placeholder="输入手机号" @input="inputTel" maxlength="11" :disabled="tooMany" />
					</view>
					<view class="yzcode_box">
						<input type="number" value="" placeholder="输入验证码" @input="inputYzcode" maxlength="4" :disabled="tooMany" />
						<text @click="getVerifyCode">{{sec==0?'获取验证码':sec+'秒后再次获取'}}</text>
					</view>
				</block>
			</view>
			<text class="tips">温馨提示：先输入瓶盖二维码上方6位字符，再输入瓶盖二维码下方6位字符，输入完成后点击“领取红包”按钮</text>
			<button @click="submsg" class="submsg btn_com">领取红包</button>
			<view class="opensetting" v-if="needLocation&&!againCLick">
				<view class="head">
					<image :src="imgUrl+'/xcxhead.png?v=1'" class="headimg"></image>
					<text>扫码乐享青啤好礼</text> <text>申请</text>
					<image :src="imgUrl+'/icon_close_1.png'" class="close" @click="cancel"></image>
				</view>
				<view class="loc_content">
					<text>获取您的地理位置信息</text>
					<text>获取地理位置可以给你提供更好的服务</text>
				</view>
				<button @click="openset" class="set">进行授权</button>
			</view>
			<view class="location_fail" v-if="noLocation">
				<image :src="imgUrl+'/location_fail.png'" mode="widthFix" @click="closeTip"></image>
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
	import goBack from '@/components/back.vue';
	export default {
		data() {
			return {
				needLocation: false,
				againCLick: false,
				noLocation: false,
				imgUrl: getApp().globalData.imgUrl,
				latitude: '00', //纬度
				longitude: '00',
				sec: 0,
				stop: false,
				tel: '',
				yzcode: '',
				strcode: '',
				tipsText1: '',
				tipsText2: '',
				tooMany: false,
				needVerifyCode: false,
				first: true,
				provinceCode: '',
				isOnLoad: false,
				showPrivacy: false,
				safeAreaTop:getApp().globalData.safeAreaTop?getApp().globalData.safeAreaTop+'px':'64rpx'
			};
		},
		onLoad(options) {
			if(options.provinceCode&&options.provinceCode!='undefined'){
				this.provinceCode = options.provinceCode;
				console.log(this.provinceCode)
				this.$Store.commit('setProjectSign', this.provinceCode);
				console.log(this.$Store.state.requestUrl, this.$Store.state.appid, this.$Store.state.payAppid);
				this.isOnLoad = true;
			}
		},
		onShow() {
			if (!this.isOnLoad) {
				return false;
			}
			if(!getApp().globalData.vjfOpenid){
				this.$Store.dispatch('getVjfOpenid').then(res=>{
					let [e,r] = res;
					if(r){
						getApp().globalData.vjfOpenid = r.data.vjfOpenid;
					}else{
						console.log(e)
						uni.navigateTo({
							url: '../tool/getOpenid/getOpenid?type=vjfOpenid'
						})
					}
				})
			}
			this.checkProvinceCode().then(res => { //必定带有省区参数，必须校验
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
				if (!getApp().globalData.openid) { //是否有openid
					this.$Store.dispatch('getOpenid').then(res => {
						let [e, r] = res;
						if (r) { //有openid
							getApp().globalData.openid = r.data.openid;
							// 查询错误次数
							this.init()
						} else { //重新获取
							console.log(e)
							uni.navigateTo({
								url: '../tool/getOpenid/getOpenid?type=openid'
							})
						}
					})
				} else {
					console.log(getApp().globalData.openid)
					// 查询错误次数
					this.init()
				}
			})
			uni.getStorage({
				key: 'readPrivacy'
			}).then(res => {
				let [e, r] = res;
				if (!r) {
					this.showPrivacy = true;
				}
			})
			
			if (this.latitude == '00') {
				this.$Store.dispatch('getLocation').then(res => {
					let [e, r] = res;
					if (r) { //缓存下坐标
						console.log(r)
						this.latitude = r.latitude;
						this.longitude = r.longitude;
						getApp().globalData.latitude = r.latitude;
						getApp().globalData.longitude = r.longitude;
					} else {
						console.log(e)
						if (e.errMsg == 'getLocation:fail authorize no response' ||
							e.errMsg == 'getLocation:fail auth deny' ||
							e.errMsg == 'getLocation:fail:auth denied') {
							this.needLocation = true;
						} else {
							this.noLocation = true;
						}
					}
				})
			}
		},
		onReady() {

		},
		// onShareAppMessage() {
		// 	return {
		// 		title: '青岛啤酒乐享河北',
		// 		path: '/pages/index/index'
		// 	}
		// },
		onHide() {
			this.stop = true;
		},
		onUnload() {
			this.stop = true;
		},
		methods: {
			readPrivacy(){
				this.showPrivacy=false;
				uni.setStorage({
					key:'readPrivacy',
					data:true
				})
			},
			toPrivacy() {
				uni.navigateTo({
					url: '../rule/privacy'
				})
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
				let xcxOpenid = await this.$Store.dispatch('getXcxOpenid')
				uni.setStorage({
					key: 'xcxOpenid',
					data: xcxOpenid
				})
				return xcxOpenid
			},
			openset() {
				this.againCLick = true;
				uni.openSetting();
			},
			cancel() { //取消 直接调用扫码接口
				console.log('调接口')
				this.againCLick = true
			},
			closeTip() {
				uni.showModal({
					title: "温馨提示",
					content: '开启手机定位有机会获得更大的红包哦！确定不开启手机定位参与本次扫码活动吗？',
					cancelText: '先开定位',
					confirmColor: "#808080",
					confirmText: '直接参与',
					complete: res => {
						console.log(res)
						if (res.confirm) { //直接扫码
							this.noLocation = false;
						} else { //返回首页
							uni.switchTab({
								url: '../index/index'
							})
						}
					}
				})
			},
			timeout() {
				let timeouter = null;
				this.sec -= 1;
				clearTimeout(timeouter);
				if (this.sec <= 0 || this.stop) {
					return this.sec = 0;
				}
				timeouter = setTimeout(() => {
					this.timeout()
				}, 1000)
			},
			inputStr(e) {
				this.strcode = e.detail.value
			},
			inputTel(e) {
				this.tel = e.detail.value
			},
			inputYzcode(e) {
				this.yzcode = e.detail.value
			},
			submsg() { //提交信息
				if (this.tooMany) {
					return false;
				}
				if (this.strcode.length != 12) {
					uni.showModal({
						title: "提示",
						content: "请输入正确的串码",
						showCancel: false
					})
				} else if (!(/^1[0-9]{10}$/.test(this.tel)) && this.needVerifyCode) {
					uni.showModal({
						title: "提示",
						content: "请输入正确的手机号",
						showCancel: false
					})
				} else if (!(/^[0-9]{4}$/).test(this.yzcode) && this.needVerifyCode) {
					uni.showModal({
						title: "提示",
						content: "请输入正确的验证码",
						showCancel: false
					})
				} else { //调接口
					this.sweep()
				}
			},
			sweep() { //扫码接口
				uni.showLoading({
					title: '加载中',
					mask: true
				})
				uni.request({
					url: this.$Store.state.requestUrl + '/sweep/serialCode',
					method: 'POST',
					data: {
						"openid": getApp().globalData.openid,
						"vjifenOpenid":getApp().globalData.vjfOpenid,
						"paOpenid": getApp().globalData.xcxOpenid, //省区小程序openid
						"serialcode": this.strcode,
						"verifycode": this.yzcode,
						"phone": this.tel,
						"longitude": this.longitude,
						"latitude": this.latitude,
						"headimgurl": this.$Store.state.hasUserInfo ? this.$Store.state.userInfo.avatarUrl : '',
						"nickname": this.$Store.state.hasUserInfo ? this.$Store.state.userInfo.nickName : '',
						"sex": this.$Store.state.hasUserInfo ? this.$Store.state.userInfo.gender : '', //1男
						"projectServerName":this.$Store.state.serverName
					}
				}).then(res => {
					uni.hideLoading()
					let [e, r] = res;
					console.log(r)
					if (r) {
						if (r.data.result.code == 0) {
							this.$Store.state.total = false; //扫码后需要重新查询总瓶数
							getApp().globalData.replyTime = r.data.replyTime;
							this.first = false;
							getApp().globalData.reply = r.data.reply;
							getApp().globalData.result = r.data.result;
							if (r.data.reply && r.data.reply.phonenum) {
								this.$Store.state.haveTel = r.data.reply.phonenum; //全局缓存手机号
							}
							if (r.data.result.businessCode == 1) { //串码不存在
								this.tipsText1 = '您输入的串码不存在';
								this.tipsText2 = '请确认是否输入正确';
								uni.showModal({
									title: "提示",
									content: '串码不存在，请确认是否输入正确',
									showCancel: false
								})
							} else if (r.data.result.businessCode == 2) { //已被扫
								this.tipsText1 = '这个二维码已被扫';
								this.tipsText2 = '扫码时间：' + r.data.reply.earnTime;
								uni.showModal({
									title: "提示",
									content: '这个二维码已被扫',
									showCancel: false
								})
							} else if (r.data.result.businessCode == 3) { //已过期
								this.tipsText1 = '活动已过期';
								this.tipsText2 = '好酒不等人，下次来早点哟';
								uni.showModal({
									title: "提示",
									content: '活动已过期',
									showCancel: false
								})
							} else if (r.data.result.businessCode == 4) { //未开始
								this.tipsText1 = '活动未开始';
								this.tipsText2 = '心急喝不了好酒！再等等哦';
								uni.redirectTo({
									url: '../result/fail?bizcode=' + r.data.result.businessCode
								});
							} else if (r.data.result.businessCode == 5) { //已截止
								this.tipsText1 = '活动已截止';
								this.tipsText2 = '好酒不等人，下次来早点哟';
								uni.showModal({
									title: "提示",
									content: '活动已截止',
									showCancel: false
								})
							} else if (r.data.result.businessCode == 6) { //已被扫
								this.tipsText1 = '系统繁忙';
								this.tipsText2 = '稍等片刻，畅饮欢聚时刻';
								uni.showModal({
									title: "提示",
									content: '系统繁忙',
									showCancel: false
								})
							} else if (r.data.result.businessCode == -1) { //
								this.tipsText1 = '系统升级中';
								this.tipsText2 = '稍安勿躁，敬请关注';
								uni.showModal({
									title: "提示",
									content: '系统升级中',
									showCancel: false
								})
							} else if (r.data.result.businessCode == 8) { //需要验证码
								this.first = true;
								uni.showModal({
									title: "提示",
									content: '请输入验证码',
									showCancel: false
								})
								this.needVerifyCode = true;
							} else if (r.data.result.businessCode == 9) { //需要验证码
								this.first = true;
								uni.showModal({
									title: "提示",
									content: '您输入的验证码不正确，请重新输入！',
									showCancel: false
								})
								this.needVerifyCode = true;
							} else if (r.data.result.businessCode == 10) { //错误次数太多
								uni.showModal({
									title: "提示",
									content: '您输入错误的次数太多了，明天再来试试吧！',
									showCancel: false
								})
								this.tooMany = true;
								this.tipsText1 = '您输入的次数太多了';
								this.tipsText2 = '明天再来试试吧';
								this.needVerifyCode = false;
							} if (r.data.result.businessCode == 0 || r.data.result.businessCode == 11) { //扫码成功
								getApp().globalData.isFromStrcode = true;
								uni.redirectTo({
									url: '../result/getcash?bizcode=' + r.data.result.businessCode
								});
							} else if (r.data.result.businessCode == 7 || r.data.result.businessCode == 21) { //大奖 
								uni.redirectTo({
									url: '../result/prize?bizcode=' + r.data.result.businessCode
								});
							} else if (r.data.result.businessCode == 12 || r.data.result.businessCode == 13) { //可疑 黑名单
								getApp().globalData.qrcode = encodeURIComponent('vj1.tv/'+this.provinceCode+'/'+this.strcode);
								uni.redirectTo({
									url: '../result/getMsg?bizcode=' + r.data.result.businessCode
								});
							} else if (r.data.result.businessCode == 30) { //核销
								uni.redirectTo({
									url: '../result/verification'
								});
							} else if (r.data.result.businessCode == 24) { //一元乐享
								uni.redirectTo({
									url: '../yylx/yylx'
								});
							} else { //所有异常
								uni.redirectTo({
									url: '../result/fail?bizcode=' + r.data.result.businessCode
								});
							}
						} else {
							uni.showModal({
								title: "串码提交提示",
								content: r.data.result.msg ? r.data.result.msg : '系统开了个小差',
								showCancel: false
							})
						}
					} else {
						uni.showModal({
							title: "串码提交提示",
							content: '系统繁忙',
							showCancel: false
						})
					}
				})
			},
			init() { //查询错误次数
				uni.request({
					url: this.$Store.state.requestUrl + '/sweep/getFailCount',
					method: 'POST',
					data: {
						openid: getApp().globalData.openid,
						"projectServerName":this.$Store.state.serverName
					}
				}).then(res => {
					let [e, r] = res;
					console.log(r)
					if (r) {
						if (r.data.result.code == 0 && r.data.result.businessCode == 0) { //不需要验证码

						} else if (r.data.result.code == 0 && r.data.result.businessCode == 2) { //需要验证码
							this.needVerifyCode = true;
						} else if (r.data.result.code == 0 && r.data.result.businessCode == 3) { //错误次数太多
							this.tooMany = true;
							this.first = false;
							this.tipsText1 = '您输入的次数太多了';
							this.tipsText2 = '明天再来试试吧';
						} else {
							uni.showModal({
								title: "提示",
								content: r.data.result.msg ? r.data.result.msg : '呜呜，系统开了个小差，请稍后重试！',
								showCancel: false
							})
						}
					} else {
						uni.showModal({
							title: "串码init提示",
							content: '系统繁忙',
							showCancel: false
						})
					}
				})
			},
			getVerifyCode() {
				if (this.tooMany || this.sec != 0) {
					return false;
				} else if (!(/^1[0-9]{10}$/.test(this.tel))) {
					uni.showModal({
						title: "提示",
						content: "请输入正确的手机号",
						showCancel: false
					})
				} else {
					uni.showLoading({
						title: '获取验证码',
						mask: true
					})
					uni.request({
						url: this.$Store.state.requestUrl + '/user/getCaptcha',
						method: 'POST',
						data: {
							phonenum: this.tel,
							sendtype: 1,
							"projectServerName":this.$Store.state.serverName
						}
					}).then(res => {
						uni.hideLoading()
						let [e, r] = res;
						if (r) {
							if (r.data.result.code == 0 && r.data.result.businessCode == 0) { //成功
								this.sec = 60;
								this.timeout(); //开始倒计时
							} else if (r.data.result.code == 0 && r.data.result.businessCode == 2) {
								uni.showModal({
									title: "提示",
									content: '您填写的手机号错误，发送验证码失败！',
									showCancel: false
								})
							} else {
								uni.showModal({
									title: "获取验证码提示",
									content: r.data.result.msg ? r.data.result.msg : '呜呜，系统开了个小差，请稍后重试！',
									showCancel: false
								})
							}
						} else {
							uni.showModal({
								title: "获取验证码提示",
								content: '系统繁忙',
								showCancel: false
							})
						}
					})
				}
			}
		},
		components: {
			goBack
		}

	}
</script>

<style lang="scss" scoped>
	.content {
		width: 100%;
		height: 100%;
		overflow: hidden;
		background: #FFFFFF;

		view.opensetting {
			width: 100%;
			height: 500rpx;
			background: #fff;
			position: absolute;
			bottom: 0;
			left: 0;
			overflow: hidden;
			background: #FFFFFF;
			z-index: 10;
			box-shadow: -2rpx 2rpx 10rpx #808080;
		}

		view.opensetting .head {
			height: 120rpx;
			line-height: 120rpx;
			display: flex;
			color: #333;
			position: relative;
		}

		view.opensetting .head image.headimg {
			width: 60rpx;
			height: 60rpx;
			border-radius: 50%;
			margin: 30rpx 0 30rpx 30rpx;
		}

		view.opensetting .head image.close {
			width: 40rpx;
			height: 40rpx;
			position: absolute;
			top: 40rpx;
			right: 40rpx;
		}

		view.opensetting .head text {
			padding: 0 20rpx;
		}

		view.opensetting .loc_content text:nth-of-type(1) {
			font-size: 40rpx;
			color: #000;
			font-weight: bold;
			padding: 30rpx;
		}

		view.opensetting .loc_content text:nth-of-type(2) {
			font-size: 30rpx;
			padding: 0 30rpx;
			color: #333;
			line-height: 80rpx;
			display: block;
		}

		view.opensetting>button {
			width: 400rpx;
			height: 85rpx;
			background: #04c05f;
			display: block;
			margin: 50rpx auto;
			border-radius: 10rpx;
			color: #fff;
			font-size: 32rpx;
		}

		view.location_fail {
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
			z-index: 1;
			background: rgba($color: #000000, $alpha: .8);
			display: flex;
			justify-content: center;
			align-items: center;
			overflow: hidden;
		}

		view.location_fail image {
			width: 80%;
			display: block;
		}

		view.location_fail button {
			width: 50%;
			height: 150rpx;
			position: absolute;
			bottom: 8%;
			left: 25%;
			opacity: 0;
		}
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

	.tip_box {
		height: 503rpx;
		background: url($bgUrl+'/strcode_bg.png') no-repeat center top;
		background-size: 100%;
		padding-top: 1rpx;

		.tip_content {
			height: 408rpx;
			width: 549rpx;
			background: url($bgUrl+'/strcode_tip_bg.png') no-repeat center;
			background-size: 100%;
			margin: 199rpx auto 0;
			display: flex;
			box-sizing: border-box;
			padding-bottom: 160rpx;
			justify-content: center;
			flex-direction: column;
			text-align: center;

			text:nth-of-type(1) {
				font-size: 46rpx;
				color: #4faa6d;
				padding-bottom: 20rpx;
			}

			text:nth-of-type(2) {
				font-size: 22rpx;
				color: #666666;
			}

			text.first {
				font-size: 72rpx;
				line-height: 100rpx;
				color: #4faa6d;
				padding-top: 40rpx;
				font-weight: bold;
			}
		}
	}

	.inputs {
		width: 670rpx;
		overflow: hidden;
		margin: 154rpx auto 5rpx;
		padding: 0 40rpx;
		border: 2rpx #4eac6d solid;
		border-radius: 8rpx;
		box-shadow: 2rpx 2rpx 10rpx #93998b;
		box-sizing: border-box;

		>view {
			height: 88rpx;
			border-bottom: 1px #f0f0f0 solid;
			display: flex;
			justify-content: space-between;

			input {
				height: 88rpx;
				line-height: 88rpx;
			}

			#strcode {
				width: 100%;
			}

			text {
				width: 180rpx;
				font-size: 23rpx;
				color: #4eac6d;
				display: block;
				text-align: center;
				align-self: center;
				border-left: 1px #4eac6d solid;
			}
		}

		>view:nth-last-of-type(1) {
			border: 0;
		}

		>view:nth-of-type(3) {
			margin-bottom: 35rpx;
		}
	}

	.tips {
		font-size: 24rpx;
		padding: 0 40rpx;
		color: #666;
		display: block;
		text-align: center;
		line-height: 42rpx;
	}

	.submsg {
		margin: 315rpx auto 0;
	}
</style>
