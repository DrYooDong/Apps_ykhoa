---
title: "Introduction"
part: "P1"
aliases:
  - "Introduction"
keywords:
  - "introduction"
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

# Introduction

## 1. Introduction

Given an undirected weighted graph **G = (V, E)** and an integer **s** that partitions the set of vertices **V = [0, 1, ..., |V|-1]** into a set of **required** vertices **R = [0, 1, ..., s-1]** and a set of **Steiner** vertices **S = [s, s+1, ..., |V|-1]**, the General Steiner Tree problem is a problem of finding a subset **S' ⊆ S** of the **Steiner** vertices and a spanning tree **T = (R ⋃ S', E)** of minimum weight. The weight of the tree **T** is simply the sum of its edge weights.

This General Steiner Tree problem is a generalization of the more well-known [Minimum Spanning Tree problem (MST)](https://visualgo.net/en/steinertree/mst).

Unlike MST, which has a polynomial solution (e.g., O(E log V) Kruskal's/Prim's algorithm), this general Steiner-Tree problem is an NP-hard combinatorial optimization problem.

### 1-1. Other Steiner-Tree Problem Variants

There are a few other variants of this general Steiner-Tree problem, e.g., the Euclidean-Steiner-Tree and the Metric-Steiner-Tree problems.

In the Euclidean-Steiner-Tree problem, there are **V** distinct points (set **R**) on an Euclidean (2-dimensional) plane, the job is to find a(n additional, possibly empty) set of **Steiner** points **S** (can be anywhere in the 2-D plane) and a spanning tree **T = (R ⋃ S, E)** such that the weight of **T** is minimized. The weight of any two points is simply the Euclidean distance of those two points.

In the Metric-Steiner-Tree problem, it is like the Euclidean-Steiner-Tree, but this time the additional Steiner points are given as a set of **S** upfront. The weight of any two points must satisfy [metric space](https://en.wikipedia.org/wiki/Metric_space) properties.

Euclidean-Steiner Tree, Metric-Steiner-Tree, and the general Steiner-Tree that is visualized in this website, are all NP-hard optimization problems.

## 2. Visualization

View the visualisation of the selected Steiner-Tree algorithms here.

Originally, all vertices and edges in the input graph are colored with the standard black outline. As the visualization goes on, the color light blue will be used to denote the set of required vertices **R** and the color orange will be used to show Steiner vertices that are currently used.

At the end of the selected Steiner-Tree algorithm, we show the best spanning tree = the Steiner tree **T**.

## 3. Input

There are two different ways to specify an input graph:

1. **Edit Graph**: You can edit the currently displayed undirected weighted graph into any other undirected weighted graph.
2. **Example Graphs**: You can select from the list of example undirected weighted graphs to get you started.

One day, we will provide an easy way to relabel vertices in any currently loaded graph so that the set of required vertices **R** is always numbered with **[0, 1, ..., s-1]** (thus the rest are the potential Steiner vertices **S**).

## 4. Exact Algorithms

There are 3 special cases of the general Steiner-Tree problem with polynomial solutions:

1. **s = 2**, that implies that the only required vertices **R = [0, 1]**, we can simply run O((V+E) log V) [Dijkstra's algorithm](https://visualgo.net/en/steinertree/sssp) to find the **Shortest Path Spanning Tree** that connects source vertex 0 with destination vertex 1 (or vice versa). This spanning tree will also be the required Steiner Tree.
2. **s = |V|**, that implies that all of the **|V|** vertices, i.e., **R = [0, 1, ..., |V|-1]** are all required, we can simply run O(E log V) [Kruskal's or Prim's algorithm](https://visualgo.net/en/steinertree/mst) to find the full **Minimum Spanning Tree (MST)** of the entire graph. This MST will also be the required Steiner Tree.
3. If **G** is a tree: Details TBA.

### 4-1. Exact Algorithms - Complete Search

But when **s = [3, 4, ..., |V|-2]**, we have no choice but to run exponential algorithms as these cases fall into general cases of the NP-hard general Steiner-Tree problem.

One possible way is to try all possible subsets of the **|V|-s** vertices that can be part of the optimal Steiner Tree. Each time, we combine vertices in **R = [0, 1, ..., s-1]** with the currently chosen subset of potential Steiner vertices, run an O(E) Kruskal's algorithm (without re-sorting the edge list by weight anymore) for each of the **2|V|-s** possible subsets, and report the best Steiner Tree. This is an exponential algorithm and this visualization page shows this algorithm.

### 4-2. Exact Algorithms - Dynamic Programming

There is a more optimized exponential algorithm called the Dreyfus-Wagner Dynamic Programming (DP) algorithm that avoids recomputation of sub-problems.

Unfortunately this part has not been digitized/visualized yet and is in the pipeline.

## 5. Approximation

Please see CS4234 lecture note for the details.