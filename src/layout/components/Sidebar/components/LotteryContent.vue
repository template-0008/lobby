<template>
  <div
    class="game-box"
    v-loading="loading"
    element-loading-background="rgba(122, 122, 122, 0.8)"
  >
    <div
      class="flex mt-5 mb-5 overflow-hidden"
      v-for="(series, i) in gameList"
      :key="i"
    >
      <div
        class="w-120px color-#000000 text-sm flex-center shrink-0 flex-wrap font-500"
      >
        <span>{{ series.name }}</span>
      </div>
      <div class="flex gap-2 flex-1 flex-wrap">
        <a
          href="javascript:void(0)"
          class="game-btn"
          :class="{ 'active': lotteryFavoriteIds.includes(`${game.lottoClassify}-${game.lottoClassifyCountry}-${game.lottoID}`) }"
          v-for="(game, i) in series.children"
          :key="`${i}-game`"
          @click="onClickGame(game)"
        >
          <span>{{ game.lottoName }}</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IObject } from "@/01-kk-system/allHttp/types/common";
import useLinkOpenFunc from "@/04-kk-component-admin/components/hooks/useLinkOpenFunc";
import { useGameStore } from "@/store";
import { useGameCollectionStore } from "@/store/modules/gameCollection";

const props = defineProps<{
  isEdit: boolean;
}>();

const gameCollectionStore = useGameCollectionStore()

const collectGameList = computed(() => gameCollectionStore.favoriteGames ?? [])
const lotteryFavoriteIds = computed(() => gameCollectionStore.lotteryFavoriteIds ?? [])

watch(collectGameList, (newVal) => {
  console.log('newVal----', newVal)
})
watch(lotteryFavoriteIds, (newVal) => {
  console.log('lotteryFavoriteIds----', newVal)
})

const gameStore = useGameStore();
const { onClickClassiGame } = useLinkOpenFunc();

const gameList = ref<Record<string, any>[]>([]);
const loading = ref(false);

const onClickGame = (game: IObject) => {
  if (props.isEdit) {
    gameCollectionStore.setLocalCollections(game)
    return false;
  }
  onClickClassiGame(game)
}

console.log('collectGameList----', collectGameList.value)

async function init() {
  loading.value = true;
  gameList.value = await gameStore.getAllSeriesAndGamesList();
  loading.value = false;
}

onBeforeMount(() => {
  init();
});
</script>

<style scoped>
.game-box {
  width: 100%;
  background: var(--cp-color141);
  padding: 30px 0;
  border-radius: 12px;
  overflow-y: auto;
}
.game-btn {
  text-align: center;
  display: block;
  background: #e4e0dc;
  width: 138px;
  height: 40px;
  line-height: 40px;
  color: #000000;
  position: relative;
  border: 0;
  border-radius: 4px;
  transition: all 0.3s ease-in;
}
.game-btn:hover, .game-btn.active {
  background: #6a2424;
  color: #fff;
}
</style>
