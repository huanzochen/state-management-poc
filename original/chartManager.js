export default class ChartStateManager {
  constructor(initialState) {
    this.state = initialState
    this.listeners = []
  }

  // 更新狀態的方法，接受一個 callback 來修改 draft
  update(fn) {
    // 使用 structuredClone 來複製舊的 state
    const draft = structuredClone(this.state)
    // 在 draft 上執行更新邏輯
    fn(draft)
    // 替換成新狀態
    this.state = draft
    // 通知所有訂閱者
    this.listeners.forEach((listener) => listener(this.state))
  }

  // 訂閱狀態變更
  subscribe(listener) {
    this.listeners.push(listener)
    // 回傳取消訂閱的方法
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener)
    }
  }

  // 如果需要，提供一個取得當前 state 的方法
  getState() {
    return this.state
  }
}
