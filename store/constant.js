
export const vValid = [
  { name: "Public Holidays", value: "Public_Holidays" },
  { name: "Weekends", value: "Weekends" },
];
export const validFor = [
  { name: "Men", val: "Men" },
  { name: "Women", val: "Women" },
  { name: "Teens", val: "Teens" },
  { name: "Kids", val: "Kids" },
];
export const DealFormConst = {
  types: [
    {
      name: "Buy one get one free",
      val: "buy_one_get_one_free",
    },
    {
      name: "Free shipping",
      val: "free_shipping",
    },
    {
      name: "Free coupon",
      val: "free_coupon",
    },
  ],
  dealTypes: [
    {
      name: "Premium",
      val: "Premium",
    },
    {
      name: "Free",
      val: "Free",
    },
  ],
  dealKinds: [
    {
      name: "Normal",
      val: 0,
    },
    {
      name: "Live",
      val: 1,
    },
  ],
  vValid: vValid,
  validFor: validFor,
  Prior: [
    {
      name: "Yes",
      val: true,
    },
    {
      name: "No",
      val: false,
    },
  ],
  PriorAr: [
    {
      name: "نعم",
      val: "نعم",
    },
    {
      name: "لا",
      val: "لا",
    },
  ],
  Dine: [
    {
      name: "Dine In",
      val: false,
    },
    {
      name: "Delivery",
      val: true,
    },
  ],
  Delivery: [
    {
      name: "Yes",
      val: true,
    },
    {
      name: "No",
      val: false,
    },
  ],
  DeliveryAr: [
    {
      name: "نعم",
      val: "نعم",
    },
    {
      name: "لا",
      val: "لا",
    },
  ],
  Pay: [
    {
      name: "Visa",
      val: "Visa",
    },
    {
      name: "Cash On Delivery",
      val: "Cash",
    },
    {
      name: "Wallet",
      val: "Wallet",
    },
    {
      name: "Fawry",
      val: "Fawry",
    },
    {
      name: "Points",
      val: "Points",
    },
  ]
}

export const PRICE_MODEL = {
  originalPrice: 0,
  finalPrice: 0,
  color: [ "#000000FF" ],
  // size: [ '1' ],
  description: "",
  arDescription: "",
  percentage: 0,
  payoutNet: 0,
  yallaDealzCommission: 0,
  pricesDate: {
    dateDayFrom:  "",
    dateDayTo:  "",
  },
  // _id: null,
};

export const VOUCHER_MODEL = {
  // finalPrice: 0,
  validUntil: "",
  minimumQuantityAllowed: "",
  maximumQuantityAllowed: "",
  userAllowedFrom: "",
  userAllowedUpto: "",
  allowedQuantity: 0,
  validFor: [],
  minimumAge: "",
  validOn: [],
}

export const DEAL_MODEL = {
  dealLive: false,
  branches: [],
  merchant: "",
  category: "",
  name: "",
  arName: "",
  images: [],
  video: "",
  dealType: "",
  type: [],
  dealStartDate: "",
  dealEndDate: "",
  prices: [PRICE_MODEL],
  // percentage: "",
  // payoutNet: 0,
  // yallaDealzCommission: "",
  voucher: VOUCHER_MODEL,
  priorBooking: {
    status: false,
    email: "",
    contactNumber: "",
    deliveryArea: "",
    delivery: false,
  },
  finePrint: "",
  arFinePrint: "",
  description: "",
  arDescription: "",
  highlightes: "",
  arHighlightes: "",
  // paymentMethod:  "",
};