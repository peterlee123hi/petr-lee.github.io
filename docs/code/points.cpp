#include <iostream>
#include <cstdio>
#include <cmath>
#include <cstring>
#include <algorithm>
#include <functional>
using namespace std; 
#define REP(i,n) for(int i=0;i<(n);i++)
#define FOR(i,a,b) for(int i=(a);i<=(b);i++)
#define FORD(i,a,b) for(int i=(b)-1;i>=(a);i--)
#define mp make_pair
#define pb push_back
#define sz(x) ((int)(x).size())
#define all(x) (x).begin(),(x).end()
#define clr(x) memset((x),0,sizeof(x))
#define fi first
#define se second
inline bool EQ(double a, double b) { return fabs(a-b) < 1e-9; }
const int INF = 1<<29;
typedef long long ll;
typedef vector<int> vi;
typedef pair<int, int> ii;
typedef vector<ii> vii;

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
