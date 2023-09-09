import { createRouter, createWebHistory } from "vue-router"
import DefaultLayout from "@/layouts/DefaultLayout.vue"
import { useAuthStore } from "@/stores/auth.js" // Import your auth store here

const routes = [
  {
    path: "/",
    component: DefaultLayout,
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("@/pages/HomePage.vue"),
      },
    ],
  },
  {
    path: "/login",
    component: DefaultLayout,
    children: [
      {
        path: "",
        name: "Login",
        component: () => import("@/pages/LoginPage.vue"),
      },
    ],
  },
  {
    path: "/dashboard",
    component: DefaultLayout,
    children: [
      {
        path: "",
        name: "Dashboard",
        component: () => import("@/pages/DashboardPage.vue"),
        meta: { requiresAuth: true }, // Add the requiresAuth meta
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore() // Initialize your auth store

  // Check if the user is authenticated
  const isAuthenticated = authStore.isAuthenticated
  console.log(isAuthenticated)
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // Check if the route requires authentication
    if (!isAuthenticated) {
      // User is not authenticated, redirect to the login page
      next("/login")
    } else {
      // User is authenticated, allow access to the route
      next()
    }
  } else if (to.matched.some((record) => record.name === "Login")) {
    // Check if the route is the "Login" page
    if (isAuthenticated) {
      // User is authenticated, redirect to another route (e.g., dashboard)
      next("/dashboard") // Change this to the appropriate route
    } else {
      // User is not authenticated, allow access to the "Login" page
      next()
    }
  } else {
    // For other routes, allow access
    next()
  }
})

export default router
