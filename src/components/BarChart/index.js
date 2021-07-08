import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';

class BarChart extends Component {

  render() {
    const data = {
      labels: this.props.labels,
      datasets: [
        {
          label: '# of Images',
          data: this.props.data,
          backgroundColor: [
            'rgba(54, 162, 235, 0.2)',
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };

    const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
    return (
      <Bar data={data} options={options} />
    )
  }
}

export default BarChart;