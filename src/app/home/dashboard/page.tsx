"use client";
import { useTranslation } from "react-i18next";
import styles from "../page.module.css";
import { ReactElement, useEffect, useState } from "react";
import Chart from "chart.js/auto";
import axios from "axios";
import { UserProfile } from "@/libs/UserProfile";
import AdminDashboard from "./indexing/AdminDashboard/page";
import TechnicianDashboard from "./indexing/technicianDashboard/page";
import { Col, Container, Row } from "react-bootstrap";
export default function Dashboard() {
  const [t, i18n] = useTranslation();
  const type = UserProfile.getRole();

  const options = [{
    type:'admin',
    component: <AdminDashboard/>
  },
{

  type: 'technician',
  component: <TechnicianDashboard/>
}]
const option = options.find(option => option.type === type);
console.log(option);
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
        const graph: any = document.getElementById("building-chart");
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
            zoom: {
              pan: {
                enabled: false,
              },
              zoom: {
                enabled: false,
              },
            },
          },
        };
        let oldChart = Chart.getChart("building-chart");
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
  useEffect(() => {
    const fetchAPI = async () => {
      let chart;
      try {
        const data = new FormData();

        const res = await axios.post("/api/service/report", data);
        console.log(res.data);
        const statisticalData: any[] = res.data;
        const labelsConfig = statisticalData.map((data) => data.name);
        let chartData: any[] = [];
        const graph: any = document.getElementById("invoice-chart");
        statisticalData.forEach((data) => {
          chartData.push(parseInt(data.revenue));
        });
        const config: any = {
          type: "bar",
          data: {
            labels: labelsConfig,
            datasets: [
              {
                data: chartData,
                backgroundColor: statisticalData.map(() => {
                  return (
                    "#" + Math.floor(Math.random() * 16777215).toString(16)
                  ); // Generate a random color for each bar
                }),
                barPercentage: 0.5,
              },
            ],
          },
          options: {
            interaction: {
              mode: "nearest",
              axis: "x",
              intersect: false,
            },
            plugins: {
              zoom: {
                pan: {
                  enabled: false,
                },
                zoom: {
                  enabled: false,
                },
              },
            },
          },
        };
        let oldChart = Chart.getChart("invoice-chart");
        if (oldChart) {
          oldChart.destroy();
          chart = new Chart(graph, config);
        } else
        chart = new Chart(graph, config);
      } catch (e) {
        throw e;
      }
    };
    fetchAPI();
  }, []);

  return (
    <main className={styles.main}>
     {option?.component}
    </main>
  );
}
