"use client";
import Header from "@/components/header";
import React, { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAxios } from "@/helper/hooks/useAxios";
import ReactApexChart from "react-apexcharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Metric } from "@/types/Metric";
import { useTheme } from "next-themes";
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { IoMdArrowDropdown } from "react-icons/io";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AxiosResponse } from "axios";
import { useAuth } from "@/context/authContext";
import TemperatureChart from "@/components/charts/TemperatureChart";
import HumidityChart from "@/components/charts/HumidityChart";
import { decryptData, encryptData } from "@/helper/Cypto";
import Cookies from "js-cookie";

export default function Dashboard() {
  const axios = useAxios();
  const { user } = useAuth();
  const [selectedZoom, setSelectedZoom] = useState<"day" | "week" | "month">(
    "day",
  );

  const [selectedDevice, setSelectedDevice] = useState<string>();

  useEffect(() => {
    const encryptedDeviceId = Cookies.get("pref_dev");
    if (encryptedDeviceId) {
      const decryptedDeviceId = decryptData(encryptedDeviceId);
      setSelectedDevice(decryptedDeviceId);
    }
  }, []);

  const fetchMetricsData = async (deviceId: string, interval: string) => {
    const response = await axios.get(
      `metrics/device/${deviceId}?interval=${interval}`,
    );
    return response.data;
  };

  const { data: devicesData, error: devicesError } = useQuery({
    queryKey: ["getDevices"],
    queryFn: async () => {
      if (!user?.sub) {
        return null;
      }

      const response: AxiosResponse<any, any> = await axios.get(
        `devices/user/${user.sub}`,
      );
      return response.data;
    },
    enabled: !!user?.sub,
  });

  const { data, error, isLoading } = useQuery({
    queryKey: ["metricsData", { selectedDevice }],
    queryFn: () => fetchMetricsData(selectedDevice ?? devicesData[0], "minute"),
    refetchInterval: 60000, // Refetch the data every 5 minutes
    enabled: !!devicesData,
  });

  const beeFlowPercentage = useMemo(() => {
    const dailyInCount = data?.dailyInCount ?? 0;
    const dailyOutCount = data?.dailyOutCount ?? 0;

    const minCount = Math.min(dailyInCount, dailyOutCount);
    const maxCount = Math.max(dailyInCount, dailyOutCount);

    if (minCount === 0) {
      return 0;
    }

    const percentageIncrease = ((maxCount - minCount) / minCount) * 100;

    return percentageIncrease;
  }, [data?.dailyInCount, data?.dailyOutCount]);

  return (
    <div className="flex h-screen flex-col gap-3">
      <Header title="Dashboard" />
      <div className="flex w-full flex-col items-start justify-center gap-2 overflow-y-auto">
        <Card className="flex justify-center gap-2 p-5">
          <ToggleGroup
            type="single"
            variant="outline"
            className="flex items-start gap-2"
            onValueChange={(value) => {
              setSelectedZoom(value as typeof selectedZoom);
            }}
            value={selectedZoom}
          >
            <ToggleGroupItem value="day" aria-label="Toggle Day">
              Diário
            </ToggleGroupItem>
            <ToggleGroupItem value="week" aria-label="Toggle Week">
              Semanal
            </ToggleGroupItem>
            <ToggleGroupItem value="month" aria-label="Toggle Month">
              Mensal
            </ToggleGroupItem>
          </ToggleGroup>
          <Select
            value={selectedDevice}
            onValueChange={(value) => {
              setSelectedDevice(value);
              const encryptedData = encryptData(value);
              Cookies.set("pref_dev", encryptedData, {
                secure: true,
                sameSite: "strict",
              });
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione o dispositivo" />
            </SelectTrigger>
            <SelectContent>
              {devicesData?.owned?.map((device: any) => (
                <SelectItem value={device.id} key={device.id}>
                  {device.name}
                </SelectItem>
              ))}
              {devicesData?.viewer?.map((device: any) => (
                <SelectItem value={device.id} key={device.id}>
                  {device.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Card>
        <div className="flex flex-wrap gap-2">
          <Card className="aspect-square">
            <CardHeader>
              <CardTitle>Entradas</CardTitle>
              <CardDescription>Entradas de abelhas.</CardDescription>
            </CardHeader>
            <CardContent className="flex">
              <Label className="text-6xl">{data?.dailyInCount}</Label>
            </CardContent>
          </Card>
          <Card className="aspect-square">
            <CardHeader>
              <CardTitle>Saídas</CardTitle>
              <CardDescription>Saídas de abelhas.</CardDescription>
            </CardHeader>
            <CardContent className="flex">
              <Label className="text-6xl">{data?.dailyOutCount}</Label>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Fluxo de entrada/saída</CardTitle>
              <CardDescription>
                Fluxo de entradas e saídas de abelhas.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex">
              <IoMdArrowDropdown
                className={`text-6xl transition-all ${
                  beeFlowPercentage === 0
                    ? "-rotate-90 text-gray-500"
                    : beeFlowPercentage > 0
                      ? "rotate-180 text-green-500"
                      : "text-red-500"
                }`}
              />
              <Label
                className={`text-6xl transition-all ${
                  beeFlowPercentage === 0
                    ? "text-gray-500"
                    : beeFlowPercentage > 0
                      ? "text-green-500"
                      : "text-red-500"
                }`}
              >
                {beeFlowPercentage.toFixed(0)}%
              </Label>
            </CardContent>
          </Card>
        </div>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>Métricas</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-2">
            <TemperatureChart
              title="Temperatura"
              data={data?.metrics}
              isLoading={isLoading}
              error={error}
              internalTempKey="temperature"
              externalTempKey="outsideTemp"
              actualZoom={selectedZoom}
              description="Dados de sensores de temperatura da área interna e externa da colmeia."
              minIdeal={22}
              maxIdeal={24}
            />
            <HumidityChart
              id="graph1"
              title="Humidade"
              data={data?.metrics}
              isLoading={isLoading}
              error={error}
              internalHumidityKey="humidity"
              externalHumidityKey="outsideHumidity"
              actualZoom={selectedZoom}
              description="Dados de sensores de humidade da área interna e externa da colmeia."
              minIdeal={64}
              maxIdeal={68}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
