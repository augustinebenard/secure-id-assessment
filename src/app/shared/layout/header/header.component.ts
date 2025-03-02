import { Component } from '@angular/core';
import { CartService } from '../../../cart-management/service/cart.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  cartItemCount: number = 0;
  currentLanguage: string = 'en';
  constructor(private cartService: CartService, private translate: TranslateService) {
    translate.setDefaultLang('en');
    this.currentLanguage = this.translate.currentLang || this.translate.getDefaultLang();
    console.log("currentLanguage", this.currentLanguage);

  }

  ngOnInit(): void {
    this.cartService.cartItems.subscribe(items => {
      this.cartItemCount = items.length;
    });
  }

  changeLanguage(language: string) {
    this.translate.use(language);
    this.currentLanguage = language;
    console.log("currentLanguage", this.currentLanguage);

  }
}
