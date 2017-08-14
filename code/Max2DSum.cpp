#include <cstdio>
#include <algorithm>
using namespace std;
#define rep(i,a,n) for(int i=a;i<n;i++)
const int INF = 1 << 29;

/**
 * INPUT DESCRIPTION:
 * The first line contains:
 * 1. n = # of rows
 * 2. m = # of columns
 * 
 * The next n lines each contain a row of length m.
 */

int main() {
	int n, m;
	scanf("%d %d", &n, &m);
	int mat[n][m];

	rep(i, 0, n) rep(j, 0, m) {
		scanf("%d", &mat[i][j]);
		if(i > 0) mat[i][j] += mat[i-1][j];
		if(j > 0) mat[i][j] += mat[i][j-1];
		if(i > 0 && j > 0) mat[i][j] -= mat[i-1][j-1];
	}

	int ans = -INF;
	rep(sx, 0, n) rep(sy, 0, m) {
		rep(ex, sx, n) rep(ey, sy, m) {
			int subrect = mat[ex][ey];
			if(sx > 0) subrect -= mat[sx-1][ey];
			if(sy > 0) subrect -= mat[ex][sy-1];
			if(sx > 0 && sy > 0) subrect += mat[sx-1][sy-1];
			ans = max(ans, subrect);
		}
	}

	printf("%d\n", ans);
    return 0;
}
