import Map "mo:core/Map";
import UserTypes "../types/users";
import Common "../types/common";

module {
  public func getProfile(
    profiles : Map.Map<Common.UserId, UserTypes.UserProfile>,
    userId : Common.UserId,
  ) : ?UserTypes.UserProfile {
    profiles.get(userId);
  };

  public func saveProfile(
    profiles : Map.Map<Common.UserId, UserTypes.UserProfile>,
    userId : Common.UserId,
    profile : UserTypes.UserProfile,
  ) {
    profiles.add(userId, profile);
  };
};
