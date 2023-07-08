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
  static getHexColorByPovertyRate(povertyRate: number) {
    const isValueAvailable = Math.sign(povertyRate) === 1;
    const valueString = povertyRate.toString();

    const IS_45_PLUS = isValueAvailable && valueString.length === 2 && valueString.startsWith("5");
    const IS_40 = isValueAvailable && valueString.length === 2 && valueString.startsWith("4");
    const IS_35 = isValueAvailable && valueString.length === 2 && valueString.startsWith("35");
    const IS_30 = isValueAvailable && valueString.length === 2 && valueString.startsWith("3");
    const IS_25 = isValueAvailable && valueString.length === 2 && valueString.startsWith("25");
    const IS_20 = isValueAvailable && valueString.length === 2 && valueString.startsWith("2");
    const IS_15 = isValueAvailable && valueString.length === 2 && valueString.startsWith("15");
    const IS_10 = isValueAvailable && valueString.length === 2 && valueString.startsWith("1");
    const IS_LESS_10 = isValueAvailable && valueString.length === 1;

    switch (true) {
      case IS_45_PLUS:
        return "rgb(73, 0, 106)";
      case IS_40:
        return "rgb(122, 3, 119)";
      case IS_40:
        return "rgb(174, 3, 126)";
      case IS_35:
        return "rgb(221, 52, 151)";
      case IS_30:
        return "rgb(247, 104, 161)";
      case IS_25:
        return "rgb(250, 159, 181)";
      case IS_20:
        return "rgb(252, 197, 192)";
      case IS_15:
        return "rgb(252, 197, 194)";
      case IS_10:
        return "rgb(253, 224, 221)";
      case IS_LESS_10:
        return "rgb(255, 247, 243)";
      default:
        return "NO_COLOR";
    }
  }

  public getGoogleMapsColor(feature: google.maps.Data.Feature): IKurbyLegendColor | IKurbyLegendColorDefault {
    const C17002_001E = feature.getProperty("C17002_001E");
    const C17002_002E = feature.getProperty("C17002_002E");
    const C17002_003E = feature.getProperty("C17002_003E");

    const result = KurbyMedianPovertyRate.getHexColorByPovertyRate(
      getPercentUnderPoverty({
        C17002_001E,
        C17002_002E,
        C17002_003E,
      }),
    );
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

interface IGetPercentUnderPoverty {
  C17002_001E: number;
  C17002_002E: number;
  C17002_003E: number;
}
export function getPercentUnderPoverty({ C17002_001E, C17002_002E, C17002_003E }: IGetPercentUnderPoverty) {
  const convertToPercentage = (num: number) => Math.round(num * 100);
  return convertToPercentage((C17002_002E + C17002_003E) / C17002_001E);
}
