<template>
  <div>
    <input :value="currentValue" @input="inputload">
    
    <!-- or <input :value="currentValue" @input="$emit('input', $event.target.value)事件为input 参数为">-->
  </div>
</template>
<script>
// 子组件 https://blog.csdn.net/xiasohuai/article/details/88419502
export default {
  name: 'Input',
  data() {
    return {
      currentValue: this.value,
    };
  },
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
  },
  watch: { //监听input里面的值变化
  // v-on:input="currentValue = $event.target.value"  这里也相当于监听input事件  合起来就是一个v-model语法糖
    value(val) {
      this.setCurrentValue(val);
    }
  },
  methods: {
    setCurrentValue(value) {  //如果值改变就重新赋值
      if (value === this.currentValue) return;     
      this.currentValue = value;
    },
    inputload(event){  //绑定的input事件
//     1.事件后不使用圆括号，event被自动当作实参传入
// 2.使用圆括号，必须显式的传入event对象，如果不传入可能最终找到的是全局的window .event
    console.log(event)
      let value = event.target.value;   
      //$event的值 原生 dom 事件就是事件对象，自定义组件的事件就是 $emit 的第一个参数值   
      this.$emit('input', value)
      //此处的this为子组件触发父组件的方法  所以this指向为父组件
      //input为emit（jq的trigger方法）触发的事件 value为需要传递的参数
    
    //不过为了触发父级的事件我们并不是只有$emit可以实现
      //1`可以通过$parent来直接触发父级的事件      methods:{
    //         childfun:function(){
    //            this.$parent.change1(1111)
    // };//触发父级事件
    //         }

//通过props以参数的形式把方法传过来
    }
  }
}
</script>