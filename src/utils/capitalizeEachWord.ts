
export const capitalizeStringWords = (string: string) => {
    const words = string.split(" ");

    const capitalized = words.map((word) => {
        return word[0].toUpperCase() + word.substring(1);
    }).join(" ");

    return capitalized;
}