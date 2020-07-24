<template>
	<view class="content">
		<scroll-view scroll-y="true" class="list_box" @scrolltolower="lower">
			<view class="tab_box">
				<text :class="tabId==1?'cur':''" @click="tab(1)">待换购商品\n{{unNum}}</text>
				<text :class="tabId==2?'cur':''" @click="tab(2)">已换购商品\n{{num}}</text>
			</view>
			<view class="awaitList" v-show="tabId==1">
				<view class="item" v-for="(item,index) in unList" :key="index">
					<text class="prizeName">{{item.skuName}}</text>
					<text class="earnTime">中奖时间：{{item.earnTime|timeSplit}}</text>
					<text class="expireTime">兑奖截止时间：{{item.expireTime|timeSplit}}</text>
				</view>
			</view>
			<view class="alreadyList" v-show="tabId==2">
				<view class="item" v-for="(item,index) in list" :key="index" @click="queryDetails(index)">
					<text class="num">{{item.exchangeNum}}支</text>
					<view class="prizeMsg">
						<text class="storeName">{{item.terminalName}}</text>
						<text class="exchangTime">换购时间：{{item.exchangeTime|timeSplit}}</text>
					</view>
					<button v-if="true" @click="showMsg=true">查看详情</button>
					<image :src="imgUrl+'/yylx/icon_recall.png'" mode="widthFix" v-else></image>
				</view>
			</view>
		</scroll-view>
		<view class="mask exchangDetails" v-show="showMsg">
			<view class="msg_box">
				<image :src="imgUrl+'/yylx/title_hgcg.png'" mode="widthFix" class="title"></image>
				<!-- <image :src="imgUrl+'/yylx/icon_close.png?v=1'" mode="widthFix" class="close" @click="showMsg=false"></image> -->
				<view class="">
					<text class="item">换购门店：</text>
					<text class="msg">{{exchangeMsg.terminal.terminalName}}</text>
				</view>
				<view class="">
					<text class="item">换购地址：</text>
					<text class="msg address" style="line-height: 1.2em;padding: 20rpx 0;">{{exchangeMsg.terminal.province}}{{exchangeMsg.terminal.city}}{{exchangeMsg.terminal.county}}{{exchangeMsg.terminal.address}}</text>
				</view>
				<view class="">
					<text class="item">换购商品：</text>
					<view class="msg">
						<text class="msg_item" v-for="(item ,index) in exchangeMsg.exchangeSku" :key="index">{{item.skuName}} {{item.exchangeNum}}支</text>
					</view>
				</view>
				<view class="">
					<text class="item">换购时间：</text>
					<text class="msg">{{exchangeMsg?exchangeMsg.exchangeSku[0].exchangeTime:''}}</text>
				</view>
				<button @click="showMsg=false">朕知道了</button>
			</view>
		</view>
		<view class="btn_box">
			<text class="methods" @click="toIntroduction">兑奖介绍</text>
			<text class="methods" @click="toMap">附近门店</text> 
			<text class="rule" @click="toRule">活动细则</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgUrl:getApp().globalData.imgUrl,
				showMsg:false,
				tabId:1,
				UnExchangePage:1,
				exchangePage:1,
				next:true,
				unNext:true,
				list:'',
				unList:'',
				unNum:0,
				num:0,
				exchangeMsg:""
			};
		},
		onShow() {
			console.log(this.$Store.state.vjfAppid)
			if(!getApp().globalData.vjfOpenid){
				if(this.$Store.state.vjfAppid){
					this.$Store.dispatch('getVjfOpenid').then(res=>{
						let [e,r] = res;
						if(r){
							getApp().globalData.vjfOpenid = r.data.vjfOpenid;
							this.queryExchange();
							this.queryUnExchange();
						}else{
							console.log(e)
							uni.navigateTo({
								url: '../tool/getOpenid/getOpenid?type=vjfOpenid'
							})
						}
					})
				}
			}else{
				this.queryExchange();
				this.queryUnExchange();
			}
		},
		methods:{
			tab(id){
				this.tabId=id;
			},
			toIntroduction(){
				uni.navigateTo({
					url:'introduction'
				})
			},
			toRule(){
				uni.navigateTo({
					url:'rule'
				})
			},
			toMap(){
				uni.navigateTo({
					url:'storeList'
				})
			},
			queryUnExchange(){
				uni.showLoading({
					title:'加载中'
				})
				uni.request({//未兑换
					url:this.$Store.state.requestUrl_lx + '/consumer/queryUnExchangePrizeLst',
					method:'POST',
					data:{
						"companyKey":this.$Store.state.companyKey,
						"vjifenOpenid":getApp().globalData.vjfOpenid,
						"currentPage":this.UnExchangePage,
						"count":20
					}
				}).then(res=>{
					uni.hideLoading()
					console.log(res)
					let [e,r] = res;
					if(r){
						if(r.data.reply&&(!r.data.reply.prizeAry||r.data.reply.prizeAry.length<20)){
							this.unNext = false;
						}else{
							this.unNext = true;
						}
						if(this.UnExchangePage==1){
							this.unList = r.data.reply.prizeAry;
							this.unNum = r.data.reply.prizeNum;
						}else{
							if(r.data.reply.prizeAry&&r.data.reply.prizeAry.length>0){
								this.unList = this.unList.concat(r.data.reply.prizeAry);
							}
						}
					}else{
						console.log(e);
						uni.showModal({
							title:'提示',
							content:'系统繁忙',
							showCancel:false
						})
					}
				}).catch(err=>{
					uni.hideLoading();
					console.log(err)
					uni.showModal({
						title:'提示',
						content:'系统繁忙',
						showCancel:false
					})
				})
			},
			queryExchange(){
				uni.showLoading({
					title:'加载中'
				})
				uni.request({//未兑换
					url:this.$Store.state.requestUrl_lx + '/consumer/queryExchangedPrizeLst',
					method:'POST',
					data:{
						"companyKey":this.$Store.state.companyKey,
						"vjifenOpenid":getApp().globalData.vjfOpenid,
						"currentPage":this.exchangePage,
						"count":20
					}
				}).then(res=>{
					uni.hideLoading()
					console.log(res)
					let [e,r] = res;
					if(r){
						if(r.data.reply&&(!r.data.reply.prizeAry||r.data.reply.prizeAry.length<20)){
							this.next = false;
						}else{
							this.next = true;
						}
						if(this.exchangePage==1){
							this.list = r.data.reply.prizeAry;
							this.num = r.data.reply.prizeNum;
						}else{
							if(r.data.reply.prizeAry&&r.data.reply.prizeAry.length>0){
								this.list = this.list.concat(r.data.reply.prizeAry);
							}
						}
					}else{
						console.log(e);
						uni.showModal({
							title:'提示',
							content:'系统繁忙',
							showCancel:false
						})
					}
				}).catch(err=>{
					uni.hideLoading();
					console.log(err)
					uni.showModal({
						title:'提示',
						content:'系统繁忙',
						showCancel:false
					})
				})
			},
			lower(){//上拉加载
				if(this.next&&this.tabId==2){
					this.exchangePage++;
					this.queryExchange();
				} else if(this.unNext&&this.tabId==1){
					this.UnExchangePage++;
					this.queryUnExchange();
				} else {
					uni.showToast({
						title:'没有更多了记录了',
						icon:'none'
					})
				}
				
			},
			queryDetails(index){
				uni.showLoading({
					title:'加载中'
				})
				uni.request({//未兑换
					url:this.$Store.state.requestUrl_lx + '/consumer/exchangedPrizeDetail',
					method:'POST',
					data:{
						"companyKey":this.$Store.state.companyKey,
						"vjifenOpenid":getApp().globalData.vjfOpenid,
						"terminalKey":this.list[index].terminalKey,
						"exchangeNo":this.list[index].exchangeNo
					}
				}).then(res=>{
					uni.hideLoading();
					let [e,r] = res;
					if(r){
						this.exchangeMsg = r.data.reply;
						if(this.exchangeMsg.exchangeSku[0].exchangeTime){
							this.exchangeMsg.exchangeSku[0].exchangeTime = this.exchangeMsg.exchangeSku[0].exchangeTime.split('.')[0]
						}
						this.showMsg = true;
					}else{
						console.log(e);
						uni.showModal({
							title:'提示',
							content:'系统繁忙',
							showCancel:false
						})
					}
				}).catch(err=>{
					uni.hideLoading()
					console.log(err)
					uni.showModal({
						title:'提示',
						content:'系统繁忙',
						showCancel:false
					})
				})
			}
		}
	}
</script>

<style lang="scss">
	scroll-view{
		width: 100%;
		height: 100%;
		padding-bottom: 140rpx;
		box-sizing: border-box;
		background-color: #f5f5f5;
		.tab_box{
			height: 148rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			text-align: center;
			text{
				display: block;
				height: 110rpx;
				width: 290rpx;
				font-size: 28rpx;
				padding-top: 20rpx;
				box-sizing: border-box;
				color: #858585;
				background-color: #FFFFFF;
				font-weight: bold;
			}
			text:nth-of-type(1){
				border-radius: 8rpx 0 0 8rpx;
			}
			text:nth-of-type(2){
				border-radius: 0rpx 8rpx 8rpx 0;
			}
			text.cur{
				color: #FFFFFF;
				background-color: #4753e8;
			}
		}
		.awaitList{
			width: 100%;
			background: #FFFFFF;
			.item{
				padding: 30rpx;
				border-bottom: 1px #cccccc solid;
				text{
					font-size: 20rpx;
					color: #333333;
					display: block;
				}
				.prizeName{
					font-size: 32rpx;
					font-weight: bold;
				}
			}
			.item:nth-last-of-type(1){
				border: 0;
			}
		}
		.alreadyList{
			width: 100%;
			background: #FFFFFF;
			.item{
				padding:20rpx 30rpx;
				border-bottom: 1px #cccccc solid;
				display: flex;
				align-items: center;
				justify-content: space-between;
				color: #333333;
				// height: 138rpx;
				overflow: hidden;
				.num{
					font-size: 48rpx;
					font-weight: bold;
					display: block;
					width: 120rpx;
				}
				.prizeMsg{
					// height: 65rpx;
					padding-left: 20rpx;
					border-left: 2rpx #333333 solid;
					width: 380rpx;
				}
				.prizeMsg text{
					display: block;
				}
				.storeName{
					font-size: 32rpx;
					font-weight: bold;
				}
				.exchangTime{
					font-size: 20rpx;
				}
				button{
					width: 150rpx;
					height: 59rpx;
					font-size: 30rpx;
					border-radius: 8rpx;
					border: 2rpx #333 solid;
					padding: 0;
					line-height: 57rpx;
					margin: 0;
				}
				image{
					width: 116rpx;
					margin-right: 20rpx;
				}
			}
			.item:nth-last-of-type(1){
				border: 0;
			}
		}
	}
	.exchangDetails{
		z-index: 1;
	}
	.msg_box{
		width: 622rpx;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%);
		border-radius: 8rpx;
		background-color: #FFFFFF;
		overflow: hidden;
		.title{
			width: 100%;
		}
		.close{
			position: absolute;
			right: 5rpx;
			top: 5rpx;
			width: 32rpx;
		}
		>view{
			padding: 0 0 0 40rpx;
			display: flex;
			justify-content: space-between;
			font-size: 30rpx;
			border-bottom: 1px #ccc solid;
			line-height: 94rpx;
			align-items: center;
			.msg{
				width: 403rpx;
				font-weight: bold;
				line-height: 1.2em;
				.msg_item{
					display: block;
					border-bottom: 1px #ccc solid;
					padding: 20rpx 0;
				}
				.msg_item:nth-last-of-type(1){
					border: 0;
				}
			}
			text.msg{
					line-height: 94rpx;
			}
		}
		button{
			width: 304rpx;
			height: 69rpx;
			font-size: 36rpx;
			color: #FFFFFF;
			line-height: 69rpx;
			background-color: #4753e8;
			margin: 40rpx auto 50rpx;
			padding: 0;
			border-radius: 8rpx;
		}
	}
	.btn_box{
		width: 100%;
		height: 140rpx;
		background-color: #FFFFFF;
		box-shadow: 5rpx -5rpx 5rpx #e0e0e0;
		position: fixed;
		bottom: 0;
		left: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		text{
			text-decoration: underline;
			color: #007AFF;
			font-size: 30rpx;
			font-weight: bold;
			margin: 0 40rpx;
		}
	}
</style>
