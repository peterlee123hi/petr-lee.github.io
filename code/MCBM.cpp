#include <cstdio>
#include <iostream>
#include <vector>
using namespace std;
typedef pair<int, int> ii;
typedef vector<int> vi;
#define rep(i,a,n) for(int i=a;i<n;i++)

int n, left; // # of vertices, # on left side of bipartite graph
vector<vi> AdjList;
vi match, visited;

int augment(int l) {
    if(visited[l]) return 0;
    visited[l] = 1;
    rep(j, 0, sz(AdjList[l])) {
        int r = AdjList[l][j];
        if(match[r] == -1 || augment(match[r])) {
            match[r] = l;
            return 1;
        }
    }
    return 0;
}

int mcbm() {
    int ans = 0;
    match.assign(n, -1);
    rep(l, 0, left) {
        visited.assign(left, 0);
        ans += augment(l);
    }
    return ans;
}

int main() {
    // Load 'AdjList', 'n', and 'left'...
    printf("# of matchings: %d\n", mcbm());
    exit(0);
}
