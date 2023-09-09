<template>
  <div>
    <header>
      <nav class="fixed top-0 left-0 w-full bg-blue-500 p-4">
        <div class="container mx-auto flex items-center justify-between">
          <div>
            <router-link to="/" class="text-lg font-semibold text-white"
              >Home</router-link
            >
          </div>
          <div>
            <!-- Show "Dashboard" link if the user is authenticated -->
            <router-link
              v-if="authStore.isAuthenticated"
              to="/dashboard"
              class="mr-2 text-white"
              >Dashboard</router-link
            >

            <!-- Show "Login" link if the user is not authenticated -->
            <router-link
              v-if="!authStore.isAuthenticated"
              to="/login"
              class="mr-4 text-white"
              >Login</router-link
            >

            <!-- Show "Logout" link if the user is authenticated -->
            <a
              v-if="authStore.isAuthenticated"
              @click="logout"
              class="cursor-pointer text-white"
              >Logout</a
            >
          </div>
        </div>
      </nav>
    </header>
    <main class="mt-16">
      <!-- Add margin-top to push content below the navigation bar -->
      <router-view></router-view>
    </main>
    <footer>
      <!-- Your footer content here -->
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router"
import { useAuthStore } from "@/stores/auth.js" // Import your auth store here

const router = useRouter()
const authStore = useAuthStore()

const logout = async () => {
  await authStore.logout() // Call the logout action from your auth store
  router.push("/")
}
</script>

<style scoped></style>
