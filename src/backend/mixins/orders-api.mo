import Map "mo:core/Map";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import OrderTypes "../types/orders";
import CartTypes "../types/cart";
import ProductTypes "../types/products";
import Common "../types/common";
import OrderLib "../lib/orders";
import ProductLib "../lib/products";
import CartLib "../lib/cart";

mixin (
  accessControlState : AccessControl.AccessControlState,
  orders : Map.Map<Common.OrderId, OrderTypes.Order>,
  orderIdCounter : { var id : Nat },
  carts : Map.Map<Common.UserId, List.List<CartTypes.CartItem>>,
  products : Map.Map<Common.ProductId, ProductTypes.Product>,
) {
  public shared ({ caller }) func placeOrder(input : OrderTypes.OrderInput) : async OrderTypes.Order {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };

    // Compute total from items
    var total : Nat = 0;
    for (item in input.items.values()) {
      total += item.priceAtPurchase * item.quantity;
    };

    // Decrement stock for each item
    for (item in input.items.values()) {
      let ok = ProductLib.decrementStock(products, item.productId, item.quantity);
      if (not ok) {
        Runtime.trap("Insufficient stock for product " # debug_show(item.productId));
      };
    };

    let order = OrderLib.createOrder(orders, orderIdCounter.id, caller, input, total);
    orderIdCounter.id += 1;

    // Clear the cart after successful order
    CartLib.clearCart(carts, caller);

    order;
  };

  public query ({ caller }) func getOrder(id : Common.OrderId) : async ?OrderTypes.Order {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    switch (OrderLib.getOrder(orders, id)) {
      case null null;
      case (?order) {
        // Users can only see their own orders; admins can see all
        if (order.userId == caller or AccessControl.isAdmin(accessControlState, caller)) {
          ?order;
        } else {
          Runtime.trap("Unauthorized: Cannot view another user's order");
        };
      };
    };
  };

  public query ({ caller }) func listMyOrders() : async [OrderTypes.Order] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    OrderLib.listOrdersByUser(orders, caller);
  };

  public query ({ caller }) func listAllOrders() : async [OrderTypes.Order] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can list all orders");
    };
    OrderLib.listAllOrders(orders);
  };

  public shared ({ caller }) func updateOrderStatus(id : Common.OrderId, status : Common.OrderStatus) : async ?OrderTypes.Order {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update order status");
    };
    OrderLib.updateOrderStatus(orders, id, status);
  };
};
