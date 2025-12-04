import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FrutasService } from '../services/frutas';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon';
@Component({
  selector: 'app-form-frutas',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule,MatSelectModule,MatFormFieldModule,CommonModule,MatSnackBarModule,MatIconModule],
  templateUrl: './form-frutas.html',
  styleUrl: './form-frutas.css'
})
export class FormFrutas {

  form!: FormGroup;
  categorias = ['Doce', 'Ácida', 'Semi-ácida', 'Oleaginosa','Seca','Hiper-Hídrica'];

  constructor(
  private fb: FormBuilder,
  private service: FrutasService,
  private router: Router,
  private route: ActivatedRoute,
  private snack: MatSnackBar
  ){
  this.form = this.fb.group({
  nome: ['', Validators.required],
  descricao: ['', Validators.required],
  preco: ['', [Validators.required, Validators.min(0)]],
  quantidade: ['', [Validators.required, Validators.min(1)]],
  categoria: ['', Validators.required],
  imagem: ['',],
  
  });

  const id = this.route.snapshot.paramMap.get('id');
  if (id) {
    this.service.buscarPorId(id!).subscribe(f => {
      this.form.patchValue(f);
    });
  }
  }

  salvar() {
  if (this.form.invalid) return;

  const id = this.route.snapshot.paramMap.get('id');

  if (id) {
    this.service.editar(id!, this.form.value).subscribe(() => {
      this.router.navigate(['/']);
    });
    this.snack.open(' Fruta alterada com sucesso!', 'OK', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
  } else {
    this.service.cadastrar(this.form.value).subscribe(() => {
      this.router.navigate(['/']);
    });
    this.snack.open(' Fruta Cadastrada com sucesso!', 'OK', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
  }
  }

  voltar() {
  this.router.navigate(['/']);
  }

  
}
