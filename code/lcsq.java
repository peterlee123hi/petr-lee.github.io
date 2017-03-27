import java.io.*;
import java.util.*;

public class Main {
    char[] a, b;
    int n, m;

    int[][] memo;

    int final INF = 1<<29;

    public static void main(String[] args) throws IOException {
        Scanner in = new Scanner(System.io);
        n = in.nextInt(); // Length of long string t.
        m = in.nextInt(); // Length of substring p.
        in.next(); // Remove newline.

        a = (" " + in.nextLine()).toCharArray();
        b = (" " + in.nextLine()).toCharArray();

        memo = new int[n+1][m+1];
        for(int i = 0; i < n+1; i++)
            for(int j = 0; j < m+1; j++)
                memo[i][j] = -1;

        System.out.printf("Length of longest common substring: %d\n", V(n, m));
    }

    public static int score(char c1, char c2) {
        if(c1 == c2) return 1;
        return -1*INF;
    }

    public static int V(int i, int j) {
        if(memo[i][j] != -1)
            return memo[i][j];
        
        if(i == 0 || j == 0) return memo[i][j] = 0;

        int o1 = V(i-1, j-1) + score(a[i], b[j]);
        int o2 = V(i-1, j);
        int o3 = V(i, j-1);
        return memo[i][j] = Math.max(o1, Math.max(o2, o3));
    }
}
