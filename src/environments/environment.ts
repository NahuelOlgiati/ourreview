// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyBWNHoG457SA4LLgwygs7zkNtjpSYUYlf8',
    authDomain: 'ourreview-50428.firebaseapp.com',
    databaseURL: 'https://ourreview-50428.firebaseio.com',
    projectId: 'ourreview-50428',
    storageBucket: 'ourreview-50428.appspot.com',
    messagingSenderId: '157165469248'
  },
  theMovieDB: {
    url: 'https://api.themoviedb.org/3/',
    partner: '431bc17da732dfb3be082e58f7a5cf27'
  },
  googleBooks: {
    url: 'https://www.googleapis.com/books/v1/volumes',
    maxResults: 20
  },
  spotify: {
    client_id: 'b7b972696c034f8e98eb7f5311c95ea1',
    client_secret: 'c4b68ce29a2447b4a1c964d3bd71074a',
    url: 'https://api.spotify.com/v1',
    authorizationTokenUrl: 'https://accounts.spotify.com/api/token',
    maxResults: 20
  }
};
