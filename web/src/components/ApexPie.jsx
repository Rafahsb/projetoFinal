import React from "react";
import ReactApexChart from "react-apexcharts";

export default function ApexPie(props) {
    const chartData = {
        series: props.total,
        options: {
            chart: {
                width: 380,
                type: "pie",
            },
            labels: props.unidade,
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200,
                        },
                        legend: {
                            position: "bottom",
                        },
                    },
                },
            ],
        },
    };

    return (
        <div className="d-flex justify-content-center align-items-center h-100 ">
            <ReactApexChart
                options={chartData.options}
                series={chartData.series}
                type="pie"
                width={380}
                height={300}
            />
        </div>
    );
}
