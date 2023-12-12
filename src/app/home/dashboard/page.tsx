"use client";
import { useTranslation } from "react-i18next";
import styles from "../page.module.css";
import { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import axios from "axios";
import { UserProfile } from "@/libs/UserProfile";
export default function Dashboard() {
  const [t, i18n] = useTranslation();
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
                label: "binh",
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
        let oldChart = Chart.getChart("ticket-chart")
        if(oldChart) {
          oldChart.destroy();
          chart = new Chart(graph, config);
        }
        else chart = new Chart(graph, config);
      } catch (e) {
        throw e;
      }
    };
    fetchAPI();
  }, []);

  return (
    <main className={styles.main}>
      

      <div className={styles.chart}>
        <canvas id="ticket-chart"></canvas>
      </div>
    </main>
  );
}
