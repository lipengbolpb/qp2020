<template>
	<view class="content">
		<view class="template_1">
			<view id="wrap" class="mask" v-if="bizcode==12">
				<view class="tip">为确保您的账号安全，请填写验证信息</view>
				<view id="tel_box">
					<input type="number" name="tel" id="tel" value="" placeholder="请输入手机号" maxlength="11" @input="inputTelval"></input>
				</view>
				<view id="yz_box">
					<input type="number" name="yz_code" id="yz_code" value="" placeholder="请输入验证码" maxlength="4" @input="inputYzval"></input>
					<text id="get_yz" @click="getyz">{{sec==0?'获取验证码':sec+'秒后再次获取'}}</text>
				</view>
				<button id="tj" class="btn_com" @click="tj">提交信息</button>
				<view id="tips" v-if="tel">客服电话：{{tel}}</view>
			</view>
			<view id="wrap" v-else class="mask">
				<text class="black" v-if="tel">您的账号存在可疑风险，为确保您的账号安全，请联系客服\n\n\n电话：{{tel}}</text>
				<view v-else>
					<text class="black">您的账号存在可疑风险</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const reg1 = /^1[0-9]{10}$/,
		reg2 = /^[1-9][0-9xX]{17}$/,
		reg3 = /^[0-9]{4}$/;
	export default {
		data() {
			return {
				stop: false,
				sec: 0,
				telval: '',
				yzval: '',
				tel: '',
				bizcode: 13,
				requestUrl: this.$Store.state.requestUrl
			};
		},
		onLoad: function(options) {
			this.bizcode = options.bizcode;
			switch (getApp().globalData.provinceCode) {
				case 'D': //山东
					this.tel = '0532-66985957';
					break;
				case 'JL': //吉林
					this.tel = '15652287347';
					break;
				case 'LN':
					//辽宁
					this.tel = '024-31932190';
					break;
				case 'QPZJ': //浙江
					this.tel = '0571-28227057';
					break;
				case 'JS': //江苏
					this.tel = '15801152037';
					break;
				case 'AH': //安徽
					this.tel = '15801152037';
					break;
				case 'N': //湖南
					this.tel = '15801152037';
					break;
				case 'I': //江西
					this.tel = '15210353015';
					break;	
				default:
					this.tel = '';
					break
			}
		},
		onHide: function() {
			this.stop = true;
			this.sec = 0;
		},

		onUnload: function() {
			this.stop = true;
			this.sec = 0;
		},
		methods: {
			sub_message() {
				uni.showLoading({
					title: '提交中',
				})
				return new Promise((reslove, reject) => {
					uni.request({
						url: this.requestUrl + '/user/updateUserInfoMobile',
						method: "POST",
						data: {
							"openid": getApp().globalData.openid,
							"phonenum": this.telval,
							"captcha": this.yzval,
							"projectServerName":this.$Store.state.serverName
						},
						success: res => {
							uni.hideLoading()
							console.log('updateUserInfoMobile', res)
							reslove(res)
						},
						fail: err => {
							uni.hideLoading()
							reject('updateUserInfoMobile', err)
						}
					})
				})
			},
			getCaptcha() {
				uni.showLoading({
					title: '获取中',
				})
				return new Promise((reslove, reject) => {
					uni.request({
						url: this.requestUrl + '/user/getCaptcha',
						method: "POST",
						data: {
							"phonenum": this.telval,
							"sendtype": "1",
							"projectServerName":this.$Store.state.serverName
						},
						success: res => {
							uni.hideLoading()
							console.log('getCaptcha', res)
							reslove(res)
						},
						fail: err => {
							uni.hideLoading()
							reject('getCaptcha', err)
						}
					})
				})
			},
			inputYzval(e) { //验证码
				this.yzval = e.detail.value;
			},
			inputTelval(e) { //手机号
				this.telval = e.detail.value
			},
			tj() {
				if (!reg1.test(this.telval)) {
					uni.showModal({
						title: '提示',
						content: '请填写正确的手机号！~',
						showCancel: false
					})
				} else if (!reg3.test(this.yzval)) {
					uni.showModal({
						title: '提示',
						content: '请填写正确的验证码！~',
						showCancel: false
					})
				} else {
					//调提交接口
					this.sub_message().then(res => {
						if (res.data.result.businessCode == 0) {
							uni.redirectTo({
								url: '../scan/scan?q=' + getApp().globalData.qrcode,
							})
						} else {
							uni.showModal({
								title: '提示',
								content: res.data.result.msg,
								showCancel: false
							})
						}
					}).catch(err => {
						console.log(err)
					})
				}
			},
			getyz() {
				if (this.sec > 0) {
					return false;
				}
				if (!reg1.test(this.telval)) {
					uni.showModal({
						title: '提示',
						content: '请填写正确的手机号！~',
						showCancel: false
					})
				} else {
					this.getCaptcha().then(res => {
						if (res.data.result.businessCode == 0) {
							this.sec = 60;
							this.timer();
						} else {
							uni.showModal({
								title: '提示',
								content: '验证码获取失败！请稍后再试并确认手机号是否输入正确',
							})
						}
					}).catch(err => {

					})
				}
			},
			timer() {
				let timer = null;
				let that = this;
				if (this.stop || this.sec <= 0) {
					this.sec = 0
					return false;
				}
				this.sec -= 1
				timer = setTimeout(() => {
					this.timer()
				}, 1000);
			}
			
			
		}
	}
</script>

<style lang="scss">
	.content {
		background: url($bgUrl+'/bg.png?v=2') no-repeat top;
		background-size: 100% auto;
		position: relative;
	}

	#wrap {
		color: #fff;
	}

	#wrap text.black {
		display: block;
		text-align: center;
		padding: 0 100rpx;
		font-size: 28rpx;
		margin: 300rpx auto;
	}

	#wrap .tip {
		line-height: 50rpx;
		text-align: center;
		padding: 160rpx 0 100rpx;
	}

	#tel_box {
		height: 80rpx;
		line-height: 80rpx;
		display: flex;
		border-top: 1px #ccc solid;
		border-bottom: 1px #ccc solid;
	}

	#tel_box input {
		height: 80rpx;
		line-height: 80rpx;
		width: 80%;
		font-size: 28rpx;
		padding-left: 50rpx;
	}

	#yz_box {
		height: 80rpx;
		line-height: 80rpx;
		display: flex;
		border-bottom: 1px #ccc solid;
	}

	#yz_box input {
		height: 80rpx;
		line-height: 80rpx;
		width: 60%;
		padding-left: 50rpx;
		box-sizing: border-box;
	}

	#get_yz {
		width: 40%;
		text-align: center;
		border-left: 1px #ccc solid;
		box-sizing: border-box;
	}

	#yz_box {
		bottom: 0;
	}

	#tj {
		margin-top: 72rpx;
		display: block;
		margin: 100rpx auto;
	}

	#tips {
		text-align: center;
	}
</style>
