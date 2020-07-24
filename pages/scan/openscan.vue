<template>
	<view>
		
	</view>
</template>

<script>
	let timer = null;
	export default {
		data() {
			return {
				openscan:true
			}
		},
		methods: {
			
		},
		onLoad() {

		},
		onShow() {
			clearTimeout(timer);
			timer = setTimeout(()=>{//10秒未响应？？？
				this.openscan = true;
			},10000)
			if(this.openscan){
				this.openscan = false;
				console.log('onShow',this.openscan)
				uni.scanCode({
					complete: (res) => {
						console.log(res)
						if(res.errMsg.indexOf('ok')!=-1){
							getApp().globalData.qrcode = encodeURIComponent(res.result);
							uni.redirectTo({//navigateTo 会造成异常 该页面跳转一次最好销毁一次
								url:'./scan?q='+encodeURIComponent(res.result),
								complete: (res) => {
									console.log('跳转前回调',res)
									this.openscan = true;
								}
							})
						}else{
							uni.switchTab({
								url:'../index/index',
								complete: (res) => {
									this.openscan = true;
								}
							})
						}
					}
				})
			}
		},
		onHide() {
			clearTimeout(timer)
		},
		onUnload() {
			clearTimeout(timer)
		}
	}
</script>

<style>

</style>
