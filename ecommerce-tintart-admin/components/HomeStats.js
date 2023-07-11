import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "@/components/Spinner";
import { subHours } from "date-fns";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function HomeStats() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios.get("/api/orders").then((res) => {
      setOrders(res.data);
      setIsLoading(false);
    });
  }, []);

  function ordersTotal(orders) {
    let sum = 0;
    orders.forEach((order) => {
      const { line_items } = order;
      line_items.forEach((li) => {
        const lineSum = (li.quantity * li.price_data.unit_amount) / 100;
        sum += lineSum;
      });
    });
    return new Intl.NumberFormat("sv-SE").format(sum);
  }

  function salesTotal(sales) {
    let sum = 0;
    sales.forEach((sale) => {
      const { line_items } = sale;
      line_items.forEach((li) => {
        const lineSum = (li.quantity * li.price_data.unit_amount) / 100;
        sum += lineSum;
      });
    });
    return new Intl.NumberFormat("sv-SE").format(sum);
  }

  if (isLoading) {
    return (
      <div className="my-4">
        <Spinner fullWidth={true} />
      </div>
    );
  }

  const ordersToday = orders.filter(
    (o) => new Date(o.createdAt) > subHours(new Date(), 24)
  );
  const ordersWeek = orders.filter(
    (o) => new Date(o.createdAt) > subHours(new Date(), 24 * 7)
  );
  const ordersMonth = orders.filter(
    (o) => new Date(o.createdAt) > subHours(new Date(), 24 * 30)
  );
  const ordersYear = orders.filter(
    (o) => new Date(o.createdAt) > subHours(new Date(), 24 * 365)
  );

  // Function to generate data for the bar graph
  function generateBarGraphData(labels, data) {
    return labels.map((label, index) => ({
      name: label,
      orders: data[index],
    }));
  }

  return (
    <div className="px-3">
      <h2>Total Orders</h2>
      <div className="tiles-grid">
        <div className="tile">
          <h3 className="tile-header">Today</h3>
          <div className="tile-number">{ordersToday.length}</div>
          <div className="tile-desc">{ordersToday.length} orders today</div>
          <div className="tile-chart">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart
                data={generateBarGraphData(["Today"], [ordersToday.length])}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="orders"
                  fill="rgba(75, 192, 192, 0.2)"
                  stroke="rgba(75, 192, 192, 1)"
                  strokeWidth={1}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="tile">
          <h3 className="tile-header">This week</h3>
          <div className="tile-number">{ordersWeek.length}</div>
          <div className="tile-desc">{ordersWeek.length} orders this week</div>
          <div className="tile-chart">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart
                data={generateBarGraphData(["This week"], [ordersWeek.length])}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="orders"
                  fill="rgba(75, 192, 192, 0.2)"
                  stroke="rgba(75, 192, 192, 1)"
                  strokeWidth={1}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="tiles-grid">
        <div className="tile">
          <h3 className="tile-header">This month</h3>
          <div className="tile-number">{ordersMonth.length}</div>
          <div className="tile-desc">{ordersMonth.length} orders this month</div>
          <div className="tile-chart">
          <ResponsiveContainer width="100%" height={200}>
              <BarChart
                data={generateBarGraphData(["This month"], [ordersMonth.length])}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="orders"
                  fill="rgba(75, 192, 192, 0.2)"
                  stroke="rgba(75, 192, 192, 1)"
                  strokeWidth={1}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="tile">
          <h3 className="tile-header">This year</h3>
          <div className="tile-number">{ordersYear.length}</div>
          <div className="tile-desc">{ordersYear.length} orders this year</div>
          <div className="tile-chart">
          <ResponsiveContainer width="100%" height={200}>
              <BarChart
                data={generateBarGraphData(["This year"], [ordersYear.length])}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="orders"
                  fill="rgba(75, 192, 192, 0.2)"
                  stroke="rgba(75, 192, 192, 1)"
                  strokeWidth={1}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <h2>Total Sales</h2>
      <div className="tiles-grid">
        <div className="tile">
          <h3 className="tile-header">Today</h3>
          <div className="tile-number">₱ {ordersTotal(ordersToday)}</div>
          <div className="tile-desc">{ordersToday.length} sales today</div>
          <div className="tile-chart">
          <ResponsiveContainer width="100%" height={200}>
              <BarChart
                data={generateBarGraphData(["Today"], [ordersToday.length])}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="orders"
                  fill="rgba(75, 192, 192, 0.2)"
                  stroke="rgba(75, 192, 192, 1)"
                  strokeWidth={1}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="tile">
          <h3 className="tile-header">This week</h3>
          <div className="tile-number">₱ {ordersTotal(ordersWeek)}</div>
          <div className="tile-desc">{ordersWeek.length} sales this week</div>
          <div className="tile-chart">
          <ResponsiveContainer width="100%" height={200}>
              <BarChart
                data={generateBarGraphData(["This week"], [ordersWeek.length])}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="orders"
                  fill="rgba(75, 192, 192, 0.2)"
                  stroke="rgba(75, 192, 192, 1)"
                  strokeWidth={1}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="tiles-grid">
        <div className="tile">
          <h3 className="tile-header">This month</h3>
          <div className="tile-number">₱ {ordersTotal(ordersMonth)}</div>
          <div className="tile-desc">{ordersMonth.length} sales this month</div>
          <div className="tile-chart">
          <ResponsiveContainer width="100%" height={200}>
              <BarChart
                data={generateBarGraphData(["This month"], [ordersMonth.length])}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="orders"
                  fill="rgba(75, 192, 192, 0.2)"
                  stroke="rgba(75, 192, 192, 1)"
                  strokeWidth={1}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="tile">
          <h3 className="tile-header">This year</h3>
          <div className="tile-number">₱ {ordersTotal(ordersYear)}</div>
          <div className="tile-desc">{ordersYear.length} sales this year</div>
          <div className="tile-chart">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart
                data={generateBarGraphData(["Today"], [orders.length])}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="orders"
                  fill="rgba(75, 192, 192, 0.2)"
                  stroke="rgba(75, 192, 192, 1)"
                  strokeWidth={1}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}