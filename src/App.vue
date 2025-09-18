<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<script setup lang="ts">
import { useAppStore, useChatStore, useGameStore, useUserStore } from "@/store";
import { useDesignSettingStore } from "./store/modules/designSetting";
import useAutoThemeSwitcher from "./hooks/useAutoThemeSwitcher";
import { transOut2System } from "./04-kk-component-admin/components/hooks/commonUtil";
import { PlatformImageCode } from "./01-kk-system/allHttp/models/common";

const userStore = useUserStore();
const chartStore = useChatStore();
const gameStore = useGameStore();

const appStore = useAppStore();
const designStore = useDesignSettingStore()
const { initializeThemeSwitcher } = useAutoThemeSwitcher(designStore)

const isDark = useDark()
const toggleDark = useToggle(isDark)

const locale = computed(() => appStore.locale);

// 金额自动转出
const moneyfromOutToSystem = () => {
  transOut2System()
};

const init = async () => {
  gameStore.getAvailableOuterGames();
  gameStore.getAvailableOuterSubGamesEntry();
  appStore.getAppLogoByCode(PlatformImageCode.PC_FAVICON)
  // await appStore.getDiffConfig()
  // await gameStore.fetchAllGroups()
  // // 客服
  // await chartStore.loadChat();
  await Promise.allSettled([
    chartStore.loadChat(), // 客服
    appStore.getDiffConfig(), // 差异化
    gameStore.fetchAllGroups() // 游戏分组
  ])
  if (userStore.userInfo?.userID) {
    chartStore.setContactInfo({
      name: userStore.userInfo?.nickName,
      description: userStore.userInfo?.userName,
      userID: userStore.userInfo?.userID,
    });
  }
};
onBeforeMount(() => {
  init();
});
onMounted(() => {
  toggleDark(false)
  initializeThemeSwitcher()
  // 监听点击
  document.addEventListener('click', moneyfromOutToSystem, true)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', moneyfromOutToSystem, true)
})
</script>
