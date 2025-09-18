<template>
  <div class="navbar-container relative">
    <div class="nav-bar-bg"></div>
    <div class="nav-top relative z-2">
      <div class="nav-top-c">
        <HeaderLogo />
        <NavbarContent />
      </div>
    </div>
  </div>
  <div class="empty-header"></div>
</template>

<script setup lang="ts">
import { IObject } from "@/01-kk-system/allHttp/types/common";
import { getMobileHref, localImg } from "@/01-kk-system/allUtils/utils";
import useGameLocalImage from "@/hooks/useGameLocalImage";
import useLinkOpenFunc from '@/04-kk-component-admin/components/hooks/useLinkOpenFunc';
import { useGameStore, useUserStore } from "@/store";
import { useQRCode } from '@vueuse/integrations/useQRCode'
import NavbarContent from './components/NavbarContent.vue'
import HeaderLogo from './components/HeaderLogo.vue'

const gameStore = useGameStore();
const { getImage } = useGameLocalImage()
const { onClickClassiGame, onClickOuterGame } = useLinkOpenFunc();

const lotteryGames = ref<IObject[]>([])

const sportsList = computed(() => {
  const list = gameStore.sportGameList || []
  const data = list.map(game => ({
    ...game,
    icon: localImg(`custom-images/outergameicon/${game.outerGamerID}.png`),
    title: game.outerGamerName,
    subTitle: 'Sports',
    image: localImg(`images/dropmenu/sports-${game.outerGamerID}.png`),
  }))
  return data
})
const realBetList = computed(() => {
  const list = gameStore.liveGameList || []
  const data = list.map(game => ({
    ...game,
    icon: localImg(`custom-images/outergameicon/${game.outerGamerID}.png`),
    title: game.outerGamerName,
    subTitle: 'Live',
    image: localImg(`images/dropmenu/live-${game.outerGamerID}.png`),
  }))
  return data
})
const chessList = computed(() => {
  const list = gameStore.chessGameList || []
  const data = list.map(game => ({
    ...game,
    icon: localImg(`custom-images/outergameicon/${game.outerGamerID}.png`),
    title: game.outerGamerName,
    subTitle: 'Live',
    image: localImg(`images/dropmenu/chess-${game.outerGamerID}.png`),
  }))
  return data
})
const fishList = computed(() => {
  const list = gameStore.fishGameList || []
  const data = list.map(game => ({
    ...game,
    icon: localImg(`custom-images/outergameicon/${game.outerGamerID}.png`),
    title: game.outerGamerName,
    subTitle: 'fish',
    image: localImg(`images/dropmenu/fish-${game.outerGamerID}.png`),
  }))
  return data
})
const egameList = computed(() => {
  const list = gameStore.eGameList || []
  const data = list.map(game => ({
    ...game,
    icon: localImg(`custom-images/outergameicon/${game.outerGamerID}.png`),
    title: game.outerGamerName,
    subTitle: 'Live',
    image: localImg(`images/dropmenu/slot-${game.outerGamerID}.png`),
  }))
  return data
})

// 二维码
const qrcodeTxt = shallowRef('')
// @ts-ignore
const qrcode = useQRCode(qrcodeTxt)

function getH5Url() {
  qrcodeTxt.value = getMobileHref(true)
}

function getMenuLotteryImage(info: Record<string, any>) {
  const { lottoClassifyCountry, lottoClassify, lottoID } = info || {}
  const countryCode = lottoClassifyCountry ? lottoClassifyCountry.toLowerCase() : ''
  return localImg(`custom-images/lottery/${countryCode}-${lottoClassify}.png`)
}

const init = async () => {
  getH5Url()
  const lottery = await gameStore.getAllSeriesAndGamesList()
  let listFour = []
  if (lottery) {
    for (let series of lottery) {
      const { children } = series || {}
      const game = children[0]
      if (game) {
        // const cty = (game?.lottoClassifyCountry || '').toLowerCase()
        // const lottoClassify = game?.lottoClassify || ''
        listFour.push({
          ...game,
          icon: localImg('images/dropmenu/icon-01.png'),
          title: game.lottoName,
          subTitle: 'Lottery',
          image: getMenuLotteryImage(game),
        })
      }
    }
  }
  lotteryGames.value = listFour
}

onBeforeMount(() => {
  init()
})

</script>

<style lang="scss" scoped>
.navbar-container {
  @apply fixed z-99 w-full left-0;
  height: $navbar-height;
  z-index: 100;
}

.nav-bar-bg {
  @apply absolute top-0 bottom-0 left-0 right-0 z-0;
  // background: linear-gradient(180deg, #59090a .2%, rgba(232, 238, 249, 0) 71.64%);
  // backdrop-filter: blur(8px);
  background-color: #59090a;
  box-shadow: 0 3px 5px rgba(0, 0, 0, .2);
}

.empty-header {
  height: $navbar-height;
  width: 100%;
  background-color: #f3faff;
}

.nav-top {
  height: $navbar-top-height;
  color: #ffffff;

  .nav-top-c {
    @apply flex-x-between m-x-auto h-full px-4;
  }
}

.top-nav-menu-c {
  margin: 0 auto;
  height: $navbar-nav-height;
  border-bottom: 1px solid hsla(0, 0%, 61.6%, .12);
  // background: var(--kk-top-menu-bg-color);
}

.drop-content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 400px;
  padding-top: 90px;
  transition: transform .5s ease, opacity .8s ease;
  z-index: -1;
  transform: translateY(-100%);
  opacity: 0;
  background-image: url("@/assets/images/home/menu-dropmenu-bg.jpg");
  background-size: 100% 400px;
  background-position: top;
}

.drop-menu {
  display: flex;
  justify-content: space-between;
}

.nav-top:has(.kk-lottery:hover)+.kk-lottery-dropdown-menu,
.kk-lottery-dropdown-menu:hover,
.nav-top:has(.kk-sports:hover)~.kk-sports-dropdown-menu,
.kk-sports-dropdown-menu:hover,
.nav-top:has(.kk-realbet:hover)~.kk-realbet-dropdown-menu,
.kk-realbet-dropdown-menu:hover,
.nav-top:has(.kk-chess:hover)~.kk-chess-dropdown-menu,
.kk-chess-dropdown-menu:hover,
.nav-top:has(.kk-fish:hover)~.kk-fish-dropdown-menu,
.kk-fish-dropdown-menu:hover,
.nav-top:has(.kk-egame:hover)~.kk-egame-dropdown-menu,
.kk-egame-dropdown-menu:hover,
.nav-top:has(.kk-actvity:hover)~.kk-actvity-dropdown-menu,
.kk-actvity-dropdown-menu:hover,
.nav-top:has(.kk-app-d:hover)~.kk-app-d-dropdown-menu,
.kk-app-d-dropdown-menu:hover {
  opacity: 1;
  transform: translateY(0);
}
</style>
