<template>
	<view class="content">
		<button type="default" open-type="getUserInfo" @getuserinfo="getUserInfo" class="btn_com">授权登录</button>
		<button type="default" @click="tohb">河北</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		onLoad() {

		},
		methods: {
			async getUserInfo(e) {
				console.log(e)
				let xcxOpenid = await this.$Store.dispatch('getXcxOpenid');
				getApp().globalData.xcxOpenid = xcxOpenid.openid;
				getApp().globalData.sessionKey = xcxOpenid.session_key;
				uni.setStorage({
					key: 'xcxOpenid',
					data: xcxOpenid
				});
				console.log(xcxOpenid)
				uni.request({
					url: this.$Store.state.online.sgUrl + '/api/decrypt',
					method: 'post',
					data: {
						encryptedData: e.detail.encryptedData,
						iv: e.detail.iv,
						sessionKey: xcxOpenid.session_key,
						provinceCode: 'all'
					}
				}).then(res => {
					console.log(res)
				})
			},
			tohb(){
				uni.navigateToMiniProgram({
					appId: 'wx1d5e0ffc015303ab',
					path: 'pages/scan/scan?q=112312312',
					extraData: {
						'data1': 'test'
					},
					success(res) {
						// 打开成功
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.content {
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
