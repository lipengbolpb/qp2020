<template>
	<view class="content">
		<view class="introduction_box">
			<image :src="imgUrl+'/yylx/rule.png'" mode="widthFix" @load="imgLoad" :style="{'opacity':loadEnd?1:0}"></image>
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
	}
</style>
