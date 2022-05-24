import React, {useState} from "react";

// components
import {ModalContext} from "./ModalContext";
import ModalLocation from "components/Modal/ModalLocation";

// helpers
import {ModalLocationConfig} from "src/utils/interfaces";

export const ModalProvider = ({children}) => {
    const [modalOpened, setModalOpened] = useState(false);
    const [modalContent, setModalContent] = useState(null);

    const openModal = (modalConfig: ModalLocationConfig) => {
        setModalContent(modalConfig);
        setModalOpened(true);
    };

    const closeModal = () => {
        setModalOpened(false);
    };

    const valueModalProvider = {
        modalOpened,
        openModal,
        closeModal
    };

    return (
        <ModalContext.Provider value={valueModalProvider}>
            <ModalLocation {...modalContent} />
            {children}
        </ModalContext.Provider>
    );
};
