import { Button } from "../ui/button";
import Spinner from "../ui/spinner";

type SubmitSectionProps = {
  isSubmitting: boolean;
  conversionState: {
    convertedAmount: number;
    amount: number;
    fromCurrency: string;
    toCurrency: string;
  };
};

export const SubmitSection = ({
  isSubmitting,
  conversionState,
}: SubmitSectionProps) => (
  <div className="mt-3 flex items-center justify-between">
    <Button type="submit">{isSubmitting ? <Spinner /> : "Confirm"}</Button>
    {!isSubmitting && conversionState.convertedAmount > 0 && (
      <p>
        {`${conversionState.amount} ${conversionState.fromCurrency} = ${conversionState.convertedAmount} ${conversionState.toCurrency}`}
      </p>
    )}
  </div>
);
