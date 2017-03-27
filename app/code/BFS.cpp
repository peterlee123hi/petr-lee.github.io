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

int n, m, s;
int dist[3000];
vector<vii> AdjList;

/**
 * INPUT DESCRIPTION:
 * The first line contains:
 * 1. T = denoting the number of test cases
 * 
 * First line of each test case has two integers:
 * 1. n = denoting the number of nodes in the unweighted graph
 * 2. m = denoting the number of edges in the unweighted graph
 * 
 * The next m lines each consist of:
 * 1. u = from vertex
 * 2. v = to vertex
 * 
 * The last line has:
 * 1. s = starting position
 */

void input() {
    scanf("%d %d", &n, &m);
    AdjList.assign(n, vii(0));
    rep(i, 0, n)
        dist[i] = -1;
    rep(i, 0, m) {
        int u, v; scanf("%d %d", &u, &v);
        u--; v--;
        AdjList[u].pb(ii(v, 1));
        AdjList[v].pb(ii(u, 1));
    }
    scanf("%d", &s);
    s--;
}

void bfs() {
    dist[s] = 0;
    queue<int> q;
    q.push(s);

    while(!q.empty()) {
        int u = q.front(); q.pop();
        rep(j, 0, sz(AdjList[u])) {
            int v = AdjList[u][j].fi;
            if(dist[v] == -1) {
                dist[v] = dist[u] + 1;
                q.push(v);
            }
        }
    }
}

void output() {
    rep(v, 0, n) {
        if(v == s) continue;
        printf("%d -> %d: %d\n", s, v, dist[v]);
    }
}

// GRID VERSION
int n; // # of rows
int m; // # of cols
int grid[][]; // Load grid in input()
int dist[][]; // Initialize with -1

int dr[] = {-1, -1, -1, 0, 1, 1, 1, 0};
int dc[] = {-1, 0, 1, 1, 1, 0, -1, -1};

bool inBounds(int r, int c) {
    return 0 <= r && r < n && 0 <= c && c < m;
}

int bfs_grid() {
    dist[s_r][s_c] = 0;
    queue<ii> q;
    q.push(ii(s_r, s_c));

    while(!q.empty()) {
        ii pos = q.front(); q.pop();
        rep(dir, 0, 8) {
            int n_r = pos.fi + dr[dir];
            int n_c = pos.se + dc[dir];
            if(inBounds(n_r, n_c) && dist[n_r][n_c] == -1) {
                dist[n_r][n_c] = dist[pos.fi][pos.se] + 1;
                q.push(ii(n_r, n_c));
            }
        }
    }
}

int main() {
    int T; scanf("%d", &T);
    while(T--) {
        input();
        bfs();
        output();
    } exit(0);
}