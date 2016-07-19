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

int n; // # of rows
int m; // # of cols
char grid[][]; // Load grid in input()

int dr[] = {-1, -1, -1, 0, 1, 1, 1, 0};
int dc[] = {-1, 0, 1, 1, 1, 0, -1, -1};

bool inBounds(int r, int c) {
    return 0 <= r && r < n && 0 <= c && c < m;
}

// Returns size of flooded area.
int flood_fill(int r, int c, char c1, char c2) {
    if(!inBounds(r, c) || grid[r][c] != c1) return 0;
    int ans = 1;
    grid[r][c] = c2;
    rep(dir, 0, 8)
        ans += flood_fill(r+dr[dir], c+dc[dir], c1, c2);
    return ans;
}
