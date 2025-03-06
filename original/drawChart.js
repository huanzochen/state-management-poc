import { STEPS } from './constant.js'

export const drawChart = (chartStateManager, dataBatch) => {
  // const drawer = new BasicDrawer();

  // 使用 drawShape, drawAxis, drawLine 等封裝的 class 繪製圖表
  // drawer.drawAxis(/* 參數 */);
  // drawer.drawShape(/* 參數 */);
  // drawer.drawLine(/* 參數 */);

  console.log('drawing')

  setTimeout(() => {
    // 更新狀態中繪圖相關的資訊（例如已繪製進度），方便後續批次繪製
    chartStateManager.update((draft) => {
      draft.step = STEPS.IMPORTED
    })
  }, 2000)
}
