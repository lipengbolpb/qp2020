<template>
	<view class="content">
		<view class="introduction_box">
			<image :src="imgUrl+'/yylx/introduction.png?v=1'" mode="widthFix" @load="imgLoad" :style="{'opacity':loadEnd?1:0}"></image>
			<button @click="toMap"></button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgUrl:getApp().globalData.imgUrl,
				loadEnd:false
			}
		},
		onLoad() {
			uni.showLoading({
				title: ''
			})
		},
		methods: {
			toMap(){
				uni.navigateTo({
					url:'storeList'
				})
			},
			imgLoad(e) {
				if (e.detail) {
					uni.hideLoading()
					this.loadEnd = true;
				}
			}
		}
	}
</script>

<style lang="scss">
	.content{
		overflow: auto;
		overflow-x: hidden;
		-webkit-overflow-scrolling:touch;
	}
	.introduction_box{
		width: 100%;
		overflow: hidden;
		position: relative;
		image{
			width: 100%;
			display: block;
		}
		button{
			width: 732rpx;
			height: 122rpx;
			background: url($bgUrl+'/yylx/button_toStore.png') no-repeat center;
			background-size: 100% auto;
			position: absolute;
			bottom: 140rpx;
			left: 50%;
			transform: translateX(-50%);
		}
	}
</style>
