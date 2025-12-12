import {Component, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import emailjs from '@emailjs/browser';
import {Subscription} from "rxjs";
import {TranslateService} from "@ngx-translate/core";
import {ContactItem, followContactItems} from "@app/config/contact";
import {SnackBarService} from "@app/services/snack-bar.service";

interface FormField {
  label: string;
  placeholder: string;
  required: string;
  email?: string;
  topics?: string[];
}

@Component({
  selector: 'contact-me',
  templateUrl: './contact-me.component.html',
  styleUrl: './contact-me.component.scss'
})
export class ContactMeComponent implements OnDestroy {
  contactItems: ContactItem[] = followContactItems;

  formGroup: FormGroup = this.fb.group({
    topic: ['', Validators.required],
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', Validators.required],
    message: ['', Validators.required]
  });
  topic: FormField = {label: '', placeholder: '', required: '', topics: []};
  name: FormField = {label: '', placeholder: '', required: ''};
  email: FormField = {label: '', placeholder: '', required: '', email: ''};
  subject: FormField = {label: '', placeholder: '', required: ''};
  message: FormField = {label: '', placeholder: '', required: ''};
  subs: Subscription = new Subscription();

  constructor(private fb: FormBuilder,
              private translateService: TranslateService,
              private snackBarService: SnackBarService) {
    this.subs = this.translateService.onLangChange.subscribe(() => {
      const form = this.translateService.instant('contact.form');
      this.topic = form['topic'] as FormField;
      this.name = form['name'] as FormField;
      this.email = form['email'] as FormField;
      this.subject = form['subject'] as FormField;
      this.message = form['message'] as FormField;
    });
  }

  send(value: any) {
    emailjs.send(
      'service_3pxe8db',
      'template_wfct2du',
      value,
      {publicKey: 'GIin1cyqwBakNvJBr'}
    ).then(
      () => {
        this.snackBarService.openSnackBar(
          'snackBar.messageSentSuccessfully',
          'Ok'
        );
      },
      () => {
        this.snackBarService.openSnackBar(
          'snackBar.messageSentFailed',
          'snackBar.retry'
        );
      }
    ).catch(
      () => {
        this.snackBarService.openSnackBar(
          'snackBar.connectionError',
          'Ok'
        );
      }
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
