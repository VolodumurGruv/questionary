import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-questionare',
  templateUrl: './questionare.component.html',
  styleUrls: ['./questionare.component.scss'],
})
export class QuestionareComponent implements OnInit {
  stacks = ['angular', 'react', 'vue'];
  versions = {
    angular: ['1.1.1', '1.2.1', '1.3.3'],
    react: ['2.1.2', '3.2.4', '4.3.1'],
    vue: ['3.3.1', '5.2.1', '5.1.3'],
  };

  formQuestion = this.fb.group({
    firstName: [''],
    sureName: [''],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}
}
