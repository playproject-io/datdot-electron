
module.exports = wallet

function wallet () {
  const div = document.createElement('div')
  div.innerHTML = `
    <h1>datdot-wallet </h1>
    <p>${location.href}</p>
  `
  return div
}