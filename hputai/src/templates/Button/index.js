import zxbutton1 from "./button.vue";

// zxbutton.install=(Vue)=>{
//     Vue.component(zxbutton.name,zxbutton)
// }

const zxButton ={
    install:function(Vue){
        Vue.component('zxButton',zxbutton1)
    }
}
export default zxButton