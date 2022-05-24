import {createContext} from "react";

// helpers
import {ModalLocationConfig} from "src/utils/interfaces";

interface IModalContext {
    modalOpened: boolean;
    openModal: (modalConfig: ModalLocationConfig) => void;
    closeModal: () => void;
}

const initialValue = {
    modalOpened: false,
    openModal: () => null,
    closeModal: () => null
};

export const ModalContext = createContext<IModalContext>(initialValue);

export type ModalContextType = typeof initialValue;
