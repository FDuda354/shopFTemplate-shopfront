import {Component, OnInit} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {OrderService} from "./order.service";
import {BasketSummary} from "../common/model/basket/basketSummary";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {OrderDto} from "./model/orderDto";
import {OrderSummary} from "./model/orderSummary";
import {BasketIconService} from "../common/service/basket-icon.service";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  basketSummary!: BasketSummary;
  formGroup!: FormGroup;
  orderSummary!: OrderSummary;

  private statuses = new Map<string, string>([

    ["NEW", "New"],
    ["PAID", "Paid"],
    ["SHIPPED", "Shipped"],
    ["DELIVERED", "Delivered"],
    ["CANCELLED", "Cancelled"]
  ]);

  constructor(
    private cookieService: CookieService,
    private orderService: OrderService,
    private formBuilder: FormBuilder,
    private basketIconService: BasketIconService
  ) {
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      street: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
      zipCode: ['', [Validators.required, Validators.pattern("^[0-9]{2}-[0-9]{3}$")]],
      city: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(60)]],
      phone: ['+48 ', [Validators.required, Validators.pattern('[- +()0-9]+'), Validators.maxLength(15), Validators.minLength(15)]]
    });
    this.checkBasketEmpty();
  }

  checkBasketEmpty() {
    let basketId = Number(this.cookieService.get("basketId"));
    this.orderService.getBasket(basketId)
      .subscribe(summary => {
        this.basketSummary = summary;
      });
  }

  submitOrder() {
    if (this.formGroup.valid) {
      this.orderService.makeOrder({

        firstName: this.firstName?.value,
        lastName: this.lastName?.value,
        street: this.street?.value,
        zipCode: this.zipCode?.value,
        city: this.city?.value,
        email: this.email?.value,
        phone: this.phone?.value,
        basketId: Number(this.cookieService.get("basketId"))

      } as OrderDto).subscribe(orderSummary => {
        this.orderSummary = orderSummary;
        this.basketIconService.setDefaultBasketIcon();
        this.cookieService.delete("basketId");

      });
    }
  }

  getStatus(status: string) {
    return this.statuses.get(status);
  }

  get firstName() {
    return this.formGroup.get('firstName');
  }

  get lastName() {
    return this.formGroup.get('lastName');
  }

  get street() {
    return this.formGroup.get('street');
  }

  get zipCode() {
    return this.formGroup.get('zipCode');
  }

  get city() {
    return this.formGroup.get('city');
  }

  get email() {
    return this.formGroup.get('email');
  }

  get phone() {
    return this.formGroup.get('phone');
  }


}
