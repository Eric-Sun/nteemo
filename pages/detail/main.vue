<template>
	<div class='container' @touchmove="handletouchmove" @touchstart="handletouchstart">
		<!-- #ifdef APP-PLUS -->
		<uni-nav-bar left-icon="back" fixed="true" @clickLeft="navigateBack" title="帖子详情" status-bar="false"></uni-nav-bar>
		<!-- #endif-->
		<img v-if="isShare==1" @click='backHome' class='d-back-home' src='http://cdn.xcx.pemarket.com.cn/icon-Return%20to%20the%20home%20page.png'>
		<!-- <loginTips></loginTips> -->
		<sendReply v-if='sendVisible' @close-modal='closeModal' @reply-success='replySuccess' :postId='id' :replyId='replyId'
		 :isPostUserId='isPostUserId' :postAnonymous='postAnonymous' :content="content" :replyUserName='replyUserName'></sendReply>
		<div>
			<div class='head'>
				<img v-if="detailData.anonymous==0" class='head-img' :src='detailData.userAvatarUrl'>
				<img v-if="detailData.anonymous==1" class='head-img' :src='detailData.userAvatarUrl'>
				<div class='info'>
					<span>{{detailData.userName}}</span>
				</div>
			</div>

			<scroll-view class='body' scroll-y @scroll='onScroll($event)' :scroll-top="cursor" enable-back-to-top='true'>
				<div class='title'>
					<p class='big'>{{detailData.title}}</p>
				</div>
				<div v-if="includePostContent==1" class='content'>{{detailData.content}}</div>
				<div v-if="includePostContent==1" class="imgs" v-for="(img,imgIndex) in detailData.imgList">
					<img class="img" :src="img.url" @click="previewImg(imgIndex)">
				</div>

				<div class='reply'>
					<div class="reply-title">
						<div class="reply-length">评论 {{formatReplies.length}}</div>
					</div>

					<div class='reply-container' v-for='(item,originIndex) in formatReplies' :key='item.id' :data-id='item.id'>
						<div class='reply-head'>
							<img v-if="detailData.anonymous==0" class='head-img' :src='item.userAvatarUrl' />
							<img v-if="detailData.anonymous==1" class='head-img' :src='item.userAvatarUrl' />
						</div>
						<div class="reply-info">
							<div class="reply-info-user-info">
								<div class="reply-info-user-info-fullname">
									<span>{{item.userName}} </span>
									<span v-if="item.userId==detailData.userId" class="reply-info-user-info-fullname-louzhu">楼主</span>
								</div>
								<span class="reply-info-user-info-loushu">{{(pageNum * reply_size_per_page) + 1 + originIndex}}楼</span>
							</div>
							<div class='reply-content' :data-username="item.userName" :data-replyid='item.replyId' :data-anonymous="detailData.anonymous"
							 @click="showReplyModal($event)">{{item.content}}</div>
							<div v-if="item.imgList.length!=0">
								<img class='reply-imgList' :src="item.imgList[0].url">
							</div>
							<div class="reply-replyList-div" @click="navigateToReply" :data-replyid="item.replyId" :data-postid="id"
							 :data-anonymous="detailData.anonymous" v-if="item.replyList.length!=0">
								<div class="reply-replyList" v-for="(innerItem,innerIndex) in item.replyList" :key='innerItem.replyId'>
									<div class="reply-replyList-line">

										<div class="reply-replyList-content">
											<span class="reply-replyList-name">{{innerItem.userName}}</span>
											<span v-if="innerItem.userId==detailData.userId" class="reply-info-user-info-fullname-louzhu">楼主</span>

											<span>:{{innerItem.lastReplyId!=item.replyId?
                      '回复@'+innerItem.lastReplyUserName
                      +':'+innerItem.content:innerItem.content}}</span>
										</div>
									</div>

								</div>
								<div class="reply-replyList-tips" v-if="item.replySize>1" @click="navigateToReply($event)" :data-replyid="item.replyId"
								 :data-postid="id" :data-anonymous="detailData.anonymous">查看全部回复
								</div>
							</div>
							<!--              <img class='up-png' src="/static/go-bottom.png" mode='widthFix' @click.stop="goBottom">-->

							<!-- <div class="reply-foot">
								<div class="action">
									<img class="item" :data-username="item.userName" :data-replyid='item.replyId' :data-anonymous="detailData.anonymous"
									 @click.stop="showReplyModal($event)" src="../../static/comment.png" />
								</div>
							</div> -->
							<div class="reply-divide"></div>
						</div>
					</div>
				</div>
			</scroll-view>
		</div>
		<div class="controller">
			<div class="pagination">
				<div>
					<img class="left-arrow" src="../../static/left-arrow.png" @click="backPage()" />
				</div>
				<div class="pagination-info">{{pageNum+1}}/{{culculatePageNum}}页</div>
				<div>
					<img class="right-arrow" src="../../static/right-arrow.png" @click="goPage()" />
				</div>
			</div>
			<div class="actions">
				<img class="comment" @click="showReplyModal" src="../../static/comment.png" />
				<img v-if="detailData.isCollection==0" class="praise" @click="doOrUndoCollect" src="../../static/collect.png" />
				<img v-if="detailData.isCollection==1" class="praise" @click="doOrUndoCollect" src="../../static/collected.png" />
				<button class="wechat-share" open-type="share" plain="true" />
			</div>
		</div>
	</div>
</template>

<script>
	import login from '../../components/login'
	import {
		no_token_value,
		api,
		reply_size_per_page
	} from '../../const'
	import {
		passTime,
		debounce,
		getUserToken
	} from '../../utils'
	import sendReply from '../../components/sendReply'
	import loginTips from '../../components/loginTips'

	import {
		checkT
	} from '../../utils/net'


	const debounceOnScroll = () => debounce(function(e) {
		this.cursor = e.target.scrollTop
		// this.cursor = 0;
	})
	export default {
		components: {
			sendReply,
			login,
			loginTips
		},
		onUnload() {
			// const t = uni.getStorageSync("t");
			// if (t != 0) {
			this.$http({
				act: 'post.updateCursor',
				postId: this.id,
				pageNum: this.pageNum,
				cursor: this.cursor,
				userToken: this.userToken
			}, function() {})
			// }
			this.detailData = {}
			this.currentReplies = []

		},
		mounted() {
			var that = this;
			setTimeout(function() {
				that.cursor = that.cursorTmp;
			}, 1000)
			// this.cursor = this.cursorTmp;
		},
		computed: {
			culculatePageNum: function() {
				return Math.floor(this.level1ReplySize / reply_size_per_page) + 1;
			},
			formatCreateAt: function() {
				return passTime(this.detailData.createtime)
			},
			formatReplies: function() {
				return this.currentReplies.map(_ => {
					return {
						..._,
						createtime: passTime(_.createtime)
					}
				})
			},
			culBuildingIndex() {
				return function(originIndex) {
					return;
				}
			}
		},
		onShareAppMessage: function() {
			return {
				title: this.detailData.title, //分享内容
				path: '/pages/detail/main?postId=' + this.id + "&share=1" //分享地址
				// imageUrl: '/images/img_share.png',//分享图片
			}

		},
		methods: {
			navigateBack() {
				uni.navigateBack({

				})
			},
			// 点击左箭头，往前退一个页面
			backPage() {
				if (this.pageNum == 0) {
					return;
				} else if (this.pageNum == 1) {
					this.pageNum = this.pageNum - 1
					this.includePostContent = 1;
					uni.showLoading({
						title: '加载中'
					})
					this.getReplyData(this.pageNum);
				} else {
					this.pageNum = this.pageNum - 1
					this.getReplyData(this.pageNum);
				}
			},
			// 点击右箭头，往前进一个页面
			goPage() {
				if (this.pageNum == this.culculatePageNum) {
					return;
				} else if (this.pageNum == 0) {
					this.includePostContent = 0;
				}
				this.pageNum++;
				this.getReplyData(this.pageNum);
			},
			doOrUndoCollect() {
				var that = this;
				if (uni.getStorageSync("t") != 0) {
					var that = this;
					if (this.detailData.isCollection == 1) {
						this.$http({
							act: "collection.post.delete",
							t: this.t,
							postId: this.id
						}, function(res) {
							if (res.data.code == 30003) {
								uni.showToast({
									title: '已经取消收藏了',
									icon: 'none',
									duration: 2000
								})
							} else {
								if (res.data.code != null) {
									uni.showToast({
										title: '服务正在失去联系，请稍后',
										icon: 'none',
										duration: 2000
									})
								} else {
									uni.showToast({
										title: '取消收藏成功',
										icon: 'none',
										duration: 2000
									})
									that.detailData.isCollection = 0;
								}
							}
						}, function(res) {}, [30002, 30003]);

					} else {
						this.$http({
							act: "collection.post.add",
							t: this.t,
							postId: this.id
						}, function(res) {
							if (res.data.code == 30002) {
								uni.showToast({
									title: '已经收藏了',
									icon: 'none',
									duration: 2000
								})
							} else {
								if (res.data.code != null) {
									uni.showToast({
										title: '服务正在失去联系，请稍后',
										icon: 'none',
										duration: 2000
									})
								} else {
									uni.showToast({
										title: '收藏成功',
										icon: 'none',
										duration: 2000
									})
									that.detailData.isCollection = 1;
								}
							}
						}, function(res) {}, [30002, 30003])

					}
				} else {
					uni.showModal({
						title: "登陆",
						content: "需要登陆后才可以进行收藏",
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
				}



			},
			previewImg(index) {
				const urlList = []
				for (var i = 0; i < this.detailData.imgList.length; i++) {
					urlList.push(this.detailData.imgList[i].url);
				}
				uni.previewImage({
					current: this.detailData.imgList[index].url, // 当前显示图片的http链接
					urls: urlList // 需要预览的图片http链接列表
				})
			}
			// ,
			// getSearchTypeActionSheet() {
			//   var that = this
			//   var itemList = ['按时间正序', '按时间倒序']
			//
			//   uni.showActionSheet({
			//     itemList: itemList,
			//     success: function (res) {
			//       if (that.replySearchType != res.tapIndex) {
			//         that.replySearchType = res.tapIndex
			//         if (that.replySearchType == 0) {
			//           that.requestAction = 'reply.list'
			//         } else {
			//           that.requestAction = 'reply.reverseList'
			//         }
			//         that.getReplyData()
			//       }
			//
			//     }
			//   })
			// }
			,
			navigateToReply(e) {
				var replyId = e.currentTarget.dataset.replyid
				var postId = e.currentTarget.dataset.postid
				var anonymous = e.currentTarget.dataset.anonymous
				var postUserId = this.detailData.userId

				console.log("replyId" + replyId);
				console.log("postId" + postId);
				console.log("postUserId" + postUserId);

				uni.navigateTo({
					url: `../reply/main?replyId=${replyId}&postId=${postId}&anonymous=${anonymous}&postUserId=${postUserId}`
				})
			},
			onScroll: debounceOnScroll(),
			getPostData() {
				var that = this;
				uni.showLoading({
					title: '加载中'
				})
				this.$http({
					act: 'post.detail',
					postId: this.id,
					t: this.t,
					userToken: this.userToken
				}, function(res) {
					that.detailData = res.data
					that.level1ReplySize = res.data.level1ReplySize
					uni.hideLoading()
				})

			},
			/**
			 * pageNum==-1的时候为初始化
			 * pageNum其他的时候是强行跳转
			 * @param type
			 * @param pageNum
			 * @returns {Promise<void>}
			 */
			getReplyData(pageNum) {
				uni.showLoading({
					title: '加载中'
				})
				var that = this;
				this.$http({
					act: this.requestAction,
					pageNum: pageNum, //当等于-1的是从cursor位置读取相关的pageNum，当不等于-1的时候则强行获取该pageNum的数据
					postId: this.id,
					t: this.t,
					userToken: this.userToken
				}, function(res) {
					that.pageNum = pageNum;
					that.currentReplies = res.data.data
					that.pageNum = res.data.cursorInfo.pageNum;
					if (that.pageNum != 0)
						that.includePostContent = 0;
					if (pageNum == -1) {
						that.cursorTmp = res.data.cursorInfo.cursor;
						console.log(res.data.cursorInfo.cursor);
					} else {
						that.cursor = 0;
					}
					uni.hideLoading();
				})


			},
			goBottom() {
				this.top = this.currentReplies.length * 1000
			},
			backHome: function() {
				uni.reLaunch({
					url: '/pages/index/main'
				})
			},
			showReplyModal(e) {
				var that = this;
				this.t = uni.getStorageSync("t")
				checkT(this, this.t,
					function() {
						uni.showModal({
							title: "登陆",
							content: "需要登陆后才可以进行回复",
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
						that.content = ""
						var userId = uni.getStorageSync('userId')
						var userName = e.currentTarget.dataset.username
						var replyId = e.currentTarget.dataset.replyid
						var postAnonymous = that.detailData.anonymous
						if (userName) {
							that.content = `@${userName}:`
						} else {
							that.content = ''
						}
						if (userId == that.detailData.userId) {
							that.isPostUserId = true
						}
						that.postAnonymous = postAnonymous
						that.replyId = replyId
						that.replyUserName = userName
						that.sendVisible = true
					}
				);


			},
			replySuccess() {
				var that = this;
				this.closeModal()
				uni.showToast({
					title: '评论成功',
					icon: 'none',
					duration: 1000,
				})
				that.getReplyData(that.pageNum)
			},
			closeModal() {
				this.sendVisible = false
			},
			handletouchmove: function(event) {
				let currentX = event.touches[0].pageX;
				let tx = currentX - this.lastX;
				console.log("tx="+tx)
				if (tx > 50) {
					this.navigateBack();
					//  this.getList();  //调用列表的方法
				}
				if(tx<-50){
					// 看下一个内容
				}
			},
			handletouchstart: function(event) {
				// console.log(event)
				this.lastX = event.touches[0].pageX;
 			}
		},
		onLoad(option) {
			this.id = option.postId
			if (option.share == 1) {
				this.isShare = 1;
			}
		},
		onShow() {
			this.reply_size_per_page = reply_size_per_page;
			this.includePostContent = 1;
			this.userToken = getUserToken(this)
			var that = this;
			this.t = uni.getStorageSync("t")
			checkT(this, this.t,
				function() {
					uni.setStorageSync("t", no_token_value);
					that.t = 0;
					that.getPostData()
					that.getReplyData(-1)
				},
				function() {
					that.t = uni.getStorageSync("t")
					that.getPostData()
					that.getReplyData(-1)
				}
			);

		},
		onReady() {

		}

		,
		data() {
			return {
				detailData: {},
				remainReplies: [],
				currentReplies: [],
				content: '',
				sendVisible: false,
				id: '',
				replyId: '',
				timer: null,
				replyUserName: '',
				isPostUserId: false, //默认为不相同
				postAnonymous: 0,
				bottom: 0,
				pageNum: 0, //为当前的页码，从0开始
				// canGetMoreReply: true,
				replySearchType: 0, //回帖的排序规则，默认正序
				requestAction: 'reply.list',
				isShare: 0,
				t: 0,
				level1ReplySize: 0,
				includePostContent: 1, // 是否包含post信息，如果不包含说明是大于1的评论页面，包含为1，不包含为0
				cursor: -1,
				reply_size_per_page: 0,
				cursorTmp: 0,
				userToken: '',
				// 左右滑动的坐标
				lastX: 0			}
		}
	}
</script>

<style lang='scss' scoped>
	.container {
		margin-top: 10rpx;
		height: 100vh;

		.head {
			background-color: white;
			display: flex;
			align-items: center;
			padding-top: 20rpx;
			padding-bottom: 20rpx;

			.head-img {
				border-radius: 45rpx;
				width: 75rpx;
				height: 75rpx;
				margin-left: 20rpx;
			}

			.info {
				flex-direction: column;
				display: flex;
				margin-left: 26rpx;

				.time {
					font-size: $time-font-size;
					color: $borderColor;
				}
			}
		}

		.body {
			height: 90vh;
			width: 100vw;

			.imgs {
				padding-left: 30rpx;
				margin-top: 5rpx;
				font-size: 35rpx;
				display: inline-block;
				text-align: center;
				vertical-align: middle;

				.img {
					margin-right: 5rpx;
					width: 210rpx;
					height: 210rpx;
				}
			}

			.title {
				background-color: white;
				padding-left: 30rpx;

				.big {
					font-size: 40rpx;
					font-weight: 900;

				}
			}

			.content {
				white-space: pre-line;
				text-align: justify;
				text-justify: inter-ideograph;
				font-weight: normal;
				padding-left: 30rpx;
				padding-right: 30rpx;
				font-size: $content-font-size;
			}

			.reply {
				background-color: white;
				margin-bottom: 20rpx;

				.get-more-tips {
					text-align: center;
					font-size: 30rpx;
					padding-bottom: 70rpx;
				}

				.reply-title {
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					margin-bottom: 10rpx;
					margin-top: 10rpx;

					.reply-length {
						font-size: 30rpx;
						margin-left: 25rpx;
						font-weight: lighter;
					}

					.change-reply-search-type {
						font-size: 30rpx;
						margin-left: 25rpx;
						margin-right: 20rpx;
						font-weight: lighter;
					}
				}

				.reply-container {
					display: flex;

					.reply-head {
						margin-left: 25rpx;

						.head-img {
							border-radius: 45rpx;
							width: 75rpx;
							height: 75rpx;
						}
					}

					.reply-info {
						display: flex;
						flex-direction: column;
						margin-left: 20rpx;
						margin-bottom: 10rpx;
						margin-right: 50rpx;
						width: 100%;

						.reply-info-user-info {
							display: flex;
							flex-direction: row;
							justify-content: space-between;
							font-size: 30rpx;

							.reply-info-user-info-fullname {
								deplay: flex;
								flex-direction: row;

								.reply-info-user-info-fullname-louzhu {
									color: red;
									border: 0px solid rgba(93, 93, 93, 0.44);
									font-size: 25rpx;
								}
							}

							.reply-info-user-info-loushu {
								color: gray;
							}

							&>span {
								/*font-weight: lighter;*/
								/*color: rgb(245, 245, 239);*/
								font-size: $reply-content-font-size;
							}
						}
					}

					.reply-imgList {
						height: 210rpx;
						width: 210rpx;
					}

					.reply-content {
						width: 100%;
						white-space: pre-line;
						text-align: justify;
						text-justify: inter-ideograph;
						font-weight: normal;
						margin-top: 20rpx;
						font-size: $content-font-size;
					}

					.reply-foot {
						display: flex;
						justify-content: space-between;
						font-size: 25rpx;
						/*font-weight: lighter;*/
						margin-right: 10rpx;
						margin-top: 10rpx;

						.time {
							color: gray;
							margin-left: 10rpx;
						}

						.action {
							.item {
								height: 35rpx;
								width: 35rpx;
								/*margin-left: 50rpx;*/
							}
						}
					}

					.reply-divide {
						border-bottom: 1px solid #ccc;
						margin-bottom: 10rpx;
						margin-top: 20rpx;
						margin-right: 20rpx;
					}

					.reply-replyList-div {
						background-color: rgb(245, 245, 239);
						font-size: $reply-content-font-size;
						padding: 15rpx;

						.reply-replyList {
							.reply-replyList-line {
								display: flex;
								flex-direction: row;

								.reply-replyList-name {
									color: dodgerblue;
								}

								.reply-info-user-info-fullname-louzhu {
									color: red;
									border: 0px solid rgba(93, 93, 93, 0.44);
									font-size: 25rpx;
								}

								.reply-replyList-content {
									width: 100%;
									/*white-space: pre-line;*/
									text-align: justify;
									text-justify: inter-ideograph;
									font-size: $reply-content-font-size;
									/*font-weight: lighter;*/
								}

							}
						}

						.reply-replyList-tips {
							display: flex;
							color: dodgerblue;
						}
					}
				}

			}

			.reply-buton {
				border-radius: 50%;
				width: 100rpx;
				height: 100rpx;
				text-align: center;
				font-size: 30rpx;
				position: fixed;
				line-height: 100rpx;
				background-color: $color;
				top: 86vh;
				left: 81vw;
				color: white;
			}

			.up-png {
				width: 100rpx;
				right: 30rpx;
				bottom: 166rpx;
				position: fixed;
			}

		}

	}

	.controller {
		border-top: 1px solid #ccc;
		height: 100rpx;
		position: fixed;
		bottom: 0;
		width: 100%;
		box-sizing: border-box;
		background-color: white;
		display: flex;
		justify-content: space-between;

		.pagination {
			display: flex;
			flex-direction: row;
			margin-top: 20rpx;
			margin-left: 20rpx;

			/*justify-content: space-around;*/
			.left-arrow {
				height: 50rpx;
				width: 50rpx;
				margin-right: 20rpx;
			}

			.right-arrow {
				height: 50rpx;
				width: 50rpx;
				margin-left: 20rpx;
			}

		}

		.actions {
			display: flex;
			flex-direction: row;
			margin-right: 50rpx;
			margin-top: 20rpx;

			.comment {
				height: 50rpx;
				width: 50rpx;
				margin-right: 25rpx;
			}

			.praise {
				height: 50rpx;
				width: 50rpx;
				margin-right: 20rpx;
			}

			.wechat-share {
				height: 50rpx;
				width: 50rpx;
				/* margin-top: 10rpx; */
				margin-right: 10rpx;
				background-size: 50rpx 50rpx;
				background-repeat: no-repeat;
				background-image: url(~@/static/share.png);
				border: none;
			}

		}

	}

	.share {}

	.d-back-home {
		position: fixed;
		width: 96rpx;
		height: 96rpx;
		right: 30rpx;
		bottom: 286rpx;
		z-index: 10000;
	}
</style>
