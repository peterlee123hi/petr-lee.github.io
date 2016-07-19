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
int dfs_root, root_children, dfsNumberCounter;
vi dfs_num, dfs_low, dfs_parent;
vector<bool> articulation_vertex;
vector<ii> articulationEdgeList;

// Basic DFS traversal.
void dfs(int u) {
    dfs_num = dfs_low = dfsNumberCounter++;
    rep(j, 0, sz(AdjList[u])) {
        ii e = AdjList[u][j];
        int v = e.fi;
        if(dfs_num[v] == UNVISITED) {
            dfs_parent[v] = u;
            if(u == dfs_root) root_children++;

            dfs(v);

            if(dfs_low[v] >= dfs_num[u])
                articulation_vertex[u] = true;
            if(dfs_low[v] > dfs_num[u])
                articulationEdgeList.push(ii(u, v));
            dfs_low[u] = min(dfs_low[u], dfs_low[v]);
        } else if(v != dfs_parent[u]) {
            dfs_low[u] = min(dfs_low[u], dfs_num[v]);
        }
    }
}

int main() {
    // Load inputs...
    dfsNumberCounter = 0;
    dfs_num.assign(n, UNVISITED); dfs_low.assign(n, 0);
    dfs_parent.assign(n, 0);
    articulation_vertex.assign(n, false);
    rep(u, 0, n) {
        if(dfs_num[u] == UNVISITED) {
            dfs_root = u;
            root_children = 0;
            dfs(u);
            articulation_vertex[u] = (root_children > 1);
        }
    }
    exit(0);
}
