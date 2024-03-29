---
layout: post
title: CF思维题选㗅
subtitle: 不想上GM的Newbie不是好Newbie
tags: 问题集
---

再开一个坑，整合各种各样的思维题。

CF脑力题选做!(你可以看到URL里面是cf-brain-power-problems)

-----

先是一点理论，大概是jly集训队论文的东西。

解决构造题的利器 : 

抽屉原理，平均值定理，这两个可以用来满足各种"至少/至多"限制。

归纳法和递归，用归纳法证明方案存在性的时候常常可以得到递归构造的算法。

dfs树(图论问题)。

-----

1495F : 好奇妙!我以为我开了一道2600，其实是一道3300/kk

出题人思维能力好强啊，我要膜拜出题人，不过官方题解写的好简单/kk

官方题解要是硬翻译成人话的话，大概是下面这样。

我们将第一种走法称为 一小步 ，第二种是 一大步 。

考虑这个$$p$$相当于一个高度，走一大步就是往右上方第一个点走。

我们发现，"一大步能走到"具有传递性，"一大步走不到"也具有传递性。也就是说如果$$i<j<k$$满足$$i$$走不到$$j$$，$$j$$走不到$$k$$，那么就有$$p_i>p_j>p_k$$，所以$$i$$也走不到$$k$$。

考虑一棵树，每个点$$i$$连向它左边第一个一大步走不到它的结点$$j$$，如果没有这样的$$j$$则连向$$0$$。由于"一大步走不到"的传递性，我们站在点$$i$$走一大步，将会跨过子树里的所有点。

接下来是四个人类可读的定理，稍微有点绕，请耐心读完。

-----

**定理1** 每个点$$i$$的子树里面编号一定是一个从$$i+1$$开始的区间。

**证明** 考虑每个点$$i$$子树里面的点都是它右下方的点，那么按编号走，走到的第一个子树外的点一定在这个点右上方，不然它应该还在$$i$$这个点子树里面。

考虑如果不是一个区间，那么一定存在一个位置$$j$$使得它前面一直到$$i$$全是子树内的点，后面还有子树内的点，而它自己是子树外的点。

那么我们知道一定有$$p_i<p_j$$，那么假设后面有个点$$k$$在$$i$$的子树里，我们知道$$p_i>p_k$$，所以$$p_j>p_k$$，所以$$k$$应该先连向$$j$$，至少它不可能连向$$i$$。

-----

**定理2** 如果一个点$$i$$有儿子，那么一定有$$i+1$$这个儿子。

**证明** 如果没有$$i+1$$这个儿子，父亲的编号还要比儿子大，那么$$i+1$$就不可能在子树中，而子树还要是$$i+1$$开始的区间，那么就没有子树，也就没有儿子了。

-----

**定理3** 走一小步是dfs树的过程，或者说按编号从小到大dfs树会得到$$0,...,n$$。

**证明** 归纳法。考虑点$$0$$，我们假设它有$$k$$个儿子，每个的子树分别是$$[1,t_1],[t_1+1,t_2],...,[t_{k-1}+1,n]$$，那么我们知道一棵子树的最后一个点$$t_i$$走一小步之后一定会进入下一棵子树，所以从$$0$$的视角看是进行了dfs，那么根据dfs的递归性质可以知道每个点看来都在dfs。

-----

**定理4** 在点$$i$$走一大步，相当于在dfs树的过程中跳过了$$i$$的子树。

**证明** 假设$$i$$的子树是$$[i+1,j]$$，那么我们就是想要证明$$i$$走一大步会走到$$j+1$$。

如果$$i$$不能通过若干一大步走到$$j+1$$，那么$$p_i>p_{j+1}$$，那么$$j+1$$的父亲要么是$$i$$，要么在$$[i+1,j]$$里面，那么$$j+1$$一定在$$i$$的子树里。这是矛盾的，因为跳过子树之后要么走到兄弟要么回溯祖先并走到祖先的兄弟，不可能进入子树。所以$$i$$一定可以通过若干一大步走到$$j+1$$。

而$$i$$又不能一大步走到$$[i+1,j]$$，所以要想通过超过一个大步走到$$j+1$$中间也没有点可以中转，所以$$i$$走一大步一定会走到$$j+1$$。

-----

我们似乎已经对这棵树的结构有了一定了解。

以下开始全是口胡而不是翻译，我没有实现过，不知道正确性。

现在问题已经变成了，有一棵树，现在你要遍历这棵树，走一小步可以按照dfs序走到下一个结点，走一大步可以直接跳过整棵子树，有一些点必须走到，求走完的最小代价。当然树的根是$$0$$，并且$$0$$走一大步的代价是$$+\infty$$。

我们考虑如果一个点需要被走到，它所有祖先都不能选择跳过子树。每个点只可能走一小步，一大步或者不被经过，所以每次加入一个点，相当于强制要求父亲走一小步；删除就是取消这个要求。

我们设一个dp。令$$f(u)$$表示从$$u$$点出发走一小步，走完子树的最小代价；$$dp(u)$$则允许第一步随便走。那么我们有

$$
\begin{aligned}
f(u)&=\sum_{v\in\mathrm{son}(u)}dp(v)\\
dp(u)&=\min(f_u,b_u)
\end{aligned}
$$

那么你发现，如果强制要求$$u$$走一小步，那么$$\mathrm{fa}(u)$$开始走完子树的代价应该是$$f(\mathrm{fa}(u))+f(u)-dp(u)$$。

如果强制要求$$u$$的一堆儿子$$v_1,...,v_m$$走一小步，那么$$u$$开始走完子树的代价应该是$$f(u)+\sum_{i=1}^m(f(v_i)-dp(v_i))$$。

所以当某个结点是否需要走一小步的要求变化了的时候，我们可以按照上面的式子更新所有祖先的代价。你发现这个转移是ddp的形式，所以我们可以拍个板子搞定它。复杂度$$O(n\log n)$$。

-----

不过官方题解还有更简单的做法，我们继续考虑上面的性质。

先不管哪些点一定要走一小步，如果我现在选出了一个走一小步的点的集合$$H$$，剩下的点都不走或者走一大步，那么首先这个$$H$$必然是包含$$0$$的一个连通块，同时如果它是一个这样的连通块，它一定唯一对应一种走法。

考虑一个方案的代价是 : 

$$
\sum_{u\in H}a_u+\sum_{\mathrm{fa}(u)\in H,u\notin H}b_u
$$

这个$$u\notin H$$看起来比较难处理，我们容斥一下 : 

$$
=\sum_{u\in H}a_u+\sum_{\mathrm{fa}(u)\in H}b_u-\sum_{\mathrm{fa}(u)\in H,u\in H}b_u+\sum_{\mathrm{fa}(u)\notin H,u\in H}b_u
$$

发现一个事情，如果一个点的父亲不在$$H$$里面，这个点一定不在$$H$$里面；如果一个点在$$H$$里面，父亲一定在$$H$$里面，所以可以化简上式 : 

$$
\begin{aligned}
=&\sum_{u\in H}a_u+\sum_{\mathrm{fa}(u)\in H}b_u-\sum_{u\in H}b_u\\
=&\sum_{u\in H}(a_u-b_u)+\sum_{\mathrm{fa}(u)\in H}b_u\\
=&\sum_{u\in H}(a_u-b_u+\sum_{v\in\mathrm{son}(u)}b_v)
\end{aligned}
$$

设$$c_u=a_u-b_u+\sum_{v\in\mathrm{son}(u)}b_v$$，我们就相当于对$$H$$里面所有点的$$c$$求和。

问题变成，给一棵树，求一个连通点集$$H$$，有一些点(一定有根)必须在点集中，使得$$c$$的和最小。

$$c$$不一定是正的，所以我们不能直接贪心，可以考虑dp一下。

我们设$$f(u)$$表示$$u$$子树中强制包含$$u$$的最小连通块大小，有

$$
f(u)=c_u+\sum_{v\in\mathrm{son}(u)}\max(f(v),0)
$$

那么答案就是$$f(0)$$。接下来如果一个点必须选，它的权值就要改成$$-\infty$$，最后我们再把原来的权值搞回来，这个可以ddp维护，或者有人说也可以直接用BiT之类的，我不是很懂。复杂度还是$$O(n\log n)$$。

-----

好了我们翻译完了。你可能要问，是怎么想到建一棵这么奇怪的树的?

实际上"一大步走不到"和"一大步可以走到"是完全对称的，如果你把序列翻转过来，题解的这棵树就变成了走一大步走到的结点串成的树。

然后两个性质也要反过来，于是就变成了，倒着走一小步是dfs树，倒着走到 左边第一个不能走到这个点的点 是跳过子树。

但是倒着不能走实在是比较奇怪，所以我们把序列和树转过来变成正着可以走，这个思想大概是，原问题性质不好或者比较难想，可以考虑对称或者对偶的问题。

-----

这个题好爽啊，我都不舍得换题了，差点把这篇改成1495F题解（

-----

下面就是筛选2600+，constructive algorithms，并且按照通过人数降序做的了。

741C : 我是垃圾!第一感觉是随机调整（

看到只有两种菜，想到二分图，想到黑白染色，我们先给每对情侣连边，然后给每三个人......

不对啊!这个没法直接加边~~!加边!加边!~~。我们可以考虑一个强化，从每个$$2k-1$$向$$2k$$连边，这样搞出来一定满足三个人不都相同。

不过这样可能会丢失解。观察样例发现没有-1，我们可以猜测一定有解，接下来就是要证明这个算法也一定有解，或者说生成的一定是二分图。

因为每个人只有一个npy，所以每个人的度数都是$$2$$，一条边连向npy，一条边连向相邻的同志。所以每个环一定是两类边交替，那么它的长度就一定是偶数。

-----

1375F : 这是一道数学题。

样例选择先手，那我们当然先考虑选择先手。

根据CF的一贯传统，先手大概可以在几步之内必杀。

我们倒着做。考虑每次后手都可以动两堆，如果后手不得不做出两堆相同的，那么可以动的两堆都必须是动了之后就出现相同的。想一想容易发现只有这一种情况 : 

$$
a-k,a,(a+k)
$$

(用括号表示不能动的一堆)。既然$$k$$是你自己选，那么我们知道如果拼成了一个首项不能选的等差数列，你就赢了。

接下来，如果拼成了这样的等差数列，那么......我们来分分情况。假设三堆大小分别是$$x,y,z$$，如果要变成$$a-k,a,(a+k)$$，一定是有一堆操作之后变成了最大的。我们假设你这次操作数是$$t$$。

1\. $$x+t=a+k,y=a-k,z=a$$

我们显然是要解出$$t$$来。根据中间我们知道$$k=z-y$$，所以代入左边就得到$$t=z+z-y-x=2z-x-y$$。

还需要分类吗，既然我们已经解出来了?

实际上是需要的，因为我们需要知道我们要限制哪两个数可以操作。

2\. $$x=a-k,y+t=a+k,z=a$$

解得$$t=2z-x-y$$。跟上面一样。

3\. $$x=a-k,y=a,z+t=a+k$$

解得$$t=2y-x-z$$，不太一样，所以说我们应该取上面两种情况。

任务变成限制最大的不能操作，所以我们第一次操作只要加一个巨大的数，让被操作的数变成最大的就行了。

-----

547D : 完全想不到。两个做法都很妙。

官方题解说的是，考虑新建两排点表示每行每列，然后对于每个点从它的行连向它的列。我们考虑让这个无向图变成有向图，边的指向表示颜色，那么任务就变成给每条边定向，使得每个点入度出度差不超过$$1$$。容易发现如果有欧拉回路的话一定满足这个条件。那么我们使用经典trick，建一个虚点连向每个奇度点然后跑欧拉回路给边定向即可。事实上两种东西差不超过$$1$$想到欧拉路是经典套路。

$$\text{s}\color{red}{\text{hadowice1984}}$$给出了一个奇妙的二分图染色做法，说的是给所有行和列，所有点两两配对连边，然后在这个图上跑二分图染色。正确性很奇妙，说的是每个点只会连一条横边一条竖边，而每次走过一个点都会拐90度，所以要想形成回路一定是经过了偶数个点，所以这个图没有奇环。

-----

1375G : 这个2800的G，过题人数好多......

我们直接进行dp，设$$dp(u)$$表示以$$u$$为根时的答案，我们一开始求出$$dp(1)$$，然后做换根dp或者说up-and-down。为了求出$$dp(1)$$，我们以$$1$$为根，设$$f(u)$$表示$$u$$子树中全都挂到$$u$$上形成菊花的最小操作数，显然有$$dp(1)=f(1)$$。

考虑如何转移，一个显然的贪心是每次我们都会选择一个儿子作为中间结点，然后把孙子们一个一个挂到$$u$$上。当然在此之前要把孙子们变成菊花，这样孙子们的儿子们也可以一口气挂到$$u$$上。于是有

$$
f(u)=\sum_{v\in\mathrm{son}(\mathrm{son}(u))}(f(v)+1)
$$

然后我们考虑如何利用$$dp(\mathrm{fa}(u))$$求出$$dp(u)$$。发现上面的部分需要考虑爷爷，这部分可以直接硬推得到。

还有另一个非常神的做法，说的是我们对树黑白染色，考虑每次操作之后，只有点$$a$$的颜色变了，同时我们发现也可以用一次操作改变任何一个点的颜色，并且一个图是菊花图等价于某种颜色只有一个点，所以答案就是两种颜色点数的最小值再$$-1$$。

-----

1270G : 一眼看上去好像是经典问题......然而不是。

欣赏一下这题难度 : 

![tourist卡G](/img/2021-03-12-cf-brain-power-problems/tourist.png)

考虑我们把限制转化一下

$$
\begin{aligned}
i-n&\leq a_i&\leq i-1\\
-n&\leq a_i-i&\leq -1\\
1&\leq i-a_i&\leq n
\end{aligned}
$$

那么我们设$$b_i=i-a_i$$，则$$a_i=i-b_i$$。

然后考虑$$\sum a_{i_k}=0$$

$$
\begin{aligned}
\sum_{k=1}^s a_i=0\\
\sum_{k=1}^s i-b_i=0\\
\sum_{k=1}^s i=\sum_{k=1}^s b_i\\
\end{aligned}
$$

这个东西懂的都懂了!我们建一排点，从每个$$i$$连向$$b_i$$，那么环就表示一组解，同时因为是$$n$$点$$n$$边一定有环。

-----

1439B : 玄学题。完全不会。

也欣赏一下这题难度 : 

![Um_nik卡B](/img/2021-03-12-cf-brain-power-problems/um_nik.png)

考虑如何求一个大小为$$k$$的团。容易发现这是不可能的，因为最大团是NPC的，而我们枚举最大团大小就可以把这个问题归约到最大团。但是既然题目说到团，那么大概率是有用的，但是它应该是判完第二类之后剩下的特殊情况。这是读完题的一点想法。

首先我们知道$$\frac{k(k-1)}{2}\leq m$$时才可能有解。所以$$k$$的级别变成了$$O(\sqrt{m})$$。

容易发现所有度数$$<k-1$$的点不可能有贡献，所以我们可以把它们和它们连的边全都删掉。因为这个删的过程中可能会出现新的度数$$<k-1$$的点，所以可以开一个队列来进行删除。

那么接下来剩下的所有点度数都至少是$$k-1$$了。如果剩下的所有点度数都至少是$$k$$，那么我们选取这些点就可以了。

如果有至少一个点度数是$$k-1$$，那么它不可能在第二类的点集里面，但是有可能在那个团里面。我们要判定团也没有什么好方法，只能枚举它的邻接点并硬判。

你发现判一次复杂度是$$O(k^2)$$，需要这么判的点数是$$O(\frac{m}{k})$$，乘起来就是$$O(mk^2)=O(m\sqrt{m})$$。

剩下的部分，我们再删光$$k-1$$度点，如果还有剩余，那么剩下的点构成那个点集，否则无解。

当然这是使用双链表实现邻接表的复杂度，如果用`map`或者hash table会多$$\log$$或者多大常数，并且这是CF需要注意hash被卡。

-----

1391E : 猜到了结论，好刺激（

容易想到随便找一棵dfs树，如果深度$$\geq \lceil\frac{n}{2}\rceil$$那就直接输出链，否则给每一层随便配对使得每层最多只有一个结点没有被配对即可。

正确性证明其实也不困难。

首先是经典定理，无向图的dfs树只有树边和返祖边。考虑我们这么配对，由于没有横向边，配出来一定是每一对之间都没有边，所以只需要考虑点对之间的边。

假设两对点是$$(a,b),(c,d)$$并且$$(a,b)$$更深。考虑dfs的过程，同一深度最多有一个点在栈里，而只有遍历到一个点的时候连向栈内点的边才是返祖边，所以$$a,b$$每个点都只可能向$$c,d$$中的一个点连返祖边，总边数最多是$$2$$。

-----

1364E : 看起来询问次数是$$2n+o(n)$$。

一个简单的策略是先找出$$0$$，然后跟所有数$$\mathrm{or}$$一遍。

要找出$$0$$，可以考虑如果用集合来描述二进制数，那么我们可以不停地寻找当前数的子集，直到找到$$0$$。具体地，我们初始化一个$$x=1$$，然后对每个数$$i$$看是否有$$p_x\space \mathrm{or}\space p_i\leq p_x$$，如果成立的话就用$$i$$更新$$x$$，最后显然有$$p_x=0$$。

问题变成如何求出一个数。官方题解给了非常妙的做法，说的是考虑对于每一位求出一个这一位为$$0$$的数，然后把这十个数的序列称为$$z$$，那么一个数的值可以通过跟$$z\space\mathrm{or}$$一遍再$$\mathrm{and}$$起来得到，这个复杂度是$$O(\log n)$$的。要求出$$z$$，可以通过随机，因为每一位至少有一半的数是$$0$$，那么对于每一位，期望$$\frac{4}{3}$$次就可以找到一对这一位上为$$0$$的数。

我们需要更新$$x$$不超过$$\log n$$次(每次至少把一位变成$$0$$)，所以总操作次数就是$$2n+\log^2 n+O(\log n)$$，可以通过。

官方题解还给了另两种做法。

第二种说的是，考虑随机找到一对至少有一半位是$$0$$的数，那么我们把所有数跟这个数$$\mathrm{or}$$一遍，就可以把数的个数缩减到$$\sqrt{n}$$，多跑几遍就可以找到$$0$$了。操作数是$$2n+O(\sqrt{n})$$，也可以通过。

第三种说的是，考虑维护两个位置$$a,b$$并维护$$p_a\space\mathrm{or}\space p_b$$，每次随机一个$$c$$然后查询$$p_b\space\mathrm{or}\space p_c$$。

如果$$p_a\space\mathrm{or}\space p_b<p_c\space\mathrm{or}\space p_b$$，说明$$a<c$$，我们不管这个$$c$$。

如果$$p_a\space\mathrm{or}\space p_b>p_c\space\mathrm{or}\space p_b$$，说明$$a>c$$，我们用$$c$$更新$$a$$。

如果$$p_a\space\mathrm{or}\space p_b=p_c\space\mathrm{or}\space p_b$$，说明$$b$$不能是$$0$$，因为不然则有$$a=c$$，我们用$$c$$更新$$b$$。但是有个问题，现在我们不知道$$p_a\space\mathrm{or}\space p_b$$了，所以我们需要再查询一次。这个东西的操作次数......考虑第三种情况出现，当且仅当$$p_a\space\mathrm{xor}\space p_c$$被$$p_b$$包含，这个东西的概率......由于不断更新，我不会分析，但是实践上确实非常少——只有十几次。

-----

1019C : 孩子 四 岁 还 不 会 写 红 黑 树，我该怎么办?

你谷中文翻译不是很好，那个第二条要求应该是对于集合中某个点，而不是所有点。

这题难度也可以欣赏一下，虽然是上古场 : 

![只有七个人当场过C](/img/2021-03-12-cf-brain-power-problems/7.png)

![第一页惨状](/img/2021-03-12-cf-brain-power-problems/page1.png)

Radewoosh, Um_nik没能pp，neal, scott\_wu, Benq, matthew99都fst了，切掉ABC就可以rk34。这真的只是个2E啊!这么毒瘤我还是直接看题解吧（

好了下面说做法。

考虑一个归纳法，我们删掉随便一个点$$u$$，然后求出剩下的图的方案，那么如果这个方案也可以到达$$u$$，它对于原图也是一个合法方案；否则我们加入$$u$$......不对!

如果是在无向图上这个归纳就是对的，但是这是有向图，有可能出现$$u$$可以一步到达方案中的一个点，却没有点可以两步到达$$u$$的情况。

考虑另一个归纳法，我们删掉一个点$$u$$和它的所有出边连向的所有点，然后求出剩下的图的方案，那么如果这个方案中有一条边从一个被选的点连向$$u$$，它对于原图也是一个合法方案；否则我们选择$$u$$，因为$$u$$的出边连向的点全没了，这些点不可能被选择，所以这也是一个合法方案。

所以做法就很显然了，我们先从右往左删点，然后从左往右加点。当一个点被删掉的时候，我们枚举出边标记它的邻接点也被删掉了；当一个点加入点集的时候，我们枚举出边标记它一步可以到达的点。

-----

1091F : 你只要一看就知道，这题难度在于模拟。

-----

1148F : 奇妙题。完全想不到。

做法并不困难，首先我们考虑"有奇数个$$1$$就取反"，等价于乘上$$-1$$的$$1$$个数次方，这样就把每一位的贡献拆开了。

考虑枚举每一位进行决策。我们知道把$$s$$的一位改成$$1$$，将会给所有这一位$$mask$$为$$1$$的数，$$val$$乘上一个$$-1$$，那么如果这么改了可以增大权值和，或者说$$mask$$这一位为$$1$$的数权值和是负的，我们就搞，否则就不搞。

这个贪心是错误的，比如总和是正的，但是有一个大负数的$$mask$$是全$$1$$，决策的时候就废了。

问题出在哪里?

每个数被决策多次，就会出问题。

考虑让每个数只决策一次，容易想到每个数在最高的$$1$$处被决策，然后就可以得到正解了。

-----

356D : 在机房搞这个题，好家伙，$$\text{s}\color{red}{\text{uxxsfe}}$$啪的一下秒了这个题，结果我们两个人没想到bitset/dk

考虑如果我们选出了根，那么把剩下的点从大到小挂成一条链就可以得到一组解。同时选根是必须的一步，所以我们可以考虑用背包选出一些$$a_i$$使得和为$$s$$，用`bitset`优化即可。构造方案的话，可以考虑假设我们要构造大小为$$n$$的背包，那么我们枚举一个$$i$$，判断$$n-a_i$$是不是仍然可以拼出来，可以的话就递归到了$$n-a_i$$的情况。正确性显然。

-----

618F : 又是子集和，又完全不会/kk

这种题的基本方法当然是~~鸽子原理~~抽屉原理。首先大胆猜测一定有解。

考虑加强这个问题，我们只考虑子段。所有子段的和有$$\frac{1}{2}n(n-1)$$种，要使用抽屉原理大概绰绰有余，而且子段有一个巨大的好处 : 子段和可以用两个前缀和就表示出来。

我们考虑设$$sa$$表示$$a$$的前缀和，$$sb$$同理。

那么如果两段$$[i_1+1,j_1],[i_2+1,j_2]$$的和相同，我们就有$$sa_{j_1}-sa_{i_1}=sb_{j_2}-sb_{i_2}$$，搞一下得到$$sa_{j_1}-sb_{j_2}=sa_{i_1}-sb_{i_2}$$。

现在问题是，值域不确定，我们无法使用抽屉原理。不妨假设$$sa_{j_1}\geq sb_{j_2}$$，那么也有$$sa_{i_1}\geq sb_{i_2}$$。考虑如果对于每个$$j_1$$，我们只考虑满足上面那个不等式的最大的$$j_2$$，那么有$$0\leq sa_{j_1}-sb_{j_2}<n$$，一共有$$n$$个可能的值。同时一共有$$0,...,n$$共$$n+1$$个可能的$$j_1$$和$$i_1$$，所以这些东西里面必然有相同的。使用双指针就可以求出来所有这些值。

-----

1491F : 这题叫Magnets，念一念你会发现很舒服!（?

好妙啊!同样想不到/cy

考虑如果要找一块有磁性的磁石，我们可以考虑从左往右一个一个找，每次拿这个跟前面所有磁石放在一起问一次，因为至少有两块有磁性的磁石，这个办法一定可行。如果我们找到了一块磁石，那么就可以把所有石头都跟它问一次得到整个序列。

容易发现这样找到的会是第二块有磁性的磁石，而此时前面所有磁石，除了第一块有磁性的，都可以确定是没有磁性的。考虑如何找到第一块。

这里我们可以使用二分搜索，也就是说每次查询$$[1,mid]$$中所有磁石跟你找到的第二块有磁性的磁石。

二分第一块的询问次数是$$\lceil\log n\rceil$$，假设第二块有磁性的磁石在$$p$$处，那么找到它用了$$p-1$$次(不可能在第一个位置)，跟每个磁石查一次用了$$n-p$$次(前面的已经处理完)，总共就是$$n-1+\lceil\log n\rceil\leq n+\lfloor\log n\rfloor$$。

-----

1450E : 草，CF竟有差分约束!

考虑这个东西显然就是一个差分约束系统，所以我们先建出图来再说。

然后考虑这个极差最大怎么满足。要搞极差最大我们应该是跑最长路。所以把边权全部取反然后跑一个Floyd最长路就好了。注意这里是有向边，所以这个极差应该是把所有差的**绝对值**拿出来取$$\max$$。

这里的无解情况非常见鬼，我交了15发才过/cy

当然我并不会证明这个做法的正确性!

------

1451F : 一道奇妙题。

这个游戏好像不显然一定会结束，我们可以找个方法证明它一定结束，这可能会带来一些启发。

容易发现给起点减了之后，一定需要选择它左下方的一个格子作为起点才能再给它加回来，所以如果想无限玩下去最后一定会把左下角减掉一个数，减成$$0$$之后左下角就不能选了，此时变成两个子问题，所以一定会结束。

然而好像没什么启发。

考虑没有路径乱加的操作就是Nim，所以我们希望可以把它划分成若干个Nim?

这个路径有一个性质 : 路径上每个点相比上一个点，要么$$x$$增加$$1$$，要么$$y$$增加$$1$$。

按照$$x+y$$划分这个棋盘，其实就是分成了若干斜线，你发现每条路径上面每个点的斜线都是不同的，也就是说我们相当于操作了一堆 一条斜线上的Nim游戏。

终局满足每一条斜线的异或和都是$$0$$，所以我们可以考虑怎么把有斜线不是$$0$$的局面转化成全是$$0$$的局面。

找到最左下的不是全$$0$$的斜线，然后在这上面选择一个不是全$$0$$的点作为起点；选择右上角作为终点。我们依次走过每条斜线，然后玩这个斜线上的Nim游戏即可。

所以如果一个老兄开局斜线异或和全是$$0$$，那么他一定没了，因为他必须玩起点的斜线改变异或和。

另一道题 : 1149E Election Promises。

-----

1340D : wqy图论选讲讲了这题来着。

考虑众所周知答案显然是度数的最大值，那么怎么构造?

如果时间到了，我们就穿越回时刻$$0$$重新开始，听起来好像可以。

然而不可以 qwq。可能会出现穿越回去刚好撞到自己。

我们考虑如果在$$t$$时刻进入了儿子$$v$$，那么在$$t+1$$时刻从儿子$$v$$回来就很好。

令`solve(u)`表示解决当前时刻走进$$u$$子树，当前时刻$$-1$$走完子树走回$$u$$的问题，那么就相当于当前时刻$$-1$$从父亲走进来，当前时刻走回父亲。

考虑如果达到了上界，我们可以回退到$$\mathrm{deg}(u)$$前，这样刚好可以走完剩下的儿子并回到时刻$$t-1$$。如果没有进行这样的回退，走出去的时候时刻可能不是$$t-1$$了，需要特判一下。

-----

1404D : 奇妙题。

考虑玩家1。一个很简单的想法是，模$$2n$$和模$$n$$好像有点关系，所以我们分组$$(i,i+n)$$。具体地，如果是$$2n$$的倍数，那么一定是$$n$$的倍数。

发现这个东西模$$n$$同余于$$\frac{n(n+1)}{2}$$，拆开算一算你发现$$n$$是偶数的时候模$$n$$刚好是$$\frac{n}{2}$$，但是奇数的时候刚好是$$0$$。

呃我们接着考虑玩家2好了?对于奇数的情况，我们希望可以按照上面的方案选。

这样我们得到两组限制，一个是交互器给的对的限制，另一个是上面的方案给出的限制。

容易想到建一个图，两个点连边当且仅当在某一组限制中在同一对中，这样我们得到的一定是一堆环，因为每个点度数都是$$2$$。

你发现不光是一堆环，还是一堆偶环，因为每个点连的两条边分属两组限制。

二分图染色，那么黑点和白点都是一组合法方案，但是值不一定对。再算一下你发现一定有一组是对的。具体地，因为它模$$n$$是$$0$$，模$$2n$$要么是$$0$$要么是$$n$$，而总和模$$2n$$是$$n$$，所以必有一种颜色模$$2n$$是$$0$$。

-----

1103C : 套路题。

先建立dfs树。如果一个点的深度达到了$$\frac{n}{k}$$，那么$$1$$到它就是合法路径。

然后考虑怎么找圈。

考虑怎么选出这$$k$$个只出现一次的点，容易想到平均值定理，如果树高不到$$\frac{n}{k}$$，那么一定有一层点数超过$$k$$。

那个度数至少是$$3$$有什么用?发现这是说每个点至少有两条返祖边。

等等，不一定是返祖边，因为一个点的儿子也占度数。

为了利用返祖边，我们去找叶子。也就是证明叶子至少有$$k$$个。

怎么证?考虑叶子的深度和不超过叶子个数$$\times\frac{n}{k}$$，同时至少是$$n-1$$(每条边都会被算至少一次，菊花达到下界)，那么乘过去得到叶子个数至少是$$k+\frac{1}{n}$$。因为度数至少是$$3$$，那么$$n\geq 4$$，所以就证完了。

这$$k$$个叶子有什么用?我们找到每个叶子的两条返祖边，然后得到三个点 : 两个祖先和这个叶子自己。

考虑三个环 : 这个点分别到它的两个祖先再回来，和这个点先后到两个祖先再回来。

设三个点深度分别是$$d_1,d_2,d$$，不妨设$$d_1>d_2$$，三种长度就是$$d_1-d+1,d_2-d+1,d_1-d_2+2$$。我们要证明它们模$$3$$必有一个不为$$0$$。

如果前两个模$$3$$都是$$0$$，那么$$d_1-d,d_2-d$$模$$3$$都是$$2$$，而$$d_1-d_2=d_1-d-d_2+d$$，它模$$3$$是$$0$$，所以第三种长度模$$3$$就是$$2$$。这就做完了。

-----

1355F : 奇妙题。

这个巨松的限制，一看就很好玩。

基本方法是，如果想要问一些互质的数，可以乘起来一次问完。

硬分解好像很不行......先尝试找出所有的质因数?这样可以直接用因数个数公式计算因数个数。

如果要同时搞次数的话，最多只能两个质数放一起问。这难度略大。

如果不需要次数，发现我们可以通过简单的压缩，一口气问到第$$153$$个质数$$853$$。

这多吗?实际上很多了，因为如果一个数没有$$853$$以内的质因子，它的所有质因子次数和不可能超过$$3$$，所以它的因数个数不可能超过$$8$$。回答$$8$$即可。

但是我们需要次数，所以有些质因子必须被省略。

$$10^9$$以内的数最多只有$$10$$个质因子，也就是说我们只需要问$$5$$次就可以得到所有质因子的次数，剩下$$17$$次寻找质因子。事实证明$$17$$次可以问到$$677$$，这个数的四次方同样爆了$$10^9$$。

所以我们把这个数分成了两部分 : $$677$$以内，和$$677$$以上的质因子。

前者可以完全得到，后者不超过$$3$$个。显然后者在因数中的贡献不超过$$8$$。

所以我们考虑猜前者的贡献的$$2$$倍。如果我们猜错了，那么说明后者的贡献就是$$8$$，此时算一算发现前者的贡献不超过$$2$$，答案最多是$$16$$，那么我们特判一下回答$$9$$。

于是得到了完整做法，先大力求出不超过$$677$$的质因子的贡献，然后如果这个贡献是$$1$$我们就猜$$8$$，如果是$$2$$就猜$$9$$，否则猜这个贡献的$$2$$倍。

-----

1338D : 想象力题。

......(省略若干字)

可能假了，明天再说。

10-05回来看看，这一个 明天 就是多少天啊，我们直接重构吧（

考虑自然想法是如果我们拿着一条链，对链黑白染色之后，可以把所有黑点套起来，白点在两层中间连接。所以答案是直径的一半，但是样例就把我hack了。

然后考虑除了一条链之外我们还能选什么，容易发现所有和这条链上白点相邻的点都能选，方法就是把它一起套进去就行了。

然后我们也可以操纵白点的位置，也就是说我们可以任选这条链上哪些点是黑点，只要黑点不相邻即可。

所以答案的结构就是，选一条链，选一些黑点计入答案，然后白点的所有不在链上的邻接点计入答案。

这还是一个类似直径的问题，设$$dp(u,0/1)$$表示$$u$$作为链的一端，在$$u$$子树内选了一些点，$$u$$是白色/黑色的答案，转移就考虑加一个点，然后在lca处合并即可。

-----

这个坑到此就完结了，因为后面开的 CF再选做 是包含这个的（

不过并没有兴趣把这俩合并。历史遗留问题还是不要解决了。