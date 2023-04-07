---
layout: post
title: 树分治的remake
subtitle: /tuu
tags: 数据结构
show: true
---

大家都会wctt!好的这篇结束了（

-----

一个cluster是一个边的连通块(把所有边的所有端点拿出来之后连通)，它有不超过两个点和树的其它部分相连，这些点称为boundary node 界点。因为界点只有不超过两个，每个cluster可以看成一个叶子或者一条边，cluster之间形成了一个收缩的树结构，不妨称为收缩树。所以把一个界点的cluster称为leaf cluster，两个界点的称为edge cluster，我忘了从哪里看到的但是我想这么用就这么用啦。

-----

让我们从基础题开始。

第七分块(洛谷5399 Ynoi2018 駄作)

让我们先看看如何构造一个树分块。https://missingroom.github.io/_posts/2021-03-13-%E6%A0%91%E5%88%86%E5%9D%97%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0/

设块长是$K$，我们希望每个cluster大小$\leq K$，考虑直接自底向上做，把每条边分进一个cluster。选择一个点作为一个cluster的界点，当且仅当目前剩下的边数$>K$，或子树中有超过一个点是一个未确定的cluster的界点，或这个点是根。如果目前剩下的边数$>K$，我们贪心地把子树们分进若干$\leq K$的cluster，那么相邻两个cluster的大小和$>K$，把所有这些都加起来，我们知道所有cluster大小总和的两倍$\geq$ 这样生成的cluster的数量$\times K$，也就是这样的cluster不超过$\frac{2n}{K}$个。case 2的效果是让继续参与这个过程的界点个数减少了至少$1$，但它也可能拿那些不包含界点的子树生成一些leaf cluster，这些leaf cluster也不超过$\frac{2n}{K}$个。所以cluster总数不超过$\frac{6n}{K}+O(1)$。

那么接下来，考虑如何维护信息。显然每个邻域涉及到$O(\sqrt{n})$个cluster的整个/前/后缀，以及$O(1)$个cluster内的不一定是啥的邻域，这里前/后缀是是只保留cluster中的点，某个界点的某个邻域。

这个感觉就很离谱!考虑预处理每个cluster的前/后缀到每个邻域的贡献，但是邻域看起来很多。

需要一些性质。定义cluster path是一个cluster的两个界点之间的路径，如果是leaf cluster则没有cluster path。注意到计算两个cluster之间的贡献时，如果两个cluster相同，这种情况每次查询只会发生$O(\sqrt{n})$次，可以爆力$O(n\sqrt{n})$预处理。如果两个cluster没有祖先-后代关系，各选一个点的lca必然是两个cluster界点的lca，否则必然是较浅的cluster中较浅的点所挂的那个cluster path上的点。

在前一个case中，我们枚举这个lca，它必然在界点们的虚树上，所以也只有$O(\sqrt{n})$个，更进一步它必然也是一个界点。问题就是数子树中在邻域中的点数，这个在收缩树上很容易完成。

在后一个case中，考虑每个cluster作为祖先的贡献，发现它跟子树中每个点间产生的贡献是相同的。作为后代的贡献也是一样的。

需要预处理每个前/后缀的点数，深度和，cluster path上所挂点的深度的和，然后对那$O(1)$个比较自由的邻域爆力一下。这就$O(\sqrt{n})$啦。

-----

链加链rank

分块之后一条链只可能经过若干cluster path，并在两端经过一些零散部分。维护cluster path的标记即可。复杂度$O(n\sqrt{n\log n})$。

-----

洛谷6778 Ynoi2009 rpdq

让我们想起tb7的爆力。二次离线，需要一个$O(\sqrt{n})$到根链$+1$，$O(1)$到根链求和的数据结构，树分块，每个点的答案就是到cluster path上的一段加上cluster path的一个前缀加上上侧界点到根的答案。修改的时候整块打cluster path标记，零散部分爆力重构即可。

-----

top tree

考虑如何建立一个分治结构。两个cluster可以合并，当且仅当它们有一个共同的界点，并且合并之后这个点不再是界点(或者你不再需要考虑经过这个点和外面连接的情况了)。

有共同界点的edge cluster可以进行compress以串起来。有共同界点的leaf cluster和edge cluster可以进行rake，以把leaf cluster挂到那另一个上面。因为我们要求合并之后不再是界点，compress消除收缩树上一个二度点，rake则消除一个叶子。

注意到对于任意一棵树，有至少一半的点是叶子或二度点。贪心地选择一个极大独立集，由于每合并一个点最多让另外两个在这一轮不能被合并，我们可以进行至少约$\frac{n}{6}$次合并，于是可以建立一棵深度不超过$\log$的合并树。这种合并树称为top tree。

-----

weight balanced，基于链分治的静态top tree

定义一棵树是重量平衡的，当且仅当存在一个常数$\alpha>1$，使得对于每个点，向上走$O(1)$步就可以使得子树大小至少是原来的$\alpha$倍。

看起来刚才我们大力合并建立的top tree并不像是重量平衡的。一个经典的重量平衡静态top tree是基于链分治的。考虑我们递归地把轻子树合并成一个leaf cluster，全部rake到重链上，然后把重链compress起来。对于每条重链，我们按轻子树总大小$+1$，也就是完成rake之后的cluster大小建立huffman树。对于每个点的轻儿子的rake树，我们按子树大小建立huffman树。huffman树满足每向上走$O(1)$步就可以使得子树大小翻倍，考虑如果一个点参与合并的时候是最小的那个，那么显然它翻倍了，如果一个点连续两次参与合并的时候都是次小的那个，那么第二次和它合并的点，原来比它大，现在比它小，所以和这个点合并之后它还是翻倍了。

-----

动态top tree

https://zx2003.blog.uoj.ac/blog/7884

https://negiizhao.blog.uoj.ac/blog/4912

https://www.luogu.com.cn/blog/502410/sone1-imaglct-satt-develop-p5649

对于动态树。遗憾的是动态的huffman树看起来并不好实现。我们可以使用treap式的top tree或者类似splay的self adjusting top tree。

这里说一下satt是个啥吧!论文哥的两份经典代码。

https://codeforces.com/problemset/submission/1434/96716697

https://codeforces.com/problemset/submission/1434/96753609

看不懂捏。加上我还不会leafy splay或者leafy st-tree之类的东西，所以就不说了（

-----

链加链rank

为了分散层叠，在cluster间建立静态top tree。更简单的方法不需要实现贪心树分块，可以直接对整棵树建立静态top tree，然后取所有大小$\leq K$的极高的点作为一个树分块。

如果是动态树，直接换成动态top tree即可。

-----

cts2022 WBTT

感谢zx2003对top tree普及做出的贡献。

动态top tree。

如果是静态的，直接分块，在cluster path上建个线段树。使用动态top tree同时作为树分块和块内线段树，也就是取所有大小$\leq K$的极高的点作为一个树分块，link cut的时候重构总长是$O(\sqrt{n})$的，复杂度$O(n\sqrt{n})$。

-----

noi2022 树上邻域数点

感谢zx2003对创死选手做出的贡献。

考虑如果$d$是固定的怎么做。树分块，块大小为$d$，那么每次查询必然是一个完整的cluster和以它的界点为中心的两个外向邻域的并。考虑如何快速处理外面这部分，块只有$\Theta(\frac{n}{d})$个，换根dp，保留长$d$的信息，在收缩树上递归一个儿子，就是并入其它儿子，shift若干位，再并上什么东西，前后缀和一下，复杂度就是$O(n)$的。

如果$d$不固定，注意到我们只要求块大小$\leq d$，取$2^k$作为块大小并处理出$d\in[2^k,2^{k+1})$的答案，复杂度$O(n\log n)$。但是据说被卡常了。

或者有个静态top tree的想法。建立静态top tree，对于一个查询，我们找到包含邻域中心的父边，且被邻域完全包含的最浅的cluster。显然邻域半径不超过这个cluster的父亲的大小，否则父亲也被这个邻域完全包含。那么我们在top tree上自顶向下做这个好像是换根dp的东西，具体做法类似于 消失之物，每个点就只需要保留父亲大小那么长的信息，于是复杂度和top tree所有子树大小之和同阶。这个东西具有更小的常数。

