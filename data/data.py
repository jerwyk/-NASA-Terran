
import re
import random as rng

class point:
    def __init__(self, lng, lat):
        self.lng = lng
        self.lat = lat

    def toJson(self):
        return '{\n"lng": "' + self.lng + '",\n"lat": "' + self.lat + '"\n},\n'

points = []
chosen = []

lng = 0
lat = 0

p = re.compile(r'-?\d+\.\d+')

with open(r'C:\Users\12198\Desktop\work\nasa-terran\data\data.json') as openfileobject:
    for line in openfileobject:

        if 'lng' in line:
            m = p.search(line)
            if m != None:
                lng = m[0]
        elif 'lat' in line:
            m = p.search(line)
            if m != None:
                lat = m[0]

        if lng != 0 and lat!=0:
            points.append(point(lng,lat))
            lng = 0
            lat = 0

        if len(points) == 10:
            num = rng.randint(0,9)
            chosen.append(points[num])
            points = []

comp = open("comp.json", "w+")
for p in chosen:
    comp.write(p.toJson())