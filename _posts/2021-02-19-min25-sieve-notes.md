---
layout: post
title: Min_25筛学习笔记
subtitle: 毒瘤
tags: 数学 数论
---

本文参考[wqy神犇的blog](https://www.luogu.com.cn/blog/wucstdio/solution-p5325)。

好像快要学完数论板子了呢!

Min_25筛是扩展埃氏筛(Extended Eratosthenes Sieve, EES)的一种，是日本选手Min_25发明的，用来求一类积性函数的前缀和。它的应用范围广，代码难度与杜教筛接近，常数很小，把洲阁筛吊着打。不过它的推导过程有些奇妙，比杜教筛和Powerful Number难了不止一丶。

Min_25筛要求它求和的积性函数在质数处的值可以被表示成若干个易于求前缀和的完全积性函数的线性组合，比如$$\varphi(p)=p-1$$，于是$$\varphi=\mathrm{id}-\mathbb{1}$$。

Min_25筛把质数和非质数(不说合数是因为有$$1$$)分开来求。

$$
\sum_{i=1}^{n}f(i)=\sum_{i\in P}f(i)+\sum_{i\notin P}f(i)
$$

然后我们看一看非质数的部分，设$$\mathrm{minp}(n)$$表示$$n$$的最小质因子，枚举一个最小质因子和它的次数，并根据积性提出来

$$
\sum_{p^k}^{\sqrt{n}}f(p^k)\sum_{i\leq\lfloor\frac{n}{p^k}\rfloor\text{且}\mathrm{minp}(i)>p}f(i)
$$

整个算法分两部分，第一部分求质数处的点值和，第二部分求出答案。

-----

因为$$f$$在质数处可以表示为若干易于求前缀和的完全积性函数的线性组合，我们可以对每个完全积性函数跑一遍，每次搞一个函数$$t$$，它在所有质数处和$$f$$取值相同(非质数我们不管)并且它是一个易于求前缀和的完全积性函数，求出所有质数的$$t$$之和，最后全加起来。

要求质数处的值，我们可以用埃筛的方法。设$$g(n,i)$$表示$$n$$以内所有数，拿前$$i$$个质数筛过之后，剩下的数的$$t$$和。$$g(n,0)$$非常好求。因为非质数$$x$$的最小质因子不超过$$\sqrt{x}$$，我们想要的就是$$g(n,\pi(\lfloor\sqrt{n}\rfloor))$$，这个东西简写为$$g(n)$$。

$$g(n,i)$$也可以解释成$$n$$以内最小质因子$$>p_i$$的数和质数的$$t$$值和。

考虑从$$g(n,i-1)$$转移到$$g(n,i)$$，这相当于拿着第$$i$$个质数$$p_i$$筛了一遍，那么筛掉的就是最小质因子为$$p_i$$的非质数。可以写出下面的式子 : 

$$
g(n,i)=g(n,i-1)-\sum_{\mathrm{minp}(j)=p_i\text{且}j\notin P}^{n}t(j)
$$

由于$$t$$是完全积性函数，我们可以提出一个$$p_i$$，得到

$$
g(n,i)=g(n,i-1)-t(p_i)\sum_{\mathrm{minp}(j)\geq p_i}^{\lfloor\frac{n}{p_i}\rfloor}t(j)
$$

容易发现后面那个$$\sum$$里面的东西就是$$g(\lfloor\frac{n}{p_i}\rfloor,i-1)$$去掉前$$i-1$$个质数，也就是$$g(\lfloor\frac{n}{p_i}\rfloor,i-1)-\sum_{j=1}^{i-1}t(p_j)$$，如果我们设$$h(i)=\sum_{j=1}^{i}t(p_j)$$，这个东西是可以线筛的。由于我们用到的质数不会超过$$\sqrt{n}$$，预处理$$h$$的复杂度是$$O(\sqrt{n})$$的。然后我们就得到了一个很美观的式子 : 

$$
g(n,i)=g(n,i-1)-t(p_i)(g(\lfloor\frac{n}{p_i}\rfloor,i-1)-h(i-1))
$$

但是这看起来需要递归求解，不过容易想起一个经典结论$$\lfloor\frac{\lfloor\frac{a}{b}\rfloor}{c}\rfloor=\lfloor\frac{a}{bc}\rfloor$$，所以实际上不管我们除了什么东西，最后递归到的一定是某个$$g(\lfloor\frac{n}{x}\rfloor,i)$$，而$$\floor\frac{n}{x}\rfloor$$的取值有$$O(\sqrt{n})$$种，我们只要先预处理出这些取值，然后一层一层递推就好了。

具体实现上，我们用整除分块的方法搞出所有$$\lfloor\frac{n}{x}\rfloor$$，然后进行类似于杜教筛的编号 : 把数分成两类分开存储，对于$$x\geq\sqrt{n}$$的编号为$$\lfloor\frac{n}{x}\rfloor$$，对于$$x<\sqrt{n}$$的编号为$$\lfloor\frac{n}{\lfloor\frac{n}{x}\rfloor}\rfloor$$，可以写一个`define`获得更简洁的实现。在求$$g$$的过程中，我们可以进行滚动数组。

-----

第二部分求出答案，我们设$$S(n,i)$$表示$$n$$以内所有$$\mathrm{minp}(x)>p_i$$的数的$$f$$值之和，那么答案就是$$S(n,0)$$。这里任何一个$$S$$都不考虑$$1$$。

这个东西分成两部分，一部分是$$>p_i$$的质数，这个就是$$g(n)-h(i)$$；另一部分是最小质因子$$>p_i$$的合数，枚举最小质因子和次数并提出来，可以得到

$$
S(n,i)=g(n)-h(i)+\sum_{k=i+1}^{\pi(\lfloor\sqrt{n}\rfloor)}\sum_{p_k^e\leq n}f(p_k^e)\left(S(\lfloor\frac{n}{p_k^e}\rfloor,k)+[e\neq 1]\right)
$$

直接递归，复杂度被证明是$$O(n^{1-\epsilon})$$，并且在$$10^{14}$$范围内是$$O(\frac{n^{\frac{3}{4}}}{\log n})$$的，常数极小，吊着洲阁筛打。

对于板子题，$$f(p)=p(p-1)=p^2-p$$，所以在质数处有$$f=\mathrm{id}_2-\mathrm{id}$$，这两个东西是完全积性函数并且易于求前缀和，所以我们跑两次第一部分就好了。

```cpp
#include<stdio.h>
#include<math.h>

const int P=1e9+7;
const int inv_2=500000004;
const int inv_3=333333336;

int prime[100002],pcnt,h1[100002],h2[100002];
bool b[100002];

int K;
long long N,a[200002];
int g1[200002],g2[200002],id1[100002],id2[100002],cnt;
#define id(x) ((x)<=K?id1[x]:id2[N/(x)])
#define g(x) ((g2[id(x)]-g1[id(x)]+P)%P)
#define h(x) ((h2[x]-h1[x]+P)%P)

#define t1(x) ((x)%P)
#define t2(x) ((long long)(x)*(x)%P)
#define sum_t1(x) ((long long)(x)%P*((x)%P+1)%P*inv_2%P)
#define sum_t2(x) ((long long)(x)%P*((x)%P+1)%P*(2*(x)%P+1)%P*inv_2%P*inv_3%P)
#define f(x) ((long long)((x)%P)*(((x)%P)-1)%P)

inline void sieve(int n)
{
	for(int i=2;i<=n;i++)
	{
		if(!b[i])
		{
			prime[++pcnt]=i;
			h1[pcnt]=t1(i);
			h2[pcnt]=t2(i);
		}
		for(int j=1;j<=pcnt&&i*prime[j]<=n;j++)
		{
			b[i*prime[j]]=1;
			if(i%prime[j]==0) break;
		}
	}
	for(int i=1;i<=pcnt;i++)
		h1[i]=(h1[i-1]+h1[i])%P,h2[i]=(h2[i-1]+h2[i])%P;
}

inline void init(long long n)
{
	sieve(K=(int)sqrt(n));
	for(long long l=1,r;l<=n;l=r+1)
	{
		r=n/(n/l);
		cnt++;
		a[cnt]=n/l,id(a[cnt])=cnt;
		int temp=a[cnt]%P;
		g1[cnt]=(sum_t1(temp)-1+P)%P;
		g2[cnt]=(sum_t2(temp)-1+P)%P;
	}
}

inline void G()
{
	for(int i=1;i<=pcnt;i++)
		for(int j=1;j<=cnt&&(long long)prime[i]*prime[i]<=a[j];j++)
		{
			int k=id(a[j]/prime[i]);
			g1[j]=(g1[j]-(long long)t1(prime[i])*(g1[k]-h1[i-1]+P)%P+P)%P;
			g2[j]=(g2[j]-(long long)t2(prime[i])*(g2[k]-h2[i-1]+P)%P+P)%P;
		}
}

int S(long long n,int k)
{
	if(prime[k]>=n) return 0;
	int ans=(g(n)-h(k)+P)%P;
	for(int i=k+1;i<=pcnt&&(long long)prime[i]*prime[i]<=n;i++)
	{
		long long c=prime[i];
		for(int e=1;c<=n;e++,c=c*prime[i])
			ans=(ans+f(c)*(S(n/c,i)+(e!=1))%P)%P;
	}
	return ans;
}

int main()
{
	scanf("%lld",&N);
	init(N);
	G();
	printf("%d",(S(N,0)+1)%P);
	return 0;
}
```