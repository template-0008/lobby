<template>
  <section class="h-full">
    <Sidebar />
    <div class="py-8 pl-220px pr-8 min-h-full">
      <router-view>
        <template #default="{ Component, route }">
          <transition name="fade-page" mode="out-in">
            <component :is="Component" :key="route.path" />
          </transition>
        </template>
      </router-view>
    </div>
    <Footer />
  </section>
</template>

<script setup lang="ts">
import { useUserStore } from "@/store";

const userStore = useUserStore();

const isLogin = computed(() => userStore.userInfo?.userID !== '');
</script>

<style lang="scss" scoped>
/* fade-transform */
.fade-page-leave-active,
.fade-page-enter-active {
  transition: all 0.5s;
}

.fade-page-enter {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-page-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
