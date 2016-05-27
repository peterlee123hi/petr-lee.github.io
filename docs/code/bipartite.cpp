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

int n, s; // # of vertices, starting vertex
vector<vii> AdjList;

bool isBipartite() {
    queue<int> q;
    q.push(s);
    vi color(n, -1); color[s] = 0;
    bool ans = true;

    while(!q.empty() && ans) {
        int u = q.front(); q.pop();
        rep(j, 0, sz(AdjList[u])) {
            int v = AdjList[u][j].fi;
            if(color[u] == color[v]) {
                ans = false;
                break;
            } else if(color[v] == -1) {
                color[v] = 1 - color[u];
                q.push(v);
            }
        }
    }

    return ans;
}
