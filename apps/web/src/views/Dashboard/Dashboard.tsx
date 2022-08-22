import React, { useEffect, useState } from "react";
import { AnalyticsPayload } from "../../interfaces/app.interfaces";
import { Box, Grid, Paper, Container, styled } from "@mui/material";
import { Budget } from "../../components/Dashboard/budget";
import { Sales } from "../../components/Dashboard/sales";
import { TasksProgress } from "../../components/Dashboard/tasks-progress";
import { TotalCustomers } from "../../components/Dashboard/total-customers";
import { TotalProfit } from "../../components/Dashboard/total-profit";
import { TrafficByDevice } from "../../components/Dashboard/traffic-by-device";

interface AnalyticsData extends AnalyticsPayload {
  sum: {
    click: number;
    view: number;
    pageLoad: number;
  };
}

interface DashboardProps {
  // ...proptypes
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Dashboard = ({}: DashboardProps): JSX.Element => {
  const [analyticsPayload, setAnalyticsPayload] = useState<AnalyticsData>();

  useEffect(() => {
    fetch("/mgmt/v1/ads/accountView")
      .then((res) => res.json())
      .then((data) => {
        const sum: any = {
          click: 0,
          view: 0,
          pageLoad: 0,
        };

        for (const event of data.events) {
          sum[event]++;
        }

        return { ...data, sum };
      })
      .then(setAnalyticsPayload)
      .catch(console.log);
  }, [setAnalyticsPayload]);

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <Budget />
          </Grid>
          <Grid item xl={3} lg={3} sm={6} xs={12}>
            <TotalCustomers />
          </Grid>
          <Grid item xl={3} lg={3} sm={6} xs={12}>
            <TasksProgress />
          </Grid>
          <Grid item xl={3} lg={3} sm={6} xs={12}>
            <TotalProfit sx={{ height: "100%" }} />
          </Grid>
          <Grid item lg={8} md={12} xl={9} xs={12}>
            <Sales />
          </Grid>
          <Grid item lg={4} md={6} xl={3} xs={12}>
            <TrafficByDevice sx={{ height: "100%" }} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export { Dashboard };
