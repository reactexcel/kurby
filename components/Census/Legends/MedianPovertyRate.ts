interface IKurbyLegendColor {
  readonly fillColor: string;
  readonly fillOpacity: number;
  readonly strokeWeight: number;
}

interface IKurbyLegendColorDefault {
  readonly strokeWeight: number;
  readonly fillColor: string;
}

class KurbyMedianPovertyRate {
  static getHexColorByHomeValue(povertyRate: number) {
    const isValueAvailable = Math.sign(povertyRate) === 1;
    const valueString = povertyRate.toString();

    const IS_45_PLUS = isValueAvailable && valueString.length === 6 && valueString.startsWith("8");
    const IS_40 = isValueAvailable && valueString.length === 6 && valueString.startsWith("7");
    const IS_35 = isValueAvailable && valueString.length === 6 && valueString.startsWith("6");
    const IS_30 = isValueAvailable && valueString.length === 6 && valueString.startsWith("5");
    const IS_25 = isValueAvailable && valueString.length === 6 && valueString.startsWith("4");
    const IS_20 = isValueAvailable && valueString.length === 6 && valueString.startsWith("3");
    const IS_15 = isValueAvailable && valueString.length === 6 && valueString.startsWith("2");
    const IS_10 = isValueAvailable && valueString.length === 6 && valueString.startsWith("1");
    const IS_LESS_10 = isValueAvailable && valueString.length === 5 && valueString.startsWith("9");

    switch (true) {
      case IS_45_PLUS:
        return "#5C00B2";
      case IS_40:
        return "#4873AF";
      case IS_40:
        return "#ADD2E3";
      case IS_35:
        return "#D6EAEF";
      case IS_30:
        return "#F6F6B9";
      case IS_25:
        return "#F4D589";
      case IS_20:
        return "#F4D589";
      case IS_15:
        return "#EE6941";
      case IS_10:
        return "#D12F26";
      case IS_LESS_10:
        return "#A30123";
      default:
        return "NO_COLOR";
    }
  }

  public getGoogleMapsColor(feature: google.maps.Data.Feature): IKurbyLegendColor | IKurbyLegendColorDefault {
    const homeValue = feature.getProperty("B25077_001E");

    const result = KurbyMedianPovertyRate.getHexColorByHomeValue(homeValue);
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

export function createMedianPovertyRateLegend() {
  return new KurbyMedianPovertyRate();
}
