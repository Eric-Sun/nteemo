<template>
	<div class="container">
		<login :visible='loginVisible' v-on:modalClose='closeModalEvent' v-on:cancelModalClose='cancelModalClose'></login>
		<authorHead :user='user' v-on:login='login'></authorHead>
		<div class='list'>
			<!--<navigator class='list-item' @click.stop='setListFrom' url='/pages/list/main?type=collect' data-item='collect'>我的收藏</navigator>-->
			<navigator class='list-item' @click.stop='setListFrom' url='/pages/list/main?type=topic' data-item='topic'>最近话题</navigator>
			<navigator class='list-item' url='/pages/collection/main'>我的收藏</navigator>
			<button open-type='feedback'>意见反馈</button>
		</div>
	</div>
</template>

<script>
	import authorHead from '../../components/authorHead'
	import {
		api
	} from '../../const'
	import {
		checkT
	} from '../../utils/net'
	import login from '../../components/login'

	export default {
		data() {
			return {
				loginVisible: false,
				user: {}
			}
		},
		components: {
			authorHead,
			login
		},
		methods: {
			setListFrom(e) {
				uni.setStorageSync('fromItem', e.target.dataset.item)
			},
			closeModalEvent() {
				this.loginVisible = false
				this.getData()
			},
			login(){
				this.loginVisible = true
			},
			async getData() {
				const t = uni.getStorageSync('t')
				var that = this;
				this.$http({
					act: 'user.info',
					t: t
				}, function(res) {
					that.user = res.data
				})
			},
			cancelModalClose: function(){
				this.loginVisible = false
			}
		},
		onShow() {
			var that = this
			var t = uni.getStorageSync("t")
			checkT(t,
				function() {
					// that.loginVisible = true
				},
				function() {
					that.getData()
				}
			);
		}
	}
</script>

<style lang='scss' scoped>
	.container {
		height: 100vh;
		background-color: rgb(245, 245, 249);

		.list {
			margin-top: 30rpx;
			background-color: white;

			.list-item {
				height: 76rpx;
				line-height: 76rpx;
				margin: 0 30rpx;
				padding: 10rpx 0;
			}

			.list-item+.list-item {
				border-top: 1rpx solid $borderColor;
			}

			.margin {
				margin-top: 30rpx;
			}
		}
	}
</style>
