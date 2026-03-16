import { PieChart, Pie, ResponsiveContainer } from "recharts";
import css from "./ProgressStatistics.module.css";

interface StatisticsProps {
  totalReadPages: number;
  totalPages: number;
}

export default function ProgressStatistics({
  totalReadPages,
  totalPages,
}: StatisticsProps) {
  const percentage = Math.min(
    Math.round((totalReadPages / totalPages) * 100),
    100,
  );

  const data = [
    { name: "Read", value: totalReadPages, fill: "#30B94D" },
    {
      name: "Remaining",
      value: Math.max(totalPages - totalReadPages, 0),
      fill: "#1F1F1F",
    },
  ];

  return (
    <>
      <p className={css.description}>
        Each page, each chapter is a new round of knowledge, a new step towards
        understanding. By rewriting statistics, we create our own reading
        history.
      </p>
      <div className={css.graphContainer}>
        <div className={css.chartBox}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={0}
                dataKey="value"
                stroke="none"
                startAngle={90}
                endAngle={-270}
                isAnimationActive={true}
                animationBegin={200}
                animationDuration={1500}
                animationEasing="ease-out"
              ></Pie>
            </PieChart>
          </ResponsiveContainer>

          <div className={css.centerText}>100%</div>
        </div>
        <div className={css.graphInfo}>
          <span className={css.marker}></span>
          <div className={css.infoWrapper}>
            <p className={css.percent}>{percentage.toFixed(2)}%</p>
            <p className={css.pagedRead}>{totalReadPages} pages read</p>
          </div>
        </div>
      </div>
    </>
  );
}
