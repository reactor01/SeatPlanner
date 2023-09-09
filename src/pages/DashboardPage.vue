<template>
  <div class="min-h-screen bg-gray-200 p-4">
    <!-- Input fields for the number of seats per row and maximum seats per row -->
    <section class="settings">
      <div class="mb-4 flex">
        <div class="mr-4 flex flex-col">
          <label class="mb-2 text-sm font-bold text-gray-700" for="allSeats">
            Number of Seats
          </label>
          <input
            type="number"
            class="rounded-lg border border-gray-300 px-3 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="allSeats"
            placeholder="Number of seats"
            v-model="totalSeats"
            @input="updateGrid"
          />
        </div>

        <div class="flex flex-col">
          <label
            class="mb-2 text-sm font-bold text-gray-700"
            for="maxSeatsPerRow"
          >
            Max Seats Per Row
          </label>
          <input
            type="number"
            class="rounded-lg border border-gray-300 px-3 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="maxSeatsPerRow"
            placeholder="Max seats per row"
            v-model="maxSeatsPerRow"
            @input="updateGrid"
          />
        </div>
      </div>
    </section>

    <!-- Dynamic grid system using Tailwind CSS grid -->
    <section>
      <div class="grid grid-cols-{{ computedColumns }} gap-4">
        <div
          v-for="(row, rowIndex) in computedGrid"
          :key="rowIndex"
          class="flex"
        >
          <div
            v-for="(cell, columnIndex) in row"
            :key="columnIndex"
            class="border border-gray-300 p-2"
            :style="{ width: '4rem', height: '4rem' }"
          >
            {{ cell }}
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from "vue"

const totalSeats = ref(12) // Initial value for total number of seats
const maxSeatsPerRow = ref(4) // Initial value for maximum seats per row

const computedColumns = computed(() => {
  const seats = parseInt(totalSeats.value)
  const maxSeats = parseInt(maxSeatsPerRow.value)

  if (isNaN(seats) || isNaN(maxSeats) || seats <= 0 || maxSeats <= 0) {
    console.error("Invalid input for total seats or maximum seats per row.")
    return 0
  }

  return Math.ceil(seats / maxSeats)
})

const computedGrid = computed(() => {
  const seats = parseInt(totalSeats.value)
  const maxSeats = parseInt(maxSeatsPerRow.value)

  if (isNaN(seats) || isNaN(maxSeats) || seats <= 0 || maxSeats <= 0) {
    console.error("Invalid input for total seats or maximum seats per row.")
    return []
  }

  const numFullRows = Math.floor(seats / maxSeats)
  const remainderSeats = seats % maxSeats

  const newGrid = []
  for (let i = 0; i < numFullRows; i++) {
    const row = []
    for (let j = 0; j < maxSeats; j++) {
      row.push(`Seat ${i * maxSeats + j + 1}`)
    }
    newGrid.push(row)
  }

  if (remainderSeats > 0) {
    const lastRow = []
    for (let i = 0; i < remainderSeats; i++) {
      lastRow.push(`Seat ${numFullRows * maxSeats + i + 1}`)
    }
    newGrid.push(lastRow)
  }

  return newGrid
})

function updateGrid() {
  // No need to update the computed property directly
  // Vue will automatically update the computedGrid property when totalSeats or maxSeatsPerRow changes
}
</script>

<style scoped>
/* Add your custom styles here */
/* You can add custom styles for the grid if needed */
</style>
