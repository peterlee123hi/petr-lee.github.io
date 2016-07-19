#include <algorithm>
#include <cstdio>
#include <cmath>
using namespace std; 
const int INF = 1<<29;
const double EPS = 1e-9;
const double PI = acos(-1.0);
inline bool EQ(double a, double b) { return fabs(a-b) < EPS; }
inline double DEG_to_RAD(double d) { return d * PI / 180.0; }
inline double RAD_to_DEG(double r) { return r * 180.0 / PI; }

// BEGIN POINT LIBRARY

struct point_i {
    int x, y;
    point_i() {
        x = y = 0;
    }
    point_i(int _x, int _y) : x(_x), y(_y) {}
};

struct point {
    double x, y;
    point() {
        x = y = 0.0;
    }
    point(double _x, double _y) : x(_x), y(_y) {}
    const bool operator < (point o) {
        if(!EQ(x, o.x))
            return x < o.x;
        return y < o.y;
    }
    const bool operator == (point o) {
        return EQ(x, o.x) && EQ(y, o.y);
    }
};

// END POINT LIBRARY

// returns 0 = inside, 1 = on perimeter, 2 = outside
int insideCircle(point_i p, point_i c, int r) {
    int dx = p.x - c.x, dy = p.y - c.y;
    int Euc = dx * dx + dy * dy, rSq = r * r;             // all integer
    return Euc < rSq ? 0 : Euc == rSq ? 1 : 2;
}

bool circle2PtsRad(point p1, pointp2, double r, point &c) {
    double d2 = (p1.x - p2.x) * (p1.x - p2.x) + 
              (p1.y - p2.y) * (p1.y - p2.y);
    double det = r * r / d2 - 0.25;
    if(det < 0.0)
        return false;
    double h = sqrt(det);
    c.x = (p1.x + p2.x) * 0.5 + (p1.y - p2.y) * h;
    c.y = (p1.y + p2.y) * 0.5 + (p2.x - p1.x) * h;
    return true;
}
