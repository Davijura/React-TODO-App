import { ReactElement } from 'react'
import { Box, Container, Grid, Typography } from '@mui/material'

export const Footer = (): ReactElement => {
    return (
        <Box
            sx={{
                width: '100%',
                height: 'auto',
                paddingTop: '1rem',
                paddingBottom: '1rem',
                marginTop: 'auto',
            }}
        >
            <Container maxWidth="lg">
                <Grid container direction="column" alignItems="center">
                    <Grid item xs={12}>
                        <Typography color="black" variant="h5">
                            React Starter App
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography color="textSecondary" variant="subtitle1">
                            {`${new Date().getFullYear()} | React | Material UI | React Router`}
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}
