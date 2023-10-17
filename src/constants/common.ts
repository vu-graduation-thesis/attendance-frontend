export const STALE_TIME = {
  ONE_HOUR: 60 * 60 * 1000,
  FIVE_MINS: 5 * 60 * 1000,
};

export const CACHE_TIME = {
  ONE_HOUR: 60 * 60 * 1000,
};

export const LANGUAGES = {
  VI: "vi",
  EN: "en",
};

export const SORT_OPTIONS = {
  ASC: "asc",
  DESC: "desc",
} as const;

export const DEFAULT_PAGINATION = {
  CURRENT: 1,
  PAGE_SIZE: 10,
  TOTAL: 0,
};

export enum SortOrder {
  ASC = "ASC",
  DESC = "DESC",
}

export const DEFAULT_PAGE_SIZE = 10;
export const DEFAULT_CURRENT_PAGE_START_WITH_0 = 0;
export const DEFAULT_CURRENT_PAGE_START_WHITH_1 = 1;
export const DEFAULT_SORT_FIELD = "created_at";
export const DEFAULT_SORT_ORDER = SortOrder.DESC;

export const DELAY_TIME_DEBOUNCE = 500;

export const TZ = "Asia/Ho_Chi_Minh";

export const ADD_PREFIX = "ADD_";
