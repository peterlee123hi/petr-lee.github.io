#include <cstdio>
#include <cmath>
#include <cstring>
#include <algorithm>
#include <vector>
using namespace std;
typedef pair<int,int> ii;
typedef vector<ii> vii;
typedef vector<int> vi;
#define rep(i,a,n) for(int i=a;i<n;i++)
#define pb push_back
#define mp make_pair
#define all(x) (x).begin(),(x).end()
#define sz(x) ((int)(x).size())
#define fi first
#define se second

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

/**
 * INPUT DESCRIPTION:
 * The first line has two integers:
 * 1. n = denoting the number of nodes in the graph
 * 2. m = denoting the number of edges in the graph
 * 
 * The next m lines contain:
 * 1. u = first vertex
 * 2. v = second vertex
 * 3. w = weight of undirected edge
 */

int n, m;

int main() {
	scanf("%d %d", &n, &m);
	vector< pair<int, ii> > EdgeList;
	rep(i, 0, m) {
		int u, v, w; scanf("%d %d %d", &u, &v, &w); 
		u--; v--;
		EdgeList.pb(mp(w, ii(u, v)));
	} sort(all(EdgeList));

	int total = 0;
	UnionFind uf(n);
	vector<vii> AdjList(n);

	rep(i, 0, m) {
		pair<int, ii> e = EdgeList[i];
		int u = e.se.fi, v = e.se.se, w = e.fi;
		if(!uf.isSameSet(u, v)) {
			total += w;
			uf.unionSet(u, v);
			AdjList[u].pb(ii(v, w));
			AdjList[v].pb(ii(u, w));
		}
	}

	printf("Weight of Minimum Spanning Tree: %d\n", total);
	// Note: MST is represented by the AdjList.
	exit(0);
}
