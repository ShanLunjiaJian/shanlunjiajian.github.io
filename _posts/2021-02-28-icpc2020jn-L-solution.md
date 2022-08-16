---
layout: post
title: ICPC2020济南站 L. Bit Sequence 题解
subtitle: /kk
tags: dp
---

我参加的第一场ICPC/kk，赛时跟zrz搞了两个小时这个L(，同时gkj搞了两个小时A)，还是没有搞出来，最后四题打铁了/kk

然后模拟赛出了这题的加强版，我一看这不是原题吗?结果写不动爬了/kk

好了我们进入正题。

题意 : 给一个长$$m$$的01序列$$a_0,...,a_{m-1}$$，求$$[0,L]$$间有多少个数$$x$$满足$$x+0,...,x+m-1$$的$$\mathrm{popcnt}$$奇偶性和$$a$$相同。$$m\leq 50, L\leq 10^{18}$$，$$1000$$组数据。

看到这种$$L\leq 10^{18}$$的数数(不是"数数"!)题，一般不用想找规律，直接数位dp硬上即可。可是我不会数位dp啊!

发现一个非常显然的事情，$$m\leq 50$$，所以$$x+m-1$$的前面很多位都很难被影响，我们可以考虑对前面进行数位dp，后面的部分可以暴力处理。这个性质具体讲，就是一个数$$x$$被加上$$49$$，最多造成一次进到第$$7$$位或者更高位的进位，所以我们可以数位dp前面的位，然后暴力枚举后6位。

要想暴力处理，我们需要知道什么呢?其实就四个事 : 是否达到上界，这个数前面那些位的$$\mathrm{popcnt}$$奇偶性，这个数第$$7$$位开始往上连续$$1$$的奇偶性。这三个bool量我们分别记为$$lim,s,t$$。~~这件事有多显然呢?显然到我跟zrz都当场发现了~~

如果$$lim=1$$，我们枚举后6位的上界就是$$L\space\mathrm{mod}\space 64$$，否则就是$$63$$。

然后我们枚举后6位，记为$$i$$，再假设现在匹配到$$a$$的第$$j$$个位置，那么如果没有进位，这个数的$$\mathrm{popcnt}$$奇偶性就是$$\mathrm{popcnt}(i+j)\space\mathrm{xor}\space s$$的奇偶性；如果有进位就是$$\mathrm{popcnt}(i+j)\space\mathrm{xor}\space s\space\mathrm{xor}\space t$$的奇偶性。

预处理$$\mathrm{popcnt}$$，暴力匹配复杂度比较玄学，可以给一个单次$$m^2\log L$$的很松的上界。

要想数位dp，我们只要知道当前考虑到哪一位和刚才说的那三个量就可以了。

这里放一个加强版的~~胡乱写的~~代码，其中与原题不同的是$$m\leq 600$$。还挺短，只有50lines。

```cpp
#include<stdio.h>
#include<string.h>

long long dp[64][2][2][2],L;
int a[602],b[64],m,popcnt[4096];

long long dfs(int pos,bool lim,bool s,bool t)
{
	if(dp[pos][lim][s][t]!=-1) return dp[pos][lim][s][t];
	dp[pos][lim][s][t]=0;
	if(pos<=9)
	{
		int up=lim?L%1024:1023;
		for(int i=0;i<=up;i++)
		{
			bool flag=1;
			for(int j=0;j<m;j++)
			{
				if(i+j<1024) flag&=popcnt[i+j]^s==a[j];
				else flag&=popcnt[i+j]^s^t==a[j];
				if(!flag) break;
			}
			dp[pos][lim][s][t]+=flag;
		}
		return dp[pos][lim][s][t];
	}
	int up=lim?b[pos]:1;
	for(int i=0;i<=up;i++)
		dp[pos][lim][s][t]+=dfs(pos-1,lim&&(i==up),s^i,i&(t^1));
	return dp[pos][lim][s][t];
}

int main()
{
	int T;
	scanf("%d",&T);
	for(int i=1;i<4096;i++)
		popcnt[i]=popcnt[i>>1]^(i&1);
	while(T--)
	{
		scanf("%d%lld",&m,&L);
		memset(b,0,sizeof(b));
		long long temp=L;
		for(int i=0;temp;i++,temp>>=1)
			b[i]=temp&1;
		for(int i=0;i<m;i++)
			scanf("%d",&a[i]);
		memset(dp,-1,sizeof(dp));
		printf("%lld\n",dfs(63,1,0,0));
	}
	return 0;
}
```