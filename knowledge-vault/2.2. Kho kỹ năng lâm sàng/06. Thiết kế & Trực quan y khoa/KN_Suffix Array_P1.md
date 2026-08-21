---
title: "Suffix Array"
part: "P1"
aliases:
  - "Suffix Array"
keywords:
  - "suffix array"
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

# Suffix Array

## 1. Introduction

**Suffix Array** is a sorted array of all suffixes of a given (usually long) text string **T** of length **n** characters (**n** can be in order of hundred thousands characters).

Suffix Array is a simple, yet powerful data structure which is used, among others, in full text indices, data compression algorithms, and within the field of bioinformatics.

This data structure is very related to the [Suffix Tree](https://visualgo.net/en/suffixarray/suffixtree) data structure. Both data structures are usually studied together.

## 2. Suffix Array Visualization

The visualization of Suffix Array is simply a table where each row represents a suffix and each column represents the attributes of the suffixes.

The four (basic) attributes of each row **i** are:

1. index i, ranging from 0 to **n**-1,
2. SA[i] is the i-th lexicographically smallest suffix of **T** is the SA[i]-th suffix  
    The SA values (permutation of [0..**n**-1]) is the one that we need to compute _fast_,
3. LCP[i] is the Longest Common Prefix between the i-th and the (i-1)-th lexicographically smallest suffixes of **T** is LCP[i]  
    The LCP values also need to be computed _fast_ and we will see the application of this attribute soon, and
4. Suffix T[SA[i]:] is the i-th lexicographically smallest suffix of **T** is from index SA[i] to the end (index **n**-1)  
    We do _not_ actually compute these suffixes (it is very slow to do so) and these sorted suffixes are only in this visualization to aid quick understanding of the Suffix Array (and LCP) algorithms.

Some operations may add more attributes to each row and are explained when that operations are discussed.

## 3. Available Operations

All available operations on the Suffix Array are listed below.

1. **Construct Suffix Array (SA)** is the O(**n** log **n**) Suffix Array construction algorithm based on the idea by Karp, Miller, & Rosenberg (1972) that sort prefixes of the suffix in increasing length (1, 2, 4, 8, ...).
2. **Search** utilizes the fact that the suffixes in Suffix Array are sorted and call two binary searches in O(**m** log **n**) to find the first and the last occurrence(s) of pattern string **P** of length **m**.
3. **Longest Common Prefix (LCP)** between two adjacent suffixes (excluding the first suffix) can be computed in O(**n**) using the Permuted LCP (PLCP) theorem. The name of this algorithm is Kasai's algorithm.
4. **Longest Repeated Substring (LRS)** is a simple O(**n**) algorithm that finds the suffix with the highest LCP value.
5. **Longest Common Substring (LCS)** is a simple O(**n**) algorithm that finds the suffix with the highest LCP value that comes from two different strings.

### 3-1. Construct Suffix Array - UI

In this visualization, we show the proper O(**n log n**) construction of Suffix Array based on the idea of Karp, Miller, & Rosenberg (1972) that sort prefixes of the suffix in increasing length (1, 2, 4, 8, ...), a.k.a. the prefix doubling algorithm.

We limit the input to only accept up to 12 (cannot be too long due to the available drawing space — but in the real application of Suffix Tree, **n** can be in order of hundred thousand to million characters) UPPERCASE (we delete your lowercase input) alphabet and the special terminating symbol '$' characters (i.e., [A-Z$]). If you do not write a terminating symbol '$' at the back of your input string, we will automatically do so. If you place character '$' in the middle of the input string, it will be ignored. And if you enter an empty input string, we will resort to the default "GATAGACA$".

For convenience, we provide a few classic test case input strings usually found in Suffix Tree/Array lectures, but to showcase the strength of this visualization tool, you are encouraged to enter any up-to-12-characters string of your choice (ending with '$').

Note that the LCP Array column remains empty in this operation. They are to be computed separately via the Longest Common Prefix operation.

### 3-2. The Prefix Doubling Algorithm

This Prefix Doubling Algorithm runs in O(**log n**) iterations, where for each iteration, it compares substring T[SA[i]:SA[i+k]] with T[SA[i+k]:SA[i+2*k]], i.e., in layman's terms: first compare two pairs of characters, then compare first two characters with the next two, then compare the first four characters with the next four, and so on.

This algorithm is best explored via visualization, see ConstructSA("GATAGACA$") in action (it is advisable that you exit this e-Lecture mode, run the algorithm in exploration mode, pause the algorithm and replay it frame-by-frame as there are too many elements changing especially during the first sorting iteration).

Time complexity: There are O(**log n**) prefix doubling iterations, and each iteration we call O(**n**) Radix Sort, thus it runs in O(**n log n**) — good enough to handle up to **n ≤ 200K** characters in typical programming competition problems involving long strings.

### 3-3. Search

After we construct the Suffix Array of **T** in O(**n log n**), we can search for the occurrence of Pattern string **P** in O(**m log n**) by binary searching the sorted suffixes to find the lower bound (the first occurrence of **P** as a prefix of any suffix of **T**) and the upper bound positions (the last occurrence of **P** as a prefix of any suffix of **T**).

Time complexity: O(**m log n**) and it will return an interval of size **k** where **k** is the total number of occurrences.

For example, on the Suffix Array of **T** = "GATAGACA$" above, try these scenarios:

1. **P** returns a range of rows: Search("GA"), occurrences = {4, 0}
2. **P** returns one row only: Search("CA"), occurrences = {2}
3. **P** is not found in **T**: Search("WONKA"), occurrences = {NIL}

PS: There is a slightly faster O(**m+log n**) variant that has not been visualized yet.

### 3-4. Longest Common Prefix (LCP) - Part 1

We can compute the Longest Common Prefix (LCP) of two adjacent suffixes (in Suffix Array order) in O(n) time using three phases of Kasai's algorithm. This algorithm takes advantage that if we have a long LCP between two adjacent suffixes (in Suffix Array order), that long LCP has lots of overlap with another suffix in positional order when its first character is removed.

The first phase: Compute the value of Phi[], where Phi[SA[i]] = SA[i-1] in O(**n**). This is to help the algorithm knows in O(**1**) time of which Suffix is behind Suffix-SA[i] in Suffix Array order. Try LCP("GATAGACA$") and focus on the first part on filling column Phi[] (it is advisable that you exit this e-Lecture mode, run the algorithm in exploration mode, pause the algorithm and replay it frame-by-frame as there are too many elements changing).

### 3-5. Longest Common Prefix (LCP) - Part 2

The second phase: Compute the PLCP[] values between a Suffix-i in positional order with Suffix-Phi[i] (the one behind Suffix-i in Suffix Array order). When we advance to the next index i+1 in positional order, we will remove the front most character of the suffix, but possibly retain lots of LCP value between Suffix-(i+1) and Suffix-Phi[(i+1)].

PLCP Theorem (not proven) shows that the LCP values can only be incremented up to **n** times, and thus can only be decremented at most **n** times too, making the overall complexity of the second phase to be also O(**n**).

Now, retry LCP("GATAGACA$") again and focus on the middle part on filling column PLCP[] (again, it is advisable that you exit this e-Lecture mode, run the algorithm in exploration mode, pause the algorithm and replay it frame-by-frame as there are too many elements changing).

### 3-6. Longest Common Prefix (LCP) - Part 3

The third phase: We compute the value of LCP[], where LCP[i] = PLCP[SA[i]] in O(**n**). This LCP values are the one that we use for other Suffix Array applications later.

Finally, retry LCP("GATAGACA$") again and focus on the last part on filling column LCP[] (as usual, exit this e-Lecture mode, run the algorithm in exploration mode, pause the algorithm and replay it frame-by-frame as there are too many elements changing).

Time complexity: Kasai's algorithm utilizes the PLCP theorem where the total number of increase (and decrease) operations of the value of the LCP is at most O(**n**). Thus Kasai's algorithm runs in O(**n**) overall. Thus, the combination of O(**n log n**) Suffix Array construction (via the Prefix Doubling algorithm) and the O(**n**) computation of LCP Array using this Kasai's algorithm is good enough to handle up to **n ≤ 200K** characters in typical programming competition problems involving long strings.

### 3-7. Longest Repeated Substring (LRS)

After we construct the Suffix Array of **T** in O(**n log n**) and compute its LCP Array in O(**n**), we can find the Longest Repeated Substring (LRS) in **T** by simply iterating through all LCP values and reporting the largest one.

This is because each value LCP[i] the LCP Array means the longest common prefix between two lexicographically adjacent suffixes: Suffix-i and Suffix-(i-1). This corresponds to an internal vertex of the equivalent Suffix Tree of **T** that branches out to at least two (or more) suffixes, thus this common prefix of these adjacent suffixes are **repeated**.

The longest common (repeated) prefix is the required answer, which can be found in O(**n**) by going through the LCP array once.

Without further ado, try LRS("GATAGACA$"). We have LRS = "GA".

It is possible that **T** contains more than one LRS, e.g., try LRS("BANANABAN$").  
We have LRS = "ANA" (actually overlap) or "BAN" (without overlap).

### 3-8. Longest Common Substring (LCS)

After we construct the generalized Suffix Array of the concatenation of both strings **T1$T2#** of length **n = n1+n2** in O(**n log n**) and compute its LCP Array in O(**n**), we can find the Longest Common Substring (LCS) in **T** by simply iterating through all LCP values and reporting the largest one that comes from two different strings.

Without further ado, try LCS("GATAGACA$", "CATA#") on the generalized Suffix Array of string **T1** = "GATAGACA$" and **T2** = "CATA#". We have LCS = "ATA".

## 4. Implementation

You are allowed to use/modify our implementation code for fast Suffix Array+LCP: [sa_lcp.cpp |](https://github.com/stevenhalim/cpbook-code/blob/master/ch6/sa_lcp.cpp) [py](https://github.com/stevenhalim/cpbook-code/blob/master/ch6/sa_lcp.py) | [java](https://github.com/stevenhalim/cpbook-code/blob/master/ch6/sa_lcp.java) | [ml](https://github.com/stevenhalim/cpbook-code/blob/master/ch6/sa_lcp.ml) to solve programming contest problems that need it.