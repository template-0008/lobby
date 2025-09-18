<template>
  <div class="h-full w-full text-right">
    <div class="flex items-center gap-3 h-full text-sm" style="--kk-language-text-color: #303442">
      <TopMenu />
      <CustomMenus />
      <div class="flex items-center justify-end flex-1">
        <div class="flex items-center h100%">
          <img src="@/assets/custom-images/site/avatar.png" class="rounded-full mr-5px w38px w38px" />
        </div>
        <div class="flex flex-col items-start gap-1 text-14px">
          <span class="inline pl-3 text-16px font-600">{{ userStore.userInfo?.nickName }}</span>
          <div class="h100% flex flex-col justify-center items-start gap-1 overflow-hidden mr-4">
            <div class="flex items-center gap-3">
              <div class="flex items-center gap-1" style="--header-wallet-height: 30px;--header-wallet-text-size: 14px;--header-wallet-text-color:#ffffff;--header-wallet-bg-color:#00000000">
                <WalletAndCurrencySelector :show-title="false" :refreshAfterChange="true" />
                <span>{{ balance }}</span>
              </div>
              <el-button icon="refresh" :loading="refreshLoading" size="small" @click="onRefresh" circle />
              <div class="cursor-pointer w-6 h-6"
                :class="{ 'eye-icon-close': isHidden, 'eye-icon-open': !isHidden }" @click="isHidden = !isHidden"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- <div class="flex flex-col items-center gap-1 px-1 cursor-pointer group color-#303442" @click="openService">
        <div class="i-carbon:customer-service w-30px h-30px group-hover:color-#597ef7"></div>
        <span class="group-hover:color-#597ef7">{{ $t("web.i18nFront.label.server") }}</span>
      </div>
      <div class="cursor-pointer h-full relative">
        <div class="h-full flex flex-col justify-center  color-#303442 items-center gap-1 px-1 group kk-actvity"  @click="onClicmMenu('/activity')">
          <div class="i-carbon:gift w-30px h-30px group-hover:color-#597ef7"></div>
          <span class="group-hover:color-#597ef7">{{ $t("web.i18nFront.title.actTab") }}</span>
        </div>
        <div class="kk-menu-cover hidden absolute top-0 left-0 right-0 bottom-0 z-10" :style="{ display: isClicked ? 'block' : 'none' }"></div>
      </div>
      <div class="cursor-pointer relative h-full">
        <div class="flex flex-col justify-center  color-#303442 items-center gap-1 px-1 h-full group kk-app-d">
          <div class="i-carbon:mobile w-30px h-30px group-hover:color-#597ef7"></div>
          <span class="group-hover:color-#597ef7">APP</span>
        </div>
      </div> -->
      <div class="mr-3 flex gap-2">
        <div class="kk-btn-1 cursor-pointer flex-center h-9 relative w-16 z-1 bg-#ed5548" @click.prevent="handleClick('recharge')">
          <span>{{ $t("web.i18nFront.label.recharge")  }}</span>
        </div>
        <div class="kk-btn-2 cursor-pointer flex-center h-9 relative w-16 z-1 bg-#34b9da" @click.prevent="handleClick('withdraw')">
          <span>{{ $t("web.i18nFront.label.withdraw")  }}</span>
        </div>
        <div class="kk-btn-3 cursor-pointer flex-center h-9 relative w-16 z-1 bg-#3ac550" @click.prevent="handleClick('exchange')">
          <span>{{ $t("web.i18nFront.label.transfor")  }}</span>
        </div>
      </div>
        <!-- <el-dropdown :teleported="false" class="setting-item">

          <template #dropdown>
            <el-dropdown-menu class="min-w-[224px] !py-22px !px-3">
              <el-dropdown-item v-for="(menu, i) in menus" :key="menu.name" @click="onClicmMenu(menu.path)">
                <div class="flex-center gap-3 h-10">
                  <div>
                    <svg-icon :icon-class="menu.icon" :size="menu.iconSize" />
                  </div>
                  <span class="inline-block text-center w-full">
                    {{ menu.title }}
                  </span>
                </div>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button class="w-full text-left mt-2" size="large" @click="logout">
                  {{ $t("web.i18nFront.label.logout") }}
                </el-button>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown> -->
      <div class="bg-#7d322f w-110px h-11 flex-center gap-2 cursor-pointer" @click="logout">
        <img src="@/assets/images/new/logout-iocn.png" class="w-18px h-18px" />
        <span>{{ $t("system.i18nSystem.opration.logout") }}</span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import useLinkOpenFunc from '@/04-kk-component-admin/components/hooks/useLinkOpenFunc';
import { useAppStore, useChatStore, useUserStore } from "@/store";

const appStore = useAppStore();
const userStore = useUserStore();
const chatStore = useChatStore();

const { goToPayment } = useLinkOpenFunc();
const { t } = useI18n();
const router = useRouter();

let interval: NodeJS.Timeout | null = null
const refreshLoading = ref(false)
const isClicked = ref(false)
const isHidden = ref(false)

const balance = computed(() => {
  if (isHidden.value) {
    return "****";
  }
  const money = userStore?.balanceInfo?.balance
    ? userStore.balanceInfo.balance
    : "0.00";
  return `${money}`;
});

const menus = [
  {
    name: 'myPofile',
    icon: 'personalcard',
    iconSize: '20px',
    title: t("web.i18nFront.label.myPofile") ,
    path: '/personal/account',
    onClick: () => {
      onClicmMenu('/personal/account')
    }
  },
  {
    name: 'wallet',
    icon: 'wallet',
    iconSize: '18px',
    title: t("web.i18nFront.label.wallet"),
    path: '/personal/finance/wallet',
  },
  {
    name: 'myRewards',
    icon: 'myreward',
    iconSize: '20px',
    title: t("web.i18nFront.label.myRewards"),
    path: '/personal/proportion/rewards',
  },
  {
    name: 'myReport',
    icon: 'p-report',
    iconSize: '20px',
    title: t("web.i18nFront.label.myReport"),
    path: '/personal/report/lottery',
  },
  {
    name: 'accountDetail',
    icon: 'detail',
    iconSize: '20px',
    title: t("web.i18nFront.label.accountDetail"),
    path: '/personal/bill',
  },
  {
    name: 'agentShare',
    icon: 'share',
    iconSize: '20px',
    title: t("web.i18nFront.label.agentShare"),
    path: '/agent/account/open',
  },
  {
    name: 'agentReport',
    icon: 'a-report',
    iconSize: '20px',
    title: t("web.i18nFront.label.agentReport"),
    path: '/agent/report/team-full',
  },
  {
    name: 'platNoti',
    icon: 'icon-notice',
    iconSize: '20px',
    title: t("web.i18nFront.label.platNoti"),
    path: '/personal/announcement',
  },
  {
    name: 'helpCenter',
    icon: 'icon-notice',
    iconSize: '20px',
    title: t("web.i18nFront.label.helpCenter"),
    path: "/help",
  },
]
const onShowLogin = () => {
  userStore.setLoginModalState(true);
};

async function onRefresh() {
  refreshLoading.value = true;
  await userStore.getUserBanlance();
  refreshLoading.value = false;
}

const onClicmMenu = (path: string) => {
  isClicked.value = true
  router.push({ path });
  setTimeout(() => {
    isClicked.value = false
  }, 800)
};

function openService() {
  chatStore.openChat();
}

/**
 * 注销
 */
function logout() {
  ElMessageBox.confirm(
    t("web.i18nFront.hint.confirmOut"),
    t("system.i18nSystem.label.hint"),
    {
      type: "warning",
      lockScroll: false,
    }
  ).then(() => {
    onLogout();
  });
}

const onLogout = () => {
  userStore.logout().then(() => {
    userStore.resetToken();
  });
};

const handleClick = (path: string) => {
  if(path === "exchange") {
    router.push({ path: "/personal/finance/wallet" });
  } else if(path === "recharge") {
    goToPayment("deposit");
  } else if(path === "withdraw") {
    goToPayment("withdraw");
  }
};

const goGameRecord = () => {
  router.push({ path: '/personal/report/lottery' });
}

onUnmounted(() => {
  if (interval) {
    clearInterval(interval);
  }
  interval = null;
})

</script>
<style lang="scss" scoped>
.eye-icon-close {
  background: url('@/assets/images/new/eye-close-icon.png') no-repeat 50%;
}
.eye-icon-open {
  background: url('@/assets/images/new/eye-icon.png') no-repeat 50%;
}

.kk-btn-1::after {
  border: 1px solid #ed5548;
  box-sizing: border-box;
  content: "";
  display: block;
  height: 100%;
  left: -4px;
  position: absolute;
  top: -4px;
  width: 100%;
  z-index: -1;
}
.kk-btn-2::after {
  border: 1px solid #34b9da;
  box-sizing: border-box;
  content: "";
  display: block;
  height: 100%;
  left: -4px;
  position: absolute;
  top: -4px;
  width: 100%;
  z-index: -1;
}
.kk-btn-3::after {
  border: 1px solid #3ac550;
  box-sizing: border-box;
  content: "";
  display: block;
  height: 100%;
  left: -4px;
  position: absolute;
  top: -4px;
  width: 100%;
  z-index: -1;
}

</style>
