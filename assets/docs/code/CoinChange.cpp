#include <cstdio>
#include <cstring>
#include <algorithm>
using namespace std;
#define rep(i,a,n) for(int i=a;i<n;i++)
const int INF = 1<<29;

/**
 * INPUT DESCRIPTION:
 * The first line contains:
 * 1. V = amount needed to make change
 * 2. n = # of denominations
 * 
 * The next line contains the list of denominations.
 */

int memo[1000];

int V, n, denomination[100];

int change(int value) {
	if(value == 0) return 0;
	if(value < 0) return INF;

	if(memo[value] != -1)
		return memo[value];
	int &m = memo[value];

	int ans = INF;
	rep(i, 0, n)
		ans = min(ans, change(value-denomination[i]));
	ans++;

	return m = ans;
}

int main() {
	scanf("%d %d", &V, &n);
	rep(i, 0, n) scanf("%d", &denomination[i]);

	memset(memo, -1, sizeof memo);

	printf("Minimum # of coins: %d\n", change(V));
	exit(0);
}
