<template>
	<view class="content">
		<view class="template_1">
			<view class="template">
				<image :src="imgUrl+'/logo.png'" mode="widthFix" class="logo"></image>
				<text class="tips_1">{{msgTitle}}</text>
				<text class="tips_2">{{msgContent}}</text>
				<button class="btn_com" @click="toMybag">我 知 道 了</button>
				<view class="batch" v-show="batchName&&bizcode==4">
					<text v-for="(index,item) in activateBatchLinkPhoneNum" class="batchTel" @click="call(item)" :key="index">联系电话:{{index}}</text>
					<text>批次名称：{{batchName}}</text>
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
				msgTitle:'',
				msgContent:'',
				reply:getApp().globalData.reply,
				batchName:'',
				bizcode:0,
				activateBatchLinkPhoneNum:""
			}
		},
		onLoad(options) {
			this.bizcode = Number(options.bizcode);
			switch (Number(options.bizcode)){
				case 1:
					this.msgTitle = '这个二维码不存在';
					this.msgContent = '';
					break;
				case 2:
					this.msgTitle = '这个二维码已被扫';
					console.log(this.reply.earnTime)
					this.msgContent = `扫码时间${this.reply.earnTime}\n再扫一支试试看`;
					break;
				case 15:
					this.msgTitle = '这个二维码已被扫';
					console.log(this.reply.earnTime)
					this.msgContent = `扫码时间${this.reply.earnTime}\n再扫一支试试看`;
					break;	
				case 3:
					this.msgTitle = '这个二维码已过期';
					this.msgContent = '这么好的酒，要学会珍惜哦';
					break;
				case 4:
					this.msgTitle = '活动未开始';
					this.msgContent = '心急喝不了好啤酒，再等等哦';
					this.batchName = this.reply.batchName;
					this.activateBatchLinkPhoneNum = this.reply.activateBatchLinkPhoneNum.split(',');//批次电话
					break;
				case 5:
					this.msgTitle = '活动已截止';
					this.msgContent = '好酒不等人，下次早点来哦';
					break;
				case 6:
					this.msgTitle = '系统繁忙';
					this.msgContent = '稍等片刻，畅想欢聚时刻';
					break;
				case 7://重复扫码尊享卡
					this.msgTitle = '您已扫过';
					if(this.reply.currentVpoints==0&&this.reply.currentMoney==0){
						this.msgContent = `您已于${this.reply.earnTime}扫过此码\n并获得尊享卡一张`;
					}else if(this.reply.currentVpoints==0&&this.reply.currentMoney!=0){
						this.msgContent = `您已于${this.reply.earnTime}扫过此码\n并获得${this.reply.currentMoney}元+尊享卡一张`;
					}else if(this.reply.currentVpoints!=0&&this.reply.currentMoney==0){
						this.msgContent = `您已于${this.reply.earnTime}扫过此码\n并获得${this.reply.currentVpoints}积分+尊享卡一张`;
					}else{
						this.msgContent = `您已于${this.reply.earnTime}扫过此码\n并获得${this.reply.currentMoney}元+${this.reply.currentVpoints}积分+尊享卡一张`;
					}
					
					break;	
				case 17:
					this.msgTitle = '好酒美味更需趁早';
					this.msgContent = '您扫的这支酒\n所属产品批次活动已结束';
					break;	
				case 18:
					this.msgTitle = '此码未被使用';
					this.msgContent = '';
					break;	
				case 19://漏码
					this.msgTitle = '您离红包只差一点点';
					this.msgContent = '再扫一支试试看';
					break;	
				case 23://扫码次数已达上限
					this.msgTitle = '扫码次数已达上限';
					this.msgContent = '';
					break;		
				case -1:
					this.msgTitle = '系统升级中';
					this.msgContent = '稍安勿躁，敬请关注';
					break;							
				default:
					this.msgTitle = '敬请关注';
					this.msgContent = getApp().globalData.result.msg?getApp().globalData.result.msg:'';
					break;
			}
		},
		methods: {
			toMybag(){
				uni.switchTab({
					url:'../mybag/mybag'
				})
			},
			call(tel){
				uni.makePhoneCall({
					phoneNumber:tel
				})
			}
		}
	}
</script>

<style lang="scss">
	.template_1{
		background: url($bgUrl+'/bg_2.png?v=2') no-repeat center;
		background-size:cover;
		text-align: center;
		color: #FFFFFF;
		.tips_1{
			display: block;
			margin-top: 468rpx;
			line-height: 100rpx;
			font-size: 60rpx;
		}
		.tips_2{
			font-size: 28rpx;
			line-height: 42rpx;
			padding: 0 110rpx;
			display: block;
		}
		.btn_com{
			position: absolute;
			top: 1120rpx;
			transform: translateX(-50%);
			left: 50%;
		}
		.batch{
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			text-align: center;
			color: #FFFFFF;
			font-size: 34rpx;
			font-weight: bold;
			line-height: 50rpx;
			text{
				display: block;
			}
		}
	}
</style>
