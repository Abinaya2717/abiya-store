import Common "common";

module {
  public type CartItem = {
    productId : Common.ProductId;
    quantity : Nat;
  };

  public type CartSummary = {
    items : [CartItem];
    subtotal : Nat;
    itemCount : Nat;
  };
};
