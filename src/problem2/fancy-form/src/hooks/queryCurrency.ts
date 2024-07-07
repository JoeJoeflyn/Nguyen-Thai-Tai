
import { getCurrencies } from '@/api';
import { Currency } from '@/shared/interface';
import { useQuery } from '@tanstack/react-query';


export const useQueryCurrency = () => {

    const { data: currencies } = useQuery<Currency[]>({
        queryKey: ["currencies"],
        queryFn: getCurrencies,
    });


    return {
        currencies
    };
};