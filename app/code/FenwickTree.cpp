#include <vector>
#define sz(x) ((int)(x).size())
#define rep(i,a,n) for(int i=a;i<n;i++)
#define LSOne(S) (S&-S)
using namespace std;
typedef vector<int> vi;

class FenwickTree {
private: vi ft;
public:
	FenwickTree(int n) {
		ft.assign(n+1,0);
	}

	int rsq(int q) {
		int sum = 0;
		while(q > 0) {
			sum += ft[q];
			q -= LSOne(q);
		}
		return sum;
	}

	int rsq(int a, int b) {
		return rsq(b) - rsq(a - 1);
	}

	void adjust(int k, int v) {
		while(k < sz(ft)) {
			ft[k] += v;
			k += LSOne(k);
		}
	}
};
