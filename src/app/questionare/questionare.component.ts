import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { EmaileService } from '../services/email.service';
import { uniqueEmail } from '../validators/email.validator';
import { PickDateAdapter, _pickFormats } from '../helpres/formatDate';
import { emailSymbol } from '../validators/email-symbol.validator';
import { USER_DATA } from '../interfaces/interface';

@Component({
  selector: 'app-questionare',
  templateUrl: './questionare.component.html',
  styleUrls: ['./questionare.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: PickDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: _pickFormats },
  ],
})
export class QuestionareComponent implements OnInit {
  frameworks = ['angular', 'react', 'vue'];
  versions = {
    angular: ['1.1.1', '1.2.1', '1.3.3'],
    react: ['2.1.2', '3.2.4', '4.3.1'],
    vue: ['3.3.1', '5.2.1', '5.1.3'],
  };

  minDate = new Date(`${new Date().getFullYear() - 100}-01-01`);
  maxDate = new Date(`${new Date().getFullYear() - 10}-01-01`);

  disable: boolean = true;
  vers: string[] = [];
  userData?: USER_DATA;

  formQuestion = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: [
      '',
      {
        validators: [Validators.required, Validators.email, emailSymbol()],
        asyncValidators: [uniqueEmail(this.emailService)],
        updateOn: 'blur',
      },
    ],
    dateOfBirth: ['', Validators.required],
    framework: ['', Validators.required],
    frameworkVersion: ['', Validators.required],
    hobby: this.fb.array([
      this.fb.group({
        name: ['', Validators.required],
        duration: ['', Validators.required],
      }),
    ]),
  });

  constructor(
    private fb: FormBuilder,
    private emailService: EmaileService,
    _dateAdapter: DateAdapter<any>
  ) {
    _dateAdapter.setLocale;
  }

  ngOnInit() {}

  getFrameworkVersion() {
    const framework = this.formQuestion.value.framework;

    let i = 0;
    for (const fr in this.versions) {
      switch (framework) {
        case fr:
          this.vers = Object.values(this.versions)[i];
          break;
      }
      i++;
    }

    if (this.vers.length) {
      this.disable = false;
    }

    return this.vers;
  }

  getHobbies() {
    // return this.formQuestion.value.hobby;
    return this.formQuestion.get('hobby') as FormArray;
  }

  addHobby() {
    this.getHobbies().push(
      this.fb.group({
        name: ['', Validators.required],
        duration: ['', Validators.required],
      })
    );
  }

  save() {
    this.userData = this.formQuestion.value;
    console.log(this.userData);
  }
}
