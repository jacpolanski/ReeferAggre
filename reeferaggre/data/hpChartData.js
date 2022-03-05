export const hpChartData = {
    labels: ['Total RF capacity', 'Available RF capacity'],
    datasets: [
        {
            label: '# of Containers',
            data: [900, 1200 - 900],
            backgroundColor: [
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 99, 132, 0.0)',
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(255, 99, 132, 0)',
            ],
            borderWidth: 1,
        },
    ],
};