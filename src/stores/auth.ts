import { defineStore } from "pinia"

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuthenticated: false,
    user: null,
  }),
  actions: {
    async login(username: any, password: any) {
      const response = await fetch("http://localhost:3000/api/users")
      const data = await response.json()

      if (data && data.length > 0) {
        const matchingUser = data.find(
          (user: { username: any; password: any }) =>
            user.username === username && user.password === password
        )

        if (matchingUser) {
          // Authentication successful, set the user and isAuthenticated
          this.isAuthenticated = true
          this.user = matchingUser

          // Create a user object
          const userObject = {
            id: matchingUser.id,
            username: matchingUser.username,
          }

          // Store the user object in local storage
          localStorage.setItem("user", JSON.stringify(userObject))
          localStorage.setItem("isAuthenticated", "true")

          return true
        } else {
          // Authentication failed
          this.isAuthenticated = false
          this.user = null
          return false
        }
      } else {
        // Handle the case where no data is loaded
        console.error("No data loaded or empty data array.")
        this.isAuthenticated = false
        this.user = null
      }
    },
    logout() {
      // Clear the authentication state when the user logs out
      this.isAuthenticated = false
      this.user = null

      // Remove user information from local storage
      localStorage.removeItem("user")
      localStorage.setItem("isAuthenticated", "false")
    },
  },
})
