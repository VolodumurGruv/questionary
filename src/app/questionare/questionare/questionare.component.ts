import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-questionare',
  templateUrl: './questionare.component.html',
  styleUrls: ['./questionare.component.scss'],
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
    firstName: [''],
    lastName: [''],
    email: [''],
    dateOfBirth: [''],
    frameworks: this.fb.group({
      framework: [''],
      frameworkVersion: [''],
    }),
    hobby: this.fb.array([{ name: '', duration: '' }]),
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

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
    return this.formQuestion.value.hobby;
  }

  addHobby() {
    console.log(this.getHobbies());
    this.getHobbies().push({ name: '', duration: '' });
  }

  save() {
    console.log(this.formQuestion.value.firstName);
  }
}
