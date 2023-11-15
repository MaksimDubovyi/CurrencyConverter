import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CurreCurrencyServiceServicencyService, Currency } from '../services/currency-service.service';






@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.css']
})
export class CurrencyConverterComponent {

  constructor(public curreCurrencyServiceServicencyService: CurreCurrencyServiceServicencyService) {
  }


  selectedFromCurrency:string="";
  selectedToCurrency:string="";
  sumForom:string="";
  sumTo:string="";
  result:string="";

  labeFromResult:string="";
  labeToResult:string="";
  pressFrom:boolean=true;
  valid:string="";

  onKeyPressFrom(): void {
    this.sumForom = this.sumForom.replace(/[^\d.]/g, '');
    this.pressFrom=true;
   this.convertCurrency(this.sumForom, this.selectedToCurrency, this.selectedFromCurrency)
  }

  onKeyPressTo(): void {
     this.sumTo = this.sumTo.replace(/[^\d.]/g, '');
     this.pressFrom=false;
     this.convertCurrency(this.sumTo, this.selectedFromCurrency, this.selectedToCurrency)
  }



convertCurrency(sum: string, ссFromCurrency: string, ссToCurrency: string) {
  this.valid = "";
  let convertedNumber: number = parseFloat(sum);

  const targetCurrency = this.curreCurrencyServiceServicencyService.Currency.find(currency => currency.cc === ссToCurrency);
  const userCurrencyRate = this.curreCurrencyServiceServicencyService.Currency.find(currency => currency.cc === ссFromCurrency)?.rate;

  if (targetCurrency && userCurrencyRate)
  {

          const convertedAmount = (convertedNumber / userCurrencyRate) * targetCurrency.rate;
          const roundedConvertedAmount = Math.round(convertedAmount * 100) / 100;
          console.log(`Конвертована сума : ${roundedConvertedAmount}`);

          if (this.pressFrom) {

              this.sumTo = roundedConvertedAmount.toFixed(2).toString();

              const one= targetCurrency.rate/userCurrencyRate;
              this.labeFromResult="1 "+this.selectedFromCurrency+" = "+one.toFixed(2).toString()+this.selectedToCurrency

              const twoo= userCurrencyRate/targetCurrency.rate;
              this.labeToResult="1 "+this.selectedToCurrency+" = "+twoo.toFixed(2).toString()+this.selectedFromCurrency
          }
          else {

              this.sumForom = roundedConvertedAmount.toFixed(2).toString();

              const twoo= userCurrencyRate/targetCurrency.rate;
              this.labeFromResult="1 "+this.selectedFromCurrency+" = "+twoo.toFixed(2).toString()+this.selectedToCurrency

              const one= targetCurrency.rate/userCurrencyRate;
              this.labeToResult="1 "+this.selectedToCurrency+" = "+one.toFixed(2).toString()+this.selectedFromCurrency
          }

  }
  else
  {
      this.valid = "Оберіть валюту";
  }
}
}
