import React, {FC} from "react";
import {Link} from "react-router-dom";

// styles
import {Typography, AppBar, Toolbar, Container} from "@mui/material";

const Header: FC = () => {
    return (
        <AppBar position="static" color="secondary">
            <Container maxWidth="lg">
                <Toolbar>
                    <Link to="/" style={{textDecoration: "none"}}>
                        <Typography variant="h6" color="white">
                            Home
                        </Typography>
                    </Link>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;
