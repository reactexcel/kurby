interface IKurbyLegendColor {
  readonly fillColor: string;
  readonly fillOpacity: number;
  readonly strokeWeight: number;
}

interface IKurbyLegendColorDefault {
  readonly strokeWeight: number;
  readonly fillColor: string;
}

class KurbyMedianHouseholdIncomeLegend {
  static getHexColorByIncome(income: number) {
    const isIncomeAvailable = Math.sign(income) === 1;
    const incomeString = income.toString();

    const IS_200K_PLUS = isIncomeAvailable && incomeString.length > 6;
    const IS_200K = isIncomeAvailable && incomeString.length === 6 && incomeString.startsWith("2");
    const IS_120K = isIncomeAvailable && incomeString.length === 6 && incomeString.startsWith("12");
    const IS_100K = isIncomeAvailable && incomeString.length === 6 && incomeString.startsWith("1");
    const IS_90K = isIncomeAvailable && incomeString.length === 5 && incomeString.startsWith("9");
    const IS_80K = isIncomeAvailable && incomeString.length === 5 && incomeString.startsWith("8");
    const IS_70K = isIncomeAvailable && incomeString.length === 5 && incomeString.startsWith("7");
    const IS_60K = isIncomeAvailable && incomeString.length === 5 && incomeString.startsWith("6");
    const IS_50K = isIncomeAvailable && incomeString.length === 5 && incomeString.startsWith("5");
    const IS_40K = isIncomeAvailable && incomeString.length === 5 && incomeString.startsWith("4");
    const IS_30K = isIncomeAvailable && incomeString.length === 5 && incomeString.startsWith("3");
    const IS_20K = isIncomeAvailable && incomeString.length === 5 && incomeString.startsWith("2");
    const IS_10K = isIncomeAvailable && incomeString.length === 5 && incomeString.startsWith("1");
    const IS_0K = isIncomeAvailable && incomeString.length === 4;

    switch (true) {
      case IS_200K_PLUS:
        return "#5C00B2";
      case IS_200K:
        return "purple";
      case IS_120K:
        return "#2B368C";
      case IS_100K:
        return "#2B368C";
      case IS_90K:
        return "#4873AF";
      case IS_80K:
        return "#6FA7C7";
      case IS_70K:
        return "#ADD2E3";
      case IS_60K:
        return "#D6EAEF";
      case IS_50K:
        return "#F6F6B9";
      case IS_40K:
        return "#F4D589";
      case IS_30K:
        return "#F4D589";
      case IS_20K:
        return "#EE6941";
      case IS_10K:
        return "#D12F26";
      case IS_0K:
        return "#A30123";
      default:
        return "NO_COLOR";
    }
  }

  public getGoogleMapsColor(feature: google.maps.Data.Feature): IKurbyLegendColor | IKurbyLegendColorDefault {
    const income = feature.getProperty("B19013_001E");

    const result = KurbyMedianHouseholdIncomeLegend.getHexColorByIncome(income);
    if (result === "NO_COLOR") {
      return {
        strokeWeight: 0,
        fillColor: "rgb(255, 255, 255, 0)",
      };
    }
    return {
      fillColor: result,
      fillOpacity: 0.75,
      strokeWeight: 0.45,
    };
  }
}

export function createMedianHouseholdIncomeLegend() {
  return new KurbyMedianHouseholdIncomeLegend();
}
