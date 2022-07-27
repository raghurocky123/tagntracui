let userStatus = {
  2: "InActive",
  1: "Active",
};
let userType = {
  0: "Admin",
  1: "Customer",
  2: "Delivery Partner",
};
let deliveryStatus = {
  0: "Processing",
  1: "Shipped",
  2: "Delivered",
};
let url = "http://localhost:8000";
let secret = "tagNTracApp";

export default {
  userStatus,
  userType,
  url,
  secret,
  deliveryStatus,
};
