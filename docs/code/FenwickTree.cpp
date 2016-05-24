#include <vector>
using namespace std;
typedef vector<int> vi;
#define SZ(x) ((int)(x).size())
#define REP(i,a,n) for(int i=a;i<n;i++)
#define LSOne(S) (S&-S)

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
		while(k < SZ(ft)) {
			ft[k] += v;
			k += LSOne(k);
		}
	}
};
