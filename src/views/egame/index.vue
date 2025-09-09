<script setup lang="ts">
import { IObject } from "@/01-kk-system/allHttp/types/common";
import { outerGameHttp } from "@/01-kk-system/allHttp/userHall/games";
import { generateRandomInteger } from "@/01-kk-system/allUtils/utils";
import { useGameStore } from "@/store/modules/game";

defineOptions({
  name: "EgamePage",
});

const gameStore = useGameStore();

const testNum = ref(534598643);
const currentGame = ref<IObject>({})
const currentList = ref<IObject[]>([])
const pagination = ref({
  pageNum: 1,
  pageSize: 20,
  totalPages: 0,
})
const loading = ref(false)

const eslotGame = computed(() => gameStore.allSubGameEntrance?.egame || [])

async function onclick(game: IObject, searchText?: string) {
  try {
    loading.value = true
    currentGame.value = game
    const { outerGamerAgentCode, outerGamerID } = game || {}
    const params = {
      outerGamerAgentCode,
      outerGamerID,
      contentCategory: '1003',
      current: pagination.value.pageNum,
      size: pagination.value.pageSize,
    }
    const combParams = searchText ? { ...params, subgameDes: searchText } : params
    const { data } = await outerGameHttp.fetchSubGamePage(combParams)
    const { recordList, total } = data || {}
    pagination.value.totalPages = Number(total || 0)
    currentList.value = recordList || []
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

const onClickTag = (game: IObject) => {
  pagination.value.pageNum = 1
  onclick(game)
}

const onPageChange = () => {
  onclick(currentGame.value)
}

const onSearch = (searchText: string) => {
  console.log(searchText)
  pagination.value.pageNum = 1
  onclick(currentGame.value, searchText)
}

const init = async () => {
  loading.value = true
  const allGame = await gameStore.getAvailableOuterSubGamesEntry();
  currentGame.value = allGame.egame[0] || {}
  onclick(currentGame.value)

  window.setInterval(() => {
    const random = generateRandomInteger(10, 3000)
    testNum.value += random
  }, 4000)
}

onBeforeMount(() => {
  init()
})
</script>

<template>
  <div class="app-container pb-25 bg-white">
    <div class="h-420px w-auto min-w-1200px relative mx-auto">
      <img class="h-full w-full object-cover" src="@/assets/images/egame/slot-bg.webp" alt="">
      <div class="absolute bottom-67px fish-number flex-center w-full">
        <RunNumber :num="testNum" />
      </div>
    </div>
    <SubGameList
      :loading="loading"
      :tagList="eslotGame"
      :currentTag="currentGame"
      type="outer"
      tagKey="outerGamerID"
      :gameList="currentList"
      :pagination="pagination"
      @onTagChange="onClickTag"
      @onPageChange="onPageChange"
      @onSearch="onSearch"
    />
    </div>
</template>
<style scoped>
.fish-number {
  z-index: 99;
}
</style>
