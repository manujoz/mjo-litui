export interface MjoAvatarClickEvent extends CustomEvent {
    detail: {
        value: string;
    };
}

export interface MjoAvatarErrorEvent extends CustomEvent {
    detail: {
        message: string;
    };
}
