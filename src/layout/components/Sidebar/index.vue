<template>
  <div
    class="fixed left-0 top-65px bottom-0 w-220px bg-#6a2623 z-20 transition-all origin-left duration-500 ease-in-out"
    :class="{ '-translate-x-100%': !isOpen, 'translate-x-0': isOpen }"
  >
    <div class="pb-12 px-3 pt-3">
      <div class="h-12 flex-center gap-2 mb-3 color-#fff text-14px bg-#bf625d rounded-5px cursor-pointer hover:bg-#7d322f" @click="handleClick('recharge')">
        <img class="w-5 h-5 object-contain" src="@/assets/images/new/recharge-icon.png" alt="">
        <span class="font-500">{{ $t("web.i18nFront.label.recharge") }}</span>
      </div>
      <div class="h-12 flex-center gap-2 mb-3 color-#fff text-14px bg-#bf625d rounded-5px cursor-pointer hover:bg-#7d322f" @click="handleClick('withdraw')">
        <img class="w-5 h-5 object-contain" src="@/assets/images/new/withdraw-icon.png" alt="">
        <span class="font-500">{{ $t("web.i18nFront.label.withdraw") }}</span>
      </div>
      <div class="h-12 flex-center gap-2 mb-3 color-#fff text-14px bg-#bf625d rounded-5px cursor-pointer hover:bg-#7d322f" @click="handleClick('exchange')">
        <img class="w-5 h-5 object-contain" src="@/assets/images/new/exchange-icon.png" alt="">
        <span class="font-500">{{ $t("web.i18nFront.label.transfor") }}</span>
      </div>

      <div class="mb-3 grid grid-cols-2 gap-3 color-#fff">
        <div class="flex-center flex-col h-68px gap-2 rounded-5px bg-#bf625d cursor-pointer hover:bg-#7d322f" v-for="menu in menus" :key="menu.id" @click="handleClickGame(menu)">
          <img class="w-5 h-5 object-contain" :src="menu?.icon" alt="">
          <span>{{ menu.title }}</span>
        </div>
      </div>
      <div class="h-12 flex-center gap-2 mb-3 color-#fff text-14px bg-#7bcec4 rounded-5px cursor-pointer" @click="handleClick('activity')">
        <img class="w-5 h-5 object-contain" src="@/assets/images/new/exchange-icon.png" alt="">
        <span class="font-500">{{ $t("web.i18nFront.title.activitys") }}</span>
      </div>
      <div class="h-12 flex-center gap-2 mb-3 color-#fff text-14px bg-#a6af44 rounded-5px cursor-pointer" @click="handleClick('help')">
        <img class="w-5 h-5 object-contain" src="@/assets/images/new/exchange-icon.png" alt="">
        <span class="font-500">{{ $t("web.i18nFront.label.helpCenter") }}</span>
      </div>

    </div>
    <div class="w-full h-12 flex-center gap-2 absolute bottom-0 left-0 bg-#bf625d color-#fff cursor-pointer" @click="onCloseList">
      <el-icon><ArrowLeftBold /></el-icon>
      <span>{{ $t('web.i18nFront.label.closeList') }}</span>
    </div>
    <div v-if="!isOpen" class="w-4 h-100px rounded-tr-12px rounded-br-12px absolute top-50% -right-4 bg-#6a2623 color-#fff cursor-pointer flex-center flex-col" @click="onCloseList">
      <el-icon><CaretRight /></el-icon>
    </div>
  </div>
  <CustomModal
    v-model="showLotteryModal"
    width="960px"
    :title="$t('web.i18nFront.label.addQuickMenu')"
    :show-close="false"
    :show-ok="false"
  >
    <LotteryContent :is-edit="isCollectModal" :collect-game-list="collectGameList" />
  </CustomModal>
  <CustomModal
    v-model="showHotGameModal"
    width="960px"
    :title="hotTitle"
    :show-close="false"
    :show-ok="false"
  >
    <HotGameContent :hotGameList="hotGameList" :is-collect="isCollectModal" @onEditCollect="onEditCollect" />
  </CustomModal>
</template>

<script setup lang="ts">
import { IObject } from '@/01-kk-system/allHttp/types/common';
import { localImg } from '@/01-kk-system/allUtils/utils';
import useLinkOpenFunc from '@/04-kk-component-admin/components/hooks/useLinkOpenFunc';
import { useAppStore, useGameStore } from '@/store';
import HotGameContent from './components/HotGameContent.vue';
import { useGameCollectionStore } from "@/store/modules/gameCollection";

const appStore = useAppStore();
const gameStore = useGameStore();
const router = useRouter();
const { t } = useI18n();
const { goToPayment } = useLinkOpenFunc();

const showLotteryModal = ref(false);
const showHotGameModal = ref(false);
const hotTitle = ref('');
const hotGameList = ref<IObject[]>([]);
const isCollectModal = ref(false);

const gameCollectionStore = useGameCollectionStore()

const collectGameList = computed(() => gameCollectionStore.favoriteGames ?? [])

const isOpen = computed(() => appStore.sidebarStatus);

function onCloseList() {
  appStore.toggleSidebar();
}

const handleClick = (path: string) => {
  if(path === "exchange") {
    router.push({ path: "/personal/finance/wallet" });
  } else if(path === "recharge") {
    goToPayment("deposit");
  } else if(path === "withdraw") {
    goToPayment("withdraw");
  } else if(path === "activity") {
    router.push({ path: "/activity" });
  } else if(path === "help") {
    router.push({ path: "/help" });
  }
};

const onEditCollect = () => {
  gameCollectionStore.getLocalCollections()
  showHotGameModal.value = false

  showLotteryModal.value = true
}

const menus = computed(() => {
  const groupList = gameStore.allGroups || []
  return [
    {
      title: t('web.i18nFront.label.collect'),
      id: 1,
      routeName: 'collect',
      route: '/',
      icon: localImg('images/new/collect-icon.png'),
      css: '',
      isHot: false,
      children: null,
    },
    ...groupList,
    {
      title: t('web.i18nFront.title.egame'),
      id: 7,
      route: '/egame',
      routeName: 'EGame',
      css: 'kk-egame',
      icon: localImg('images/new/icon_egame.png'),
      isHot: false,
      children: null,
    },
    {
      title: t('web.i18nFront.title.fish'),
      id: 6,
      route: '/fish',
      routeName: 'Fish',
      icon: localImg('images/new/icon_fishing.png'),
      css: 'kk-fish',
      isHot: false,
      children: null,
    },
    {
      title: t('web.i18nFront.title.lottery'),
      id: 2,
      route: '/games-lobby',
      routeName: 'GamesLobby',
      icon: localImg('images/new/icon-lottery.png'),
      css: 'kk-lottery',
      isHot: true,
      children: null,
    },
    {
      title: t('web.i18nFront.title.sports'),
      id: 3,
      route: '/sports',
      routeName: 'Sports',
      icon: localImg('images/new/icon_sports.png'),
      isHot: false,
      css: 'kk-sports',
      children: null,
    },
    {
      title: t('web.i18nFront.title.realbet'),
      id: 4,
      route: '/realbet',
      routeName: 'Realbet',
      css: 'kk-realbet',
      icon: localImg('images/new/icon_realbet.png'),
      isHot: false,
      children: null,
    },
    {
      title: t('web.i18nFront.title.chess'),
      id: 5,
      route: '/chess',
      routeName: 'Chess',
      css: 'kk-chess',
      icon: localImg('images/new/icon_chess.png'),
      isHot: false,
      children: null,
    },
  ]
})

const handleClickGame = (menu: IObject) => {
  const { routeName, children } = menu || {}
  isCollectModal.value = false
  if (children && children.length > 0) {
    hotGameList.value = children
    hotTitle.value = menu.title
    showHotGameModal.value = true
    return
  }

  switch (routeName) {
    case 'GamesLobby':
      showLotteryModal.value = true
      break
    case 'collect':
      gameCollectionStore.getLocalCollections()
      hotGameList.value = [...collectGameList.value]
      hotTitle.value = t('web.i18nFront.label.collect')
      isCollectModal.value = true
      showHotGameModal.value = true
      break
    default:
      router.push(menu.route)
  }
}

</script>

<style scoped>

</style>
