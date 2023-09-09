<template>
  <div class="fixed inset-0 flex items-center justify-center bg-gray-200">
    <form @submit.prevent="login" class="rounded-lg bg-white p-6 shadow-md">
      <div class="mb-4">
        <label for="username" class="block text-gray-700">Username</label>
        <input
          v-model="username"
          type="text"
          id="username"
          name="username"
          class="w-full rounded border px-3 py-2"
        />
      </div>
      <div class="mb-4">
        <label for="password" class="block text-gray-700">Password</label>
        <input
          v-model="password"
          type="password"
          id="password"
          name="password"
          class="w-full rounded border px-3 py-2"
        />
      </div>
      <div>
        <button type="submit" class="rounded bg-blue-500 px-4 py-2 text-white">
          Login
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router"
import { useAuthStore } from "@/stores/auth"
import { ref } from "vue"

const router = useRouter()

const username = ref("")
const password = ref("")

const login = async () => {
  if (username.value === "" || password.value === "") {
    console.error("Username and password cannot be empty")
    return // Exit the function early if fields are empty
  }
  const authStore = useAuthStore()

  try {
    const result = await authStore.login(username.value, password.value)
    if (result) {
      router.push("/dashboard")
    } else {
      // Show an error message for failed login
      console.error("Login failed")
    }
  } catch (error) {
    console.error("Error:", error)
  }
}
</script>
