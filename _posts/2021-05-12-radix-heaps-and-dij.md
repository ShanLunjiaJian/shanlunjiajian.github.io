---
layout: post
title: 基数堆和Dij
subtitle: 为什么我这么喜欢用/kk当subtitle啊，/kk
tags: 数据结构 图论
show: true
---

最短路算法Dijkstra大家都知道!

今天我们来说一说，怎么用基数堆+Fib堆把Dijkstra优化到$$O(n\sqrt{\log v}+m)$$，其中$$v$$是边权。

译自Faster Algorithms for the Shortest Path Problem。

翻译这个的原因是学校要带英文读物，然后我就带了这个论文......下星期可能还会看新的东西/cy

## 我们要干什么

众所周知Dij最短路不弱于排序，所以我们有了一个$$\Omega(n\log n+m)$$的下界。Fib堆等数据结构，优化的Dij已经达到了这个下界。所以要想寻找新的Dij优化，就需要从值域上入手，也就是找到高效的弱多项式复杂度算法。

优化Dij，我们的数据结构要做的无非是三件事情 : 

 - insert(插入)

 - decrease-key(减值)

 - extract-min(查询最小值并删除)

Dij本身也有一些性质，我们主要用到的是 : 每次extract-min，取出的最小值是单调递增的。

## Radix Heaps 基数堆

基数堆开了一排桶来存所有的权值。

对于第$$i$$个桶，我们定义$$size(i)$$表示这个桶的大小。第一个桶的大小是$$1$$，除此之外第$$i$$个桶的大小是$$2^{i-2}$$。也就是说桶们的大小是$$1,1,2,4,8,16,...$$。容易发现桶的个数是$$B=\Theta(\log n)$$。

然后定义$$u(i)$$是第$$i$$个桶的右端点。初始化时我们令$$u(i)=u(i-1)+size(i)$$。桶$$i$$所存值的区间就是$$range(i)=[u(i-1)+1,u(i)]$$。桶们一开始存的区间就是$$[0,0],[1,1],[2,3],[4,7],[8,15],...$$。

为了支持快速的插入删除，我们用双链表维护每个桶里面的元素。

接下来我们已经可以实现$$O(\log v)$$的insert了 : 要插入$$x$$，枚举每一个桶，找到$$range$$包含$$x$$的桶，然后插入即可。

decrease-key可以直接重新插入，这是$$O(\log v)$$的，好像有点慢。更好的方法是直接从原来所在的桶开始向前找，这样我们可以定义一个元素的势是它的桶编号，每向前找一个桶都会伴随着势能减少$$1$$，于是我们可以得到一个$$O(1)$$的均摊复杂度。

你说insert的均摊复杂度?它会增加$$O(\log v)$$的势能，所以它的均摊复杂度还是$$O(\log v)$$。

接下来是重头戏extract-min了。我们首先找到第一个非空桶，如果这个桶就是$$1$$号桶，那么我们返回$$1$$号桶中的任意一个元素；否则假设这个桶是$$i$$，我们暴力找到这个桶中的最小值$$x$$。

你发现暴力找最小值可能达到$$O(n)$$，所以我们需要把桶$$i$$ 爆破(distribute)掉 : 给$$i$$前面的桶重新分配$$range$$，并把$$i$$里面的元素放到前面的桶里，让这些元素的前移把复杂度摊掉。

爆破 这个翻译只是觉得通俗并且读起来舒服（

怎么重新分配$$range$$?让$$u(0)=x-1,u(1)=x$$，然后$$u(j)=\min(u(j-1)+size(j),u(i))$$。

你发现根据刚才分配桶大小的方式，第$$i$$个桶前面所有桶的大小之和，刚好就是第$$i$$个桶的大小，所以不可能出现前面的桶装不下$$i$$中元素的情况，所以每个元素至少前移一个桶，这样就摊掉了暴力找最小值的复杂度。于是我们知道extract-min的复杂度是找到第一个非空桶的复杂度$$O(\log v)$$。

使用上面的数据结构，可以得到一个$$O(n\log v+m)$$的Dijkstra优化。这已经挺快的了，更何况基数堆比起什么Fib堆常数要小得多。但是还不够快!

## Two-Level Radix Heaps 双层基数堆

直译的。叫 线段基数堆 好像也很有道理?

基数堆慢在哪里?桶个数太多了，这让我们没法快速找到第一个非空桶。

考虑不要$$2^i$$了，我们取一个常数$$K$$，把桶大小改成$$K,K^2,K^3,K^4,...$$，也就是第$$i$$个桶$$size$$是$$K^i$$。容易发现此时桶个数是$$B=\Theta(\log_K v)$$。

这么大的桶还不是很好，我们再把桶划分成线段，每个桶分成$$K$$个线段，那么第一个桶就由$$K$$条长$$1$$的线段组成，第二个桶由$$K$$条长$$K$$的线段组成，依此类推。

我们记$$seg(i,j)$$表示桶$$i$$的第$$j$$条线段。

桶的右端点和区间分配方式跟普通的基数堆一样，但是我们如何分配线段的区间?

这里我们从桶的右端点开始，从右往左摆放线段。比如一个桶$$i$$里面线段的情况可能是这样的 : 

$$
\_\_\_\_\vert\_\_\_\_\_\_\_\vert\_\_\_\_\_\_\_\vert\_\_\_\_\_\_\_
$$

右边三段每一段长度都是$$K^{i-1}$$，左边那一段被桶$$i-1$$挤住了所以达不到$$K^{i-1}$$。这个桶$$i$$里可能还有别的线段，但是它们都被挤掉了所以不被展示出来。

注意尽管我们从右往左摆放线段，线段还是从左往右编号的。

这样做有什么好处?插入$$x$$的时候，如果我们知道了桶，可以$$O(1)$$知道要插入$$x$$到哪一条线段。这个线段由下面的公式给出 : 

$$
K-\lfloor\frac{u(i)-x}{K^{i-1}}\rfloor
$$

预处理$$K$$的幂，即可做到$$O(1)$$计算。

这样我们就有一个$$O(B)$$的插入了!别忘了$$B$$是桶个数。同时所有decrease-key的总复杂度是$$O(Bn)$$。

然后是extract-min，我们还是找到第一个非空桶$$i$$，并在它里面找到第一个非空线段$$seg(i,j)$$。如果$$i=1$$那么直接删掉随便一个最小值并返回，否则接下来我们不爆破桶$$i$$，而是爆破掉线段$$seg(i,j)$$。

注意到一条线段的大小恰好是它前一个桶的大小，那么一条线段里的元素仍然一定可以全部扔进前面的桶里去，这可以保证我们的复杂度是找到第一个非空桶和第一个非空线段的复杂度$$O(B+K)$$。

这样我们的总复杂度就是$$O((B+K)n+m)$$，而刚才我们知道$$B=\Theta(\log_K v)$$，所以我们取$$K=\log v/\log\log v$$时达到平衡，此时$$B=\Theta(\log v/\log\log v)$$，于是我们得到一个$$O(n\log v/\log\log v+m)$$的Dijkstra。

## Use of Fibonacci Heaps 用Fib堆优化

这个找桶+找线段还是太慢了，居然要达到$$O(K+B)$$。这就让我们很难接着优化。

考虑用一种数据结构来维护这个找线段的过程。给所有线段从左往右编号，我们在Dijkstra中对每个点维护它所在的线段，那么找第一个非空线段就是找这些线段中的最小值。好像又看到了一个堆问题?

这个新的堆问题有一个好处 : 我们只有$$N=KB$$条线段，这个数应该不会很大。

### Extended Fibonacci Heaps 扩展的Fib堆

当然使用Fib堆。对于权值只有$$1,...,N$$的堆问题，有一种方法把Fib堆的复杂度变成$$O(\log N)$$。

我们对于每种权值开一个桶，并选一个代表元。

称Fib堆中一个结点是激活的(active)，当且仅当它存的是代表元；否则它是未激活的(passive)。激活的结点显然最多只有$$N$$个。

称Fib堆中一棵树是激活的，当且仅当它的根是激活的；否则它是未激活的。同时维护两个根链表，分别存激活和未激活的树。这个新的Fib堆保持一个性质 : 所有未激活结点都是根。

为了简单，我们定义 激活一个根 为把这个根设为激活的，并把它的树插入激活的根链表。不激活一个根 类似。对于不是根的点这个操作没有定义。根据上面的性质，我们立刻可以得出 : 激活一个未激活结点一定是有定义的。

保留Fib堆的势函数不变。

insert一个$$x$$时，检查是否已经有值为$$x$$的元素，如果没有那么让$$x$$成为代表元，并激活$$x$$，否则不激活$$x$$。

decrease-key一个$$x$$时，先检查$$x$$是不是代表元，如果是那么从权值和$$x$$相同的元素中随便选一个变成代表元并激活它。

然后直接按照Fib堆的方法做。

然后检查是否已经有值为新的$$x$$的元素，如果没有那么让$$x$$成为代表元并激活$$x$$，否则不激活$$x$$。注意到$$x$$一定被cut掉了，所以它现在一定是根，所以对它的不激活操作一定有定义。

上面两个操作的均摊复杂度显然还是$$O(1)$$。

extract-min时，我们在激活的树中查找$$\min$$，删掉它然后进行一轮合并。一棵未激活树整个都是没有用的，因为整棵树都不比根小，而根不比它的代表元小，所以我们只检查激活的树是正确的。

因为激活的结点最多只有$$N$$个，而未激活的结点都作为根放在未激活的根链表里，所以所有激活的树包含的结点数量总共最多只有$$N$$，所以最大的级也是$$O(\log N)$$级别，我们的复杂度就是$$O(\log N)$$。

-----

好了我们回来拿这个Fib堆优化基数堆。

还记得刚才说到哪里了吗?为了优化双层基数堆，我们把线段从左往右编号，在Dij中我们维护每个点所在的线段编号，那么找第一个非空线段就变成了找这些编号中的最小值。线段编号只有最多$$N=KB$$种，所以用刚才的Fib堆维护就可以做到$$O(\log N)$$查找第一个非空线段。

这样剩下的就只有复杂度平衡的工作了。insert均摊复杂度是$$O(B)$$；decrease-key均摊仍然成立，是$$O(1)$$；extract-min只有找第一个非空线段的复杂度没有摊掉，是$$O(\log N)$$。总复杂度是$$O((B+\log N)n+m)$$。

让我们看看，$$B=\Theta(\log_K v)$$和$$O(\log N)=O(\log(K\log_K v))$$平衡的时候......取$$K=2^{\sqrt{\lg v}}$$，这里$$\lg=\log_2$$，我们得到$$B=\Theta(\sqrt{\log v})$$，以及$$N=\Theta(2^{\sqrt{\lg v}}\sqrt{\log v})$$，于是$$O(\log N)=O(\sqrt{\log v})$$。总复杂度$$O(n\sqrt{\log v}+m)$$。

空间复杂度是$$O(n+m+2^{\sqrt{\lg v}}\sqrt{\lg v})$$，而后面那个东西很小，我算了一下$$v=2^{64}$$的时候它也只有$$2048$$。

### 一个变种

这个来自论文最后一节，不过作者发明这个东西本来不是为了要简单地实现它......

考虑基数堆有点难写，主要原因就是我们需要维护每个桶的$$range$$。扔掉这个东西的话，又不是很好找桶。

不过考虑到基数堆一定程度上是基于二进制的，我们可以干一件很有意思的事情。设最小值是$$min$$，按照$$x\operatorname{xor}min$$的最高位来给$$x$$分配桶。具体地，如果$$x=min$$则把$$x$$扔进第一个桶，否则如果$$x\operatorname{xor}min$$的最高位在第$$i$$位，我们扔进第$$i+1$$个桶。容易发现这样桶还是有序的。

insert一个$$x$$的时候，还是从最后桶开始往前扫，直到扫到一个桶，这个桶对应的$$\mathrm{highbit}$$在$$x\operatorname{xor}min$$中存在，或者说$x$和$min$在这一位上不同。decrease-key类似。

extract-min也很简单。首先从左往右扫到的第一个非空桶肯定包含$$min$$。每次$$min$$改变的时候，我们找到它变化的最高位，假设是第$$i$$位，那么前$$i+1$$个桶里面所有的元素$$\operatorname{xor}min$$的最高位都变低，后面的桶则都没有变，这个东西很容易证明。所以我们还是爆破前$$i+1$$个桶然后重新insert即可。

然后要搬到双层基数堆和它的Fib堆优化上，那就直接把二进制异或换成$$K$$进制异或就好了。找到桶之后，由于一个桶的线段之间需要有序，我们插入到$$x$$这一位对应的线段里，换句话说如果$$x$$的这一位是$$i$$，那么我们插入到桶$$i+1$$。

不过问题在于，不管这样的基数堆多么容易实现，谁会愿意去写Fib堆优化的部分呢?

谢谢朋友们!

在很多年以后，我写了一个基数堆优化的dij。这是CF1520G的代码。

```cpp
#include<stdio.h>
#include<vector>
#include<string.h>
#include<iostream>
using std::cin;
using std::cout;
using std::vector;

int n,m,w,p,a[2002][2002];

#define node(i,j) (((i)-1)*m+(j))
#define inv_node_x(x) (((x)-1)/m+1)
#define inv_node_y(x) (((x)-1)%m+1)

long long dis[4000010];
bool vis[4000010];
struct DijRadixHeap
{
    #define highbit(x) ((x)?64-__builtin_clzll(x):0)
    vector<int> b[60],temp[60];
    int cur,c[60],c0p;
    int p[4000010];
    inline void build(int n,int s)
    {
        cur=s;
        for(int i=1;i<=n;i++)
            c[highbit(dis[i]^dis[s])]++,b[highbit(dis[i]^dis[s])].push_back(i),p[i]=b[highbit(dis[i]^dis[s])].size()-1;
        for(int i=0;i<=55;i++) temp[i].reserve(1000000);
    }
    inline int top(){ return cur; }
    inline void pop()
    {
        static int _c[60];
        int last=cur;c[0]--,p[cur]=-1,cur=0;
        if(c[0]){ while(p[b[0][c0p]]==-1) c0p++; cur=b[0][c0p]; return; }
        for(int i=1;i<=55;i++) if(c[i])
        {
            for(int j=0;j<b[i].size();j++)
                if(highbit(dis[b[i][j]]^dis[last])==i&&p[b[i][j]]==j&&dis[b[i][j]]<dis[cur]) cur=b[i][j];
            for(int j=0;j<=i;j++) c[j]=0;
            for(int j=0;j<=i;j++) temp[j].reserve(c[j]),temp[j].resize(0);
            for(int j=0,t;j<=i;j++)
                for(int k=0;k<b[j].size();k++)
                    if(highbit(dis[b[j][k]]^dis[last])==j&&p[b[j][k]]==k)
                        t=highbit(dis[b[j][k]]^dis[cur]),temp[t].push_back(b[j][k]),c[t]++,p[b[j][k]]=temp[t].size()-1;
            for(int j=0;j<=i;j++) swap(temp[j],b[j]);
            c0p=0;
            break;
        }
    }
    inline void decrease(int u,long long new_d)
    {
        c[highbit(dis[u]^dis[cur])]--,c[highbit(new_d^dis[cur])]++,
        b[highbit(new_d^dis[cur])].push_back(u),p[u]=b[highbit(new_d^dis[cur])].size()-1;
    }
}q;

inline void dij(int _n,int s)
{
    dis[0]=1e16;
    for(int i=1;i<=_n;i++) dis[i]=1e16-1e9;
    dis[s]=0,q.build(_n,s);
    for(int T=1;T<=_n;T++)
    {
        int u=q.top();
        if(vis[u]) continue;
        vis[u]=1;
        if(u==n*m) return;
        if(u==p)
        {
            for(int i=1;i<=n;i++)
                for(int j=1;j<=m;j++)
                    if(a[i][j]>0&&dis[u]+a[i][j]<dis[node(i,j)]) q.decrease(node(i,j),dis[u]+a[i][j]),dis[node(i,j)]=dis[u]+a[i][j];
        }
        else
        {
            int i=inv_node_x(u),j=inv_node_y(u);
            if(i<n&&a[i+1][j]!=-1&&dis[u]+w<dis[node(i+1,j)]) q.decrease(node(i+1,j),dis[u]+w),dis[node(i+1,j)]=dis[u]+w;
            if(j<m&&a[i][j+1]!=-1&&dis[u]+w<dis[node(i,j+1)]) q.decrease(node(i,j+1),dis[u]+w),dis[node(i,j+1)]=dis[u]+w;
            if(i>1&&a[i-1][j]!=-1&&dis[u]+w<dis[node(i-1,j)]) q.decrease(node(i-1,j),dis[u]+w),dis[node(i-1,j)]=dis[u]+w;
            if(j>1&&a[i][j-1]!=-1&&dis[u]+w<dis[node(i,j-1)]) q.decrease(node(i,j-1),dis[u]+w),dis[node(i,j-1)]=dis[u]+w;
            if(a[i][j]>0&&dis[u]+a[i][j]<dis[p]) q.decrease(p,dis[u]+a[i][j]),dis[p]=dis[u]+a[i][j];
        }
        q.pop();
    }
}

int main()
{
    std::ios::sync_with_stdio(0);
    cin.tie(0);
    cin>>n>>m>>w,p=n*m+1;
    for(int i=1;i<=n;i++)
        for(int j=1;j<=m;j++) cin>>a[i][j];
    dij(n*m+1,node(1,1));
    cout<<(dis[node(n,m)]==1e16-1e9?-1:dis[node(n,m)]);
    return 0;
}
```