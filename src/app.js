// import m from 'mithril'
import { login, state } from './spotify'
window.m = m

m.mount(document.body, {
  view : () => [
    m('h2', 'random needle drop'),
    m('hr'),
    m('p',
      'play random tracks using your Spotify account, inspired by ',
      m('a[href="https://www.youtube.com/channel/UCt_WajkNSMekKAv7g_CxOLQ"][target=_blank]','knocksquared\'s'),
      ' 7 Minute Workouts'
    ),
    m('p', 'click below to get started'),
    m('button.btn.primary', { onclick : login }, 'log in to Spotify')
  ]
})
