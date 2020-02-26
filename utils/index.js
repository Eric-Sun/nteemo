// import { POINT_CONVERSION_COMPRESSED } from "constants";

function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

// 计算离当前多久
export function passTime (time) {
  const now = Date.now()
  const t = (now - time) / 1000 / 60// 分钟
  let result
  if (t / 60 / 24 / 30 / 12 > 1) {
    result = `${Math.floor(t / 60 / 24 / 30 / 12)}年前`
    return result
  } else if (t / 60 / 24 / 30 > 1) {
    result = `${Math.floor(t / 60 / 24 / 30)}月前`
    return result
  } else if (t / 60 / 24 > 1) {
    result = `${Math.floor(t / 60 / 24)}天前`
    return result
  } else if (t / 60 > 1) {
    // 小时
    result = `${Math.floor(t / 60)}小时前`
    return result
  } else {
    // 分钟
    result = `${Math.floor(t)}分钟前`
    return result
  }
}

// 获取当前的路由
export function getURL () {
  return getCurrentPages().slice(-1)[0].route
}

export function debounce (fn, interval = 300) {
  let timeout = null
  return function () {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      fn.apply(this, arguments)
    }, interval)
  }
}

/**
 * 获取用户的token,在未登录情况下用作唯一用户标示
 */
export function getUserToken(context){
	let userToken = uni.getStorageSync("userToken")
	if(userToken==''){
		// 尝试通过服务端获取,然后插入到storage中
		// 如果没有的话会帮你创建一个新的,如果有的话会直接把跟userId对应过的返回给客户端
		context.$http({
			act: 'user.getUserToken'
		}, function(res) {
			console.log(res)
			uni.setStorageSync('userToken',res.data.userToken)
			console.log("getUserToken from server. userToken="+res.data.userToken)
			return res.userToken;
		})
	}else{
		console.log("getUserToken from cache. userToken="+userToken)
		return userToken;
	}
}

