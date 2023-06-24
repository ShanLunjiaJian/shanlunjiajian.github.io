---
layout: post
title: 2023省队胡策 shanlunjiajian场
subtitle: /tiao
tags: 题解
show: true
---

A. sort

原题 [International Collegiate Programming Contest, Japan Domestic D. Audience Queue](https://onlinejudge.u-aizu.ac.jp/problems/1659) 。

考虑归并排序大概是说找到每一段的所有前缀 $\max$，把它们排序，剩下的数跟着前面的前缀 $\max$ 移动。

也就是说 $t$ 的所有前缀 $\max$ 就是这里找到的所有前缀 $\max$。那么我们先找到 $t$ 的所有前缀 $\max$，然后每个数跟着哪个数就确定了。如果一个数需要成为 $t$ 的前缀 $\max$，但是左边第一个$t$ 的前缀 $\max$ 比它大，那么在它左侧的间隔必须切一刀。如果左边第一个 $t$ 的前缀 $\max$ 比它小，它左边可以切也可以不切。只有这些刀可能切，否则会产生新的前缀 $\max$，所以切所有必须切的，如果这么切不对那就无解了，如果有解则再在可以切可以不切的位置中选若干个切即可。复杂度 $O(n)$。

B. size

原题 [XXVI POI Stage II Cyclic shifts](https://szkopul.edu.pl/problemset/problem/e86SVYtB-4G3yVTFi2unCZWa/site/?key=statement) 。

subtask2做法是根号步地走；或者随机直到撞，然后pr分解，每次尝试剔除一个素因数。

先用 $2\lg n+O(1)$ 次倍增出一个比较粗略的答案所在区间 $[k,2k)$。然后我们在其中二分答案 $d$，从任意位置 $a$ 出发跳两次 $\frac{d}{2}$ 分别到达 $b,c$，那么$d<n$当且仅当三个点的顺序和 $a,b,c$ 循环同构，$d>n$ 当且仅当和 $a,c,b$ 循环同构，$d=n$ 当且仅当 $a=c$。总共需要 $3\lg n+O(1)$ 次。这谁想的到啊？

我其实是不会$O(\log^2 n)$的，看了一下cmll02的做法，注意到

原题的交互方式比较引荐。在打算搬的时候想了怎么实现交互，发现这是个 shaber 问题。

C. matrix

某种意义上是 [CODE FESTIVAL 2016 Grand Final H. AB=C Problem](https://atcoder.jp/contests/cf16-exhibition-final/tasks/cf16_exhibition_final_h) 的加强版。验题人yixiuge777。

注意到秩相同的矩阵 $C$，其价值也相同，因为秩相同的矩阵可以通过初等变换变为等价标准型，而初等变换不会让不同的矩阵变得相同。

秩为 $k$ 的矩阵的个数是 $\frac{\prod\limits_{i=0}^{k-1}(1-q^{n-i})(q^n-q^i)}{\prod\limits_{i=0}^{k-1}(1-q^i)}$，可以 $O(n)$ 递推。这可以通过一个简单的 dp 归纳证明，设 $i$ 个向量秩为 $j$ 的方案数是 $c(i,j)$，转移考虑选一个新的向量，那么有 $q^n-q^i$ 种方案让秩增加 $1$，有 $q^i$ 种方案让秩不变。

设 $f_{n-k}$ 表示秩为 $k$ 的矩阵的价值，有 $f_{n-k}=\sum\limits_r\frac{c(n,k)\binom{n}{r}_q}{\binom{k}{r}_q}$，因为每个秩为 $k$ 的线性空间包含 $\binom{k}{r}_q$ 个秩为 $r$ 的子空间。但是这里好像写错了，不过我不知道!

设 $g_k=\frac{f_k}{\prod\limits_{i=0}^{k-1}(1-q^i)}$，观察或嗯推可知 $g_0=\prod\limits_{i=0}^{n-1}(q^n-q^i),g_1=\frac{q^n+(q^n-q^{n-1})}{1-q}\prod\limits_{i=0}^{n-2}(q^n-q^i),g_i=\frac{(1+q-3q^i)g_{i-1}+(q+q^i)g_{i-2}}{(1-q^i)^2}$，可以 $O(n)$ 递推。

算出这些之后容易 $O(n\log t)$ 计算答案。

