<template>
  <div class="wh-full overflow-hidden">
    <NavBar />
    <!-- body -->
    <div class="relative w-full h-full flex app-body">
      <!-- <div class="sidebar-box" v-show="isOpenSidebar">
        <Sidebar v-show="isOpenSidebar" class="sidebar-container" />
      </div> -->
      <AppMain />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from "@/store";

const appStore = useAppStore();

const isOpenSidebar = computed(() => appStore.sidebar.opened);
</script>

<style lang="scss" scoped>
.sidebar-box {
  flex-shrink: 0;
  width: $sidebar-width;
  background-color: $menu-background;
}
.sidebar-container {
  position: fixed;
  left: 0;
  top: $navbar-height;
  bottom: 0;
  z-index: 99;
  width: $sidebar-width;
  background-color: $menu-background;
  transition: width 0.28s;
}
</style>
