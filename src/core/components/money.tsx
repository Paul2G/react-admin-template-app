import type { Money } from "~/core/types/misc";

export function Money({ money, showCurrencyCode }: MoneyProps) {
  const { amount, currencyCode = "USD" } = money;

  return (
    <span>
      {`$${amount.toFixed(2)}${showCurrencyCode ? currencyCode : ""}`}
    </span>
  );
}

type MoneyProps = {
  money: Money;
  showCurrencyCode?: boolean;
};
