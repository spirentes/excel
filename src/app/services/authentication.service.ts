import { Injectable } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { from, switchMap, pipe } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  curentUser = authState(this.auth);
  constructor(private auth: Auth) {}
  login(email: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }
  signUp(userName: string, email: string, password: string) {
    return from(
      createUserWithEmailAndPassword(this.auth, email, password)
    ).pipe(
      switchMap(({ user }) => updateProfile(user, { displayName: userName }))
    );
  }
  logout() {
    return from(this.auth.signOut());
  }
}
