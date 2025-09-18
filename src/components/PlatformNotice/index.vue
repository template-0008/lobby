<template>
  <div class="w-full flex-1 flex min-h-300px" v-loading="loading">
    <div class="w-270px shrink-0 overflow-hidden overflow-y-auto">
      <div
        v-for="item in noticeList"
        :key="item.pressID"
        class="w-full flex gap-3 py-4 px-2 border-b animate-all duration-300 border-b-solid border-#f2f3f3 hover:bg-[#f9f9f9] cursor-pointer"
        :class="{ 'bg-[#f9f9f9]': currentNotice.pressID === item.pressID }"
        @click="onClickNotice(item)">
        <div class="w-4 h-4 notice-icon">
        </div>
        <div class="flex-1">
          <p class="text-14px color-#000000">{{ item.title }}</p>
          <p class="text-12px color-[var(--cp-color223)] leading-250%">{{ item.createTime }}</p>
        </div>
      </div>
    </div>
    <div class="flex-1 flex flex-col overflow-hidden">
      <p class="text-16px h-65px text-center font-500 color-#000000 border-b border-b-solid border-#f2f3f3 py-5">{{ currentNotice.title }}</p>
      <div class="p-4 h-[calc(100%-65px)] overflow-hidden overflow-y-auto">
        <SafeRichText :content="`${currentNotice.content ?? ''}`" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePlatformNotice } from './usePlatformNotice'

const { loading, noticeList, onClickNotice, currentNotice } = usePlatformNotice()
</script>

<style scoped>
.notice-icon {
  background-image: url('@/assets/images/new/sprite-icons2.png');
  background-repeat: no-repeat;
  background-position: -103px -137px;
}

</style>
