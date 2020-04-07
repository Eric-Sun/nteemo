<template>
	<div class="container">
		<!-- #ifdef APP-PLUS -->
		<uni-nav-bar title="我的收藏" left-icon="back" @clickLeft="navigateBack" status-bar="false"></uni-nav-bar>
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
		onLoad(options) {
	

		},
		onShow() {
			this.currentData=[];
			var that = this;
			this.t = uni.getStorageSync("t")
			console.log("collection t=" + that.t)
			checkT(this,this.t,
				function() {
					uni.showModal({
						title: "登陆",
						content: "需要登陆后才可以进行发布",
						confirmText: "去登陆",
						success: function(res) {
							if (res.confirm) {
								// that.loginVisible = true;
								uni.navigateTo({
									url:"../login/main"
								})
							} else if (res.cancel) {}
						}
					})
				},
				function() {
					this.type = options.type
					console.log('type=' + this.type)
					this.t = uni.getStorageSync('t')
					this.otherUserId = options.otherUserId
					this.loadData()
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
					act: 'collection.post.list',
					t: this.t,
					pageNum: 0,
					size: 10
				}, function(res) {
					that.currentData = res.data.list.map(_ => {
						return _.post;
					})
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
