import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import {
  Storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from '@angular/fire/storage';
import { HotToastService } from '@ngneat/hot-toast';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { from, pipe } from 'rxjs';
@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss'],
})
export class JobsComponent implements OnInit {
  jobForm!: FormGroup;
  options = ['Spanich', 'English', 'French'];
  public file: any = {};
  constructor(
    private fb: FormBuilder,
    public storage: Storage,
    private firestore: AngularFirestore,
    private toast: HotToastService
  ) {}

  ngOnInit(): void {
    this.jobForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      tel: ['', [Validators.required, Validators.pattern('[0-9]{8}')]],
      service: [''],
      message: ['', Validators.required],
    });
  }
  submitData(value: any,cvURL:any) {
    from(
      this.firestore.collection('jobs').add({
        name: value.get('name').value,
        email: value.get('email').value,
        tel:value.get('tel').value,
        message:value.get('message').value,
        service:value.get('service').value,
        cv: cvURL,
      })
    )
      .pipe(
        this.toast.observe({
          success: 'your application has been send ',
          loading: 'loading..',
          error: (err) => 'Something did not work, reason: ' + err,
        })
      )
      .subscribe();
  }
  chooseFile(event: any) {
    this.file = event.target.files[0];
  }
  addData() {
    const storageRef = ref(this.storage, 'cv' + this.file.name);
    const uploadTask = uploadBytesResumable(storageRef, this.file);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      },
      (error) => {
        console.log(error.message);
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          this.submitData(this.jobForm,downloadURL)
          console.log('File available at', downloadURL);
        });
      }
    );
  }
}
