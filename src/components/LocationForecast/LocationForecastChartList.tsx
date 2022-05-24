import React, {FC, useEffect, useRef, useState} from "react";

// helpers
import {OptionForChart} from "src/utils/interfaces";
import {axisBottom, axisLeft, ScaleBand, scaleBand, ScaleLinear, scaleLinear, select} from "d3";
import {Typography} from "@mui/material";

interface BarChartProps {
    data: OptionForChart[];
}

interface AxisBottomProps {
    scale: ScaleBand<string>;
    transform: string;
}

interface AxisLeftProps {
    scale: ScaleLinear<number, number, never>;
}

interface BarsProps {
    data: BarChartProps["data"];
    height: number;
    scaleX: AxisBottomProps["scale"];
    scaleY: AxisLeftProps["scale"];
}

const AxisBottom = ({scale, transform}: AxisBottomProps) => {
    const ref = useRef<SVGGElement>(null);

    useEffect(() => {
        if (ref.current) {
            select(ref.current).call(axisBottom(scale));
        }
    }, [scale]);

    return <g ref={ref} transform={transform} />;
};

const AxisLeft = ({scale}: AxisLeftProps) => {
    const ref = useRef<SVGGElement>(null);

    useEffect(() => {
        if (ref.current) {
            select(ref.current).call(axisLeft(scale));
        }
    }, [scale]);

    return <g ref={ref} />;
};

const Bars = ({data, height, scaleX, scaleY}: BarsProps) => {
    return (
        <>
            {data.map(({temperature, time}) => (
                <rect
                    key={`bar-${time}`}
                    x={scaleX(time)}
                    y={scaleY(temperature)}
                    width={scaleX.bandwidth()}
                    height={height - scaleY(temperature)}
                    fill="#b272bd"
                />
            ))}
        </>
    );
};

interface LocationForecastChartListProps {
    options: OptionForChart[];
}

const LocationForecastChartList: FC<LocationForecastChartListProps> = ({options}) => {
    const [clientWidth, setClientWidth] = useState(
        document.documentElement.clientWidth > 1200
            ? 1200
            : document.documentElement.clientWidth - 48
    );

    const margin = {top: 30, right: 30, bottom: 50, left: 30};
    const width = clientWidth - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;
    const temperatureArray = options.map(({temperature}) => temperature);

    const scaleX = scaleBand()
        .domain(options.map(({time}) => time))
        .range([0, width])
        .padding(0.5);
    const scaleY = scaleLinear()
        .domain([
            !Math.min(0, ...temperatureArray) ? 0 : Math.min(0, ...temperatureArray) - 1,
            Math.max(...temperatureArray) + 2
        ])
        .range([height, 0]);

    useEffect(() => {
        window.addEventListener("resize", changeWidth);
        return () => {
            window.removeEventListener("resize", changeWidth);
        };
    }, []);

    const changeWidth = (): void => {
        setClientWidth(
            document.documentElement.clientWidth > 1200
                ? 1200
                : document.documentElement.clientWidth - 48
        );
    };

    return (
        <>
            <Typography variant="h6" color="text.secondary" align="center">
                {options[0].date}
            </Typography>
            <Typography variant="h6" color="text.secondary" align="center">
                {options[0].weekDay}
            </Typography>
            <svg
                width={width + margin.left + margin.right}
                height={height + margin.top + margin.bottom}
            >
                <g transform={`translate(${margin.left}, ${margin.top})`}>
                    <AxisBottom scale={scaleX} transform={`translate(0, ${height})`} />
                    <AxisLeft scale={scaleY} />
                    <Bars data={options} height={height} scaleX={scaleX} scaleY={scaleY} />
                </g>
            </svg>
        </>
    );
};

export default LocationForecastChartList;
