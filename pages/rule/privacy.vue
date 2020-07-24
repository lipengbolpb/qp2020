<template>
	<view class="content">
		<go-back :style="{'top':safeAreaTop}"></go-back>
		<image :src="imgUrl+'/privacy.png'" mode="widthFix" @load="imgLoad" :style="{'opacity':loadEnd?1:0}"></image>
	</view>
</template>

<script>
	import goBack from '@/components/back.vue';
	export default {
		data() {
			return {
				imgUrl:getApp().globalData.imgUrl,
				loadEnd:false,
				safeAreaTop:getApp().globalData.safeAreaTop?getApp().globalData.safeAreaTop+'px':'64rpx'
			}
		},
		onLoad() {
			uni.showLoading({
				title:''
			})
		},
		methods: {
			imgLoad(e){
				if(e.detail){
					uni.hideLoading();
					this.loadEnd = true;
				}
			}
		},
		components:{
			goBack
		}
	}
</script>

<style lang="scss">
	.content{
		overflow-x: hidden;
		overflow: auto;
		-webkit-overflow-scrolling:touch;
		image{
			width: 100%;
			display: block;
		}
	}
</style>
