import Map "mo:core/Map";
import List "mo:core/List";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import OutCall "mo:caffeineai-http-outcalls/outcall";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import MixinObjectStorage "mo:caffeineai-object-storage/Mixin";
import Stripe "mo:caffeineai-stripe/stripe";
import Common "types/common";
import ProductTypes "types/products";
import CartTypes "types/cart";
import OrderTypes "types/orders";
import UserTypes "types/users";
import ProductsMixin "mixins/products-api";
import CartMixin "mixins/cart-api";
import OrdersMixin "mixins/orders-api";
import UsersMixin "mixins/users-api";

actor {
  // --- Authorization ---
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // --- Object Storage ---
  include MixinObjectStorage();

  // --- Shared State ---
  let profiles = Map.empty<Common.UserId, UserTypes.UserProfile>();
  let products = Map.empty<Common.ProductId, ProductTypes.Product>();
  let carts = Map.empty<Common.UserId, List.List<CartTypes.CartItem>>();
  let orders = Map.empty<Common.OrderId, OrderTypes.Order>();
  let productIdCounter = { var id : Nat = 1 };
  let orderIdCounter = { var id : Nat = 1 };

  // --- Stripe Configuration ---
  var stripeConfiguration : ?Stripe.StripeConfiguration = null;

  public query func isStripeConfigured() : async Bool {
    stripeConfiguration != null;
  };

  public shared ({ caller }) func setStripeConfiguration(config : Stripe.StripeConfiguration) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can configure Stripe");
    };
    stripeConfiguration := ?config;
  };

  func requireStripeConfig() : Stripe.StripeConfiguration {
    switch (stripeConfiguration) {
      case null { Runtime.trap("Stripe is not configured") };
      case (?cfg) { cfg };
    };
  };

  public shared ({ caller }) func createCheckoutSession(
    items : [Stripe.ShoppingItem],
    successUrl : Text,
    cancelUrl : Text,
  ) : async Text {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    await Stripe.createCheckoutSession(requireStripeConfig(), caller, items, successUrl, cancelUrl, transform);
  };

  public func getStripeSessionStatus(sessionId : Text) : async Stripe.StripeSessionStatus {
    await Stripe.getSessionStatus(requireStripeConfig(), sessionId, transform);
  };

  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  // --- Domain Mixins ---
  include UsersMixin(accessControlState, profiles);
  include ProductsMixin(accessControlState, products, productIdCounter);
  include CartMixin(accessControlState, carts, products);
  include OrdersMixin(accessControlState, orders, orderIdCounter, carts, products);
};
