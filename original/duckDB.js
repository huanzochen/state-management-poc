import { STEPS } from './constant.js'

export const importToDuckDB = (chartStateManager, cleanedData) => {
  // importToDuck(cleanedData)

  setTimeout(() => {
    chartStateManager.update((draft) => {
      draft.step = STEPS.IMPORTED
    })
  }, 2000)
}

export const queryDuckDB = (chartStateManager, offset) => {
  let PAGE_SIZE = 10000
  let page = offset / PAGE_SIZE + 1
  // duck.query(offset, QUERY)

  // 將清洗好的資料匯入 DuckDB，並分批次查詢數據
  // 假設這邊拿到第一批資料：
  const firstBatch = ['firstBatchaaa', 'firstBatchbbb']

  setTimeout(() => {
    chartStateManager.update((draft) => {
      draft.offset = offset + PAGE_SIZE
      draft.duckDBData = firstBatch
      draft.step = STEPS.DRAWING
    })
  }, 2000)
}
