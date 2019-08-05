import axios from 'axios'
import Router from '../router/index.js'

//各种请求的方式
var root = process.env.API_ROOT
// 请求拦截
// axios.interceptors.request.use((config) => {
//   // 请求之前重新拼装url
 //  config.url = root + config.url.slice(4)
//   return config
// })
// 请求拦截
axios.interceptors.request.use(
	config => {

 // config.url = root + config.url.slice(4)
		return config
	},
	error => {
		console.log(error)
		Promise.reject(error)
	}
)
export default{
  // get请求方法

  getdata (url, params) {
    axios.defaults.headers.common['token'] = this.getdataCookie('usertoken');
    let shuj = axios.get(url, {params})
      .then(function (response) {
        if(response.data.code==1){
          return response
        }
        if(response.data.code==-1){
          Router.push({path:'/login'})
        }
      
      })
      .catch(function (error) {
        console.log(error)
      })
    return shuj
  },
  // post请求方法
  postdata (url, params) {
  
    axios.defaults.headers.common['token'] = this.getdataCookie('usertoken');
    let shuj = axios.post(url, params)
      .then(function (response) {
     
        return response
      })
      .catch(function (error) {
        return console.log(error)
      })
  
    return shuj
  },
    // delete请求方法
    deletedata (url, params) {

    
      axios.defaults.headers.common['token'] = this.getdataCookie('usertoken');
   
      let shuj = axios.delete(url, {params})
        .then(function (response) {
          return response
        })
        .catch(function (error) {
          return console.log(error)
        })
  
      return shuj
    },
      // put请求方法
  putdata (url, params) {

    axios.defaults.headers.common['token'] = this.getdataCookie('usertoken');
    
    let shuj = axios.put(url, params)
      .then(function (response) {
        return response
      })
      .catch(function (error) {
        return console.log(error)
      })

    return shuj
  },
  // 读取cookie的值
  // 读取缓存
  getdataCookie (cname) {
    // return 1
    var name = cname + '='
    var ca = document.cookie.split(';')
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i].trim()
      if (c.indexOf(name) == 0) return c.substring(name.length, c.length)
    }
    // 路由跳转
   // window.location.href = ''
   Router.push({path:'/login'})
    // Router.push("/")
  }

}
