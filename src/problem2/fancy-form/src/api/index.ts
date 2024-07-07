const BASE_URL = 'https://interview.switcheo.com'


export const getCurrencies = async () => {
    try {
        const response = await fetch(`${BASE_URL}/prices.json`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        return data;
    } catch (error) {
        console.error("Failed to fetch prices:", error);
        throw error;
    }
};