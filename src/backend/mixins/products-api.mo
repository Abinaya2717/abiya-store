import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import ProductTypes "../types/products";
import Common "../types/common";
import ProductLib "../lib/products";

mixin (
  accessControlState : AccessControl.AccessControlState,
  products : Map.Map<Common.ProductId, ProductTypes.Product>,
  productIdCounter : { var id : Nat },
) {
  public query func listProducts(
    category : ?Common.Category,
    search : ?Text,
    sortBy : ?Common.SortOption,
  ) : async [ProductTypes.Product] {
    ProductLib.listProducts(products, category, search, sortBy);
  };

  public query func getProduct(id : Common.ProductId) : async ?ProductTypes.Product {
    ProductLib.getProduct(products, id);
  };

  public shared ({ caller }) func addProduct(input : ProductTypes.ProductInput) : async ProductTypes.Product {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can add products");
    };
    let product = ProductLib.addProduct(products, productIdCounter.id, input);
    productIdCounter.id += 1;
    product;
  };

  public shared ({ caller }) func updateProduct(id : Common.ProductId, input : ProductTypes.ProductInput) : async ?ProductTypes.Product {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update products");
    };
    ProductLib.updateProduct(products, id, input);
  };

  public shared ({ caller }) func deleteProduct(id : Common.ProductId) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete products");
    };
    ProductLib.deleteProduct(products, id);
  };
};
