---
layout: post
title: 一些比赛的题解
subtitle: /ll
tags: 题解
---

因为没地方放就开了一个。

-----

联合省选2022

D1

A. 预处理器

模拟。

B. 填树

考虑枚举一条链，然后枚举最小值$l$，那么我们需要所有数都在$[l,l+k]$之中，并且有一个数$=l$。第二个限制可以用$[l,l+k]-[l+1,l+k]$差分掉，也就是我们拿$k-1$再跑一次。

考虑固定一个区间$[l,r]$之后，一个点的方案数分成五段，贡献也分成五段。

 - 如果$r<l_i$，方案数是$0$，贡献是$0$。

 - 如果$l\leq l_i\leq r$，方案数是$r-l_i+1$，是一个关于$l$的一次函数，贡献是$s(l_i,r)$，是一个关于$l$的二次函数，其中$s$是整数区间和。

 - 如果$l_i\leq l\leq r\leq r_i$，方案数是$r-l+1$，是一个常数，贡献是$s(l,r)$，是一个关于$l$的二次函数。

 - 如果$l\leq r_i\leq r$，方案数是$r_i-l+1$，是一个关于$l$的一次函数，贡献是$s(l,r_i)$，是一个关于$l$的二次函数。

 - 如果$r_i<l$，方案数是$0$，贡献是$0$。

每一个$l$的答案是所有点的贡献乘起来。

我们可以把这些分段函数直接乘起来，然后得到一个$O(n)$段的函数，每一段都是$O(n)$次，每一段求一个和就行了，可以用经典的线性拉插$O(n)$求一段。外层还有$O(n^2)$的枚举链，总复杂度$O(n^4)$。

优化看起来比较简单，我们改成外层枚举$l$，那么内层看起来是要求所有链的乘积的和，于是总复杂度$O(n^3\log n)$，其中$\log$是排序。

然后可以改成树形dp变成$O(n)$次合并$O(n)$段的$O(n)$次函数，于是总复杂度变成$O(n^3)$了。

C. 学术社区

不会。

容易想到一些图论做法。考虑这个问题看起来很像路径覆盖，然后发现特殊性质A确实是可以这么做的，也就是对于每条消息给楼上连到楼下，然后对于每个学术消息从一个虚点连到发消息的人，然后我们要把这些边划分成若干路径使得路径数最小。考虑网络流，我们给每个人拆成一个入点一个出点，然后，

D2

学校vp了这一套。

A. 卡牌

考虑给每个数按大素因数分类，然后小素因数fmt。看起来挺套路的（

为什么我写了一发直接挂了啊?

B. 序列变换

注意到$x,y\leq 1$，并且有个部分分是$x=0,y=1$，所以想到要对这个讨论。

考虑建立表达式树，那么这个操作1相当于合并一个点的两个相邻儿子，然后把右边那个的左括号作为一个单点扔到下一层。一个简单结论是，我们会从上往下操作每一层，因为操作下面不影响上面，而操作上面会合并下面，这样在操作每一层的时候拥有最大的自由度(操作2是任意重排所有儿子)。

考虑$x=0,y=1$怎么做。此时可以发现每一层只有一个左括号可以不付出代价，剩下的左括号都要付出代价并且进入下一层，于是我们肯定希望那个不付出代价的是最大的，用一个堆维护即可。

考虑$x=1,y=0$怎么做。此时合并树的每个右儿子都不会付出代价，于是容易想到一个简单策略，每一层让最小的左括号放在最左边，这样合并每个的时候都是最优的，但是问题是这个最小的无法进入下一层了，所以不一定最优。考虑先把全局最大的扔了，然后每层留下最大的，让它付出一次代价，而剩下的让最小的来进行合并。除了最后一层放了全局最大的以外，每个左括号都必须付出一次代价，所以这个策略必然不劣。

考虑$x=1,y=1$怎么做。此时每个点每一层都要付出代价，那么我们还是希望把最大的扔了，所以不扔全局最大，跑一个跟$x=1,y=0$类似的东西就行了。

考虑$x=0,y=0$怎么做。好难啊，不会/ll

为什么我写了一发直接挂了啊?看起来$x=1,y=0$的时候少了一些讨论。注意到我们为了把全局最大留到最后，如果此时只剩了两个数，可能会把一个很小的扔掉，这就很不好。注意到在树的深度内处理每一层时这一层的点数是不降的，于是只需要讨论一下对于一个极长的每层两个点的前缀，我们是保留其中的最大值还是最小值。

题目很有趣，但是不给大样例有点恶趣味了。

C. 最大权独立集问题

出题人来自fjoi吧/xia

考虑直接做看起来没法做，我们进行一个强力转化，注意到这个交换的结果就是每个权值走了一条路出来，于是猜测一个交换方案等价于从每个点出发选一条非空有向路径，使得每条边恰好被来回覆盖各一次。考虑证明，我们需要对这样一些路径找到一个操作方案，考虑只需要找到第一步然后递归下去，问题是证明第一步的存在性，也就是必然有两个点的第一步走到了同一条边，直接注意到有$n$个点$n-1$条边，所以根据鸽子原理确实是这样的。

然后感觉像是网络流，但是并不是，因为这个费用对于不同的起点是不同的。

感觉已经可以大力dp了!但是讨论太多脑子不太够用。

为什么我12分爆力看起来没挂啊?

然后这个转化也是没有必要的。

大概看了看正解，考虑设$dp(u,v,w)$表示$u$子树中，换出去的是$v$，进来的是$w$的答案，转移讨论一下怎么接，然后可以做到$O(n^3)$。为了优化，考虑一个牛逼状态，设$dp(u,v,w)$表示换出去的是$v$，换进来的点进来之后走到$w$，不计换进来的点的贡献的答案。有趣的事情是这个状态数是$O(n^2)$，因为$v,w$不能在同一棵子树，这个是树卷积。然后继续枚举怎么接。

-----

pjudge easy round 1

A. 捉迷藏

考虑从起点出发的最长简单路径，如果A不在这个方向上，那么B直接沿着这个走到头然后等死，显然是最优的。所以以center为根拎起来，A总是在上方，或者可能在center的另一棵子树里。

然后显然的策略是双方一起往上跳，什么时候再跳就要撞上了，就选择最长的子树走进去然后等死。但是如果B先走到了center，那么此时A会守在任何一棵足够长的子树中，所以我们需要ban掉一些点，这个可以预处理出来。

官方题解做法比较牛逼。考虑我们直接往直径端点走，如果接下来要撞上了，那么就选一个必然没有A的子树走(因为如果有A那么一步就撞上了)。对两个直径端点取$\max$即可。

B. 新问题

放卡笛尔树的括号序。

C. 括号序列

请注意这个不是括号序列，应该说是$n$种颜色的球，每种颜色有两个，每个球都可区分。

考虑这个限制相当于，第$i$个位置上放的不能跟$i-m,i-2m,...$相同。

考虑我们在这些$\bmod{m}$上扫描线。我们要计算，有若干个桶，往里放球使得每个桶都是满的，并且每个桶中没有颜色相同的两个球的方案数。设$dp(i,j)$表示放了前$i$个桶，有$j$个颜色被放没了，可以计算的个数的颜色被放了一次，剩下的颜色没有被放的方案数。转移枚举这个桶放了多少个没被放的，多少个放了一次的，然后组合数选一选。状态数是$O(\frac{n^2}{m})$，转移是$O(m)$，于是总复杂度$O(n^2)$。

官方题解是容斥，看起来很有道理。

D. 子序列

有点牛逼了。

等价于删掉尽可能少的数而ban掉所有lis。

考虑爆力怎么做。让人想起某个关于lis的网络流题，考虑我们要删掉一些位置使得没有一个lis被留下来，那么需要先构造一个网络使得$s\rightsquigarrow t$的所有路径是所有lis，然后最小割。考虑如果$i\rightarrow j$的转移存在于一个lis中，那么只要前面选的都是这样的转移，沿着这个转移走最后必然可以走到一个lis，于是连上所有这样的边就好了。然后拆点最小割。

考虑怎么快速算这个最小割。这个不是平面图，所以不能最短路。

另一个方向的对偶是最大流，它的意义是选尽可能多的不交的lis。

这个题是COCI2021-2022 R1 Volontiranje，可以在谷7931看到。

注意到根据我们一开始的建图，按照以每个位置结尾的lis长度，给所有点分成若干层，那么只有相邻两层之间有边。一个lis就是在每层选一个点，然后这些点之间存在一条路径。

先把不在任何lis中的点删掉。这个可以正反跑两遍BiT优化dp的lis算一下，或者看起来有别的方法。

虽然这不是平面图，但是注意到一个看起来可能有点像的性质，我们所选的这些lis必然可以不交。如果两个lis相交了，那么交的那一段长度必然相同，否则短的一边换上长的则得到更长的lis。于是我们交换这两段，它们就变得不交了。

考虑我们每次选择最左边的lis，也就是依次最小化在第一层选的点的编号，在第二层选的点的编号，......这样的。

一个解释是，如果我们在某一层没选最小的，那么后面再选最小的的时候，就会和当前选的lis相交，根据前面的结论一定不优。或者说，我们在前面很小的时候，这一个应该也选小的，因为前面选了一个很大的编号的话，这一层的小的就没法选了。

这样就可以$O(n^2)$了。为了优化，注意到某一层的某个数在某一轮因为太大了不能选，那么在后面的轮就都不能选了。所以就线性了，瓶颈是一开始跑一遍lis的dp。

E. 平均分

想了一年$O(2^n\operatorname{poly}(n))$，然后飞了。

然而是折半。直接分成两半，分别爆搜，然后合并是一个三维偏序，搞一搞可以发现可以省掉一维，然后就$O(3^{\frac{n}{2}}n)$了。

讲道理这个题好像见过，但是已经忘了（

-----

十二省联考

D1

A. 异或粽子

也就是求前$k$大区间xor和。拆成前缀和，开一个trie，然后开一个堆维护包含每个元素的当前答案，每次取出最大的，在trie上找到下一个，复杂度$O((n+k)\log v)$。

B. 字符串问题

题意有点复杂了。可以转化成这么一个过程 : 选一个A串，然后选一个它支配的B串，然后再选一个包含这个B串作为前缀的A串，一直这样选下去，求所选A串的长度和的最大值，或者判定这个过程可能一直进行下去。

考虑我们从每个A串连向它支配的B串，从每个B串连向包含它作为前缀的A串，那么问题变成dag带权最长路。问题是第二种边的数量可能很多。

考虑利用后缀树优化建图。我们建立前缀树，那么一个点子树内的所有子串就是它后面加一些字符能得到的所有子串。在这上面优化建图即可。

但是有一个问题，也就是如果一个A串和一个B串在前缀树上对应的点相同，但是这个B串更长，那么B串会连到A串上，但是它不应该连上；如果B串更短，那么确实应该连上。对每个点开一个前缀和优化建图即可。

C. 骗分过样例

不必多说了（

D2

A. 皮配

看起来是，有ABCD四个集合，然后有若干组(城市)元素(学校)，一个组要么全给AB要么全给CD，有一些元素不能分配进某一个集合。最后对A+B A+C C+D B+D都有限制。

爆力就是设$dp(i,a,b,c,d,0/1)$表示懂的都懂。注意到$a+b+c+d$是固定的，所以省去一维。

注意到即使限制C+D=0，也是需要背包的。所以我们必须背包。

注意到只有对$a+b,a+c$的限制，而没有对$a$的限制，所以我们可以只记录$a+b,a+c$。所以又省去一维。

注意到这个相当于有两个维度，每个元素可以在两维上选择是否贡献。如果$k=0$，两维是独立的，所以我们可以分开dp，所以就$O(nm)$了。

考虑如果$k>0$怎么做。刚才我们的做法基于两维独立，所以方案数是在两维上选择的方案数乘起来。现在考虑把这些元素分成三种 : 

 - 有限制的 : 只能爆力。

 - 没有限制，但是同组有限制的 : 两维是独立的，但是第一维的选择会影响到同组的那个有限制的。

 - 没有限制，同组也没有限制的 : 完全随意。

一个直接的想法是，把第一类和 第二类的第一维 一起做，然后和第二类的第二维以及第三类卷起来。

注意到第一类只有$k$个，并且每个的大小只有$s\leq 10$，所以如果只dp它们的话总和只有$O(ks)$；但是第二类可能有很多。

考虑设$dp(i,j,k,0/1)$表示考虑一二类的前$i$个，第一维的和是$j$，第一类在第二维的和是$k$，当前这一组在第一维选了AB/CD的方案数，这个是$O(nmks)$的，看起来没了。

一个想法是把$i$一维的大小从$n$砍成$k$。注意到这个背包可以一次加入一组，因为没有限制的元素只对第一维的和有影响，而这个影响只和组选AB还是CD有关；有限制的元素可以爆力。于是设$dp(i,j,k)$表示考虑有限制的前$i$组，第一维的和是$j$，第一类元素在第二维的和是$k$的方案数，转移枚举下一组加入AB还是CD，然后对于其中第二类元素只需要知道总和，对于第一类元素进去爆力转移。这样总复杂度是$O(mk^2s)$。

接下来设$f(i,j),g(i,j)$分别表示第三类第一维的方案数和二三类第二维的方案数即可，这两个是$O(nm)$的。然后需要合并，我们枚举$dp$的一个状态查对应的$f,g$的前缀和，复杂度$O(m^2)$。

B. 春节十二响

看起来是，把点划分成若干个集合，每个集合内部没有祖先-后代关系，求所有集合max的和的最小值。

看一眼部分分，考虑链怎么做，发现链必须是每个点在一个集合。

?，这个链不一定以1为根。于是它实际上是两条以1为根的链。考虑这个怎么做，发现我们必然是把两边按最大值排序之后合并对应的。注意到合并之后树也等价于一条链，于是就结束了。每次合并都会少一个点，用堆维护，复杂度$O(n\log n)$。

C. 希望

不必多说了（

-----

pjudge easy round 2

A. 简单数据结构

意思是维护两个向量集合，然后求从两个向量集合各选一个加起来，两维较大值的最小值。

如果一个和在两维上都比另一个大，那么它啥用也没有了。于是答案必然在笛卡尔积的左下凸壳上取得，而这个笛卡尔积的左下凸壳是两个集合左下凸壳的闵和。然后我们求的是 两维较大值的最小值，所以答案就是直线$y=x$上下的凸壳上的第一个点。

时间线段树，然后考虑如果只加入怎么做。用平衡树爆力维护即可，因为每个点凸壳大小之和是$O(n\log n)$。

但是这有点恶心了!考虑一个可能让它变简单的想法，我们对$y=x$上下分开维护。$u_x+v_x>u_y+v_y$，移一下就是$u_x-u_y>v_x-v_y$。然后上个set或者线段树就结束了。

B. 情报传递

问题是，树，以$t$为根，A给每个点分配一个权值，B获取一个点和它的邻接点，以及这些点的权值，回答这个点的父亲，或者判定这个点就是$t$。

让人想起 网络站点。只能标记01看起来有点牛逼了。

要得到0.000084分，我们可以标记深度。要得到44.444444分，我们可以标记深度膜$3$的值。但是我们不能标记深度膜$2$的值，因为那样分不清上下了。

注意到我们可以得到点的编号。

然后就不会了。做法是，我们给每个点的权值是父亲的权值xor上 这个点的编号和父亲的编号的大小关系。

C. 运算符

注意到一次询问的信息量大概是29.9个bit，所以最少问21次就可以问出来。看起来次数很充裕。如果限制值域在600以内，那么每次的信息量只有9.2个bit，理论上不可行。平均每次需要15bit的信息量。

考虑我们直接拿随机数问，问题是怎么还原一个方案。感觉很困难。

考虑我们从后往前每次确定15个。随机问一次有29.9个bit的信息量，于是很大概率可以问出来，然后搜这15个的情况即可，不放心可以加点容错，比如一次问16个。这个是不是很套路啊，但是我不会/ll

D. 仙人掌

看起来很牛逼。

对于一般的dag，这个问题是没法做1e5的。

先缩scc。考虑能做1e5的只有拓扑排序之后直接dp，那么考虑如何处理算重的问题。注意到算重只会发生在一个环由$u\rightsquigarrow v$的两条链组成的时候，此时我们给$dp(u)$减去$dp(v)$即可。

E. 2048

自从汪神教了我 美团杯2021测试赛 中国式家长 之后，我总感觉自己可以会这一类东西，但是完全不会/hanx

注意到只有右边的极长下降后缀有用。但是这个性质啥用没有。

注意到每轮只能是从所有数右边插入了一个数，所以随机位置没有用。

为了方便，把$2^k$记为$k$。

注意到棋盘一开始是空的。考虑我们每次合成一个留到最后局面的数，就计算它的贡献。设$f(i,j)$表示长$i$的空棋盘，得到一个$j$的概率以及期望得分。那么下一个要么比$j$更小，要么比$j$更大。如果比$j$更大，则要求合成过程中不能出现一次合成之后这个$j$后面挨着一个$j$，发现这种情况出现当且仅当我们第一次随出来的$\leq j$。于是改设$f(i,j,k)$表示长$i$的空棋盘，棋盘前面有一个$j$，又搞出了一个$k$的概率以及期望得分。设$dp(i,j)$表示长$i$的空棋盘，棋盘前面有一个$j$的答案。看起来是$O(n^4)$或者胡乱优化到$O(n^3)$。

看起来我们需要把$f$扔掉。枚举第一次随出来的是什么，接下来要么停下，要么再搞出一个这个，要么再搞出更多这个。还是设$f(i,j)$表示长$i$的空棋盘，得到一个$j$的概率以及期望得分。那么如果剩下的长度是$r$，前面已经有一个$j$，后面再得到一个$k$的概率就是

$$
\sum_{t=j+1}^k p_t\sum_{l=t}^{k-1}f(r-(l-t)-1,l)
$$

于是可以拆一拆前缀和做到$O(1)$算这个概率。看起来再胡乱写几个转移好像就对了?复杂度$O(n^2)$。

-----

unr6

D1

A. 面基之路

这个题让人想起joisc18 sparklers。结论是答案是所有人走到一点的最小时间。

先从每个起点出发跑dij。如果答案在点上是简单的，如果在边中间，考虑每个人到边的距离是一个两段的一次函数，求出这个函数就做完了。但是这个比较复杂，可以直接二分答案。

B. 机器人表演

考虑字符串题还是造一个自动机。

考虑我们尽可能匹配原串，如果匹配不上了再尝试加一个括号，然后要求加的必须是合法的，判断是否合法只需要把左/右括号看成$\pm 1$并记录前缀和。有趣的事情是，可能直接加不合法，但是我们可以通过把前面匹配的一些左括号改为加入的，比如原串是(())，我们要check ()(())，那么上来先匹配了(，发现接下来)匹配不了了，我们就把前面的(改为加入的，也就是现在匹配了空，并加入了()。

结论是，这个回退若干步的操作，必然会回退到第一个能够使得这边前缀和$>0$的位置。首先由于是第一个使得前缀和$>0$的位置，去掉匹配括号之后它必然只剩下一个左括号(如果剩下))(((这样的，则只需要取最右边那个左括号)，所以再加入一个右括号必然合法，并且我们这么倒回去可以得到一个方案，所以这个状态必然是可达的。然后画一条折线，发现更长的状态不可能使得前缀和$>0$了，所以就结束了。

C. 稳健型选手

结论是，一个方案是我们选的数的集合，那么它合法当且仅当前$2k$个选了不超过$k$个。证明考虑如果选了超过$k$个显然不行，否则，选择第一个还没选的就可以维持这个性质。

如果$q=1$。我们必然选一半，如果$n$是奇数那么最后一个数必然是我们选走，所以可以把它删掉变成$n$是偶数的情况。倒着考虑，就是后$2k$个选了至少$k$个，并且一共选了$k$个，那么我们从后往前每次加入两个数，然后选择还没选的数中的一个。用堆维护即可。

往后加入也是可以的，反悔贪心即可。使用压位trie维护$\max$，莫队，据说就冲过去了/cf

考虑能不能费用流一下，我们给$[l+2i,r]$建一个点然后就是最大权匹配。分治，合并的时候问题是会加一些左边到整个右边的边，那么左边的最小的若干个匹配就可能被退掉，那么我们二分一个最大的$k$使得左边匹配的第$k$小比右边未匹配的第$k$大要小，上个主席树就好啦。

D2

A. 小火车

注意一下$2^n>p$是啥意思。我们找$p+1$个方案，其中必然有两个效果相同，把这两个方案相减就得到答案，所以只需要(也只能)枚举$0,1$的情况，可以做到$2^n$。

注意到subset sum最快的，OI中practical的算法大概就是$\sqrt{2}^n$了。google可以知道这个问题不保证有解的版本最快的practical算法是$\sqrt{3}^n$，也就是直接折半。

还是考虑折半。我们搜出左半边所有的子集，搜出右半边所有的子集，然后尝试找到什么$a_1+b_1=a_2+b_2$这样的。这玩意是个4-sum，看起来不是很可做。

考虑一个牛逼想法，我们取$k=\frac{p}{2}$，然后$<k$和$\geq k$的$a_1+b_1$，必有一边超过$\frac{p}{2}$个。算出哪一边更多，然后递归下去，直到只剩一个数。这个算个数可以直接排序双指针过去。复杂度$O(\sqrt{2}^nn)$。

B. 神隐

注意到我们至少要问$\lg n=17$次。

本质上来说，我们给每条边分配了一个$20$位的二进制数，表示它在哪些询问被问到了。经典地取所有$\binom{20}{10}$个恰有$10$个$1$的二进制数，那么两个点之间有边当且仅当在恰好$10$次询问中连通，显然连通的次数不可能$>10$，而如果两个点之间距离至少是$2$，这两条边都被问到的次数就$\leq 8$。

现在问题是怎么得到这棵树!

C. Border的第五种求法

考虑sam，发现一个区间的前缀是自动机上的一条链，后缀是parent tree上的一条链，所以问题就是求它们的交。考虑dag剖分，然后据说就结束了，但是我不会。

-----

实验舱 noi2022全国挑战赛 公开部分

contest9

A. hypercube

从随便一个点出发找到所有棱，这个直接找最近的点就彳亍了，然后就可以找到所有点的位置，上个hash table或者hash一下再排序之类的就结束了。

B. number

考虑维护区间结果的左右各$O(\log_k v)$位，以及中间部分的和，发现合并的时候有可能进一位，于是额外维护进了一位的情况，或中间那一段开头的极长连续$k-1$长度即可(也就是要知道$+1$的时候会发生什么)，然后还要处理这一段加过去影响了右边的情况。复杂度$O(n\log n\log_k v)$。

唐队长给出的做法是，直接维护整个序列的结果，然后查询的时候把两边的影响扔掉，右边的影响是简单的，左边的影响是减一个数，可能需要退位，我们找出左端点左右各$\log$位，然后再二分极长全$0$段来退位即可。修改的时候是一样的。需要支持区间$0$变$k-1$或者$k-1$变$0$，单点修改，查询区间是不是全$k-1$/全$0$，查询区间和，求连续$\log$位，线段树即可，复杂度都是一个$\log$。

C. epidemic

考虑只有25条非树边有啥用。唐队长指出，这种题直接考虑删一度点，缩二度点，直到只剩下这些非树边的虚树。

考虑虚树上一条边$u\leftrightsquigarrow v$，它上面有很多缩上去的点，内部是一棵树所以容易计算，而这条边上每个点对外面的贡献，只和它到$u\leftrightsquigarrow v$这条路径上边权的$\min$，以及上到路径上之后那个点到$u,v$路径上边权的$\min$有关。注意到后两个是单调的，所以点的种类总数是$O(v^2)$。

枚举两条边和上面的分别一类点，边之间的部分在缩完了的图上跑dinic，如果你想更快可以最小割树，然后就可以大力统计了。复杂度$O((m-n)^5+(m-n)^2v^4)$。

contest10

据说是dmy题。

A. 极差

这套题没有英文名啊（

考虑一个子序列的贡献系数，也就是包含它的区间个数。

考虑一个最大值的贡献，最小值是对称的。考虑所有比它小的数，这些数可以随便选，然后如果左边选的最左的在$l$，右边在$r$，那么要再乘上$l(n-r+1)$。于是考虑枚举最左和最右，如果在这个范围内左右分别还有$c_l,c_r$个可以选，则贡献系数是$l(n-r+1)2^{c_l}2^{c_r}$。可以注意到$l,r$是独立的，于是我们从小到大扫，对每个位置维护$i2^{c_i}$，其中$c_i$是$i$前面的数个数，问题就是区间乘，区间求和，线段树即可，复杂度$O(n\log n)$。

B. 聚会

为什么是构造题啊。

考虑随机调整。二分图染色分别放奇数和偶数，每轮对奇偶分别shuffle然后开始调整，调调参就过了。原来这就是dmy题。

当你感觉解很多，但是又找不到一个好的性质，那就调整吧。

C. 历史

看起来还是很鬼啊。

考虑如何判定一个顺序是否是合法的。从左往右扫，如果这个主角和上个主角一样，或者他还没出现过，那么啥事没有；否则，如果这个主角出现过，并且他还没有过偏好度，则给他一个最高的偏好度，否则看他的偏好度是不是最高的，如果不是则不合法。转化一下，每个主角出现第一次到最后一次之间，如果还有别的主角，那么这些别的主角必然是第一段出现。

发现对于重排，我们完全没有什么好的扫描线方向，所以只能考虑直接选之类的。注意到出现一段的主角必然不影响合法性，考虑一个爆力想法，钦点所有出现了多段的主角，先把他们排成一排，那么剩下的主角都出现一段，把他们插入到空隙里面就好了，这个方案数是一个上升幂。最后我们需要对于每个$k$，求选一个总大小为$k$的主角集合的排列的方案数，背包即可。复杂度$O(nv^2)$。

注意到可能有的主角被钦点了，但是最后并没有出现多段，所以需要二项式反演一下。

-----

ioi2022

D1

A. 鲶鱼塘

考虑dp，设$dp(i,j)$表示前$i$列，第$i$列选了$j$的答案，发现还需要记$i-1$，于是就死掉了。不过可以发现，$j$上面必然是一条鱼，所以复杂度是$O(n^2)$，结合特殊性质可以直接获得84pts。

考虑一个简单结论，$i-1$有用，当且仅当$i$比$i-1,i+1$都低，那么此时我们肯定会让$i$选$0$，否则我们只需要记$i$，所以状态数就线性了。具体地，设$dp(i)$表示考虑第$i$条鱼和它前面的列，它这一列选到它下面，前一列比这一列低的答案；$g(i)$表示考虑第$i$条鱼，它前面的列和它后面第一列，这一列选到$i$，下一列选到$0$的答案。转移需要用useful algorithm，复杂度$O(n\log n)$。

B. 囚徒挑战

考虑一个30的做法，我们从高到低比每一位，一共有$13$位，再记录一下现在该看A/已经看了的A的值就好了，需要$3\times 13=39$个数。

注意到使用四进制可以做到$35$。好像不是很会了。

考虑能不能把那个$3$扔一扔，这样就能做到$26$了。注意到有$13$个数我们不会用到。但是考虑一下，你发现必然会有不会用到的数，因为必须留至少一个bit存之前的信息。

所以我们知道必然只有$13$左右个人进去了，那么每次就必须比出一位的大小关系。考虑如果上一个人看了A的某一位，我进去看了B的这一位，我就比出了这一位，而下一个人进来之后，此时我给他留下B的下一位，他只要看A的下一位就好了。也就是说，用$0$表示第一个人，然后用$(1,2),(3,4),(5,6),...,(25,26)$表示上一个人是第几个和他看的结果。现在做到了$26=2\lg v$。

考虑优化。发现换成三进制更优，可以做到$24=3\log_3 v$。

观察样例，发现如果问出来的数是最小的或者最大的，那么直接就判断出来了，好像可以做到$22$。

考虑有的时候可能还是二进制更优，所以我们dp一下每一轮什么进制，就过掉了。

C. 无线电信号塔

考虑找到最大值，然后最大值左右两边足够矮的都可以通过最大值通信，不够矮的不可能选，所以就变成找到两边内部$\leq$某个数的数的答案。

容易想到根号分治，但是值域很大。

考虑一个数什么时候可以选。发现如果一个数不是最左的，那么它左边到左边第一个被选的之间，必须有一个$\geq$它$+d$的，右边同理。发现这个也是充要的。

考虑我们给每个数$a_i$找到左右第一个$\geq a_i+d$的数，这两个数形成一个区间，区间里就不能选别的数了，但是区间端点可以选。对于每个$k$，考虑所有数都$\leq k$的极长区间，发现如果从小到大考虑$k$，那么相当于每次删掉$=k$的数，也就是把一些相邻的区间合并了；如果从大到小考虑$k$，则是每次把一些区间分裂开，也就是最值分治，而每个区间对应一棵卡笛尔树的子树，所以区间一共有$n$个。以下提到 区间 很可能指的是这$n$个区间。

考虑原问题相当于选一些区间使它们不交，不过区间查询的时候两边需要特殊处理，不过我们先不考虑这个。发现由于两个区间要么不交要么包含，我们可以直接找到所有不包含任何区间的区间。考虑如果可以离线，我们就从小到大扫$d$，可以发现一个区间在$d$的一个前缀是可以选的，并且如果一个区间可以选，则包含它的区间都可以选，那么每次就是ban掉一个点并检查它的父亲，以及查询包含在查询区间的区间中，有多少是有贡献的，维护每个区间的左右端点，然后二分包含在查询区间中的最左的左端点和最右的右端点即可。要强制在线，换成主席树即可。

现在考虑边上的部分，我们可能在两边各多选最多一个区间，考虑左边，找到左边还没选的部分(包括左边选的第一个区间的左端点)的$\max$，设为$p$，那么考虑多选的那个数在$p$左边还是右边，如果在左边那就直接求个$\min$，如果在右边，那么好像不是很会了。考虑如果它在右边的话，它向右的中转点，设为$t$，是比$p$要小的，而它又必须能通过$t$中转，说明它所在的区间要么是$[p,t]$，要么被它包含，所以它所在的区间完全包含在查询区间中，上一步应该统计到了，所以我们知道只有$p$左边可能选。于是上个st表就结束了，复杂度$O((n+q)\log n)$。

D2

A. 数字电路

题意很恐怖，大概是有一棵树，点权01，叶子的点权是给你的，然后每个内部结点有一个参数$c$，这个参数在$1$到儿子个数之间，如果它的儿子中有至少$c$个$1$则它是$1$，每次翻转一个叶子区间，求对于所有可能的参数，有多少种方案使得根为$1$。

考虑dp，发现转移就是把儿子们卷起来，然后$c$次项乘一个$c$拍起来。发现这个乘一个$c$拍起来就是求导之后代入$1$求值，也就是说什么$\displaystyle dp(u)=\left(\prod_v(s(v)+dp(v)z)\right)^\prime(1)$，其中$s$是总方案数。考虑积的求导法则，我们知道积的导数等于其中每一项的导数乘上剩下的，再加起来。于是有$\displaystyle dp(u)=\left(\sum_v dp(v)\prod_w (s(w)-dp(w)+dp(w)z)\right)(1)$。注意到和的点值等于点值的和，代进去$1$发现$dp(w)$消了，所以我们知道各儿子是独立的，并且一个点对答案的贡献就是到根路径上各兄弟$s$的乘积。线段树维护即可。

一个牛逼转化是，改成选择一个儿子传上去，那么显然答案是不变的。可能这个是上面的式子的组合意义。

B. 最罕见的昆虫

也就是每种操作$3n$次。

考虑一个$n^2$。我们尝试找到每一种昆虫，发现如果一种昆虫作为众数，那么加入同种昆虫必然导致众数出现次数$+1$，而如果没有别的昆虫，加入别的昆虫必然没有影响，所以我们就会$n^2$了。

考虑一个$n\log n$。使用useful algorithm，二分答案$d$，然后从左往右扫，尝试加入每个数，如果加入之后众数出现次数超过了$d$，说明这个数所在的种类大小超过$d$，我们就把这个数标记一下。一开始令$d=1$跑一遍，就可以得到一共有多少种数，假设一共有$m$种，并且刚才我们没标记的数有$k$个，那么存在一个数出现次数$<d$当且仅当$k<dm$。

然后发现这个东西可以改成线性的。如果往左递归，那么所有不在机器里的数都可以扔掉了；如果往右递归，那么递归下去之后这些数还总是会在机器里，也相当于把它们扔掉了。那么也就是说如果我们取了一个$d$，则扔掉$\min(dm,n-dm+1)$个数。这个东西看起来很线性，如果我们每次都砍在正中间它就是$2n$，但是很遗憾我们不能总是砍在正中间。

柯洁说的好，如果不知道干什么你就shuffle一下。然后考虑一些剪枝，我们可以随机选择中点左边还是右边，然后如果我们已经选到了$dm$个数则直接判定往右递归，看起来就过了。

C. 千岛

兆岛。

注意到环走一圈还是环。考虑如果我们能有两条路径走到环，那么我们先走到两条路径的lcp那里，然后走到第一个环，然后走到第二个，然后走到第一个，然后走到第二个，然后回去，就赢麻了。

考虑如果一个点没有出边，那么它啥用没有。不停删掉所有这样的点之后，每个点都还有一条出边，于是不停地走下去必然可以走到一个环。从起点出发一直走直到找到一个度数$\geq 2$的点，然后从它出发按刚才的做法走就行了，如果不存在这样的点则无解。

一个小问题是这两个环可能有交但不相同，画一画可以发现此时我们直接把其中一个换成另一个即可。

-----

csp2022

A. 假期计划

考虑用编号来限制不同。注意到如果编号的顺序是$a<b<c<d$，那么$a,b$在一边，$c,d$在另一边的情况我们都会处理。考虑不停对编号进行shuffle，那么最优解有$\frac{8}{4!}=\frac{1}{3}$的概率被shuffle成我们会处理的，shuffle $30$次基本可以找到一个解。但是我们每次直接做是$n^2$的，考虑这个就是对若干个位置取$\max$，那么我们每$10$个分一块，预处理块内所有情况，就得到$\frac{1}{10}$的常数。

B. 策略游戏

如果A选了正数，B选择最大的负数，反过来也是一样的。只有绝对值最大和最小的非正数和非负数有用，讨论即可。

C. 星战

注意到可行当且仅当每个点出度都是$1$，也就是是一个内向基环树森林。2操作会让连到它的点出度$-1$，4操作会让连到它的点出度$+1$，如果之前进行过1或3操作，可以先把它们撤销掉，这样总操作数还是线性。

注意到我们只需要判断出度是不是全$1$，考虑hash，结束了。

D. 数据传输

注意到我们大概还是沿着链走的，但是可能会跳过一个点之类的，发现到$u$以下的有效状态只有，在$u$，$u$儿子中最小的点，$u$下面的点，$u$下面的点的儿子中最小的点，$u$再下面的点，那么可以算完贡献之后只记一个深度。转移只跟$u$有关，跟下面怎么上来的无关，所以直接倍增即可。

-----

春季赛2023

A. 模拟

B. 容斥系数是$\mu$

C. 圣诞树

首先注意到交叉必然不优，因此看了半天没看懂为啥不是全加起来。

注意到你可以在任何一个点停下。所以路径看起来像是，从起点到终点的线段把它分成两部分，然后两部分内部都必然是顺着走，设$dp(i,j,0/1)$表示左边到$i$右边到$j$，当前在哪一边的答案，转移枚举下一步即可。

D. 密码锁

先考虑$k=3$。考虑如果最小值和最大值在一维，那就不用玩了。如果不在同一维，交换两维是不影响答案的，那么先分别换到第一维和第二维，此时我们就知道每个数是否可以在第一维，是否可以在第二维，然后二分答案，枚举第三维的一个区间，这就赢了。具体一点，每个位置有三种可能，都没有被ban就是可以，然后枚举第三维的区间的时候会有$O(n)$次可能的ban和unban。复杂度$O(n\log n)$，认为$k$是常数。

考虑$k=4$。还是让最小值在第一维最大值在第二维。继续二分答案$d$，考虑把后两维画到平面上，那么如果一个位置满足前两维限制的情况下后两维可以是各$(i,j)$，我们就给两维左端点在各$[i-d,i]\times [j-d,j]$的并中的区间加上$1$，最后求有没有一个位置是$n$，这里最多有四个矩形所以拿交容斥即可。复杂度$O(n\log^2 n)$。也可以大力写并，常数会小一点，但不多。

