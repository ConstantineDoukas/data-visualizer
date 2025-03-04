document.addEventListener('DOMContentLoaded', function() {
    const chartCanvas = document.getElementById('myChart').getContext('2d');
    const dataTypeSelect = document.getElementById('dataType');
    const chartTypeSelect = document.getElementById('chartType');
    let myChart;

    function generateRandomData(base, variance, count) {
        const data = [];
        for (let i = 0; i < count; i++) {
            const randomVariance = Math.floor(Math.random() * (2 * variance + 1)) - variance;
            data.push(base + randomVariance);
            base += Math.floor(Math.random() * 300) + 100; // Random increase
        }
        return data;
    }

    const trafficData = {
        pageViews: generateRandomData(1200, 300, 12),
        uniqueVisitors: generateRandomData(800, 200, 12)
    };

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    function createChart(type, dataKey) {
        if (myChart) {
            myChart.destroy();
        }

        myChart = new Chart(chartCanvas, {
            type: type,
            data: {
                labels: months,
                datasets: [{
                    label: dataKey === 'pageViews' ? 'Page Views' : 'Unique Visitors',
                    data: trafficData[dataKey],
                    backgroundColor: dataKey === 'pageViews' ? 'rgba(54, 162, 235, 0.5)' : 'rgba(255, 99, 132, 0.5)',
                    borderColor: dataKey === 'pageViews' ? 'rgba(54, 162, 235, 1)' : 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    createChart('line', 'pageViews'); // Initial chart

    dataTypeSelect.addEventListener('change', function() {
        createChart(chartTypeSelect.value, this.value);
    });

    chartTypeSelect.addEventListener('change', function() {
        createChart(this.value, dataTypeSelect.value);
    });
});