"use client"
import React from "react";
import styles from './adminDashboard.module.scss'
import { ReactElement, useEffect, useState } from "react";
import Chart from "chart.js/auto";
import axios from "axios";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer,
} from "recharts";
import { useQuery } from "react-query";
import { futuna } from "../../../../../../public/fonts/futura";
import clsx from "clsx";
const AdminDashboard = () => {
  const { data } = useQuery({
    queryKey: "residentChart",
    queryFn: () =>
      axios.get("/api/building/report").then((res) => {
        const buildingsData: any[] = res.data;
        const labels = buildingsData.map((building) => building.building_name);
        let chartData: any[] = [];
        buildingsData.forEach((building) => {
          chartData.push({
            building: building.building_name,
            quantity: building.count,
          });
        });
        console.log(chartData);
        return chartData;
      }),
  });
  console.log(data);

  return (
    <div className={clsx(styles.chart, futuna.className)}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart width={730} height={250} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="building" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="quantity" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AdminDashboard;
