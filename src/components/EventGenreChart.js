import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";

// const RADIAN = Math.PI / 180;

const EventGenreChart = ({ events }) => {
  const [data, setData] = useState([]);
  const genres = ["React", "Javascript", "Angular", "jQuery", "Node"];
  const colors = ["#c0c0fc", "#9191ed", "#6f6fe8", "#3939ed", "dcdcf2"];

  useEffect(() => {
    setData(getData());
  }, [`${events}`]);

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    outerRadius,
    percent,
    index,
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius;
    const x = cx + radius * Math.cos(-midAngle * RADIAN) * 1.07;
    const y = cy + radius * Math.sin(-midAngle * RADIAN) * 1.07;
    return percent ? (
      <text
        x={x}
        y={y}
        fill="#8884d8"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${genres[index]} ${(percent * 100).toFixed(0)}%`}
      </text>
    ) : null;
  };

  const getData = () => {
    const data = genres.map((genre) => {
      const filteredLocations = events.filter(
        (event) => event.summary.toLowerCase().includes(genre.toLowerCase())
        //chatGPT recommended .toLowerCase() in order to more accurately match filter results
      );
      return {
        name: genre,
        value: filteredLocations.length,
      };
    });
    return data;
  };

  return (
    <ResponsiveContainer width="99%" height={400}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          fill="#8884d8"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={130}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default EventGenreChart;
