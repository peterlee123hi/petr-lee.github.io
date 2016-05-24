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
 * The next line contains the list of denominations.* 
 */

int memoChange[1000], memoWays[100][1000];

int V, n, denomination[100];

// returns minimum # of coins to give change
int change(int value) {
	if(value == 0) return 0;
	if(value < 0) return INF;

	if(memoChange[value] != -1)
		return memoChange[value];
	int &m = memoChange[value];

	int ans = INF;
	rep(i, 0, n)
		ans = min(ans, change(value-denomination[i]));
	ans++;

	return m = ans;
}

// returns # of ways to give change
int ways(int id, int rem) {
	if(rem == 0) return 1;
	if(id == n || rem < 0) return 0;

	if(memoWays[id][rem] != -1)
		return memoWays[id][rem];
	int &m = memoWays[id][rem];

	int take = ways(id, rem-denomination[id]);
	int ignore = ways(id+1, rem);

	return m = (take+ignore);
}

int main() {
	scanf("%d %d", &V, &n);
	rep(i, 0, n) scanf("%d", &denomination[i]);

	memset(memoChange, -1, sizeof memoChange);
	memset(memoWays, -1, sizeof memoWays);

	printf("Minimum # of coins: %d\n", change(V));
	printf("Total # of ways: %d\n", ways(0, V));
	exit(0);
}
