#include <algorithm>
#include <cstdio>
#include <cmath>
#include <stack>
#include <vector>
using namespace std;
#define rep(i,a,b) for(int i=a;i<b;i++)
#define sz(x) ((int)(x).size())
#define pb push_back
const int INF = 1<<29;
const double EPS = 1e-9;
const double PI = acos(-1.0);
inline bool EQ(double a, double b) { return fabs(a-b) < EPS; }
inline double DEG_to_RAD(double d) { return d * PI / 180.0; }
inline double RAD_to_DEG(double r) { return r * 180.0 / PI; }

// BEGIN POINT/VECTOR LIBRARY

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

struct vec {
    double x, y;
    vec(double _x, double _y) :
        x(_x), y(_y) {}
};

vec toVec(point a, point b) {
    return vec(b.x - a.x, b.y - a.y);
}

// END POINT/VECTOR LIBRARY

double perimeter(const vector<point> &P) {
    double result = 0.0;
    rep(i, 0, sz(P)-1)
        result += dist(P[i], P[i+1]);
    return result;
}

double area(const vector<point> &P) {
    double result = 0.0, x1, y1, x2, y2;
    rep(i, 0, sz(P)-1) {
        x1 = P[i].x; x2 = P[i+1].x;
        y1 = P[i].y; y2 = P[i+1].y;
        result += (x1 * y2 - x2 * y1);
    }
    return fabs(result) / 2.0;
}

// BEGIN GEOMETRY UTILS

double dot(vec a, vec b) {
    return (a.x * b.x + a.y * b.y);
}

double norm_sq(vec v) {
    return v.x * v.x + v.y * v.y;
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

// END GEOMETRY UTILS

bool isConvex(const vector<point> &P) {
    if(sz(P) <= 3)
        return false;
    bool isLeft = ccw(P[0], P[1], P[2]);
    rep(i, 1, sz(P)-1)
        if(ccw(P[i], P[i+1], P[(i+2) == sz ? 1: i + 2]))
            return false;
    return true;
}

bool inPolygon(point pt, const vector<point> &P) {
    if(sz(P) == 0)
        return false;
    double sum = 0;
    rep(i, 0, sz(P)-1) {
        if(ccw(pt, P[i], P[i+1]))
            sum += angle(P[i], pt, P[i+1]);
        else
            sum -= angle(P[i], pt, P[i+1]);
    }
    return fabs(fabs(sum - 2 * PI)) < EPS;
}

point lineIntersectSeg(point p, point q, point A, point B) {
    double a = B.y - A.y;
    double b = A.x - B.x;
    double c = B.x * A.y - A.x * B.y;
    double u = fabs(a * p.x + b * p.y + c);
    double v = fabs(a * q.x + b * q.y + c);
    return point((p.x * v + q.x * u) / (u+v), (p.y * v + q.y * u) / (u+v));
}

vector<point> cutPolygon(point a, point b, const vector<point> &Q) {
    rep(i, 0, sz(Q)) {
        double left1 = cross(toVec(a, b), toVec(a, Q[i])), left2 = 0;
        if(i != (int)Q.size()-1)
            left2 = cross(toVec(a, b), toVec(a, Q[i+1]));
        if (left1 > -EPS)
            P.pb(Q[i]);
        if (left1 * left2 < -EPS)
            P.pb(lineIntersectSeg(Q[i], Q[i+1], a, b));
    }
    if(!P.empty() && !(P.back() == P.front()))
        P.pb(P.front());
    return P;
}

point pivot;
bool angleCmp(point a, point b) {
    if(collinear(pivot, a, b))
        return dist(pivot, a) < dist(pivot, b);
    double d1x = a.x - pivot.x, d1y = a.y - pivot.y;
    double d2x = b.x - pivot.x, d2y = b.y - pivot.y;
    return (atan2(d1y, d1x) - atan2(d2y, d2x)) < 0;
}

vector<point> convexHull(vector<point> P) {
    int i, j, n = sz(P);
    if (n <= 3) {
        if (!(P[0] == P[n-1]))
            P.pb(P[0]);
        return P;
    }

    int P0 = 0;
    rep(i, 1, n)
        if(P[i].y < P[P0].y || (P[i].y == P[P0].y && P[i].x > P[P0].x))
            P0 = i;

    point temp = P[0];
    P[0] = P[P0];
    P[P0] = temp;

    pivot = P[0];
    sort(++P.begin(), P.end(), angleCmp);
    vector<point> S;
    S.pb(P[n-1]);
    S.pb(P[0]);
    S.pb(P[1]);
    i = 2;

    while(i < n) {
        j = sz(S)-1;
        if(ccw(S[j-1], S[j], P[i]))
            S.pb(P[i++]);
        else
            S.pop_back();
    }
    return S;
}
