interface IKurbyLegendColor {
  readonly fillColor: string;
  readonly fillOpacity: number;
  readonly strokeWeight: number;
}

interface IKurbyLegendColorDefault {
  readonly strokeWeight: number;
  readonly fillColor: string;
}

class KurbyMedianHomeValueLegend {
  static getHexColorByHomeValue(homeValue: number) {
    const isIncomeAvailable = Math.sign(homeValue) === 1;
    const valueString = homeValue.toString();

    const IS_1M_PLUS = isIncomeAvailable && valueString.length === 7 && valueString.startsWith("1");
    const IS_900K = isIncomeAvailable && valueString.length === 6 && valueString.startsWith("9");
    const IS_800K = isIncomeAvailable && valueString.length === 6 && valueString.startsWith("8");
    const IS_700K = isIncomeAvailable && valueString.length === 6 && valueString.startsWith("7");
    const IS_600K = isIncomeAvailable && valueString.length === 6 && valueString.startsWith("6");
    const IS_500K = isIncomeAvailable && valueString.length === 6 && valueString.startsWith("5");
    const IS_400K = isIncomeAvailable && valueString.length === 6 && valueString.startsWith("4");
    const IS_300K = isIncomeAvailable && valueString.length === 6 && valueString.startsWith("3");
    const IS_200K = isIncomeAvailable && valueString.length === 6 && valueString.startsWith("2");
    const IS_100K = isIncomeAvailable && valueString.length === 6 && valueString.startsWith("1");
    const IS_90K = isIncomeAvailable && valueString.length === 5 && valueString.startsWith("9");

    switch (true) {
      case IS_1M_PLUS:
        return "#5C00B2";
      case IS_900K:
        return "#4873AF";
      case IS_800K:
        return "#6FA7C7";
      case IS_700K:
        return "#ADD2E3";
      case IS_600K:
        return "#D6EAEF";
      case IS_500K:
        return "#F6F6B9";
      case IS_400K:
        return "#F4D589";
      case IS_300K:
        return "#F4D589";
      case IS_200K:
        return "#EE6941";
      case IS_100K:
        return "#D12F26";
      case IS_90K:
        return "#A30123";
      default:
        return "NO_COLOR";
    }
  }

  public getGoogleMapsColor(feature: google.maps.Data.Feature): IKurbyLegendColor | IKurbyLegendColorDefault {
    const homeValue = feature.getProperty("B25077_001E");

    const result = KurbyMedianHomeValueLegend.getHexColorByHomeValue(homeValue);
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

export function createMedianHomeValueLegend() {
  return new KurbyMedianHomeValueLegend();
}

export function getHomeValueColor(value: number) {
  return KurbyMedianHomeValueLegend.getHexColorByHomeValue(value);
}
