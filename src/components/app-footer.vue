<template>
  <div class="content-block">
    <footer class="footer">
      Copyright © 2011-{{new Date().getFullYear()}} {{title}} Inc.
      <br />All trademarks or registered trademarks are property of their
      respective owners.
    </footer>
  </div>
</template>
<script>
import {getCurrentInstance} from 'vue'
export default {
  setup(){
    const internalInstance = getCurrentInstance()
    const title = internalInstance.appContext.config.globalProperties.appInfo.title; 
    return{
      title
    }
  }
}
</script>

<style lang="scss">
@import "../themes/generated/variables.base.scss";

.footer {
  display: block;
  color: rgba($base-text-color, alpha($base-text-color) * 0.7);
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding-top: 20px;
  padding-bottom: 24px;
}
</style>
