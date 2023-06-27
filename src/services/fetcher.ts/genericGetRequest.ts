import { api } from "./api"

export const genericGetRequest = async (url: string, params?: string) => {
    const queryParams = new URLSearchParams(params);
    const fullUrl = !params ? `${api}/${url}` : `${api}/${url}?${queryParams}`;

    const response = await fetch(fullUrl);
    const data = await response.json()
    return data
};