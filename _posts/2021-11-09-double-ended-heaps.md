---
layout: post
title: "双端优先队列 : min-max heap和deap"
subtitle: 有时候还挺好用的（
tags: 数据结构
---

## Min-Max Heap

min-max heap是一种堆，其中的结点在奇数层(根在第一层)满足小根堆的性质，在偶数层满足大根堆的性质，这个性质说的是根是子树中最小/最大的。

注意到min-max heap的最小值必然是根$$1$$，最大值必然在$$2,3$$中，如果只有一个元素则需要特判。

min-max heap的操作和二叉堆基本相同。插入的时候，如果插入在奇数层，那么我们首先检查是不是比父亲大，如果不是则直接从这个点出发向上调整，否则和父亲交换并从父亲出发向上调整。向上的时候我们和祖父比较。

删除的时候，我们还是跟最后一个swap一下，然后向下调整。如果是在奇数层，向下调整的时候找到儿子们和孙子们的最小值，并把这个最小值换过来。如果最小值是儿子则停止，如果是孙子则检查这个孙子的父亲是否还满足大根性质，不满足则交换，然后递归到这个孙子。

这里给一份板子库里实现的展开。如果要使用这个，你需要重载operator <。

```cpp
template<class T>
struct MinMaxHeap
{
	static const int N=2000002;
	T a[N];
	int cnt;
	#define lq(u) ((u)<<1)
	#define rq(u) ((u)<<1|1)
	#define fa(u) ((u)>>1)
	#define gfa(u) ((u)>>2)
	MinMaxHeap(){ cnt=0; }
	inline int min_pos(int u,int v){ return (v>cnt||a[u]<a[v])?u:v; }
	inline int max_pos(int u,int v){ return (v>cnt||a[v]<a[u])?u:v; }
	inline void swap(T &x,T &y){ T t=x;x=y;y=t; }
	#define dep(u) (30-__builtin_clz(u))
	inline void down_min(int u)
	{
		for(int t1,t2;lq(u)<=cnt;u=t2)
			t1=min_pos(lq(u),rq(u)),t2=min_pos(min_pos(lq(lq(u)),rq(lq(u))),min_pos(lq(rq(u)),rq(rq(u)))),
			t2<=cnt&&a[t2]<a[t1]?(a[t2]<a[u]?
				(swap(a[t2],a[u]),a[fa(t2)]<a[t2]?swap(a[t2],a[fa(t2)]):(void)0):(void)0):
				(a[t1]<a[u]?(swap(a[t1],a[u]),(void)(u=N)):(void)0);
	}
	inline void down_max(int u)
	{
		for(int t1,t2;lq(u)<=cnt;u=t2)
			t1=max_pos(lq(u),rq(u)),t2=max_pos(max_pos(lq(lq(u)),rq(lq(u))),max_pos(lq(rq(u)),rq(rq(u)))),
			t2<=cnt&&a[t1]<a[t2]?(a[u]<a[t2]?
				(swap(a[t2],a[u]),a[t2]<a[fa(t2)]?swap(a[t2],a[fa(t2)]):(void)0):(void)0):
				(a[u]<a[t1]?(swap(a[t1],a[u]),(void)(u=N)):(void)0);
	}
	inline void up_min(int u){ for(;gfa(u)&&a[u]<a[gfa(u)];u=gfa(u)) swap(a[u],a[gfa(u)]); }
	inline void up_max(int u){ for(;gfa(u)&&a[gfa(u)]<a[u];u=gfa(u)) swap(a[u],a[gfa(u)]); }
	inline void up(int u)
	{
		if(u==1) return;
		if(dep(u)&1) a[fa(u)]<a[u]?swap(a[fa(u)],a[u]),up_max(fa(u)):up_min(u);
		else a[u]<a[fa(u)]?swap(a[fa(u)],a[u]),up_min(fa(u)):up_max(u);
	}
	inline int size(){ return cnt; }
	inline bool empty(){ return !cnt; }
	inline T top_min(){ return a[1]; }
	inline T top_max(){ return cnt>=3?a[max_pos(2,3)]:(cnt>=2?a[2]:a[1]); }
	inline int top_max_pos(){ return cnt>=3?max_pos(2,3):cnt>=2?2:1; }
	inline void push(T x){ a[++cnt]=x,up(cnt); }
	inline void pop_min(){ a[1]=a[cnt--],down_min(1); }
	inline void pop_max(){ int p=top_max_pos(); a[p]=a[cnt--]; if(p<=cnt) down_max(p); }
	#undef lq
	#undef rq
	#undef fa
	#undef gfa
	#undef dep
};
```

## Deap

更好写，不过速度差不了很多。

考虑维护两个二叉堆，一个是小根堆，一个是大根堆，并且满足小根堆里的每个叶子都比它对应的大根堆里的叶子要小，这样就可以保证小根堆的根就是全局最小，大根堆的根就是全局最大(因为小根堆的根比小根堆的每一个叶子要小，从而比大根堆的每一个叶子要小，从而比大根堆的每一个值要小)。

在实现deap的时候，我们一般不是开两个堆，而是开一个二叉树，根的左子树是小根堆，右子树是大根堆。插入的时候按照二叉堆的方法来插到最后。这样一个叶子对应的叶子就是它加上或者减去$$2^{\lg n-1}$$，可以用内建位运算函数来算。

如果树不是满的，小根堆的一个叶子对应的点可能会在大根堆中不存在，此时我们规定它对应这个应该对应的叶子的父亲。大根堆的一个叶子可能对应两个小根堆的叶子，那它就对应吧，我们只需要多讨论一下。

插入的时候，先检查新点和对应的点是不是满足要求，如果不是那就换过来并对对应的位置向上调整，否则对新插入的位置向上调整。

删除的时候，还是把最后一个元素换过来，然后向下调整，如果调整到叶子发现和对应的点不满足要求那就换过来，然后向上调整。

代码什么的，不重要（