module {
  public type Timestamp = Int;
  public type ProductId = Nat;
  public type OrderId = Nat;
  public type UserId = Principal;

  public type Category = {
    #clothes;
    #bags;
    #watches;
    #shoes;
    #electronics;
    #computers;
  };

  public type OrderStatus = {
    #pending;
    #shipped;
    #delivered;
    #cancelled;
  };

  public type SortOption = {
    #priceAsc;
    #priceDesc;
    #newest;
  };
};
