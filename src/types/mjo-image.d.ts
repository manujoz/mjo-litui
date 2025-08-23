export type MjoImageFit = "contain" | "cover" | "fill" | "none" | "scale-down";

export interface MjoImageLoadEvent extends CustomEvent {
    detail: {
        element: MjoImage;
        src: string;
        naturalWidth: number;
        naturalHeight: number;
    };
}

export interface MjoImageErrorEvent extends CustomEvent {
    detail: {
        element: MjoImage;
        src: string;
        error: string;
    };
}

export interface MjoImageClickEvent extends CustomEvent {
    detail: {
        element: MjoImage;
        src: string;
    };
}

export interface MjoImage {
    src: string;
    alt?: string;
    fit: MjoImageFit;
    loading?: boolean;
    clickable?: boolean;
    disabled?: boolean;
    lazy?: boolean;
    ariaLabel?: string;
    ariaLabelledBy?: string;
    ariaDescribedBy?: string;
}
