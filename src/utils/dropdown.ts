import { type DropdowContainer } from "../mixins/dropdow-container";

export const getTopInTopPosition = ({ dropDown, container }: { dropDown: DropdowContainer; container: HTMLElement }): number => {
    const top = container.getBoundingClientRect().top + window.scrollY - dropDown.offsetHeight - 5;

    if (top < window.scrollY) {
        return getTopInBottomPosition({ dropDown, container });
    }

    return top;
};
export const getTopInBottomPosition = ({ dropDown, container }: { dropDown: DropdowContainer; container: HTMLElement }): number => {
    const top = container.getBoundingClientRect().top + window.scrollY + container.offsetHeight + 5;

    if (top + dropDown.offsetHeight > window.innerHeight + window.scrollY) {
        return getTopInTopPosition({ dropDown, container });
    }

    return top;
};
export const getTopInMiddlePosition = ({ dropDown, container }: { dropDown: DropdowContainer; container: HTMLElement }): number => {
    const top = container.getBoundingClientRect().top + window.scrollY + container.offsetHeight / 2 - dropDown.offsetHeight / 2;

    if (top < window.scrollY) {
        return 0;
    }

    if (top + dropDown.offsetHeight > window.innerHeight + window.scrollY) {
        return window.innerHeight + window.scrollY - dropDown.offsetHeight;
    }

    return top;
};
export const getLeftInLeftPosition = ({ dropDown, container }: { dropDown: DropdowContainer; container: HTMLElement }): number => {
    const left = container.getBoundingClientRect().left + window.scrollX - dropDown.offsetWidth - 5;

    if (left < window.scrollX) {
        return getLeftInRightPosition({ dropDown, container });
    }

    return left;
};
export const getLeftInCenterPOsition = ({ dropDown, container }: { dropDown: DropdowContainer; container: HTMLElement }): number => {
    const left = container.getBoundingClientRect().left + window.scrollX + container.offsetWidth / 2 - dropDown.offsetWidth / 2;

    if (left < window.scrollX) {
        return 0;
    }

    if (left + dropDown.offsetWidth > window.innerWidth + window.scrollX) {
        return window.innerWidth - dropDown.offsetWidth;
    }

    return left;
};
export const getLeftInRightPosition = ({ dropDown, container }: { dropDown: DropdowContainer; container: HTMLElement }): number => {
    const left = container.getBoundingClientRect().left + window.scrollX + container.offsetWidth + 5;

    if (left + dropDown.offsetWidth > window.innerWidth + window.scrollX) {
        return getLeftInLeftPosition({ dropDown, container });
    }

    return left;
};
