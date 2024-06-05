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
import { ScrollArea } from "@/components/ui/scroll-area";
import InOutChart from "@/components/charts/inOutChart";

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
    queryFn: () =>
      fetchMetricsData(selectedDevice ?? devicesData[0], "fiveMinutes"),
    refetchInterval: 60000 * 5, // Refetch the data every 5 minutes
    enabled: !!devicesData,
  });

  const beeFlowPercentage = useMemo(() => {
    const dailyInCount = data?.dailyInCount ?? 0;
    const dailyOutCount = data?.dailyOutCount ?? 0;

    if (dailyOutCount === 0) {
      return 0;
    }

    const flowPercentage =
      ((dailyInCount - dailyOutCount) / dailyOutCount) * 100;

    return flowPercentage;
  }, [data?.dailyInCount, data?.dailyOutCount]);

  return (
    <div className="flex h-screen flex-col gap-3">
      <Header title="Dashboard" />
      <div className="mb-10 flex max-h-full flex-wrap gap-4 overflow-y-auto px-2 py-2">
        <Card className="flex justify-center gap-2 p-5">
          <ToggleGroup
            type="single"
            variant="outline"
            className="flex items-start gap-2"
            onValueChange={(value) => {
              if (value) setSelectedZoom(value as typeof selectedZoom);
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
        <Card className="mb-14 w-full">
          <CardHeader>
            <CardTitle>Métricas</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2 xl:flex-row">
            <TemperatureChart
              id="graph2"
              title="Temperatura"
              data={data?.metrics}
              isLoading={isLoading}
              error={error}
              internalTempKey="temperature"
              externalTempKey="outsideTemp"
              actualZoom={selectedZoom}
              description="Dados de sensores de temperatura da área interna e externa da colmeia."
              minIdeal={30}
              maxIdeal={35}
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
              minIdeal={40}
              maxIdeal={80}
            />
            <InOutChart
              id="graph3"
              title="Entradas e Saídas"
              data={data?.metrics}
              isLoading={isLoading}
              error={error}
              inKey="inCount"
              outKey="outCount"
              actualZoom={selectedZoom}
              description="Dados de sensores de entradas e saidas de abelhas."
              minIdeal={68}
              maxIdeal={74}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
