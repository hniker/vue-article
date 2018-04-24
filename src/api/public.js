/**
 * Created by summermac on 2017/12/1.
 */
/**
 * @description 描述：导入公共的依赖项
 *
 */
import $ from 'jquery'
import Vue from 'vue'
import Router from 'vue-router'
import config from './config'
Vue.use(Router)

export default {
  l: function (...args) {
    if (config.LOG_SHOW) {
      console.log(args)
    }
  },
  myCookie: {
    setCookie (name, value) {
      var Days = 30
      var exp = new Date()
      exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000)
      document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString()
    },
    getCookie (name) {
      var arr = null
      var reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
      if (document.cookie.match(reg)) {
        arr = document.cookie.match(reg)
        return unescape(arr[2])
      } else {
        return null
      }
    },
    delCookie (name) {
      var exp = new Date()
      exp.setTime(exp.getTime() - 1)
      var cval = this.getCookie(name)
      if (cval !== null) {
        document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString()
      }
    }
  },
  xhr: {
    // 组装API接口地址【不含参数】
    getRequestURL: function (options) {
      var siteId = parseInt(options.siteId) || 0 // 目前仅支持 0,1 整数型
      var site = []
      // site[1] = 'http://test.juefei88.com/' // 测试API地址 [正式]
      site[1] = 'http://dmyzs.test.juefei88.com/' // 测试API地址 [正式]
      // site[1] = 'http://js.juefei88.com/' // 测试API地址 [正式]
      var apiServer = site[siteId]
      var act = options.act || 'Index.Index.index' // 控制器
      if (siteId === 1) {
        apiServer += act
      }
      return apiServer.replace(/&$/gi, '')
    },
    // POST获取远程数据 ajax方式跨域
    getPost: function (options, callback) {
      var siteId = parseInt(options.siteId) || 0 // 用于判断API地址
      var postUrl = this.getRequestURL(options) // 获取提交地址
      var postData = options.data // 获取要提交的参数
      if (siteId === 1) {
        // postData['token'] = this.myCookie.getCookie('token')
        // postData['client'] = 'pc_store'
      }
      $.post(postUrl, postData, function (data, status) {
        if (status === 'success') {
          // data = JSON.parse(data)
          if (data.ret === 402 || data.ret === 210) {
            // location.href = 'http://seller-view.1c100.cn/#/'
          } else if (data.ret === 401) {
            // 一般错误 提示信息 不跳转
            alert('无权')
            new Router().push('/error401')
          } else if (data.ret !== 200) {
            // 一般错误 提示信息 不跳转
            callback(data)
          } else {
            // 抛出到操作页面
            // callback(data)
            callback(data)
          }
        } else {
          alert('接口错误，请联系管理员！')
        }
      })
    }
  },
  myStorage: {
    setLocal (argN, argV) {
      localStorage.setItem(argN, argV)
    },
    getLocal (argN) {
      return localStorage.getItem(argN)
    },
    remLocal (argN) {
      localStorage.removeItem(argN)
    }
  }
}
