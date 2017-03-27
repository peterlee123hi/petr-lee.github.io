#include <cstdio>
#include <iostream>
using namespace std;
typedef pair<int, int> ii;

// function f returns next number in sequence...

// mu = index of first cycle, lambda = length of cycle
ii floydCycleFinding(int x0) {
    int tortoise = f(x0), hare = f(f(x0));
    while(tortoise != hare) {
        tortoise = f(tortoise);
        hare = f(f(hare));
    }

    int mu = 0;
    hare = x0;
    while(tortoise != hare) {
        tortoise = f(tortoise);
        hare = f(f(hare));
        mu++;
    }

    int lambda = 1;
    hare = f(tortoise);
    while(tortoise != hare) {
        hare = f(hare);
        lambda++;
    }

    return ii(mu, lambda);
}
