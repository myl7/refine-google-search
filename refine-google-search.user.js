// ==UserScript==
// @name             myl7 refines Google Search
// @namespace        https://github.com/myl7/refine-google-search
// @version          0.1.0
// @description      Simple script to refine Google Search experience. Copy the code to arrange by youself if you do not want another user script.
// @copyright        Copyright (c) 2021 myl7
// @license          MIT
// @author           myl7
// @match            https://www.google.com/search
// @run-at           document-end
// @grant            none
// @updateURL        https://openuserjs.org/meta/myl7/myl7_refines_Google_Search.meta.js
// @downloadURL      https://openuserjs.org/install/myl7/myl7_refines_Google_Search.user.js
// @homepageURL      https://github.com/myl7/refine-google-search
// @supportURL       https://github.com/myl7/refine-google-search/issues
// @contributionURL  https://github.com/myl7/refine-google-search/pulls
// ==/UserScript==

// ==OpenUserJS==
// @author           myl7
// ==/OpenUserJS==

// Remove "translate this page" button
document.querySelectorAll('a.fl.iUh30').forEach(e => e.remove())

// Two column display
const resRoot = document.querySelector('.v7W49e')
const res = resRoot.children
let items = []
let hasLast = false
for (let i = 0; i < res.length; i++) {
  if (['SCRIPT', 'SPAN', 'STYLE'].includes(res[i].tagName)) {
    continue
  } else if (res[i].className === 'g') {
    items.push(res[i])
  } else if (res[i].children.length === 1 && res[i].children[0].className === 'g') {
    if (i === res.length - 1) {
      // The last search result is wrapped in a div
      items.push(res[i].children[0])
      res[i].remove()
      hasLast = true
    } else {
      // Thicker varient of search result
      items.push(res[i])
    }
  } else {
    items = []
  }
}

for (let i = 0; i < (hasLast ? items.length - 1 : items.length); i++) {
  items[i].remove()
}

const itemBox = document.createElement('div')
items.forEach(e => itemBox.appendChild(e))
itemBox.style.display = 'grid'
itemBox.style.gridTemplateColumns = '1fr 1fr'
itemBox.style.marginBottom = '44px'
resRoot.appendChild(itemBox)

// Decrease title font size
let style = ''
style += 'h3 { font-size: 16px !important }'

// Change bottom relative search word display
style += 'div.eqAnXb { margin-bottom: -20px }'
style += 'div.s75CSd.OhScic.AB4Wff { font-size: 14px }'
style += 'a.k8XOCe.R0xfCb.VCOFK.s8bAkb { background-color: inherit; min-height: 0; margin: 0; line-height: 24px }'
document.querySelectorAll('div.aXBZVd.zVq10e').forEach(e => e.remove())

// Change "other searches" word display
style += 'div.iDjcJe.IX9Lgd.wwB5gf { font-size: 14px }'

// Fix result block width
style += 'div.g:not(.jNVrwc.Y4pkMc) { width: 540px }'

// CSS inject helper
const addStyle = style => {
  const styleElem = document.createElement('style')
  styleElem.innerHTML = style
  document.head.appendChild(styleElem)
}
addStyle(style)
