---
layout: post
title: 雅礼集训2019 Day2 题解
subtitle: 神仙T3
tags: 题解
---

## T1. two

题意 : 

有两棵树，结点相同而边不同。定义一条边$$x$$对另一条边$$y$$有害，当且仅当两条边不在同一棵树上，并且在$$y$$所在的树上，$$x$$的一个端点在$$y$$较深端点的子树中，而另一个端点不在。

接下来进行若干轮删边，第一轮删掉一条给定边，此后每一轮删除所有对上一轮删掉的某条边有害的边。输出每一轮删了哪些边。

$$n\leq 10^5$$，时限4s，空间512M。

题解 : 

考虑这个东西在干什么，实际上在子树中可以容易地用dfn表示出来，那么我们对两棵树的dfn分别建线段树，每个结点开一个`vector`，然后把每条边插到另一棵树的线段树上，具体插入方法类似于时间线段树。

然后每次删掉一条边之后，在它的树的线段树上找到这个较深端点对应的子树拆成的$$\log$$段区间。然后由于"不在子树内"这个东西，表示在dfn上是一段前缀和一段后缀，那么如果我们给每个`vector`按照dfn排序，那么每次要删掉的部分就是一个前缀和一个后缀，我们维护现在前后各删到哪里了即可。

复杂度是$$O(n\log n)$$。

代码咕咕咕（

## T2. bracket

题意 : 

给一棵树，每个点上有个左括号或者右括号。定义一个括号序列的段数为，它最多可以划分成多少段，使得每一段都是合法括号序列。不合法括号序列的段数为$$0$$。

多次给出一个$$k$$，查询有多少有序点对，满足它们路径上的括号连成的括号序列段数恰为$$k$$。

$$n,m\leq 5\times 10^4$$，时限1s，空间512M。

题解 : 

看到括号，先转成+1和-1。看到路径统计，显然是点分治。看到多次询问，显然要预处理。看到预处理一个数组，可能是法法塔。看到$$5\times 10^4$$，可能是大常数$$\log^2$$。

我们考虑点分治之后怎么合并。肯定要考虑分治块中每个点到分治中心的括号序列，当然分别是顺着和倒着写的。

考虑两个括号序列要想合并之后合法，肯定要求它们的和加起来为$$0$$。但是这个限制并不充分，而一些经典的限制似乎比较难以合并了(比如你在线段树上维护区间括号序列合法性用的东西)，所以我们可能需要一点转化。

首先，我们不需要考虑$$k=0$$也就是不合法的情况，因为总的减去合法的就是不合法的。

在点分治的时候，dfs分治块，相当于对于每个括号序列从分治中心拆开，然后考虑左半边每个后缀和右半边每个前缀。

考虑如果我们拿着一个右半边的括号序列，怎么知道它跟一个左半边的括号序列合并之后，什么位置可以分段呢?

考虑这样的位置就是前缀和为$$0$$的位置。这些位置合并之前可能是负的，而最后它们会变成$$0$$，说明它们应该是前缀和最小值。这些我们不妨称作相对零点。

对称地，如果我们拿着一个左半边的括号序列，那么由于最终合出来的括号序列中，后缀和为$$0$$的位置可以分段，所以后缀最大值就是相对零点。

如果一个左半边的最左位置不是相对零点，或者说这个左半边的总和不等于最大的后缀和，说明这里有一些括号是匹配不动的，那么这个左半边就不需要考虑了。比如括号序列$$)(($$，它的后缀和的最大值是$$2$$而总和是$$1$$，不管你在右边放多少个什么括号，最左边那个右括号总是不能匹配。右半边是同理的。

容易发现两个满足上面条件的左半边和右半边括号序列，合并起来一定是合法括号序列。这就是半个括号序列合法性的结论。

所以至于怎么搞这个半个括号序列，我们可以对作为左半边和右半边两种情况分别进行dfs，每个点有三个状态 : `sum maxx/minn cnt`，分别表示当前括号序列的和、相对零点和段数。

那么设$$Ans$$为答案数组，我们就发现，两个和为$$sum_1,sum_2$$，段数为$$cnt_1,cnt_2$$的括号序列，如果满足$$sum_1+sum_2=0$$，就会对$$Ans_{cnt_1+cnt_2+[sum1=sum2=0]}$$产生$$1$$的贡献。那个艾弗森括号很难受，我们不妨把它加进$$cnt_2$$里面去。

这样我们把所有$$sum$$和$$cnt$$相等的合并起来，把左半边设为$$f_{sum,cnt}$$，右半边是$$g$$，就得到了一个式子:

$$
Ans_k+=\sum_{i=0}^{size}\sum_{j=0}^{k}f_{i,j}g_{-i,k-j}
$$

发现这是一个卷积，于是考虑法法塔优化。但是对每个$$sum$$卷一次，复杂度不是$$O(n^2\log n)$$吗?

考虑每次$$sum$$改变后，$$cnt$$一定清零，那么也就是说每个点最多对一个$$sum$$的最大$$cnt$$产生一次$$1$$的贡献，所以所有$$sum$$的最大$$cnt$$之和就是线性的，所以复杂度实际上是$$O(n\log^2 n)$$。

我居然写了代码!

```cpp
#include<stdio.h>
#include<vector>
using std::vector;

struct Edge
{
	int v,next;
}e[100002];

int ecnt,h[50002];

inline void add_edge(int u,int v)
{
	e[++ecnt]={v,h[u]};
	h[u]=ecnt;
	e[++ecnt]={u,h[v]};
	h[v]=ecnt;
}

const int P=1004535809,g=3;

inline int pow(int a,int n)
{
	int c=1;
	for(;n;n>>=1)
	{
		if(n&1) c=(long long)c*a%P;
		a=(long long)a*a%P;
	}
	return c;
}

const int inv_g=pow(g,P-2);

int rev[262144];

inline void fft_init(int n)
{
	for(int i=1;i<n;i++)
		rev[i]=(rev[i>>1]>>1)|(i&1?n>>1:0);
}

inline void swap(int &x,int &y){ x^=y^=x^=y; }
inline void mod(int &x){ if(x>=P) x-=P; }

inline void fft(int n,int *A,int type)
{
	for(int i=0;i<n;i++)
		if(rev[i]<i) swap(A[rev[i]],A[i]);
	for(int l=2;l<=n;l<<=1)
	{
		int Wn=pow(type==1?g:inv_g,(P-1)/l),mid=l>>1;
		for(int p=0;p<n;p+=l)
		{
			int W=1;
			for(int i=0;i<mid;i++,W=(long long)W*Wn%P)
			{
				int temp=(long long)W*A[p+mid+i]%P;
				mod(A[p+mid+i]=A[p+i]-temp+P);
				mod(A[p+i]=A[p+i]+temp);
			}
		}
	}
}

inline void dft(int n,int *A){ fft(n,A,1); }
inline void idft(int n,int *A)
{
	fft(n,A,-1);
	for(int i=0,inv_n=pow(n,P-2);i<n;i++)
		A[i]=(long long)A[i]*inv_n%P;
}

inline int max(int x,int y){ return x>y?x:y; }

int size[50002],dp[50002];
bool vis[50002];

void get_root(int u,int fa,int s,int &ans)
{
	size[u]=1,dp[u]=0;
	for(int i=h[u];i;i=e[i].next)
		if(e[i].v!=fa&&!vis[e[i].v])
			get_root(e[i].v,u,s,ans),size[u]+=size[e[i].v],dp[u]=max(size[e[i].v],dp[u]);
	dp[u]=max(dp[u],s-size[u]);
	if(dp[u]<dp[ans]) ans=u;
}

int a[50002];
vector<int> v1[50002],v2[50002];

void fill(int u,int fa)
{
	size[u]=1;
	for(int i=h[u];i;i=e[i].next)
		if(e[i].v!=fa&&!vis[e[i].v])
			fill(e[i].v,u),size[u]+=size[e[i].v];
}

void get1(int u,int fa,int sum,int maxx,int cnt)
{
	sum+=a[u];
	if(sum>maxx) maxx=sum,cnt=0,v1[sum].push_back(cnt);
	else if(sum==maxx) cnt++,v1[sum].push_back(cnt);
	for(int i=h[u];i;i=e[i].next)
		if(e[i].v!=fa&&!vis[e[i].v])
			get1(e[i].v,u,sum,maxx,cnt);
}

void get2(int u,int fa,int sum,int minn,int cnt)
{
	sum+=a[u];
	if(sum<minn) minn=sum,cnt=0,v2[-sum].push_back(cnt+(sum!=0));
	else if(sum==minn) cnt++,v2[-sum].push_back(cnt+(sum!=0));
	for(int i=h[u];i;i=e[i].next)
		if(e[i].v!=fa&&!vis[e[i].v])
			get2(e[i].v,u,sum,minn,cnt);
}

int A[262144],B[262144],C[262144],Ans[100002];

inline void calc(int n,int type)
{
	for(int i=0;i<=n;i++)
	{
		/*printf("\n%d: ",i);
		for(int j=0;j<v1[i].size();j++)
			printf("%d ",v1[i][j]);
		printf("\n-%d: ",i);
		for(int j=0;j<v2[i].size();j++)
			printf("%d ",v2[i][j]);*/
		if(!v1[i].size()||!v2[i].size()) continue;
		int _len=0;
		for(int j=0;j<v1[i].size();j++)
			_len=max(_len,v1[i][j]);
		for(int j=0;j<v2[i].size();j++)
			_len=max(_len,v2[i][j]);
		int len=1;
		while(len<((_len+1)<<1)+1) len<<=1;
		for(int j=0;j<len;j++)
			A[j]=B[j]=0;
		for(int j=0;j<v1[i].size();j++)
			A[v1[i][j]]++;
		for(int j=0;j<v2[i].size();j++)
			B[v2[i][j]]++;
		fft_init(len);
		dft(len,A),dft(len,B);
		for(int j=0;j<len;j++)
			C[j]=(long long)A[j]*B[j]%P;
		idft(len,C);
		/*printf("\n");
		for(int i=0;i<len;i++)
			printf("%d ",type*C[i]);*/
		
		for(int j=1;j<=n&&j<len;j++)
			Ans[j]+=type*C[j];
		/*printf("\n");
		for(int i=0;i<len;i++)
			printf("%d ",Ans[i]);*/
	}
}

inline void clear(int n)
{
	for(int i=0;i<=n;i++)
		v1[i].clear(),v2[i].clear();
}

void dfs(int u,int s)
{
	int cur=0;
	get_root(u,0,s,cur);
	//printf("\nNow node: %d",cur);
	fill(cur,0);
	get1(cur,0,0,0,0);
	v2[0].push_back(0);
	for(int i=h[cur];i;i=e[i].next)
		if(!vis[e[i].v])
			get2(e[i].v,cur,0,0,0);
	calc(size[cur],1),clear(size[cur]);
	for(int i=h[cur];i;i=e[i].next)
		if(!vis[e[i].v])
			get1(e[i].v,cur,a[cur],max(a[cur],0),0),
			get2(e[i].v,cur,0,0,0),
			calc(size[e[i].v]+1,-1),clear(size[e[i].v]+1);
	vis[cur]=1;
	for(int i=h[cur];i;i=e[i].next)
		if(!vis[e[i].v])
			dfs(e[i].v,size[e[i].v]);
}

int n,m;
char s[10];

int main()
{
	//freopen("bracket.in","r",stdin);
	//freopen("bracket.out","w",stdout);
	dp[0]=0x7fffffff;
	scanf("%d",&n);
	for(int i=1,u,v;i<n;i++)
		scanf("%d%d",&u,&v),add_edge(u,v);
	for(int i=1;i<=n;i++)
		scanf("%s",s+1),a[i]=s[1]=='('?1:-1;
	dfs(1,n);
	scanf("%d",&m);
	for(int i=1,x;i<=m;i++)
		scanf("%d",&x),printf("%d\n",Ans[x]);
	return 0;
}
```

## T3. sum

题意 : 

从$$1,...,n$$中选一些数，使得它们两两互质，并且和尽可能大。

$$n\leq 10^5$$，时限1s，空间512M。

题解 : 

官方题解给了两个奇妙性质!

第一个是说，最优方案中的每个数，最多只有两个质因子。

第二个是说，如果这个数有两个质因子，那么其中一个$$\leq\sqrt{n}$$，另一个$$\geq\sqrt{n}$$。

这个东西好像没找到证明......

不过接下来就简单了，我们建立二分图，然后做最大权匹配，也就是跑最大费用流。

不过这样边数是$$O(n^2)$$的，我们可以考虑一个剪枝，仅当把两个质数合并起来能增大答案的时候才连边，这样做边数会下降很多。

不过这样直接匹配还是会爆，我们可以先构造一组不是最优但接近最优的解，然后卡卡常就过了。这个代码也咕咕咕。