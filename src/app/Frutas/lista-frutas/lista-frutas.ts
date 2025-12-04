import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { FrutasService } from '../services/frutas';
import { CurrencyPipe } from '@angular/common';
import { Fruta } from '../model/fruta';
import { ChangeDetectorRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-lista-frutas',
  standalone: true,
  imports: [MatTableModule, CurrencyPipe,MatButtonModule,RouterModule, MatFormFieldModule,MatInputModule,MatPaginatorModule,MatSortModule,MatSnackBarModule,MatIconModule,CommonModule,MatToolbarModule],
  templateUrl: './lista-frutas.html',
  styleUrl: './lista-frutas.css'
})
export class ListaFrutas {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['nome', 'imagem','descricao', 'preco','quantidade','categoria','acoes'];
  dataSource = new MatTableDataSource<any>([]);
  frutaSelecionada: any = null;


  
  carregar() {
  this.service.listar().subscribe(frutas => {
    
    this.dataSource.data = frutas;

    setTimeout(() => {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  });
  });
  }

  constructor(
  private service: FrutasService,
  private cdr: ChangeDetectorRef,
   private snack: MatSnackBar
  ) {
   this.carregar();
  }

  excluir(id: string) {
  const confirmou = confirm('Tem certeza que deseja excluir esta fruta?');

  if (confirmou) {
    this.service.excluir(id).subscribe(() => {
      this.carregar();

      this.snack.open(' Fruta excluída com sucesso!', 'OK', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
    });
  }
  }


  editar(id: string) {
  window.location.href = `/editar/${id}`;
  }

  filtrar(event: Event) {
  const filtro = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filtro.trim().toLowerCase();

  this.dataSource.filterPredicate = (data: any, filter: string) => {
    return (
      data.nome.toLowerCase().includes(filter) ||
      data.descricao.toLowerCase().includes(filter) ||
      data.preco.toString().includes(filter) ||
      data.quantidade.toString().includes(filter) ||
      data.categoria.toLowerCase().includes(filter)
     );
    };
  }
 selecionar(fruta: any) {
  if (this.frutaSelecionada === fruta) {
    this.frutaSelecionada = null;   
  } else {
    this.frutaSelecionada = fruta;  
  }
  }

}