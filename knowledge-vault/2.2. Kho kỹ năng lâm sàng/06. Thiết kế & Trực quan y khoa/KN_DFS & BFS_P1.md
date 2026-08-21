---
title: "DFS & BFS"
part: "P1"
aliases:
  - "DFS & BFS"
keywords:
  - "dfs & bfs"
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

# DFS & BFS

## 1. Introduction

Given a graph, we can use the O(**V**+**E**) DFS (Depth-First Search) or BFS (Breadth-First Search) algorithm to traverse the graph and explore the features/properties of the graph. Each algorithm has its own characteristics, features, and side-effects that we will explore in this visualization.

This visualization is rich with a lot of DFS and BFS variants (all run in O(**V**+**E**)) such as:

1. Topological Sort algorithm (both DFS and BFS/Kahn's algorithm version),
2. Bipartite Graph Checker algorithm (both DFS and BFS version),
3. Cut Vertex & Bridge finding algorithm,
4. Strongly Connected Components (SCC) finding algorithms  
    (both Kosaraju's and Tarjan's version), and
5. 2-SAT Checker algorithm.

## 2. Visualization

When the chosen graph traversal algorithm is running, the animation will be shown here.

We use vertex+edge color (the color scheme will be elaborated soon) and occasionally the extra text under the vertex (in red font) to highlight the changes.

All graph traversal algorithms work on directed graphs (this is the default setting, where each edge has an arrowtip to indicate its direction) but the **Bipartite Graph Check** algorithm and the **Cut Vertex & Bridge** finding algorithm requires the undirected graphs (the conversion is done automatically by this visualization).

## 3. Specifying an Input Graph

There are three different sources for specifying an input graph:

1. **Edit Graph**: You can draw a new graph or edit an example unweighted directed graph as the input graph (to draw bidirectional edge (u, v), you can draw two directed edges u → v and v → u; or click 'Include Reverse Edges' button to do this for all directed edges).
2. **Input Graph**: You can specify Edge List/Adjacency Matrix/Adjacency List information and VisuAlgo will propose a 2D graph drawing layout of that graph.
3. **Example Graphs**: You can select from the list of our selected example graphs to get you started.

## 4. Recap

If you arrive at this e-Lecture **without** having first explore/master the concept of [Binary Heap](https://visualgo.net/en/dfsbfs/heap) and especially [Binary Search Tree](https://visualgo.net/en/dfsbfs/bst), we suggest that you explore them first, as traversing a (Binary) Tree structure is much simpler than traversing a general graph.

Quiz: **Mini pre-requisite check. What are the Pre-/In-/Post-order traversal of the binary tree shown (root = vertex 0), left and right child are as drawn?**

 Post = 4, 3, 2, 1, 0  
 In = 1, 0, 3, 2, 4  
 Pre = 0, 1, 2, 3, 4  
 In = 4, 2, 3, 0, 1  
 Pre = 0, 2, 4, 3, 1  
 Post = 1, 3, 4, 2, 0  

### 4-1. Binary Tree Traversal - Source = Root

We normally start from the most important vertex of a (binary) tree: The **root** vertex.

If the given tree is not 'rooted' (see the example picture), we can pick any one vertex (for example, vertex 0 in the example picture) and designate it as the root. If we imagine that all edges are strings of similar length, then after "virtually pulling the designated root upwards" and let gravity pulls the rest downwards, we have a rooted directed (downwards) tree — see the next slide.

PS: Technically, this transformation is done by running `DFS(0)` that we will explore soon.

### 4-2. Binary Tree Traversal - Pre-/In-/Post-order

In a **binary** tree, we only have **up to two** neighboring choices: From the current vertex, we can go to the left subtree first or go to the right subtree first. We also have option to visit the current vertex before or after visiting one of the (or both) subtree(s).

This gives rise to the classics: pre-order (visit current vertex, visit its left subtree, visit its right subtree), in-order (left, current, right), and post-order (left, right, current) traversals.

Discussion: Do you notice that there are three other possible binary tree traversal combinations? What are they?

### 4-3. The Answer

[This is a hidden slide]

### 4-4. Binary Tree Traversal - Acyclic

In a binary tree, or in a tree structure in general, there is no (non-trivial) cycle involving 3 or more distinct vertices to worry about (we do not consider the trivial cycle involving bi-directional edges which can be taken care of easily — see three slides earlier).

### 4-5. Issues in General Graph

In general graph, we do not have the notion of root vertex. Instead, we need to pick one distinguished vertex to be the starting point of the traversal, i.e. the source vertex **s**.

We also have 0, 1, ..., **k** neighbors of a vertex instead of just ≤ 2, and **k** can be up to **V**-1.

We **may (or actually very likely)** have cycle(s) in our general graph instead of acyclic tree,  
be it the trivial one like u → v → u or the non-trivial one like a → b → c → a.

But fret not, graph traversal is an easy problem with two classic algorithms: DFS and BFS.

## 5. DFS

One of the most basic graph traversal algorithm is the O(**V**+**E**) Depth-First Search (DFS).

DFS takes one input parameter: The source vertex **s**.

DFS is one of the most fundamental graph algorithm, so please spend time to understand the key steps of this algorithm.

### 5-1. Analogy

![maze](https://visualgo.net/img/maze.svg)The closest analogy of the behavior of DFS is to imagine a maze with only one entrance and one exit. You are at the entrance and want to explore the maze to reach the exit. Obviously you cannot split yourself into more than one.

Ask these reflective questions before continuing: What will you do if there are branching options in front of you? How to avoid going in cycle? How to mark your own path? Hint: You need a chalk, stones (or any other marker) and a (long) string.

### 5-2. Trying All Options

As it name implies, DFS starts from a distinguished source vertex **s** and uses recursion (an implicit stack) to order the visitation sequence as deep as possible before backtracking.

If DFS is at a vertex **u** and it has **X** neighbors, it will pick the first neighbor **V1** (usually the vertex with the lowest vertex number), recursively explore all reachable vertices from vertex **V1**, and eventually backtrack to vertex **u**. DFS will then do the same for the other neighbors until it finishes exploring the last neighbor **VX** and its reachable vertices.

This wordy explanation will be clearer with DFS animation later.

### 5-3. Avoiding Cycle

If the graph is **cyclic**, the previous 'try-all' strategy may lead DFS to run in cycle.

So _the basic form of DFS_ uses an array **status[u]** of size **V** vertices to decide between _binary conditions_: Whether vertex **u** has been visited or unvisited. Only if vertex **u** is still unvisited, then DFS can visit vertex **u**.

When DFS runs out of option, it **backtrack** to previous vertex (**p[u]**, see the next slide) as the recursion unwinds.

### 5-4. Memorizing the Path

DFS uses another array **p[u]** of size **V** vertices to remember the **parent/predecessor/previous** of each vertex **u** along the DFS traversal path.

The predecessor of the source vertex, i.e., **p[s]** is set to -1 to say that the source vertex has no predecessor (as the lowest vertex number is vertex 0).

The sequence of vertices from a vertex **u** that is reachable from the source vertex **s** back to **s** forms the **DFS spanning tree**. We color these **tree edges** with red color.

### 5-5. Hands-on Example

For now, ignore the extra **status[u] = explored** in the displayed pseudocode and the presence of blue and grey edges in the visualization (to be explained soon).

Without further ado, let's execute DFS(0) on the default example graph for this e-Lecture (CP4 Figure 4.1). Recap DFS Example

The _basic version_ of DFS presented so far is already enough for most simple cases.

### 5-6. O(V+E) Time Complexity

The time complexity of DFS is O(**V**+**E**) because:

1. Each vertex is only visited once due to the fact that DFS will only recursively explore a vertex **u** if **status[u] = unvisited** — O(**V**)
2. Every time a vertex is visited, all its **k** neighbors are explored and therefore after all vertices are visited, we have examined all **E** edges — (O(**E**) as the total number of neighbors of each vertex equals to **E**).

### 5-7. O(V+E) at all times?

The O(**V**+**E**) time complexity of DFS only achievable if we can visit all **k** neighboring vertices of a vertex in O(**k**) time.

Quiz: **Which underlying graph data structure support that operation?**

 Edge List  
 Adjacency Matrix  
 Adjacency List  

  
  

Discussion: Why?

### 5-8. The Answer

[This is a hidden slide]

## 6. BFS

Another basic graph traversal algorithm is the O(**V**+**E**) Breadth-First Search (BFS).

As with DFS, BFS also takes one input parameter: The source vertex **s**.

Both DFS and BFS have their own strengths and weaknesses. It is important to learn both and apply the correct graph traversal algorithm for the correct situation.

### 6-1. Analogy

![ripple](https://visualgo.net/img/ripple.jpg)Imagine a still body of water and then you throw a stone into it. The first location where the stone hits the water surface is the position of the source vertex and the subsequent **ripple effect** across the water surface is like the BFS traversal pattern.

### 6-2. Try All, Avoid Cycle, Memorize Path

BFS is very similar with DFS that have been discussed earlier, but with some differences.

BFS starts from a source vertex **s** but it uses a [queue](https://visualgo.net/en/dfsbfs/list?mode=Queue) to order the visitation sequence _as breadth as possible before going deeper_.

BFS also uses a Boolean array of size **V** vertices to distinguish between two states: visited and unvisited vertices (we will not use BFS to detect back edge(s) as with DFS).

In this visualization, we also show that starting from the same source vertex **s** in an **unweighted graph**, BFS spanning tree of the graph equals to its [SSSP spanning tree](https://visualgo.net/en/dfsbfs/sssp).

### 6-3. Hands-on Example

Without further ado, let's execute BFS(5) on the default example graph for this e-Lecture (CP4 Figure 4.2). Recap BFS Example.

Notice the _Breadth-first_ exploration due to the usage of FIFO data structure: Queue?

### 6-4. O(V+E) Time Complexity

The time complexity of BFS is O(**V**+**E**) because:

1. Each vertex is only visited once as it can only enter the queue once — O(**V**)
2. Every time a vertex is dequeued from the queue, all its **k** neighbors are explored and therefore after all vertices are visited, we have examined all **E** edges — (O(**E**) as the total number of neighbors of each vertex equals to **E**).

As with DFS, this O(**V**+**E**) time complexity is only possible if we use [Adjacency List](https://visualgo.net/en/dfsbfs/graphds) graph data structure — same reason as with DFS analysis.

## 7. Simple DFS/BFS Applications

So far, we can use DFS/BFS to solve a few graph traversal problem variants:

1. Reachability test,
2. Actually printing the traversal path,
3. Identifying/Counting/Labeling Connected Components (CCs) of undirected graphs,
4. Detecting if a graph is cyclic,
5. Topological Sort (only on DAGs),

For most data structures and algorithms courses, the applications of DFS/BFS are up to these few basic ones only, although DFS/BFS can do much more...

### 7-1. Reachability Test

If you are asked to test whether a vertex **s** and a (different) vertex **t** in a graph are reachable, i.e., connected directly (via a direct edge) or indirectly (via a simple, non cyclic, path), you can call the O(**V**+**E**) DFS(s) (or BFS(s)) and check if status[t] = visited.

Example 1: **s = 0** and **t = 4**, run DFS(0) and notice that status[4] = visited.  
Example 2: **s = 0** and **t = 7**, run DFS(0) and notice that status[7] = unvisited.

### 7-2. Print the Traversal Path

[Remember](https://visualgo.net/en/dfsbfs/dfsbfs/?slide=5-4) that we set **p[v] = u** every time we manage to extend DFS/BFS traversal from vertex **u** to vertex **v** — a tree edge in the DFS/BFS spanning tree. Thus, we can use following simple recursive function to print out the path stored in array **p**. Possible follow-up discussion: Can you write this in **iterative** form? (trivial)

method backtrack(u)  
  if (u == -1) stop  
  backtrack(p[u]);  
  output vertex u  

To print out the path from a source vertex **s** to a target vertex **t** in a graph, you can call O(**V**+**E**) DFS(s) (or BFS(s)) and then O(**V**) backtrack(t). Example: **s = 0** and **t = 4**, you can call DFS(0) and then backtrack(4). Elaborate

### 7-3. Identifying a Connected Component (CC)

We can enumerate **all** vertices that are reachable from a vertex **s** in an **undirected graph** (as the example graph shown above) by simply calling O(**V**+**E**) DFS(s) (or BFS(s)) and enumerate all vertex **v** that has status[v] = visited.

Example: **s = 0**, run DFS(0) and notice that status[{0,1,2,3,4}] = visited so they are all reachable vertices from vertex 0, i.e., they form one **Connected Component (CC)**.

### 7-4. Counting the Number of/Labeling the CCs

We can use the following pseudo-code to count the number of CCs:

CC = 0  
for all u in V, set status[u] = unvisited  
for all u in V  
  if (status[u] == unvisited)  
    ++CC // we can use CC counter number as the CC label  
    DFS(u) // or BFS(u), that will flag its members as visited  
output CC // the answer is 3 for the example graph above, i.e.  
// CC 0 = {0,1,2,3,4}, CC 1 = {5}, CC 2 = {6,7,8}

You can modify the DFS(u)/BFS(u) code a bit if you want to use it to label each CC with the identifier of that CC.

### 7-5. Wait, What is the Time Complexity?

Quiz: **What is the time complexity of Counting the Number of CCs algorithm?**

 Trick question, the answer is none of the above, it is O(_____)  
 Calling O(V+E) DFS/BFS V times, so O(V*(V+E)) = O(V^2 + VE)  
 It is still O(V+E)  

  
  

Discussion: Why?

### 7-6. The Answer

[This is a hidden slide]

### 7-7. Detecting Cycle - Part 1

We can actually _augment_ the basic DFS further to give more insights about the underlying graph.

In this visualization, we use blue color to highlight **back** edge(s) of the DFS spanning tree. The presence of at least one back edge shows that the traversed graph (component) is **cyclic** while its absence shows that at least the component connected to the source vertex of the traversed graph is **acyclic**.

### 7-8. Detecting Cycle - Part 2

Back edge can be detected by modifying array **status[u]** to record **three** different states:

1. **unvisited**: same as earlier, DFS has not reach vertex **u** before,
2. **explored**: DFS has visited vertex **u**, but at least one neighbor of vertex **u** has not been visited yet (DFS will go depth-first to that neighbor first),
3. **visited**: now stronger definition: all neighbors of vertex **u** have also been visited and DFS is about to backtrack from vertex **u** to vertex **p[u]**.

If DFS is now at vertex **x** and explore edge **x → y** and encounter **status[y] = explored**, we can declare **x → y** is a **back edge** (a cycle is found as we were previously at vertex **y** (hence **status[y] = explored**), go deep to neighbor of **y** and so on, but we are now at vertex **x** that is reachable from **y** but vertex **x** leads back to vertex **y**).

### 7-9. Hands-on Example (Detailed)

The edges in the graph that are not tree edge(s) nor back edge(s) are colored grey. They are called **forward or cross edge(s)** and currently have limited use (not elaborated).

Now try DFS(0) on the example graph above with this new understanding, especially about the 3 possible status of a vertex (unvisited/normal black circle, explored/blue circle, visited/orange circle) and back edge. Edge 2 → 1 will be discovered as a back edge as it is part of cycle 1 → 3 → 2 → 1 (as vertex 2 is `explored' to vertex 1 which is currently `explored') (similarly with Edge 6 → 4 as part of cycle 4 → 5 → 7 → 6 → 4).

Note that if edges 2 → 1 and 6 → 4 are reversed to 1 → 2 and 4 → 6, then the graph is correctly classified as acyclic as edge 3 → 2 and 4 → 6 go from `explored' to `fully visited'. If we only use binary states: `unvisited' vs `visited', we cannot distinguish these two cases.

### 7-10. Topological Sort - Definition

There is another DFS (and also BFS) application that can be treated as 'simple': Performing Topological Sort(ing) of a Directed Acyclic Graph (DAG) — see example above.

Topological sort of a DAG is a linear ordering of the DAG's vertices in which each vertex comes before all vertices to which it has outbound edges.

Every DAG (can be checked with [DFS earlier](https://visualgo.net/en/dfsbfs/dfsbfs/?slide=7-7)) has at least one but possibly more topological sorts/ordering.

One of the main purpose of (at least one) topological sort of a DAG is for [Dynamic Programming (DP)](https://visualgo.net/en/dfsbfs/recursion) technique. For example, this topological sorting process is used internally in [DP solution for SSSP on DAG](https://visualgo.net/en/dfsbfs/sssp).

### 7-11. Topological Sort

We can use either the O(**V**+**E**) DFS or BFS to perform Topological Sort of a Directed Acyclic Graph (DAG).

The DFS version requires just one additional line compared to the normal DFS and is basically the post-order traversal of the graph. Try Toposort (DFS) on the example DAG.

The BFS version is based on the idea of vertices without incoming edge and is also called as Kahn's algorithm. Try Toposort (BFS/Kahn's) on the example DAG.

### 7-12. Bipartite Graph Checker

We can use the O(**V**+**E**) DFS or BFS (they work similarly) to check if a given graph is a Bipartite Graph by giving alternating color (orange versus blue in this visualization) between neighboring vertices and report 'non bipartite' if we ends up assigning same color to two adjacent vertices or 'bipartite' if it is possible to do such '2-coloring' process. Try DFS_Checker or BFS_Checker on the example Bipartite Graph.

Bipartite Graphs have useful applications in [(Bipartite) Graph Matching problem](https://visualgo.net/en/dfsbfs/matching).

Note that Bipartite Graphs are usually only defined for undirected graphs so this visualization will convert directed input graphs into its undirected version automatically before continuing. This action is irreversible and you may have to redraw the directed input graph again for other purposes.

## 8. More Advanced DFS/BFS Applications

As of now, you have seen DFS/BFS and what it can solve (with just minor tweaks). There are a few more advanced applications that require more tweaks and we will let advanced students to explore them on their own:

1. Finding Articulation Points (Cut Vertices) and Bridges of an Undirected Graph (DFS only),
2. Finding Strongly Connected Components (SCCs) of a Directed Graph (Tarjan's and Kosaraju's algorithms), and
3. 2-SAT(isfiability) Checker algorithms.

---

Advertisement: The details are written in [Competitive Programming book](https://cpbook.net/).

## 9. Find Cut Vertices & Bridges

We can modify (but unfortunately, not trivially) the O(**V**+**E**) DFS algorithm into an algorithm to find Cut Vertices & Bridges of an Undirected Graph.

A Cut Vertex, or an Articulation Point, is a vertex of an undirected graph which removal disconnects the graph. Similarly, a bridge is an edge of an undirected graph which removal disconnects the graph.

Note that this algorithm for finding Cut Vertices & Bridges only works for undirected graphs so this visualization will convert directed input graphs into its undirected version automatically before continuing. This action is irreversible and you may have to redraw the directed input graph again for other purposes. You can try to Find Cut Vertices & Bridges on the example graph above.

## 10. Find Strongly Connected Components

We can modify (but unfortunately, not trivially) the O(**V**+**E**) DFS algorithm into an algorithm to find Strongly Connected Components (SCCs) of a Directed Graph G.

An SCC of a directed graph G a is defined as a subgraph S of G such that for any two vertices u and v in S, vertex u can reach vertex v directly or via a path, and vertex v can also reach vertex u back directly or via a path.

There are two known algorithms for finding SCCs of a Directed Graph: Kosaraju's and Tarjan's. Both of them are available in this visualization. Try Kosaraju's Algorithm and/or Tarjan's Algorithm on the example directed graph above.

## 11. 2-SAT Checker Algorithm

We also have the 2-SAT Checker algorithm. Given a 2-Satisfiability (2-SAT) instance in the form of conjuction of clauses: (clause1) ^ (clause2) ^ ... ^ (clausen) and each clause is in form of disjunction of up to two variables (vara v varb), determine if we can assign True/False values to these variables so that the entire 2-SAT instance is evaluated to be true, i.e. satisfiable.

It turns out that each clause (a v b) can be turned into four vertices a, not a, b, and not b with two edges: (not a → b) and (not b → a). Thus we have a Directed Graph. If there is at least one variable and its negation inside an SCC of such graph, we know that it is impossible to satisfy the 2-SAT instance.

After such directed graph modeling, we can run an SCC finding algorithm (Kosaraju's or Tarjan's algorithm) to determine the satisfiability of the 2-SAT instance.

## 12. Which One is Better?

Quiz: **Which Graph Traversal Algorithm is Better?**

 It Depends on the Situation  
 Always BFS  
 Always DFS  
 Both are Equally Good  

  
  

Discussion: Why?

### 12-1. The Answer

[This is a hidden slide]

## 13. Extras

There are lots of things that we can still do with just DFS and/or BFS...  

### 13-1. Online Quiz

There are interesting questions about these two graph traversal algorithms: DFS+BFS and variants of graph traversal problems, please practice on [Graph Traversal](https://visualgo.net/training?diff=Medium&n=7&tl=0&module=dfsbfs) training module (no login is required, but short and of medium difficulty setting only).

However, for registered users, you should login and then go to the [Main Training Page](https://visualgo.net/training) to officially clear this module and such achievement will be recorded in your user account.

### 13-2. Online Judge Exercises

We also have a few programming problems that somewhat requires the usage of DFS and/or BFS: [Kattis - reachableroads](https://open.kattis.com/problems/reachableroads) and [Kattis - breakingbad](https://open.kattis.com/problems/breakingbad).

Try to solve them and then try the **many more** interesting twists/variants of this simple graph traversal problem and/or algorithm.

You are allowed to use/modify our implementation code for DFS/BFS Algorithms:  
[dfs_cc.cpp](https://github.com/stevenhalim/cpbook-code/blob/master/ch4/traversal/dfs_cc.cpp)/[bfs.cpp](https://github.com/stevenhalim/cpbook-code/blob/master/ch4/sssp/bfs.cpp)  
[dfs_cc.java](https://github.com/stevenhalim/cpbook-code/blob/master/ch4/traversal/dfs_cc.java)/[bfs.java](https://github.com/stevenhalim/cpbook-code/blob/master/ch4/sssp/bfs.java)  
[dfs_cc.py](https://github.com/stevenhalim/cpbook-code/blob/master/ch4/traversal/dfs_cc.py)/[bfs.py](https://github.com/stevenhalim/cpbook-code/blob/master/ch4/sssp/bfs.py)  
[dfs_cc.ml](https://github.com/stevenhalim/cpbook-code/blob/master/ch4/traversal/dfs_cc.ml)/[bfs.ml](https://github.com/stevenhalim/cpbook-code/blob/master/ch4/sssp/bfs.ml)  

### 13-3. Discussion

[This is a hidden slide]