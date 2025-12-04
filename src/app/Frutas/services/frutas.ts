import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Fruta } from '../model/fruta';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FrutasService {

  private API = 'http://localhost:3000/frutas';
  private url = 'http://localhost:3000/frutas';

  constructor(private http: HttpClient) {}

    listar(): Observable<Fruta[]> {
      return this.http.get<Fruta[]>(this.API);
    }

    cadastrar(fruta: Fruta) {
      return this.http.post(this.API, fruta);
    }

    buscarPorId(id: string) {
    return this.http.get<any>(`${this.url}/${id}`);
  }

  editar(id: string, fruta: any) {
    return this.http.put(`${this.url}/${id}`, fruta);
  }

  excluir(id: string) {
    return this.http.delete(`${this.url}/${id}`);
  }

}
