import Storage "mo:caffeineai-object-storage/Storage";
import Common "common";

module {
  public type ProductImage = Storage.ExternalBlob;

  public type Product = {
    id : Common.ProductId;
    name : Text;
    description : Text;
    price : Nat;
    category : Common.Category;
    stock : Nat;
    images : [ProductImage];
    createdAt : Common.Timestamp;
  };

  public type ProductInput = {
    name : Text;
    description : Text;
    price : Nat;
    category : Common.Category;
    stock : Nat;
    images : [ProductImage];
  };
};
