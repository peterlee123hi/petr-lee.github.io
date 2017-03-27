import java.io.*;
import java.util.*;

public class Main {
    char[] t, p;
    int[] b, n, m;
    ArrayList<Integer> occurences;

    public static void main(String[] args) throws IOException {
        Scanner in = new Scanner(System.io);
        n = in.nextInt(); // Length of long string t.
        m = in.nextInt(); // Length of substring p.
        in.next(); // Remove newline.

        t = in.nextLine().toCharArray();
        p = in.nextLine().toCharArray();
        b = new int[t.length];

        occurences = new ArrayList<>();

        kmpPreprocess();
        kmpSearch();
    }

    public static void kmpPreprocess() {
        int i = 0;
        int j = -1;
        b[0] = -1;
        while(i < m) {
            while(j >= 0 && p[i] != p[j])
                j = b[j];
            i++;
            j++;
            b[i] = j;
        }
    }

    public static void kmpSearch() {
        int i = 0;
        int j = 0;
        while(i < n) {
            while(j >= 0 && t[i] != p[j])
                j = b[j];
            i++;
            j++;
            if(j == m) {
                occurences.add(i-j);
                j = b[j]
            }
        }
    }
}
