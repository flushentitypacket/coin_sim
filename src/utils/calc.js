export const blockchainSizeAtTime = (t, blockSize, blockDifficulty) => {
  return t / blockDifficulty * blockSize
}
