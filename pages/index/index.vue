<template>
	<view class="content">
		<view class="template_1 template_index" v-if="!showLuck">
			<view class="template">
				<image :src="imgUrl+'/logo.png'" mode="widthFix" class="logo"></image>
				<image :src="imgUrl+'/bdd.png'" mode="widthFix" class="bdd"></image>
				<image :src="imgUrl+'/slogan.png'" mode="widthFix" class="slogan"></image>
			</view>
		</view>
		<view class="template_1 template_ecjx" v-else>
			<view class="template">
				<button open-type="contact" send-message-title="青岛啤酒小程序" :send-message-path="sharePath"
				 :send-message-img="shareImg" show-message-card="true" class="toAttention"></button>
				<image :src="imgUrl+'/ecjx/slogan.png'" mode="widthFix" class="slogan"></image>
				<image :src="imgUrl+'/ecjx/luckdraw.png?v=2'" mode="widthFix" class="luck"></image>
				<button class="toEcjx" @click="toEcjx"></button>
			</view>
			<view class="mask" v-show="showTip&&showTipIndex==1">
				<view class="tip_content">
					<text v-if="txSuc">亲，您提现的金额已经入账至微信零钱中\n可以到微信支付记录里查看哟~</text>
					<text v-else-if="getPrize">亲，大奖已领取\n详情请到小程序“我的-扫码奖项-我的奖品”中查看</text>
					<text v-else>亲，已将您的中奖金额存入您的个人账户中\n详情请到小程序“我的”中查看</text>
				</view>
			</view>
		</view>
	</view> 
</template>

<script>
	export default {
		data() {
			return {
				imgUrl: getApp().globalData.imgUrl,
				sharePath: '',
				shareImg: 'https://xcxsite.vjifen.com/v/static/qp2020/share.png',
				showLuck:false,
				needAttention:false,
				txSuc:getApp().globalData.txSuc,
				getPrize:getApp().globalData.getPrize,
				showTip:false,
				showTipIndex:1
			}
		},
		onLoad() {
			uni.getSystemInfo({
				complete: (res) => {
					console.log(res)
					getApp().globalData.safeAreaTop = res.safeArea.top
				}
			})
		},
		onShow() {
			this.sharePath = `pages/index/index?provinceCode=${getApp().globalData.provinceCode}`;
			this.showLuck = getApp().globalData.ecjx?true:false;
			this.needAttention = getApp().globalData.needAttention;
			this.showTip = this.showLuck;
			if(this.showTip&&this.showTipIndex==1){
				setTimeout(()=>{
					this.showTipIndex = 2;
					this.showTip = false;
				},2000)
			}
			getApp().globalData.txSuc = false;
			getApp().globalData.getPrize = false;
		},
		methods: {
			toEcjx(){
				uni.navigateToMiniProgram({
				  appId: 'wx1e63bbf67dddd854',
				  path: 'pages/index/index',
				  envVersion:this.$Store.state.isOnline?this.$Store.state.online.mallVersion:this.$Store.state.test.mallVersion,
				  extraData: {
				    "openid": getApp().globalData.openid,
					"tel":this.$Store.state.haveTel,
					"serverName":this.$Store.state.serverName,
					"longitude": getApp().globalData.longitude,
					"latitude": getApp().globalData.latitude
				  },
				  success: res=>{//跳转后清楚数据
				    // 打开成功
					getApp().globalData.txSuc = false;
					getApp().globalData.getPrize = false;
					getApp().globalData.ecjx = false;
				  }
				})
			}
		}
	}
</script>

<style lang="scss">
	.template_index {
		background: url($bgUrl+'/index_bg.png?v=5') no-repeat center;
		background-size:cover;
		.template{
			height: 1234rpx;
		}
		.box {
			height: 68%;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			width: 100%;
			align-items: center;
		}

		.bdd {
			width: 670rpx;
			position: absolute;
			right: 0;
			top:260rpx;
		}

		.slogan {
			width: 530rpx;
			margin: 860rpx auto 0;
			display: block;
		}
	}
	.template_ecjx {
		background: url($bgUrl+'/ecjx/bg.jpg') no-repeat center;
		background-size:cover;
		.template{
			height: 1234rpx;
		}
		.slogan{
			position: absolute;
			top: 160rpx;
			width:447rpx;
			left: 50%;
			transform: translateX(-50%);
		}
		.luck{
			width: 483rpx;
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
			top: 388rpx;
		}
		.toAttention{
			position: absolute;
			width: 102rpx;
			height: 100rpx;
			margin: 0;
			padding: 0;
			background: url($bgUrl+'/ecjx/icon_attention.png') no-repeat center;
			background-size: cover;
			position: absolute;
			top: 147rpx;
			right: 20rpx;
		}
		.toEcjx{
			width:90rpx;
			height:240rpx;
			position: absolute;
			padding: 0;
			margin: 0;
			border: none;
			background: none;
			top: 503rpx;
			right: 150rpx;
			z-index: 1;
		}
		.tip_content{
			width: 600rpx;
			overflow: hidden;
			padding:150rpx 40rpx ;
			box-sizing: border-box;
			border-radius: 10rpx;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%,-50%);
			background-color: #FFFFFF;
			text-align: center;
			font-size: 28rpx;
		}
	}
</style>
