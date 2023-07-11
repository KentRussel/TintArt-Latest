import React from "react";
import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import HomeHeader from "@/components/HomeHeader";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [editedPaidValue, setEditedPaidValue] = useState(null);

  useEffect(() => {
    axios.get('/api/orders').then(response => {
      setOrders(response.data);
    });
  }, []);

  const handleEditClick = (orderId, paidValue) => {
    setEditingOrderId(orderId);
    setEditedPaidValue(paidValue);
  };
  const handleSaveClick = async (orderId) => {
    try {
      const updatedOrders = [...orders];
      const orderToUpdate = { ...updatedOrders.find(order => order._id === orderId) };
      orderToUpdate.paid = !orderToUpdate.paid;
      await axios.patch(`pages/orders/${orderId}`, { paid: orderToUpdate.paid });
      setOrders(updatedOrders);
      setEditingOrderId(null);
      setEditedPaidValue(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelClick = () => {
    setEditingOrderId(null);
    setEditedPaidValue(null);
  };

  return (
    <Layout>
      <HomeHeader />
      <div className="mt-5">
        <h1>Orders</h1>
        <table className="basic">
          <thead>
            <tr>
              <th>Date</th>
              <th>Paid</th>
              <th>Customer</th>
              <th>Items</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 && orders.map(order => (
              <tr key={order._id}>
                <td>{(new Date(order.createdAt)).toLocaleString()}</td>
                <td style={{color: order.paid ? 'green' : 'red'}}>
                  {editingOrderId === order._id ? (
                    <input
                      type="text"
                      value={String(editedPaidValue)} // Convert to string
                      onChange={(e) => setEditedPaidValue(e.target.value)}
                    />
                  ) : (
                    order.paid ? 'YES' : 'NO'
                  )}
                </td>
                <td>
                  {order.name} {order.email}<br />
                  {order.city} {order.postalCode} {order.country}<br />
                  {order.streetAddress}
                </td>
                <td>
                  {order.line_items.map(l => (
                    <React.Fragment key={l.id}>
                      {l.price_data?.product_data.name} x {l.quantity}<br />
                    </React.Fragment>
                  ))}
                </td>
                <td>
                  {editingOrderId === order._id ? (
                    <div>
                      <button className="btn-green"
                      onClick={() => handleSaveClick(order._id)}>Save</button>
                      <button  className="btn-red"
                      onClick={handleCancelClick}>Cancel</button>
                    </div>
                  ) : (
                    <button className={order.paid ? 'btn-green' : 'btn-red'}
                    onClick={() => handleEditClick(order._id, order.paid)}>
                      Update
                    </button>                  
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}




