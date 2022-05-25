import React, {FC} from "react";

// helpers
import {OptionForChart} from "src/utils/interfaces";

// styles
import {Box, Card, CardContent, Typography} from "@mui/material";

interface LocationForecastDateListProps {
    options: OptionForChart[];
    selectedIndex: number | null;
    onSelectDate: (index: number) => void;
}

const LocationForecastDateList: FC<LocationForecastDateListProps> = ({
    options,
    selectedIndex,
    onSelectDate
}) => {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "flex-start"
            }}
            mb={5}
        >
            {options.map((opt, index) => (
                <Box
                    key={opt.date}
                    mx={1}
                    sx={{
                        width: "100%",
                        height: 200
                    }}
                >
                    <Card
                        sx={{
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            cursor: "pointer",
                            backgroundColor: selectedIndex === index ? "#f3f3f3" : "",
                            boxShadow: selectedIndex === index ? 10 : 0,
                            ":hover": {
                                boxShadow: 10
                            }
                        }}
                        variant="outlined"
                        onClick={() => onSelectDate(index)}
                    >
                        <CardContent>
                            <Typography variant="h6" color="text.secondary" align="center" mb={1}>
                                <Box component="span" fontWeight="fontWeightBold">
                                    {opt.temperature}°C
                                </Box>
                            </Typography>
                            <Typography variant="body2" color="text.secondary" align="center">
                                {opt.weekDay}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" align="center">
                                {opt.date}
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
            ))}
        </Box>
    );
};

export default LocationForecastDateList;
