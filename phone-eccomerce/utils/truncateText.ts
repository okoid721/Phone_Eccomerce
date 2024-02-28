export const truncateText = (str: string) => {
    if(str.length <= 25) return str; // Return the original string if it's shorter than 25 characters
    return str.substring(0, 25) + '...';
}