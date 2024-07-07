type WalletBalance = {
  currency: string;
  amount: number;
};
// interface FormattedWalletBalance {
//   currency: string;
//   amount: number;
//   formatted: string;
// }

interface Props extends BoxProps {}

const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  // Prevent re-render multiple times
  const getPriority = useCallback((blockchain: any): number => {
    switch (blockchain) {
      case "Osmosis":
        return 100;
      case "Ethereum":
        return 50;
      case "Arbitrum":
        return 30;
      case "Zilliqa":
        return 20;
      case "Neo":
        return 20;
      default:
        return -99;
    }
  }, []);

  const sortedBalances = useMemo(() => {
    return balances
      .filter(
        (balance: WalletBalance) => lhsPriority > -99 && balance.amount <= 0
      )
      .sort(
        (lhs: WalletBalance, rhs: WalletBalance) =>
          getPriority(rhs.blockchain) - getPriority(lhs.blockchain)
      );
  }, [balances, prices]);

  // I have no idea why we need these lines ??
  //   const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
  //     return {
  //       ...balance,
  //       formatted: balance.amount.toFixed(),
  //     };
  //   });

  const rows = sortedBalances.map((balance: WalletBalance) => {
    //  const usdValue = prices[balance.currency] * balance.amount;
    //  return (
    //    <WalletRow
    //      className={classes.row}
    //      key={index}
    //      amount={balance.amount}
    //      usdValue={usdValue}
    //      formattedAmount={balance.formatted}
    //    />
    //  );

    const { row } = classes;
    const { currency, amount } = balance;
    const usdValue = prices[currency] * amount;
    // formatted didn't exist in balance so i made formattedAmount which WalletRow need
    const formattedAmount = amount.toFixed();

    return (
      <WalletRow
        className={row}
        // When you use index of an array as a key, React will optimize and not render as expected.
        // What happens in such a scenario can be explained with an example.
        // Suppose the parent component gets an array of 10 items and renders 10 components based on the array.
        // Suppose the 5th item is then removed from the array. On the next render the parent will receive an array of 9 items and so React will render 9 components.
        // This will show up as the 10th component getting removed, instead of the 5th, because React has no way of differentiating between the items based on index.
        // Therefore always use a unique identifier as a key for components that are rendered from an array of items.

        key={currency}
        amount={amount}
        usdValue={usdValue}
        formattedAmount={formattedAmount}
      />
    );
  });

  return <div {...rest}>{rows}</div>;
};
