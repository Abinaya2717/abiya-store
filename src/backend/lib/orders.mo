import Map "mo:core/Map";
import Time "mo:core/Time";
import OrderTypes "../types/orders";
import Common "../types/common";

module {
  public func createOrder(
    orders : Map.Map<Common.OrderId, OrderTypes.Order>,
    nextId : Nat,
    userId : Common.UserId,
    input : OrderTypes.OrderInput,
    total : Nat,
  ) : OrderTypes.Order {
    let now = Time.now();
    let order : OrderTypes.Order = {
      id = nextId;
      userId;
      items = input.items;
      total;
      status = #pending;
      shippingAddress = input.shippingAddress;
      stripeSessionId = input.stripeSessionId;
      createdAt = now;
      updatedAt = now;
    };
    orders.add(nextId, order);
    order;
  };

  public func getOrder(
    orders : Map.Map<Common.OrderId, OrderTypes.Order>,
    id : Common.OrderId,
  ) : ?OrderTypes.Order {
    orders.get(id);
  };

  public func listOrdersByUser(
    orders : Map.Map<Common.OrderId, OrderTypes.Order>,
    userId : Common.UserId,
  ) : [OrderTypes.Order] {
    orders.values().toArray().filter(func(o) { o.userId == userId });
  };

  public func listAllOrders(
    orders : Map.Map<Common.OrderId, OrderTypes.Order>,
  ) : [OrderTypes.Order] {
    orders.values().toArray();
  };

  public func updateOrderStatus(
    orders : Map.Map<Common.OrderId, OrderTypes.Order>,
    id : Common.OrderId,
    status : Common.OrderStatus,
  ) : ?OrderTypes.Order {
    switch (orders.get(id)) {
      case null null;
      case (?existing) {
        let updated : OrderTypes.Order = {
          existing with
          status;
          updatedAt = Time.now();
        };
        orders.add(id, updated);
        ?updated;
      };
    };
  };
};
