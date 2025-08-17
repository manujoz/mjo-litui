export type MjoButtonEffect =
    | "cross"
    | "wink"
    | "wink-reverse"
    | "bounce"
    | "rotate"
    | "rotate-reverse"
    | "push"
    | "push-reverse"
    | "async"
    | "async-reverse"
    | "spin"
    | "spin-reverse";

export interface MjoButtonOpenEvent extends CustomEvent {
    detail: {
        isOpen: true;
    };
}

export interface MjoButtonCloseEvent extends CustomEvent {
    detail: {
        isOpen: false;
    };
}

export interface MjoButtonToggleEvent extends CustomEvent {
    detail: {
        isOpen: boolean;
    };
}
