<script setup lang="ts">
import { localImg } from "@/01-kk-system/allUtils/utils";
import { GameLineTypes } from "@/01-kk-system/middleware/fusionApi/game";
import useLinkOpenFunc from '@/04-kk-component-admin/components/hooks/useLinkOpenFunc';
import { useGameStore } from "@/store/modules/game";
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper/modules';

defineOptions({
  name: "SportsPage",
});

const { onClickOuterGame } = useLinkOpenFunc();

interface GameType {
  icon: string;
  activeIcon: string;
  title: string;
  subTxt: string;
  titleIcon: string;
  image: string;
}

const gameStore = useGameStore();
const currentGame = ref<GameLineTypes & GameType>({
  outerGamerAgentCode: "",
  outerGamerID: "",
  outerGamerName: "",
  outerGamerLineID: "",
  walletType: "",
  currencyCode: "",
  icon: "",
  activeIcon: "",
  title: "",
  titleIcon: "",
  subTxt: "",
  image: ""
})
const switchTag = ref(false)
const currentIndex = ref(0)

const gameTxt = [
  "最具潜力的真人视讯品牌，专业的技术支持，顶级的稳定设备，为您打造极致的视讯饕餮盛宴。",
  "最先进的设备以及富丽堂皇的装潢，游戏选择多样化，多种玩法不重样，为您打造绝佳的游戏体验。",
  "拥有百位训练有素的专业荷官，稳定的高端设备，极易操作的游戏界面，让您有亲临现场精彩体验。",
  "百家乐、轮盘、骰宝、龙虎斗等最齐全的游戏项目。优质美女荷官线上与您互动，精彩刺激，期待您的亲身体验！",
]

const liveList = computed(() => {
  const list = gameStore.liveGameList || []
  const data = list.map((game, index) => ({
    ...game,
    icon: localImg(`custom-images/outergameicon/${game.outerGamerID}.png`),
    activeIcon: localImg(`custom-images/outergameicon/${game.outerGamerID}-a.png`),
    title: game.outerGamerName,
    titleIcon: localImg(`custom-images/outergameicon/title-live-${game.outerGamerID}.png`),
    subTxt: gameTxt[index % gameTxt.length],
    image: localImg(`custom-images/live/live-${game.outerGamerID}.png`),
  }))
  return data
})


watch(() => liveList.value, () => {
  if (liveList.value?.length > 0) {
    currentGame.value = liveList.value[0] || {}
    switchTag.value = true;
  }
});

const onSelect = (game: GameLineTypes & GameType, index: number) => {
  switchTag.value = false
  currentIndex.value = index ?? 0
  setTimeout(() => {
    currentGame.value = game
    switchTag.value = true
  }, 500);
}

const goToGame = () => {
  if (currentGame.value) {
    onClickOuterGame(currentGame.value)
  }
}

onBeforeMount(() => {
  gameStore.getAvailableOuterGames();
});
</script>

<template>
  <div class="game-container min-h-960px h-[calc(100vh - 210px)] flex items-center mx-auto relative">
    <Transition name="sports-animation">
      <div v-if="switchTag" class="h-670px w-1200px flex justify-between mx-auto">
        <div class="relative w-612px h-634px">
            <div class="sports-top flex w-450px h-114px">
              <img class="w-full h-full object-contain" src="@/assets/custom-images/live/live-icon.png" alt="">
            </div>
          <div class="sports-imge absolute w-612px h-580px letf-0 bottom-0">
            <img v-if="currentGame.image" class="w-full h-full object-contain" :src="currentGame.image" alt="">
          </div>
        </div>
        <div class="relative w-450px">
            <div class="relative min-h-266px">
              <div class="sport-ani-top absolute top-0 left-0">
                <div class="w-350px h-110px max-w-full">
                  <img class="h-110px object-contain" :src="currentGame.titleIcon" alt="">
                </div>
                <p class="sports-text">{{ currentGame?.subTxt }}</p>
                <div class="w-auto h-66px">
                  <img class="h-full" src="@/assets/custom-images/live/live-sub-list.png" alt="">
                </div>
              </div>
            </div>
          <div class="relative text-center min-h-142px w-full group px-30px">
            <swiper
              :modules="[Navigation]"
              :initialSlide="currentIndex"
              :navigation="{enabled: true, prevEl: '.kk-swiper-button-prev', nextEl: '.kk-swiper-button-next'}"
              :slides-per-view="4"
              :space-between="10"
            >
              <swiper-slide class="kk-swiper-item cursor-pointer" v-for="(sport, index) in liveList" :key="index+'live'" @click="onSelect(sport, index)">
                <div :class="`sport-game-card w-90px h-104px mb-4 relative z-1 flex-center ${sport.outerGamerID === currentGame.outerGamerID ? 'sport-game-card-active' : ''}`">
                  <div class="w-52px h-52px relative">
                    <img :class="`active-logo absolute top-0 left-0 w-full object-contain ${sport.outerGamerID === currentGame.outerGamerID ? 'visible' : 'invisible'}`" :src="sport.activeIcon" alt="" />
                    <img :class="`default-logo absolute top-0 left-0 w-full object-contain ${sport.outerGamerID === currentGame.outerGamerID ? 'invisible' : 'visible'}`" :src="sport.icon" alt="" />
                  </div>
                </div>
                <p class="text-#303442 text-base leading-22px">{{ sport.title }}</p>
              </swiper-slide>
            </swiper>
            <div class="kk-swiper-button-prev hidden group-hover:flex cursor-pointer">
              <el-icon class="cursor-pointer"><ArrowLeft /></el-icon>
            </div>
            <div class="kk-swiper-button-next hidden group-hover:flex cursor-pointer">
              <el-icon class="cursor-pointer"><ArrowRight /></el-icon>
            </div>
          </div>
          <div class="click-game-button" @click="goToGame">
            {{ $t('web.i18nFront.game.goToGame') }}
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.game-container {
  margin-top: -2px;
  background: url('@/assets/custom-images/sport/sport-page-bg.png') no-repeat;
  background-size: 100% 100%;
}
.sports-top {
  // animation: showToHide 0.5s forwards;
  margin-left: 80px;
}
.sports-animation-leave-active {
  transition-delay: 0.5s;
}
.sports-animation-enter-active {
  transition-delay: 0.5s;
}

.sports-animation-enter-active .sports-top {
  animation: showToHide 0.5s;
}
.sports-animation-leave-active .sports-top {
  animation: showToHide2 0.5s;
}

.sports-animation-enter-active .sports-imge,
.sports-animation-enter-active .sport-ani-top {
  animation: sportImgAni 0.5s;
}
.sports-animation-leave-active .sports-imge,
.sports-animation-leave-active .sport-ani-top {
  animation: sportImgAni2 0.5s;
}

// .sport-ani-top,
// .sports-imge {
//   animation: sportImgAni 0.5s forwards;
// }

@keyframes showToHide {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes showToHide2 {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@keyframes sportImgAni2 {
  0% {
    opacity: 1;
    transform: translateZ(0);
  }
  100% {
    opacity: 0;
    transform: translate3d(-90px, 0, 0);
  }
}

@keyframes sportImgAni {
  0% {
    opacity: 0;
    transform: translate3d(90px, 0, 0);
  }
  100% {
    opacity: 1;
    transform: translateZ(0);
  }
}

.sports-text {
  line-height: 30px;
  margin: 16px 0 14px 6px !important;
  font-size: 16px;
  color: #303442;
  font-weight: 400;
  letter-spacing: .5px;
  text-align: justify;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2; /* 这里是超出几行省略 */
  overflow: hidden;
}

.kk-swiper-button-next,
.kk-swiper-button-prev {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  background: #c2c2c266;
  color: #ffffff;
  background-size: contain;
  width: 30px;
  height: 30px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 30px;
  z-index: 2;
}
.kk-swiper-button-next {
  left: auto;
  right: 0;
}
.sport-game-card::before {
  content: "";
  z-index: -1;
  top: 0;
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  background-image: url('@/assets/images/sports_bg.png');
  background-size: 100% 100%;
  transition: all 0.3s ease-out;
}
.sport-game-card-active::before,
.sport-game-card:hover::before {
  background-image: url('@/assets/images/sports_selected_bg.png');
  background-size: 100% 100%;
}
.sport-game-card:hover .active-logo {
  visibility: visible;
}
.sport-game-card:hover .default-logo {
  visibility: hidden;
}
.click-game-button {
  width: 180px;
  height: 74px;
  line-height: 63px;
  text-align: center;
  margin-top: 32px;
  color: #fff;
  font-size: 18px;
  position: relative;
  z-index: 1;
  cursor: pointer;
  transition: all .2sease;
  border-radius: 25px;
}
.click-game-button:hover::before {
  content: "";
  background-image: url('@/assets/images/button_bg_hover.png');
  background-size: 100% 100%;
}
.click-game-button::before {
  content: "";
  z-index: -1;
  top: 0;
  display: block;
  width: 180px;
  height: 74px;
  position: absolute;
  left: 50%;
  -webkit-transform: translate3d(-50%, 0, 0);
  transform: translate3d(-50%, 0, 0);
  background-image: url('@/assets/images/button_bg.png');
  background-size: 100% 100%;
  transition: all 0.2s ease-in-out;
}
</style>

