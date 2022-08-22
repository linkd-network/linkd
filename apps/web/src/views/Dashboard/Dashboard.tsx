import React, {useEffect, useState} from 'react';
import { AnalyticsPayload } from '../../interfaces/app.interfaces';
import {Box, Grid, Paper, styled} from "@mui/material";

interface AnalyticsData extends AnalyticsPayload {
    sum: {
        click: number;
        view: number;
        pageLoad: number;
    }
}

interface DashboardProps {
    // ...proptypes
}

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.primary.light,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const Dashboard = ({}: DashboardProps): JSX.Element => {
    const [analyticsPayload, setAnalyticsPayload] = useState<AnalyticsData>();

    useEffect(() => {
        fetch('/mgmt/v1/ads/accountView')
            .then(res => res.json())
            .then(data => {
                const sum: any = {
                    click: 0,
                    view: 0,
                    pageLoad: 0
                }

                for (const event of data.events) {
                    sum[event]++
                }

                return { ...data, sum }
            })
            .then(setAnalyticsPayload)
            .catch(console.log);
    }, [setAnalyticsPayload]);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container rowSpacing={2} spacing={2}>
                <Grid item xs={6} md={3}>
                    <Item>xs=6 md=3</Item>
                </Grid>
                <Grid item xs={6} md={3}>
                    <Item>xs=6 md=3</Item>
                </Grid>
                <Grid item xs={6} md={3}>
                    <Item>xs=6 md=3</Item>
                </Grid>
                <Grid item xs={6} md={3}>
                    <Item>xs=6 md=3</Item>
                </Grid>
                <Grid item xs={12}>
                    <Item>xs=12</Item>
                </Grid>
                <Grid item xs={6} md={4}>
                    <Item>xs=6 md=4</Item>
                </Grid>
                <Grid item xs={6} md={8}>
                    <Item>xs=6 md=8</Item>
                </Grid>
            </Grid>
        </Box>
    );
}

export {
    Dashboard
};