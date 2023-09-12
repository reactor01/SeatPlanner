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
            id="allSeats"
            v-model="totalSeats"
            type="number"
            class="rounded-lg border border-gray-300 px-3 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Number of seats"
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
            id="maxSeatsPerRow"
            v-model="maxSeatsPerRow"
            type="number"
            class="rounded-lg border border-gray-300 px-3 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Max seats per row"
            @input="updateGrid"
          />
        </div>
      </div>
    </section>

    <!-- Display selected seats as a comma-separated list -->
    <section class="selected-seats">
      <h2 class="mb-2 text-lg font-semibold text-gray-700">
        Selected Seats {{ selectedSeatNumbers }}
      </h2>
    </section>

    <!-- Dynamic grid system using Tailwind CSS grid -->
    <section>
      <div class="grid grid-cols-{{ computedColumns }} ">
        <div
          v-for="(row, rowIndex) in computedGrid"
          :key="rowIndex"
          class="flex"
        >
          <div
            v-for="(cell, columnIndex) in row"
            :key="columnIndex"
            class="p-1"
            :style="{ width: '4rem', height: '4rem' }"
          >
            <SeatComp
              v-model="selectedSeats[cell]"
              name="seat"
              :cell="cell"
              @seat-selected="onSeatSelected"
            />
            <!-- {{ cell }} -->
            <!-- Add this line to log the cell content -->
          </div>
        </div>
      </div>
    </section>

    <!-- Add a button to trigger the screenshot capture and download -->
    <section class="download-button">
      <button
        class="cursor-pointer text-blue-500 hover:underline"
        @click="downloadScreenshot"
      >
        Download Screenshot
      </button>
    </section>
  </div>
</template>

<script setup>
  import { ref, computed, watch, reactive } from 'vue'
  import html2canvas from 'html2canvas' // Import html2canvas library
  import SeatComp from '../components/SeatComp.vue'

  const gosho = ''

  const totalSeats = ref(12) // Initial value for total number of seats
  const maxSeatsPerRow = ref(4) // Initial value for maximum seats per row
  const selectedSeats = reactive({})

  // Watch for changes in selected seats

  watch(selectedSeats, newSelectedSeats => {
    console.log('Selected Seats:', newSelectedSeats)
  })

  // Function to capture a screenshot and generate a download link
  const downloadScreenshot = async () => {
    const url = await captureScreenshot()
    if (url) {
      // Create a temporary link element to trigger the download
      const link = document.createElement('a')
      link.href = url
      link.download = 'seating-grid.png' // Set the desired filename
      link.click()
    } else {
      console.error('Error capturing or downloading the screenshot.')
    }
  }

  // Function to capture a screenshot and generate a download link
  const captureScreenshot = async () => {
    const gridElement = document.querySelector('.grid') // Replace with the actual grid container element

    if (!gridElement) {
      console.error('Grid element not found')
      return
    }

    try {
      // Capture the grid as a screenshot
      const canvas = await html2canvas(gridElement)

      // Convert the screenshot to a data URL
      const screenshotDataURL = canvas.toDataURL('image/png')

      // Create a Blob from the data URL
      const blob = dataURItoBlob(screenshotDataURL)

      // Create a URL for the Blob
      const url = window.URL.createObjectURL(blob)

      // Return the URL as the download link
      return url
    } catch (error) {
      console.error('Error capturing screenshot:', error)
      return null
    }
  }

  // Function to convert data URI to Blob
  const dataURItoBlob = dataURI => {
    const byteString = atob(dataURI.split(',')[1])
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
    const ab = new ArrayBuffer(byteString.length)
    const ia = new Uint8Array(ab)
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i)
    }
    return new Blob([ab], { type: mimeString })
  }

  const computedColumns = computed(() => {
    const seats = parseInt(totalSeats.value)
    const maxSeats = parseInt(maxSeatsPerRow.value)

    if (isNaN(seats) || isNaN(maxSeats) || seats <= 0 || maxSeats <= 0) {
      console.error('Invalid input for total seats or maximum seats per row.')
      return 0
    }

    return Math.ceil(seats / maxSeats)
  })

  const selectedSeatNumbers = computed(() => {
    const selectedSeatNames = Object.keys(selectedSeats).filter(
      seatName => selectedSeats[seatName]
    )
    return selectedSeatNames
      .map(seatName => seatName.replace('Seat ', ''))
      .join(', ')
  })

  const onSeatSelected = (seatName, isSelected) => {
    // Update the selectedSeats object when a seat is selected or deselected
    if (isSelected) {
      selectedSeats[seatName] = true
    } else {
      delete selectedSeats[seatName]
    }
  }

  const computedGrid = computed(() => {
    const seats = parseInt(totalSeats.value)
    const maxSeats = parseInt(maxSeatsPerRow.value)

    if (isNaN(seats) || isNaN(maxSeats) || seats <= 0 || maxSeats <= 0) {
      console.error('Invalid input for total seats or maximum seats per row.')
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
