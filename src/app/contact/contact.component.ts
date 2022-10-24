import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import {AngularFirestore,AngularFirestoreCollection  } from '@angular/fire/compat/firestore';
import { from } from 'rxjs';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;
 private collection!:AngularFirestoreCollection<any>
  constructor(private fb:FormBuilder,private toast:HotToastService,private firestore:AngularFirestore,) { }
   
  ngOnInit(): void {
    this.collection=this.firestore.collection('contact') ;
    this.contactForm = this.fb.group({
      Name: ['',Validators.required],
      email: ['',[Validators.required,Validators.email]],
      subject:['',Validators.required],
      message:['',Validators.required],
      
    });
     
  }
  submitData(value:any)
  {
   //console.log(value);
   from(this.collection.add(value))
     .pipe(
       this.toast.observe({
         success: 'your message has been send ',
         loading: 'loading..',
         error: (err)=>'Something did not work, reason: ' + err,
       })
     )
     .subscribe();
  }
  clear()
  {return this.contactForm.reset();}

}
