import React, { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'

export default function LineChart({ data }) {
    const node = useRef(null)

    useEffect(() => {
        new Chart(node.current, {
            type: 'line',
            data: {
                labels: data.labels,
                datasets: [
                    {
                        label: 'Euro Dollar',
                        data: data.prices,
                        backgroundColor: ['rgba(255, 99, 132, 0.2)'],
                        borderColor: ['rgba(255, 99, 132, 1)'],
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: false,
                    },
                },
            },
        })
    }, [data])

    return <canvas data-testid="line-chart" ref={node} height="500"></canvas>
}
