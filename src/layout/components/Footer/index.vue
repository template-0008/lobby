<script setup lang="ts">
import { useChatStore } from "@/store";

defineOptions({
  name: "Footer",
});

const chatStore = useChatStore();
const router = useRouter();

function openService() {
  chatStore.openChat();
}

function goTo(path: string) {
  router.push({ path: `/about/${path}` });
}
</script>

<template>
  <footer class="bg-[#303442]">
    <div class="min-h-200px mx-auto w-1200px pt-5 color-[var(--kk-footer-text-color)]">
      <div class="logo-container relative w-full flex justify-center items-center pb-5">
        <div class="w-93px h-50px cursor-pointer transition-all group">
          <img class="h-full block group-hover:hidden" src="@/assets/images/home/icon-ag.png" alt="">
          <img class="h-full hidden group-hover:block" src="@/assets/images/home/icon-ag-a.png" alt="">
        </div>
        <div class="w-65px h-50px cursor-pointer transition-all group">
          <img class="h-full block group-hover:hidden" src="@/assets/images/home/icon-yoo.png" alt="">
          <img class="h-full hidden group-hover:block" src="@/assets/images/home/icon-yoo-a.png" alt="">
        </div>
        <div class="w-108px h-50px cursor-pointer transition-all group">
          <img class="h-full block group-hover:hidden" src="@/assets/images/home/icon-win.png" alt="">
          <img class="h-full hidden group-hover:block" src="@/assets/images/home/icon-win-a.png" alt="">
        </div>
        <div class="w-74px h-50px cursor-pointer transition-all group">
          <img class="h-full block group-hover:hidden" src="@/assets/images/home/icon-fb.png" alt="">
          <img class="h-full hidden group-hover:block" src="@/assets/images/home/icon-fb-a.png" alt="">
        </div>
        <div class="w-112px h-50px cursor-pointer transition-all group">
          <img class="h-full block group-hover:hidden" src="@/assets/images/home/icon-bg.png" alt="">
          <img class="h-full hidden group-hover:block" src="@/assets/images/home/icon-bg-a.png" alt="">
        </div>
      </div>
      <ul class="footer-menu flex-center py-4">
        <li class="footer-menu-item" @click="goTo('aboutUs')">
          <a>{{ $t("web.i18nFront.label.aboutUs") }}</a>
        </li>
        <span>|</span>
        <li class="footer-menu-item" @click="goTo('response')">
          <a>{{ $t("web.i18nFront.label.gameBiling2") }}</a>
        </li>
        <span>|</span>
        <li class="footer-menu-item" @click="openService">
          <a>{{ $t("web.i18nFront.label.contact") }}</a>
        </li>
      </ul>
      <p class="text-center">版权所有 ©2012-2024 kkgame保留所有权</p>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
footer {
  width: 100%;
  background-color: #303442;
  font-size: 13px;
  padding-bottom: 40px;
}
.logo-container::before {
  content: "";
  position: absolute;
  left: 0;
  bottom: 2px;
  width: 100%;
  height: 1px;
  background: #252733;
}
.logo-container::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 1px;
  width: 100%;
  height: 1px;
  opacity: .2;
  background: #5b607b;
}
.footer-content {
  display: flex;
  align-items: center;
  padding: 42px 0 32px;
  margin: 0 auto;
}
.footer-extra {
  margin-right: 24px;
  width: 300px;
}
.footer-menu {
  display: flex;
  flex-wrap: wrap;
}
.footer-menu-item {
  position: relative;
  padding: 0 16px;
  line-height: 26px;
}
.footer-menu-item a {
  transition: all 0.3s ease;
  cursor: pointer;
  display: block;
  color: inherit;
  text-decoration: none;
}
.footer-menu-item a:hover {
  color: #fcdd8d;
}
.footer-line {
  height: 2px;
  width: 1163px;
  opacity: 0.5;
  margin: 20px auto;
  background: rgba(144, 162, 220, 0.2);
}
</style>
