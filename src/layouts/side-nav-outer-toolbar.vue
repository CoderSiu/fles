<template>
  <div class="side-nav-outer-toolbar">
    <header-toolbar
      class="layout-header"
      :menu-toggle-enabled="true"
      :toggle-menu-func="toggleMenu"
      :title="title"
    />
    <dx-drawer
      class="layout-body"
      position="before"
      template="menu"
      :opened.sync="menuOpened"
      :opened-state-mode="drawerOptions.menuMode"
      :reveal-mode="drawerOptions.menuRevealMode"
      :min-size="drawerOptions.minMenuSize"
      :shading="drawerOptions.shaderEnabled"
      :close-on-outside-click="drawerOptions.closeOnOutsideClick"
    >
      <dx-scroll-view ref="scrollViewRef" class="with-footer">
        <slot />
        <slot name="footer" />
      </dx-scroll-view>
      <template #menu>
        <side-nav-menu
          :compact-mode="!menuOpened"
          @click="handleSideBarClick"
        />
      </template>
    </dx-drawer>
  </div>
</template>

<script>
import DxDrawer from "devextreme-vue/drawer";
import DxScrollView from "devextreme-vue/scroll-view";

import menuItems from "../app-navigation";
import HeaderToolbar from "../components/header-toolbar";
import SideNavMenu from "../components/side-nav-menu";
import { computed, watch } from 'vue';
import {useRoute} from 'vue-router';

export default {
  props: {
    title: String,
    isXSmall: Boolean,
    isLarge: Boolean
  },
  components: {
    DxDrawer,
    DxScrollView,
    HeaderToolbar,
    SideNavMenu
  },
  setup(props){
    const menuOpened= props.isLarge;
    const menuTemporaryOpened = false;
    const route = useRoute();

    const toggleMenu=((e)=>{
      const pointerEvent = e.event;
      pointerEvent.stopPropagation();
      if (this.menuOpened) {
        this.menuTemporaryOpened = false;
      }
      this.menuOpened = !this.menuOpened;
    });
    const handleSideBarClick=(()=>{
      if (this.menuOpened === false) this.menuTemporaryOpened = true;
      this.menuOpened = true;
    });
    const drawerOptions = computed(()=>{
        const shaderEnabled = !this.isLarge;
        return {
          menuMode: this.isLarge ? "shrink" : "overlap",
          menuRevealMode: this.isXSmall ? "slide" : "expand",
          minMenuSize: this.isXSmall ? 0 : 60,
          menuOpened: this.isLarge,
          closeOnOutsideClick: shaderEnabled,
          shaderEnabled
        };
    });
    const headerMenuTogglerEnabled = computed(()=>{
        return this.isXSmall;
    });
    const scrollView = computed(()=>{
      return this.$refs["scrollViewRef"].instance;
    });

    watch(props.isLarge,()=>{
      if (!this.menuTemporaryOpened) {
        this.menuOpened = props.isLarge;
      }
    })
    watch(route,()=>{
      if (this.menuTemporaryOpened || !props.isLarge) {
        this.menuOpened = false;
        this.menuTemporaryOpened = false;
      }
      this.scrollView.scrollTo(0);
    })
    return {
      menuOpened,
      menuTemporaryOpened,
      menuItems,
      drawerOptions,
      headerMenuTogglerEnabled,
      scrollView,
      toggleMenu,
      handleSideBarClick
    };
  }
};
</script>

<style lang="scss">
.side-nav-outer-toolbar {
  flex-direction: column;
  display: flex;
  height: 100%;
  width: 100%;
}

.layout-header {
  z-index: 1501;
}

.layout-body {
  flex: 1;
  min-height: 0;
}

.content {
  flex-grow: 1;
}
</style>
