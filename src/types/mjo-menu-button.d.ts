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

export interface MjoMenuButtonOpenEvent extends CustomEvent {
    detail: {
        isOpen: true;
    };
}

export interface MjoMenuButtonCloseEvent extends CustomEvent {
    detail: {
        isOpen: false;
    };
}

export interface MjoMenuButtonToggleEvent extends CustomEvent {
    detail: {
        isOpen: boolean;
    };
}
