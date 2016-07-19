#include <algorithm>
#include <cstdio>
#include <vector>
#include <queue>
using namespace std;
typedef vector<int> vi;
#define rep(i,a,n) for(int i=a;i<n;i++)
const int MAX_V = 40;
const int INF = 1 << 29;

// res = AdjMat, s = source, t = sink
int res[MAX_V][MAX_V], s, t;
vi p;

int augment(int v, int minEdge) {
    if(v == s) {
        return minEdge;
    } else if(p[v] != -1) {
        int f = augment(p[v], min(minEdge, res[p[v]][v]));
        res[p[v]][v] -= f;
        res[v][p[v]] += f;
        return f;
    }
}

int karp() {
    int mf = 0, f = -1;
    while(f != 0) {
        f = 0;
        vi dist(MAX_V, INF); dist[s] = 0;
        queue<int> q; q.push(s);
        p.assign(MAX_V, -1);
        while(!q.empty()) {
            int u = q.front(); q.pop();
            if(u == t) break;
            rep(v, 0, MAX_V)
                if(res[u][v] > 0 && dist[v] == INF) {
                    dist[v] = dist[u] + 1;
                    q.push(v);
                    p[v] = u;
                }
        }
        f = augment(t, INF);
        mf += f;
    }
    return mf;
}

int main() {
    // Load 'res', 's', and 't'...
    printf("Max Network Flow: %d\n", karp());
}
