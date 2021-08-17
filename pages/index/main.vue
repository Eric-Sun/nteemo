<template>
	<div class='container'>
		<!-- 	<swiper class="swiper">
			<swiper-item>
				<img class="bn1"></img>
			</swiper-item>
		</swiper>
		 -->
		 <swiper>
			 <swiper-item v-for="banner in bannerInfoList" :key='banner.id' >
				 <image :src="banner.imgUrl"></image>
			 </swiper-item>
		 </swiper>
		<video  id="myVideo" :src="course.data[currentIndex].url"
		 autoplay=true enable-danmu danmu-btn controls @ended="ended"></video>
		<!-- <image v-if="!a" src="../../static/bn1.png" @click=""></image> -->
		
		<div class="">
			<div></div>
		</div>
	</div>
</template>

<script>
	import card from '@/components/card'
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import {
		api,
		barId,
		tips_msg
	} from '@/const'
	import login from '@/components/login'
	import {
		checkT
	} from '@/utils/net'
	import {
		debounce,
		getUserToken
	} from '@/utils'


	export default {
		data() {
			return {
				videoContext: null,
				videoUrlList:[],
				currentIndex:0,
				bannerInfoList:[],
				course:{}
			}
		},

		components: {
			card,
			login,
			uniNavBar
		},
		onReady: function(res) {
			this.videoContext = uni.createVideoContext('myVideo', this);
			this.videoContext.requestFullScreen({
				direction: 90
			});
		},
		onLoad: function() {
			var that = this;
			this.$http({ 
				act: 'course.get',
				t: this.t,
				id:1
			}, function(res) {
				that.course=res.data;
				console.log(that.course);
			})
			
			this.$http({
				act: 'banner.getInfo',
				t: this.t,
				bannerPlanId:1
			}, function(res) { 
				that.bannerInfoList=res.data.data;
			})
			
			
		},
		methods: {
			ended: function() {
				this.currentIndex++;
			},
			
		}



	}
</script>

<style lang="scss" scoped>
	.container {
		background-color: rgb(245, 245, 249);
		font-size: 30rpx;
		// width: 100vw;
	}
</style>
