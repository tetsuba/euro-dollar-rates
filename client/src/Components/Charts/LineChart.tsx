import React, { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'

interface PropTypes {
    labels: string[]
    prices: string[]
}

export default function LineChart(props: PropTypes) {
    const node = useRef(null)

    useEffect(() => {
        if (node.current) {
            new Chart(node.current, {
                type: 'line',
                data: {
                    labels: props.labels,
                    datasets: [
                        {
                            label: 'Euro Dollar',
                            data: props.prices,
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
        }
    }, [props.prices, props.labels])

    return <canvas data-testid="line-chart" ref={node} height="500"></canvas>
}
