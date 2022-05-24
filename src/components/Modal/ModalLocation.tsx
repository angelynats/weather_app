import React, {FC, useContext} from "react";
import {ModalContext} from "src/utils/contexts";

// helpers
import {ModalLocationConfig} from "src/utils/interfaces";
import {getCountryNameByCode} from "src/utils/helpers";
import {MODAL_TIMEOUT} from "src/utils/constants";

// styles
import {Modal, Backdrop, Box, Fade, Typography, Button, Stack} from "@mui/material";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4
};

export const ModalLocation: FC<ModalLocationConfig> = ({location, fetchLocation}) => {
    const {closeModal, modalOpened} = useContext(ModalContext);
    const {name, country, lat, lon} = location || {};
    const countryName = getCountryNameByCode(country);

    const handleClose = () => {
        closeModal();
    };

    const handleFetchLocation = () => {
        closeModal();
        fetchLocation({lat, lon});
    };

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={modalOpened}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: MODAL_TIMEOUT
            }}
        >
            <Fade in={modalOpened} timeout={MODAL_TIMEOUT}>
                <Box sx={style}>
                    {location && (
                        <>
                            <Typography id="transition-modal-description" mb={2}>
                                Your current location is
                                <br />
                                <Box component="span" fontWeight="fontWeightBold">
                                    {countryName ? `${name}, ${countryName}` : name}
                                </Box>
                                .
                            </Typography>
                            <Typography id="transition-modal-description" mb={3}>
                                Want to add to favorites?
                            </Typography>
                            <Stack direction="row" justifyContent="space-around">
                                <Button
                                    type="button"
                                    variant="outlined"
                                    color="secondary"
                                    size="small"
                                    onClick={handleClose}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="button"
                                    variant="contained"
                                    color="secondary"
                                    size="small"
                                    onClick={handleFetchLocation}
                                >
                                    Yes
                                </Button>
                            </Stack>
                        </>
                    )}
                </Box>
            </Fade>
        </Modal>
    );
};

export default ModalLocation;
