<template>
	<div class="container">
		<!-- #ifdef APP-PLUS -->
		<uni-nav-bar title="我已发布" left-icon="back" fixed="true" @clickLeft="navigateBack" status-bar="false"></uni-nav-bar>
		<!-- #endif-->
		<!--<bottomAction v-if="bottomActionVisible" @close-modal="closeModal" :postId="deletedPostId"></bottomAction>-->
		<div class='margin' v-for='item in currentData' :key='item.id'>
			<card :item='item' :hidden='true' @reloadCardList="reloadCardList" @close-modal='closeModal'></card>
		</div>

	</div>
</template>
<script>
	import {
		api,
		barId
	} from '../../const'
	import card from '../../components/card'
	import bottomAction from '../../components/bottomAction'
	import {
		checkT
	} from '../../utils/net'
	import login from '../../components/login'



	export default {
		data() {
			return {
				currentData: [],
				t: 0,
				bottomActionVisible: false,
				deletedPostId: 0,
				type: '',
				otherUserId: 0,
			}
		},
		components: {
			card,
			bottomAction,
			login
		},
		onLoad() {

		},
		onShow(options) {
			this.currentData=[];
			var that = this;
			this.t = uni.getStorageSync("t")
			console.log("collection t=" + that.t)
			checkT(this,this.t,
				function() {
					uni.showModal({
						title: "登陆",
						content: "需要登陆后才可以查看已发布信息",
						confirmText: "去登陆",
						success: function(res) {
							if (res.confirm) {
								// that.loginVisible = true;
								//#ifndef APP-PLUS
								uni.navigateTo({
									url: "../login/main"
								})
								//#endif
								
								//#ifdef APP_PLUS
								uni.navigateTo({
									url: "../login/mobile"
								})
								//#endif
							} else if (res.cancel) {}
						}
					})
				},
				function() {
					that.t = uni.getStorageSync('t')
					that.loadData()
				});
		},
		methods: {
			navigateBack() {
				uni.navigateBack({

				})
			},
			async loadData() {
				var that = this;
				this.$http({
					act: 'post.recentlyPostList',
					t: this.t,
					barId:barId,
					pageNum: 0,
					size: 20
				}, function(res) {
					console.log(res)
					that.currentData = res.data.list;
					console.log(that.currentData )
				})
			},
			// closeModal: function () {
			//   this.bottomActionVisible = false
			// },
			// showActionModal: function (data) {
			//   this.bottomActionVisible = true
			//   this.deletedPostId = data
			//
			// },
			reloadCardList() {
				this.loadData()
			}
		}
	}
</script>
<style lang='scss' scoped>
	.container {
		background-color: rgb(245, 245, 249);
		min-height: 100vh;

		.margin {
			margin-bottom: 20rpx;
		}
	}
</style>
