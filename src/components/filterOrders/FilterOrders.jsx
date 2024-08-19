import moment from "moment";

export const filterOrders = (criteria, orders, setFilteredOrders) => {
  let filtered = [];
  const today = moment();
  switch (criteria) {
    case "today":
      filtered = orders.filter((order) =>
        moment(order.dateOfOrder, "DD/MM/YYYY").isSame(today, "day")
      );
      break;
    case "tomorrow":
      const tomorrow = moment().add(1, "days"); // Clonamos la fecha y sumamos un día
      filtered = orders.filter((order) =>
        moment(order.dateOfOrder, "DD/MM/YYYY").isSame(tomorrow, "day")
      );
      break;
    case "thisWeek":
      const startOfWeek = today.clone().startOf("week"); // Clonamos para evitar mutaciones
      const endOfWeek = today.clone().endOf("week"); // Clonamos para evitar mutaciones
      filtered = orders.filter((order) => {
        const orderDate = moment(order.dateOfOrder, "DD/MM/YYYY");
        return orderDate.isBetween(startOfWeek, endOfWeek, null, "[]");
      });
      break;
    case "nextWeek":
      const startOfNextWeek = moment().add(1, "weeks").startOf("week");
      const endOfNextWeek = startOfNextWeek
        .clone()
        .endOf("week")
        .add(1, "days");
      filtered = orders.filter((order) => {
        const orderDate = moment(order.dateOfOrder, "DD/MM/YYYY");
        return orderDate.isBetween(startOfNextWeek, endOfNextWeek, null, "[]");
      });
      break;
    default:
      break;
  }
  setFilteredOrders(filtered);
};
