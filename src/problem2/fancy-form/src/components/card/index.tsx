/* eslint-disable @typescript-eslint/no-unused-vars */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useQueryCurrency } from "@/hooks/queryCurrency";
import { Currency } from "@/shared/interface";
import { validationSchema } from "@/shared/schema";
import { Formik } from "formik";
import React from "react";
import { CurrencySelect } from "../currencySelect";
import { SubmitSection } from "../submitSection";

const initialFormValues = {
  amount: 1,
  fromCurrency: '{"currency":"USD","price":1}',
  toCurrency: '{"currency":"STLUNA","price":0.44232210169491526}',
};

export function CardWithForm() {
  const { currencies } = useQueryCurrency();
  const [conversionState, setConversionState] = React.useState({
    convertedAmount: 0,
    amount: 0,
    fromCurrency: "",
    toCurrency: "",
  });

  const uniqueCurrencies = React.useMemo(
    () =>
      currencies?.reduce((acc: Currency[], current: Currency) => {
        const existingCurrencyIndex = acc.findIndex(
          (item) => item.currency === current.currency
        );
        if (existingCurrencyIndex !== -1) {
          if (
            new Date(current.date) > new Date(acc[existingCurrencyIndex].date)
          ) {
            acc[existingCurrencyIndex] = current;
          }
        } else {
          acc.push(current);
        }
        return acc;
      }, []),
    [currencies]
  );

  const handleSubmit = (
    values: {
      amount: number;
      fromCurrency: string;
      toCurrency: string;
    },
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    const fromCurrency = JSON.parse(values.fromCurrency);
    const toCurrency = JSON.parse(values.toCurrency);
    const convertedAmount =
      values.amount * (toCurrency.price / fromCurrency.price);

    setConversionState({
      convertedAmount,
      amount: values.amount,
      fromCurrency: fromCurrency.currency,
      toCurrency: toCurrency.currency,
    });

    setTimeout(() => {
      setSubmitting(false);
    }, 1000);
  };

  return (
    <Card className="w-[550px] shadow">
      <CardHeader>
        <CardTitle className="text-center">Currency swap</CardTitle>
      </CardHeader>
      <CardContent>
        <Formik
          initialValues={initialFormValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            handleChange,
            handleSubmit,
            setFieldValue,
            isSubmitting,
            touched,
            errors,
          }) => {
            return (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-3 items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="amount">Amount</Label>
                    <Input
                      onChange={handleChange}
                      value={values.amount}
                      id="amount"
                    />
                  </div>
                  <CurrencySelect
                    label="Amount to send"
                    id="from"
                    name="fromCurrency"
                    setFieldValue={setFieldValue}
                    currencies={uniqueCurrencies || []}
                    placeholder="USD"
                  />
                  <CurrencySelect
                    label="Amount to receive"
                    id="to"
                    name="toCurrency"
                    setFieldValue={setFieldValue}
                    currencies={uniqueCurrencies || []}
                    placeholder="STLUNA"
                  />
                </div>
                {touched.amount && errors.amount && (
                  <div className="text-red-500 mt-2">{errors.amount}</div>
                )}
                <SubmitSection
                  isSubmitting={isSubmitting}
                  conversionState={conversionState}
                />
              </form>
            );
          }}
        </Formik>
      </CardContent>
    </Card>
  );
}
