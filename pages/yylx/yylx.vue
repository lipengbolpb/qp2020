<template>
	<view class="content">
		<view class="template_1">
			<view class="template">
				<image :src="imgUrl+'/logo.png'" mode="widthFix" class="logo"></image>
				<image :src="imgUrl+'/yylx/icon_rule.png'" mode="widthFix" class="rule" @click="toRule"></image>
				<view class="prizeMsg">
					<text class="title">恭喜您获得一元换购</text>
					<text class="prizeName">{{reply.prizeTypeName}}</text>
					<image :src="reply.prizeTypeImg" mode="widthFix" class="prizeImg"></image>
				</view>
				<button class="todetails" @click="toList"></button>
				<button class="toMap" @click="toIntroduction"></button>
				<view class="toStore" @click="toMap">
					<text>查看附近兑换门店</text><image :src="imgUrl+'/yylx/icon_next.png'" mode="widthFix"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgUrl:getApp().globalData.imgUrl,
				reply:getApp().globalData.reply
			};
		},
		onShow() {
			
		},
		methods:{
			toList(){
				uni.switchTab({
					url:'../mybag/mybag'
				})
			},
			toIntroduction(){
				uni.navigateTo({
					url:'introduction'
				})
			},
			toMap(){
				uni.navigateTo({
					url:'storeList'
				})
			},
			toRule(){
				uni.navigateTo({
					url:'rule'
				})
			}
		}
	}
</script>

<style lang="scss">
	.template_1{
		background: url($bgUrl+'/bg_2.png?v=2') no-repeat center;
		background-size: cover;
	}
	.rule {
		position: absolute;
		right: 0;
		top: 300rpx;
		width: 110rpx;
		z-index: 1;
	}
	.prizeMsg{
		width: 100%;
		overflow: hidden;
		position: absolute;
		top: 313rpx;
		left: 0;
		text-align: center;
		color: #FFFFFF;
		.title{
			font-size: 32rpx;
			display: block;
			color: #fefbe2;
			margin-bottom: 40rpx;
		}
		.prizeName{
			font-size: 60rpx;
			display: block;
			font-weight: bold;
			line-height: 1em;
			padding: 0 40rpx;
		}
		.prizeImg{
			width: 500rpx;
			// height: 500rpx;
			// margin-top: 75rpx;
		}
	}
	.todetails{
		width: 492rpx;
		height: 100rpx;
		background: url($bgUrl+'/yylx/button_details.png') no-repeat center;
		background-size: 100% 100%;
		position: absolute;
		top: 1170rpx;
		left: 50%;
		transform: translateX(-50%);
	}
	.toMap{
		width: 492rpx;
		height: 100rpx;
		background: url($bgUrl+'/yylx/button_introduction.png') no-repeat center;
		background-size: 100% 100%;
		position: absolute;
		top: 1040rpx;
		left: 50%;
		transform: translateX(-50%);
	}
	.toStore{
		position: absolute;
		top: 1290rpx;
		height: 40rpx;
		font-size: 32rpx;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		image{
			width: 25rpx;
		}
	}
</style>
