#include <bitset>
#include <algorithm>
#include <cmath>
using namespace std;
typedef ll long long;
typedef vi vector<int>;
#define pb push_back
#define sz(x) (int)((x).size())

// Load primes with sieve...

vi primeFactors(ll N) {
    vi factors;
    ll PF_idx = 0, PF = primes[PF_idx];
    while(PF * PF <= N) {
        while(N % PF == 0) {
            N /= PF;
            factors.pb(PF);
        }
        PF = primes[++PF_idx];
    }
    if(N != 1)
        factors.pb(N);
    return factors;
}
