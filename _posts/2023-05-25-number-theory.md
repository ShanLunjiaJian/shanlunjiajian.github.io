---
layout: post
title: 数论从入门到不进省队
subtitle: /dk
tags: 数学
show: true
---

标题是因为我认识的两个数论大师，数学皇冠上的明珠 wky 和 donghanwen1225 都没进队。

本文不主要讨论筛子相关内容。

-----

开根

开根好像比$\ln$简单。

最简单的情况是求解$x^k=a\pmod{p}$，$k,p$都是素数，且$k\not\mid p-1$。我们直接在膜$p-1$下求$k$的逆，然后计算$a^\frac{1}{k}$即可。

注意到$ab$次根等于$a$次根的$b$次根，所以我们可以先分解$k$，然后就只有$k\mid p-1$和上面的情况了。

-----

tonelli shanks

考虑$k\mid p-1$。先考虑膜奇素数二次剩余。

考虑找到一个奇数$t$满足$a^t=1$，然后就可以一样做了。但是显然这样的事情不总是可以做到，不过通过乘一些易于求平方根的数我们可能可以让它变成这样，可能有点index calculus味。从$t=p-1$开始，不停尝试减少$2$的次数，显然如果$a^{2t}=1$，那么$a^t=\pm 1$。如果$a^t=-1$，我们找一个数$b$使得$b^{2t}=-1$，那么$(b^2a)^t=-1$，而解出$x^2=b^2a$之后，就有$\left(\frac{x}{b}\right)^2=a$。

考虑找一个非二次剩余$w$，就有$\left(w^\frac{p-1}{4t}\right)^{2t}=-1$。但是第一轮的时候$p-1$不被$4t=2(p-1)$整除，不过这种情况发生说明$a^\frac{p-1}{2}=-1$，它就不可能有平方根啦。通过一些预处理，复杂度$O(\log n)$。

考虑任意素数次的开根。如果要开$q$次根，现在$a^t$是某个$\omega_q^i$，我们如法炮制，找一个$b$使得$b^{qt}=\omega_q^{-i}$即可。还是找一个$q$次非剩余$w$，它满足$w^\frac{p-1}{q}=\omega_q^j$，其中$j$是某个数但我们不知道，由于$q$次剩余只占$\frac{1}{q}$所以还是随就行了，但是我们直接找$w^\frac{p-1}{q}=\omega_q^{-i}$需要期望$O(q)$次。接下来考虑$b=w^\frac{p-1}{q^2t}$，它满足$b^{qt}=\omega_q^j$，如果我们能找到$\frac{-i}{j}$，给$b$再做$\frac{-i}{j}$次幂就赢了。不过这是一个任意底的对数，看起来不太好办，bsgs就得到了一个$O(\sqrt{q})$的做法。由于反正要分解，这个复杂度还是不错的!好像锤爆了cipolla。

考虑膜合数。还是crt，现在求出了膜$p^k$的答案，要求膜$p^{k+1}$的。待补/cf

一个有趣的事情是$2,4$有原根，但$2$的更高次幂没有。

-----

cipolla

没锤子用没锤子用没锤子用没锤子用没锤子用没锤子用没锤子用没锤子用没锤子用没锤子用。

-----

类欧几里得

有一个半群，其中有两个元素$U,R$(up, right)，现在画一条直线$\frac{px+r}{q}$，在直线上从$x>0$开始往右走，走到$y$为整数的位置则乘一个$U$，$x$为整数的位置则乘一个$R$，求一直走到$x=n$的答案。如果$x,y$同时为整数，规定先乘$U$再乘$R$。

比如直线下点数，维护一个向量，包含当前的$\lfloor y\rflooor$和总的答案$s$，那么$R$即为$s\leftarrow s+\lfloor y\rflooor$，$U$即为$\lfloor y\rflooor\leftarrow \lfloor y\rflooor+1$。

```cpp
M euclid(long long p,long long q,long long r,long long n,M U,M R)
{
    long long m=((__int128)p*n+r)/q-1;
    return ~m?r=q-r-1,pow(R,r/p)*U*euclid(q%p,p,r%p,m,R,pow(R,q/p)*U)*pow(R,n-((__int128)q*m+r)/p):pow(R,n);
}
```

纠是这样。但是好困难，不如背板子/cf

-----

