
function generateUrl(length) {
  const allItems = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
  let shortCode = ''
  for (let i = 1; i <= length; i++) {
    shortCode += allItems.charAt(Math.floor(Math.random() * allItems.length))
  }
  return shortCode
}

module.exports = generateUrl