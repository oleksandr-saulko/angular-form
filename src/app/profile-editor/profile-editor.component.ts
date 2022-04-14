import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Version } from './types';
import { EmailService } from './email.service';
import { EmailValidator } from './email.validator';


@Component({
  selector: 'app-profile-editor',
  templateUrl: './profile-editor.component.html',
  styleUrls: ['./profile-editor.component.scss'],
})
export class ProfileEditorComponent implements OnInit {
  frameworks = ['Angular', 'React', 'Vue'];

  versions: Version = {
    angular: ['1.1.1', '1.2.1', '1.3.3'],
    react: ['2.1.2', '3.2.4', '4.3.1'],
    vue: ['3.3.1', '5.2.1', '5.1.3'],
  };

  version!: Version;
  selectedValue = '';
  frameworkVersion: String[] | undefined;
  email!: FormControl;

  profileForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    dateOfBirth: ['', Validators.required],
    framework: ['', Validators.required],
    frameworkVersion: ['', Validators.required],
    email: [
      '',
      [Validators.required, Validators.email],
      [EmailValidator.createValidator(this.emailService)],
    ],
    hobby: this.fb.array([]),
  });

  constructor(private fb: FormBuilder, private emailService: EmailService) {}

  ngOnInit(): void {}

  setVal(valData: string) {
    this.selectedValue = valData;
    const a = Object.entries(this.versions).filter((key) =>
      this.selectedValue.includes(key[0])
    );
    this.version = Object.fromEntries(a);
    this.frameworkVersion = Object.values(this.version)[0];
  }

  onSubmit() {
    console.warn({
      ...this.profileForm.value,
      dateOfBirth: this.profileForm.value.dateOfBirth
        .toLocaleDateString('ru-Ru')
        .split('.')
        .join('-'),
    });
  }

  addHobby() {
    if (this.hobby.length >= 5) {
      return;
    }
    const hobbyForm = this.fb.group({
      name: ['', Validators.required],
      duration: ['', Validators.required],
    });

    this.hobby.push(hobbyForm);
  }

  deleteHobby(hobbyIndex: number) {
    this.hobby.removeAt(hobbyIndex);
  }

  get hobby() {
    return this.profileForm.controls['hobby'] as FormArray;
  }
}
