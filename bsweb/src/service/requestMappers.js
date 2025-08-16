function addDateFilterPayload(filters, payload) {
  const dateFilters = {}

  if (filters.date_from) dateFilters.date_from = filters.date_from;
  if (filters.date_to) dateFilters.date_to = filters.date_to;

  if (Object.keys(dateFilters).length > 0) {
    payload.date_filter = dateFilters;
  }
}

function addHourFilter(filters, payload) {
  const hourFilter = {}

  if (filters.from_hour) hourFilter.min = filters.from_hour;
  if (filters.to_hour) hourFilter.max = filters.to_hour;

  if (Object.keys(hourFilter).length > 0) {
    payload.hour_filter = hourFilter;
  }
}

function addPayoutLevelFilterPayload(filters, payload) {
  const payoutFilter = {}

  if (filters.min_payout !== undefined) payoutFilter.min = filters.min_payout;
  if (filters.max_payout !== undefined) payoutFilter.max = filters.max_payout;

  if (Object.keys(payoutFilter).length > 0) {
    payload.payout_filter = payoutFilter;
  }
}

function addFiltersPayload(filters, payload) {
  if (!filters) return {};

  const filterPayload = {};

  if (filters.genders) filterPayload.genders = filters.genders;
  if (filters.races) filterPayload.races = filters.races;
  if (filters.week_days) filterPayload.week_days = filters.week_days;

  addDateFilterPayload(filters, filterPayload);
  addPayoutLevelFilterPayload(filters, filterPayload);
  addHourFilter(filters, filterPayload)

  if (Object.keys(filterPayload).length > 0) {
    payload.filters = filterPayload;
  }

  return filterPayload;
}

export function buildFetchTripDataRequest(data) {
  if (data.aggregation === undefined || data.data_type === undefined) {
    throw new Error("Request missing required fields");
  }

  const payload = {
    aggregation: data.aggregation,
    data_type: data.data_type,
  };

  addFiltersPayload(data.filters, payload);

  return payload
}

export function buildFetchGeographicData(data) {
  const payload = {
    data_type: data.dataConfig.data_type,
    zoom_level: data.zoomLevel,
    center: data.mapCenter,
    max_distance: data.maxDistance,
  };

  addFiltersPayload(data.dataConfig.filters, payload);

  return payload
}