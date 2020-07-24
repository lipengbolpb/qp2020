<template>
	<scroll-view scroll-y>
		<view class="msg_box">
			<view>
				<image class="prizeImg" mode="widthFix" :src="checkPrizeRecord.prizeImg" ></image> 
			</view>
			<view>
				<text>中奖码：</text><input type="text" :value="checkPrizeRecord.prizeVcode" disabled="disabled"></input>
			</view>
			<view>
				<text>中奖产品：</text><input type="text" :value="checkPrizeRecord.prizeName" disabled="disabled"></input>
			</view>
			<view>
				<text>中奖时间：</text><input type="text" :value="checkPrizeRecord.earnTime" disabled="disabled"></input>
			</view>
			<view>
				<text>截止时间：</text><input type="text" :value="checkPrizeRecord.expireTime" disabled="disabled"></input>
			</view>
			<view>
				<text>联系人：</text><input type="text" :value="checkPrizeRecord.userName" disabled="disabled"></input>
			</view>
			<view>
				<text>联系电话：</text><input type="text" :value="checkPrizeRecord.phoneNum" disabled="disabled"></input>
			</view>
			<view v-if="checkPrizeRecord.checkStatus==1">
				<text>兑奖人员：</text><input type="text" :value="checkPrizeRecord.checkUserName" disabled="disabled"></input>
			</view>
			<view v-if="checkPrizeRecord.checkStatus==1">
				<text>兑奖时间：</text><input type="text" :value="checkPrizeRecord.checkTime" disabled="disabled"></input>
			</view>
			<view>
				<text>兑奖备注：</text><input type="text" :value="checkPrizeRecord.checkRemarks||checkRemarks" placeholder="备注"
				 :disabled="readOnly" @input="checkRemarksFn"></input>
			</view>
		</view>
		<image :src="imgUrl+'/tsingtao/verification.png'" class="sign" mode="widthFix" v-if="readOnly||checkPrizeRecord.checkStatus==1"></image>
		<text class="tip" v-if="needWrite">注：请兑奖人完善个人信息，进行兑奖</text>
		<button class="dj" @click="dj" :disabled="readOnly||checkPrizeRecord.checkStatus==1||needWrite">{{readOnly?'已兑奖':checkPrizeRecord.checkStatus==1?'已兑奖':'立即兑奖'}}</button>
	</scroll-view>
</template>

<script>
	export default {
		data() {
			return {
				imgUrl: 'https://xcxsite.vjifen.com/v/static',
				reply:getApp().globalData.reply,
				checkPrizeRecord: getApp().globalData.reply.checkPrizeRecord,
				needWrite:false,
				checkRemarks:'',
				readOnly:false,
				requestUrl:this.$Store.state.requestUrl
			};
		},
		onShow: function() {
			if (!this.checkPrizeRecord.userName) { //未填写
				this.needWrite = true
			}
		},
		methods: {
			checkPrize() {
				uni.showLoading({
					title: '兑奖中',
				})
				return new Promise((resolve, reject) => {
					console.log(222, getApp().globalData.requestUrl)
					uni.request({
						url: this.requestUrl + '/checkUser/checkPrize',
						method: "POST",
						data: {
							"openid": getApp().globalData.openid,
							"checkRemarks": this.checkRemarks,
							"prizeInfoKey": this.checkPrizeRecord.infoKey,
							"projectServerName":this.$Store.state.serverName
						},
						success: res => {
							uni.hideLoading()
							console.log('checkPrize', res)
							resolve(res)
						},
						fail: err => {
							uni.hideLoading()
							console.log('checkPrize', err)
							reject(err)
						}
					})
				})
			},
			dj() {
				this.checkPrize().then(res => {
					if (res.data.result.businessCode == 0) {
						uni.showModal({
							title: '提示',
							content: '兑奖成功！',
							showCancel: false,
							confirmText: '我知道了'
						})
						this.readOnly = true;
					} else {
						uni.showModal({
							title: '提示',
							content: res.data.result.msg,
							showCancel: false,
							confirmText: '我知道了'
						})
					}
				}).catch(err => {

				})
			},
			checkRemarksFn(e) {
				this.checkRemarks = e.detail.value
			}
		}
	}
</script>

<style lang="scss">
	scroll-view {
		width: 95%;
		height: 100%;
		margin: 0 auto;
	}

	scroll-view .msg_box {
		margin: 20rpx auto;
		border-radius: 10rpx;
		border: 1px #ccc solid;
		overflow: hidden;
	}

	scroll-view .msg_box>view {
		display: flex;
		justify-content: center;
		background: #fff;
		border-bottom: 1px #ccc solid;
		font-size: 26rpx;
		color: #333;
	}

	scroll-view .msg_box .prizeImg {
		width: 240rpx;
		display: block;
	}

	scroll-view .msg_box>view:nth-last-of-type(1) {
		border: 0;
	}

	scroll-view .msg_box>view:nth-of-type(1) {
		border: 0;
	}

	scroll-view .msg_box view image {
		width: 240rpx;
		display: block;
		margin: 30rpx auto;
	}

	scroll-view .msg_box view>text {
		width: 187rpx;
		text-align: right;
		line-height: 80rpx;
	}

	scroll-view .msg_box view>input {
		width: 500rpx;
		line-height: 80rpx;
		height: 80rpx;
		text-align: left;
	}

	.tip {
		color: #e95a4a;
		display: block;
		text-align: center;
		font-size: 30rpx;
		font-weight: bold;
	}

	button {
		background: #51a938;
		border: 1px #51a938 solid;
		border-radius: 10rpx;
		color: #fff;
		margin: 30rpx auto;
	}

	button[disabled] {
		background: #51a938 !important;
		border: 1px #51a938 solid !important;
		color: #fff !important;
	}

	image.sign {
		width: 240rpx;
		position: absolute;
		right: 50rpx;
		top: 40%;
	}
</style>
