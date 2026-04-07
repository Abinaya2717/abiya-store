import Map "mo:core/Map";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import CartTypes "../types/cart";
import ProductTypes "../types/products";
import Common "../types/common";
import CartLib "../lib/cart";

mixin (
  accessControlState : AccessControl.AccessControlState,
  carts : Map.Map<Common.UserId, List.List<CartTypes.CartItem>>,
  products : Map.Map<Common.ProductId, ProductTypes.Product>,
) {
  public query ({ caller }) func getCart() : async CartTypes.CartSummary {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    CartLib.getCart(carts, products, caller);
  };

  public shared ({ caller }) func addToCart(productId : Common.ProductId, quantity : Nat) : async CartTypes.CartSummary {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    CartLib.addToCart(carts, products, caller, productId, quantity);
  };

  public shared ({ caller }) func removeFromCart(productId : Common.ProductId) : async CartTypes.CartSummary {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    CartLib.removeFromCart(carts, products, caller, productId);
  };

  public shared ({ caller }) func updateCartItemQuantity(productId : Common.ProductId, quantity : Nat) : async CartTypes.CartSummary {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    CartLib.updateCartItemQuantity(carts, products, caller, productId, quantity);
  };

  public shared ({ caller }) func clearCart() : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    CartLib.clearCart(carts, caller);
  };
};
