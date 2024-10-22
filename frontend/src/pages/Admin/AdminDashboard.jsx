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

  const [toggle, setToggle] = useState(false)
  const [graphType, setGraphType] = useState("line")

  
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
            return `₹ ${value.toLocaleString("en-US")}`;
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
        align: "center",
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
  
  const togglefunc = () =>{
    setToggle(!toggle)  
    if(!toggle){
    setGraphType("bar")
    }else{
    setGraphType("line")
  }
  }
  
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
                  text: `Average Sales: ₹${averageSales.toLocaleString("en-US")}`,
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
  }, [salesDetail, setToggle, setGraphType, togglefunc, setChartData]);

  return (
    <>
      <AdminMenu />

      <section className="">
        <h2 className="text-[4rem] mb-4 ml-2 capitalize tracking-[-5px] font-[999]">Dashboard.</h2>
        <div className="w-[80%] flex justify-around flex-wrap">
          <div className="rounded-lg bg-black p-5 w-[20rem] mt-5">
            <div className="font-bold rounded-full w-[3rem] bg-white text-center p-3">
              💰
            </div>

            <p className="mt-5">Sales</p>
            <h1 className="text-xl font-bold">
              ₹ {salesLoading ? <Loader /> : sales?.totalSales.toLocaleString("en-US")}
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

        <div className="p-3 mt-[4rem] mr-0 pr-0">
          {salesDetailLoading ? (
            <Loader />
          ) : (
            <Chart
              options={chartData.options}
              series={chartData.series}
              type={graphType}
              width="80%"
              height="240%"
            />
          )}
          <div className="m-2 pb-6">
            <span>Type of Chart Bar or Line </span>
            <button onClick={togglefunc} className="bg-red-600 py-3 px-6 rounded-lg">{graphType}</button>
          </div>
        </div>

        <div className="mt-[4rem]">
          <OrderList />
        </div>
      </section>
    </>
  );
};

export default AdminDashboard;
