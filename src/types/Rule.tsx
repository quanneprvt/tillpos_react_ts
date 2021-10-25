interface IRuleData {
  itemType: {
    vendor: string,
    operator: string,
    amount: number,
    product: string
  },
  discountType: {
    productDiscountType: string,
    amount: number,
    price: number,
    percent: number
  }
}

export type { IRuleData };