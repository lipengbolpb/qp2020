<template>
	<view class="ladder_page" v-if="showLadder&&showLadderPage" :setIndex="index">
		<view class="ladder_box">
			<image :src="imgUrl+'icon_close.png'" mode="widthFix" @click="closeLadder" class="closeLadder"></image>
			<view class="ladder_bg">
				<text class="tip_1">{{ladderTxtOne}}</text>
				<text class="tip_2">{{ladderTxtTwo}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgUrl:'https://xcxsite.vjifen.com/v/static/qp2020/ladder/',
				showLadderPage:true,
				ladderTxtOne:'',
				ladderTxtTwo:''
			};
		},
		props:{
			showLadder:{
				type:Boolean,
				default:false
			},
			index:{
				type:Number,
				default:'0'
			},
			provinceCode:{
				type:String,
				default:''
			}
		},
		updated() {
			
		},
		mounted() {
			
		},
		watch:{
			index:{
				handler(val){
					console.log(val)
					this.setLadderTxt(val,this.$props.provinceCode);
				}
			}
		}, 
		methods:{
			closeLadder(e){
				this.showLadderPage = false;
			},
			setLadderTxt(index,provinceCode){
				if(provinceCode=="U"){
					switch (index){
						case 1:
							this.ladderTxtOne = '健康\n步步高红包';
							this.ladderTxtTwo = '下一个更高';
							break;
						case 2:
							this.ladderTxtOne = '快乐\n步步高红包';
							this.ladderTxtTwo = '下一个更高';
							break;
						case 3:
							this.ladderTxtOne = '运气\n步步高红包';
							this.ladderTxtTwo = '下一个更高';
							break;
						case 4:
							this.ladderTxtOne = '福气\n步步高红包';
							this.ladderTxtTwo = '下一个更高';
							break;
						case 5:
							this.ladderTxtOne = '财气\n步步高红包';
							this.ladderTxtTwo = '下一个更高';
							break;	
						case 6:
							this.ladderTxtOne = '青啤虽好\n莫贪杯';
							this.ladderTxtTwo = '明日再战';
							break;		
						default:
							this.ladderTxtOne = '青啤虽好\n莫贪杯';
							this.ladderTxtTwo = '明日再战';
							break;
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.ladder_page{
		width: 100%;
		height: 100%;
		background: rgba(#000,.7);
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.ladder_box{
		width: 520rpx;
		height: 690rpx;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		.closeLadder{
			height: auto;
			width: 45rpx;
			margin-right: 25rpx;
			margin-bottom: 5rpx;
		}
		.ladder_bg{
			width: 520rpx;
			height: 640rpx;
			background: url('https://xcxsite.vjifen.com/v/static/qp2020/ladder/ladder_bg.png') no-repeat center;
			background-size: 100% auto;
			display: flex;
			justify-content: center;
			flex-direction: column;
			color: #e30000;
			text-align: center;
			.tip_1{
				font-size: 51rpx;
				font-weight: bold;
			}
			.tip_2{
				font-size: 28rpx;
				line-height: 80rpx;
			}
		}
	}
</style>
