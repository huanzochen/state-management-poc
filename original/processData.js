import { STEPS } from './constant.js'

export const processDataAndClean = (file, chartStateManager) => {
  // 處理與清洗檔案...
  const cleanedData = ['testDuck', 'testDuck2', 'testDuck3']

  setTimeout(() => {
    // 更新狀態，將 dataCleaned 填入
    chartStateManager.update((draft) => {
      draft.dataCleaned = cleanedData
      draft.step = STEPS.CLEANED
    })
  }, 2000)
}
