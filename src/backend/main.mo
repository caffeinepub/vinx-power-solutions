import Map "mo:core/Map";
import Array "mo:core/Array";
import Time "mo:core/Time";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Int "mo:core/Int";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";

actor {
  type Sector = {
    #electricalContracting;
    #indianRailwayProjects;
    #civilInfrastructure;
    #carify;
  };

  type Inquiry = {
    name : Text;
    email : Text;
    phone : Text;
    message : Text;
    sector : Sector;
    timestamp : Int;
  };

  module Inquiry {
    public func compare(a : Inquiry, b : Inquiry) : Order.Order {
      Int.compare(a.timestamp, b.timestamp);
    };
  };

  let store = Map.empty<Int, Inquiry>();
  var nextId = 0;

  func convertSector(sectorText : Text) : Sector {
    switch (sectorText) {
      case ("Electrical Contracting") { #electricalContracting };
      case ("Indian Railway Projects") { #indianRailwayProjects };
      case ("Civil Infrastructure") { #civilInfrastructure };
      case ("Carify") { #carify };
      case (_) { Runtime.trap("Invalid sector") };
    };
  };

  public shared ({ caller }) func submitInquiry(name : Text, email : Text, phone : Text, message : Text, sectorText : Text) : async () {
    let inquiry : Inquiry = {
      name;
      email;
      phone;
      message;
      sector = convertSector(sectorText);
      timestamp = Time.now();
    };

    store.add(nextId, inquiry);
    nextId += 1;
  };

  public query ({ caller }) func getAllInquiries() : async [Inquiry] {
    store.values().toArray();
  };

  public query ({ caller }) func getInquiriesBySector(sectorText : Text) : async [Inquiry] {
    let sector = convertSector(sectorText);
    store.values().toArray().filter(func(inquiry) { inquiry.sector == sector });
  };

  public query ({ caller }) func getInquiryCount() : async Nat {
    store.size();
  };
};
