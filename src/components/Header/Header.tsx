import React, {FC} from "react";
import {useLocation, Link} from "react-router-dom";

// helpers
import {useAppDispatch} from "src/utils/hooks";
import {getLocationsFromStorage} from "src/utils/helpers";

// redux
import {fetchCurrentWeatherMultiple} from "src/redux/actions/fetchCurrentWeatherMultiple";

// styles
import {Typography, AppBar, Toolbar, Container, IconButton, Tooltip} from "@mui/material";
import CachedIcon from "@mui/icons-material/Cached";

const Header: FC = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const {pathname} = location;

    const updateLocations = () => {
        const locationsFromStorage = getLocationsFromStorage();
        if (locationsFromStorage.length) {
            dispatch(fetchCurrentWeatherMultiple(locationsFromStorage));
        }
    };
    return (
        <AppBar position="static" color="secondary">
            <Container maxWidth="lg">
                <Toolbar>
                    <Link to="/" style={{textDecoration: "none", flexGrow: 1}}>
                        <Typography variant="h6" color="white">
                            Home
                        </Typography>
                    </Link>
                    {pathname === "/" && (
                        <Tooltip title="Refresh all">
                            <IconButton
                                type="button"
                                aria-label="refresh-all"
                                sx={{
                                    color: "white"
                                }}
                                onClick={updateLocations}
                            >
                                <CachedIcon />
                            </IconButton>
                        </Tooltip>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;
