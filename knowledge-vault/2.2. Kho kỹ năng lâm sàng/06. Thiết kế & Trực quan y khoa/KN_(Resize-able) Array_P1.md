---
title: "(Resize-able) Array"
part: "P1"
aliases:
  - "(Resize-able) Array"
keywords:
  - "(resize-able) array"
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

# (Resize-able) Array

## 1. Introduction

Visualization of one of the simplest data structure in Computer Science: **Array** (and its sorted form) surprisingly has not been done in VisuAlgo since its inception 2011-January 2024...

Stay tuned while we improve this page and its features.

## 2. Motivation

(Compact) Array is among the easiest and the most versatile data structure in Computer Science. Array is built-in almost all programming languages, e.g., C++, Python ('array' is called as 'list' in Python), Java, etc.

We can use (Compact) Array to implement List ADT.

We can use (Compact) Array to solve many classic problems. When not being used as a List ADT implementation (where positional order matters), it is often beneficial to first [sort](https://visualgo.net/sorting) the elements first so that we can utilize faster algorithms.

### 2-1. List ADT

Please see [List ADT](https://visualgo.net/en/array/list?slide=2-1) overview.

### 2-2. Array Implementation (Part 1)

(Compact) Array is a good candidate for implementing the List ADT as it is a simple construct to handle a collection of items.

When we say compact array, we mean an array that has **no gap**, i.e., if there are **N** items in the array (that has size **M**, where **M ≥ N**), then only index [0..**N**-1] are occupied and other indices [**N**..**M**-1] should remain **empty**.

![Compact Array Illustration](https://visualgo.net/img/compactarray_illustration.png)

### 2-3. Array Implementation (Part 1)

Let the **compact** array name be A with index [0..**N**-1] occupied with the items of the list.

get(i), just return A[i].  
This simple operation will be unnecessarily complicated if the array is **not** compact.

search(v), we check each index i ∈ [0..**N**-1] one by one to see if A[i] == v.  
This is because v (if it exists) can be anywhere in index [0..**N**-1].  
Since this visualization only accept distinct items, v can only be found at most once.  
In a general List ADT, we may want to have search(v) returns a list of indices.

insert(i, v), we shift items ∈ [**i**..**N**-1] to [**i**+1..**N**] (_from backwards_) and set A[i] = v.  
This is so that v is inserted correctly at index i and maintain compactness.

remove(i), we shift items ∈ [**i+1**..**N**-1] to [**i**..**N**-2], overwriting the old A[i].  
This is to maintain compactness.

### 2-4. Time Complexity Summary

get(i) is very fast: Just one access, O(**1**).  
Another CS course: 'Computer Organisation' discusses the details on this O(**1**)  
performance of this array indexing operation.

search(v)  
In the best case, **v** is found at the first position, O(**1**).  
In the worst case, **v** is not found in the list and we require O(**N**) scan to determine that.

insert(i, v)  
In the best case, insert at **i = N**, there is no shifting of element, O(**1**).  
In the worst case, insert at **i = 0**, we shift all **N** elements, O(**N**).

remove(i)  
In the best case, remove at **i = N-1**, there is no shifting of element, O(**1**).  
In the worst case, remove at **i = 0**, we shift all **N** elements, O(**N**).

### 2-5. Fixed Space Issue

The size of the compact array **M** is not infinite, but a finite number. This poses a problem as the maximum size may not be known in advance in many applications.

If **M** is too big, then the unused spaces are wasted.  
If **M** is too small, then we will run out of space easily.

### 2-6. Variable Space

Solution: Make **M** a variable. So when the array is full, we create a larger array (usually two times larger) and move the elements from the old array to the new array. Thus, there is no more limits on size other than the (usually large) physical computer memory size.

[C++ STL std::vector](https://en.cppreference.com/w/cpp/container/vector), [Python list](https://docs.python.org/3/tutorial/datastructures.html#more-on-lists), [Java Vector](https://docs.oracle.com/javase/8/docs/api/java/util/Vector.html), or [Java ArrayList](https://docs.oracle.com/javase/8/docs/api/java/util/ArrayList.html) all implement this variable-size array. Note that Python _list_ and Java Array_List_ are **not** Linked Lists, but are actually variable-size arrays. This array visualization implements this doubling-when-full strategy.

However, the classic array-based issues of space wastage and copying/shifting items overhead are still problematic.

### 2-7. Compact Array Applications

There are various applications that can be done on a Compact (Integer) Array **A**:

1. Searching for a specific value **v** in array **A**,
2. Finding the min/max or the k-th smallest/largest value in (static) array **A**,
3. Testing for uniqueness and deleting duplicates in array **A**,
4. Counting how many time a specific value **v** appear in array **A**,
5. Set intersection/union between array **A** and another sorted array **B**,
6. Finding a target pair **x** ∈ **A** and **y** ∈ **A** such that **x+y** equals to a target **z**,
7. Counting how many values in array **A** is inside range [**lo**..**hi**], etc.

See [unsorted array](https://visualgo.net/en/array/print?slide=5-1) and [sorted array](https://visualgo.net/en/array/print?slide=6-1) hints.

## 3. Actions

We will outline the possible actions that you can do in this page. For now, just try to guess based on the name of the function.

## 4. Visualizations

We will talk about the two modes: array (the content can be unsorted) versus sorted array (the content must always be sorted, without loss of generality: sorted in non-decreasing order).

## 5. (Unsorted) Array

There are already lots of (simple) applications that we can do with unsorted array.

### 5-1. Algorithm Ideas (Unsorted Array)

1. We can use O(**N**) linear search (leftmost to rightmost or vice versa) to find **v**,
2. For min/max, we can use O(**N**) linear search again;  
    for k-th smallest/largest, we may need to use O(**kN**) algorithm1,
3. We can use O(**N^2**) nested-loop to see if any two indices in **A** are the same,
4. We may need to use [Hash Table](https://visualgo.net/en/array/hashtable) to do this in O(**N**),
5. O(**N^2**) nested-loop is needed,
6. O(**N^2**) nested-loop is needed,
7. We may need to use [Hash Table](https://visualgo.net/en/array/hashtable) to do this in O(**N**).

There are better ways, especially if the array if [sorted](https://visualgo.net/en/array/print?slide=5-2).

1There is a faster expected O(**N**) QuickSelect or O(**N**) worst-case linear time selection.

## 6. (Sorted) Array

When the array is sorted, we open up a lot of possibilities.

### 6-1. Algorithm Ideas (Sorted Array)

1. We can use O(log **N**) binary search on a sorted array,
2. A[0]/A[k-1]/A[N-k]/A[N-1] are the min/k-th smallest/k-th largest/max value in (static sorted) array **A**,
3. Duplicates, if any, will be next to each other in a sorted array **A**,
4. Same as above,
5. We can use modifications of merge routine of Merge Sort,
6. We can use two pointers method,
7. The index of **y** - the index of **x** + 1 (use two binary searches).

There can be other ways.