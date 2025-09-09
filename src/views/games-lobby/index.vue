<script setup lang="ts">
import { IObject } from "@/01-kk-system/allHttp/types/common";
import { useGameStore } from "@/store";

const gameStore = useGameStore();

const gameList = ref<Record<string, any>[]>([]);
const loading = ref(false);

const currentGame = ref<IObject>({})

async function onclick(game: IObject) {
  loading.value = true
  currentGame.value = game
  loading.value = false
}

async function init() {
  loading.value = true;
  gameList.value = await gameStore.getAllSeriesAndGamesList();
  currentGame.value = gameList.value[0] || {}
  loading.value = false;
}

onBeforeMount(() => {
  init();
});
</script>

<template>
  <div class="mb-12">
    <div class="h-500px w-auto min-w-1200px relative mx-auto">
      <img class="h-full w-full object-cover" src="@/assets/custom-images/lottery-icon/lottery_banner.webp" alt="">
    </div>
    <div class="list-content w-1200px mx-auto" v-loading="loading">
      <div class="flex gap-y-2 flex-wrap">
        <SelectTag
          :is-select="currentGame.name === series.name"
          @onSelect="onclick"
          v-for="(series, i) in gameList"
          :game="series"
          :key="i + 'fish'" />
      </div>
      <el-divider></el-divider>
      <div class="game-list-box">
        <template v-if="currentGame?.children?.length > 0">
          <ul class="list-container">
            <li v-for="(item, i) in currentGame.children" :key="i + 'g-card'">
              <OuterGameCard :item="item" type="lottery" />
            </li>
          </ul>
          <!-- <div class="flex-center">
            <el-pagination background layout="prev, pager, next" :total="1000" />
          </div> -->
        </template>
        <el-empty v-else />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

.list-content {
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, .05);
  position: relative;
  box-sizing: border-box;
  z-index: 19;
  padding: 30px 39px 20px;
}

.game-list-box {
  margin-top: 20px;
  min-height: 600px;
  -webkit-flex-flow: column nowrap;
  flex-flow: column nowrap;
  -webkit-justify-content: space-between;
  justify-content: space-between;
  -webkit-align-items: center;
  align-items: center;
  position: relative;
}

.list-container {
  width: 100%;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: flex-start;
  display: flex;
  gap: 0 16px;
}
</style>
