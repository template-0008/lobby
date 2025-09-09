<script setup lang="ts">
import { outerGameHttp } from "@/01-kk-system/allHttp/userHall/games";
import { generateRandomInteger, localImg } from "@/01-kk-system/allUtils/utils";
import { IObject } from "@/components/CURD/types";
import { useGameStore } from "@/store/modules/game";

defineOptions({
  name: "FishPage",
});

const gameStore = useGameStore();

const testNum = ref(234598643);
const currentGame = ref<IObject>({})
const currentList = ref<IObject[]>([])
const loading = ref(false)
const pagination = ref({
  pageNum: 1,
  pageSize: 20,
  totalPages: 0,
})

const fishGame = computed(() => gameStore.allSubGameEntrance?.fish || [])

console.log('fishGame', fishGame.value)

async function onclick(game: IObject, searchText?: string) {
  try {
    loading.value = true
    currentGame.value = game
    const { outerGamerAgentCode, outerGamerID } = game || {}
    const params = {
      outerGamerAgentCode,
      outerGamerID,
      contentCategory: '1004',
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
  gameStore.getAvailableOuterGames();
  const allGame = await gameStore.getAvailableOuterSubGamesEntry();
  console.log('allGame==fish=>>', allGame)
  currentGame.value = allGame.fish[0] || {}
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
    <div class="h-500px w-auto min-w-1200px relative mx-auto">
      <img class="h-full w-full object-cover" src="@/assets/images/egame/fish-bg.webp" alt="">
      <div class="absolute fish-number flex-center w-full">
        <RunNumber :num="testNum" />
      </div>
    </div>
    <SubGameList
      :loading="loading"
      :tagList="fishGame"
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
  top: auto;
  bottom: 62px;
  left: 0;
  right: 0;
  margin: auto;
  height: 76px;
  display: -webkit-flex;
  display: flex;
  -webkit-justify-content: center;
  justify-content: center;
  z-index: 99;
}
</style>
