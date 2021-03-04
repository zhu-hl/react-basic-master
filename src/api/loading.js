import { Loading } from 'element-ui'
let loadingCount = 0 // Loading count for adjusting open or hide loading dialog
let loading // Save loading object for global

// Start loading
const startLoading = () => {
  // Create Loading Obj from element-ui and show
  loading = Loading.service({
    lock: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  })
  // Close loading anyway after 10 seconds
  setTimeout(endLoading, 10000)
}

// End loading
function endLoading() {
  // Close loading dialog
  loading.close()
}

// Show loading dialog
export const showLoading = () => {
  if (loadingCount === 0) {
    // If no loading is activing, call startLoading to create loading obj
    startLoading()
  }
  loadingCount += 1
}

// Hide loading
export const hideLoading = () => {
  if (loadingCount <= 0) {
    return
  }
  loadingCount -= 1
  if (loadingCount === 0) {
    endLoading()
  }
}
