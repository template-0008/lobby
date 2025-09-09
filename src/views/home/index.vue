<template>
  <div class="dashboard-container">
    <!-- banner -->
    <el-carousel height="700px" motion-blur>
      <el-carousel-item v-for="(image, i) in banners" :key="i">
        <div class="bg-no-repeat bg-top bg-[length:1920px_700px] h-700px" :style="{ 'background-image': `url('${image}')` }"></div>
      </el-carousel-item>
    </el-carousel>
    <!-- content -->
    <div class="home-content max-w-1200px mx-auto mt-10 mb-10">
      <div class="notice w-full">
        <Announcement :image="noticeIcon" :content="announceList" @onMore="goToAnnouncement"/>
      </div>
      <div class="w-830px h-34px mx-auto my-8">
        <img class="h-full" src="@/assets/images/home/game-title.png" alt="">
      </div>
      <GameCenter />
      <div class="w-830px h-34px mx-auto mb-8 mt-15">
        <img class="h-full" src="@/assets/images/home/app-title.png" alt="">
      </div>
      <InfoSection />
      <div class="w-830px h-34px mx-auto mb-8 mt-15">
        <img class="h-full" src="@/assets/images/home/safe-title.png" alt="">
      </div>
      <SafeSection />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAppStore, useGameStore } from "@/store";
import { HotGame } from "./config/menuList";
import { noticeHttp } from "@/01-kk-system/allHttp/userHall/notice";
import { lobbyPilot } from "@/01-kk-system/allHttp/userHall/games";
import { GamePilotResponseModel } from "@/01-kk-system/allHttp/userHall/model/gameModels";
import dayjs from "dayjs";
import { IObject } from "@/01-kk-system/allHttp/types/common";
import { ItemContent } from "@/04-kk-component-admin/components/Announcement/index.vue";
import noticeIcon from "@/assets/images/icon-notice.png";

defineOptions({
  name: "Home",
  inheritAttrs: false,
});

const banners = ref<string[]>([]);

const lotteryList = ref<Record<string, any>[]>([]);
const loading = ref(false);
const announceList = ref<ItemContent[]>([])
const lotteryLoading = ref(false)
const hotLotterylist = ref<GamePilotResponseModel[]>([])

const gameStore = useGameStore();
const appStore = useAppStore();
const router = useRouter();

async function getNoticeList() {
  loading.value = true;
  const res = await noticeHttp.getAllList("3").catch(() => null);
  const { code, data } = res || {};
  if (code === "0") {
    const list = data || [];
    if (list[0]) {
      announceList.value = list.map((item, index) => ({
        id: index+'',
        content: item.title as string,
        contentLink: '',
        linkOpenMode: 'newTab',
      }));

    }
  }
  loading.value = false;
}

function handleLobbyPilotTime(gamePilot: GamePilotResponseModel, serverTime: number) {
  const endTime = dayjs(gamePilot.currentSaleEndTime).valueOf()
  gamePilot.time = endTime - serverTime
  const target: IObject = HotGame.find(game => game.lottoID === gamePilot.lottoID) || {}
  gamePilot.gameName = target?.name || '-'
  gamePilot.lottoClassify = target?.lottoClassify || '-'
  gamePilot.country = target?.country || '-'
  gamePilot.lastLuckyNumberArr = gamePilot.lastLuckyNumber.split(',')
}

async function hotLotterypilot() {
  lotteryLoading.value = true
  const lotteryIds: string[] = []
  HotGame.forEach(game => lotteryIds.push(game.lottoID))
  const res = await lobbyPilot.thirdBatch(lotteryIds.toString()).catch(() => null)
  const { code, data = [], timestamp } = res || {}
  if (code === '0') {
    for (let i = 0; i < data.length; i++) {
      handleLobbyPilotTime(data[i], timestamp || dayjs().valueOf())
    }
    hotLotterylist.value = data
  }
  lotteryLoading.value = false
}

function initBanner() {
  appStore.getAppBanners().then((res) => {
    banners.value = res
  })
}

const init = async () => {
  getNoticeList();
  // hot game 期号和倒计时
  hotLotterypilot()
  lotteryList.value = (await gameStore.getFullSeries()) as unknown as Record<
    string,
    any
  >[];
};

function goToAnnouncement() {
  router.push({ path: "/personal/announcement" });
}

onBeforeMount(() => {
  initBanner()
  init()
})
</script>

<style lang="scss" scoped>
.dashboard-container {
  position: relative;
  background: url('@/assets/images/home/main-background.png');
  background-repeat: repeat;
  background-position: top;
  background-size: 1920px 1772px;
  padding-bottom: 100px;
}
:deep(.el-carousel__button) {
  background-color: #567cf8;
}
.notice {
  background: url('@/assets/images/home/home_notice_bg.png');
  background-size: cover;
  margin-top: 10px;
  height: 82px;
  border-radius: unset;
  border: unset;
  padding: 0 32px 37px;
  margin-bottom: 30px;
}
.home-main {
  background: url('@/assets/images/home/main-background.png');
  background-repeat: repeat;
  background-position: top;
  background-size: 1920px 1772px;
}

.left,
.right {
  flex: 1;
  display: flex;
  align-items: center;
  position: relative;
  height: 165px;
  overflow: hidden;
  background-color: var(--cp-color1);
  border-radius: 10px;
}

.item-desc {
  font-size: 14px;
  line-height: 28px;
  color: var(--cp-color2);
}

.item-title {
  padding: 6px 12px;
  width: 142px;
  height: 38px;
  background-color: var(--cp-color3);
  border-radius: 100px;
  font-size: 15px;
  line-height: 26px;
  text-align: center;
  color: var(--cp-color4);
}
</style>
