import Common "common";

module {
  public type ShippingAddress = {
    fullName : Text;
    addressLine1 : Text;
    addressLine2 : Text;
    city : Text;
    state : Text;
    postalCode : Text;
    country : Text;
    phone : Text;
  };

  public type OrderItem = {
    productId : Common.ProductId;
    productName : Text;
    priceAtPurchase : Nat;
    quantity : Nat;
  };

  public type Order = {
    id : Common.OrderId;
    userId : Common.UserId;
    items : [OrderItem];
    total : Nat;
    status : Common.OrderStatus;
    shippingAddress : ShippingAddress;
    stripeSessionId : Text;
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
  };

  public type OrderInput = {
    items : [OrderItem];
    shippingAddress : ShippingAddress;
    stripeSessionId : Text;
  };
};
