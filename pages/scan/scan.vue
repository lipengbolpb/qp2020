<template>
	<view class="content">
		<view class="opensetting" v-if="needLocation">
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
</template>

<script>
	export default {
		data() {
			return {
				needLocation: false,
				againCLick: false,
				noLocation: false,
				imgUrl: getApp().globalData.imgUrl,
				longitude: '00',
				latitude: '00',
				qr: '',
				provinceCode: '',
				isOnLoad: false,
				showPrivacy: false
			};
		},
		onLoad(options) {
			let qr = '',
				optionsQ = decodeURIComponent(options.q),
				urlParse = [];
			if (optionsQ.indexOf('VJ1.TV/') != -1) {
				urlParse = decodeURIComponent(options.q).split('VJ1.TV/')[1].split('/');
			} else if (optionsQ.indexOf('vj1.tv/') != -1) {
				urlParse = decodeURIComponent(options.q).split('vj1.tv/')[1].split('/');
			} else if (optionsQ.indexOf('xt.vjifen.com') != -1) { //测试
				if (decodeURIComponent(options.q).indexOf('&') != -1) {
					urlParse[0] = decodeURIComponent(options.q).split('c=')[1].split('&')[0];
					urlParse[1] = decodeURIComponent(options.q).split('v=')[1];
				} else {
					urlParse = decodeURIComponent(options.q).split('xt.vjifen.com/')[1].split('/');
				}
			} else {
				qr = '';
				uni.showModal({
					title: "温馨提示",
					content: '请扫描正确的活动二维码',
					showCancel: false,
					complete: res => {
						console.log(res)
						if (res.confirm) { //返回首页
							uni.switchTab({
								url: "../index/index"
							})
						}
					}
				})
			}
			if (urlParse[0].toUpperCase() == 'AH') { //安徽
				if (urlParse[1].length == 18) {
					let strHb = urlParse[1][0] + urlParse[1][1] + urlParse[1][3];
					if (strHb == 'W8W' || strHb == 'Z46' || strHb == '8C9' || strHb == 'TXA') { //河北
						return uni.redirectTo({
							url: '../result/fail?bizcode=5'
						});
					}
				} else if (urlParse[1].length == 12) {
					let strHb = urlParse[1].substr(0, 3)
					if (strHb == 'W8W' || strHb == 'Z46' || strHb == '8C9' || strHb == 'TXA') { //河北
					 	return uni.redirectTo({
							url: '../result/fail?bizcode=5'
						});
					}
				}
			}
			console.log(urlParse)
			if (urlParse.length > 0) {
				this.qr = urlParse[1];
				this.provinceCode = urlParse[0].toUpperCase(); //省区编号
				getApp().globalData.provinceCode = urlParse[0].toUpperCase(); //省区编号
				this.isOnLoad = true;
				this.$Store.commit('setProjectSign', this.provinceCode); 
			}
		},
		onShow() {
			if (!this.isOnLoad) {
				return false;
			}
			console.log(1,this.$Store.state.requestUrl, this.$Store.state.appid, this.$Store.state.payAppid,this.$Store.state.serverName);
			if(!this.$Store.state.serverName||!this.$Store.state.appid){
				this.qr = '';
				this.provinceCode = ''; //省区编号
				getApp().globalData.provinceCode = ''; //省区编号
				return uni.showModal({
							title: "温馨提示",
							content: '请扫描正确的活动二维码',
							showCancel: false,
							complete: res => {
								console.log(res)
								if (res.confirm) { //返回首页
									uni.switchTab({
										url: "../index/index"
									})
								}
							}
						})
			}
			if (!getApp().globalData.vjfOpenid) {
				this.$Store.dispatch('getVjfOpenid').then(res => {
					let [e, r] = res;
					if (r) {
						getApp().globalData.vjfOpenid = r.data.vjfOpenid;
						this.checkProvinceCode().then(res => {
							console.log('省区关系是否变更', res)
							if (!res) { //清除缓存中各种id
								getApp().globalData.openid = '';
								getApp().globalData.hbopenid = '';
								try {
									uni.removeStorageSync('openid');
								} catch (e) {
									// error
									console.log('removeStorageSync',e)
								}
							}
							if (!getApp().globalData.openid) { //是否有openid
								if (!this.qr) {
									return false;
								}
								this.$Store.dispatch('getOpenid').then(res => {
									let [e, r] = res;
									if (r) { //有openid
										getApp().globalData.openid = r.data.openid;
										uni.getStorage({ //查询是否查看隐私说明
											key: 'readPrivacy'
										}).then(res => {
											let [e, r] = res;
											if (!r) {
												this.showPrivacy = true;
											} else {
												this.$Store.dispatch('getLocation').then(res => {
													let [e, r] = res;
													if (r) { //扫码
														console.log(5,r)
														this.latitude = r.latitude;
														this.longitude = r.longitude;
														getApp().globalData.latitude = r.latitude;
														getApp().globalData.longitude = r.longitude;
														if(this.provinceCode=='U'){//此处改造 华南和海南改造接口
															this.sweepVerify();
														}else{
															this.sweep();
														}
													} else {
														console.log('location fail',e)
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
										})
									} else { //重新获取
										console.log(e)
										uni.navigateTo({
											url: '../tool/getOpenid/getOpenid?type=openid'
										})
									}
								})
							} else {
								if (!this.qr) {
									return false;
								}
								console.log(getApp().globalData.openid)
								uni.getStorage({
									key: 'readPrivacy'
								}).then(res => {
									let [e, r] = res;
									if (!r) {
										this.showPrivacy = true;
									} else {
										this.$Store.dispatch('getLocation').then(res => {
											let [e, r] = res;
											if (r) { //扫码
												console.log(r)
												this.latitude = r.latitude;
												this.longitude = r.longitude;
												getApp().globalData.latitude = r.latitude;
												getApp().globalData.longitude = r.longitude;
												if(this.provinceCode=='U'){//此处改造 华南和海南改造接口
													this.sweepVerify();
												}else{
													this.sweep();
												}
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
								})
							}
						})
					} else {
						console.log(e)
						uni.navigateTo({
							url: '../tool/getOpenid/getOpenid?type=vjfOpenid'
						})
					}
				})
			} else {
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
							console.log('removeStorageSync',e)
						}
					}
					if (!getApp().globalData.openid) { //是否有openid
						if (!this.qr) {
							return false;
						}
						this.$Store.dispatch('getOpenid').then(res => {
							let [e, r] = res;
							if (r) { //有openid
								getApp().globalData.openid = r.data.openid;
								uni.getStorage({ //查询是否查看隐私说明
									key: 'readPrivacy'
								}).then(res => {
									let [e, r] = res;
									if (!r) {
										this.showPrivacy = true;
									} else {
										this.$Store.dispatch('getLocation').then(res => {
											let [e, r] = res;
											if (r) { //扫码
												console.log(r)
												this.latitude = r.latitude;
												this.longitude = r.longitude;
												getApp().globalData.latitude = r.latitude;
												getApp().globalData.longitude = r.longitude;
												if(this.provinceCode=='U'){//此处改造 华南和海南改造接口
													this.sweepVerify();
												}else{
													this.sweep();
												}
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
								})
							} else { //重新获取
								console.log(e)
								uni.navigateTo({
									url: '../tool/getOpenid/getOpenid?type=openid'
								})
							}
						})
					} else {
						if (!this.qr) {
							return false;
						}
						console.log(getApp().globalData.openid)
						uni.getStorage({
							key: 'readPrivacy'
						}).then(res => {
							let [e, r] = res;
							if (!r) {
								this.showPrivacy = true;
							} else {
								this.$Store.dispatch('getLocation').then(res => {
									let [e, r] = res;
									if (r) { //扫码
										console.log(r)
										this.latitude = r.latitude;
										this.longitude = r.longitude;
										getApp().globalData.latitude = r.latitude;
										getApp().globalData.longitude = r.longitude;
										if(this.provinceCode=='U'){//此处改造 华南和海南改造接口
											this.sweepVerify();
										}else{
											this.sweep();
										}
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
						})
					}
				})
			}
		},
		methods: {
			readPrivacy() {
				this.showPrivacy = false;
				uni.setStorage({
					key: 'readPrivacy',
					data: true
				})
				this.$Store.dispatch('getLocation').then(res => {
					let [e, r] = res;
					if (r) { //扫码
						console.log(r)
						this.latitude = r.latitude;
						this.longitude = r.longitude;
						getApp().globalData.latitude = r.latitude;
						getApp().globalData.longitude = r.longitude;
						if(this.provinceCode=='U'){//此处改造 华南和海南改造接口
							this.sweepVerify();
						}else{
							this.sweep();
						}
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
				let xcxOpenid = await this.$Store.dispatch('getXcxOpenid');
				uni.setStorage({
					key: 'xcxOpenid',
					data: xcxOpenid
				})
				return xcxOpenid;
			},
			openset() {
				this.needLocation = false;
				uni.openSetting();
			},
			cancel() { //取消 直接调用扫码接口
				console.log('调接口')
				this.needLocation = false;
				if(this.provinceCode=='U'){//此处改造 华南和海南改造接口
					this.sweepVerify();
				}else{
					this.sweep();
				}
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
							if(this.provinceCode=='U'){//此处改造 华南和海南改造接口
								this.sweepVerify();
							}else{
								this.sweep();
							}
						} else { //返回首页
							uni.switchTab({
								url: '../index/index'
							})
						}
					}
				})
			},
			sweep() {
				uni.showLoading({
					title: '加载中'
				})
				uni.request({
					url: this.$Store.state.requestUrl + '/sweep/sweepQrcode',
					method: 'POST',
					data: {
						"openid": getApp().globalData.openid,
						"vjifenOpenid": getApp().globalData.vjfOpenid,
						"paOpenid": '', //省区小程序openid
						"appletOpenid":getApp().globalData.xcxOpenid,//通用小程序openid
						"sweepstr": this.qr,
						"longitude": this.longitude, //"经度"
						"latitude": this.latitude, //"纬度"
						"headimgurl": this.$Store.state.hasUserInfo ? this.$Store.state.userInfo.avatarUrl : '',
						"nickname": this.$Store.state.hasUserInfo ? this.$Store.state.userInfo.nickName : '',
						"sex": this.$Store.state.hasUserInfo ? this.$Store.state.userInfo.gender : '', //1男
						"projectServerName":this.$Store.state.serverName
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
							this.$Store.state.haveTel = r.data.reply.phonenum; //全局缓存手机号
							if (r.data.result.businessCode == 0 || r.data.result.businessCode == 11) { //扫码成功
								uni.redirectTo({
									url: '../result/getcash?bizcode=' + r.data.result.businessCode
								});
							} else if (r.data.result.businessCode == 7 || r.data.result.businessCode == 21) { //大奖 
								uni.redirectTo({
									url: '../result/prize?bizcode=' + r.data.result.businessCode
								});
							} else if (r.data.result.businessCode == 12 || r.data.result.businessCode == 13) { //可疑 黑名单
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
							} else { //其他异常
								uni.redirectTo({
									url: '../result/fail?bizcode=' + r.data.result.businessCode
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
			},
			sweepVerify() {//华南海南扫码不占码接口
				uni.showLoading({
					title: '加载中'
				})
				uni.request({
					url: this.$Store.state.requestUrl + '/sweep/sweepVerify',
					method: 'POST',
					data: {
						"openid": getApp().globalData.openid,
						"vjifenOpenid": getApp().globalData.vjfOpenid,
						"paOpenid": '', //省区小程序openid
						"appletOpenid":getApp().globalData.xcxOpenid,//通用小程序openid
						"sweepstr": this.qr,
						"longitude": this.longitude, //"经度"
						"latitude": this.latitude, //"纬度"
						"headimgurl": this.$Store.state.hasUserInfo ? this.$Store.state.userInfo.avatarUrl : '',
						"nickname": this.$Store.state.hasUserInfo ? this.$Store.state.userInfo.nickName : '',
						"sex": this.$Store.state.hasUserInfo ? this.$Store.state.userInfo.gender : '', //1男
						"projectServerName":this.$Store.state.serverName
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
							this.$Store.state.haveTel = r.data.reply.phonenum; //全局缓存手机号
							if (r.data.result.businessCode == 0 || r.data.result.businessCode == 11) { //扫码成功
								getApp().globalData.qr = this.qr;
								uni.redirectTo({
									url: '../result/getcash?bizcode=' + r.data.result.businessCode
								});
							} else if (r.data.result.businessCode == 7 || r.data.result.businessCode == 21) { //大奖 
								uni.redirectTo({
									url: '../result/prize?bizcode=' + r.data.result.businessCode
								});
							} else if (r.data.result.businessCode == 12 || r.data.result.businessCode == 13) { //可疑 黑名单
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
							} else { //其他异常
								uni.redirectTo({
									url: '../result/fail?bizcode=' + r.data.result.businessCode
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
	}
</script>

<style scoped lang="scss">
	.content {
		background-color: #C8C7CC;
	}

	view.opensetting {
		width: 100%;
		height: 500rpx;
		background: #fff;
		position: absolute;
		bottom: 0;
		left: 0;
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
</style>
