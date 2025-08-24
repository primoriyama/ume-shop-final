import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {

  checkoutForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.checkoutForm = this.fb.group({
      nomeCompleto: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      endereco: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  get nomeCompleto() { return this.checkoutForm.get('nomeCompleto'); }
  get email() { return this.checkoutForm.get('email'); }
  get endereco() { return this.checkoutForm.get('endereco'); }

  onSubmit(): void {
    if (this.checkoutForm.valid) {
      console.log('Formulário enviado!', this.checkoutForm.value);
      this.toastr.success('Sua compra foi finalizada com sucesso!', 'Pedido Recebido!');
      
      this.checkoutForm.reset();
    } else {
      console.error('Formulário inválido');
    }
  }
}
