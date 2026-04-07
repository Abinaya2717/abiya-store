import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Text "mo:core/Text";
import Types "../types/products";
import Common "../types/common";

module {
  public func listProducts(
    products : Map.Map<Common.ProductId, Types.Product>,
    category : ?Common.Category,
    search : ?Text,
    sortBy : ?Common.SortOption,
  ) : [Types.Product] {
    var result = products.values().toArray();

    // Filter by category
    switch (category) {
      case (?cat) {
        result := result.filter(func(p) { p.category == cat });
      };
      case null {};
    };

    // Filter by search term (name or description)
    switch (search) {
      case (?term) {
        let lower = term.toLower();
        result := result.filter(func(p) {
          p.name.toLower().contains(#text lower) or p.description.toLower().contains(#text lower)
        });
      };
      case null {};
    };

    // Sort
    switch (sortBy) {
      case (? #priceAsc) {
        result := result.sort(func(a, b) {
          if (a.price < b.price) #less
          else if (a.price > b.price) #greater
          else #equal
        });
      };
      case (? #priceDesc) {
        result := result.sort(func(a, b) {
          if (a.price > b.price) #less
          else if (a.price < b.price) #greater
          else #equal
        });
      };
      case (? #newest) {
        result := result.sort(func(a, b) {
          if (a.createdAt > b.createdAt) #less
          else if (a.createdAt < b.createdAt) #greater
          else #equal
        });
      };
      case null {};
    };

    result;
  };

  public func getProduct(
    products : Map.Map<Common.ProductId, Types.Product>,
    id : Common.ProductId,
  ) : ?Types.Product {
    products.get(id);
  };

  public func addProduct(
    products : Map.Map<Common.ProductId, Types.Product>,
    nextId : Nat,
    input : Types.ProductInput,
  ) : Types.Product {
    let product : Types.Product = {
      id = nextId;
      name = input.name;
      description = input.description;
      price = input.price;
      category = input.category;
      stock = input.stock;
      images = input.images;
      createdAt = Time.now();
    };
    products.add(nextId, product);
    product;
  };

  public func updateProduct(
    products : Map.Map<Common.ProductId, Types.Product>,
    id : Common.ProductId,
    input : Types.ProductInput,
  ) : ?Types.Product {
    switch (products.get(id)) {
      case null null;
      case (?existing) {
        let updated : Types.Product = {
          existing with
          name = input.name;
          description = input.description;
          price = input.price;
          category = input.category;
          stock = input.stock;
          images = input.images;
        };
        products.add(id, updated);
        ?updated;
      };
    };
  };

  public func deleteProduct(
    products : Map.Map<Common.ProductId, Types.Product>,
    id : Common.ProductId,
  ) : Bool {
    switch (products.get(id)) {
      case null false;
      case (?_) {
        products.remove(id);
        true;
      };
    };
  };

  public func decrementStock(
    products : Map.Map<Common.ProductId, Types.Product>,
    id : Common.ProductId,
    qty : Nat,
  ) : Bool {
    switch (products.get(id)) {
      case null false;
      case (?p) {
        if (p.stock < qty) return false;
        let updated : Types.Product = { p with stock = p.stock - qty };
        products.add(id, updated);
        true;
      };
    };
  };
};
