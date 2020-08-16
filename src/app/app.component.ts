import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Authentication App';

  loginForm =  new FormGroup({
    email: new FormControl(null,  {
      updateOn: "blur",
      validators: [Validators.required, Validators.email]
    }),
    password: new FormControl(null, {
      updateOn: "blur",
      validators: [Validators.required, Validators.minLength(6)],
    })
  });
}
