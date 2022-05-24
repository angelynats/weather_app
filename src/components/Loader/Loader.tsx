import React, {FC} from "react";

// helpers
import {TailSpin} from "react-loader-spinner";

// styles
import styles from "./loader.scss";

const Loader: FC = () => (
    <TailSpin color="#3f51b5" height={100} width={100} wrapperClass={styles.loader} />
);

export default Loader;
