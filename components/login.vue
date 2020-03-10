<template>
	<div class='mask' v-if='visible'>
		<div class="container">
			<!-- #ifdef MP-WEIXIN -->
			<div style='width:100%;padding-left:30rpx;font-size: 28rpx;margin-top:30rpx;'>1、同意当前小程序获取我的微信头像；</div>
			<div style='width:100%;padding-left:30rpx;font-size: 28rpx;margin-top:30rpx;'>2、同意当前小程序获取我的微信昵称等其他信息；</div>
			<!-- #endif-->
			
			<!-- #ifdef MP-TOUTIAO -->
			<div style='width:100%;padding-left:30rpx;font-size: 28rpx;margin-top:30rpx;'>1、同意当前小程序获取我的头条头像；</div>
			<div style='width:100%;padding-left:30rpx;font-size: 28rpx;margin-top:30rpx;'>2、同意当前小程序获取我的头条昵称等其他信息；</div>
			<!-- #endif-->
			<div class="button-group">
				<!-- #ifdef MP-WEIXIN -->
				<button open-type="getUserInfo" @getuserinfo="bindGetUserInfo" class="save-btn">授权登陆</button>
				<!-- #endif-->
				<!-- #ifdef MP-TOUTIAO -->
				<button @click="bindGetUserInfo" class="save-btn">授权登陆</button>
				<!-- #endif-->
				<button @click.stop="cancel" class="save-btn">暂不登陆</button>
			</div>
		</div>
	</div>

</template>
<script>
	import {
		api,
		tips_msg
	} from '../const'

	export default {
		props: {
			visible: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				accesstoken: ''
			}
		},
		methods: {
			cancel() {
				this.$emit("cancelModalClose");
			},
			getLoginAction() {
				//#ifdef MP-WEIXIN
				return "user.wechatLogin";
				//#endif
				//#ifdef MP-TOUTIAO
				return "user.toutiaoLogin";
				//#endif
			},
			bindGetUserInfo(e) {
				var that = this
				uni.login({
					success: function(res) {
						var code = res.code // 微信登录接口返回的 code 参数，下面注册接口需要用到
						uni.getUserInfo({
							withCredentials: true,
							success: function(res) {
								console.log(res)
								uni.setStorageSync('userInfo', res.userInfo)
								var iv = res.iv
								var encryptedData = res.encryptedData
								// 下面开始调用注册接口
								that.$http({
										act: that.getLoginAction(),
										code: code,
										encryptedData: encryptedData,
										iv: iv
									},
									function(res) {
										uni.setStorageSync('t', res.data.t);
										uni.setStorageSync('userId', res.data.userId)
										uni.showToast({
											title: "登录成功",
											duration: 1000,
											complete: function() {
												that.$emit("modalClose");
											}
										})
									}
								)
							},
							fail: function(res) {
								this.$emit("modalClose");
							}
						})
					},
					fail: function(res) {
						console.log(res)
					}
				})

			}
		}
	}
</script>
<style lang='scss' scoped>
	.mask {
		position: fixed;
		background-color: white;
		height: 100vh;
		width: 100vw;
		z-index: 2333;

		.container {
			display: flex;
			flex-direction: column;
			align-items: center;

			.input {
				border-bottom: 2rpx solid $borderColor;
				width: 600rpx;
				margin-top: 200rpx;
			}

			.button {
				width: 600rpx;
				margin-top: 150rpx;
			}

			.tips {
				font-size: 22rpx;
				color: #888;
				margin-top: 10rpx;
			}

			.button-group {
				display: flex;
				flex-direction: row;

				.save-btn,
				.cancel-btn {
					margin-left: 20rpx;
					line-height: 80rpx;
					text-align: center;
					margin-top: 30rpx;
					border-radius: 6rpx;
					box-sizing: border-box;
				}
			}


			.save-btn {
				background-color: red;
				color: white;
			}
		}
	}
</style>
