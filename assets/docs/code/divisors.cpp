#include <bitset>
#include <algorithm>
#include <cmath>
using namespace std;
typedef ll long long;
typedef vi vector<int>;
#define pb push_back
#define sz(x) (int)((x).size())

// Load primes with sieve...

// number of unique divisors
ll numDiv(ll N) {
    ll PF_idx = 0, PF = primes[PF_idx], ans = 1;
    while(N != 1 && Pf * PF <= N) {
        ll power = 0;
        while(N % PF == 0) {
            N /= PF;
            power++;
        }
        ans *= power + 1;
        PF = primes[++PF_idx];
    }
    if(N != 1) ans *= 2;
    return ans;
}

// sum of divisors
ll sumDiv(ll N) {
    ll PF_idx = 0, PF = primes[PF_idx], ans = 1;
    while(N != 1 && Pf * PF <= N) {
        ll power = 0;
        while(N % PF == 0) {
            N /= PF;
            power++;
        }
        ans *= ((ll)power((double)PF, power + 1.0) - 1) / (PF - 1);
        PF = primes[++PF_idx];
    }
    if(N != 1) ans *= ((ll)pow((double)N, 2.0) - 1) / (N - 1);
    return ans;
}

// # of positive integers relatively prime to N
ll EulerPhi(ll N) {
    ll PF_idx = 0, PF = primes[PF_idx], ans = N;
    while(N != 1 && PF * PF <= N) {
        if(N % PF == 0) ans -= ans/PF;
        while(N % PF == 0) N /= PF;
        PF = primes[++PF_idx];
    }
    if(N != 1) ans -= ans / N;
    return ans;
}
