#include <cmath>
#include <cstdio>
#include <vector>
#include <iostream>
#include <algorithm>
#include <queue>
#include <functional>
using namespace std;
typedef pair<int,int> ii;
typedef vector<int> vi;
typedef vector<ii> vii;
#define rep(i,a,n) for(int i=a;i<n;i++)
#define pb push_back
#define mp make_pair
#define sz(x) ((int)(x).size())
#define all(x) (x).begin(),(x).end()
#define fi first
#define se second
const int UNVISITED = -1;
const int VISITED = 1;

int n; // # of vertices
vector<vii> AdjList;
vi ts, dfs_status;

int dfs(int u) {
    dfs_status[u] = VISITED;
    rep(j, 0, sz(AdjList)) {
        ii e = AdjList[u][j];
        int v = e.fi;
        if(dfs_status[v] == UNVISITED) {
            dfs(v);
        }
    }
    ts.pb(u);
}

void loadTopologicalSort() {
    ts.clear();
    dfs_status.assign(n, UNVISITED);
    rep(u, 0, n)
        if(dfs_status[u] == UNVISITED)
            dfs(u);
}
