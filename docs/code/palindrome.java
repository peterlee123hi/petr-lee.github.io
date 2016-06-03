import java.io.*;
import java.util.*;

public class Main {
    String t;
    char[] s;
    int n;
    
    int start, end, max_length;

    public static void main(String[] args) throws IOException {
        Scanner in = new Scanner(System.io);
        n = in.nextInt();
        in.next();

        t = in.nextLine();
        s = t.toCharArray();

        start = 0;
        end = 0;
        max_length = -1;
        search(0, n-1);
        System.out.println("Longest palindrome: " + t.substring(start, end));
    }

    public static int score(char c1, char c2) {
        if(c1 == c2) return 2;
        return -1;
    }

    public static int V(int i, int j) {
        if(memo[i][j] != -1)
            return memo[i][j];

        if(i == 0 && j == 0) return memo[i][j] = 0;
        else if(j == 0) return memo[i][j] = (score(a[i], ' ') + V(i-1, j));
        else if(i == 0) return memo[i][j] = (score(' ', b[j]) + V(i, j-1));

        int o1 = V(i-1, j-1) + score(a[i], b[j]);
        int o2 = V(i-1, j) + score(a[i], ' ');
        int o3 = V(i, j-1) + score(' ', b[j]);
        return memo[i][j] = Math.max(o1, Math.max(o2, o3));
    }
}
