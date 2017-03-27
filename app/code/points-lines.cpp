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

// POINTS

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

double dist(point p1, point p2) {
    return hypot(p1.x - p2.x, p1.y - p2.y);
}

// rotate p by theta degrees counter-clockwise about the origin
point rotate(point p, double theta) {
    double rad = DEG_to_RAD(theta);
    return point(p.x * cos(rad) - p.y * sin(rad),
                 p.x * sin(rad) + p.y * cos(rad));
}

// LINES

struct line {
    double a, b, c;
    line() {
        a = b = c = 0;
    }
    line(double _a, double _b, double _c) :
        a(_a), b(_b), c(_c) {}
};

void pointsToLine(point p1, point p2, line &l) {
    if(EQ(p1.x, p2.x)) {
        l.a = 1.0;
        l.b = 0.0;
        l.c = -p1.x;
    } else {
        l.a = -(double)(p1.y - p2.y) / (p1.x - p2.x);
        l.b = 1.0;
        l.c = -(double)(l.a * p1.x) - p1.y;
    }
}

bool areParallel(line l1, line l2) {
    return EQ(l1.a, l2.a) && EQ(l1.b, l2.b);
}

bool areSame(line l1, line l2) {
    return areParallel(l1, l2) && EQ(l1.c, l2.c);
}

bool areIntersect(line l1, line l2, point &p) {
    if(areParallel(l1, l2))
        return false;
    p.x = (l2.b * l1.c - l1.b * l2.c) / (l2.a * l1.b - l1.a * l2.b);
    if(fabs(l1.b) > EPS)
        p.y = -(l1.a * p.x + l1.c);
    else
        p.y = -(l2.a * p.x + l2.c);
    return true;
}

struct vec {
    double x, y;
    vec(double _x, double _y) :
        x(_x), y(_y) {}
};

vec toVec(point a, point b) {
    return vec(b.x - a.x, b.y - a.y);
}

vec scale(vec v, double s) {
    return vec(v.x * s, v.y * s);
}

point translate(point p, vec v) {
    return point(p.x + v.x, p.y + v.y);
}

void pointSlopeToLine(point p, double m, line &l) {
    l.a = -m;
    l.b = 1;
    l.c = -((l.a * p.x) + (l.b * p.y));
} 

void closestPoint(line l, point p, point &ans) {
    line perpendicular;
    if(fabs(l.b) < EPS) {
        ans.x = -(l.c);
        ans.y = p.y;
        return; 
    }

    if(fabs(l.a) < EPS) {
        ans.x = p.x;
        ans.y = -(l.c);
        return;
    }

    pointSlopeToLine(p, 1 / l.a, perpendicular);
    areIntersect(l, perpendicular, ans);
}

void reflectionPoint(line l, point p, point &ans) {
    point b;
    closestPoint(l, p, b);
    vec v = toVec(p, b);
    ans = translate(translate(p, v), v);
}

double dot(vec a, vec b) {
    return (a.x * b.x + a.y * b.y);
}

double norm_sq(vec v) {
    return v.x * v.x + v.y * v.y;
}

double distToLine(point p, point a, point b, point &c) {
    vec ap = toVec(a, p), ab = toVec(a, b);
    double u = dot(ap, ab) / norm_sq(ab);
    c = translate(a, scale(ab, u));
    return dist(p, c);
}

double distToLineSegment(point p, point a, point b, point &c) {
    vec ap = toVec(a, p), ab = toVec(a, b);
    double u = dot(ap, ab) / norm_sq(ab);
    if(u < 0.0) {
        c = point(a.x, a.y);
        return dist(p, a);
    }
    if(u > 1.0) {
        c = point(b.x, b.y);
        return dist(p, b);
    }
    return distToLine(p, a, b, c);
}

double angle(point a, point o, point b) {
    vec oa = toVec(o, a),
        ob = toVec(o, b);
    return acos(dot(oa, ob) / sqrt(norm_sq(oa) * norm_sq(ob)));
}

double cross(vec a, vec b) {
    return a.x * b.y - a.y * b.x;
}

// returns true if point r is on the left of line pq
bool ccw(point p, point q, point r) {
    return cross(toVec(p, q), toVec(p, r)) > 0;
}

bool collinear(point p, point q, point r) {
    return fabs(cross(toVec(p, q), toVec(p, r))) < EPS;
}
