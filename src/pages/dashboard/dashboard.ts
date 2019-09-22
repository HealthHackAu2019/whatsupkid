import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from "chart.js";
import { DataProvider } from '../../providers/data/data.provider';
import { Assessment } from '../../models/assesment.interface';
import moment from 'moment'

const to_bool = (value, comparison) => {
  if (value === 'undefined') {
    return 0;
  } else if (value === comparison) {
    return 1;
  } else {
    return 0;
  }
}

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  @ViewChild("barCanvas1") barCanvas1: ElementRef;
  @ViewChild("barCanvas2") barCanvas2: ElementRef;
  @ViewChild("barCanvas3") barCanvas3: ElementRef;

  private barChart1: Chart;
  private barChart2: Chart;
  private barChart3: Chart;

  constructor(public navCtrl: NavController, public navParams: NavParams, private dataProvider: DataProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');

    this.dataProvider.assessmentsRef.valueChanges().subscribe(assessments => {
      this.refreshCharts(assessments)
    })
  }

  refreshCharts (assessments: Assessment[]) {

    const barChart1Data = {
      labels: assessments.map(assessment => moment(assessment.createDate).format('hh:mma')),
      datasets: [
        {
          label: "Happy",
          data: assessments.map(assessment => to_bool(assessment.mood, 0)),
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255,99,132,1)",
          borderWidth: 1
        },
        {
          label: "Low",
          data: assessments.map(assessment => to_bool(assessment.mood, 1)),
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1
        },
        {
          label: "Wincing",
          data: assessments.map(assessment => to_bool(assessment.mood, 2)),
          backgroundColor: "rgba(255, 206, 86, 0.2)",
          borderColor: "rgba(255, 206, 86, 1)",
          borderWidth: 1
        },
        {
          label: "Grit",
          data: assessments.map(assessment => to_bool(assessment.mood, 3)),
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1
        },
        {
          label: "Cry",
          data: assessments.map(assessment => to_bool(assessment.mood, 4)),
          backgroundColor: "rgba(153, 102, 255, 0.2)",
          borderColor: "rgba(153, 102, 255, 1)",
          borderWidth: 1
        },
        {
          label: "Scream",
          data: assessments.map(assessment => to_bool(assessment.mood, 5)),
          backgroundColor: "rgba(93,138,168,0.2)",
          borderColor: "rgba(93,138,168,1)",
          borderWidth: 1
        },
      ]
    }

    if (this.barChart1) {
      this.barChart1.data = barChart1Data
      this.barChart1.update()
    }
    else {
      this.barChart1 = new Chart(this.barCanvas1.nativeElement, {
        type: "bar",
        data: barChart1Data,
        options: {
          legend: {
            display: true
          },
          scales: {
            xAxes: [
              {
  							stacked: true,
  						}
            ],
            yAxes: [
              {
                stacked: true,
              },
            ]
          },
        },
      });
    }

    const barChart2Data = {
      labels: assessments.map(assessment => moment(assessment.createDate).format('hh:mma')),
      datasets: [
        {
          label: "Front Head",
          data: assessments.map(assessment => to_bool(assessment.location, 0)),
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255,99,132,1)",
          borderWidth: 1
        },
        {
          label: "Front Body Arms",
          data: assessments.map(assessment => to_bool(assessment.location, 1)),
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1
        },
        {
          label: "Front Legs",
          data: assessments.map(assessment => to_bool(assessment.location, 2)),
          backgroundColor: "rgba(255, 206, 86, 0.2)",
          borderColor: "rgba(255, 206, 86, 1)",
          borderWidth: 1
        },
        {
          label: "Back Head",
          data: assessments.map(assessment => to_bool(assessment.location, 3)),
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1
        },
        {
          label: "Back Body Arms",
          data: assessments.map(assessment => to_bool(assessment.location, 4)),
          backgroundColor: "rgba(153, 102, 255, 0.2)",
          borderColor: "rgba(153, 102, 255, 1)",
          borderWidth: 1
        },
        {
          label: "Back Legs",
          data: assessments.map(assessment => to_bool(assessment.location, 5)),
          backgroundColor: "rgba(93,138,168,0.2)",
          borderColor: "rgba(93,138,168,1)",
          borderWidth: 1
        },
      ]
    }

    if (this.barChart2) {
      this.barChart2.data = barChart2Data
      this.barChart2.update()
    }
    else {
      this.barChart2 = new Chart(this.barCanvas2.nativeElement, {
        type: "bar",
        data: barChart2Data,
        options: {
          legend: {
            display: true
          },
          scales: {
            xAxes: [
              {
  							stacked: true,
  						}
            ],
            yAxes: [
              {
                stacked: true,
              },
            ]
          },
        },
      });
    }

    const barChart3Data = {
      labels: assessments.map(assessment => moment(assessment.createDate).format('hh:mma')),
      datasets: [
        {
          label: "Toilet",
          data: assessments.map(assessment => to_bool(assessment.reason, 0)),
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255,99,132,1)",
          borderWidth: 1
        },
        {
          label: "Cold",
          data: assessments.map(assessment => to_bool(assessment.reason, 1)),
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1
        },
        {
          label: "Hot",
          data: assessments.map(assessment => to_bool(assessment.reason, 2)),
          backgroundColor: "rgba(255, 206, 86, 0.2)",
          borderColor: "rgba(255, 206, 86, 1)",
          borderWidth: 1
        },
        {
          label: "Homesick",
          data: assessments.map(assessment => to_bool(assessment.reason, 3)),
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1
        },
        {
          label: "Hungry",
          data: assessments.map(assessment => to_bool(assessment.reason, 4)),
          backgroundColor: "rgba(153, 102, 255, 0.2)",
          borderColor: "rgba(153, 102, 255, 1)",
          borderWidth: 1
        },
        {
          label: "Thirsty",
          data: assessments.map(assessment => to_bool(assessment.reason, 5)),
          backgroundColor: "rgba(93,138,168,0.2)",
          borderColor: "rgba(93,138,168,1)",
          borderWidth: 1
        },
      ]
    }

    if (this.barChart3) {
      this.barChart3.data = barChart3Data
      this.barChart3.update()
    }
    else {
      this.barChart3 = new Chart(this.barCanvas3.nativeElement, {
        type: "bar",
        data: barChart3Data,
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [
              {
  							stacked: true,
  						}
            ],
            yAxes: [
              {
                stacked: true,
              },
            ]
          },
        },
      });
    }

    // const lineChart1Data = {
    //   labels: assessments.map(assessment => moment(assessment.createDate).format('hh:mma')),
    //   datasets: [
    //     {
    //       label: "",
    //       fill: false,
    //       lineTension: 0.1,
    //       backgroundColor: "rgba(75,192,192,0.4)",
    //       borderColor: "rgba(75,192,192,1)",
    //       borderCapStyle: "butt",
    //       borderDash: [],
    //       borderDashOffset: 0.0,
    //       borderJoinStyle: "miter",
    //       pointBorderColor: "rgba(75,192,192,1)",
    //       pointBackgroundColor: "#fff",
    //       pointBorderWidth: 1,
    //       pointHoverRadius: 5,
    //       pointHoverBackgroundColor: "rgba(75,192,192,1)",
    //       pointHoverBorderColor: "rgba(220,220,220,1)",
    //       pointHoverBorderWidth: 2,
    //       pointRadius: 1,
    //       pointHitRadius: 10,
    //       data: assessments.map(assessment => assessment.mood),
    //       spanGaps: false
    //     }
    //   ]
    // }

  }
}
