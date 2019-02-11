import green_curry from 'green_curry'
green_curry (['globalize', 'short F.c'])

document.title = 'Beneficent Bags'

window.HTTP_auth = F.c (
  D.get ('body')
  >> JSON.parse
  >> D.get ('auth')
)

window.HTTP_resp = F.c (
  D.get ('body')
  >> JSON.parse
  >> D.get ('response')
)

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]
window.time_string = timestamp => {
  const date = new Date (timestamp)
  return `${date.toLocaleDateString ()} ${date.toLocaleTimeString ()}`
}

window.idify = S.replace (' ') ('-')

if (location.protocol != 'https:') {
  location.replace(`https:${window.location.href.substring(window.location.protocol.length)}`)
}

import {} from './styles/general.css'
