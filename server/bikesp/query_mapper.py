import array
from functools import wraps
from bikesp import query
import inspect

def operation_adder(field_name):
    def decorator(func):
        @wraps(func)
        def wrapper(query: query.Query, request: dict, *args, **kwargs):
            field_value = request.get(field_name)

            if field_value is None:
                return
            
            operation_map = func(query)

            operation_function = operation_map.get(field_value)
            if operation_function:
                operation_function()
        return wrapper
    return decorator

@operation_adder('aggregation')
def add_query_aggregation_operations(q: query.Query):
    return {
        'WEEK': q.aggregate_by_week,
        'HOUR': q.aggregate_by_hours,
        'DAY_OF_WEEK': q.aggregate_by_day_of_week,
        'GENDER': q.aggregate_by_gender,
        'RACE': q.aggregate_by_race,
        'PAYOUT_LEVEL': q.aggregate_by_payout_level,
        'REMUNERATION': q.aggregate_by_remuneration
    }

@operation_adder('data_type')
def add_query_data_type(q: query.Query):
    return {
        'TRIP_COUNT': q.add_trip_count,
        'TRIP_DURATION': q.add_trip_duration,
        'TRIP_DISTANCE': q.add_trip_distance,
        'MEAN_SPEED': q.add_mean_speed
    }

@operation_adder('data_type')
def add_location_data_type(q: query.Query):
    return {
        'TOTAL_SAMPLES': q.add_point_count,
        'SAMPLE_MEAN_SPEED': q.add_location_mean_speed,
        'TOTAL_TRIPS': q.add_total_trips_in_point
    }

def cancel_if_none(arg_name):
    """
    Decorator to cancel function execution if the named argument is None.
    """
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            sig = inspect.signature(func)
            bound_args = sig.bind(*args, **kwargs)
            bound_args.apply_defaults()

            if bound_args.arguments.get(arg_name) is None:
                return

            return func(*args, **kwargs)
        return wrapper
    return decorator

@cancel_if_none('filter')
def add_date_filter(q: query.Query, filter: dict):
    q.filter_by_date_range(filter['date_from'], filter['date_to'])

@cancel_if_none('genders')
def add_gender_filter(q: query.Query, genders: list):
    q.filter_by_gender(genders)

@cancel_if_none('races')
def add_race_filter(q: query.Query, races: list):
    q.filter_by_race(races)

@cancel_if_none('payout_level')
def add_payout_level_filter(q: query.Query, payout_level: dict):
    q.filter_by_payout_level(payout_level.get('min'), payout_level.get('max'))

@cancel_if_none('days_of_week')
def add_day_of_week_filter(q: query.Query, days_of_week: list):
    q.filter_by_day_of_week(days_of_week)

@cancel_if_none('hours')
def add_hour_filter(q: query.Query, hours: dict):
    q.filter_by_hour(hours.get('min'), hours.get('max'))

@cancel_if_none('filters')
def add_filters(q: query.Query, filters: dict):
    add_date_filter(q, filters.get('date_filter'))
    add_race_filter(q, filters.get('races'))
    add_gender_filter(q, filters.get('genders'))
    add_payout_level_filter(q, filters.get('payout_filter'))
    add_day_of_week_filter(q, filters.get('week_days'))
    add_hour_filter(q, filters.get('hour_filter'))

def create_query(request: dict):
    q = query.Query()
    add_query_data_type(q, request)
    add_query_aggregation_operations(q, request)
    add_filters(q, request.get('filters'))
    return q

def create_geo_query(request: dict):
    q = query.Query()
    center = request.get('center')
    q.aggregate_by_location(
        request.get('zoom_level'), 
        center.get('lat'), 
        center.get('lng'), 
        request.get('max_distance')
    )
    if request.get('filters'):
        q.join_trip()
        add_filters(q, request.get('filters'))
    add_location_data_type(q, request)
    return q