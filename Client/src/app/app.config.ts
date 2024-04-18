import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { initializeApp } from 'firebase/app'

import { routes } from './app.routes';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';


export const firebaseConfig = {
  apiKey: "AIzaSyATe-tX6dv7v_Go4yLowILRjOgh8pHaBl0",
  authDomain: "parsimple-3fd79.firebaseapp.com",
  projectId: "parsimple-3fd79",
  storageBucket: "parsimple-3fd79.appspot.com",
  messagingSenderId: "317153664919",
  appId: "1:317153664919:web:0b179aeaf9c252b2b66ed2"
}
initializeApp(firebaseConfig);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withHashLocation()),
    provideHttpClient(),
    importProvidersFrom(
      HttpClientModule,
      AngularFireModule.initializeApp(firebaseConfig),
      AngularFirestoreModule
    )
  ]
};
