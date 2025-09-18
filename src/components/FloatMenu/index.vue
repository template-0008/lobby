<template>
  <div class="fixed right-0 top-118px z-100 overflow-hidden">
    <div class="w-70px bg-white rounded-8px">
      <ul class="w-full h-[315px] flex flex-col overflow-hidden transition-all duration-300 ease-in-out" :class="{ 'h-63px': isFold }">
        <transition name="kk-fold">
          <div v-if="!isFold">
            <li class="float-item-wrapper kk-item-b" @click="openService">
              <div class="fix-menu-item kk-item-01"></div>
              <span>{{ $t("web.i18nFront.label.server") }}</span>
            </li>
            <li class="float-item-wrapper kk-item-b" @click="goDownload">
              <div class="fix-menu-item kk-item-02"></div>
              <span>{{ $t("web.i18nFront.label.download") }}</span>
            </li>
            <li class="float-item-wrapper kk-item-b" @click="goNotice">
              <div class="fix-menu-item2"></div>
              <span>{{ $t("web.i18nFront.label.platNoti2") }}</span>
            </li>
            <li class="float-item-wrapper kk-item-b">
              <SwitchLanguage />
            </li>
          </div>
        </transition>
        <li class="float-item-wrapper" @click="onClickFold">
          <div class="fix-menu-item kk-item-03"></div>
          <span>{{ $t("web.i18nFront.label.fold") }}</span>
        </li>
      </ul>
    </div>
    <CustomModal v-model="showDownloadModal" :title="$t('web.i18nFront.label.download')" width="960px" :show-close="false" :show-ok="false">
      <div class="py-5 flex-center">
        <div class="flex-center gap-6 group">
          <div class="h-260px">
            <img class="h-full object-contain group-hover:scale-115 transition-all" src="@/assets/images/dropmenu/app-img.png" alt="">
          </div>
          <div class="flex flex-col items-center gap-3">
            <p class="font-500 text-20px color-#303442">{{ $t("web.i18nFront.label.mobile") }}</p>
            <div class="p-4 bg-[#eef2fe] rounded-2 border-1 border-white">
              <img class="w-120px h-120px" :src="qrcode" alt="APP QR Code" />
            </div>
            <p>{{ $t("web.i18nFront.desc.appDownload") }}</p>
          </div>
        </div>
      </div>
    </CustomModal>
  </div>
</template>

<script setup lang="ts">
import { getMobileHref } from '@/01-kk-system/allUtils/utils';
import { useAppStore } from '@/store';
import { useChatStore } from '@/store/modules/chat';
import { useQRCode } from '@vueuse/integrations/useQRCode'

const router = useRouter()

const chatStore = useChatStore();
const appStore = useAppStore();

const showDownloadModal = ref(false)
const isFold = ref(false)

const backToTop = () => {
  const el = document.querySelector('.app-main')
  el?.scrollTo({ top: 0, behavior:'smooth' })
}

// 二维码
const qrcodeTxt = shallowRef('')
// @ts-ignore
const qrcode = useQRCode(qrcodeTxt)

function getH5Url() {
  qrcodeTxt.value = getMobileHref(true)
}

function goDownload() {
  getH5Url()
  showDownloadModal.value = true
}

function openService() {
  chatStore.openChat();
}

function goNotice() {
  appStore.toggleNoticeModal(true);
}

function onClickFold() {
  isFold.value = !isFold.value
}

</script>

<style scoped>
.float-item-wrapper {
  @apply w-full h-63px flex-center flex-col cursor-pointer;
}
.kk-item-b {
  @apply border-b border-gray-200;
}
.fix-menu-item {
  width: 100%;
  height: 100%;
  background: url(@/assets/images/new/sprite-icons.png) no-repeat center center;
  background-repeat: no-repeat;
  height: 21px;
  margin: 0 auto 5px;
  position: relative;
  width: 22px;
}
.fix-menu-item2 {
  width: 100%;
  height: 100%;
  background: url(@/assets/images/new/notice2-icon.png) no-repeat center center;
  background-repeat: no-repeat;
  height: 21px;
  margin: 0 auto 5px;
  position: relative;
  width: 22px;
}
.kk-item-01 {
  background-position: 0 -67px;
}
.kk-item-02 {
  background-position: 0 -132px;
}
.kk-item-03 {
  background-position: 0 -258px;
}
.kk-fold-enter-active,
.kk-fold-leave-active {
  transition: all 0.3s ease-in-out;
}
.kk-fold-enter-from,
.kk-fold-leave-to {
  transform: translateY(-100%);
}
</style>
