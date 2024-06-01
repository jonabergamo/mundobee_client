"use client";
import Header from "@/components/header";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAxios } from "@/helper/hooks/useAxios";
import ReactApexChart from "react-apexcharts";
import { Card } from "@/components/ui/card";
import { Metric } from "@/types/Metric";
import { useTheme } from "next-themes";

export default function Dashboard() {
  const axios = useAxios();
  const { theme } = useTheme();

  const fetchMetricsData = async (deviceId: string, interval: string) => {
    const response = await axios.get(
      `metrics/device/${deviceId}?interval=${interval}`
    );
    return response.data;
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["metricsData"],
    queryFn: () =>
      fetchMetricsData("e67233aa-420b-4af3-9563-880cc7090530", "minute"),
    refetchInterval: 60000, // Refetch the data every minute
  });

  const [chartData, setChartData] = useState<any>({
    series: [
      {
        name: "Temperature",
        data: [],
      },
      {
        name: "Humidity",
        data: [],
      },
    ],
    options: {
      chart: {
        id: "temperature-humidity-datetime",
        type: "area",
        height: 350,
        zoom: {
          autoScaleYaxis: true,
        },
      },
      xaxis: {
        type: "datetime",
        tickAmount: 9,
        labels: {
          style: {
            colors: theme === "dark" ? "#FFF" : "#000", // X-axis labels color
          },
          formatter: function (val: any) {
            return new Date(val).toLocaleString("pt-BR", {
              year: "numeric",
              month: "numeric",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            });
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      yaxis: [
        {
          title: {
            text: "Temperatura (°C)",
            style: {
              color: theme === "dark" ? "#FFF" : "#000", // Y-axis title color
            },
          },
          labels: {
            style: {
              colors: theme === "dark" ? "#FFF" : "#000", // Y-axis labels color
            },
          },
        },
        {
          opposite: true,
          title: {
            text: "Umidade (%)",
            style: {
              color: theme === "dark" ? "#FFF" : "#000", // Y-axis title color
            },
          },
          labels: {
            style: {
              colors: theme === "dark" ? "#FFF" : "#000", // Y-axis labels color
            },
          },
        },
      ],
      stroke: {
        curve: "smooth",
        width: 2, // Espessura da linha
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          stops: [0, 90, 100],
          colorStops: [
            {
              offset: 0,
              color: theme === "dark" ? "#000000" : "#ffffff", // Começo do gradiente
              opacity: 0.7,
            },
            {
              offset: 100,
              color: theme === "dark" ? "#ffcc00" : "#ffcc00", // Fim do gradiente para Temperatura
              opacity: 0.9,
            },
          ],
        },
      },
      colors: ["#ffcc00", "#00ccff"], // Cores das linhas
      legend: {
        show: true,
        labels: {
          colors: theme === "dark" ? "#FFF" : "#000", // Legend text color
        },
      },
      grid: {
        borderColor:
          theme === "dark"
            ? "rgba(255, 255, 255, 0.15)"
            : "rgba(0, 0, 0, 0.15)",
      },
      tooltip: {
        theme: theme, // Tooltip theme
        style: {
          fontSize: "12px",
          fontFamily: undefined,
        },
        x: {
          show: true,
          format: "dd/MM/yyyy HH:mm",
        },
      },
    },
  });

  useEffect(() => {
    if (data && data.length > 0) {
      const labels = data.map((item: Metric) =>
        new Date(item.timestamp).toISOString()
      );
      const temperatures = data.map((item: Metric) => item.temperature);
      const humidity = data.map((item: Metric) => item.humidity);

      setChartData({
        ...chartData,
        series: [
          {
            ...chartData.series[0],
            data: temperatures,
          },
          {
            ...chartData.series[1],
            data: humidity,
          },
        ],
        options: {
          ...chartData.options,
          xaxis: {
            ...chartData.options.xaxis,
            categories: labels,
          },
        },
      });
    }
  }, [data]);

  useEffect(() => {
    setChartData((prevChartData: any) => ({
      ...prevChartData,
      options: {
        ...prevChartData.options,
        xaxis: {
          ...prevChartData.options.xaxis,
          labels: {
            style: {
              colors: theme === "dark" ? "#FFF" : "#000", // X-axis labels color
            },
          },
        },
        yaxis: prevChartData.options.yaxis.map((axis: any) => ({
          ...axis,
          title: {
            ...axis.title,
            style: {
              color: theme === "dark" ? "#FFF" : "#000", // Y-axis title color
            },
          },
          labels: {
            style: {
              colors: theme === "dark" ? "#FFF" : "#000", // Y-axis labels color
            },
          },
        })),
        fill: {
          type: "gradient",
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.9,
            stops: [0, 90, 100],
            colorStops: [
              {
                offset: 0,
                color: theme === "dark" ? "#000000" : "#ffffff", // Começo do gradiente
                opacity: 0.7,
              },
              {
                offset: 100,
                opacity: 0.9,
              },
            ],
          },
        },
        legend: {
          ...prevChartData.options.legend,
          labels: {
            colors: theme === "dark" ? "#FFF" : "#000", // Legend text color
          },
        },
        grid: {
          borderColor:
            theme === "dark"
              ? "rgba(255, 255, 255, 0.15)"
              : "rgba(0, 0, 0, 0.15)",
        },
        tooltip: {
          theme: theme, // Tooltip theme
        },
      },
    }));
  }, [theme]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <>
      <Header title="Predefinições" />
      <div className="flex gap-2">
        <Card className="relative flex flex-col  w-full mb-6">
          <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full max-w-full flex-grow flex-1">
                <h6 className="uppercase text-blueGray-100 mb-1 text-xs font-semibold">
                  Temperatura e Humidade Interna
                </h6>
              </div>
            </div>
          </div>
          <div className="p-4 flex-auto">
            {/* Chart */}
            <div className="relative h-350-px">
              <ReactApexChart
                options={chartData.options}
                series={chartData.series}
                type="area"
                height={350}
              />
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}
