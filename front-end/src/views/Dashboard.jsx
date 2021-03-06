/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from "react";
import ChartistGraph from "react-chartist";
import { Grid, Row, Col } from "react-bootstrap";
import { Card } from "components/Card/Card.jsx";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import { Tasks } from "components/Tasks/Tasks.jsx";
import {
    dataPie,
    legendPie,
    dataSales,
    optionsSales,
    responsiveSales,
    legendSales,
    dataBar,
    optionsBar,
    responsiveBar,
    legendBar
} from "variables/Variables.jsx";
import axios from "axios";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            masks: 150,
            nonmasks: 205,
            total: 355,
            news: null,
            active: null,
        }
    }
    createLegend(json) {
        var legend = [];
        for (var i = 0; i < json["names"].length; i++) {
            var type = "fa fa-circle text-" + json["types"][i];
            legend.push(<i className={type} key={i} />);
            legend.push(" ");
            legend.push(json["names"][i]);
        }
        return legend;
    }
    componentDidMount() {
        axios.get("http://192.168.0.157:5000/getData")
            .then(res => {
                const masks = parseInt(res.data.masks, 10)
                const nonmasks = parseInt(res.data.nonmasks, 10)
                const total = parseInt(masks, 10) + parseInt(nonmasks, 10)
                this.setState({
                    masks: masks,
                    nonmasks: nonmasks,
                    total: total
                })
            })


        axios.get("http://newsapi.org/v2/top-headlines?country=ca&q=covid&from=2020-06-01&sortBy=publishedAt&apiKey=c275cc5378994ec59e3852ee892bebe6")
            .then(res => {
                const news = res.data.articles;
                
                this.setState({
                    news: news
                })
            })
            .then(() => {
                const newsBars = this.state.news.slice(0,7).map(item =>
                    <Tasks thing={item.title} date = {item.publishedAt.substring(0,10)} url= {item.url} />)
                this.setState({
                    newsBars: newsBars,
                })
            }
            )
        axios.get("https://corona-virus-stats.herokuapp.com/api/v1/cases/countries-search?search=canada")
        .then(res => {
            const active = parseFloat(res.data.data.rows[0].active_cases.replace(/,/g,''));
            this.setState({
                active: active
            })
        })
    }


    render() {
        return (
            <div className="content">
                <Grid fluid>
                    <Row>
                        <Col lg={3} sm={6}>
                            <StatsCard
                                bigIcon={<i className="fa fa-user" />}
                                statsText="Customers visited"
                                statsValue={this.state.total}
                                statsIcon={<i className="fa fa-refresh" />}
                                statsIconText="Updated Now"
                            />
                        </Col>
                        <Col lg={3} sm={6}>
                            <StatsCard
                                bigIcon={<img src={'https://static.thenounproject.com/png/577778-200.png'} style={{height:"50px"}}/>}
                                statsText="Customers with Masks"
                                statsValue={this.state.masks}
                                statsIcon={<i className="fa fa-refresh" />}
                                statsIconText="Updated Now"
                            />
                        </Col>
                        <Col lg={3} sm={6}>
                            <StatsCard
                            bigIcon={<img src={'https://cdn0.iconfinder.com/data/icons/feather/96/no-512.png'} style={{height:"40px"}}/>}
                                statsText="Customers without Masks"
                                statsValue={this.state.nonmasks}
                                statsIcon={<i className="fa fa-refresh" />}
                                statsIconText="Updated Now"
                            />
                        </Col>
                        <Col lg={3} sm={6}>
                            <StatsCard
                                bigIcon={<img src={'https://cdn3.iconfinder.com/data/icons/coronavirus-line/32/coronavirus-17-512.png'} style={{height:"40px"}}/>}
                                statsText="Live Covid Cases - Canada"
                                statsValue={this.state.active}
                                statsIcon={<i className="fa fa-refresh" />}
                                statsIconText="Updated now"
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            {this.state.masks === null ? "" :
                                <Card
                                    statsIcon="fa fa-refresh"
                                    title="Analytics"
                                    category="Ratio of Mask to No-Mask wearers"
                                    stats="Updated Now"
                                    content={
                                        <div
                                            id="chartPreferences"
                                            className="ct-chart ct-perfect-fourth"
                                        >
                                            <ChartistGraph data={{ labels: ["Masks", "No Masks"], series: [this.state.masks, this.state.nonmasks] }} type="Pie" />
                                        </div>
                                    }
                                    legend={
                                        <div className="legend">{this.createLegend(legendPie)}</div>
                                    }
                                />
                            }
                        </Col>
                
                        {this.state.news === null ? "" :
                            <Col md={8}>
                                <Card
                                    title="COVID-19 News"
                                    category="Latest News regarding the COVID-19 Pandemic"
                                    stats="Updated Now"
                                    statsIcon="fa fa-history"
                                    content={
                                        <div className="table-full-width">
                                            <table className="table">
                                                <tbody>
                                                    {this.state.newsBars}
                                                </tbody>
                                            </table>
                                        </div>
                                    }
                                />
                            </Col>
                        }

                    </Row>
                </Grid>
            </div>
        );
    }
}

export default Dashboard;
