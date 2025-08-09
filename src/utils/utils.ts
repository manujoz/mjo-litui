export const pause = async (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};
