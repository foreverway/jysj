<template>
  <div>
    <input :value="currentValue" @input="inputload">
    
    <!-- or <input :value="currentValue" @input="$emit('input', $event.target.value)">-->
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
      let value = event.target.value;      
      this.$emit('input', value)
    }
  }
}
</script>