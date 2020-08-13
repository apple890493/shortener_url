
function generateUrl() {
  const allItems = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
  let shortCode = ''
  for (let i = 1; i <= 5; i++) {
    shortCode += allItems.charAt(Math.floor(Math.random() * allItems.length))
  }
  console.log('a', shortCode)
  return shortCode
}

module.exports = generateUrl