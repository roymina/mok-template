<template>
  <div class="flex flex-col space-y-8 full-full flex-center">
    <!-- 组件自动载入 -->
    <IconBtn size="2em" @on-click="toggleDark">
      <icon-carbon-moon v-if="isDark" />
      <icon-carbon-sun v-else />
    </IconBtn>
    <img src="@/assets/images/logo.svg" alt="logo" class="w-44" />

    <div class="text-gray-500 underline">
      Mok: 一个现代Vue3+Vite+Electron+tailwindcss桌面开发模板
    </div>
    <el-form ref="formRef" :rules="formRules" size="large" :model="loginModel" class="w-96">
      <el-form-item prop="username">
        <el-input v-model="loginModel.username" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="loginModel.password"
          type="password"
          show-password
          placeholder="密码"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <div class="w-full mb-2 text-xs text-right text-gray-500">
          输入任意用户名和密码登录
        </div></el-form-item
      >

      <el-form-item>
        <el-button class="w-full" type="primary" @click="onLoginHandler(formRef)">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup>
import validators from '@/composables/validators'
import { usePersistStore } from '@/stores/persistStore'
const router = useRouter()
const persistStore = usePersistStore()
//使用@vueuse, 由于autoimport的使用，无需引入
const isDark = useDark()
const toggleDark = useToggle(isDark)
const loginModel = reactive({})
const formRef = ref(null)
const formRules = reactive({
  username: [validators.notEmpty],
  password: [validators.notEmpty]
})
const onLoginHandler = async (formEl) => {
  if (!formEl) return
  await formEl.validate(async (valid) => {
    if (valid) {
      //此处进行登录请求
      persistStore.token = 'mysecrettoken'
      router.push('/')
    }
  })
}
</script>

<route lang="yaml">
meta:
  layout: empty
</route>
