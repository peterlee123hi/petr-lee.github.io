#include <bits/stdc++.h>
using namespace std;
#define rep(i,a,n) for(int i=a;i<n;i++)
#define all(x) (x).begin(),(x).end()
const int inf = 1 << 29;
typedef vector<int> vi;

const int N = 1e7;

int n, a[N];

int main() {
    cin >> n;
    rep(i, 0, n) cin >> a[i];
    
    vi d(n + 1, 0);
    d[0] = -inf;
    rep(i, 1, n + 1) d[i] = inf;
    
    rep(i, 0, n) {
        int j = upper_bound(all(d), a[i]) - d.begin();
        if (d[j - 1] < a[i] && a[i] < d[j]) d[j] = a[i];
    }
    
    int i = n;
    while (d[i] == inf) i--;
    
    cout << i << endl;
    return 0;
}

