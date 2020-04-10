// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  GOOGLE_MAPS_CONFIG: {
    apiKey: 'AIzaSyAD2irnyqiMg9rTjc0PEYRN7rlXRKxENjA',
    libraries: ['places'],
    language: 'es'
  },
  FIREBASE_CONFIG: {
    apiKey: 'AIzaSyB9BLy7TI0fRutI1TmiT_0sJjQhnIL5U_Q',
    authDomain: 'pharmapp-dev.firebaseapp.com',
    databaseURL: 'https://pharmapp-dev.firebaseio.com',
    projectId: 'pharmapp-dev',
    storageBucket: 'pharmapp-dev.appspot.com',
    messagingSenderId: '601968913327',
    appId: '1:601968913327:web:b1085287e850522e649d5a',
    measurementId: 'G-3EL52RP9XD'
  }
};
