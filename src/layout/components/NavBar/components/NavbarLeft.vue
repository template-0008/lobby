<template>
  <div class="flex gap-2 shrink-0 min-w-200px mr-4">
    <a class="flex-center" href="javascript:void(0)" @click="goHome">
      <img class="h-[46px] object-contain" v-if="logo" :src="logo" alt="" />
    </a>
  </div>
</template>

<script setup lang="ts">
import { PlatformImageCode } from "@/01-kk-system/allHttp/models/common";
import { localImg } from "@/01-kk-system/allUtils/utils";
import { useAppStore } from "@/store";

const router = useRouter();
const appStore = useAppStore();

const logo = ref("");

const animatStyle = computed(() => ({
  transform: appStore.sidebar.opened ? "rotateZ(0deg)" : "rotateZ(180deg)",
}));

function toggleSideBar() {
  appStore.toggleSidebar();
}

function goHome() {
  router.replace("/");
}

async function fetchLogo() {
  if (window.location.origin.includes('kk-template')) {
    logo.value = localImg('custom-images/app/logo.png')
    return
  }
  logo.value = await appStore.getAppLogoByCode(PlatformImageCode.PC_LOGO)
}

onBeforeMount(() => {
  fetchLogo();
});
</script>
