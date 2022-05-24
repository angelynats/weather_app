import React, {FC} from "react";

// components
import LocationList from "components/LocationList/LocationList";
import LocationSearch from "components/LocationSearch/LocationSearch";

// styles
import {Container, Typography} from "@mui/material";

const Home: FC = () => {
    return (
        <Container maxWidth="lg">
            <Typography variant="h5" component="h1" color="text.secondary" align="center" mt={3}>
                Weather App
            </Typography>
            <LocationSearch />
            <LocationList />
        </Container>
    );
};

export default Home;
