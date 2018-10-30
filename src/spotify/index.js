import stream from 'mithril-stream'
import WebApi from 'spotify-web-api-js'

const loginKey = 'droptheneedle:load_nonce'

export const state = stream({})

export const login = () => {
  let nonce = Math.random().toString(36).substring(2)
  console.log(nonce)
  window.localStorage.setItem(loginKey, nonce)
  window.location.href = 
    `https://accounts.spotify.com/authorize?${ m.buildQueryString({
      state         : nonce,
      client_id     : 'e95df401c13f4fa79c3089eab6d30af7',
      response_type : 'token',
      redirect_uri  : 'http://localhost:3000',
      scope         : [
        'streaming',
        'user-read-birthdate',
        'user-read-email',
        'user-read-private',
        'playlist-read-collaborative',
        'playlist-read-private',
        'user-read-recently-played',
        'user-follow-read',
        'user-library-read',
        'user-top-read'
      ].join(',')
    })}`
}

let pageLoadNonce = localStorage.getItem(loginKey)

console.log('pageLoadNonce ' + pageLoadNonce)

const spotifySdkLoaded = new Promise((resolve) => { window.onSpotifyWebPlaybackSDKReady = resolve })

if (pageLoadNonce) {
  const spotifyCreds = m.parseQueryString(window.location.hash.substring(1))

  if (spotifyCreds.state !== pageLoadNonce) {
    console.log('pageLoadNonce does not match, clearing')
    window.localStorage.removeItem(loginKey)
    window.history.replaceState(null, null, ' ');
  } else {
    console.log('spotifycreds ', spotifyCreds)
    window.spotifycreds = spotifyCreds

    // if valid

    window.webApi = new WebApi()
    webApi.setAccessToken(spotifyCreds.access_token)

    spotifySdkLoaded.then(() => {
      console.log('spotifysdkloaded')
      const player = new Spotify.Player({
        name          : 'this is the player name parameter',
        getOAuthToken : (fn) => fn(spotifyCreds.access_token)
      })

      player.addListener('initialization_error', console.error)
      player.addListener('autherntication_error', console.error)
      player.addListener('account_error', console.error)
      player.addListener('playback_error', console.error)

      player.addListener('player_state_changed', console.log)
      player.addListener('ready', console.log)
      player.addListener('not_ready', console.log)

      player
        .connect()
        .then((success) => {
          if (success) {
            console.log('web playback connected')
          }
        })

      window.player = player
    })
  }
}
