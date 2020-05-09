<template>
	<view class="container">
		<uni-nav-bar left-icon="back" fixed="true" @clickLeft="navigateBack" title="登陆页面" status-bar="false"></uni-nav-bar>
		<div class="mobileInput">
			<div class="location">+86</div>
			<input class="mobile" placeholder="请输入手机号" v-model="mobile"></input>
		</div>
		<div class="messageCodeInput">
			<input class="messageCode" placeholder="请输入验证码" v-model="messageCode"></input>
			<div class="tips" :disabled="disabled" @click.stop="getMessageCode">{{messageCodeTips}}</div>
		</div>
		<div class="loginBtnDisable" v-show="messageCode.length==0||mobile.length==0">
			<div class="login-word">登陆</div>
		</div>
		<div class="loginBtn" v-show="messageCode.length!=0&& mobile.length!=0" @click="mobileLogin">
			<div class="login-word" >登陆</div>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mobile: "",
				messageCode: "",
				messageCodeTips: "获取验证码",
				countDownSec: 60,
				interval: ""
			}
		},
		methods: {
			navigateBack() {
				uni.navigateBack({
			
				})
			},
			mobileLogin: function() {
				var that = this;
				if (!this.checkMobile()) {
					return;
				}
				if (!this.checkMessageCode()) {
					return;
				}
				this.$http({
					act: "user.mobileMessageCodeLogin",
					mobile: this.mobile,
					messageCode: this.messageCode
				}, function(res) {
					console.log("mobile login suc. t=" + res.data.t + " userId=" + res.data.userId)
					uni.setStorageSync('t', res.data.t);
					uni.setStorageSync('userId', res.data.userId)
					uni.showToast({
						title: "登录成功",
						duration: 1000,
						complete: function() {
							uni.navigateBack({
							})
						}
					})
				});
			},
			getMessageCode: function() {
				var that = this;
				if (!this.checkMobile()) {
					return;
				}
				this.$http({
					act: "user.sendMessageCode",
					mobile: this.mobile
				}, function(res) {
					that.countDown();
					that.interval = setInterval(that.countDown, 1000);
				});


			},
			countDown: function() {
				var that = this;
				if (that.countDownSec == 0) {
					that.disabled = false;
					that.messageCodeTips = '获取验证码';
					that.countDownSec = 60;
					clearInterval(that.interval);
				} else {
					--that.countDownSec;
					that.messageCodeTips = that.countDownSec + "秒后重新获取";
				}
			},
			checkMobile: function() {
				if (this.mobile.length == 0) {
					uni.showToast({
						title: '手机号不能为空',
						icon: 'none',
						duration: 2000
					})
					return false;
				} else {
					return true;
				}
			},
			checkMessageCode: function() {
				if (this.messageCode.length == 0) {
					uni.showToast({
						title: '验证码不能为空',
						icon: 'none',
						duration: 2000
					})
					return false;
				} else {
					return true;
				}
			}
		}
	}
</script>

<style lang='scss' scoped>
	.container {
		display: flex;
		flex-direction: column;
		/* align-items: center; */

		.mobileInput {
			margin-left: 100rpx;
			margin-top: 352rpx;
			display: flex;
			flex-direction: row;
			font-size: 36rpx;
			height: 98rpx;

			.location {
				width: 104rpx;

			}

			.mobile {
				margin-left: 20rpx;
			}
		}

		.messageCodeInput {
			display: flex;
			flex-direction: row;
			height: 100rpx;
			font-size: 36rpx;

			.messageCode {
				margin-left: 100rpx;
				width: 234rpx;
			}

			.tips {
				margin-left: 112rpx;
			}
		}

		.loginBtnDisable {
			width: 544rpx;
			height: 77rpx;
			margin-left: 101rpx;
			margin-top: 45rpx;

			background: #C4C4C4;
			border-radius: 30rpx;
			display: flex;

			.login-word {
				margin-left: 233rpx;
				margin-top: 14rpx;
				margin-bottom: 14rpx;
				align-items: center;
				text-align: center;
				line-height: 52rpx;
				color: #FFFFFF;
			}
		}

		.loginBtn {
			width: 544rpx;
			height: 77rpx;
			margin-left: 101rpx;
			margin-top: 45rpx;

			background: #F2C94C;
			border-radius: 30rpx;
			display: flex;

			.login-word {
				margin-left: 233rpx;
				margin-top: 14rpx;
				margin-bottom: 14rpx;
				align-items: center;
				text-align: center;
				line-height: 52rpx;
				color: #FFFFFF;
			}
		}

	}
</style>
