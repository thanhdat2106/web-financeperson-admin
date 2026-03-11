const MOCK_DELAY = 500

export async function simulateApiCall<T>(data: T, shouldFail = false): Promise<T> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error("API request failed"))
      }
      resolve(data)
    }, MOCK_DELAY)
  })
}
