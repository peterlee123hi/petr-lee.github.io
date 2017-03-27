#include <cstdio>
#include <cstring>
#include <algorithm>
using namespace std;
#define rep(i,a,n) for(int i=a;i<n;i++)

/**
 * INPUT DESCRIPTION:
 * The first line contains:
 * 1. n = # of items
 * 
 * The next n lines each contain:
 * 1. v = value of item
 * 2. w = weight of item
 * 
 * The last line contains:
 * 1. s = max weight
 */

int memo[1000][100];
int n, V[1000], W[1000], s;

int backtrack(int id, int remW) {
	if(id == n || remW == 0) return 0;

	if(memo[id][remW] != -1) return memo[id][remW];
	int &m = memo[id][remW];

	if(W[id] > remW) return m = backtrack(id+1, remW);
	int take = V[id]+backtrack(id+1, remW-W[id]);
	int ignore = backtrack(id+1, remW);
	return m = max(take, ignore);
}

int main() {
	scanf("%d", &n);
	rep(i, 0, n) {
		scanf("%d %d", &V[i], &W[i]);
	}
	scanf("%d", &s);

	memset(memo, -1, sizeof memo);

	printf("%d\n", backtrack(0, s));
	exit(0);
}