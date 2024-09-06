export const paymentMethodType = (
  paymentMethod,
  typesMethodList,
  typesMethod
) => {
  switch (paymentMethod) {
    case typesMethodList.CASH:
      return typesMethod.CASH;
    case typesMethodList.VISA:
      return typesMethod.VISA;
    case typesMethodList.MASTERCARD:
      return typesMethod.MASTERCARD;
    case typesMethodList.OCA:
      return typesMethod.OCA;
    case typesMethodList.TRANSFER:
      return typesMethod.TRANSFER;
    default:
      return null;
  }
};
