import axios from "axios";
import { Order, OrderData } from "../components/interfaces";
import { Product, ActiveProductsData } from "../components/interfaces";

const INPIPELINE_URL = '/api/orders/inpipeline';
const ACTIVEPRODUCTS_URL = '/api/products/active';

const getInPipelineData = async () => {
    const orderData: OrderData = {
      Queued: [],
      InProgress: [],
      QA: [],
    };
    let errorOccured = false;
    try {
      const response = await axios.get(INPIPELINE_URL);
      if (response?.status === 200) {
        const { data } = response.data;
        data.forEach((order: Order) => {
          orderData[order.OrderStatus as keyof OrderData].push(order);
        });
      } else {
        const { message } = response.data;
        throw message;
      }
    } catch(err) {
      console.error(err);
      errorOccured = true;
    }
    return { orderData, errorOccured };
};

const UPDATE_STATUS_URL = '/api/orders/update_status';

const updateOrderStatus = async (order: Order, newOrderStatus: string) => {
    const updatedOrder = { ...order, OrderStatus: newOrderStatus };
    let orderStatusUpdated = false;
    try {
        const response = await axios.post(UPDATE_STATUS_URL, updatedOrder);
        if (response?.status === 200) orderStatusUpdated = true;
        else {
            const { message } = response.data;
            throw message;
        }
    } catch(err) {
        console.error(err);
    }
    return orderStatusUpdated;
};

export { getInPipelineData, INPIPELINE_URL, updateOrderStatus, UPDATE_STATUS_URL };

const getActiveProductsData = async () => {
  const activeProductsData: ActiveProductsData = {
    Active: []
  };
  let errorOccured = false;
  try {
    const response = await axios.get(ACTIVEPRODUCTS_URL);
    if (response?.status === 200) {
      const { data } = response.data;
      data.forEach((product: Product) => {
        activeProductsData[product.ProductStatus as keyof ActiveProductsData].push(product);
      });
    } else {
      const { message } = response.data;
      throw message;
    }
  } catch(err) {
    console.error(err);
    errorOccured = true;
  }
  return { activeProductsData, errorOccured };
};

export { getActiveProductsData, ACTIVEPRODUCTS_URL };