import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
} from "recharts";

export default function ChartDisplay({ formData }) {
  if (!formData || Object.keys(formData).length === 0) return null;

  const data = Object.entries(formData).map(([key, val]) => ({
    name: key.replace(/_/g, " "),
    value: parseFloat(val) || 0,
  }));

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2rem", width: "100%" }}>
      {/* Bar Chart */}
      <div style={{ width: "100%", maxWidth: "700px", height: 280 }}>
        <ResponsiveContainer>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={-30} textAnchor="end" height={60} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#6200ea" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Radar Chart */}
      <div style={{ width: "100%", maxWidth: "700px", height: 280 }}>
        <ResponsiveContainer>
          <RadarChart data={data} outerRadius={90}>
            <PolarGrid />
            <PolarAngleAxis dataKey="name" />
            <Radar
              dataKey="value"
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
