import { O as ORDER_STATUS_LABELS, y as OrderStatus } from "./index-DyFy3fPK.js";
function getStatusBadgeClasses(status) {
  switch (status) {
    case OrderStatus.delivered:
      return {
        label: ORDER_STATUS_LABELS[status] ?? "Delivered",
        // secondary = dark blue-grey in this palette, works as a neutral "done" tone
        className: "bg-secondary/20 text-secondary-foreground border-secondary/30 hover:bg-secondary/20"
      };
    case OrderStatus.shipped:
      return {
        label: ORDER_STATUS_LABELS[status] ?? "Shipped",
        className: "bg-primary/10 text-primary border-primary/20 hover:bg-primary/10"
      };
    case OrderStatus.cancelled:
      return {
        label: ORDER_STATUS_LABELS[status] ?? "Cancelled",
        className: "bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/10"
      };
    default:
      return {
        label: ORDER_STATUS_LABELS[status] ?? "Pending",
        className: "bg-accent/10 text-accent-foreground border-accent/20 hover:bg-accent/10"
      };
  }
}
export {
  getStatusBadgeClasses as g
};
