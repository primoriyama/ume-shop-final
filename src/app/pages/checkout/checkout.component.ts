import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CepService } from '../../shared/services/cep.service';
import { debounceTime, distinctUntilChanged, filter, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  checkoutForm!: FormGroup;
  buscandoCep = false;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private cepService: CepService
  ) {}

  ngOnInit(): void {
    this.checkoutForm = this.fb.group({
      nomeCompleto: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      cep: ['', [Validators.required, Validators.pattern(/^\d{5}-?\d{3}$/)]],
      rua: [{ value: '', disabled: true }, [Validators.required]],
      numero: ['', [Validators.required]],
      complemento: [''],
      bairro: [{ value: '', disabled: true }, [Validators.required]],
      cidade: [{ value: '', disabled: true }, [Validators.required]],
      estado: [{ value: '', disabled: true }, [Validators.required]],
    });

    this.escutarMudancasCep();
  }

  escutarMudancasCep(): void {
    this.checkoutForm.get('cep')?.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      filter(cep => cep?.length === 8 || cep?.length === 9),
      tap(() => this.buscandoCep = true),
      switchMap(cep => this.cepService.buscarCep(cep))
    ).subscribe(dadosCep => {
      this.buscandoCep = false;
      if (dadosCep.erro) {
        this.toastr.error('CEP não encontrado.', 'Erro');
        this.limparEndereco();
      } else {
        this.preencherEndereco(dadosCep);
      }
    });
  }

  preencherEndereco(dados: any): void {
    this.checkoutForm.patchValue({
      rua: dados.logradouro,
      bairro: dados.bairro,
      cidade: dados.localidade,
      estado: dados.uf
    });
  }

  limparEndereco(): void {
    this.checkoutForm.patchValue({
      rua: '',
      bairro: '',
      cidade: '',
      estado: ''
    });
  }

  get nomeCompleto() { return this.checkoutForm.get('nomeCompleto'); }
  get email() { return this.checkoutForm.get('email'); }
  get cep() { return this.checkoutForm.get('cep'); }

  onSubmit(): void {
    if (this.checkoutForm.valid) {
      console.log('Formulário enviado!', this.checkoutForm.value);
      this.toastr.success('Sua compra foi finalizada com sucesso!', 'Pedido Recebido!');
      this.checkoutForm.reset();
    } else {
      this.toastr.error('Por favor, corrija os erros no formulário.', 'Erro de Validação');
    }
  }
}
