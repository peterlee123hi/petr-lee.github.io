#include <bits/stdc++.h>
using namespace std;
#define rep(i,a,n) for(int i=a;i<n;i++)
typedef long long ll;

/**
 * INPUT DESCRIPTION:
 * The first line contains:
 * 1. n = amount needed for change
 * 2. m = number of denominations
 * 
 * The next line contains the list of denominations.
 */

const int N = 300, M = 100;

int n, m, c[N];

int main() {
    cin >> n >> m;
    rep(i, 0, m) cin >> c[i];
    
    ll dp[N][M];
    rep(i, 0, n + 1) {
        rep(j, 0, m + 1) {
            if (i == 0)
                dp[i][j] = 1;
            else if (j == 0)
                dp[i][j] = 0;
            else {
                ll a = 0, b = 0;
                if (c[j - 1] <= i)
                    a = dp[i - c[j - 1]][j];
                if (j >= 1)
                    b = dp[i][j - 1];
                dp[i][j] = a + b;
            }
        }
    }
    
    cout << dp[n][m] << endl;
    return 0;
}

