interface IKurbyLegendColor {
  readonly fillColor: string;
  readonly fillOpacity: number;
  readonly strokeWeight: number;
}

interface IKurbyLegendColorDefault {
  readonly strokeWeight: number;
  readonly fillColor: string;
}

export const housingUnitsColorRepresentation = [
  "#A30123",
  "#D12F26",
  "#EE6941",
  "#EEAF72",
  "#F4D589",
  "#F6F6B9",
  "#D6EAEF",
  "#ADD2E3",
  "#6FA7C7",
  "#4873AF",
  "#2B368C",
  "purple",
];
class KurbyMedianVacantHousing {
  static getColorByUnitsRate(unitsRate: number) {
    const isValueAvailable = Math.sign(unitsRate) === 1;
    const valueString = unitsRate.toString();

    const IS_50_PLUS = (isValueAvailable && valueString.length === 2 && valueString.startsWith("5")) || unitsRate > 50;
    const IS_45 =
      (isValueAvailable && valueString.length === 2 && valueString.startsWith("45")) ||
      valueString.startsWith("46") ||
      valueString.startsWith("47") ||
      valueString.startsWith("48") ||
      valueString.startsWith("49");
    const IS_40 =
      (isValueAvailable && valueString.length === 2 && valueString.startsWith("4")) ||
      valueString.startsWith("41") ||
      valueString.startsWith("42") ||
      valueString.startsWith("43") ||
      valueString.startsWith("44");
    const IS_35 =
      (isValueAvailable && valueString.length === 2 && valueString.startsWith("35")) ||
      valueString.startsWith("36") ||
      valueString.startsWith("37") ||
      valueString.startsWith("38") ||
      valueString.startsWith("39");
    const IS_30 =
      (isValueAvailable && valueString.length === 2 && valueString.startsWith("3")) ||
      valueString.startsWith("31") ||
      valueString.startsWith("32") ||
      valueString.startsWith("33") ||
      valueString.startsWith("34");
    const IS_25 =
      (isValueAvailable && valueString.length === 2 && valueString.startsWith("25")) ||
      valueString.startsWith("26") ||
      valueString.startsWith("27") ||
      valueString.startsWith("28") ||
      valueString.startsWith("29");
    const IS_20 =
      (isValueAvailable && valueString.length === 2 && valueString.startsWith("2")) ||
      valueString.startsWith("21") ||
      valueString.startsWith("22") ||
      valueString.startsWith("23") ||
      valueString.startsWith("24");
    const IS_15 =
      (isValueAvailable && valueString.length === 2 && valueString.startsWith("15")) ||
      valueString.startsWith("16") ||
      valueString.startsWith("17") ||
      valueString.startsWith("18") ||
      valueString.startsWith("19");
    const IS_10 =
      (isValueAvailable && valueString.length === 2 && valueString.startsWith("1")) ||
      valueString.startsWith("11") ||
      valueString.startsWith("12") ||
      valueString.startsWith("13") ||
      valueString.startsWith("14");

    const IS_5 =
      (isValueAvailable && valueString.length === 1 && valueString.startsWith("5")) ||
      valueString.startsWith("6") ||
      valueString.startsWith("7") ||
      valueString.startsWith("8") ||
      valueString.startsWith("9");
    const IS_LESS_5 =
      (isValueAvailable && valueString.length === 1 && valueString.startsWith("4")) ||
      valueString.startsWith("3") ||
      valueString.startsWith("2") ||
      valueString.startsWith("1");

    switch (true) {
      case IS_50_PLUS:
        return housingUnitsColorRepresentation[10];
      case IS_45:
        return housingUnitsColorRepresentation[9];
      case IS_40:
        return housingUnitsColorRepresentation[8];
      case IS_35:
        return housingUnitsColorRepresentation[7];
      case IS_30:
        return housingUnitsColorRepresentation[6];
      case IS_25:
        return housingUnitsColorRepresentation[5];
      case IS_20:
        return housingUnitsColorRepresentation[4];
      case IS_15:
        return housingUnitsColorRepresentation[3];
      case IS_10:
        return housingUnitsColorRepresentation[2];
      case IS_5:
        return housingUnitsColorRepresentation[1];
      case IS_LESS_5:
        return housingUnitsColorRepresentation[0];
      default:
        return "NO_COLOR";
    }
  }

  public getGoogleMapsColor(feature: google.maps.Data.Feature): IKurbyLegendColor | IKurbyLegendColorDefault {
    const B25002_003E = feature.getProperty("B25002_003E");
    const B25002_001E = feature.getProperty("B25002_001E");
    const vacantUnits = getVacantHousingUnits({
      B25002_003E,
      B25002_001E,
    });
    const result = KurbyMedianVacantHousing.getColorByUnitsRate(vacantUnits);

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

export function createHousingUnitsLegend() {
  return new KurbyMedianVacantHousing();
}

interface IVacantHousingUnits {
  B25002_003E: number;
  B25002_001E: number;
}
export function getVacantHousingUnits({ B25002_003E, B25002_001E }: IVacantHousingUnits) {
  const convertToPercentage = (num: number) => Math.round(num * 100);
  return convertToPercentage(B25002_003E / B25002_001E);
}
