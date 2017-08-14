#include <cstdio>
#include <vector>
using namespace std;
#define rep(i,a,n) for(int i=a;i<n;i++)

/**
 * INPUT DESCRIPTION:
 * The first line contains:
 * 1. n = length of sequence
 * 
 * The next line contains the sequence.
 */

int main() {
	int n; scanf("%d", &n);
	int sum = 0, ans = 0;
	rep(i, 0, n) {
		int d; scanf("%d", &d);
		sum += d;
		ans = max(ans, sum);
		if(sum < 0) sum = 0;
	}
	printf("%d\n", ans);
    return 0;
}
