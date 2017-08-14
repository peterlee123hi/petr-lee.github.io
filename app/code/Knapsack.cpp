#include <bits/stdc++.h>
using namespace std;
#define rep(i,a,n) for(int i=a;i<n;i++)

/**
 * INPUT DESCRIPTION:
 * The first line contains:
 * 1. n = # of items
 * 2. k = max weight
 * 
 * The next n lines each contain:
 * 2. w = weight of item
 * 1. v = value of item
 */

const int N = 1000, K = 1000;

int n, k;
int wt[N], val[N];

int main() {
    cin >> n >> k;
    rep(i, 0, n) cin >> wt[i] >> val[i];

    int dp[N + 1][K + 1];
    rep(i, 0, n + 1) {
        rep(w, 0, k + 1) {
            if (i == 0 || w == 0) 
                dp[i][w] = 0;
            else if (wt[i - 1] <= w)
                dp[i][w] = max(val[i-1] + dp[i-1][w-wt[i-1]], dp[i - 1][w]);
            else
                dp[i][w] = dp[i-1][w];
        }
    }

    cout << dp[n][k] << endl;
    return 0;
}
