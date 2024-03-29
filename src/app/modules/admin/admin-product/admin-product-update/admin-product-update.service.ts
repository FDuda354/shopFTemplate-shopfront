import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AdminProductUpdate} from "../model/adminProductUpdate";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AdminProductUpdateService {

  constructor(private http: HttpClient) {
  }

  getProduct(id: number): Observable<AdminProductUpdate> {
    return this.http.get<AdminProductUpdate>("https://shopbackend.dudios.pl/admin/product/" + id);
  }

  updateProduct(id: number, value: AdminProductUpdate) {
    return this.http.put<AdminProductUpdate>("https://shopbackend.dudios.pl/admin/product/" + id, value);
  }

}
