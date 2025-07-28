from bikesp import postgres

class BaseQuery():
    def __init__(self):
        self.joins = []
        self.select_parts = []
        self.group_by_parts = []
        self.where_parts = []
        self.params = []
        self.withs = []
        self.froms = []
        self.orderByGroups = True
        self.groupByParams = []
    
    def join_person(self):
        query = 'JOIN PERSON p ON t.idPerson = p.idPerson'
        if self.joins.count(query) > 0:
            return
        
        self.joins.append(query)
    
    def join_trip(self):
        query = 'JOIN TRIP t ON t.idTrip = l.idTrip'
        if self.joins.count(query) > 0:
            return
        
        self.joins.append(query)

    def build_query(self):
        self.froms.append(self.table)
        query_string = ''
        if len(self.withs) > 0:
            query_string = f"WITH {', '.join(self.withs)}"
        query_string += f"SELECT {', '.join(self.select_parts)} FROM {', '.join(self.froms)}"

        if self.joins:
            query_string += ' ' + '\n'.join(self.joins)

        if self.where_parts:
            query_string += ' WHERE ' + ' AND '.join(self.where_parts)
        
        if self.group_by_parts:
            query_string += ' GROUP BY ' + ', '.join(self.group_by_parts)
            if self.orderByGroups:
                query_string += ' ORDER BY ' + ', '.join(self.group_by_parts)

        query_string += ';'
        print(query_string)
        return query_string

    def execute(self):
        query_string = self.build_query()
        self.params.extend(self.groupByParams)
        try:
            cursor = postgres.get_cursor()
            cursor.execute(query_string, self.params)
            data = cursor.fetchall()
            cursor.close()
            return data
        except Exception as e:
            print(f"Error executing query: {e}")
            raise

class Filters(BaseQuery):
    def add_filter(self, column, operator, value):
        if operator.upper() == 'IN' and isinstance(value, (list, tuple)):
            placeholders = ', '.join(['%s'] * len(value))
            self.where_parts.append(f"{column} {operator} ({placeholders})")
            self.params.extend(value)
        else:
            self.where_parts.append(f"{column} {operator} %s")
            self.params.append(value)

    def filter_by_date_range(self, start_date, end_date, column='t.date'):
        self.where_parts.append(f"{column} BETWEEN %s AND %s")
        self.params.append(start_date)
        self.params.append(end_date)
    
    def filter_by_gender(self, genders: list):
        self.join_person()
        self.add_filter('p.gender', 'IN', genders)

    def filter_by_race(self, races: list):
        self.join_person()
        self.add_filter('p.race', 'IN', races)
    
    def filter_by_hour(self, min, max):
        self.where_parts.append('date::time BETWEEN %s AND %s')
        self.params.extend([min, max])
        
    def filter_by_day_of_week(self, week_days: list):
        self.add_filter('EXTRACT(DOW FROM date)', 'IN', week_days)

    def filter_by_payout_level(self, min = None, max = None):
        if min:
            self.add_filter('t.payoutLevel', '>=', min)
        if max:
            self.add_filter('t.payoutLevel', '<=', max)

MAX_LOCATIONS_RETURNED = 2500
METERS_PER_DEGREE = 110000
class Aggregations(BaseQuery):
    def aggregate_by_hours(self):
        self.select_parts.append('EXTRACT(HOUR FROM date) AS hour')
        self.group_by_parts.append('hour')
    
    def aggregate_by_payout_level(self):
        self.select_parts.append('t.payoutLevel AS payoutLevel')
        self.group_by_parts.append('payoutLevel')

    def aggregate_by_day_of_week(self):
        self.select_parts.append('EXTRACT(DOW FROM date) AS day_of_week')
        self.group_by_parts.append('day_of_week')
    
    def aggregate_by_month(self):
        self.select_parts.append('DATE_TRUNC(\'month\', date) AS month')
        self.group_by_parts.append('month')

    def aggregate_by_week(self):
        self.select_parts.append('DATE_TRUNC(\'week\', date) AS week')
        self.group_by_parts.append('week')
    
    def aggregate_by_gender(self):
        self.select_parts.append('p.gender AS gender')
        self.group_by_parts.append('gender')
        self.join_person()

    def aggregate_by_race(self):
        self.select_parts.append('p.race AS race')
        self.group_by_parts.append('race')
        self.join_person()

    def get_grid_deg(self, zoom_level):
        lat_cos = 1
        meters_per_pixel = 156543.03392 * lat_cos / 2**zoom_level
        cellMeters = 20*meters_per_pixel

        return (cellMeters / (111000 * lat_cos), cellMeters / 111000)
    def aggregate_by_location(self, zoom_level, lat, lng, max_distance):
        grid_deg_x, grid_deg_y = self.get_grid_deg(zoom_level)
        self.withs.append('''
            params AS (
                SELECT 
                ST_SetSRID(ST_MakePoint(%s, %s), 4326)::geometry AS center_geom
            )
            '''
        )
        self.froms.append('params pa')
        self.select_parts.append('ST_Y(ST_SnapToGrid(l.point_geom::geometry, 0, 0, %s, %s)) AS latitude')
        self.select_parts.append('ST_X(ST_SnapToGrid(l.point_geom::geometry, 0, 0, %s, %s)) AS longitude')
        self.where_parts.append(
            '''
            ST_DWithin(
              l.point_geom,
              pa.center_geom,
              %s
            )
            '''
        )
        self.group_by_parts.append('ST_SnapToGrid(l.point_geom::geometry, 0, 0, %s, %s)')
        params = [lng, lat] + [grid_deg_x, grid_deg_y]*2 + [max_distance]
        self.groupByParams.extend([grid_deg_x, grid_deg_y])
        self.params.extend(params)
        self.orderByGroups = False

class DataTypes(BaseQuery):
    def add_trip_count(self):
        self.select_parts.append('COUNT(*)')
        self.table = "TRIP t"

    def add_trip_duration(self):
        self.select_parts.append('AVG(t.duration) AS duration')
        self.table = "TRIP t"

    def add_trip_distance(self):
        self.select_parts.append('AVG(t.distance) AS distance')
        self.table = "TRIP t"
    
    def add_mean_speed(self):
        self.select_parts.append('AVG(t.meanSpeed) AS meanSpeed')
        self.table = "TRIP t"

    def add_point_count(self):
        self.select_parts.append('COUNT(*) AS point_count')
        self.table = "LOCATIONS l"

    def add_location_mean_speed(self):
        self.select_parts.append('AVG(l.mean_speed) AS mean_speed')
        self.table = "LOCATIONS l"

class Query(Filters, Aggregations, DataTypes):
    pass
