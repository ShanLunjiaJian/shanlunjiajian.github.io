---
layout: post
title: dp和容斥
subtitle: 玄幻
tags: 数学 dp
show: true
---

一些容斥之后用dp计算的题目整合。

-----

[CF Gym 102978H Harsh Comments](https://codeforces.com/gym/102978/problem/H)

GP of 998244353!

CF上有一场番薯田大赛，大家都在往Announcement下面开喷。一共有$$n+m$$条评论，其中前$$n$$条是你发的，第$$i$$条获得了$$a_i$$个downvote；后$$m$$条是别人发的，第$$i$$条获得了$$b_i$$个downvote。现在Mike要删评，他会以downvote加权随机一个评论删掉，问期望多少次删光你发的评论。$$n,m\leq 100,a_i\leq 100,\sum a_i+\sum b_i<998244353$$，答案膜$$998244353$$。

你发现答案是$$n$$加上 删别人评论数量的期望。因为期望的线性性，我们可以拆开每一个别人发的评论，忽略掉所有其它别人发的评论，然后算它在删光你的评论之前删掉的概率，最后加起来。这好像是这题最重要的部分/jy

别人发的评论也会对取到各个评论的概率有影响，那么忽略其它评论为什么是对的?考虑一个经典问题，我有一个随机数生成器，它可以均匀随机生成$$1,2,3$$，现在我想均匀随机生成$$1,2$$怎么办?如果随出来$$3$$，那就忽略掉它再随一次，这样还是均匀随机的。这里的道理是一样的。如果你看不懂我在说什么，那就当没看到吧，你应该不会和我有一样的问题（

设$$a$$的和是$$s$$。

这个别人的评论，设它的downvote数是$$b$$，在所有你的评论之前的概率很好算，它就是$$\frac{b}{b+s}$$。但是在所有你的评论之后的概率就不是很好算。倒过来是不可行的，因为downvote数是不同的。

考虑容斥。我们枚举一个你的评论的子集$$S$$，这个别人的评论在$$S$$之前的概率就是$$\frac{b}{b+\sum_{i\in S}a_i}$$。可以忽略掉其它你的评论的原因，和上面类似。于是我们就得到了一个式子

$$
\sum_{S}(-1)^{\vert S\vert}\frac{b}{b+\sum_{i\in S}a_i}
$$

这个咋算?注意到$$\sum a_i$$最大也只有$$10000$$，所以背包一下求出每一种$$\sum a_i$$的容斥系数之和即可。

也可以min-max容斥，实际上差不多?

-----

[CF840C On the Beach](https://www.luogu.com.cn/problem/CF840C)

简化后是，给一个序列，求相邻两项不相同的排列方式数量，膜1e9+7。$$n\leq 300$$，可以加强到$$3000$$。

我们钦定$$k$$个相等的间隔，可以求出方案数$$f_k$$，乘上容斥系数就做完了。

考虑每一个颜色是独立的!我们可以对每个颜色求一下，然后卷起来。dp求出$$g_{c,i}$$表示在颜色$$c$$中钦定$$i$$个间隔的方案数。做完了。

-----

[ARC093F Dark Horse](https://www.luogu.com.cn/problem/AT3981)

发现不管你在哪个位置，赢的方案数是一样的，所以我们可以先算你在第一个位置的方案数，然后乘上$$2^n$$。

问题变成，求有多少种$$2,...,n$$的排列$$p$$，使得$$p_2, \min(p_3,p_4), \min(p_5,p_6,p_7,p_8),...$$都不在$$A$$中。这几个东西组成的集合我们不妨称为$$B$$。

考虑容斥，也就是说我们钦定一个$$B$$的子集，让它们在$$A$$中，剩下的随意。

考虑这样的dp : 设$$dp(i,S)$$表示考虑了$$A$$中前$$i$$个人，$$B$$的子集$$S$$中有$$A$$中的元素，其它的还没有确定。

转移考虑当前这个$$A$$中的人，可以把他插进$$B$$的一个没有确定的位置(并带上一些更大的元素来使他成为$$\min$$)，或者什么都不做。

注意到 带上一些更大的元素 的后效性可以通过把$$A$$从大到小排序加入来消去。

-----

sdptt2021 r3 d2t1

排列计数，对于每个位置有$$\leq a_i$$或者$$\geq a_i$$的限制。$$n\leq 5000$$。

考虑只有 必须在一个前缀里面 的限制的话很好做，那么我们可以把后缀容斥掉，变成$$(\leq n)-(\leq a_i-1)$$，然后做一个dp处理就好了。咋dp?你把这两个限制拆开，跟所有限制一起排序，然后就变成，如果有$$c$$个后缀的限制，那么你要加入恰好$$c$$个拆出来的限制。对拆出来的第二种背包一下，然后按量加入拆出来的第一种即可。

一个非常类似的经典题是 氪金手游。

-----

[AGC041F Histogram Rooks](https://www.luogu.com.cn/problem/AT5697)

你发现这个题根本没法做，那么我们就容斥。直接钦定一些格子没有被覆盖。

这个容斥太垃圾了，我们换一个。发现行是不连续的，但是列是连续的。考虑钦定一些列，让它们里面有没被覆盖的格子，当然容斥系数还是$$(-1)^{\text{没被覆盖的格子数量}}$$。

考虑每个行的连续段，如果这个连续段长$$len$$，经过$$p$$个被钦定的列，那么考虑两种情况 : 

 - 如果这些列和这一行的交点都没被覆盖，对容斥的贡献是$$2^{len-p}$$

 - 否则，选出有哪些被钦定，对容斥的贡献是$$\sum_{i=1}^p (-1)^i\binom{p}{i}$$，根据经典结论这个就是$$-[p\neq 0]$$

总共就是$$2^{len-p}-[p\neq 0]$$。

呃你发现我们这里其实不对，因为有可能出现钦定了一行有没被覆盖的格子，但是到头来却没钦定出没被覆盖的格子，这就会导致算错。

继续容斥!我们假设刚才钦定了集合$$S$$，再钦定一个集合$$T$$，表示刚才把集合$$T$$算错了，也就是它里面实际上没有没被覆盖的格子。这部分的容斥系数是$$(-1)^{\vert T\vert}$$。

然后还是考虑每个行连续段，假设它长度是$$len$$，经过的有$$p$$列在$$S$$中，$$q$$列在$$T$$中，贡献是 : 

 - 如果这些列和这一行的交点都没被覆盖，对容斥的贡献是$$2^{len-p} $$

 - 否则，选出有哪些被钦定，对容斥的贡献是$$\sum_{i=1}^{p-q} (-1)^i\binom{p-q}{i}$$，根据经典结论这个就是$$-[p-q\neq 0]$$，因为$$p\geq q$$，这个就是$$-[p>q]$$

总共就是$$2^{len-p}-[p>q]$$。$$(-1)^{\vert T\vert}$$的部分我们一会考虑，它是容易的。

所以我们考虑dp。注意到我们只关心$$\vert S\vert$$和$$\vert T\vert$$是否等于$$\vert S\vert$$了。

建立笛卡尔树，利用它来把这个东西划分成$$n$$个矩形。

设$$dp(u,j,0/1)$$表示考虑$$u$$和它的子树，$$\vert S\vert=j$$，$$\vert T\vert$$不是/是等于$$\vert S\vert$$的贡献。转移就是把儿子卷起来，并加上中间那一列，然后把若干行连续段一起扔进去。

中间那一列有三种情况 : 不在$$S$$中，在$$S$$中而不在$$T$$中，在$$T$$中，在这里考虑$$(-1)^{\vert T\vert}$$就好了。

直接做是$$O(n^2\log n)$$，随便优化就是$$O(n^2)$$。

-----

[集训队作业2018 小z的礼物](http://uoj.ac/problem/422)

有一个$$n\times m$$的棋盘，每次随机放一张骨牌(横竖都有可能)，把覆盖到的位置染黑。有一些特殊格子，问期望多少次染黑所有特殊格子。$$n\leq 6,m\leq 100$$，膜$$998244353$$。

先min-max容斥，然后问题变成对于每个特殊格子的子集求它中第一次有格子被覆盖的期望时刻。

你发现这是......几何分布!如果某个子集$$T$$中有$$x$$种方案选出一张骨牌，使得骨牌覆盖的至少一个在$$T$$中，并且总共有$$s=(n-1)m+n(m-1)$$种方案选出两个相邻格子，那么根据几何分布，期望$$\frac{s}{x}$$次就会抽出一张，对答案的贡献就再乘上容斥系数$$(-1)^{\vert T\vert}$$。

然后注意到$$x$$只有$$O(nm)$$，所有相等的$$x$$对答案的贡献只差一个容斥系数；同时$$n$$小的可怜，于是考虑用一个状压dp来搞定。

设$$dp(i,S,k)$$表示这样的特殊格子子集$$T$$的容斥系数之和 : 

 - 考虑到第$$i$$列，第$$i$$列的状态是$$S$$(其中$$0$$表示这个位置在$$T$$中，$$1$$表示不在)，有$$k$$种方案选出一些骨牌覆盖$$T$$。

然后就可以爆力枚举上一列怎么选来转移，复杂度据说是$$O(2^{2n}nm^2)$$。

这个东西慢在需要枚举上一行状态，所以考虑换成轮廓线。然后就做完了/jk，变成了$$O(2^nn^2m^2)$$。