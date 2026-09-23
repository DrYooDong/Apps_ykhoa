---
title: "Visualization"
part: "P1"
aliases:
  - "Visualization"
keywords:
  - "visualization"
  - "đại cương"
  - "06. thiết kế & trực quan y khoa"
specialty: "Đại cương"
kho: "2.2. Kho kỹ năng lâm sàng"
tags:
  - "he-co-quan/tong-quat"
  - "loai/skill"
  - "y-khoa/kn"
updated: "2026-08-21"
---

# Visualization

## 1. Introduction

This visualization can visualize the recursion tree of any recursive algorithm or the recursion tree of a Divide and Conquer (D&C) algorithm recurrence (e.g., Master Theorem) that we can legally write in JavaScript.

We can also visualize the Directed Acyclic Graph (DAG) of a Dynamic Programming (DP) algorithm and compare the dramatic search-space difference of a DP problem versus when its overlapping sub-problems are naively recomputed, e.g., [the exponential Ω(2n/2) recursive Fibonacci versus its O(n) DP version](https://visualgo.net/en/recursion/print?slide=4-1).

On some problems, we can also visualize the difference between what a Complete Search (recursive backtracking) that explores the entire search space, a greedy algorithm (that greedily picks one branch each time), versus Dynamic Programming look like in the same recursion tree, e.g., [Coin-Change](https://visualgo.net/en/recursion/print?slide=5-1) of v = 7 cents with 4 coins {4, 3, 1, 5} cents.

Most recursion trees require large drawing space, therefore view this visualization page on a large screen. For obvious reason, we cannot really visualize very big trees/DAGs. Therefore, we call our recursion with small parameter(s).

## 2. Recursion Tree

This is the Recursion Tree and Recursion Directed Acyclic Graph (DAG) visualization area. The Recursion Tree/DAG are drawn/animated as per how a real computer program that implements this recursion works, i.e., "depth-first".

The recursion starts from the initial state that is colored dark brown. The current parameter value is shown inside each vertex (comma-separated for recursion with two or more parameters). Active vertices will be colored orange. Vertices that are no longer calling any other recursive problem (the base cases) will be colored green. Vertices (subproblems) that are repeated will be colored lightblue for the second occurrence onwards. The return value of each recursive call is written as a red text below the vertex. This visualization is generic for any recursion that you can legally write in JavaScript.

Note that due to combinatorial explosion, it will be very hard to visualize the Recursion Tree for large instances.

### 2-1. Recursion DAG

For the Recursion DAG, it will also be very hard to minimize the number of edge crossings in the event of overlapping subproblems. However, we try our best to give a custom DAG drawing layout for certain DP problems to improve the presentation.

For example, we currently show the recursion DAG of the computation of the n-th Fibonacci number. We layout the vertices from leftmost (the two green-colored base cases n = 0 and n = 1) to rightmost (the initial n). Ideally this is shown as a flat 1-D (memoization) array. However as VisuAlgo does not have curvy edge yet, we decided to put odd-numbered vertices slightly below the even-numbered vertices to get around the overlapping edges issue. To compute fib(n), we only need to know the result of two immediate results: fib(n-1) + fib(n-2) that is depicted as the two arrows from vertex n to vertices n-1 and n-2. The results of the summation, i.e., the values of each fib(n), are displayed as red text below the vertices. As there is no repeated subproblem computation, there is no lightblue vertex at all in this recursion DAG (such vertices/states will have more than one incoming arrows instead).

## 3. Example Recursion - One Subproblem

Select one of the example recursive algorithms in the drop-down list or write our own recursive code — in JavaScript. The final recursion Tree / DAG is immediately displayed. Note that this visualization can run _any_ JavaScript code, including malicious code, so please be careful (it will only affect your own web browser, don't worry).

Click the 'Run' button at the top right corner of the action box to start the step-by-step visualization of the recursive function after you have selected (or written) a valid JavaScript code!

In the next sub-sections, we start with example recursive algorithms with just one sub-problem, i.e., not branching. For these one-subproblem examples, their recursion trees and recursion DAGs are 100% identical (they looked like Singly Linked Lists from the root (initial call) to the leaf (base case)). As there is no overlapping subproblem for the examples in this category, you will not see any lightblue-colored vertex and only one green-colored vertex (the base case). The default orientation for recursion Tree is top-right-to-bottom-left whereas the default orientation for recursion DAG is right-to-left.

### 3-1. Factorial Numbers

The Factorial Numbers example computes the factorial of an integer n.

f(n) = 1 (if n == 0);  
f(n) = n*f(n-1) otherwise  
  

It is one of the simplest (tail) recursive function that can be easily rewritten into an iterative version. It's time complexity is also simply Θ(n).

The value of Factorial f(n) grows very fast, thus try only the small integers n ∈ [0..10]  
(we randomize the value of the initial n between this range).

### 3-2. Binary Search

The Binary Search example finds the index of a2 in a sorted array a1[a..b]. We start binary search from the initial search space of a=0,b=a1.length-1 (the entire array a1, with n = (a1.length-1) - 0 + 1 = a1.length).

f(a,b) = -1 (if a > b);  
let mid = floor((a+b)/2);  
f(a,b) = mid (if a2 = a1[mid]);  
f(a,b) = f(a,mid-1) (if a2 < a1[mid]);  
f(a,b) = f(mid+1,b) (if a2 > a1[mid]);  
  

Only one of the two possible branches will be executed each time, resulting in a recursion tree = recursion DAG situation. The time complexity if Θ(log n) as we keep halving the search space each time. The worst-case happens when a2 is not found in sorted array a1.

In this visualization, we randomize the content of sorted array a1 and the value to be searched a2.

TBC: In the near future, we will draw the entire Θ(n) search space (both left and right branches at each vertex) and highlight the efficient Θ(log n) path taken by Binary Search on this search space. This is like seeing the animation of [Search(v) function of a (balanced) Binary Search Tree](https://visualgo.net/en/recursion/bst).

### 3-3. Modulo Power

The Modulo Power example computes the a1^p % a2 in efficient way.

f(p) = 1 (if p == 0);  
f(p) = f(floor(p/2))^2 % a2 (if p is even)  
f(p) = f(floor(p/2))^2 * a1 % a2 (if p is odd)  
  

This Divide & Conquer (D&C) algorithm runs in Θ(log p).

In this visualization, we randomize the values of a1 (the base, a small value ∈ [2..4]),  
a2 (the modulo, a prime ∈ [7, 97, 997, 9973]), and power p (we want to raise a1 to its p-th power, modulo a2. Due to its low time complexity, it is OK to try very large 0 ≤ p ≤ 256.

TBC: In the near future, we may draw the comparison between this efficient D&C modulo power algorithm with the naive version that multiply a1 p times that runs in Θ(p).

### 3-4. Greatest Common Divisor (GCD)

The Greatest Common Divisor (GCD) example computes the GCD of two integers a and b.

f(a, b) = a (if b == 0);  
f(a, b) = f(b, a%b) otherwise  
  

This is the classic Euclid's algorithm that runs in O(log n) where n = min(a, b) — depending of the details, n = max(a, b) or n = a+b are also possible.

Euclid's algorithm is an example of Divide & Conquer (D&C) algorithm.

Due to its low time complexity, it should be OK to try 0 ≤ a, b ≤ 99.  
(we randomize the values of a and b between this range and set a ≥ b).  
Note that if we put a < b, technically the first recursive step will swap a and b.

Do explore various possible combinations of a and b and notice on what values f(a, b) terminates very quickly in 1 step (b = 0), 2 steps (b = gcd(a, b)), or the maximum number of steps (try [this sequence](https://visualgo.net/en/recursion/print?slide=4-1)) — to show the lowerbound Ω(log n).

### 3-5. Max Range Sum

The Max Range Sum example computes the value of the subarray with the maximum total sum inside the given (global) array a1 with n = a1.length integers (the first textbox below the code editor textbox). The value of a1 can be positive integers, zeroes, or negative integers (without negative integer, the answer will obviously the sum of the entire integers in a1).

Formally, let's define RSQ(i, j) = a1[i] + a1[i+1] + ... + a1[j], where 0 ≤ i ≤ j ≤ n-1 (RSQ stands for Range Sum Query). Max Range Sum problem seeks to find the optimal i and j such that RSQ(i, j) is the maximum.

f(i) = max(ai[0], 0) (if i == 0, as ai[0] can be negative);  
f(i) = max(f(i-1) + ai[i], 0) otherwise  
  

We call f(n-1). The largest value of f(i) is the answer.

This is the classic [Kadane's algorithm](https://en.wikipedia.org/wiki/Maximum_subarray_problem#Kadane) that runs in O(n).

### 3-6. Catalan Numbers

The Catalan example computes the **n**-th [Catalan number](https://en.wikipedia.org/wiki/Catalan_number) recursively.

f(n) = 1 (if n == 0);  
f(n) = f(n-1)*2*n*(2*n-1)/(n+1)/n; otherwise  
  

This explanation is a stub that will be expanded later.

## 4. Example Recursion - Two Subproblems

In the next sub-sections, we will see example recursive algorithms that have exactly two sub-problems, i.e., branching. The sizes of the subproblems can be identical or vary. For these two sub-problems examples, their recursion trees will usually be much bigger that their recursion DAGs (especially if there are (many) overlapping sub-problems, indicated with the lightblue vertices on the recursion tree drawing).

Currently shown on screen is the recursion tree of a Fibonacci recurrence.

### 4-1. Fibonacci Numbers (Tree)

The Fibonacci Numbers example computes the n-th Fibonacci number.

f(n) = n (if n <= 1); // i.e., 0 if n == 0 or 1 if n == 1  
f(n) = f(n-1) + f(n-2) otherwise  
  

Unlike [Factorial](https://visualgo.net/en/recursion/print?slide=3-1) example, this time each recursive step recurses to two other smaller sub-problems (if we call f(n-1) first before f(n-2), then the left side of the recursion tree will be taller than the right side — try swapping the two sub-problems).

The value of Fibonacci f(n) grows very fast and its recursion tree — if implemented verbatim as defined above — also grows exponentially, i.e., at least Ω(2n/2), thus try only the small initial values of n ≤ 7 (to avoid crashing your web browser).

Fibonacci recursion tree is frequently used to showcase the basic idea of recursion, its inefficiency (due to the many overlapping subproblems), and the linkage to Dynamic Programming (DP) topic.

### 4-2. Fibonacci Numbers (DAG)

The recursion DAG (shown in the background) of Fibonacci computation only contains O(n) vertices and thus can go to a larger n ≤ 30 (so it still looks nice in this visualization; in practice n can go to millions with this DP solution).

Most of the time, the Fibonacci computation is written in iterative fashion after one understands the concept of DP.

It is probably rare to think this way, but this visualization shows that the computation of Fibonacci f(n) is basically counting the number of paths from n to vertex 1.

### 4-3. Binomial Coefficient C(n, k) (Tree)

The C(n, k) example computes the [binomial coefficient](https://en.wikipedia.org/wiki/Binomial_coefficient) C(n, k).

f(n, k) = 1 (if k == 0); // 1 way to take nothing out of n items  
f(n, k) = 1 (if k == n); // 1 way to take everything out of n items  
f(n, k) = f(n-1, k-1) + f(n-1, k) // take the last item or skip it  
  

The recursion tree of C(n, k) grows very fast, with the largest tree when k = n/2, smaller trees when k is close to 0 or n (a few path(s) with short leafs), and smallest trees when k is 0 or n (only one vertex).

### 4-4. Binomial Coefficient C(n, k) (DAG)

The recursion DAG of C(n, k) is basically an inverted [Pascal's Triangle](https://en.wikipedia.org/wiki/Pascal%27s_triangle). It only contains O((n/2)*(n/2)) = O(n^2/4) vertices at most (when k = n/2) although in practice we probably just use a DP/memo table of size O(n^2). Thus we can go to a larger n ≤ 15 (so it still looks nice in this visualization) and k∈[0..n], including when k≈n/2.

TBC: In the near future, we may draw a dummy vertex (0, 0) --- C(n, k) will not actually reach it unless started from C(0, 0) with return value of 1 to complete the inverted Pascal's Triangle visualization.

### 4-5. 0-1 Knapsack (Tree)

The 0-1 Knapsack example solves the [0/1 Knapsack Problem](https://en.wikipedia.org/wiki/Knapsack_problem#0.2F1_knapsack_problem): What is the maximum value that we can get, given a knapsack that can hold a maximum weight of w, where the value of the i-th item is a1[i], the weight of the i-th item is a2[i]?

0-1 Knapsack has a classic DP recurrence f(i, w) which we call using f(n-1, max-w) where n = a1.length.

f(i, w) = f(i-1, w); // ignore item i (always possible)  
f(i, w) = a1[i] + f(i-1, w-a2[i]); // take item i (if a2[i]≤w)  
f(<0, w) = 0; // all items have been considered  
f(i, 0) = 0; // cannot carry anything else  
  

The recursion tree of this DP recurrence has a few (like currently shown on screen) to many (e.g., try all items having the same weight, i.e., ones) overlapping sub-problems.

### 4-6. 0-1 Knapsack (DAG)

The recursion DAG of 0-1 Knapsack only contains O(n * max-w) vertices. Thus we can go to a larger n ≤ 7 and max-w ≤ 15 (so it still looks nice in this visualization).

This DP recurrence basically tries to find the longest (weighted) path in this implicit DAG and has time complexity of O(n * max-w).

If the weights of each item in a2 vary a lot, the recursion DAG will look sparse. Try setting a2=[1,2,...,2^i] for a denser recursion DAG (but no overlap) or a2=[1,1,...,1] (lots of overlap).

## 5. Example Recursion - Many Subproblems

In the next sub-sections, we will see example recursive algorithms that have many sub-problems (1, 2, 3, ..., a certain limit). For many of these examples, the sizes of their Recursion Trees are exponential and we will really need to use Dynamic Programming to compute its Recursion DAGs instead.

### 5-1. Longest Inc Subseq (LIS) (DAG)

The Longest Increasing Subsequence example solves the [Longest Increasing Subsequence](https://en.wikipedia.org/wiki/Longest_increasing_subsequence) problem: Given an array a1, how long is the Longest Increasing Subsequnce of the array?

The recursion DAG of the default example (not randomized) is as follows: Vertex j ∈ [0..i-1] is laid out horizontally (along the x-axis from left/vertex 0 to right/vertex i-1), then placed vertically (along the y-axis according to the value of a1[j]). We draw an edge between two indices j and k if a1[j] < a1[k] (with all vertices having hidden edge to the dummy max(a1)+1 value at the top-right cell so that all LIS ends at this dummy vertex and we can start the recursion with f(i) where i = a1.length-1). Then this LIS problem can be visualized as finding the longest path in this (implicit) recursion DAG.

As there are **|V| = n** vertices and **|E| = O(n^2)** edges (use sorted ascending test case, e.g., {1,2,4,8,16,...} to have nice visualization), the overall time complexity to solve LIS using DP is O(**n^2**). Since early 2000s, we should use the faster O(**n log k**) greedy+binary search solution for LIS (not explained in this slide).

### 5-2. Coin Change (Tree)

The Coin Change example solves the [Coin Change problem](https://en.wikipedia.org/wiki/Change-making_problem): Given a list of coin values in a1, what is the minimum number of coins needed to get the value v?

The recursion tree of the default example (not randomized) has v = 7 cents and 4 coins that are specifically selected to be {4, 3, 1, 5}. What is shown on-screen is the entire recursion tree of Coin-Change recursive function.

A typical greedy algorithm for Coin-Change that always take the largest coin value that does not exceed current value v will be trapped into taking the rightmost branch: 7 cents (take 5 cents coin) → 2 cents (take 1 cent coin) → 1 cent (take another 1 cent coin) → 0 (total 3 coins).

DP algorithm that explores this recursion tree (but avoiding repeated computations on the lightblue vertices will find the lefmost branch: 7 cents (take 4 cents coin) → 3 cents (take 3 cents coin) → 0 (total 2 coins). Alternative solution: 7 → 4 → 0 (also 2 coins).

### 5-3. Cutting Rod (Tree)

The Cutting Rod example solves the 'fictional' introductory problem in Chapter 14.1 - Dynamic Programming of the "Introductions to Algorithms" (CLRS 4th edition) textbook: Given a rod of length n inches and a table of prices a1 for length 1,2,...,n inches, determine the maximum revenue obtainable by cutting up the rod and selling the pieces.

The recursion tree of the default example (not randomized) has n = 4 inches. What is shown on-screen is the entire recursion tree of Cut-Rod recursive function.

f(n) = max(a1[i-1] + f(n-i)) ∀i∈[1..n];  
f(0) = 0; // cannot cut anymore

### 5-4. Matrix Chain Mult (Tree)

The Matrix Chain Mult(iplication) example solves the second DP introductory problem in Chapter 14.2 of the "Introductions to Algorithms" (CLRS 4th edition) textbook: Given a sequence (chain) of n = a1.length-1 matrices to be multiplied, where the matrices aren't necessarily square, compute the product A1*A2*...*An using the standard O(p*q*r) algorithm for multiplying rectangular matrices, while minimizing the number of scalar multiplications.

The recursion tree of the default example (not randomized) has i=1,j=4. What is shown on-screen is the entire recursion tree of MCM recursive function.

f(i,j) = min(f(i,k)+f(k+1,j)+a1[i-1]*a1[k]*a1[j]) ∀i≤k<j;  
f(i,j) = 0 if i == j; // no need to multiply a single matrix

### 5-5. Longest Common Subseq (LCS) (Tree)

The Longest Common Subsequence (LCS) example solves the [Longest Common Subsequence](https://en.wikipedia.org/wiki/Longest_common_subsequence) problem: Given two strings (character arrays) a1 (of length n = a1.length) and a2 (of length m = a2.length), how long is the Longest Common Subsequence between the two strings?

f(n, m) = 1 + f(n-1, m-1); // if a1[n] == a2[m]; last char matches  
f(n, m) = max(f(n-1, m), f(n, m-1)) // if last char differs  
f(n, <0) = 0; // a2 is empty  
f(<0, m) = 0; // a1 is empty  
  

We call f(n-1, m-1), from the last character of both strings.

The recursion tree of this DP recurrence has an exponential (like currently shown on screen) number of overlapping sub-problems if both strings have many different characters (but do try a1 == a2; we will see a single-branch recursion tree).

### 5-6. Longest Common Subseq (LCS) (DAG)

The recursion DAG of LCS only contains O(n * m) vertices. Thus we can use longer strings with n ≤ 10 and m ≤ 10 (so it still looks nice in this visualization).

This DP recurrence basically tries to find the longest (0/1-weighted) path in this implicit DAG and has time complexity of O(n * m).

### 5-7. Graph Matching

The Graph Matching problem computes the maximum number of [matching](https://en.wikipedia.org/wiki/Matching_\(graph_theory\)) on a **small** graph, which is given in the adjacency matrix a1.

This slide is a stub and will be expanded in the future.

### 5-8. Traveling Salesperson Problem (TSP)

The Traveling Salesperson example solves the [Traveling Salesperson Problem](https://en.wikipedia.org/wiki/Travelling_salesman_problem) on small graph: How long is the shortest path that goes from city 0, passes through every city once, and goes back again to 0? The distance between city i and city j is denoted by a1[i][j].

This slide is a stub and will be expanded in the future.

## 6. Example D&C Recurrences

In the next sub-sections, instead of visualizing the recursion tree of a recursive algorithm, we visualize the recursion tree of the recurrence (equation) to help analyze the time complexity of certain Divide and Conquer (D&C) algorithms.

The value computed by f(n) (the red label underneath each vertex that signifies the return value of that recursive function/that subproblem) is thus the **total** number of operations taken by that recursive algorithm when its problem size is n (the value drawn inside each vertex). Most textbooks will say the function name of this recurrence as T(n), but we choose not to change our default f(n) function name that is used in all other recursive algorithm visualizations. Some other textbooks (e.g., CLRS) also put the cost of each vertex only, not the cost of the entire subproblem.

### 6-1. Merge Sort Analysis (1)

In [Sorting](https://visualgo.net/en/recursion/sorting?slide=11-8) visualization, we learn about merge sort. It's time complexity recurrences are:

f(n) = Θ(1) (if n < n0) — we usually assume that the base cases are Θ(1)  
f(n) = f(n/2) + f(n/2) + c*n (otherwise)  
  

Please check the recursion tree of the default example (n = 16). We will use the same recursion tree for the next few sub-slides. You should see the initial problem size of n = 16 written inside the root vertex and its return value (total amount of work done by f(16) is 32+32+1*16 = 80). This value of f(n) is consistent throughout the recursion tree, e.g., f(8) = f(4)+f(4)+1*4 = 12+12+1*8 = 32.

### 6-2. Analysis (2)

We see that  
the height of  
this recursion tree  
is log2 n  
as we keep  
halving n by 2  
until we reach  
the base case  
of size 1.

For n = 16, we have  
16->  
8->  
4->  
2->  
1 (log2 16 = 4 steps).

PS: height of tree =  
the number of edges  
from root to  
the deepest leaf.

### 6-3. Analysis (3)

As the effort done in the recursive step per subproblem of size n is c*n (the divide (trivial, Θ(1)) and the conquer (merge) operation, the Θ(n)), we will perform exactly c*n operations per each recursion level of **this** specific recursion tree.

The root of size (n) does c*n operations during the merge step.  
The two children of the root of size (n/2) both do c*n/2, and 2*c*n/2 = c*n too.  
The grandchildren level is 4*c*n/4 = c*n too.  
And so on until the last level (the leaves).

As the red label underneath each vertex in this visualization reports the value of the entire subproblem (including the subtrees below), these identical costs per level are not easily seen, e.g., from root to leaf, we see 80, 2x32 = 64, 4x12 = 48, 8x4 = 32, 16x1 = 16 and may get different conclusion... However, if we discounted the values of its subproblems, we will get the same conclusion, e.g., for the root, we do 80-2x32 = 16 operations, for the children of the root, we do 2x(32-2x12) = 2x8 = 16 operations too, etc.

Soon, we will show 'work-done-in-each-level' info in the visualization directly.

### 6-4. Analysis (4)

The number of green leaves is 2log2 n = nlog2 2 = n.

Each of these leaf does Θ(1) step, thus the total work of the last (leaf) level is also Θ(n).

The total work done by Merge sort is thus c*n per level, multiplied by the height of the recursion tree (log2 n + 1 more for the leaves), or Θ(n log n).

For this example, f(16) = 80 from 1x16 x (log2 16 + 1) = 16 x (4 + 1) = 16 x 5 = 80.

### 6-5. (Non-Randomized) Quick Sort Analysis

In [Sorting](https://visualgo.net/en/recursion/sorting?slide=12-12) visualization, we also learn about the non-random(ized) quick sort.

It may have a worst case behavior of O(n2) on certain kind of (trivial) instances of (nearly-) sorted input and it may have the following time complexity recurrence (with a = 1):

f(n) = Θ(1) (if n < n0) — we usually assume that the base cases are Θ(1)  
f(n) = f(n-a) + f(a) + c*n (otherwise)  
  

Note that writing the recurrence in the other direction does not matter much asymptotically, other than the recursion tree will be mirrored.

Please observe the currently drawn recursion tree.  
We want to show that this recursion tree has f(n) = O(n2).

### 6-6. Analysis (2)

We see that  
the height of  
this recursion tree  
is rather tall, i.e., n/a - 1  
as we only reduces n  
by a per level.  
Thus, we need n/a - 1 steps  
to reach the base case  
(n = 1).

For n = 16, a = 1, we have  
16->  
15->  
14->  
...->  
2->  
1 (16/1 - 1 = 15 steps).

### 6-7. Analysis (3)

As the effort done in the recursive step per subproblem of size n is c*n (divide (the partition) operation in Θ(n); the conquer step is trivial — Θ(1)), we will perform exactly c*n operations per each recursion level.

The root of size (n) does c*n operations during the partition step.  
The children of the root of size (n-a) does c*(n-1) and the other does f(a).  
The grandchildren level does c*(n-2) and the other does f(a).  
And so on until the last level (the leaves both does f(a)).

### 6-8. Analysis (4)

The total work done by Quick sort on this worst-case input is the sum of arithmetic progression series of 1+2+...+n plus a few other constant factor operations (all the f(a) are Θ(1)). This simplifies to f(n) = Θ(n2).

### 6-9. Master Theorem, Case 1 (1)

For recurrences of the form:

f(n) = a*f(n/b) + g(n)  

where a ≥ 1, b > 1, and g(n) is asymptotically positive,  
we maybe able to apply the master theorem (also called as master method).  
PS: In this visualization, we have to rename CLRS function names to our convention:  
f(n) → g(n) and T(n) → f(n).

We compare the driving function g(n) (the amount of divide and conquer work in each recursive step of size n) with nlogba (the watershed function — also the asymptotic number of leaves of the recursion tree), if g(n) = O(nlogba-ε) for ε > 0, it means that the driving function g(n) grows polynomially slower than the watershed function nlogba (by a factor of nε), thus the watershed function nlogba will dominate and the solution of the recurrence is f(n) = θ(nlogba).

Visually, if you see the recursion tree for recurrence that falls into case 1 category, the cost per level grows exponentially from root level to the leaves (in this picture, 1*4*4 = 16, 7*2*2 = 28, 49*1*1 = 49, ..., 16+28+49 = 93), and the total cost of the leaves dominates the total cost of all internal vertices.

### 6-10. Case 1 (2)

The most popular example is [Strassen's algorithm for matrix multiplication](https://en.wikipedia.org/wiki/Strassen_algorithm) where case 1 of master theorem is applicable. The recurrence is: f(n) = 7*f(n/2) + c*n*n.

Thus a = 7, b = 2, watershed = nlog2 7 = n2.807, driving = g(n) = Θ(n2).

n2 = O(n2.807-ε) for ε = 0.807... — case 1 — Thus f(n) = Θ(n2.807)  
  

Exercise: You can try changing the demo code by setting a = 8 and set g(n) = c*1 to change the recurrence of Strassen's algorithm to the recurrence of the simple recursive matrix multiplication algorithm that has f(n) = Θ(n3).

### 6-11. Master Theorem, Case 2

The detailed analysis of the Merge sort algorithm from [a few slides earlier](https://visualgo.net/en/recursion/print?slide=6-1) can be simplified using master theorem, e.g., f(n) = 2*f(n/2) + c*n.

Thus a = 2, b = 2, watershed = nlog2 2 = n, driving = g(n) = Θ(n).  
n = Θ(n logk n) for k = 0  
The watershed and driving functions have the same asymptotic growth — case 2  
Thus f(n) = Θ(n log n).

Visually, if you see the recursion tree for recurrence that falls into case 2 category, the cost per level is ~the same, i.e., Θ(nlogba logk n) and there are logb n levels. We claim that the solution is f(n) = Θ(nlogba logk+1 n). That's it, the solution of the recurrence that falls under case 2 is to add an extra log factor to g(n).

Exercise: You can try changing the demo code by setting a = 1 and set g(n) = c*1 to change the recurrence of Merge sort algorithm to the recurrence of the binary search algorithm. For binary search version, f(n) = Θ(log n). Notice that for most of real-life case 2 algorithm recurrences (e.g., Merge Sort and Binary Search), k = 0.

### 6-12. Master Theorem, Case 3

Case 3 is the opposite of Case 1, where the driving function g(n) grows polynomially faster than the watershed function nlogba. Thus the bulk of the operations is done by the driving function at the root level (but check the regularity condition too, to be elaborated below). This case 3 is actually rarely appear in real algorithms so we use an example fictional recurrence: f(n) = 4*f(n/2) + c*n^3.

Thus a = 4, b = 2, watershed = nlog2 4 = n2, driving = g(n) = Θ(n3).  
n^3 = Ω(n2+ε) for ε = 1 and  
4*(n/2)3 ≤ c*n3 (regularity condition) for c = 1/2 — case 3  
Thus f(n) = Θ(n3).

Visually, if you see the recursion tree for recurrence that falls into case 3 category, the cost per level **drops** exponentially from root level to the leaves (in this picture, 1*4*4*4 = 64, 4*2*2*2 = 32, 16*1*1*1 = 16, ..., 64+32+16 = 112), and the total cost of the root dominates the total cost of all other internal vertices (including the (many) leaves).