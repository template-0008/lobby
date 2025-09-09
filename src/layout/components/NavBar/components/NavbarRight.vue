<template>
  <div class="h-full mr-4 w-full text-right">
    <div class="flex items-center gap-3 h-full text-sm" style="--kk-language-text-color: #303442">
      <TopMenu />
      <switch-language />
      <div class="flex flex-col items-center gap-1 px-1 cursor-pointer group color-#303442" @click="openService">
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
      </div>
      <div class="logined flex items-center h-full  color-#303442" v-if="isLoggedIn">
        <div class="mr-4 flex gap-2">
          <div class="cursor-pointer flex flex-col items-center gap-1" @click.prevent="handleClick('recharge')">
            <img class="w-8 h-8" src="@/assets/images/home/deposit_active.png" alt="">
            <span>{{ $t("web.i18nFront.label.recharge")  }}</span>
          </div>
          <div class="cursor-pointer flex flex-col items-center gap-1" @click.prevent="handleClick('exchange')">
            <img class="w-8 h-8" src="@/assets/images/home/transfer_active.png" alt="">
            <span>{{ $t("web.i18nFront.label.transfor")  }}</span>
          </div>
          <div class="cursor-pointer flex flex-col items-center gap-1" @click.prevent="handleClick('withdraw')">
            <img class="w-8 h-8" src="@/assets/images/home/withdraw_active.png" alt="">
            <span>{{ $t("web.i18nFront.label.withdraw")  }}</span>
          </div>
        </div>
        <div class="flex flex-col items-start gap-1 text-14px">
          <span class="inline pl-3 text-16px font-600">{{ userStore.userInfo?.nickName }}</span>
          <div class="h100% flex flex-col justify-center items-start gap-1 overflow-hidden mr-4">
            <div class="flex items-center gap-3">
              <div class="flex items-center gap-1" style="--header-wallet-height: 30px;--header-wallet-text-size: 14px;--kk-body-bg-color:#00000000;--header-wallet-bg-color:#00000000">
                <WalletAndCurrencySelector :show-title="false" :refreshAfterChange="true" />
                <span>{{ balance }}</span>
              </div>
              <el-button icon="refresh" :loading="refreshLoading" size="small" @click="onRefresh" circle />
            </div>
          </div>
        </div>
        <el-dropdown :teleported="false" class="setting-item">
          <div class="flex items-center h100% gap-1">
            <img src="@/assets/custom-images/site/avatar.png" class="rounded-full mr-5px w38px w38px" />
            <el-icon>
              <CaretBottom />
            </el-icon>
          </div>
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
        </el-dropdown>
      </div>
      <div class="need-login flex gap-3" v-else>
        <button
          class="kk-custom-btn relative rounded-full bg-[var(-kk-button-bg-color2)] h-34px flex-center px-4 gap-1 cursor-pointer hover:scale-110 transition-all"
          @click="onShowLogin">
          <div class="i-carbon:user-filled linear-bg w-4 h-4"></div>
          {{ $t("system.i18nSystem.opration.login") }}
        </button>
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

const isLoggedIn = computed(() => userStore.userInfo.userID);

const balance = computed(() => {
  const money = userStore?.balanceInfo?.balance
    ? userStore.balanceInfo.balance
    : "0.00";
  // const symbol = userStore?.currentWalletInfo?.symbol || "";
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
    router.replace({ path: "/" });
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
.setting-item {
  display: inline-block;
  min-width: 40px;
  color: var(--el-text-color);
  text-align: center;
  cursor: pointer;
}

.layout-top,
.layout-mix {

  .setting-item,
  .el-icon {
    color: var(--el-color-white);
  }
}

.dark .setting-item:hover {
  background: rgb(255 255 255 / 20%);
}

.kk-custom-btn::after {
  background: linear-gradient(180deg, #94b3ff, #5b7cfe);
  content: "";
  border-radius: 24px;
  inset: 0;
  padding: 2px;
  position: absolute;
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
}
.kk-menu-cover:hover {
  display: block !important;
}
</style>
