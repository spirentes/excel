import { Injectable,NgZone } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { from, switchMap, pipe, observable, BehaviorSubject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  curentUser = authState(this.auth);
  role!: string;
  constructor(
    private auth: Auth,
    private firestore: AngularFirestore,
    private route: Router,
    private ngZone: NgZone
  ) {}
  public CurrentUser: any;
  public userStatus!: string;
  public userStatusChanges: BehaviorSubject<string> =
    new BehaviorSubject<string>(this.userStatus);

  setUserStatus(userStatus: any): void {
    this.userStatus = userStatus;
    this.userStatusChanges.next(userStatus);
  }

  login(email: string, password: string) {
    return from(
      signInWithEmailAndPassword(this.auth, email, password)
        .then((user) => {
          this.firestore
            .collection('users')
            .ref.where('email', '==', user.user.email)
            .onSnapshot((snap) => {
              snap.forEach((userRef:any) => {
              
                console.log('userRef', userRef.data());
                this.CurrentUser = userRef.data();
                //setUserStatus
                this.setUserStatus(this.CurrentUser);
                if (userRef.data().role !== 'admin') {
                  this.route.navigate(['/home']);
                } else {
                  this.route.navigate(['/admin']);
                }
              });
            });
        })
        .catch((err) => err)
    );
  }
  signUp(userName: string, email: string, password: string) {
    return from(
      createUserWithEmailAndPassword(this.auth, email, password)
    ).pipe(
      switchMap(({ user }) => {
        const data = {
          id: user.uid,
          email: user.email,
          role: 'user',
          userName: userName,
          password: password,
        };
        this.submitData(data);
        return updateProfile(user, { displayName: userName });
      })
    );
  }

  logout() {
    return from(this.auth.signOut());
  }

  submitData(data: any) {
    this.firestore.collection('users').doc(data.id).set({
      username: data.userName,
      email: data.email,
      password: data.password,
      role: data.role,
    });
  }

 /* verify(userId: any) {
    var docRef = this.firestore.collection('users').doc(userId);
    docRef.get().subscribe((doc: any) => {
      if (doc.exists) {
        this.role = doc.get('role');
        //localStorage.setItem('role_user', this.role);

        if (this.role === 'admin') {
          this.route.navigate(['/admin']);
        }
      } else {
        this.route.navigate(['/home']);
      }
    });
    return this.role;
  }*/

  userChanges() {
    this.auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        this.firestore
          .collection('users')
          .ref.where('email', '==', currentUser.email)
          .onSnapshot((snap) => {
            snap.forEach((userRef:any) => {
              this.CurrentUser = userRef.data();
              //setUserStatus
              this.setUserStatus(this.CurrentUser);
              console.log('teb3a userChanges',this.userStatus);

              if (userRef.data().role !== 'admin') {
                this.ngZone.run(() => this.route.navigate(['/home']));
              } else {
                this.ngZone.run(() => this.route.navigate(['/admin']));
              }
            });
          });
      } else {
        //this is the error you where looking at the video that I wasn't able to fix
        //the function is running on refresh so its checking if the user is logged in or not
        //hence the redirect to the login
        this.ngZone.run(() => this.route.navigate(['/login']));
      }
    });
  }
}
