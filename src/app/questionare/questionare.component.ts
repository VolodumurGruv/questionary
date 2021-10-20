import { Component, OnInit } from '@angular/core';
import {
  EmailValidator,
  FormArray,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { EmaileService } from '../services/email.service';
import { uniqueEmail } from '../validators/email.validator';

@Component({
  selector: 'app-questionare',
  templateUrl: './questionare.component.html',
  styleUrls: ['./questionare.component.scss'],
  providers: [EmailValidator],
})
export class QuestionareComponent implements OnInit {
  frameworks = ['angular', 'react', 'vue'];
  versions = {
    angular: ['1.1.1', '1.2.1', '1.3.3'],
    react: ['2.1.2', '3.2.4', '4.3.1'],
    vue: ['3.3.1', '5.2.1', '5.1.3'],
  };

  disable: boolean = true;
  vers: string[] = [];

  formQuestion = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: [
      '',
      {
        validators: [Validators.required, Validators.email],
        asyncValidators: [uniqueEmail(this.emailService)],
        updateOn: 'blur',
      },
    ],
    dateOfBirth: ['', Validators.required],
    frameworks: this.fb.group({
      framework: ['', Validators.required],
      frameworkVersion: ['', Validators.required],
    }),
    hobby: this.fb.array([
      this.fb.group({
        name: ['', Validators.required],
        duration: ['', Validators.required],
      }),
    ]),
  });

  constructor(private fb: FormBuilder, private emailService: EmaileService) {}

  ngOnInit() {
    console.log(this.formQuestion);
  }

  getFrameworkVersion() {
    const framework = this.formQuestion.value.frameworks?.framework;

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
    console.log(this.formQuestion.controls.email.errors);

    console.log(this.getHobbies().valid);
  }

  save() {
    console.log(this.formQuestion.controls.email);
  }
}
