#include <cstdio>
#include <cmath>
#include <cstring>
#include <algorithm>
using namespace std;
#define rep(i,a,n) for(int i=a;i<n;i++)
const int INF = 1 << 29;

int n, m;
int AdjMat[100][100], parent[100][100];

/**
 * INPUT DESCRIPTION:
 * The first line contains:
 * 1. T = denoting the number of test cases
 * 
 * First line of each test case has two integers:
 * 1. n = denoting the number of nodes in the graph
 * 2. m = denoting the number of edges in the graph
 *
 * The next m lines each consist of:
 * 1. u = from vertex
 * 2. v = to vertex
 * 3. w = edge weight
 */

void input() {
    scanf("%d %d", &n, &m);
    rep(i, 0, n)
        rep(j, 0, n) {
            AdjMat[i][j] = (i == j) ? 0 : INF;
            parent[i][j] = i;
        }
    rep(i, 0, m) {
        int u, v, w; scanf("%d %d %d", &u, &v, &w);
        u--; v--;
        AdjMat[u][v] = w;
    }
}

void warshall() {
    rep(k, 0, n)
        rep(i, 0, n)
            rep(j, 0, n) {
                if(AdjMat[i][j] > AdjMat[i][k] + AdjMat[k][j]) {
                    AdjMat[i][j] = AdjMat[i][k] + AdjMat[k][j];
                    parent[i][j] = parent[k][j];
                }
            }
}

void output() {
    rep(u, 0, n - 1)
        rep(v, u + 1, n) {
            if(u == v) continue;
            printf("%d -> %d: %d\n", u, v, AdjMat[u][v]);
        }
}

int main() {
    int T; scanf("%d", &T);
    while(T--) {
        input();
        bellman();
        output();
    } exit(0);
}
