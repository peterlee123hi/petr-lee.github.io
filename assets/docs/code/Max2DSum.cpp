#include <cstdio>
#include <algorithm>
#include <climits>
using namespace std;
#define REP(i,a,n) for(int i=a;i<n;i++)

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

	REP(i, 0, n) REP(j, 0, m) {
		scanf("%d", &mat[i][j]);
		if(i > 0) mat[i][j] += mat[i-1][j];
		if(j > 0) mat[i][j] += mat[i][j-1];
		if(i > 0 && j > 0) mat[i][j] -= mat[i-1][j-1];
	}

	int ans = INT_MIN;
	REP(sx, 0, n) REP(sy, 0, m) {
		REP(ex, sx, n) REP(ey, sy, m) {
			int subrect = mat[ex][ey];
			if(sx > 0) subrect -= mat[sx-1][ey];
			if(sy > 0) subrect -= mat[ex][sy-1];
			if(sx > 0 && sy > 0) subrect += mat[sx-1][sy-1];
			ans = max(ans, subrect);
		}
	}

	printf("%d\n", ans);
	exit(0);
}
