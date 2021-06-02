//import { stringify } from "querystring";

export const capitalizeString = (s: string) => {
    return s.charAt(0).toUpperCase()+s.slice(1);
}

export const capitalizeEachWordInString = (s: string) => {
    let splitString = s.split(' ');
    let capitalizedSplit = splitString.map((item, idx) => capitalizeString(item));
    return capitalizedSplit.join(' ');
}