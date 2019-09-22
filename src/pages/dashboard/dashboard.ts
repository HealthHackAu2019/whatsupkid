import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from "chart.js";
import { DataProvider } from '../../providers/data/data.provider';
import { Assessment } from '../../models/assesment.interface';
import moment from 'moment'

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  @ViewChild("lineCanvas1") lineCanvas1: ElementRef;
  @ViewChild("barCanvas1") barCanvas1: ElementRef;
  @ViewChild("barCanvas2") barCanvas2: ElementRef;

  private lineChart1: Chart;
  private barChart1: Chart;
  private barChart2: Chart;

  constructor(public navCtrl: NavController, public navParams: NavParams, private dataProvider: DataProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');

    this.dataProvider.assessmentsRef.valueChanges().subscribe(assessments => {
      this.refreshCharts(assessments)
    })
  }
  
  refreshCharts (assessments: Assessment[]) {
    const lineChart1Data = {
      labels: assessments.map(assessment => moment(assessment.createDate).format('hh:mma')),
      datasets: [
        {
          label: "",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: assessments.map(assessment => assessment.mood),
          spanGaps: false
        }
      ]
    }

    if (this.lineChart1) {
      this.lineChart1.data = lineChart1Data
      this.lineChart1.update()
    }
    else {
      this.lineChart1 = new Chart(this.lineCanvas1.nativeElement, {
        type: "line",
        data: lineChart1Data,
        options: {
          legend: {
            display: false
          },
        },
      });
    }

    // this.barChart1 = this.barChart1 || new Chart(this.barCanvas1.nativeElement, {
    //   type: "bar",
    //   options: {
    //     scales: {
    //       xAxes: [
    //         {
		// 					stacked: true,
		// 				}
    //       ],
    //       yAxes: [
    //         {
    //           stacked: true,
    //         },
    //       ]
    //     },
    //   }
    // });

    // this.barChart1.data = {
    //   labels: ["12pm", "4pm", "8pm", "9am", "12pm", "3pm", "6pm", "11pm", "7am"],
    //   datasets: [
    //     {
    //       label: "Too Hot",
    //       data: [0, 1, 0, 1, 1, 0, 0, 0, 1],
    //       backgroundColor: "rgba(255, 99, 132, 0.2)",
    //       borderColor: "rgba(255,99,132,1)",
    //       borderWidth: 1
    //     },
    //     {
    //       label: "Too Cold",
    //       data: [0, 1, 1, 0, 0, 0, 0, 1, 1],
    //       backgroundColor: "rgba(54, 162, 235, 0.2)",
    //       borderColor: "rgba(54, 162, 235, 1)",
    //       borderWidth: 1
    //     },
    //     {
    //       label: "Itchy",
    //       data: [1, 1, 1, 0, 0, 0, 0, 0, 0],
    //       backgroundColor: "rgba(255, 206, 86, 0.2)",
    //       borderColor: "rgba(255, 206, 86, 1)",
    //       borderWidth: 1
    //     },
    //     {
    //       label: "Nausea",
    //       data: [0, 0, 1, 1, 1, 1, 0, 0, 0],
    //       backgroundColor: "rgba(75, 192, 192, 0.2)",
    //       borderColor: "rgba(75, 192, 192, 1)",
    //       borderWidth: 1
    //     },
    //     {
    //       label: "Lethargy",
    //       data: [1, 0, 1, 0, 0, 0, 0, 0, 0],
    //       backgroundColor: "rgba(153, 102, 255, 0.2)",
    //       borderColor: "rgba(153, 102, 255, 1)",
    //       borderWidth: 1
    //     },
    //   ]
    // }

    // this.barChart2 = this.barChart2 || new Chart(this.barCanvas2.nativeElement, {
    //   type: "bar",
    //   options: {
    //     scales: {
    //       xAxes: [
    //         {
		// 					stacked: true,
		// 				}
    //       ],
    //       yAxes: [
    //         {
    //           stacked: true,
    //         },
    //       ]
    //     },
    //   }
    // });

    // this.barChart2.data =  {
    //   labels: ["12pm", "4pm", "8pm", "9am", "12pm", "3pm", "6pm", "11pm", "7am"],
    //   datasets: [
    //     {
    //       label: "Water",
    //       data: [1, 1, 0, 1, 1, 0, 0, 1, 1],
    //       backgroundColor: "rgba(255, 99, 132, 0.2)",
    //       borderColor: "rgba(255,99,132,1)",
    //       borderWidth: 1
    //     },
    //     {
    //       label: "Food",
    //       data: [0, 1, 0, 0, 0, 0, 0, 0, 1],
    //       backgroundColor: "rgba(54, 162, 235, 0.2)",
    //       borderColor: "rgba(54, 162, 235, 1)",
    //       borderWidth: 1
    //     },
    //     {
    //       label: "Toilet",
    //       data: [1, 0, 1, 0, 1, 0, 1, 0, 1],
    //       backgroundColor: "rgba(255, 206, 86, 0.2)",
    //       borderColor: "rgba(255, 206, 86, 1)",
    //       borderWidth: 1
    //     },
    //     {
    //       label: "Wash",
    //       data: [1, 0, 0, 1, 0, 0, 0, 0, 1],
    //       backgroundColor: "rgba(75, 192, 192, 0.2)",
    //       borderColor: "rgba(75, 192, 192, 1)",
    //       borderWidth: 1
    //     },
    //   ]
    // }
  }
}
