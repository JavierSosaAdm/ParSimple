import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  isOpenSource = new BehaviorSubject<boolean>(false);
  isOpen$ = this.isOpenSource.asObservable();
  openModal() {
    this.isOpenSource.next(true);
  }

  closeModal() {
    this.isOpenSource.next(false);
  }
}
