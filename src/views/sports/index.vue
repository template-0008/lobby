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
  "真实、及时的赛事资讯和比赛情报，详尽的赛事、球队、球员数据资料。提供多种赔率模式与玩法，带给您最佳的体育投注体验！",
  "倾力打造刺激火爆的体育娱乐游戏，多种娱乐方式选择，超高游戏赔付率，每天为您提供千场精彩体育赛事。",
  "清爽界面，便捷操作，高清画质，您将置身于世界体育盛事，尽情享受比赛带来的无尽激情，确保您不错过任何精彩瞬间。",
  "线上竞技，无限可能！畅享体育游戏，精彩瞬间，尽在掌握！一起开启胜利之旅！",
  "线上体育游戏带来无尽刺激！与全球玩家实时下注，体验最真实的体育快感，赢得胜利从未如此激动人心！",
  "与全球玩家同场，尽享线上体育游戏的无限激情！实时对战，真实体验，成就巅峰荣耀。立即加入，赢得每一场胜利！",
  '业界赔率最佳、赛事最全，涵盖海量热门体育赛事，提供视频直播、专业体育数据统计，满足对体育赛事的一切需求！',
]

const sportsList = computed(() => {
  const list = gameStore.sportGameList || []
  const data = list.map((game, index) => ({
    ...game,
    icon: localImg(`custom-images/sport/sports-icon-${game.outerGamerID}.png`),
    activeIcon: localImg(`custom-images/sport/sports-icon-${game.outerGamerID}-active.png`),
    title: game.outerGamerName,
    titleIcon: localImg(`custom-images/outergameicon/title-sport-${game.outerGamerID}.png`),
    subTxt: gameTxt[index],
    image: localImg(`custom-images/sport/sports-${game.outerGamerID}.png`),
  }))
  return data
})


watch(() => sportsList.value, () => {
  if (sportsList.value?.length > 0) {
    currentGame.value = sportsList.value[0] || {}
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
              <img class="w-full h-full object-contain" src="@/assets/custom-images/sport/sport-icon.png" alt="">
            </div>
          <div class="sports-imge absolute w-612px h-580px letf-0 bottom-0">
            <img v-if="currentGame.image" class="w-full h-full object-contain" :src="currentGame.image" alt="">
          </div>
        </div>
        <div class="relative w-450px">
            <div class="relative min-h-266px">
              <div class="sport-ani-top absolute top-0 left-0">
                <div class="w-350px h-110px max-w-full">
                  <!-- <h2>{{ currentGame.title }}</h2> -->
                  <img class="h-110px object-contain" :src="currentGame.titleIcon" alt="">
                </div>
                <p class="sports-text">{{ currentGame?.subTxt }}</p>
                <div class="w-auto h-66px">
                  <img class="h-full" src="@/assets/custom-images/sport/sport-sub-list.png" alt="">
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
              <swiper-slide class="kk-swiper-item cursor-pointer" v-for="(sport, index) in sportsList" :key="index+'sports'" @click="onSelect(sport, index)">
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
