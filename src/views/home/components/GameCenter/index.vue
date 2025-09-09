<script setup lang="ts">
import { IObject } from '@/01-kk-system/allHttp/types/common';
import { localImg } from '@/01-kk-system/allUtils/utils';
import useGameLocalImage from '@/hooks/useGameLocalImage';
import useLinkOpenFunc from '@/04-kk-component-admin/components/hooks/useLinkOpenFunc';
import { useGameStore } from '@/store/modules/game';

defineOptions({
  name: "HomeGameCenter",
});

type ActuveType = 'lottery' |'sport' | 'chess' | 'realbet' | 'slot' | 'fish'
interface ListItem {
  title: string,
  subTitle: string,
  name: ActuveType,
  description: string,
  titleImage: string,
  titleImageActive: string,
  cateImage: string,
  slogonImage: string,
  gameList: IObject[],
  type: 'lottery' | 'outer',
}

const { t } = useI18n()
const gameStore = useGameStore();
const { onClickClassiGame, onClickOuterGame } = useLinkOpenFunc();
const { getImage } = useGameLocalImage()

const activeIndex = ref<ActuveType>('sport')
const lotteryList = ref<IObject[]>([])

const list = computed<ListItem[]>(() => {
  return [
  {
    title: t('web.i18nFront.title.sports'),
    subTitle: 'Lottery',
    name: 'sport',
    description: "业内最高赔率，覆盖世界各地赛事，让球、大小、半全场、波胆、单双、总入球、连串过关等多元竞猜。更有动画直播、视频直播，让您轻松体验聊球投注，乐在其中。",
    titleImage: localImg(`images/game-center/category-sport.png`),
    titleImageActive: localImg(`images/game-center/category-sport-a.png`),
    cateImage: localImg(`images/game-center/item_sport.png`),
    slogonImage: localImg(`images/game-center/sport-slogon.png`),
    gameList: gameStore.sportGameList?.slice(0,4),
    type: 'outer',
  },
  {
    title: t('web.i18nFront.title.realbet'),
    subTitle: 'CASINO',
    name: 'realbet',
    description: "互动娱乐在线直播平台，让玩家游戏的同时，观赏美女主播表演、参与互动游戏。设有多个真人荷官桌台，包括：百家乐、竞咪、龙虎、骰宝、轮盘等多款游戏。",
    titleImage: localImg(`images/game-center/category-live.png`),
    titleImageActive: localImg(`images/game-center/category-live-a.png`),
    cateImage: localImg(`images/game-center/item_live.png`),
    slogonImage: localImg(`images/game-center/live-slogon.png`),
    gameList: gameStore.liveGameList?.slice(0,4),
    type: 'outer',
  },
  {
    title: t('web.i18nFront.title.chess'),
    subTitle: 'BOARD',
    name: 'chess',
    description: "提供市面上热门游戏种类，选择全面多元，应有尽有玩家能不断游戏不感无趣！抢庄牛牛、龙虎斗，多款棋牌任君选，好友相约竞技，游戏改变生活。",
    titleImage: localImg(`images/game-center/category-chess.png`),
    titleImageActive: localImg(`images/game-center/category-chess-a.png`),
    cateImage: localImg(`images/game-center/item_chess.png`),
    slogonImage: localImg(`images/game-center/chess-slogon.png`),
    gameList: gameStore.chessGameList?.slice(0,4),
    type: 'outer',
  },
  {
    title: t('web.i18nFront.title.egame'),
    subTitle: 'SLOTS',
    name: 'slot',
    description: "提供市面上热门游戏种类，选择全面多元，应有尽有玩家能不断游戏不感无趣！抢庄牛牛、龙虎斗，多款棋牌任君选，好友相约竞技，游戏改变生活。",
    titleImage: localImg(`images/game-center/category-slot.png`),
    titleImageActive: localImg(`images/game-center/category-slot-a.png`),
    cateImage: localImg(`images/game-center/item_slot.png`),
    slogonImage: localImg(`images/game-center/slot-slogon.png`),
    gameList: gameStore.eGameList?.slice(0,4),
    type: 'outer',
  },
  {
    title: t('web.i18nFront.title.lottery'),
    subTitle: 'lottery',
    name: 'lottery',
    description: "超过百种彩票玩法任您赢！江南为全球各彩票玩家提供了丰富多样的游戏内容，致力为玩家打造高品质的娱乐环境，安心乐享游戏空间，只为公平、公正的开奖结果。",
    titleImage: localImg(`images/game-center/category-lottery.png`),
    titleImageActive: localImg(`images/game-center/category-lottery-a.png`),
    cateImage: localImg(`images/game-center/item_lottery.png`),
    slogonImage: localImg(`images/game-center/lottery-slogon.png`),
    gameList: lotteryList.value,
    type: 'lottery',
  },
  {
    title: t('web.i18nFront.title.fish'),
    subTitle: 'fish',
    name: 'fish',
    description: "街机捕鱼，原汁原味。全新哈希游戏，开奖有保障。火箭升空赢最高倍率，更多趣味小游戏等你探索。",
    titleImage: localImg(`images/game-center/category-fish.png`),
    titleImageActive: localImg(`images/game-center/category-fish-a.png`),
    cateImage: localImg(`images/game-center/item_fish.png`),
    slogonImage: localImg(`images/game-center/fish-slogon.png`),
    gameList: gameStore.fishGameList?.slice(0,4),
    type: 'outer',
  },
]
})


const onClickItem = (type: ActuveType) => {
  activeIndex.value = type
}

const onClickGame = (type: 'lottery' | 'outer', game: IObject) => {
  if (type === 'lottery') {
    onClickClassiGame(game)
  } else if(type === 'outer') {
    onClickOuterGame(game)
  }
}


const init = async () => {
  const lottery = await gameStore.getAllSeriesAndGamesList()
  let listFour = []
  if(lottery) {
    for(let series of lottery) {
      const { children } = series || { }
      const game = children[0]
      if (game && listFour.length < 4) {
        listFour.push(game)
      } else {
        break
      }
    }
  }
  lotteryList.value = listFour
}

onBeforeMount(() => {
  init()
})
</script>

<template>
  <div class="w-full flex items-center">
    <div
      v-for="(item, ind) in list"
      :key="ind+'g-card'"
      :class="`game-center-item relative overflow-hidden flex ${ activeIndex === item.name ? 'open' : 'close' }`">
      <div class="item-title cursor-pointer relative z-1" @click="onClickItem(item.name)">
        <div>
          <img class="w-full h-full" src="@/assets/images/home/home_game_title_bg.svg" alt="">
        </div>
        <img class="sport-nor absolute top-0 left-0 w-full h-full" :style="{display: activeIndex === item.name ? 'none' : 'block' }" :src="item.titleImage" alt="">
        <img class="sport-act absolute top-0 left-0 w-full h-full" :style="{display: activeIndex === item.name ? 'block' : 'none' }"  :src="item.titleImageActive" alt="">
      </div>
      <div class="item-content">
        <div class="top-title flex flex-col">
          <span class="name">{{ item.title }}</span>
          <span class="sub uppercase">{{ item.subTitle }}</span>
        </div>
        <p class="desc overflow-hidden mt-3">{{ item.description }}</p>
        <img class="mt-4 h-46px" :src="item.cateImage" alt="">
        <ul class="flex flex-wrap gap-5 items-center mt-4 max-w-430px">
          <li class="group cursor-pointer" @click="onClickGame(item.type, game)" v-for="(game, i) in item.gameList" :key="i+'game'">
            <img class="w-60px h-60px object-cover rounded-full block transition-transform group-hover:scale-120" :src="getImage(game)" alt="">
            <p class="game-title mt-3 text-one-line max-w-65px">{{ game.outerGamerName || game.lottoName }}</p>
          </li>
        </ul>
        <div class="slogon sport">
          <img class="w-full" :src="item.slogonImage" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.game-center-item {

  .item-title {
    width: 56px;
    height: 554px;
    background-image: url('@/assets/images/home/home_game_title_bg.svg');
    background-size: contain;
  }
  .sport-nor {
    display: block;
  }
  .sport-act {
    display: none;
  }
  .item-title:hover .sport-nor {
    display: none !important;
  }
  .item-title:hover .sport-act {
    display: block !important;
  }
  .item-content {
    z-index: 1;
    position: absolute;
    left: 56px;
    top: 27px;
    width: 788px;
    height: 500px;
    background-color: none;
    border: none;
    background: url('@/assets/images/home/home_gamecenter_bg.png') no-repeat 50% / 100%;
    padding: 61px 0 0 36px;
  }
  .top-title .name{
    color: #303442;
    font-family: PingFang SC;
    font-size: 36px;
    font-weight: 600;
    margin-right: 8px;
    line-height: 36px;
    margin-bottom: 8px;
  }
  .top-title .sub{
    color: #303442;
    font-family: PingFang SC;
    font-size: 26px;
    font-weight: 500;
    line-height: 26px;
  }
  .desc {
    width: 368px;
    height: 72px;
    color: #303442;
    font-family: PingFang SC;
    font-size: 14px;
    font-style: normal;
    line-height: 24px;
    text-align: justify;
  }
  .game-title {
    color: #464854;
    text-align: center;
    font-family: PingFang SC;
    font-size: 16px;
    font-weight: 500;
    line-height: 16px;
  }
  .slogon {
    width: 401px;
    height: 522px;
    cursor: inherit;
  }
  .slogon.sport {
    position: absolute;
    right: 3px;
    top: -28px;
    z-index: 2;
  }
}
.open {
  animation: kk_openani 0.7s ease-out forwards;
}
.close {
  animation: kk_closeani 0.7s ease-out forwards;
}

@keyframes kk_closeani {
  0% {
    width: 844px;
    margin-right: -3px;
  }
  100% {
    width: 56px;
    margin-right: 3px;
  }
}

@keyframes kk_openani {
  0% {
    width: 56px;
    margin-right: 3px;
  }
  100% {
    width: 844px;
    margin-right: -3px;
  }
}
</style>
