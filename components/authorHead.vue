<template>
	<div class='header'>
		<img :src='user&&user.avatarUrl' class='img'>
		<span class='span'>{{user&&user.nickName}}</span>


		<img v-if='user.avatarUrl==undefined' src='https://20190305test.oss-cn-beijing.aliyuncs.com/no_user.jpg' class='img'
		 @click.stop="login">
		<span v-if='user.avatarUrl==undefined' class='span' @click.stop="login">未登录</span>
	</div>
</template>
<script>
	import {
		passTime
	} from '@/utils/index'

	export default {
		props: {
			user: Object
		},
		computed: {
			formatCreateAt() {
				return passTime(this.user && this.user.createtime).slice(0, -1)
			}
		},
		methods: {
			login: function() {
				this.$emit("login")
			}
		}
	}
</script>

<style lang='scss' scoped>
	.header {
		display: flex;
		flex-direction: column;
		align-items: center;
		color: $color;
		font-size: 30rpx;
		background-color: white;

		.img {
			width: 200rpx;
			height: 200rpx;
			border-radius: 50%;
			margin-top: 30rpx;
		}

		.span {
			margin-top: 20rpx;
		}
	}
</style>
