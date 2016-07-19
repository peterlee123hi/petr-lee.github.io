#include <cstdio>
#include <algorithm>
using namespace std;
#define REP(i,a,n) for(int i=a;i<n;i++)
 
/**
 * INPUT DESCRIPTION:
 * The input contains the sequence only.
 */

int A[1000000], M[1000000], M_id[1000000], P[1000000];
 
void print(int end) {
    if(end < 0) return;
    print(P[end]);
    printf("%d ", A[end]);
}
 
int main() {
    int L = 0, L_end = 0, i = 0;

    while(scanf("%d", &A[i]) != EOF) {
        int pos = lower_bound(M, M + L, A[i]) - M;
        M[pos] = A[i];
        M_id[pos] = i;
        P[i] = pos > 0 ? M_id[pos - 1] : -1;
        if(pos == L) {
            L++;
            L_end = i;
        }
        i++;
    }

    printf("%d\n", L);
    print(L_end);
    printf("\n");
    exit(0);
}
