<template>
  <div class="navbar-container relative">
    <div class="nav-bar-bg"></div>
    <div class="nav-top relative z-2">
      <div class="nav-top-c">
        <!-- 导航栏左侧 -->
        <NavbarLeft />
        <!-- 导航栏右侧 -->
        <NavbarRight />
      </div>
    </div>
    <!-- lottery -->
    <ul class="drop-content kk-lottery-dropdown-menu">
      <li class="max-w-1400px mx-auto drop-menu">
        <template v-if="lotteryGames?.length > 0">
          <CustomSwiper :gameList="lotteryGames" v-slot="{ item, index }">
            <DropMenuItem
              :item="item"
              :icon="item.icon"
              :image="item.image"
              :title="item.title"
              :subTitle="item.subTitle"
              @onClickGame="onClickClassiGame"
            />
          </CustomSwiper>
        </template>
        <div v-else class="w-full flex-center">
          <el-empty />
        </div>
      </li>
    </ul>
    <!-- Sports -->
    <ul class="drop-content kk-sports-dropdown-menu">
      <li class="max-w-1400px mx-auto drop-menu">
        <template v-if="sportsList?.length > 0">
          <CustomSwiper :gameList="sportsList" v-slot="{ item, index }">
            <DropMenuItem
              :item="item"
              :icon="item.icon"
              :image="item.image"
              :title="item.title"
              :subTitle="item.subTitle"
              @onClickGame="onClickOuterGame"
            />
          </CustomSwiper>
        </template>
        <div v-else class="w-full flex-center">
          <el-empty />
        </div>
      </li>
    </ul>
    <!-- Realbet -->
    <ul class="drop-content kk-realbet-dropdown-menu">
      <li class="max-w-1400px mx-auto drop-menu">
        <template v-if="realBetList?.length > 0">
          <CustomSwiper :gameList="realBetList" v-slot="{ item, index }">
            <DropMenuItem
              :item="item"
              :icon="item.icon"
              :image="item.image"
              :title="item.title"
              :subTitle="item.subTitle"
              @onClickGame="onClickOuterGame"
            />
          </CustomSwiper>
        </template>
        <div v-else class="w-full flex-center">
          <el-empty />
        </div>
      </li>
    </ul>
    <!-- Chess -->
    <ul class="drop-content kk-chess-dropdown-menu">
      <li class="max-w-1400px mx-auto drop-menu">
        <template v-if="chessList?.length > 0">
          <CustomSwiper :gameList="chessList" v-slot="{ item, index }">
            <DropMenuItem
              :item="item"
              :icon="item.icon"
              :image="item.image"
              :title="item.title"
              :subTitle="item.subTitle"
              @onClickGame="onClickOuterGame"
            />
          </CustomSwiper>
        </template>
        <div v-else class="w-full flex-center">
          <el-empty />
        </div>
      </li>
    </ul>
    <!-- Fish -->
    <ul class="drop-content kk-fish-dropdown-menu">
      <li class="max-w-1400px mx-auto drop-menu">
        <template v-if="fishList?.length > 0">
          <CustomSwiper :gameList="fishList" v-slot="{ item, index }">
            <DropMenuItem
              :item="item"
              :icon="item.icon"
              :image="item.image"
              :title="item.title"
              :subTitle="item.subTitle"
              @onClickGame="onClickOuterGame"
            />
          </CustomSwiper>
        </template>
        <div v-else class="w-full flex-center">
          <el-empty />
        </div>
      </li>
    </ul>
    <!-- EGame -->
    <ul class="drop-content kk-egame-dropdown-menu">
      <li class="max-w-1400px mx-auto drop-menu">
        <template v-if="egameList?.length > 0">
          <CustomSwiper :gameList="egameList" v-slot="{ item, index }">
            <DropMenuItem
              :item="item"
              :icon="item.icon"
              :image="item.image"
              :title="item.title"
              :subTitle="item.subTitle"
              @onClickGame="onClickOuterGame"
            />
          </CustomSwiper>
        </template>
        <div v-else class="w-full flex-center">
          <el-empty />
        </div>
      </li>
    </ul>
    <!-- actvity -->
    <ul class="drop-content drop-menu kk-actvity-dropdown-menu">
      <div class="w-full flex-center">
        <el-empty />
      </div>
    </ul>
    <ul class="drop-content drop-menu kk-app-d-dropdown-menu">
      <div class="w-full flex-center">
        <div class="flex-center gap-6 group">
          <div class="h-260px">
            <img class="h-full object-contain group-hover:scale-115 transition-all" src="@/assets/images/dropmenu/app-img.png" alt="">
          </div>
          <div class="flex flex-col items-center gap-3">
            <p class="font-500 text-20px color-#303442">{{ $t("web.i18nFront.label.mobile") }}</p>
            <div class="p-4 bg-[#eef2fe] rounded-2 border-1 border-white">
              <img class="w-120px h-120px" :src="qrcode" alt="APP QR Code" />
            </div>
            <p>{{ $t("web.i18nFront.desc.appDownload") }}</p>
          </div>
        </div>
      </div>
    </ul>
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
  background: linear-gradient(180deg, #cddaf2 .2%, rgba(232, 238, 249, 0) 71.64%);
  backdrop-filter: blur(8px);
}

.empty-header {
  height: $navbar-height;
  width: 100%;
  background-color: #f3faff;
}

.nav-top {
  height: $navbar-top-height;

  .nav-top-c {
    @apply flex-x-between m-x-auto h-full;
    width: $kk-content-width;
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
