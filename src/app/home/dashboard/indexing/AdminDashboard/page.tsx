import React from "react";
import styles from "../../dashboard.module.scss";
import { ReactElement, useEffect, useState } from "react";
import Chart from "chart.js/auto";
import axios from "axios";
const AdminDashboard = () => {
  useEffect(() => {
    const fetchAPI = async () => {
      let chart;
      try {
        const res = await axios.get("/api/building/report");
        const buildingsData: any[] = res.data;
        const labelsConfig = buildingsData.map(
          (building) => building.building_name
        );
        let data: any[] = [];
        const graph: any = document.getElementById("ticket-chart");
        let total = 0;
        buildingsData.forEach(
          (building) => (total += parseInt(building.count))
        );
        buildingsData.forEach((building) => {
          data.push((parseInt(building.count) * 100) / total);
        });
        const config: any = {
          type: "doughnut",
          data: {
            labels: labelsConfig,
            datasets: [
              {
                label: "%resident",
                data: data,
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: "top",
              },
              title: {
                display: true,
                text: "Population distribution by building",
              },
            },
          },
        };
        let oldChart = Chart.getChart("ticket-chart");
        if (oldChart) {
          oldChart.destroy();
          chart = new Chart(graph, config);
        } else chart = new Chart(graph, config);
      } catch (e) {
        throw e;
      }
    };
    fetchAPI();
  }, []);
  return (
    <div className={styles.chart}>
      <canvas id="ticket-chart"></canvas>
    </div>
  );
};

export default AdminDashboard;
