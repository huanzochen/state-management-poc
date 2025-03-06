import ChartStateManager from './chartManager.js'
import { processDataAndClean } from './processData.js'
import { importToDuckDB, queryDuckDB } from './duckDB.js'
import { drawChart } from './drawChart.js'
import { STEPS } from './constant.js'

// 假設初始 state 結構如下，包含各模組的資料欄位
const initialState = {
  dataCleaned: null, // A. 資料處理結果
  duckDBData: [], // B. DuckDB 查詢結果
  offset: null, // C. 繪圖模組相關設定或緩存數據
  step: STEPS.INIT,
  // 可再擴充其他需要管理的狀態資訊
}

const chartStateManager = new ChartStateManager(initialState)

console.log('chartStateManager.getState: ', chartStateManager.getState())

// 訂閱更新以便在 CLEANED 完成後觸發 import DuckDB
chartStateManager.subscribe((state) => {
  if (state.step === STEPS.CLEANED) {
    console.log('chartStateManager.getState: ', chartStateManager.getState())

    // 執行 DuckDB 匯入邏輯
    importToDuckDB(chartStateManager, state.dataCleaned)
  }
})

// 訂閱更新以便在資料清洗完成後觸發 DuckDB 匯入
chartStateManager.subscribe((state) => {
  if (state.step === STEPS.IMPORTED) {
    console.log('chartStateManager.getState: ', chartStateManager.getState())

    // 執行 DuckDB 匯入邏輯
    queryDuckDB(chartStateManager, state.offset)
  }
})

// 監聽 duckDBData 變化，通知繪圖模組開始繪圖
chartStateManager.subscribe((state) => {
  if (state.step === STEPS.DRAWING && state.duckDBData.length > 0) {
    console.log('chartStateManager.getState: ', chartStateManager.getState())

    // 執行繪圖動作
    drawChart(chartStateManager, state.duckDBData)
  }
})

processDataAndClean(['a file'], chartStateManager)
