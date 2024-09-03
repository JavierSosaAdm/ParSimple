import { Injectable } from '@angular/core';
import { enviroment1 } from '../../enviroments/enviroments';
@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  constructor() { }
  getNodeVersion(): string {
      return 'browser'
  }

  getBrowserVersion(): string {
    const navigator = window.navigator;
    const userAgent = navigator.userAgent;
    if (userAgent.indexOf('Opera') !== -1) {
      const match = userAgent.match(/opr\/([0-9]+)\.[0-9]+/i);
      if (match) {
        return match[1]; // Extraer la versión de Opera
      } else {
        return 'Unknown'; // Si no se encuentra la versión de Opera, devuelve "Unknown"
      }
    } else {
      const match = userAgent.match(/chrome\/([0-9]+)\.[0-9]+/i);
      if (match) {
        return match[1]; // Extraer la versión de Opera
      } else {
        return 'Unknown'; // Si no se encuentra la versión de Opera, devuelve "Unknown"
      }
    }
  }

  // getTrackingId(): string {
  //   return 'undefined';
  // }
}
