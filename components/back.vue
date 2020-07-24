<template>
	<view class="goback" @click="goback">
		<image :src="imgUrl+'/icon_back.png'" mode="widthFix" class="img"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgUrl:getApp().globalData.imgUrl
			};
		},
		methods:{
			goback(){
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.goback{
		width: 80rpx;
		height: 50rpx;
		.img{
			width: 26rpx;
			margin-top: 15rpx;
		}
	}
</style>
