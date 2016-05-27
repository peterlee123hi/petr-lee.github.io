#include <bitset>
#include <algorithm>
#include <cmath>
using namespace std;
typedef ll long long;
typedef vi vector<int>;
#define pb push_back
#define sz(x) (int)((x).size())

ll _sieve_size;
bitset<10000010> bs;
vi primes;

void sieve(ll upperbound) {
    _sieve_size = upperbound + 1;
    bs.set();
    bs[0] = bs[1] = 0;
    for(ll i = 2; i < _sieve_size; i++) {
        if(bs[i]) {
            for(ll j = i * i; j <= _sieve_size; j += i) bs[j] = 0;
            primes.pb(i);
        }
    }
}

bool isPrime(ll N) {
    if(N <= _sieve_size) return bs[N];
    for(int i = 0; i < sz(primes); i++)
        if(N % primes[i] == 0)
            return false;
    return true;
}

int main() {
    sieve(10000000); // Load sieve...
    int n; scanf("%d", &n);
    prinf("%d is %sprime.", n, (isPrime(n))?"":"not ");
}
