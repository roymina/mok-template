<template>
  <div class="flex items-stretch full-full">
    <div class="flex-grow-0 flex-shrink-0 h-full px-2 py-4 bg-gray-200 w-60 dark:bg-gray-900">
      菜单
    </div>
    <div class="flex flex-col full-full">
      <div class="flex justify-between w-full h-16 px-2 py-4 bg-gray-20 dark:bg-gray-900">
        <div>header</div>
        <div class="flex items-center space-x-4">
          <IconBtn @on-click="toggleDark">
            <icon-carbon-moon v-if="isDark" />
            <icon-carbon-sun v-else />
          </IconBtn>
          <IconBtn @on-click="backToLogin">
            <icon-ion-exit-outline></icon-ion-exit-outline>
          </IconBtn>
        </div>
      </div>
      <!-- 推荐使用simplebar，代替 element scrollbar组件，性能更优 -->
      <simplebar data-simplebar-auto-hide="false">
        <!-- 延迟一秒计算页面剩余高度，超出时自动出现滚动条 -->
        <div class="px-4 py-6" :style="{ height: contentHeight + 'px' }">
          <RouterView />
        </div>
      </simplebar>
    </div>
  </div>
</template>
<script setup>
import { usePersistStore } from '@/stores/persistStore'

const persistStore = usePersistStore()
const router = useRouter()
const isDark = useDark()
const toggleDark = useToggle(isDark)
const backToLogin = () => {
  persistStore.logout()
  router.push('/login')
}
const header = ref(null)
const contentHeight = ref(900)
onMounted(() => {
  setTimeout(() => {
    contentHeight.value =
      document.documentElement.clientHeight - (header.value ? header.value.clientHeight : 0) - 20
  }, 1000)
})
</script>
