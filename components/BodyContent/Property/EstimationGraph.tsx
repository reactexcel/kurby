import Card from '../../Card/Card'
import React from 'react';
import { useStyles } from '../styles';
import { Box } from '@mui/material';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { KBColor } from 'constants/color';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Property Value Estimates',
        },

        scales: {
            yAxes: [{
                gridLines: {
                    drawBorder: false,
                },
            }]
        },
    },

};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
    labels,
    datasets: [
        {
            label: 'High Estimate',
            data: labels.map(() => Math.random() * 1000),
            backgroundColor: KBColor.DRAK_GREEN,
            borderRadius: 8,
        },
        {
            label: 'Low Estimate',
            data: labels.map(() => Math.random() * 1000),
            backgroundColor: KBColor.ORANGE,
            borderRadius: 8,
        },
        {
            label: 'Estimate',
            data: labels.map(() => Math.random() * 1000),
            backgroundColor: KBColor.YELLOW,
            borderRadius: 8,
        },
    ],
};


export default function EstimationGraph({ market }: { market: any }) {
    const classes = useStyles

    const generateGraphData = () => {
        const marketingHistory = market.rentalData.history;

        const labels = [];
        const highEstimateList = [];
        const lowEstimateList = [];
        const estimateList = [];
        let count = 0;
        for (let item in marketingHistory) {
            labels.push(item);
            highEstimateList.push(marketingHistory[item]?.maxRent)
            lowEstimateList.push(marketingHistory[item]?.minRent)
            estimateList.push(marketingHistory[item]?.averageRent)
        }

        return {
            labels: labels.slice(-6),
            datasets: [
                {
                    label: 'High Estimate',
                    data: highEstimateList.slice(-6),
                    backgroundColor: KBColor.DRAK_GREEN,
                    borderRadius: 8,
                },
                {
                    label: 'Low Estimate',
                    data: lowEstimateList.slice(-6),
                    backgroundColor: KBColor.ORANGE,
                    borderRadius: 8,
                },
                {
                    label: 'Estimate',
                    data: estimateList.slice(-6),
                    backgroundColor: KBColor.YELLOW,
                    borderRadius: 8,
                },
            ],
        }

    }

    return (
        <Box sx={classes.standardCard}>
            <Bar options={options} data={generateGraphData()} />
        </Box>
    )
}