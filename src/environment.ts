export const environment = {
  
    source: 'RUB',
    currencies: ['USD', 'EUR', 'GBP', 'CNY', 'JPY', 'TRY'],
  
    API_KEY:  '6uKpZlswZ7hQ7HsFk0khiJaAkvUoCbGp',
  
    get API_URL(): string {
      const source = encodeURIComponent(this.source)
      const currencies = this.currencies.map(currency => encodeURIComponent(currency)).join(',')
      return `https://api.apilayer.com/currency_data/live?source=${source}&currencies=${currencies}`
    }
  }