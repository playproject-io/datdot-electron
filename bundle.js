(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({"/home/serapath/Desktop/DEV/CACHE/state/holding/orgs/playproject.io/DATDOT/datdot-wallet/src/datdot-wallet.js":[function(require,module,exports){

module.exports = wallet

function wallet () {
  const div = document.createElement('div')
  div.innerHTML = `
    <h1>datdot-wallet </h1>
    <p>${location.href}</p>
  `
  return div
}
},{}],"/home/serapath/Desktop/DEV/CACHE/state/holding/orgs/playproject.io/DATDOT/datdot-wallet/web/wallet.js":[function(require,module,exports){
const wallet = require('..')

document.title = 'datdot-wallet'

const el = wallet()
fetch('https://192.168.0.13:9966/').then(x=>x.text()).then(x => {
  console.log({x})
})


const style = document.createElement('style')
style.textContent = `
body { margin: 0; }
html { box-sizing: border-box; }
*, *:before, *:after { box-sizing: inherit; }
.myarrow {
  position: relative;
  padding: 12px 0;
}

.myarrow:before {
  content: '';
  height: 0;
  width: 0;
  border-width: 0 8px 12px 8px;
  border-style: solid;
  border-color: transparent transparent #eeeeee transparent;
  position: absolute;
  top: 0px;
  left: 50%;
  transform: translateX(-50%);
}

.page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #333;
  color: white;
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
}

.darwin.page {
  border-radius: 5px;
  overflow: hidden;
}`
document.head.append(style)
document.body.style = `margin: 0; border: 1px solid red;`
document.body.className = 'page darwin'
// <iframe src="https://192.168.0.13:9966/index.html"></iframe>
document.body.append(el)

},{"..":"/home/serapath/Desktop/DEV/CACHE/state/holding/orgs/playproject.io/DATDOT/datdot-wallet/src/datdot-wallet.js"}]},{},["/home/serapath/Desktop/DEV/CACHE/state/holding/orgs/playproject.io/DATDOT/datdot-wallet/web/wallet.js"]);
