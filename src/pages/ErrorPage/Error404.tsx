import React, {FC} from "react";
import {Link} from "react-router-dom";

// styles
import {Button, Grid, Typography} from "@mui/material";

const Error404: FC = () => {
    return (
        <Grid
            container
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            style={{height: "calc(100vh - 80px)"}}
            pb={8}
        >
            <Typography variant="h4" component="h1" color="text.secondary" mb={1}>
                Error 404
            </Typography>
            <Typography variant="h6" color="text.secondary" mb={4}>
                Oops! Page not found.
            </Typography>
            <Link to="/" style={{textDecoration: "none"}}>
                <Button type="button" variant="outlined" color="secondary" size="small">
                    Back to Home
                </Button>
            </Link>
        </Grid>
    );
};

export default Error404;
