/* eslint-disable camelcase */
import type { NextApiRequest, NextApiResponse } from "next";
import { createPropertySearchApi } from "./core/reapi/propertySearch";
import { BedsBathsContext, HomeFilterContext, MoreFilterContext, PriceContext, SaleContext } from "context/propertySearchContext";
import { DateTime } from "luxon";
import checkPlan from "./checkPlan";
import { rateLimiter } from "./rateLimiter";

interface IFilterSearchProps {
  readonly latitude: number;
  readonly longitude: number;
  readonly forSale: SaleContext["default"];
  readonly bedsFilter: BedsBathsContext["default"];
  readonly radius: number;
  readonly homeFilter: HomeFilterContext["default"];
  readonly priceFilter: PriceContext["default"];
  readonly moreFilter: MoreFilterContext["default"];
}

const filterHandler = (filters: IFilterSearchProps) => {
  const { forSale, bedsFilter, homeFilter, priceFilter, moreFilter } = filters;

  const parseHomeType = (property_type: IFilterSearchProps["homeFilter"]) => {
    const types = [];

    if (property_type.houses) types.push("SFR");
    if (property_type.multiFamily) types.push("MFR");
    if (property_type.lotsLands) types.push("LAND");
    if (property_type.condosCoOps) types.push("CONDO");
    if (property_type.mobile) types.push("MOBILE");
    return types.map((home) => ({ property_type: home }));
  };

  const now = DateTime.now();
  const oneYearAgo = now.minus({ years: 1 });
  const isPricingFilterOn = Boolean(priceFilter?.minimum || priceFilter?.maximum);

  let equityPercentMin = moreFilter?.equityPercentMin || 0;
  let equityPercentMax = moreFilter?.equityPercentMax || 0;
  let equityPercentMedian;

  if (equityPercentMin || equityPercentMax) {
    equityPercentMedian = (equityPercentMin + equityPercentMax) / 2;
    equityPercentMedian = Math.max(0, Math.min(100, equityPercentMedian)); // Ensure that the median is between 0 and 100
  } else {
    equityPercentMedian = null; // You can assign a default value here if needed
  }

  let estimatedEquityMin = moreFilter?.estimatedEquityMin || 0;
  let estimatedEquityMax = moreFilter?.estimatedEquityMax || 0;
  let estimatedEquityMedian;

  if (estimatedEquityMin || estimatedEquityMax) {
    estimatedEquityMedian = (estimatedEquityMin + estimatedEquityMax) / 2;
  } else {
    estimatedEquityMedian = null; // You can assign a default value here if needed
  }

  const filtersObject = {
    // For Sale Filter:
    mls_active: isPricingFilterOn || forSale?.forSaleByAgent,
    last_sale_date: forSale?.sold && oneYearAgo.toFormat("yyyy-MM-dd"),
    for_sale: !forSale?.forSaleByAgent ? forSale?.forSaleByOwner : false,
    mls_pending: forSale?.propertyStatusPending,
    mls_cancelled: forSale?.propertyStatusCancelled,
    // Price Filter
    mls_listing_price_min: priceFilter?.minimum,
    mls_listing_price_max: priceFilter?.maximum * (1 - 0.1),
    // Beds & Baths Filter
    beds_min: bedsFilter?.bedrooms,
    beds_max: 5,
    baths_min: bedsFilter?.bathrooms,
    baths_max: 4,

    // More Filter
    auction: moreFilter?.auction,
    pre_foreclosure: moreFilter?.preForeclosure,
    foreclosure: moreFilter?.foreclosure,
    // More Filter - Owner Information
    absentee_owner: moreFilter?.nonOwnerOccupied || moreFilter?.absenteeOwner,
    out_of_state_owner: moreFilter?.outOfStateAbsenteeOwner,
    in_state_owner: moreFilter?.inStateAbsenteeOwner,
    corporate_owned: moreFilter?.corporateOwned,
    investor_buyer: moreFilter?.investorBuyer,
    inherited: moreFilter?.inherited,
    death: moreFilter?.ownerDeath || moreFilter?.spousalDeath,
    // More Filter - Years Owned
    years_owned_min: moreFilter?.yearsOwnedMin,
    years_owned_max: moreFilter?.yearsOwnedMax,
    // More Filter - Financial Information
    cash_buyer: moreFilter?.cashBuyer,
    equity: moreFilter?.equity,
    high_equity: moreFilter?.highEquity,
    negative_equity: moreFilter?.negativeEquity,
    reo: moreFilter?.reo,
    private_lender: moreFilter?.privateLender,
    adjustable_rate: moreFilter?.adjustableRate,
    free_clear: moreFilter?.freeClear,
    // More Filter - Equity Percent
    equity_percent:
      moreFilter?.equityPercentMin && !moreFilter?.equityPercentMax
        ? moreFilter?.equityPercentMin
        : moreFilter?.equityPercentMax && !moreFilter?.equityPercentMin
        ? moreFilter?.equityPercentMax
        : equityPercentMedian,
    equity_percent_operator: moreFilter?.equityPercentMin || moreFilter?.equityPercentMax ? "gt" : null,
    // More Filter - Estimated Equity
    estimated_equity:
      moreFilter?.estimatedEquityMin && !moreFilter?.estimatedEquityMax
        ? moreFilter?.estimatedEquityMin
        : moreFilter?.estimatedEquityMax && !moreFilter?.estimatedEquityMin
        ? moreFilter?.estimatedEquityMax
        : estimatedEquityMedian,
    equity_operator: moreFilter?.estimatedEquityMin || moreFilter?.estimatedEquityMax ? "lt" : null,
    // More Filter - Estiamted Value
    value_min: moreFilter?.estimatedValueMin,
    value_max: moreFilter?.estimatedValueMax,
    // More Filter - Open Mortgage Balance
    mortgage_min: moreFilter?.openMortgageBalanceMin,
    mortgage_max: moreFilter?.openMortgageBalanceMax,
    document_type: moreFilter?.deedType,
    // More Filter - Loan Types
    loan_type_code_first: moreFilter?.loanType,
    // More Filter - Interest Rate
    portfolio_equity_min: moreFilter?.interestRateMin,
    portfolio_equity_max: moreFilter?.interestRateMax,
  };

  const trueFilters = Object.keys(filtersObject)
    // @ts-ignore
    .filter((key) => Boolean(filtersObject[key])) // Filtering keys with non-null and non-undefined values
    .reduce((acc, key) => {
      // @ts-ignore
      acc[key] = filtersObject[key]; // Adding keys with non-null and non-undefined values to the new object
      return acc;
    }, {});

  return {
    ...trueFilters,
    ...(forSale?.offMarket && {
      mls_active: false,
      mls_pending: false,
      mls_cancelled: false,
    }),
    // Home Type Filter:
    ...(homeFilter && { or: parseHomeType(homeFilter) }),
  };
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Add rate limiting middleware to block excesive traffic.
  if (!rateLimiter(req, res)) return;

  // Create new https://developer.realestateapi.com/reference/property-search-api wrapper instance:
  const propertySearchApi = createPropertySearchApi();

  // Check if the frontend is requesting a search criteria that should be fullfiled:
  const filters: IFilterSearchProps = req.body?.filters;

  if (filters) {
    const { latitude, longitude } = filters;
    const { isGrowth, isPro } = await checkPlan(req.body.userToken);

    if (!isGrowth && !isPro) {
      return res.status(401).send(
        JSON.stringify({
          error: "You are not allowed to create this request.",
        }),
      );
    }

    // Use pagination parameters or set default values:
    const size = req.body?.size ? Number(req.body?.size) : 25; // default is 25
    console.log(size);
    const resultIndex = req.body?.resultIndex ? Number(req.body?.resultIndex) : 0; // default is 0

    const response = await propertySearchApi.search({
      ...filterHandler(filters),
      latitude,
      longitude,
      size, // Using the size from body or default value
      resultIndex, // Using the resultIndex from body or default value
      radius: 10,
    });
    return res.status(200).json(response);
  }

  const response = await propertySearchApi.getPropertiesByAddress(req.body.address);
  return res.status(200).json(response);
}
