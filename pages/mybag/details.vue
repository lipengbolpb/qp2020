<template>
	<view class="content">
		<view class="template_1">
			<go-back :style="{'top':safeAreaTop}"></go-back>
			<scroll-view scroll-y="true" class="list_box" @scrolltolower="lower">
				<view class="tab">
					<text :class="tabId==1?'cur':''" @click="tab(1)">红包记录</text>|<text @click="tab(2)" :class="tabId==2?'cur':''">我的奖品</text>
				</view>
				<view class="moneyList" v-show="tabId==1">
					<view class="details" v-for="(item,index) in moneyList" :key="index">
						<view class="lf" v-if="item.giftsName!='已发红包'">
							<text>{{item.giftsName}}</text>
							<text class="earnTime">{{item.earnTime}}</text>
						</view>
						<view class="lf" v-else>
							<text>{{item.extractStatus==0?'红包提现':item.extractStatus==1?'提现失败_金额已退还':item.extractStatus==2?'提现处理中':''}}</text>
							<text class="earnTime">{{item.earnTime}}</text>
						</view>
						<view :class="['rg',item.giftsName=='已发红包'&&item.extractStatus==0?'black':'']">
							<text>{{item.giftsName=='已发红包'&&item.extractStatus==0?'-':item.extractStatus==2?'':item.extractStatus==1?'':'+'}}{{item.earnMoney}}</text>元
						</view>
					</view>
				</view>
				<view class="prizeList" v-show="tabId==2">
					<view class="prize" v-for="(item,index) in prizeList" :key="index">
						<view class="prizeMsg">
							<image :src="item.prizeImg" class="prizeImg"></image>
							<view>
								<text class="prizeName">{{item.prizeName}}</text>
								<text>中奖时间：{{item.earnTime}}</text>
								<text>兑奖截至：{{item.expireTime}}</text>
							</view>
						</view>
						<image :src="imgUrl+'/icon_expire.png'" mode="widthFix" class="expire" v-if="item.expireFlag==1"></image>
						<button :class="['handle','lq']" v-else-if="item.useStatus==0" @click="openInput(index)">领取</button>
						<button class="handle" v-else @click="openInput(index)">查看</button>
					</view>
				</view>
			</scroll-view>
			<view class="tips_bottom" v-show="tabId==1">只显示近30天的记录</view>
			<view class="msg_box" v-show="writeMsg">
				<view class="">
					<view class="msglist">
						<view class="border">
							<image :src="imgUrl+'/txxx_title.png'" mode="widthFix" class="tips_tittle"></image>
							<input type="text" :value="username" placeholder="姓名" :disabled="isDisabled" @input="inputName"/>
							<input type="text" :value="idcard" placeholder="身份证号码" maxlength="18" :disabled="isDisabled" v-if="needIdcard" @input="inputIdcard"/>
							<input type="text" :value="tel" placeholder="手机号" maxlength="11" :disabled="isDisabled" @input="inputTel"/>
							<input type="text" :value="pickerText" @click="openAddres" placeholder="地区" disabled/>
							<input type="text" :value="address" placeholder="详细地址" :disabled="isDisabled" @input="inputAddress"/>
							<view class="yzcode_box" v-if="!isDisabled">
								<input type="text" placeholder="验证码" maxlength="4" class="yz_code" :value="yzcode" @input="inputYzm"/>
								<text @click="getVerifyCode" class="get_yz">{{sec==0?'获取验证码':sec+'秒后再次获取'}}</text>
							</view>
							<button class="btn_com" @click="submsg">{{isDisabled?'我 知 道 了':'提 交 信 息'}}</button>
						</view>
						<image :src="imgUrl+'/tips_bottom.png'" mode="widthFix" class="tips_bottom"></image>
					</view>
					<image :src="imgUrl+'/icon_close.png'" mode="widthFix" class="close" @click="writeMsg=false" v-show="!isDisabled"></image>
				</view>
			</view>
			<view class="tips_box" v-show="showTip">
				<view class="tips_msg">
					<text>信息提交成功</text>
					<button class="btn_com" @click="showTip=false">我 知 道 了</button>
				</view>
			</view>
			<simple-address ref="simpleAddress" :pickerValueDefault="cityPickerValueDefault" @onConfirm="onConfirm" themeColor='#007AFF'></simple-address>
		</view>
	</view>
</template>

<script>
	let count = 20;
	import goBack from '@/components/back.vue';
	import simpleAddress from '@/components/simple-address/simple-address.nvue';
	export default {
		data() {
			return {
				tabId:1,
				imgUrl:getApp().globalData.imgUrl,
				cityPickerValueDefault: [0, 0, 0],
				moneyCurrentPage:1,
				prizeCurrentPage:1,
				moneyNext:true,
				prizeNext:true,
				moneyList:'',
				prizeList:'',
				writeMsg:false,
				isDisabled:false,
				username:'',
				address:'',
				tel:'',
				yzcode:'',
				template:'',
				idcard:'',
				sec:0,
				stop:false,
				index:0,
				showTip:false,
				needIdcard:false,
				pickerText:'',
				safeAreaTop:getApp().globalData.safeAreaTop?getApp().globalData.safeAreaTop+'px':'64rpx'
			}
		},
		onLoad() {
			this.queryAllGiftsList();
		},
		methods: {
			tab(type){
				this.tabId=type;
				if(!this.moneyList){
					this.queryAllGiftsList();
				}else if(this.prizeCurrentPage==1&&!this.prizeList){
					this.queryPrizeList();
				}
			},
			openAddres() {
				if(this.isDisabled){
					return false;
				}
				this.$refs.simpleAddress.open();
			},
			onConfirm(e) {
				this.pickerText = e.label;
			},
			inputYzm(e){
				this.yzcode = e.detail.value;
			},
			inputName(e){
				this.username = e.detail.value;
			},
			inputTel(e){
				this.tel = e.detail.value;
			},
			inputAddress(e){
				this.address = e.detail.value;
			},
			inputIdcard(e){
				this.idcard = e.detail.value;
			},
			queryAllGiftsList() {
				uni.showLoading({
					title:'加载中'
				})
				uni.request({
					url: this.$Store.state.requestUrl + '/gifts/queryAllGiftsList',
					method: 'POST',
					data: {
						"openid": getApp().globalData.openid,
						// "searchFlag": 3,
						"currentPage": this.moneyCurrentPage,
						"count": count,
						"projectServerName":this.$Store.state.serverName
					}
				}).then(res=>{
					uni.hideLoading()
					let [e,r] = res;
					if(r){
						if(r.data.reply&&(!r.data.reply.objList||r.data.reply.objList.length<count)){
							this.moneyNext = false;
						}else{
							this.moneyNext = true;
						}
						if(this.moneyCurrentPage==1){
							this.moneyList = r.data.reply.objList;
						}else{
							if(r.data.reply.objList&&r.data.reply.objList.length>0){
								this.moneyList = this.moneyList.concat(r.data.reply.objList);
							}
						}
					}else{
						console.log(e);
						uni.showModal({
							title:'扫码记录提示',
							content:'系统繁忙',
							showCancel:false
						})
					}
				}).catch(err=>{
					uni.hideLoading();
					console.log(err)
				})
			},
			queryPrizeList(type) {//暂时不做数据缓存切换，每次直接调接口
				uni.request({
					url: this.$Store.state.requestUrl + '/gifts/queryPrizeList',
					method: 'POST',
					data: {
						"openid": getApp().globalData.openid,
						"currentPage": this.currentPage,
						"count": count,
						"projectServerName":this.$Store.state.serverName
					}
				}).then(res=>{
					let [e,r] = res;
					if(r){
						if(r.data.result.code==0){
							if(r.data.result.businessCode==0){
								if(this.prizeCurrentPage==1){
									this.prizeList = r.data.reply.prizeRecordAry;
								}else{
									if(r.data.reply.prizeRecordAry&&r.data.reply.prizeRecordAry.length>0){
										this.prizeList = this.prizeList.concat(r.data.reply.prizeRecordAry);
									}
								}
								if(!r.data.reply.prizeRecordAry||r.data.reply.prizeRecordAry.length<1){
									this.prizeNext = false;
								}else if(r.data.reply.prizeRecordAry.length<count){
									this.prizeNext = false;
								} else{
									this.prizeNext = true;
								}
							} else if(r.data.result.businessCode==1){
								uni.showModal({
									title:'提示',
									content:'你还未参与过扫码活动',
									showCancel:false
								})
								this.prizeNext = false;
							} else {
								uni.showModal({
									title:'提示',
									content:r.data.result.msg?r.data.result.msg:'系统开了个小差~',
									showCancel:false
								})
								this.prizeNext = false;
							}
						}else{
							uni.showModal({
								title:'大奖列表接口提示',
								content:r.data.result.msg?r.data.result.msg:'系统开了个小差~',
								showCancel:false
							})
							this.prizeNext = false;
						}
					}else{
						console.log(e);
						uni.showModal({
							title:'大奖列表接口提示',
							content:'系统繁忙',
							showCancel:false
						})
						this.prizeNext = false;
					}
				})
			},
			lower(){//上拉加载
				if(this.moneyNext&&this.tabId==1){
					this.moneyCurrentPage++;
					this.queryAllGiftsList()
				} else if(this.prizeNext&&this.tabId==2){
					this.prizeCurrentPage++;
					this.queryPrizeList();
				} else {
					uni.showToast({
						title:'没有更多了记录了',
						icon:'none'
					})
				}
				
			},
			openInput(index){
				this.writeMsg = true;
				this.index = index;
				if(this.prizeList[index].useStatus==1){//已领取
					this.isDisabled = true;
					this.tel = this.prizeList[index].phoneNum;
					this.username = this.prizeList[index].userName;
					this.address = this.prizeList[index].address.split('-')[3];
					this.pickerText = `${this.prizeList[index].address.split('-')[0]}-${this.prizeList[index].address.split('-')[1]}-${this.prizeList[index].address.split('-')[2]}`;
				}else{
					this.isDisabled = false;
				}
			},
			submsg() {
				if(this.isDisabled){
					this.writeMsg = false;
					return false;
				}
				if(this.username==''||this.username==' '){
					uni.showModal({
						title: "提示",
						content: '请填写正确的姓名哦！~',
						showCancel: false
					})
				}else if(this.needIdcard&&!this.$Store.dispatch(this.idcard)){
					uni.showModal({
						title: "提示",
						content: '请填写正确的身份证号码哦！~',
						showCancel: false
					})
				}else if(!(/^[1]{1}[0-9]{10}$/).test(this.tel)){
					uni.showModal({
						title: "提示",
						content: '请输入正确的手机号',
						showCancel: false
					})
				}  else if(this.pickerText==''){
					uni.showModal({
						title: "提示",
						content: '请选择所在地区',
						showCancel: false
					})
				} else if (this.address==''||this.address==' ') {
					uni.showModal({
						title: "提示",
						content: '请输入正确的详细地址',
						showCancel: false
					})
				} else if(!/^[0-9]{4}$/.test(this.yzcode)){
					uni.showModal({
						title: "提示",
						content: '请输入验证码',
						showCancel: false
					})
				} else {
					uni.showLoading({
						title:'提交中'
					})
					uni.setStorage({
						key:'address',
						data:getApp().globalData.address
					})
					uni.request({
						url: this.$Store.state.requestUrl + '/user/savePrize',
						method: 'POST',
						data: {
							"openid": getApp().globalData.openid,
							"address": this.pickerText+'-'+this.address,
							"username": this.username,
							"idcard": 'idcard',
							"skukey": this.prizeList[this.index].skukey,
							"phonenum": this.tel,
							"prizeInfoKey": this.prizeList[this.index].infoKey,
							"prizeVcode": this.prizeList[this.index].prizeVcode,
							"projectServerName":this.$Store.state.serverName,
							"captcha":this.yzcode
						}
					}).then(res=>{
						uni.hideLoading();
						let [e,r] =res;
						if(r){
							if(r.data.result.code==0){
								if(r.data.result.businessCode == 0){//提交成功
									this.showTip = true;
									this.yzcode = '';
									this.writeMsg = false;
									this.prizeList = '';
									this.prizeCurrentPage = 1;
									this.prizeNext = true;
									this.queryPrizeList();
								}else{
									uni.showModal({
										title: "提示",
										content: r.data.result.msg?r.data.result.msg:'系统开了个小差',
										showCancel: false
									})	
								}
							}else{
								uni.showModal({
									title: "大奖提交提示",
									content: r.data.result.msg?r.data.result.msg:'系统开了个小差',
									showCancel: false
								})	
							}
						}else{
							console.log(e)
							uni.showModal({
								title: "大奖提交提示",
								content: '系统繁忙',
								showCancel: false
							})
						}
					})
				}
			},
			timeout() {
				let timer = null;
				this.sec -= 1;
				if (this.sec <= 0 || this.stop) {
					return this.sec = 0;
				}
				timer = setTimeout(() => {
					this.timeout()
				}, 1000)
			},
			getVerifyCode(){
				if(this.sec!=0){
					return false;
				}else if (!(/^1[0-9]{10}$/.test(this.tel))) {
					uni.showModal({
						title: "提示",
						content: "请输入正确的手机号",
						showCancel: false
					})
				} else {
					uni.showLoading({
						title:'获取验证码',
						mask:true
					})
					uni.request({
						url:this.$Store.state.requestUrl+'/user/getCaptcha',
						method:'POST',
						data:{
							phonenum:this.tel,
							"projectServerName":this.$Store.state.serverName
						}
					}).then(res=>{
						uni.hideLoading()
						let [e,r] = res;
						if(r){
							if(r.data.result.code==0&&r.data.result.businessCode==0){//成功
								this.sec = 60;
								this.timeout();//开始倒计时
							}else if(r.data.result.code==0&&r.data.result.businessCode==2){
								uni.showModal({
									title: "提示",
									content: '您填写的手机号错误，发送验证码失败！',
									showCancel: false
								})
							}else{
								uni.showModal({
									title: "获取验证码提示",
									content:'验证码获取失败！请稍后再试并确认手机号是否输入正确',
									showCancel: false
								})
							}
						}else{
							uni.showModal({
								title: "获取验证码提示",
								content: '系统繁忙',
								showCancel: false
							})
						}
					})
				}
			}
		},
		components:{
			goBack,
			simpleAddress
		}
	}
</script>

<style lang="scss">
	.template_1{
		background: url($bgUrl+'/index_bg.png?v=2') no-repeat top;
		background-size:100% auto;
		box-sizing: border-box;
		padding: 0 30rpx;
		.list_box{
			margin: 168rpx auto 0;
			height: 80%;
			background: #FFFFFF;
			border-radius: 8rpx;
			.tab{
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 120rpx;
				border-bottom: 1rpx #e5e5e5 solid;
				padding: 0 50rpx;
				color: #bcbcbc;
				text{
					font-size: 36rpx;
					width: 250rpx;
					text-align: center;
					line-height: 120rpx;
					box-sizing: border-box;
				}
				text.cur{
					background: url($bgUrl+'/tab_bg.png') no-repeat bottom;
					background-size: 100% auto;
					color: #000000;
				}
			}
		}
		// 扫码明细
		.moneyList{
			overflow: hidden;
			width: 100%;
			.details{
				padding: 0 50rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 119rpx;
				border-bottom: 1rpx #e5e5e5 solid;
				.lf{
					font-size:30rpx;
					color: #000;
				}
				.earnTime{
					font-size:24rpx ;
					color: #323232;
					display: block;
				}
				.rg{
					font-size: 20rpx;
					color: #d9231f;
					text{
						font-size: 40rpx;
					}
				}
				.rg.black{
					color: #000;
				}
			}
		}
		// 大奖列表
		.prizeList{
			width: 100%;
			overflow: hidden;
			.prize{
				display: flex;
				justify-content: space-between;
				padding: 0 50rpx;
				align-items: center;
				height: 119rpx;
				border-bottom: 1rpx #e5e5e5 solid;
				overflow: hidden;
				.prizeMsg{
					display: flex;
				}
				.prizeImg{
					width: 118rpx;
					height: 96rpx;
					margin-right: 16rpx;
				}
				.prizeMsg text{
					display: block;
					font-size: 24rpx;
					color: #949494;
				}
				.prizeMsg .prizeName{
					font-size: 30rpx;
					color: #000;
					width: 340rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
				.expire{
					width: 80rpx;
				}
				button{
					width: 80rpx;
					height: 50rpx;
					line-height: 50rpx;
					border-radius: 8rpx;
					box-sizing: border-box;
					font-size: 24rpx;
					color: #636363;
					border: #323232 solid 2rpx;
					padding: 0;
					margin: 0;
				}
				button.lq{
					color: #cc5655;
					border: 2rpx #cf3c35 solid;
				}
			}
		}
		.tips_bottom{
			font-size: 22rpx;
			color: #FFFFFF;
			text-align: center;
		}
	}
	// 填写信息
	.msg_box{
		width: 100%;
		height: 100%;
		overflow: hidden;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 2;
		background-color: rgba($color: #000000, $alpha: .8);
		>view{
			display: flex;
			width: 100%;
			height: 100%;
			flex-direction: column;
			align-items: center;
			justify-content: center;
		}
		.close{
			width: 80rpx;
			margin-top: 20rpx;
		}
		.msglist{
			width: 656rpx;
			border-radius: 8rpx;
			padding: 24rpx;
			box-sizing: border-box;
			overflow: hidden;
			background:linear-gradient(top,#009040,#005e2a);
			position: relative;
			.border{
				border-radius: 8rpx;
				padding: 0 27rpx;
				background:#FFFFFF;
				overflow: hidden;
				width: 100%;
				box-sizing: border-box;
				.tips_tittle{
					width: 236rpx;
					display: block;
					margin:80rpx auto 0;
				}
				input{
					border: 2rpx #4eac6d solid;
					height: 80rpx;
					border-radius: 8rpx;
					box-sizing: border-box;
					margin-top: 22rpx;
					position: relative;
					z-index: 1;
					padding-left: 20rpx;
					color: #000;
					font-size: 38rpx;
				}
				.yzcode_box{
					border: 2rpx #4eac6d solid;
					height: 80rpx;
					border-radius: 8rpx;
					margin-top: 22rpx;
					position: relative;
					z-index: 1;
					display: flex;
					justify-content: space-between;
					width: 100%;
					input{
						border: 0;
						margin: 0;
						width: 60%;
					}
					text{
						font-size: 30rpx;
						color: #4eac6d;
						line-height: 80rpx;
						width: 40%;
						text-align: center;
					}
				}
				.btn_com{
					width: 328rpx;
					height: 78rpx;
					line-height: 66rpx;
					position: relative;
					z-index: 1;
					margin: 90rpx auto 43rpx;
					font-size: 32rpx;
				}
			}
			.tips_bottom{
				width: 100%;
				display: block;
				position: absolute;
				bottom: 0;
				left: 0;
			}
		}
	}
	// 领奖提示
	.tips_box{
		width: 100%;
		height: 100%;
		background-color: rgba($color: #000000, $alpha: 0.7);
		overflow: hidden;
		position: absolute;
		left: 0;
		top:0;
		z-index: 2;
		.tips_msg{
			width: 450rpx;
			height: 641rpx;
			background: url($bgUrl+'/sennmsg_success.png') no-repeat center;
			background-size: 100%;
			text-align: center;
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%,-50%);
			padding-top: 330rpx;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			flex-direction: column;
			text{
				font-size: 40rpx;
				color: #000000;
				font-weight: bold;
			}
			.btn_com{
				width: 330rpx;
				height: 76rpx;
				line-height: 66rpx;
				margin-bottom: 40rpx;
				font-size:32rpx ;
			}
		}
	}
</style>
