---
layout: post
title: 连通性相关问题
subtitle: 玄学
tags: 图论
---

还在施工。

整合了Tarjan的SCC，割点割边，DCC；以及支配和支配树；它们的例题。

其中DCC正在施工，支配树还没学/kk

## 连通

几乎是废话。

## 强连通

有向图中，两个点强连通，当且仅当它们可以互相到达。换句话说$$u,v$$强连通当且仅当存在$$u\rightsquigarrow v$$和$$v\rightsquigarrow u$$。

强连通分量的定义是强连通的极大子图，缩写是SCC(Strong Connected Component)。

### 性质

自反性、对称性 : 废话。

传递性 : $$u,v$$强连通，$$v,w$$强连通，$$u,w$$也强连通。废话。

这三个性质确定了一个等价关系，一张图上所有的点可以被划分为若干等价类——强连通分量，每个点恰好属于一个强连通分量。

缩强连通分量之后，图变成了一个DAG。为什么?如果不是DAG，说明有环，而环是一个强连通分量，而我们已经缩完了强连通分量，所以不可能不是DAG。

### 算法

Tarjan和Kosaraju，其中Kosaraju较为简单，Tarjan扩展性更强。

~~Kou Sa Rua Ju!~~

-----

#### Kosaraju

Kosaraju这一段请从头到尾读两遍，你会发现两次遍历就很好理解了（双关

Kosaraju说的是，考虑缩强连通分量之后那个DAG的形态，如果我们要找强连通分量，显然的办法是找一个**出度**为$$0$$的强连通分量，然后随便在强连通分量中随便找一个点开始dfs，能走到的所有点就是这个强连通分量，因为出度为$$0$$不可能走到其它强连通分量。

然后我们需要删掉这个强连通分量，或者说标记它不可达。你发现这就是一个反图上拓扑排序的过程(正图出度为$$0$$，等价于反图入度为$$0$$)，换句话说我们要求一个反图的拓扑序。注意正反图的强连通分量相同。

所以问题就是怎么在得到强连通分量之前，先得到这个拓扑序。换句话说我们不知道强连通分量，但是要蒙出来这个拓扑序。

进行dfs，记录每个点的离开时间，然后给每个强连通分量按照分量最大离开时间排序，就得到了反图拓扑序。

**定理** 这个东西得到的拓扑序是对的。

**证明** 考虑如果它不对，必有两个强连通分量$$A,B$$，其中最大的离开时间分别属于结点$$a,b$$，满足$$a$$的离开时间早于$$b$$($$A$$排在$$B$$前面)，且反图中$$B\rightarrow A$$，或者说正图中$$A\rightarrow B$$。当然这里强连通分量之间的边$$A\rightarrow B$$的意义是存在$$x\in A,y\in B,x\rightarrow y$$。

首先如果一个强连通分量中一个点被遍历了，那么整个强连通分量一定被遍历完。

如果存在$$A\rightarrow B$$，那么当遍历到$$a$$的时候，由于$$b$$离开时间晚于$$a$$，要么$$b$$此时正在遍历，要么$$b$$此时还没被遍历。

如果$$b$$正在遍历，说明存在$$B\rightarrow A$$，说明$$A,B$$应该是同一个强连通分量。

如果$$b$$还没遍历，那么接下来一定会遍历到$$A\rightarrow B$$中的一条边，从而遍历到$$b$$，所以$$a$$的离开时间不可能早于$$b$$。

两种情况都导出矛盾，所以这个拓扑序是对的。

接下来，按照这个顺序依次遍历强连通分量即可，也就是每次找到离开时间最大的还没遍历的点，它所在的强连通分量出度一定为$$0$$，所以我们可以从它出发开始遍历。

注意Kosaraju遍历强连通分量的顺序就是倒着的反图拓扑序，也就是正图拓扑序，这可以简化一些需要对剩下的DAG拓扑排序问题的实现。

怎么证明正图拓扑序倒过来就是反图拓扑序?随便想一想你就发现是废话。

-----

#### Tarjan

Tarjan是在dfs树上乱搞。

**定理** 每个强连通分量中第一个被遍历的点称为这个强连通分量的根，这个强连通分量中所有点在dfs树上都在它的子树中，并且是连通的。

**证明** 如果强连通分量中有个点$$v$$不在根$$u$$的子树中，说明$$u\rightsquigarrow v$$必然经过返祖边或者横向边，而这些边都是指向已经遍历的点，所以$$u$$就不是第一个被遍历的点了。至于连通性，如果不连通就见鬼了。

根据这个定理，如果我们找到了所有强连通分量的根，那么就可以很容易地找出所有强连通分量。可以维护一个栈，每次走到一个点就把它压栈，遇到根就把子树里还没弹的弹光。

如何判断一个点是不是根?

如果一个点可以向前达到一个可以到达它并且已经遍历的点，那么它不是根，否则它是根。

那么要判断上面那个东西，容易想到求和一个点强连通的点中dfn最小的。

我们设$$\mathrm{dfn}(u)$$表示$$u$$是第几个发现的，$$\mathrm{low}(u)$$表示和$$u$$强连通的点中dfn最小的，那么如果有$$\mathrm{dfn}(u)=\mathrm{low}(u)$$，说明$$u$$是一个根。

所以问题变成怎么求$$\mathrm{low}(u)$$。

考虑一个记搜，如果$$u$$连向的点$$v$$已经遍历完了并且求出了$$\mathrm{low}(v)$$，那么

 - 如果$$u,v$$强连通，$$\mathrm{low}(u):=\min(\mathrm{low}(u),\mathrm{low}(v))$$

 - 如果$$u,v$$不强连通，什么都不做

。那么怎么判断$$u,v$$是否强连通?

如果$$u,v$$不强连通，因为每个强连通分量在dfs树上都是连通的，只有可能$$v$$是一个根，那么遍历完$$v$$之后它的强连通分量应该弹没了，所以我们可以通过记录一个数组`in_stack`表示一个点是不是在栈里来处理这种情况。

### 经典结论

#### 竞赛图

**结论** 竞赛图缩SCC之后，得到一条链，其中每个SCC向拓扑序中后面所有SCC连边。

**证明** 对点数归纳。考虑删去随便一个SCC，那么剩下的根据归纳假设是一条链，然后这个SCC必须跟这条链上每个点连边。

我们不妨把链从左往右画，每个点往它右边所有点连边。

因为是竞赛图，每两个SCC之间都有边。首先两个SCC之间的边一定是同向的，不然它们应该属于一个SCC。

然后考虑如果这个新的SCC向链上左边的一个SCC连边，而链上右边的一个SCC向这个新的SCC连边，那么就形成了一个环，环上所有SCC都应该缩起来。

所以一定是链的左半边向这个新的SCC连边，这个SCC向链的右半边连边。于是我们找到"左半边"和"右半边"的分界处，把新的SCC放进去，还是得到一条链。

-----

**结论** 竞赛图强连通当且仅当有哈密顿回路。

**证明** 充分性显然。

必要性对点数归纳，考虑删去随便一个点$$u$$之后，图变成了一串SCC，每个SCC根据归纳假设都有哈密顿回路。

由于这个图强连通(我们在证必要性哦)，$$u$$到第一个SCC一定有边，最后一个SCC到$$u$$一定有边，于是我们可以容易地串出一条哈密顿回路。

关于这个结论，还有另一个结论 : 竞赛图一定有哈密顿链。更多内容可以看CF1514E题解。（还没发

### 2-SAT

说的是有一堆$$01$$变量，还有一堆约束需要满足，每一个约束是关于某两个变量的，形式是$$x\ \mathrm{or}\ y$$，$$\mathrm{not}\ x\ \mathrm{or}\ y$$，$$x\ \mathrm{or}\ \mathrm{not}\ y$$或者$$\mathrm{not}\ x\ \mathrm{or}\ \mathrm{not}\ y$$。当然这里认为$$\mathrm{not}$$优先级高于$$\mathrm{or}$$。问题是，有没有一组解满足所有约束，如果有需要构造一组。

做法是建一张图，每个变量$$x$$拆成两个点表示取$$0$$和取$$1$$，记为$$x_0,x_1$$；然后用边$$u\rightarrow v$$表示$$u$$可以推出$$v$$，比如$$x_0\rightarrow y_1$$表示$$x$$取$$0$$可以推出$$y$$取$$1$$。

对于四种约束，可以分别连出这样的边 : 

$$
\begin{aligned}
&x\ \mathrm{or}&y&:x_0\rightarrow y_1,y_0\rightarrow x_1\\
\mathrm{not}\ &x\ \mathrm{or}&y&:x_1\rightarrow y_1,y_0\rightarrow x_0\\
&x\ \mathrm{or}\ &\mathrm{not}\ y&:x_0\rightarrow y_0,y_1\rightarrow x_1\\
\mathrm{not}\ &x\ \mathrm{or}\ &\mathrm{not}\ y&:x_1\rightarrow y_0,y_1\rightarrow x_0
\end{aligned}
$$

。显然如果矛盾，也就是$$x_0$$和$$x_1$$可以相互推出(在同一个强连通分量)，那么无解。

否则如何构造解?考虑我们按照缩强连通分量后DAG上的拓扑序倒序来处理，因为比如如果$$x_0\rightsquigarrow x_1$$，我们先入为主令$$x=0$$，那么就出现了矛盾。所以我们必须先处理没有出度的强连通分量，这样一定不会影响到后面的变量。然后你发现其实可以直接 每个变量取拓扑序更大的值。

使用Kosaraju的话，写起来会更容易哦。

对于一些类似于2-SAT、但是约束条件并不相同的问题，可以考虑用类似2-SAT的方法建图并使用SCC求解。具体见下面的 [HNOI2010] 平面图判定。

### 例题

洛谷P3387 【模板】 缩点

模板题。

这题用Kosaraju实现比较舒服，新图都不用建。

注意进行若干join之后若干find的并查集复杂度是线性的。

-----

[USACO06Jan Silver] The Cow Prom

模板题。

-----

[USACO03Fall Gold] 受欢迎的牛

使用Tarjan或者Kosaraju算法缩强连通分量，这样每一个强连通分量内部都互相可达，所以只要看剩下的DAG上哪个强连通分量能被其它所有强连通分量走到。

容易发现这样的强连通分量不超过一个，因为如果两个强连通分量都能被对方走到，说明它们应该是同一个强连通分量。

看到DAG想到拓扑排序，只有最后剩下的那个强连通分量可能是答案，因为其它强连通分量都不能被它走到，否则不满足拓扑排序的要求。

如何判断它是不是答案?从它开始在反图上dfs，如果可以到达每个点，那么它就是答案。

事实上有更简单的方法，只有出度为0的强连通分量可能是答案。

-----

洛谷P4782 【模板】 2-SAT 问题

模板题。

-----

[JSOI2010] 满汉全席

模板题。

-----

[HNOI2010] 平面图判定

需要一点想象力。

首先$$m>3n-6$$直接NO。

然后因为有哈密顿回路，我们可以考虑把这条哈密顿回路先摆在平面上，然后平面就分成了两部分 : 环内和环外。

然后有一些限制，比如如果$$i<j<k<l$$之间连了$$i\leftrightarrow k,j\leftrightarrow l$$，那么这两条边在同一侧就一定会相交，不满足要求。

然后你看到了一个2-SAT，对于一些可能相交的边，它们在环内外的情况不能相同。我们按照2-SAT的做法建图，这样如果边$$x,y$$可能相交，我们在图上连$$x_0\rightarrow y_1,x_1\rightarrow y_0,y_1\rightarrow x_0,y_0\rightarrow x_1$$。跑SCC即可。

-----

CF1498E Two Houses

不用询问的做法实在是有点厉害。

考虑上面说的结论，我们知道按拓扑序从左往右排，那么在右边SCC $$A$$中的点$$u$$入度肯定大于在左边SCC $$B$$中的点$$v$$，因为$$B$$中所有点都得向$$u$$连边，它们却不一定向$$v$$连边，同时$$v$$也得向$$u$$连边。

所以按照入度从小到大排序，我们就知道每个SCC在这里都是一个区间。

考虑一个点什么时候会成为SCC中最后一个点。

有这样的结论，第$$i$$个点是SCC中最后一个点，当且仅当它和它前面所有点入度和恰好是$$\frac{i(i-1)}{2}$$。

我们考虑左边若干个SCC组成的点集$$S$$，假设最后一个位置是$$i$$，那么因为$$S$$和外面连的所有边都是朝着外面的，$$S$$里面的入度和应该是它内部的边数$$\frac{i(i-1)}{2}$$。这是必要性。

充分性，考虑如果不是SCC，那么因为强连通一定有朝里的边，所以必要性中的推导就不成立了，边数就不是$$\frac{i(i-1)}{2}$$。证完了。

所以我们可以得到每个SCC中的最后一个点，这样可以直接划分出所有的SCC。做完了。

-----

洛谷P4233 射命丸文的笔记

实际上这是带项式题，但是一个结论是竞赛图有哈密顿回路等价于强连通。

同样用到上面的结论把图缩成链，然后用序列的方式解决问题。

## 边双连通

无向图边双连通的定义是没有割边，等价于每对点都有至少两条边不相交的路径。

边双连通分量定义是边双连通的极大子图，一般简称为边双，缩写是e-DCC(edge-Double Connected Component)或者e-BCC(edge-BiConnected Component)。

### 性质

自反性、对称性 : 废话。

传递性 : 如果$$u,v$$边双连通，$$v,w$$边双连通，那么$$u,w$$边双连通。证明很简单，只需要把路径中重叠的部分砍去，然后拼成两条路径，它们一定边不相交。

这样看来同样有每个点恰好在一个边双连通分量中。

把边双缩点之后，我们得到一棵树，因为环是边双。当然对于不连通图得到森林。这棵树在CF上有人称为Bridge Tree，直译大概是割边树/桥树?

### 算法

#### 割边

返祖边显然不可能是割边。

显然有，如果一条边深的端点不能不经这条边走到它浅的端点，等价于它是割边。

所以我们对每个点求出它不走父边能到达的最小dfn，记为$$\mathrm{low}(u)$$。

初始化$$\mathrm{low}(u):=\mathrm{dfn}(u)$$，然后枚举邻接点$$v$$，有转移

 - 如果$$(u,v)$$是父边，什么都不做

 - 如果$$v$$是儿子，递归，$$\mathrm{low}(u):=\min(\mathrm{low}(u),\mathrm{low}(v))$$

 - 如果$$v$$是祖先并且$$(u,v)$$不是父边，$$\mathrm{low}(u):=1$$

 。就做完了。

#### e-DCC

魔改Tarjan割边，遇到割边弹空$$v$$的子树中没有边双的点作为新的边双。

### 经典结论

#### 和SCC

**结论** 给无向图定向的话，每个边双可以按照dfs时的方向定成一个SCC。

**证明** 反证法。如果不是一个SCC，那么一定可以把这个边双分成两部分$$A,B$$，使得只存在$$A\rightarrow B$$而不存在$$B\rightarrow A$$。但是由于我们从$$A$$走入$$B$$之后，根据dfs的性质，一定会走$$B\rightarrow A$$，所以矛盾。

#### 边双树

**结论** 缩边双之后我们得到一棵树，那么可以用$$\lceil\frac{\text{叶子个数}}{2}\rceil$$条边把原图变成边双连通的。特例是当只有一个边双的时候不需要加边。

**证明** 实际上这是一个算法?

考虑在两个叶子之间加边，就是把它们之间的路径缩成一个点。

注意到如果这条路径上只有一个分叉的点，那么我们加边之后会生成一个新叶子，否则不会。我们希望这种情况不会发生。

考虑任意四个叶子$$a,b,c,d$$，我们选取随便两个$$a,b$$，如果另两个$$c,d$$在路径$$a,b$$的同一分叉上，我们选取$$a,c$$或者$$b,d$$都可以；否则直接就可以了。

这样只需考虑叶子不到四个的情况，容易发现有一个的时候需要$$0$$条边，有两个的时候需要$$1$$条边，有三个的时候需要$$2$$条边，然后你发现这个东西的解是$$f(1)=0,f(n)=\lceil\frac{n}{2}\rceil$$。

### 例题

CF555E Case of Computer Network

首先发现一个边双内部可以不考虑，所以我们只需要缩边双变成一棵树。

在这棵树上每一对询问就是限制了一条路径的方向，我们可以用树上差分简单地解决。

## 点双连通

无向图点双连通的定义是没有割点。

另一个定义是每对点都有至少两条点不相交的路径(当然端点除外)。

这两种的区别在于，第一种认为 一个单点 和 两个点之间连一条边 两种情况都是点双，而第二种不这么认为。虽然看起来点双应该采用第二种定义，但是在实践中大家都发现第一种更加实用，所以定义就变成第一种了。

点双连通分量定义是点双连通的极大子图，一般简称为点双，缩写是v-DCC(vertex-Double Connected Component)或者v-BCC(vertex-BiConnected Component)。

### 性质

点双连通的性质没有那么好，不过对于一些问题有奇效。

自反性、对称性 : 废话。

没有传递性，比如$$u\leftrightarrow v\leftrightarrow w$$这张图中，$$u,v$$点双连通，$$v,w$$点双连通，但是$$u,w$$并不点双连通。

不过有一个性质是每条边在恰好一个点双连通分量中，证明是说首先它的端点点双连通，所以它至少在一个点双中。如果两个点双同时包含一条边，那么这两个点双之间就可以通过两条 分别经过这条边两端点 的路径相连，所以它们是同一个点双，所以一条边不可能在超过一个点双里。

如果一个点在多个点双里，它一定是割点，反过来也成立。如果一个点在一个点双里，它一定不是割点，反过来也成立。

### 算法

#### 割点

**定理** 如果dfs树上，一个点的儿子们都不能走到它祖先，那么它是割点。当然这里不能回到祖先是不许走到父亲的边的。

**证明** 必要性，因为割掉$$u$$之后图分成若干连通块，那么祖先们所在的连通块一定和某一个儿子分离开来。

充分性显然。

所以我们记录一个$$\mathrm{low}(u)$$表示$$u$$不走父亲所能到达的dfn最小的点。

转移是说，初始化$$\mathrm{low}(u):=\mathrm{dfn}(u)$$，然后枚举$$u$$的邻接点$$v$$

 - 如果$$v$$是父亲，什么都不做

 - 如果$$v$$是儿子(没有访问)，递归，$$\mathrm{low}(u):=\min(\mathrm{low}(u),\mathrm{low}(v))$$

 - 如果$$v$$是父亲之外的祖先，$$\mathrm{low}(u):=1$$

注意根不能这么判，因为根没有祖先。根是割点当且仅当根有两棵或者更多子树。

你发现这跟割边没啥区别。

#### v-DCC

魔改Tarjan割点，每次遇到一个割点把子树依次弹空，并在每个子树的最后加上这个割点。

### 圆方树

也有人管一般图上的圆方树叫广义圆方树，仙人掌上的圆方树才叫圆方树?

圆方树是一棵重构树，保留原图中的每个点作为圆方树上的圆点，并给每个点双建一个点作为圆方树上的方点。每个方点向它的点双中所有点连边。

由于点双的个数不可能超过边的个数，圆方树点数不超过$$n+m$$。

由于环是点双，所以圆方树是树。

由于每个点都在点双里，所以原图的连通性和圆方树的连通性相同，并且圆方树的边一定连接一个圆点一个方点。

建树非常简单，直接按照Tarjan v-DCC建即可。

### 例题

洛谷模板出题人真他娘的找抽。不建议大家做着玩。



## 支配

咕咕咕。