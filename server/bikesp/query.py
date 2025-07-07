from bikesp import postgres

class BaseQuery():
    def __init__(self):
        self.joins = []
        self.select_parts = []
        self.group_by_parts = []
        self.where_parts = []
        self.params = []
    
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
        query_string = f"SELECT {', '.join(self.select_parts)} FROM {self.table}"

        if self.joins:
            query_string += ' ' + '\n'.join(self.joins)

        if self.where_parts:
            query_string += ' WHERE ' + ' AND '.join(self.where_parts)
        
        if self.group_by_parts:
            query_string += ' GROUP BY ' + ', '.join(self.group_by_parts)
            query_string += ' ORDER BY ' + ', '.join(self.group_by_parts)

        query_string += ';'
        print(query_string)
        return query_string

    def execute(self):
        query_string = self.build_query()
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
            self.where_parts.append(f"{column} {operator} %s") # Use %s as placeholder
            self.params.append(value)

    def filter_by_date_range(self, start_date, end_date, column='t.date'):
        self.where_parts.append(f"{column} BETWEEN %s AND %s")
        self.params.append(start_date)
        self.params.append(end_date)
    
    def filter_by_gender(self, gender):
        self.join_person()
        self.add_filter('p.gender', '=', gender)

    def filter_by_race(self, race):
        self.join_person()
        self.add_filter('p.race', '=', race)
    
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

    def aggregate_by_location(self, zoom_level, lat, lng, max_distance):
        self.select_parts.append('ST_Y(ST_Centroid(ST_Collect(l.point_geom::geometry))) AS latitude')
        self.select_parts.append('ST_X(ST_Centroid(ST_Collect(l.point_geom::geometry))) AS longitude')
        self.select_parts.append('ST_GeoHash(l.point_geom, %s) AS geohash')
        self.group_by_parts.append('geohash')
        self.where_parts.append(
            '''
            ST_DWithin(
              l.point_geom,
              ST_SetSRID(ST_MakePoint(%s, %s), 4326)::geography,
              %s
            )
            '''
        )
        self.params.extend([zoom_level, lng, lat, max_distance])

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

class Query(Filters, Aggregations, DataTypes):
    pass