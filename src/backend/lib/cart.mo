import Map "mo:core/Map";
import List "mo:core/List";
import CartTypes "../types/cart";
import Common "../types/common";
import ProductTypes "../types/products";

module {
  func computeSummary(
    items : List.List<CartTypes.CartItem>,
    products : Map.Map<Common.ProductId, ProductTypes.Product>,
  ) : CartTypes.CartSummary {
    let arr = items.toArray();
    var subtotal : Nat = 0;
    var itemCount : Nat = 0;
    for (item in arr.values()) {
      switch (products.get(item.productId)) {
        case (?p) {
          subtotal += p.price * item.quantity;
          itemCount += item.quantity;
        };
        case null {};
      };
    };
    { items = arr; subtotal; itemCount };
  };

  public func getCart(
    carts : Map.Map<Common.UserId, List.List<CartTypes.CartItem>>,
    products : Map.Map<Common.ProductId, ProductTypes.Product>,
    userId : Common.UserId,
  ) : CartTypes.CartSummary {
    switch (carts.get(userId)) {
      case null { { items = []; subtotal = 0; itemCount = 0 } };
      case (?items) computeSummary(items, products);
    };
  };

  public func addToCart(
    carts : Map.Map<Common.UserId, List.List<CartTypes.CartItem>>,
    products : Map.Map<Common.ProductId, ProductTypes.Product>,
    userId : Common.UserId,
    productId : Common.ProductId,
    quantity : Nat,
  ) : CartTypes.CartSummary {
    let items = switch (carts.get(userId)) {
      case null List.empty<CartTypes.CartItem>();
      case (?existing) existing;
    };

    // Check if item already exists
    switch (items.findIndex(func(item) { item.productId == productId })) {
      case (?idx) {
        let existing = items.at(idx);
        items.put(idx, { existing with quantity = existing.quantity + quantity });
      };
      case null {
        items.add({ productId; quantity });
      };
    };

    carts.add(userId, items);
    computeSummary(items, products);
  };

  public func removeFromCart(
    carts : Map.Map<Common.UserId, List.List<CartTypes.CartItem>>,
    products : Map.Map<Common.ProductId, ProductTypes.Product>,
    userId : Common.UserId,
    productId : Common.ProductId,
  ) : CartTypes.CartSummary {
    let items = switch (carts.get(userId)) {
      case null List.empty<CartTypes.CartItem>();
      case (?existing) existing;
    };

    let filtered = items.filter(func(item) { item.productId != productId });
    carts.add(userId, filtered);
    computeSummary(filtered, products);
  };

  public func updateCartItemQuantity(
    carts : Map.Map<Common.UserId, List.List<CartTypes.CartItem>>,
    products : Map.Map<Common.ProductId, ProductTypes.Product>,
    userId : Common.UserId,
    productId : Common.ProductId,
    quantity : Nat,
  ) : CartTypes.CartSummary {
    let items = switch (carts.get(userId)) {
      case null List.empty<CartTypes.CartItem>();
      case (?existing) existing;
    };

    if (quantity == 0) {
      let filtered = items.filter(func(item) { item.productId != productId });
      carts.add(userId, filtered);
      return computeSummary(filtered, products);
    };

    items.mapInPlace(func(item) {
      if (item.productId == productId) { { item with quantity } } else { item };
    });

    carts.add(userId, items);
    computeSummary(items, products);
  };

  public func clearCart(
    carts : Map.Map<Common.UserId, List.List<CartTypes.CartItem>>,
    userId : Common.UserId,
  ) {
    carts.remove(userId);
  };
};
