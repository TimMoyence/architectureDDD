export class Price {
  constructor(public readonly amount: number, public readonly currency: string) {
    if (amount < 0) {
      throw new Error('Le montant ne peut pas être négatif');
    }
  }

  add(amount: number): Price {
    return new Price(this.amount + amount, this.currency);
  }

  subtract(amount: number): Price {
    if (this.amount < amount) {
      throw new Error('Montant insuffisant');
    }
    return new Price(this.amount - amount, this.currency);
  }
}
