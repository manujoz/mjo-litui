import { MjoAlert } from "../mjo-alert";

export interface MjoAlertWillShowEvent extends CustomEvent {
    detail: {
        element: MjoAlert;
    };
}
export interface MjoAlertWillCloseEvent extends CustomEvent {
    detail: {
        element: MjoAlert;
    };
}
export interface MjoAlertClosedEvent extends CustomEvent {
    detail: {
        element: MjoAlert;
    };
}
export interface MjoAlertOpenedEvent extends CustomEvent {
    detail: {
        element: MjoAlert;
    };
}
