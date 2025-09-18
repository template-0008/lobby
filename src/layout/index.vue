<template>
  <div class="wh-full overflow-hidden relative">
    <NavBar />
    <!-- body -->
    <div class="app-main">
      <AppMain />
    </div>
    <FloatMenu />
    <CustomModal v-model="showNoticeModal" destroy-on-close :title="$t('web.i18nFront.label.platNoti')" width="960px" :show-close="false" :show-ok="false">
      <PlatformNotice />
    </CustomModal>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from "@/store";
import CustomModal from "@/components/CustomModal/index.vue";
import PlatformNotice from "@/components/PlatformNotice/index.vue";

const appStore = useAppStore();

const showNoticeModal = computed({
  get: () => appStore.showNoticeModal,
  set: (value) => appStore.toggleNoticeModal(value),
})

</script>

<style lang="scss" scoped>
.app-main {
  position: relative;
  width: 100%;
  height: calc(100% - $navbar-height);
  overflow-x: hidden;
  overflow-y: auto;
  // background-color: #f3faff;
}
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
