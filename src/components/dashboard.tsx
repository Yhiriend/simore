import { useEffect, useState } from "react";
import {
  Bell,
  FileText,
  AlertTriangle,
  Activity,
  Zap,
  BarChart3,
  Badge,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart";
import React from "react";
enum alertLevelEnum {
  LOW = "BAJA",
  MID = "MEDIA",
  HIGH = "ALTA",
  CRITIC = "CRITICA",
}
export function DashboardComponent() {
  const getTwoDaysAgo = () => {
    const today = new Date();
    const twoDaysAgo = new Date(today);
    twoDaysAgo.setDate(today.getDate() - 2);
    return new Date(twoDaysAgo);
  };

  const defaultAlerts = [
    {
      level: alertLevelEnum.LOW,
      location: "Sensor #12, Área Industrial",
      date: getTwoDaysAgo(),
    },
    {
      level: alertLevelEnum.LOW,
      location: "Sector Este, Subestación Principal",
      date: getTwoDaysAgo(),
    },
    {
      level: alertLevelEnum.LOW,
      location: "Sector Oeste, Transformador #3",
      date: getTwoDaysAgo(),
    },
  ];

  const [activeTab, setActiveTab] = useState("overview");
  const [alerts, setAlerts] = useState([...defaultAlerts]);
  const [averageVoltage, setAverageVoltage] = useState("0");
  const [averageCurrent, setAverageCurrent] = useState("0");

  const [alertCount, setAlertCount] = useState(0);

  const [voltageData, setVoltageData] = useState([
    { time: "00:00:00", voltage: 220 },
    { time: "01:00:00", voltage: 218 },
    { time: "02:00:00", voltage: 221 },
    { time: "03:00:00", voltage: 219 },
    { time: "04:00:00", voltage: 220 },
    { time: "05:00:00", voltage: 217 },
  ]);

  const [currentData, setCurrentData] = useState([
    { time: "00:00:00", current: 10 },
    { time: "01:00:00", current: 11 },
    { time: "02:00:00", current: 9 },
    { time: "03:00:00", current: 12 },
    { time: "04:00:00", current: 10 },
    { time: "05:00:00", current: 11 },
  ]);

  const generateAlert = () => {
    const alertLevels = [
      alertLevelEnum.LOW,
      alertLevelEnum.MID,
      alertLevelEnum.HIGH,
      alertLevelEnum.CRITIC,
    ];
    const locations = [
      "Sector Norte, Transformador #1",
      "Sector Sur, Transformador #5",
      "Sector Este, Subestación Principal",
      "Sector Oeste, Transformador #3",
    ];

    const newAlert = {
      level: alertLevels[Math.floor(Math.random() * alertLevels.length)],
      location: locations[Math.floor(Math.random() * locations.length)],
      date: new Date(),
    };

    setAlerts((prevAlerts) => [...prevAlerts, newAlert]);
    setAlertCount((prevCount) => prevCount + 1);
  };

  const calculateAverage = (data, key) => {
    const sum = data.reduce((acc, item) => acc + item[key], 0);
    return (sum / data.length).toFixed(2);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const newTime = new Date().toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      const newVoltage = Math.floor(Math.random() * 10) + 215; // Voltaje aleatorio entre 215V y 225V
      const newCurrent = Math.floor(Math.random() * 5) + 7; // Corriente aleatoria entre 8A y 12A

      setVoltageData((prevData) => {
        const updatedData = [
          ...prevData,
          { time: newTime, voltage: newVoltage },
        ];
        return updatedData.slice(-10);
      });

      setCurrentData((prevData) => {
        const updatedData = [
          ...prevData,
          { time: newTime, current: newCurrent },
        ];
        return updatedData.slice(-10);
      });

      if (Math.random() <= 0.05) {
        generateAlert();
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setAverageVoltage(calculateAverage(voltageData, "voltage"));
    setAverageCurrent(calculateAverage(currentData, "current"));
  }, [voltageData, currentData]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === "alerts") {
      setAlertCount(0);
    }
  };

  function getTimeDifference(date: Date): string {
    const currentDate = new Date();

    // Convertir las fechas a timestamps para calcular la diferencia
    const differenceMs = currentDate.getTime() - date.getTime();

    // Convertir la diferencia a minutos
    const differenceMinutes = Math.floor(differenceMs / 60000);

    // Determinar el texto a mostrar
    if (differenceMinutes < 1) {
      return "Hace menos de un minuto";
    } else if (differenceMinutes < 60) {
      return `Hace ${differenceMinutes} min`;
    } else if (differenceMinutes < 1440) {
      const differenceHours = Math.floor(differenceMinutes / 60);
      return `Hace ${differenceHours} horas`;
    } else {
      const differenceDays = Math.floor(differenceMinutes / 1440);
      return `Hace ${differenceDays} días`;
    }
  }

  const getAlertList = () => {
    const copy = [...alerts];
    return copy.reverse();
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="flex justify-between items-center p-4 bg-background border-b">
        <h1 className="text-2xl font-bold">
          Sistema de Monitoreo de Red Eléctrica
        </h1>
        <Button variant="outline">
          <Bell className="mr-2 h-4 w-4" /> Notificaciones
        </Button>
      </header>

      <main className="flex-grow p-6 overflow-auto">
        <Tabs
          value={activeTab}
          onValueChange={handleTabChange}
          className="space-y-4"
        >
          <TabsList>
            <TabsTrigger value="overview">Vista General</TabsTrigger>
            <TabsTrigger value="alerts">
              Alertas
              {alertCount > 0 && (
                <Badge className="ml-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full"></Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="reports">Informes</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Voltaje Promedio
                  </CardTitle>
                  <Zap className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{averageVoltage}V</div>
                  <p className="text-xs text-muted-foreground">
                    +0.5% desde la última hora
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Corriente Promedio
                  </CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{averageCurrent}A</div>
                  <p className="text-xs text-muted-foreground">
                    -0.2% desde la última hora
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Alertas Activas
                  </CardTitle>
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{alerts.length}</div>
                  <p className="text-xs text-muted-foreground">
                    {alerts.length - defaultAlerts.length} nuevas en las últimas
                    24h
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Eficiencia de la Red
                  </CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">98.5%</div>
                  <p className="text-xs text-muted-foreground">
                    +0.7% desde el último mes
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Voltaje en Tiempo Real</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      voltage: {
                        label: "Voltaje",
                        color: "#FFA500",
                      },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={voltageData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="voltage"
                          stroke="var(--color-voltage)"
                          name="Voltaje"
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Corriente en Tiempo Real</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      current: {
                        label: "Corriente",
                        color: "#1E90FF",
                      },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={currentData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="current"
                          stroke="var(--color-current)"
                          name="Corriente"
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="alerts">
            <Card>
              <CardHeader>
                <CardTitle>Alertas Recientes</CardTitle>
                <CardDescription>
                  Últimas alertas detectadas en el sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {getAlertList().map((alert) => {
                    return (
                      <li className="flex items-center space-x-4">
                        {alert.level === alertLevelEnum.LOW && (
                          <AlertTriangle className="h-6 w-6 text-yellow-500" />
                        )}
                        {alert.level === alertLevelEnum.MID && (
                          <AlertTriangle className="h-6 w-6 text-orange-500" />
                        )}
                        {alert.level === alertLevelEnum.HIGH && (
                          <AlertTriangle className="h-6 w-6 text-orange-800" />
                        )}
                        {alert.level === alertLevelEnum.CRITIC && (
                          <AlertTriangle className="h-6 w-6 text-red-700" />
                        )}
                        <div>
                          <p className="font-medium">Intermitencia detectada</p>
                          <p className="text-sm text-muted-foreground">
                            {alert.location}
                          </p>
                        </div>
                        <span className="ml-auto text-sm text-muted-foreground">
                          {getTimeDifference(alert.date)}
                        </span>
                      </li>
                    );
                  })}
                  {/* <li className="flex items-center space-x-4">
                    <AlertTriangle className="h-6 w-6 text-yellow-500" />
                    <div>
                      <p className="font-medium">Intermitencia detectada</p>
                      <p className="text-sm text-muted-foreground">
                        Sector Norte, Transformador #3
                      </p>
                    </div>
                    <span className="ml-auto text-sm text-muted-foreground">
                      Hace 5 min
                    </span>
                  </li>
                  <li className="flex items-center space-x-4">
                    <AlertTriangle className="h-6 w-6 text-red-500" />
                    <div>
                      <p className="font-medium">Fallo de comunicación</p>
                      <p className="text-sm text-muted-foreground">
                        Sensor #12, Área Industrial
                      </p>
                    </div>
                    <span className="ml-auto text-sm text-muted-foreground">
                      Hace 1 hora
                    </span>
                  </li>
                  <li className="flex items-center space-x-4">
                    <AlertTriangle className="h-6 w-6 text-orange-500" />
                    <div>
                      <p className="font-medium">Voltaje anormal</p>
                      <p className="text-sm text-muted-foreground">
                        Subestación Este
                      </p>
                    </div>
                    <span className="ml-auto text-sm text-muted-foreground">
                      Hace 3 horas
                    </span>
                  </li> */}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Informes Disponibles</CardTitle>
                <CardDescription>
                  Informes detallados sobre el desempeño de la red eléctrica
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex items-center space-x-4">
                    <FileText className="h-6 w-6 text-blue-500" />
                    <div>
                      <p className="font-medium">
                        Informe Mensual de Rendimiento
                      </p>
                      <p className="text-sm text-muted-foreground">Mayo 2024</p>
                    </div>
                    <Button variant="outline" className="ml-auto">
                      Ver
                    </Button>
                  </li>
                  <li className="flex items-center space-x-4">
                    <FileText className="h-6 w-6 text-green-500" />
                    <div>
                      <p className="font-medium">
                        Análisis de Eficiencia Energética
                      </p>
                      <p className="text-sm text-muted-foreground">Q2 2024</p>
                    </div>
                    <Button variant="outline" className="ml-auto">
                      Ver
                    </Button>
                  </li>
                  <li className="flex items-center space-x-4">
                    <FileText className="h-6 w-6 text-purple-500" />
                    <div>
                      <p className="font-medium">
                        Recomendaciones de Mantenimiento Preventivo
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Junio 2024
                      </p>
                    </div>
                    <Button variant="outline" className="ml-auto">
                      Ver
                    </Button>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
