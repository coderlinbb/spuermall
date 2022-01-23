<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive">
      <slot v-if="!isActive" name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabBarItem',
  props: {
    path: String,
    activeColor: {
      type: String,
      default: '#ff8198'
    }
  },
  data() {
    return {
      // isActive:false
    }
  },
  computed: {
    isActive() {
      //home ->对应item1(/home) = true
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle() {
      return this.isActive ? { color: this.activeColor } : {}
    }
  },
  methods: {
    itemClick() {
      this.$router.push(this.path)
    }
  }
}
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
  /*margin-top: 3px;*/
}
.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 4px;
}
</style>