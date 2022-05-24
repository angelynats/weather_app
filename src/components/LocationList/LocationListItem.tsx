import React, {FC} from "react";

// helpers
import {
    capitalize,
    convertTempretureKelvinToC,
    convertUnixTimeToDate,
    convertUnixTimeToTime,
    getCountryNameByCode
} from "src/utils/helpers";
import {Coordinates, LocationId, Weather} from "src/utils/interfaces";
import openWeatherAPI from "src/api/openWeatherAPI";

// styles
import {Card, CardContent, CardHeader, CardMedia, IconButton, Typography, Box} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CachedIcon from "@mui/icons-material/Cached";
import InfoIcon from "@mui/icons-material/Info";

interface LocationListItemProps {
    location: Weather;
    onDeleteLocation: (id: LocationId) => void;
    onSelectLocation: (id: LocationId) => void;
    onUpdateLocation: (coord: Coordinates) => void;
}

const LocationListItem: FC<LocationListItemProps> = ({
    location,
    onDeleteLocation,
    onSelectLocation,
    onUpdateLocation
}) => {
    const {name, id, main, weather, dt, coord, sys} = location;
    const countryName = getCountryNameByCode(sys.country);

    return (
        <Box p={1} mx={"auto"} sx={{height: 380}}>
            <Card
                sx={{
                    width: 280,
                    position: "relative",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between"
                }}
                variant="outlined"
            >
                <CardHeader
                    action={
                        <>
                            <IconButton
                                type="button"
                                aria-label="delete"
                                onClick={() => onUpdateLocation(coord)}
                            >
                                <CachedIcon />
                            </IconButton>
                            <IconButton
                                type="button"
                                aria-label="delete"
                                onClick={() => onSelectLocation(id)}
                            >
                                <InfoIcon />
                            </IconButton>
                        </>
                    }
                    title={countryName ? `${name}, ${countryName}` : name}
                    subheader={`${convertUnixTimeToDate(dt)}, ${convertUnixTimeToTime(dt)}`}
                />
                <Box mx={"auto"} sx={{width: "68%"}}>
                    <CardMedia
                        component="img"
                        height="100"
                        image={openWeatherAPI.getIconUrl(weather[0].icon)}
                        alt={weather[0].main}
                    />
                </Box>
                <CardContent>
                    <Typography variant="body1" color="text.secondary">
                        <Box component="span" fontWeight="fontWeightBold">
                            {convertTempretureKelvinToC(main.temp)}°C
                        </Box>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        min: {convertTempretureKelvinToC(main.temp_min)}°C / max:{" "}
                        {convertTempretureKelvinToC(main.temp_max)}°C
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {capitalize(weather[0].description)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Humidity: {main.humidity}%
                    </Typography>
                </CardContent>
                <Box sx={{position: "absolute", right: 0, bottom: 0}} pb={1} pr={1}>
                    <IconButton
                        type="button"
                        aria-label="delete"
                        onClick={() => onDeleteLocation(id)}
                    >
                        <DeleteIcon />
                    </IconButton>
                </Box>
            </Card>
        </Box>
    );
};

export default LocationListItem;

export {LocationListItemProps};
