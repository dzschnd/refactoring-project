export const isServiceError = (value) => {
    return typeof value.error === "string";
};
