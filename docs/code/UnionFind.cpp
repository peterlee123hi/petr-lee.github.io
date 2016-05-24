#include <vector>
using namespace std;
typedef vector<int> vi;
#define REP(i,a,n) for(int i=a;i<n;i++)

class UnionFind {
private: vi p, rank;
public:
	UnionFind(int n) {
		rank.assign(n,0);
		p.assign(n,0);
		REP(i,0,n) p[i] = i;
	}

	int findSet(int i) {
		return (p[i] == i) ? i : (p[i] = findSet(p[i]));
	}

	bool isSameSet(int i, int j) {
		return findSet(i) == findSet(j);
	}

	void unionSet(int i, int j) {
		if(!isSameSet(i, j)) {
			int x = findSet(i), y = findSet(j);
			if(rank[x] > rank[y]) {
				p[y] = p[x];
			} else {
				p[x] = p[y];
				if(rank[x] == rank[y])
					rank[y]++;
			}
		}
	}
};
