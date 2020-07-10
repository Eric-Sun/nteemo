<template>
	<div class='container-card'>
		<div class='head'>
			<img v-if="item.anonymous==0" class='head-img' :src='item.userAvatarUrl' @click.stop='goAuthorPage' :data-userid="item.userId">
			<img v-if="item.anonymous==1" class='head-img' :src='item.userAvatarUrl' :data-userid="item.userId">
			<div class='info'>
				<span class="name">{{item.userName}}</span>

				<!--        <span class='time'>{{formatCreateAt}}</span>-->
			</div>
			<div v-if="item.star==1" class="title-star">【精华帖子】</div>
			<span class="top">
				<img class="ellipsis" src="@/static/ellipsis.png" :data-postid="item.postId" @click.stop="loadActions($event)" />
			</span>
			<span v-if="new_notice==0" class="top-xin">
				新
			</span>
			<!--      <span v-if="hidden" class="top">楼主有新的回复</span>-->
		</div>
		<div class='body' @click.stop="goDetail($event)">
			<div class="topicList">
				<div v-for='topic in item.topicList' :key='topic.id' class="topic">
				#{{topic.name}}
				</div>
			</div>
			
			<div class="title">{{item.title}}</div>
			<pre v-if="item.isContentLong==0">{{item.content}}</pre>
			<pre v-if="item.isContentLong==1">{{item.content}}<span>查看全部</span></pre>
			<div class="imgs" v-for="(img,index) in item.imgList">
				<img class="img" :src="img.url" @click.stop="previewImg(index)">
			</div>

			
		</div>
		<div  class='foot'>
			<div class="foot-icons">
				<div class="reply-items" @click.stop="goDetail($event)">
					<img class="reply-img" src="@/static/comment.png" />
					<div class="reply-count">{{item.replyCount}}</div>
				</div>
				<button class="wechat-share" open-type="share" plain="true" />
			</div>
			<div class="line"> </div>
		</div>
	</div>

</template>

<script>
	import {
		passTime
	} from '@/utils/index'
	import {
		api
	} from '@/const'

	export default {
		props: {
			item: Object,
			new_notice: {
				default: 1,
				type: Number
			}
		},
		onload() {},
		methods: {
			onShareAppMessage: function() {
				return {
					title: this.item.title, //分享内容
					path: '/pages/detail/main?postId=' + this.id + "&share=1" //分享地址
					// imageUrl: '/images/img_share.png',//分享图片
				}

			},
			previewImg(index) {
				const urlList = []
				for (var i = 0; i < this.item.imgList.length; i++) {
					urlList.push(this.item.imgList[i].url);
				}
				uni.previewImage({
					current: this.item.imgList[index].url, // 当前显示图片的http链接
					urls: urlList // 需要预览的图片http链接列表
				})
			},
			goAuthorPage(e) {
				const cachedUserId = uni.getStorageSync('userId')
				const cardUserId = e.currentTarget.dataset.userid
				if (cachedUserId == cardUserId) {
					uni.switchTab({
						url: `/pages/me/main`
					})
				} else {
					uni.navigateTo({
						url: `../user/main?otherUserId=${cardUserId}`
					})
				}
			},
			goDetail() {
				uni.navigateTo({
					url: `../detail/main?postId=${this.item.postId}`
				})
			},
			loadActions(e) {
				var that = this
				var t = uni.getStorageSync('t')
				var currentUserId = uni.getStorageSync('userId')
				var itemList = []
				if (currentUserId == this.item.userId) {
					itemList = ['删除', '收藏']
				} else {
					itemList = ['收藏']
				}

				uni.showActionSheet({
					itemList: itemList,
					success: function(res) {

						if (itemList.length == 2 && res.tapIndex == 0) {
							uni.showModal({
								title: '删除',
								content: '请确认此贴是否删除',
								success(res) {
									if (res.confirm) {
										uni.request({
											url: api,
											data: {
												act: 'post.delete',
												t: t,
												postId: that.item.postId
											},
											success: function(res) {
												if (res.data.code != null) {
													uni.showToast({
														title: '成功',
														icon: 'success',
														duration: 2000,
														success: function() {
															that.$emit('reloadCardList')
														}
													})
												}

											},
											fail: function(res) {
												uni.showToast({
													title: tips_msg.server_error,
													icon: 'none',
													duration: 2000
												})
											}
										})

									} else if (res.cancel) {}
								}
							})
						} else {
							// 收藏
						}
					},
					fail: function(res) {
						// console.log(res.errMsg)
					}
				})
			}
		}
	}
</script>

<style lang='scss' scoped>
	.container-card {
		/*height: 330rpx;*/
		padding-left: 30rpx;
		padding-right: 30rpx;
		padding-top: 15rpx;
		background-color: white;
		display: flex;
		flex-direction: column;
		/*justify-content: space-between;*/

		.head {
			color: black;
			display: flex;
			align-items: center;

			.head-img {
				border-radius: 45rpx;
				width: 60rpx;
				height: 60rpx;
			}

			.info {
				flex-direction: column;
				display: flex;
				margin-left: 20rpx;

				.name {
					font-weight: bold;
					font-size: $userName-font-size;
					font-color: $userName-font-color;
				}

			}

			.top {
				position: absolute;
				right: 40rpx;
				color: red;

				.ellipsis {
					width: 50rpx;
					height: 50rpx;
				}
			}

			.title-star {

				color: red;
			}

			.top-xin {
				position: absolute;
				right: 35rpx;
				color: red;
			}
		}

		.body {
			// color: $color;
			margin-top: 10rpx;
			margin-bottom: 20rpx;
			margin-left: 10rpx;
			margin-right: 20rpx;

			.imgs {
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

			&>pre {
				white-space: pre-line;
				text-align: justify;
				text-justify: inter-ideograph;
				font-weight: normal;
				font-size: $content-font-size;
				font-family: SimSun;

				&>span {
					color: #5355ff;
				}
			}

			.title {
				font-size: 40rpx;
				font-weight: 900;
				margin-bottom: 10rpx;

			}
			
			.topicList{
				display: flex;
				flex-direction: row;
				
				.topic{
					color:red;
					width:200rpx;
					background-color: green;
				}
			}
		}

		.foot {
			display: flex;
			flex-direction: column;
			/* justify-content: space-between; */

			.foot-icons {
				display: flex;
				flex-direction: row;
				line-height: 58rpx;

				.reply-items {
					display: flex;
					flex-direction: row;

					.reply-img {
						margin-left: 15rpx;
						height: 43rpx;
						width: 43rpx;

					}

					.reply-count {
						margin-left: 15rpx;
						font-size:24rpx;
						font-weight: 100;
						
						align-items: center;
						text-align: center;
					}

				}

				.wechat-share {
					height: 45rpx;
					width: 45rpx;
					margin-right: 15rpx;
					background-size: 43rpx 43rpx;
					background-repeat: no-repeat;
					background-image: url(~@/static/share.png);
					border: none;
				}

			}



			.line {
				/* margin-top:5rpx; */
				height: 1rpx;
				border-bottom: solid 1rpx #C5C5C5;
			}

		}
	}
</style>
