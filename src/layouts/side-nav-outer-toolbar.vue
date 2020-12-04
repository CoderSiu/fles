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
      v-model:opened="menuOpened"
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
import { ref,reactive,computed, watch } from 'vue';
import {useRoute} from 'vue-router';

export default {
  name: "layout",
  components: {
    DxDrawer,
    DxScrollView,
    HeaderToolbar,
    SideNavMenu
  },
  props: {
    title: String,
    isXSmall: Boolean,
    isLarge: Boolean
  },
  setup(props){
    const menuOpened= ref(props.isLarge);
    let menuTemporaryOpened = false;
    const route = reactive(useRoute());
    const scrollViewRef = ref(null);
    const isLarge = ref(props.isLarge);

    const toggleMenu=(e)=>{
      const pointerEvent = e.event;
      pointerEvent.stopPropagation();
      if (menuOpened.value) {
        menuTemporaryOpened = false;
      }
      menuOpened.value = !menuOpened.value;
    }

    const handleSideBarClick=()=>{
      if (menuOpened.value === false) menuTemporaryOpened = true;
      menuOpened.value = true;
    }
    const drawerOptions = computed(()=>{
        const shaderEnabled = !props.isLarge;
        return {
          menuMode: props.isLarge ? "shrink" : "overlap",
          menuRevealMode: props.isXSmall ? "slide" : "expand",
          minMenuSize: props.isXSmall ? 0 : 60,
          menuOpened: props.isLarge,
          closeOnOutsideClick: shaderEnabled,
          shaderEnabled
        };
    });
    const headerMenuTogglerEnabled = computed(()=>{
        return props.isXSmall;
    });

    watch(isLarge,()=>{
      if (!menuTemporaryOpened) {
        menuOpened.value = props.isLarge;
      }
    })
    watch(route,()=>{
      if (menuTemporaryOpened || !props.isLarge) {
        menuOpened.value = false;
        menuTemporaryOpened = false;
      }
      scrollViewRef.value.scrollTo(0);
    })
    return {
      menuOpened,
      menuTemporaryOpened,
      menuItems,
      drawerOptions,
      headerMenuTogglerEnabled,
      scrollViewRef,
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