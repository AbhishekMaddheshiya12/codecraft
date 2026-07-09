const problems = [
  {
    id: 1,
    title: "Longest Increasing Subsequence",
    difficulty: "Medium",

    likes: [],
    dislikes: [],

    description:
      "Given an integer array nums, return the length of the longest strictly increasing subsequence. A subsequence is a sequence that can be derived from an array by deleting some or no elements without changing the order of the remaining elements.",

    examples: [
      {
        input: "8\n10 9 2 5 3 7 101 18",
        output: "4",
        explanation: "The longest increasing subsequence is [2,3,7,101].",
      },
    ],

    constraints: ["1 <= nums.length <= 2500", "-10^4 <= nums[i] <= 10^4"],

    testCases: [
      {
        id: 1,
        input: "5\n1 3 5 4 7",
        expectedOutput: "4",
      },
      {
        id: 2,
        input: "5\n2 2 2 2 2",
        expectedOutput: "1",
      },
      {
        id: 3,
        input: "6\n10 20 30 1 2 3",
        expectedOutput: "3",
      },
      {
        id: 4,
        input: "6\n1 10 2 20 3 30",
        expectedOutput: "4",
      },
      {
        id: 5,
        input: "1\n1",
        expectedOutput: "1",
      },
      {
        id: 6,
        input: "5\n5 4 3 2 1",
        expectedOutput: "1",
      },
      {
        id: 7,
        input: "6\n1 3 2 4 3 5",
        expectedOutput: "4",
      },
      {
        id: 8,
        input: "5\n1 2 3 4 5",
        expectedOutput: "5",
      },
      {
        id: 9,
        input: "7\n2 6 8 3 4 5 7",
        expectedOutput: "5",
      },
      {
        id: 10,
        input: "7\n7 6 5 4 3 2 1",
        expectedOutput: "1",
      },
    ],

    category: "Dynamic Programming",

    starterCode: {
      cpp: `class Solution {
public:
    int lengthOfLIS(vector<int>& nums) {

    }
};`,

      c: `int lengthOfLIS(int nums[], int n) {

}`,

      java: `class Solution {
    public int lengthOfLIS(int[] nums) {

    }
}`,

      javascript: `var lengthOfLIS = function(nums) {

};`,

      python: `class Solution:
    def lengthOfLIS(self, nums):

        pass`,
    },

    driverCode: {
      cpp: `#include <bits/stdc++.h>
using namespace std;

{{USER_CODE}}

int main() {

    int n;
    cin >> n;

    vector<int> nums(n);

    for(int i = 0; i < n; i++)
        cin >> nums[i];

    Solution obj;

    cout << obj.lengthOfLIS(nums);

    return 0;
}`,

      c: `#include <stdio.h>

{{USER_CODE}}

int main() {

    int n;
    scanf("%d", &n);

    int nums[n];

    for(int i = 0; i < n; i++)
        scanf("%d", &nums[i]);

    printf("%d", lengthOfLIS(nums, n));

    return 0;
}`,

      java: `import java.util.*;

{{USER_CODE}}

public class Main {

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        int n = sc.nextInt();

        int[] nums = new int[n];

        for(int i = 0; i < n; i++)
            nums[i] = sc.nextInt();

        Solution obj = new Solution();

        System.out.print(obj.lengthOfLIS(nums));
    }
}`,

      javascript: `{{USER_CODE}}

const fs = require("fs").readFileSync(0, "utf8").trim().split(/\\s+/);

let idx = 0;

const n = Number(fs[idx++]);

const nums = [];

for(let i = 0; i < n; i++)
    nums.push(Number(fs[idx++]));

console.log(lengthOfLIS(nums));`,

      python: `{{USER_CODE}}

n = int(input())

nums = list(map(int, input().split()))

obj = Solution()

print(obj.lengthOfLIS(nums))`,
    },

    solution: "",
  },
  {
    id: 2,

    title: "Two Sum",

    difficulty: "Easy",

    likes: [],

    dislikes: [],

    description:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input has exactly one solution, and you may not use the same element twice.",

    examples: [
      {
        input: "4\n2 7 11 15\n9",
        output: "0 1",
        explanation: "nums[0] + nums[1] = 2 + 7 = 9.",
      },
    ],

    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists.",
    ],

    testCases: [
      {
        id: 1,
        input: "4\n2 7 11 15\n9",
        expectedOutput: "0 1",
      },
      {
        id: 2,
        input: "3\n3 2 4\n6",
        expectedOutput: "1 2",
      },
      {
        id: 3,
        input: "2\n3 3\n6",
        expectedOutput: "0 1",
      },
      {
        id: 4,
        input: "5\n1 5 3 7 9\n10",
        expectedOutput: "0 4",
      },
      {
        id: 5,
        input: "6\n5 2 8 11 15 7\n9",
        expectedOutput: "1 5",
      },
    ],

    category: "Arrays",

    starterCode: {
      cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {

    }
};`,

      c: `int* twoSum(int nums[], int n, int target) {

}`,

      java: `class Solution {

    public int[] twoSum(int[] nums, int target) {

    }

}`,

      javascript: `var twoSum = function(nums, target) {

};`,

      python: `class Solution:

    def twoSum(self, nums, target):

        pass`,
    },

    driverCode: {
      cpp: `#include <bits/stdc++.h>
using namespace std;

{{USER_CODE}}

int main() {

    int n;

    cin >> n;

    vector<int> nums(n);

    for(int i = 0; i < n; i++)
        cin >> nums[i];

    int target;

    cin >> target;

    Solution obj;

    vector<int> ans = obj.twoSum(nums, target);

    for(int x : ans)
        cout << x << " ";

    return 0;
}`,

      c: `#include <stdio.h>
#include <stdlib.h>

{{USER_CODE}}

int main() {

    int n;

    scanf("%d", &n);

    int nums[n];

    for(int i = 0; i < n; i++)
        scanf("%d", &nums[i]);

    int target;

    scanf("%d", &target);

    int* ans = twoSum(nums, n, target);

    printf("%d %d", ans[0], ans[1]);

    free(ans);

    return 0;
}`,

      java: `import java.util.*;

{{USER_CODE}}

public class Main {

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        int n = sc.nextInt();

        int[] nums = new int[n];

        for(int i = 0; i < n; i++)
            nums[i] = sc.nextInt();

        int target = sc.nextInt();

        Solution obj = new Solution();

        int[] ans = obj.twoSum(nums, target);

        for(int x : ans)
            System.out.print(x + " ");
    }

}`,

      javascript: `{{USER_CODE}}

const input = require("fs")
.readFileSync(0,"utf8")
.trim()
.split(/\\s+/);

let idx = 0;

const n = Number(input[idx++]);

const nums = [];

for(let i=0;i<n;i++)
    nums.push(Number(input[idx++]));

const target = Number(input[idx++]);

const ans = twoSum(nums,target);

console.log(ans.join(" "));`,

      python: `{{USER_CODE}}

n = int(input())

nums = list(map(int,input().split()))

target = int(input())

obj = Solution()

ans = obj.twoSum(nums,target)

print(*ans)`,
    },

    solution: "",
  },
  {
    id: 3,

    title: "Valid Parentheses",

    difficulty: "Easy",

    likes: [],

    dislikes: [],

    description:
      "Given a string s containing only the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. A string is valid if every opening bracket has a corresponding closing bracket of the same type and in the correct order.",

    examples: [
      {
        input: "()",
        output: "true",
        explanation: "The string is valid.",
      },
    ],

    constraints: [
      "1 <= s.length <= 10^4",
      "s consists only of '(', ')', '{', '}', '[' and ']'.",
    ],

    testCases: [
      {
        id: 1,
        input: "()",
        expectedOutput: "true",
      },
      {
        id: 2,
        input: "()[]{}",
        expectedOutput: "true",
      },
      {
        id: 3,
        input: "(]",
        expectedOutput: "false",
      },
      {
        id: 4,
        input: "([)]",
        expectedOutput: "false",
      },
      {
        id: 5,
        input: "{[]}",
        expectedOutput: "true",
      },
      {
        id: 6,
        input: "[",
        expectedOutput: "false",
      },
      {
        id: 7,
        input: "])",
        expectedOutput: "false",
      },
      {
        id: 8,
        input: "[[{{(())}}]]",
        expectedOutput: "true",
      },
      {
        id: 9,
        input: "{[()]}",
        expectedOutput: "true",
      },
      {
        id: 10,
        input: "{[(])}",
        expectedOutput: "false",
      },
    ],

    category: "Stack",

    starterCode: {
      cpp: `class Solution {
public:
    bool isValid(string s) {

    }
};`,

      c: `#include <stdbool.h>

bool isValid(char* s) {

}`,

      java: `class Solution {

    public boolean isValid(String s) {

    }

}`,

      javascript: `var isValid = function(s) {

};`,

      python: `class Solution:

    def isValid(self, s):

        pass`,
    },

    driverCode: {
      cpp: `#include <bits/stdc++.h>
using namespace std;

{{USER_CODE}}

int main() {

    string s;

    cin >> s;

    Solution obj;

    cout << (obj.isValid(s) ? "true" : "false");

    return 0;
}`,

      c: `#include <stdio.h>
#include <stdbool.h>

{{USER_CODE}}

int main() {

    char s[10005];

    scanf("%s", s);

    printf("%s", isValid(s) ? "true" : "false");

    return 0;
}`,

      java: `import java.util.*;

{{USER_CODE}}

public class Main {

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        String s = sc.next();

        Solution obj = new Solution();

        System.out.print(obj.isValid(s));

    }

}`,

      javascript: `{{USER_CODE}}

const fs = require("fs");

const s = fs.readFileSync(0, "utf8").trim();

console.log(isValid(s));`,

      python: `{{USER_CODE}}

s = input().strip()

obj = Solution()

print(str(obj.isValid(s)).lower())`,
    },

    solution: "",
  },
  {
    id: 4,

    title: "Palindrome Number",

    difficulty: "Easy",

    likes: [],

    dislikes: [],

    description:
      "Given an integer x, return true if x is a palindrome, and false otherwise.",

    examples: [
      {
        input: "121",
        output: "true",
        explanation: "121 reads the same forward and backward.",
      },
      {
        input: "-121",
        output: "false",
        explanation: "Negative numbers are not palindromes.",
      },
    ],

    constraints: ["-2^31 <= x <= 2^31 - 1"],

    testCases: [
      {
        id: 1,
        input: "121",
        expectedOutput: "true",
      },
      {
        id: 2,
        input: "-121",
        expectedOutput: "false",
      },
      {
        id: 3,
        input: "10",
        expectedOutput: "false",
      },
      {
        id: 4,
        input: "0",
        expectedOutput: "true",
      },
      {
        id: 5,
        input: "1221",
        expectedOutput: "true",
      },
      {
        id: 6,
        input: "12321",
        expectedOutput: "true",
      },
      {
        id: 7,
        input: "12345",
        expectedOutput: "false",
      },
      {
        id: 8,
        input: "1001",
        expectedOutput: "true",
      },
      {
        id: 9,
        input: "99",
        expectedOutput: "true",
      },
      {
        id: 10,
        input: "1010",
        expectedOutput: "false",
      },
    ],

    category: "Math",

    starterCode: {
      cpp: `class Solution {
public:
    bool isPalindrome(int x) {

    }
};`,

      c: `#include <stdbool.h>

bool isPalindrome(int x) {

}`,

      java: `class Solution {

    public boolean isPalindrome(int x) {

    }

}`,

      javascript: `var isPalindrome = function(x) {

};`,

      python: `class Solution:

    def isPalindrome(self, x):

        pass`,
    },

    driverCode: {
      cpp: `#include <bits/stdc++.h>
using namespace std;

{{USER_CODE}}

int main() {

    int x;

    cin >> x;

    Solution obj;

    cout << (obj.isPalindrome(x) ? "true" : "false");

    return 0;
}`,

      c: `#include <stdio.h>
#include <stdbool.h>

{{USER_CODE}}

int main() {

    int x;

    scanf("%d", &x);

    printf("%s", isPalindrome(x) ? "true" : "false");

    return 0;
}`,

      java: `import java.util.*;

{{USER_CODE}}

public class Main {

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        int x = sc.nextInt();

        Solution obj = new Solution();

        System.out.print(obj.isPalindrome(x));

    }

}`,

      javascript: `{{USER_CODE}}

const fs = require("fs");

const x = Number(
    fs.readFileSync(0, "utf8").trim()
);

console.log(isPalindrome(x));`,

      python: `{{USER_CODE}}

x = int(input())

obj = Solution()

print(str(obj.isPalindrome(x)).lower())`,
    },

    solution: "",
  },
  {
    id: 5,

    title: "Reverse Integer",

    difficulty: "Medium",

    likes: [],

    dislikes: [],

    description:
      "Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-2^31, 2^31 - 1], return 0.",

    examples: [
      {
        input: "123",
        output: "321",
        explanation: "Reverse the digits of 123.",
      },
      {
        input: "-123",
        output: "-321",
        explanation: "Reverse the digits while preserving the sign.",
      },
      {
        input: "120",
        output: "21",
        explanation: "Leading zeros after reversal are removed.",
      },
    ],

    constraints: ["-2^31 <= x <= 2^31 - 1"],

    testCases: [
      {
        id: 1,
        input: "123",
        expectedOutput: "321",
      },
      {
        id: 2,
        input: "-123",
        expectedOutput: "-321",
      },
      {
        id: 3,
        input: "120",
        expectedOutput: "21",
      },
      {
        id: 4,
        input: "0",
        expectedOutput: "0",
      },
      {
        id: 5,
        input: "1534236469",
        expectedOutput: "0",
      },
      {
        id: 6,
        input: "-2147483412",
        expectedOutput: "-2143847412",
      },
      {
        id: 7,
        input: "1463847412",
        expectedOutput: "2147483641",
      },
      {
        id: 8,
        input: "-1563847412",
        expectedOutput: "0",
      },
      {
        id: 9,
        input: "1000000003",
        expectedOutput: "0",
      },
      {
        id: 10,
        input: "10",
        expectedOutput: "1",
      },
    ],

    category: "Math",

    starterCode: {
      cpp: `class Solution {
public:
    int reverse(int x) {

    }
};`,

      c: `int reverse(int x) {

}`,

      java: `class Solution {

    public int reverse(int x) {

    }

}`,

      javascript: `var reverse = function(x) {

};`,

      python: `class Solution:

    def reverse(self, x):

        pass`,
    },

    driverCode: {
      cpp: `#include <bits/stdc++.h>
using namespace std;

{{USER_CODE}}

int main() {

    int x;

    cin >> x;

    Solution obj;

    cout << obj.reverse(x);

    return 0;
}`,

      c: `#include <stdio.h>

{{USER_CODE}}

int main() {

    int x;

    scanf("%d", &x);

    printf("%d", reverse(x));

    return 0;
}`,

      java: `import java.util.*;

{{USER_CODE}}

public class Main {

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        int x = sc.nextInt();

        Solution obj = new Solution();

        System.out.print(obj.reverse(x));

    }

}`,

      javascript: `{{USER_CODE}}

const fs = require("fs");

const x = Number(
    fs.readFileSync(0, "utf8").trim()
);

console.log(reverse(x));`,

      python: `{{USER_CODE}}

x = int(input())

obj = Solution()

print(obj.reverse(x))`,
    },

    solution: "",
  },
];

export default problems;
