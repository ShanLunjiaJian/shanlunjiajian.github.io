---
layout: post
title: 类楼房重建线段树
subtitle: 有意思
tags: 线段树 数据结构
---

楼房重建

给一个序列$$a$$，支持单点修改，查询把所有数从右往左扔进一个单调栈之后，单调栈的大小。

使用线段树。考虑如何合并信息。

考虑如果左儿子最大值大于等于右儿子最大值，那么右儿子直接弹没了，此时答案就是左儿子答案。

否则，发现不是很好合并，因为左儿子会影响右儿子答案。

我们写一个`calc(u,k)`表示结点$$u$$区间中从右往左，最后往单调栈扔进一个$$k$$得到的单调栈大小。这样上面那个情况的答案就是`calc(右儿子,左儿子max)`。我的习惯是左儿子是`lq(u)`，右儿子是`rq(u)`，原因是我初一学线段树的时候英语不好，总是以为child的首字母是q。

这个`calc`怎么写?

既然已经写出了这么奇怪的东西，我们可以考虑递归下去。

如果只剩一个，那么完全不用递归，直接返回`a[i]>k`。

如果左儿子最大值不超过$$k$$，那么左儿子没了，我们直接递归进入右儿子。

如果左儿子最大值超过$$k$$，那么左儿子最大值弹掉的东西不会比$$k$$少，所以$$k$$对右儿子没有影响了，递归进入左儿子。此时右儿子的贡献呢?就是`calc(rq(u),t[lq(u)].max)`，这个东西重复计算太慢了，我们可以每个点维护一下，不妨记为`val`。

所以可以写出代码

```cpp
inline int calc(int u,int k)
{
	if(t[u].l==t[u].r) return a[u]>k;
	if(k<t[lq(u)].max) return calc(lq(u),k)+t[lq(u)].val-t[rq(u)].val;
	else return calc(rq(u),k);
}
```

这是好的。然后怎么合并?

```cpp
inline void push_up(int u){ t[u].max=max(t[lq(u)].max,t[rq(u)].max),t[u].val=calc(rq(u),t[lq(u)].max); }
```

维护一下就可以过了。复杂度，因为`calc`一次复杂度是$$O(\log n)$$，一共是$$O(n\log^2 n)$$。

完整代码 : 

```cpp
#include<stdio.h>

struct Num
{
	int x,y;
};
inline bool operator == (const Num &a,const Num &b){ return a.x==b.x&&a.y==b.y; }
inline bool operator < (const Num &a,const Num &b){ return (long long)a.y*b.x<(long long)a.x*b.y||(a==Num{0,0}&&b.y!=0); }
inline Num max(Num a,Num b){ return a<b?b:a; }

struct Node
{
	int l,r;
	Num max;
	int val;
}t[400002];

#define lq(u) ((u)<<1)
#define rq(u) ((u)<<1|1)

inline int calc(int u,Num k)
{
	if(t[u].l==t[u].r) return k<t[u].max;
	if(k<t[lq(u)].max) return calc(lq(u),k)+t[u].val;
	else return calc(rq(u),k);
}
inline void push_up(int u){ t[u].max=max(t[lq(u)].max,t[rq(u)].max),t[u].val=calc(rq(u),t[lq(u)].max); }

void build(int l,int r,int u)
{
	t[u].l=l,t[u].r=r;
	if(l==r)
	{
		t[u].max=Num{l,0};
		t[u].val=0;
		return;
	}
	int mid=(t[u].l+t[u].r)>>1;
	build(l,mid,lq(u)),build(mid+1,r,rq(u));
	push_up(u);
}

void change(int p,int u,int v)
{
	if(t[u].l==t[u].r)
	{
		t[u].max=Num{t[u].l,v};
		t[u].val=(t[u].max.y>0);
		return;
	}
	int mid=(t[u].l+t[u].r)>>1;
	if(p<=mid) change(p,lq(u),v);
	else change(p,rq(u),v);
	push_up(u);
}

int n,m;

int main()
{
	scanf("%d%d",&n,&m);
	build(1,n,1);
	for(int i=1,x,y;i<=m;i++)
		scanf("%d%d",&x,&y),change(x,1,y),printf("%d\n",calc(1,Num{0,0}));
	return 0;
}
```

