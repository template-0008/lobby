<template>
  <div class="py-5 px-3">
    <!-- banner -->
     <div class="flex gap-3 mb-3">
      <div class="w-490px h-full bg-white px-3 ">
        <div class="flex items-center h-12 gap-2 border-b border-b-solid border-#efefef">
          <img class="h-5 object-contain" src="@/assets/images/new/safe-icon.png" alt="" />
          <p class="text-14px font-500 color-#000000">{{ $t('web.i18nFront.label.safeLevel') }}</p>
        </div>
        <div class="flex-center gap-5 h-212px text-14px">
          <img src="@/assets/images/new/safe-image.png" alt="" class="w-170px object-contain">
          <div class="flex flex-col gap-2">
            <div class="flex items-center gap-2 p-2 border border-b-solid text-#ff8a02 border-#ff8a02 bg-#fff3e5">
              <span>{{ $t('web.i18nFront.label.safeLevel') }}</span>
              <el-icon color="#ff8a02"><StarFilled /></el-icon>
              <el-icon color="#ff8a02"><StarFilled /></el-icon>
              <el-icon color="#c1bbb4"><StarFilled /></el-icon>
              <el-icon color="#c1bbb4"><StarFilled /></el-icon>
              <el-icon color="#c1bbb4"><StarFilled /></el-icon>
            </div>
            <p class="text-14px font-500 color-#000000">
              <span class="mr-2">{{ $t('web.i18nFront.label.lastLoginIp') }}:</span>
              <span>{{ userStore.userInfo.lastLoginIP }}</span>
            </p>
            <p class="text-14px font-500 color-#000000">
              <span class="mr-2">{{ $t('web.i18nFront.label.lastLoginTime') }}:</span>
              <span>{{ userStore.userInfo.lastLoginDate }}</span>
            </p>
          </div>
        </div>
      </div>
      <div class="flex-1 h-260px w-730px">
        <el-carousel height="260px" motion-blur>
          <el-carousel-item v-for="(image, i) in banners" :key="i">
            <div class="bg-no-repeat bg-top bg-[length:750px_265px] h-730px" :style="{ 'background-image': `url('${image}')` }"></div>
          </el-carousel-item>
        </el-carousel>
      </div>
     </div>
     <!-- download -->
     <div class="flex gap-3 mb-3">
      <div class="kk-mobile-card w-615px h-220px px-3 relative">
          <div class="kk-m-tag absolute top-0 left-0 h-42px w-94px top-3 -left-10px leading-32px text-center">
            <span class="text-14px font-500 color-#ffffff">{{ $t('web.i18nFront.label.safeLevel') }}</span>
          </div>
          <div class="w-full leading-50px flex-center mb-4 pt-60px px-3 relative">
            <img src="@/assets/images/new/download-text.png" alt="" class="w-auto h-30px object-contain">
          </div>
          <p class="text-14px font-400 color-#351a00 text-center mb-6">{{ $t('web.i18nFront.tips.downloadTip') }}</p>
          <div class="kk-download-btn w-full leading-50px flex-center mb-6">
            <span>{{ $t('web.i18nFront.title.download') }}</span>
          </div>
      </div>
      <div class="flex-1 h-220px bg-white">
        <div class="flex items-center h-12 gap-2 border-b border-b-solid border-#efefef px-3">
          <img class="h-5 object-contain" src="@/assets/images/new/notice2-icon.png" alt="" />
          <p class="text-14px font-500 color-#000000">{{ $t('web.i18nFront.label.platNoti') }}</p>
        </div>
        <div class="flex flex-col h-212px text-14px">
          <div class="w-full px-3 flex items-center justify-between cursor-pointer" v-for="item in finalNoticeList" :key="item.pressID" @click="onClickNoticeList(item)">
            <div class="flex items-center gap-2">
              <img src="@/assets/images/new/list-icon.png" alt="" class="w-10px h-10px object-contain">
              <p class="text-12px font-400 color-#351a00">{{ item.title }}</p>
            </div>
            <p class="text-12px font-400 color-[var(--cp-color223)] leading-250%">{{ item.createTime }}</p>
          </div>
        </div>
      </div>
     </div>
     <!-- game -->
      <div class="bg-white p-4 rounded-1">
        <el-tabs v-model="activeName" class="top-tabs">
          <el-tab-pane
            v-for="item in list"
            :key="item.name"
            :name="item.name"
            :label="item.title"
            :lazy="true"
          >
            <div class="grid grid-cols-6 gap-3 py-4">
              <NormalCard v-for="game in item.gameList" :key="game.id" :game="game" @onClick="onClickGame(game)" />
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
  </div>
</template>

<script setup lang="ts">
import { useAppStore, useGameStore, useUserStore } from "@/store";
import { IObject } from "@/01-kk-system/allHttp/types/common";
import { usePlatformNotice } from "@/components/PlatformNotice/usePlatformNotice";
import { localImg } from "@/01-kk-system/allUtils/utils";
import useLinkOpenFunc from "@/04-kk-component-admin/components/hooks/useLinkOpenFunc";

type ActuveType = 'lottery' |'sport' | 'chess' | 'realbet' | 'slot' | 'fish'

interface ListItem {
  title: string,
  name: ActuveType,
  cateImage: string,
  gameList: IObject[],
  type: 'lottery' | 'outer',
}

defineOptions({
  name: "Home",
  inheritAttrs: false,
});

const banners = ref<string[]>([]);

const { noticeList } = usePlatformNotice()
const finalNoticeList = computed(() => noticeList.value.slice(0, 5))

const lotteryList = ref<Record<string, any>[]>([]);

const gameStore = useGameStore();
const appStore = useAppStore();
const router = useRouter();
const userStore = useUserStore();
const { onClickClassiGame, onClickOuterGame } = useLinkOpenFunc();

const onClickNoticeList = (item: IObject) => {
  router.push({ path: "/personal/announcement", query: { pressID: item.pressID } });
}

const activeName = ref("sport");

const { t } = useI18n()

const list = computed<ListItem[]>(() => {
  return [
  {
    title: t('web.i18nFront.title.sports'),
    name: 'sport',
    cateImage: localImg(`images/game-center/item_sport.png`),
    gameList: gameStore.sportGameList?.slice(0,5),
    type: 'outer',
  },
  {
    title: t('web.i18nFront.title.realbet'),
    name: 'realbet',
    cateImage: localImg(`images/game-center/item_live.png`),
    gameList: gameStore.liveGameList?.slice(0,4),
    type: 'outer',
  },
  {
    title: t('web.i18nFront.title.chess'),
    name: 'chess',
    cateImage: localImg(`images/game-center/item_chess.png`),
    gameList: gameStore.chessGameList?.slice(0,4),
    type: 'outer',
  },
  {
    title: t('web.i18nFront.title.egame'),
    name: 'slot',
    cateImage: localImg(`images/game-center/item_slot.png`),
    gameList: gameStore.eGameList?.slice(0,4),
    type: 'outer',
  },
  {
    title: t('web.i18nFront.title.lottery'),
    name: 'lottery',
    cateImage: localImg(`images/game-center/item_lottery.png`),
    gameList: lotteryList.value,
    type: 'lottery',
  },
  {
    title: t('web.i18nFront.title.fish'),
    name: 'fish',
    cateImage: localImg(`images/game-center/item_fish.png`),
    gameList: gameStore.fishGameList?.slice(0,4),
    type: 'outer',
  },
]
})

const onClickGame = (game: IObject) => {
  console.log('game-----', game)
  if (game.outerGamerID) {
    onClickOuterGame(game)
  } else {
    onClickClassiGame(game)
  }
}


function initBanner() {
  appStore.getAppBanners().then((res) => {
    banners.value = res
  })
}

const init = async () => {
  await initLotteryGame()
};


const initLotteryGame = async () => {
  const lottery = await gameStore.getAllSeriesAndGamesList()
  let listFour = []
  if(lottery) {
    for(let series of lottery) {
      const { children } = series || { }
      const game = children[0]
      if (game && listFour.length < 6) {
        listFour.push(game)
      } else {
        break
      }
    }
  }
  lotteryList.value = listFour
}

onBeforeMount(() => {
  initBanner()
  init()
})
</script>

<style lang="scss" scoped>
.kk-m-tag {
  background: url(@/assets/images/new/mobile-tag.png) no-repeat 50%;
  box-sizing: border-box;
}
.kk-mobile-card {
  background: url(@/assets/images/new/mobile-bg.jpg) no-repeat 50%;
  background-size: cover;
  border-top: 2px solid #6a2623;
}
.kk-download-btn {
  cursor: pointer;
  background: url(@/assets/images/new/download-btn.png) no-repeat 50%;
  color: #fff;
  display: block;
  height: 40px;
  line-height: 36px;
  margin: 0 auto;
  text-align: center;
  width: 110px;
}
</style>
