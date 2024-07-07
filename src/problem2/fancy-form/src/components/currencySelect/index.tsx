import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Images } from "@/shared/constant";
import { Currency } from "@/shared/interface";
import React from "react";

type CurrencySelectProps = {
  label: string;
  id: string;
  name: string;
  setFieldValue: (field: string, value: string) => void;
  currencies: Currency[];
  placeholder: string;
};

export const CurrencySelect = ({
  label,
  id,
  name,
  setFieldValue,
  currencies,
  placeholder,
}: CurrencySelectProps) => {
  const sortedCurrencies = React.useMemo(() => {
    return currencies.sort((a, b) => a.currency.localeCompare(b.currency));
  }, [currencies]);

  const handleValueChange = React.useCallback(
    (value: string) => {
      setFieldValue(name, value);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [name]
  );

  return (
    <div className="flex flex-col space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Select name={name} onValueChange={handleValueChange}>
        <SelectTrigger id={id}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent position="popper">
          {sortedCurrencies.map(
            ({ currency, price }: Currency, index: number) => (
              <SelectItem
                key={`${currency}-${index}`}
                value={JSON.stringify({ currency, price })}
              >
                <div className="flex items-center">
                  <img
                    className="mr-2 h-4 w-4"
                    src={Images[currency.toUpperCase() as keyof typeof Images]}
                    alt={currency}
                  />
                  {currency}
                </div>
              </SelectItem>
            )
          )}
        </SelectContent>
      </Select>
    </div>
  );
};
