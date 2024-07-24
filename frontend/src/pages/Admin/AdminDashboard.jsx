import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { useGetUsersQuery } from "../../redux/api/usersApiSlice";
import {
  useGetTotalOrdersQuery,
  useGetTotalSalesByDateQuery,
  useGetTotalSalesQuery,
} from "../../redux/api/orderApiSlice";
import AdminMenu from "./AdminMenu";
import OrderList from "./OrderList";
import Loader from "../../components/Loader";

const AdminDashboard = () => {
  const { data: sales, isLoading: salesLoading } = useGetTotalSalesQuery();
  const { data: customers, isLoading: customersLoading } = useGetUsersQuery();
  const { data: orders, isLoading: ordersLoading } = useGetTotalOrdersQuery();
  const { data: salesDetail, isLoading: salesDetailLoading } = useGetTotalSalesByDateQuery();

  const [chartData, setChartData] = useState({
    options: {
      chart: {
        type: "line",
      },
      tooltip: {
        theme: "dark",
        x: {
          format: 'dd/MM/yy'
        },
        y: {
          formatter: function (value) {
            return `₹ ${value.toFixed(2)}`;
          }
        }
      },
      colors: ["#00E396"],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: "smooth",
      },
      title: {
        text: "Sales Trend Over Time",
        align: "left",
      },
      grid: {
        borderColor: "#ccc",
      },
      markers: {
        size: 5,
      },
      xaxis: {
        categories: [],
        title: {
          text: "Date",
        },
      },
      yaxis: [{
        title: {
          text: "Sales (₹)",
        },
        min: 0,
      }],
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
      annotations: {
        yaxis: [
          {
            y: 0,
            borderColor: "#00E396",
            label: {
              borderColor: "#00E396",
              style: {
                color: "#fff",
                background: "#00E396",
              },
              text: "Average Sales",
            },
          },
        ],
      },
    },
    series: [
      {
        name: "Sales",
        data: [],
      },
    ],
  });

  useEffect(() => {
    if (salesDetail) {
      const categories = salesDetail.map((item) => item._id);
      const data = salesDetail.map((item) => item.totalSales);

      const averageSales = data.reduce((acc, val) => acc + val, 0) / data.length;

      setChartData((prevState) => ({
        ...prevState,
        options: {
          ...prevState.options,
          xaxis: {
            ...prevState.options.xaxis,
            categories: categories,
          },
          annotations: {
            yaxis: [
              {
                y: averageSales,
                borderColor: "#FEB019",
                label: {
                  borderColor: "#FEB019",
                  style: {
                    color: "#fff",
                    background: "#FEB019",
                  },
                  text: `Average Sales: ₹${averageSales.toFixed(2)}`,
                },
              },
            ],
          },
        },
        series: [
          {
            name: "Sales",
            data: data,
          },
        ],
      }));
    }
  }, [salesDetail]);

  return (
    <>
      <AdminMenu />

      <section className="">
        <div className="w-[80%] flex justify-around flex-wrap">
          <div className="rounded-lg bg-black p-5 w-[20rem] mt-5">
            <div className="font-bold rounded-full w-[3rem] bg-white text-center p-3">
              💰
            </div>

            <p className="mt-5">Sales</p>
            <h1 className="text-xl font-bold">
              ₹ {salesLoading ? <Loader /> : sales.totalSales.toFixed(2)}
            </h1>
          </div>

          <div className="rounded-lg bg-black p-5 w-[20rem] mt-5">
            <div className="font-bold rounded-full w-[3rem] bg-white text-center p-3">
              👤
            </div>

            <p className="mt-5">Customers</p>
            <h1 className="text-xl font-bold">
              {customersLoading ? <Loader /> : customers?.length}
            </h1>
          </div>
          <div className="rounded-lg bg-black p-5 w-[20rem] mt-5">
            <div className="font-bold rounded-full w-[3rem] bg-white text-center p-3">
              💹
            </div>

            <p className="mt-5">All Orders</p>
            <h1 className="text-xl font-bold">
              {ordersLoading ? <Loader /> : orders?.totalOrders}
            </h1>
          </div>
        </div>

        <div className="ml-[10rem] mt-[4rem]">
          {salesDetailLoading ? (
            <Loader />
          ) : (
            <Chart
              options={chartData.options}
              series={chartData.series}
              type="line"
              width="60%"
            />
          )}
        </div>

        <div className="mt-[4rem]">
          <OrderList />
        </div>
      </section>
    </>
  );
};

export default AdminDashboard;
