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
vector<vii> AdjList; // Load AdjList in input()
vi dfs_num, dfs_low, S, visited;
vector<vi> SCCs;

// Basic DFS traversal.
void tarjan(int u) {
    dfs_num = dfs_low = dfsNumberCounter++;
    S.pb(u);
    visited[u] = 1;
    rep(j, 0, sz(AdjList[u])) {
        ii e = AdjList[u][j];
        int v = e.fi;
        if(dfs_num[v] == UNVISITED)
            tarjan(v);
        if(visited[v])
            dfs_low[u] = min(dfs_low[u], dfs_low[v]);
    }

    if(dfs_num[u] == dfs_low[u]) {
        vi component;
        int v = -1;
        while(u != v) {
            v = S.back(); S.pop_back();
            visited[v] = 0;
            component.pb(v);
        }
        SCCs.pb(component);
    }
}

int main() {
    // Load inputs...
    dfs_num.assign(n, UNVISITED); dfs_low.assign(n, 0);
    visited.assign(n, 0);
    rep(u, 0, n) {
        if(dfs_num[u] == UNVISITED)
            tarjan(u);
    }
    exit(0);
}
