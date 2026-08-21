---
title: "Polygon and Algorithms on Polygon"
part: "P1"
aliases:
  - "Polygon and Algorithms on Polygon"
keywords:
  - "polygon and algorithms on polygon"
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

# Polygon and Algorithms on Polygon

## 1. Introduction

A polygon is a plane figure that is bounded by a closed circuit composed of a **finite sequence** of **straight line segments**.

This visualization features a few computational geometry algorithms that can be carried out on simple (non-crossing) polygons with 3 or more non-collinear points, such as determining their perimeters and areas, determining concavity or convexity, determining whether a point is inside or outside, and to cut them with a simple line.

## 2. Visualization

Vertices of a polygon can be ordered either in ClockWise (CW) or CounterClockWise (CCW) order. In this visualization, we prefer to use CCW order (although drawing polygon with vertices in CW order is also acceptable). Under the hood, we also set the first vertex = the last vertex to simplify implementation.

Note that we limit the drawn polygon to be a **simple** polygon, i.e. ,there is no edge intersection.

The number of vertices/corners of the polygon is stored in variable **n**. As polygon is a closed circuit, the number of edges/sides of the polygon is also **n**.

## 3. Available Operations

All available operations are listed in the left hand side menu as usual.

The first two are for giving simple input polygons and the next five are the computational geometry algorithms that you can run on the currently drawn polygon.

### 3-1. Edit Polygon

In this visualization, you can edit the currently displayed simple polygon (at least 3 points) into any other valid simple polygon, without any collinear points (actually, it is possible to modify our implementation to allow collinear points, just that it will complicate a few operations). The smallest such polygon is a triangle.

The polygon that you draw can be either **convex** (line connecting any two points inside the polygon will remain inside the polygon) or **concave**.

If you do not close the loop (draw an edge from last vertex back to vertex 0), we will do that automatically for you.

### 3-2. Example Polygons

We provide a few example polygons as a starting point.

Upon loading this visualization page, we will randomize the chosen example polygon.

Note that some of these example polygons indeed already have a few collinear points to showcase some edge cases, making some of these example polygons a bit hard to edit.

### 3-3. Perimeter of a Polygon

The perimeter of a polygon is simply the sum of the lengths (Euclidean distances) of consecutive line segments (polygon edges).

This routine works for both convex and concave polygons and runs in O(**n**).

Without further ado, let's compute the Perimeter of the currently drawn polygon.

### 3-4. Area of a Polygon

When the vertices of a polygon are given in a circular manner (CW or CCW), we can compute its area using the [Shoelace Formula](https://en.wikipedia.org/wiki/Shoelace_formula).

This Shoelace Formula returns the area, which is half the cross products of vectors defined by edge endpoints.

This formula is versatile as it works for both convex and concave polygons. It can be computed in O(**n**).

Without further ado, let's compute the Area of the currently drawn polygon.

### 3-5. Checking if the Polygon is Convex

A polygon is called a **Convex** polygon if we draw a line between **any two** different points inside the polygon and the line always remain inside the polygon. Otherwise, the polygon is called **Concave**.

There is a far easier method to check if a given polygon (assume no three collinear points) is convex without using the direct definition above. We can check if **all three** consecutive vertices of the polygon form the same kind of turn (all CCWs or all CWs). This check is clearly O(**n**).

Without further ado, let's check if the currently drawn polygon IsConvex.

### 3-6. Checking if a Point is Inside Polygon

There are a few algorithms for checking if a point (pt1) is inside a polygon or not. We reckon the most robust algorithm is the [Winding Number algorithm](https://en.wikipedia.org/wiki/Point_in_polygon#Winding_number_algorithm) that computes the sum of angles subtended by each edge/side of the polygon with pt1 as the origin. As there are only **n** such angles, this check also runs in O(**n**).

The input simple polygon can be as complicated as the currently displayed "MAZE" test case. Try InsidePolygon, OutsidePolygon, or OnPolygon test cases.

In Exploration Mode, you will be asked to provide the tested point (pt1) as additional input of this operation.

### 3-7. Cutting a Convex Polygon with a Vector

We can cut a convex polygon with a straight line defined by two points (pt1, pt2). The result of the cut are two smaller but also convex polygons. This algorithm currently returns the smaller polygon on 'the left side' of the cutting **vector** (pt1 → pt2).

Note that although possible, cutting a Concave polygon is more complicated as it may result in more than two (and possibly degenerate) polygons. We allow such operation in this visualization but extra care must be exercised in the actual implementations.

Try Left Side to see the default version of this routine and Right Side where we swap pt1 and pt2 to get the other side of the cut.

In Exploration Mode, you will be asked to provide two points to define the cut line (pt1 and pt2) as additional input of this operation (to avoid degenerate case, these two points should be placed at different locations).

This routine also runs in O(**n**).

## 4. Extras

There is one more computational geometry visualization in VisuAlgo: [Convex Hull](https://visualgo.net/en/polygon/convexhull).

You can now use some of these algorithm on polygon routines to solve a few programming exercises: [UVa 11265 - The Sultan's Problem](https://uva.onlinejudge.org/external/112/11265.pdf) and [Kattis - robotprotection](https://open.kattis.com/problems/robotprotection).

You are allowed to use/modify our implementation code for various polygon algorithms:  
[polygon.cpp](https://github.com/stevenhalim/cpbook-code/blob/master/ch7/polygon.cpp) | [py](https://github.com/stevenhalim/cpbook-code/blob/master/ch7/polygon.py) | [java](https://github.com/stevenhalim/cpbook-code/blob/master/ch7/polygon.java) | [ml](https://github.com/stevenhalim/cpbook-code/blob/master/ch7/polygon.ml)