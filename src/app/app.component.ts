import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { CsrfService } from './services/csrf.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, JsonPipe]
})
export class AppComponent implements OnInit {
  form: FormGroup;
  csrfToken = '';
  response: unknown;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private csrf: CsrfService
  ) {
    this.form = this.fb.group({
      name: [''],
      email: ['']
    });
  }

  // Ni bien se inicializa, llamo al endpoint de GET Token
  ngOnInit(): void {
    this.csrf.getToken().subscribe(token => {
      this.csrfToken = token
    });
  }

  submit() {
    const headers = new HttpHeaders({ 'X-CSRF-Token': this.csrfToken });

    this.http
      .post('http://localhost:3000/contact', this.form.value, {
        headers,
        withCredentials: true
      })
      .subscribe(res => (this.response = res));
  }
}