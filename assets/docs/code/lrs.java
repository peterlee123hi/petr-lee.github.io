import java.io.*;
import java.util.*;

public class Main {
    char[] T;
    int n;

    int[] RA, tempRA;
    int[] SA, tempSA;
    int[] c;

    int[] Phi;
    int[] PLCP;
    int[] LCP;

    public static void countingSort(int k) {
        int i, sum, maxI = Math.max(300, n);
        for (i = 0; i < 100010; i++) c[i] = 0;
        for (i = 0; i < n; i++)
            c[i + k < n ? RA[i + k] : 0]++;
        for (i = sum = 0; i < maxI; i++) {
            int t = c[i]; c[i] = sum; sum += t;
        }
        for (i = 0; i < n; i++)
            tempSA[c[SA[i] + k < n ? RA[SA[i] + k] : 0]++] = SA[i];
        for (i = 0; i < n; i++)
            SA[i] = tempSA[i];
    }

    public static void constructSA() {
        int i, k, r;
        for (i = 0; i < n; i++)
            RA[i] = T[i];
        for (i = 0; i < n; i++)
            SA[i] = i;
        for (k = 1; k < n; k <<= 1) {
            countingSort(k);
            countingSort(0);
            tempRA[SA[0]] = r = 0;
            for (i = 1; i < n; i++)
                tempRA[SA[i]] =
                    (RA[SA[i]] == RA[SA[i-1]] && RA[SA[i]+k] == RA[SA[i-1]+k]) ? r : ++r;
            for (i = 0; i < n; i++)
                RA[i] = tempRA[i];
        }
    }

    public static void computeLCP() {
        int i, L;
        Phi[SA[0]] = -1;
        for(i = 1; i < n; i++)
            Phi[SA[i]] = SA[i-1];
        for(i = L = 0; i < n; i++) {
            if(Phi[i] == -1) {
                PLCP[i] = 0; continue;
            }
            while (i + L < T.length && Phi[i] + L < T.length && T[i + L] == T[Phi[i] + L])
                L++;
            PLCP[i] = L;
            L = Math.max(L-1, 0);
        }
        for(i = 1; i < n; i++)
            LCP[i] = PLCP[SA[i]];
    }

    public static String LRS() {
        int i, idx = 0, maxLCP = 0;

        for (i = 1; i < n; i++)
            if (LCP[i] > maxLCP) {
                maxLCP = LCP[i];
                idx = i;
            }

        return new String(T).substring(SA[idx], maxLCP);
    }
}
