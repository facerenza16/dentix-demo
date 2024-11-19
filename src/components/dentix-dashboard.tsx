'use client'
import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { 
  Calendar, Users, FileText, Package, BarChart2, Bell, Settings, 
  Menu, X, LogOut, DollarSign, Clock, CheckCircle, Calculator
} from 'lucide-react';

type StatPeriod = 'day' | 'week' | 'month';

interface Stat {
  label: string;
  value: string;
  icon: React.ReactNode;
}

type StatsData = {
  [K in StatPeriod]: Stat[];
};

interface Appointment {
  patient: string;
  time: string;
  treatment: string;
  status: string;
}

interface Notification {
  type: 'reminder' | 'appointment' | 'inventory';
  message: string;
  time: string;
}

interface QuickAction {
  label: string;
  color: string;
}

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  id: string;
}

interface DemoData {
  user: {
    name: string;
    role: string;
    clinicName: string;
  };
  quickActions: QuickAction[];
  appointments: Appointment[];
  notifications: Notification[];
}

export default function DentixDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState('dashboard');
  const [statsPeriod, setStatsPeriod] = useState<StatPeriod>('day');

  const statsData: StatsData = {
    day: [
      { label: 'Citas Hoy', value: '8', icon: <Calendar className="w-5 h-5" /> },
      { label: 'Pacientes', value: '342', icon: <Users className="w-5 h-5" /> },
      { label: 'Ingresos Hoy', value: '$8,420', icon: <DollarSign className="w-5 h-5" /> },
      { label: 'Inventario', value: '156', icon: <Package className="w-5 h-5" /> },
    ],
    week: [
      { label: 'Citas Semana', value: '42', icon: <Calendar className="w-5 h-5" /> },
      { label: 'Pacientes', value: '342', icon: <Users className="w-5 h-5" /> },
      { label: 'Ingresos Semana', value: '$32,150', icon: <DollarSign className="w-5 h-5" /> },
      { label: 'Inventario', value: '156', icon: <Package className="w-5 h-5" /> },
    ],
    month: [
      { label: 'Citas Mes', value: '156', icon: <Calendar className="w-5 h-5" /> },
      { label: 'Pacientes', value: '342', icon: <Users className="w-5 h-5" /> },
      { label: 'Ingresos Mes', value: '$125,840', icon: <DollarSign className="w-5 h-5" /> },
      { label: 'Inventario', value: '156', icon: <Package className="w-5 h-5" /> },
    ]
  };

  const demoData: DemoData = {
    user: {
      name: "Dr. Juan Pérez",
      role: "Dentista",
      clinicName: "Clínica Dental Ejemplo"
    },
    quickActions: [
      { label: 'Nueva Cita', color: 'bg-blue-500 hover:bg-blue-600' },
      { label: 'Nuevo Paciente', color: 'bg-green-500 hover:bg-green-600' },
      { label: 'Historial Clínico', color: 'bg-purple-500 hover:bg-purple-600' },
      { label: 'Nuevo Presupuesto', color: 'bg-amber-500 hover:bg-amber-600' }
    ],
    appointments: [
      { patient: 'María García', time: '09:00', treatment: 'Limpieza Dental', status: 'Confirmado' },
      { patient: 'Juan Pérez', time: '10:30', treatment: 'Revisión Ortodoncia', status: 'Pendiente' },
      { patient: 'Ana López', time: '11:45', treatment: 'Extracción', status: 'Confirmado' },
    ],
    notifications: [
      { type: 'reminder', message: 'Recordatorio: Pedir material dental', time: '5 min ago' },
      { type: 'appointment', message: 'Nueva cita programada', time: '10 min ago' },
      { type: 'inventory', message: 'Stock bajo: Anestesia local', time: '1 hour ago' },
    ]
  };

  const menuItems: MenuItem[] = [
    { icon: <Calendar />, label: 'Dashboard', id: 'dashboard' },
    { icon: <Calendar />, label: 'Citas', id: 'appointments' },
    { icon: <Users />, label: 'Pacientes', id: 'patients' },
    { icon: <FileText />, label: 'Historiales', id: 'records' },
    { icon: <Calculator />, label: 'Presupuestos', id: 'budgets' },
    { icon: <Package />, label: 'Inventario', id: 'inventory' },
    { icon: <BarChart2 />, label: 'Análisis', id: 'analytics' },
    { icon: <Bell />, label: 'Notificaciones', id: 'notifications' },
    { icon: <Settings />, label: 'Configuración', id: 'settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-200 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="flex flex-col h-full">
          <div className="p-4 flex items-center justify-between border-b">
            <h1 className="text-xl font-bold text-blue-600">Dentix</h1>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-md hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 border-b">
            <div className="font-medium">{demoData.user.name}</div>
            <div className="text-sm text-gray-500">{demoData.user.role}</div>
            <div className="text-sm text-gray-500">{demoData.user.clinicName}</div>
          </div>

          <nav className="flex-1 p-4">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveMenuItem(item.id)}
                className={`flex items-center w-full px-4 py-3 rounded-lg mb-1 ${
                  activeMenuItem === item.id
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {item.icon}
                <span className="ml-3">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="p-4 border-t">
            <button className="flex items-center px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg w-full">
              <LogOut className="w-5 h-5" />
              <span className="ml-3">Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center p-4 bg-white shadow-sm">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="ml-4 text-lg font-semibold">Dentix</h1>
        </div>

        {/* Main Content Area */}
        <div className="p-6">
          {/* Welcome Section */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              Bienvenido, {demoData.user.name}
            </h1>
            <p className="text-gray-500">
              {new Date().toLocaleDateString('es-ES', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Quick Actions Card */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="text-lg">Acciones Rápidas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {demoData.quickActions.map((action, index) => (
                    <button
                      key={index}
                      className={`${action.color} text-white py-2 px-4 rounded-lg text-center transition-colors`}
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Stats Section */}
            <div className="lg:col-span-2 space-y-4">
              {/* Period Selector */}
              <div className="flex bg-white rounded-lg p-1 w-fit shadow-sm border">
                {[
                  { id: 'day' as StatPeriod, label: 'Día' },
                  { id: 'week' as StatPeriod, label: 'Semana' },
                  { id: 'month' as StatPeriod, label: 'Mes' }
                ].map((timeFrame) => (
                  <button
                    key={timeFrame.id}
                    onClick={() => setStatsPeriod(timeFrame.id)}
                    className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                      statsPeriod === timeFrame.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {timeFrame.label}
                  </button>
                ))}
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {statsData[statsPeriod].map((stat, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="text-gray-500">{stat.icon}</div>
                      <div className="text-xl font-bold">{stat.value}</div>
                    </div>
                    <div className="mt-2 text-sm text-gray-600">{stat.label}</div>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Appointments and Notifications Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Appointments Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Próximas Citas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {demoData.appointments.map((appointment, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium">{appointment.patient}</div>
                        <div className="text-sm text-gray-500">{appointment.treatment}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-blue-600 font-medium">{appointment.time}</div>
                        <div className={`text-sm ${
                          appointment.status === 'Confirmado' ? 'text-green-500' : 'text-yellow-500'
                        }`}>
                          {appointment.status}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Notifications Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Bell className="w-5 h-5 mr-2" />
                  Notificaciones Recientes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {demoData.notifications.map((notification, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0 mt-1">
                        {notification.type === 'reminder' && <Bell className="w-5 h-5 text-blue-500" />}
                        {notification.type === 'appointment' && <CheckCircle className="w-5 h-5 text-green-500" />}
                        {notification.type === 'inventory' && <Package className="w-5 h-5 text-orange-500" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}