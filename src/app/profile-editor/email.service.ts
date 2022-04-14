import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private existingEmailes = ['test@test.test'];

  checkIfEmailExists(value: string) {
    return of(this.existingEmailes.some((a) => a === value)).pipe(
      delay(2000)
    );
  }
}