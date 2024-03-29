import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BasketCommonService} from "../common/service/basket-common.service";
import {Observable} from "rxjs";
import {BasketSummary} from "../common/model/basket/basketSummary";
import {OrderSummary} from "./model/orderSummary";
import {OrderDto} from "./model/orderDto";
import {InitData} from "./model/initData";
import {NotificationDto} from "./model/notificationDto";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private http: HttpClient,
    private basketCommonService: BasketCommonService
  ) {
  }


  getBasket(basketId: number): Observable<BasketSummary> {
    return this.basketCommonService.getBasket(basketId);
  }

  makeOrder(order: OrderDto): Observable<OrderSummary> {
    return this.http.post<OrderSummary>("https://shopbackend.dudios.pl/order", order);
  }

  getInitData(): Observable<InitData> {
    return this.http.get<InitData>("https://shopbackend.dudios.pl/order/initOrder");
  }

  getStatus(hash: any): Observable<NotificationDto>{
    return this.http.get<NotificationDto>("https://shopbackend.dudios.pl/order/notification/" + hash);
  }
}
