---
layout: post
title: ARC选㗅
subtitle: /kk
tags: 问题集
show: true
---

A Way to Practice Competitive Programming里面说要做一做ARC的EF，所以就来做了（

远古ARC资料太少了，所以我们还是做近代的(058及以后)吧（

-----

ARC058E : 还真就不会做/kk

发现$$x+y+z$$小的可怜，只有$$17$$，看起来像是状压dp。

想了想怎么直接做，容易想到枚举四个端点然后背包预处理一个方案数，但是你发现这不行，因为一个序列可能有很多可行的区间。

所以需要容斥。但是这就需要钦定一堆区间然后算方案数，这太难了。

反过来做，考虑计算没有可行区间的方案数。

枚举可行区间的右端点，你发现存在以你枚举的右端点为右端点的可行区间，当且仅当这个右端点往左看，同时存在$$x+y+z,y+z,z$$三个后缀和。这启示我们把后缀和扔进状态。

设$$dp(i,S)$$表示长为$$i$$的序列，有集合$$S$$中的后缀和的方案数。注意到$$17$$以上的后缀和没有意义，所以状态数是$$O(2^{x+y+z}n)$$。转移枚举下一个选什么进行刷表，复杂度是$$O(2^{x+y+z}nv)$$。

-----

ARC058F : 收录于 Z algo。

-----

ARC059E : 式子好长......

实际上这个超长式子是用来迷惑你的，真正的题意应该是对于每种兴奋度和每种分糖果方案求和。

设$$dp(i,j)$$表示前$$i$$个小朋友拿了$$j$$个糖的答案，转移枚举第$$i$$个小朋友的兴奋度和拿了多少糖，有

$$
\begin{aligned}
dp(i,j)&=\sum_{k=a_i}^{b_i}\sum_{l=0}^jk^ldp(i-1,j-l)\\
&=\sum_{l=0}^jdp(i-1,j-l)(\sum_{k=a_i}^{b_i}k^l)
\end{aligned}
$$

直接预处理后面那个括号即可，复杂度是$$O(n^3)$$。

-----

ARC059F : 字符串题?

然而不是。

首先有个奇妙想法，那就是得到任何一种字符串的方案数是相同的，所以这个$$S$$没有用，只有$$\vert S\vert$$有用。

可以先算出打出$$\vert S\vert$$长度的方案数，然后除一个$$2^{\vert S\vert}$$即可。

我们设$$dp(i,j)$$表示打了$$i$$次打出长度是$$j$$的方案数，那么有$$dp(i,j)=dp(i-1,j+1)+2dp(i-1,j-1)$$，注意$$0$$处退格需要特判。复杂度$$O(n^2)$$。

AtC题还是很好玩的!

-----

ARC060E : 洛谷上D比E难?

经典题啊!倍增即可。

-----

ARC060F : 题意很麻烦。说的是，让你把一个串$$w$$划分成尽量少的段，使得每一段都不能划分成完全相同的若干段，求最小的划分段数和这样划分的方案数。

猜一个结论 : 如果$$w$$本身不能划分成完全相同的若干段，那么答案是$$1,1$$，如果$$w$$是一个字符重复若干次那么答案是$$\vert w\vert,1$$，否则是$$2$$，方案数可以正反两遍kmp求出来。

草，一看题解发现对了/jk

这么猜测的原因是，如果$$1$$不是周期，那么至少需要同时具有$$n$$以内所有质数周期才能ban掉所有分成两段的方案，所以$$n$$以内所有质数都应该是$$n$$的因数，而当$$n\geq 3$$的时候$$n$$以内所有质数的乘积一定比$$n$$大，所以这是不可能的。

-----

ARC061E : 非常简单，建个虚点处理中转，然后01bfs即可。

-----

ARC061F : 多 人 运 动（

首先我们把牌堆转化成序列，按照摸牌的顺序把牌们排成一排。

因为游戏结束的时候$$b,c$$可能还没有摸完，所以这个序列的长度在$$n+m+k$$以内，而不一定是$$n+m+k$$。在序列之外的牌是什么都可以。

考虑$$a$$赢说的是什么，看起来好像是这个序列中$$a$$出现的次数刚好是$$n$$，而$$b,c$$出现的次数都小于等于$$m,k$$(她们取到$$m+1,k+1$$才能赢)，并且最后一个一定是$$a$$。让$$n:=n-1$$，我们就可以去掉最后一个了。然后枚举这个长度，问题转化成

计算有多少个$$a,b,c$$组成的、长度是$$l$$的序列，满足出现了$$n$$个$$a$$，$$m$$以内个$$b$$，$$k$$以内个$$c$$。

我们用二项式系数来选所有的$$a$$，然后枚举有多少个$$b$$，此时剩下的全是$$c$$，如果这两个数量满足要求我们用二项式系数选出来。

可以写出这样的式子

$$
\binom{l}{n}\sum_{t=l-n-m}^{m}\binom{l-n}{t}
$$

当然下指标是负数的话我们认为值是$$0$$。那么我们的答案就是

$$
\sum_{l=n}^{n+m+k}3^{n+m+k-l}\binom{l}{n}\sum_{t=l-n-m}^{m}\binom{l-n}{t}
$$

直接计算复杂度是$$O(n^2)$$，考虑优化。

后面那个是一行组合数的区间和，众所周知难以直接解，但是应该可以快速递推。

设那个东西是$$f(\max(l-n-m,0),m,l-n)$$，那么问题就是如何从$$f(k-1,l-1,r)$$推到$$f(k,l,r)$$。

$$
\begin{aligned}
f(k,l,r)&=\sum_{i=l}^r\binom{k}{i}\\
&=\sum_{i=l}^r\binom{k-1}{i}+\sum_{i=l}^r\binom{k-1}{i-1}\\
&=\sum_{i=l-1}^r\binom{k-1}{i}-\binom{k-1}{l-1}+\sum_{i=l-1}^r\binom{k-1}{i}-\binom{k-1}{r}\\
&=2f(k-1,l-1,r)-\binom{k-1}{l-1}-\binom{k-1}{r}
\end{aligned}
$$

就做完了!

-----

ARC062E : hash!

枚举上下两个面，那么就能确定剩下四个面的颜色。

然后进行hash，扔进map统计即可。

-----

ARC062F : 看到这个简单环......

考虑v-DCC。容易发现每个v-DCC是独立的，可以求出方案数乘起来。

 - 如果一个v-DCC只有一条边，那么它有$$k$$种选法。

 - 如果一个v-DCC是一个环，那么它的选法可以用Polya定理计算。

 - 如果一个v-DCC是别的东西，那么任意置换都能被换出来(环之外的部分可以充当一个寄存器)，可以直接用隔板法选。

就做完了。

-----

ARC063E : 

这题真是太妙了。完全想不到。

考虑怎么决策才能没有后效性。

我们按照从小到大的顺序决策。

开一个堆，每次取出已经决定的点中最小的点，然后把它周围的点点权设成它的点权$$+1$$，最后检查合法性。

-----

ARC063F : 

第一步转化是，这个东西等价于求不包含特殊的最大周长矩形(可以在边界上)。画一画好像很好理解。

分治。假设我们拿一条竖线切开这个矩形。

枚举两条横线，看它们最远延伸到哪里即可，这部分可以容易地递推出来。复杂度$$O(n^2\log n)$$。

-----

ARC064F : 

直接做的话，考虑把一个前缀移到最后去，回文串会变成两个回文串连起来，不过这样肯定会算重。

发现只有在原回文串是循环串的时候才会算重，换句话说一个 两个回文串连起来 可能被多种回文串搞出来，而这些回文串一定循环同构。

然后你发现就简简单单了，因为只有原串循环节长度是偶数的时候才会发生这种事情，并且这种事情发生的时候一定恰好是两个回文串产生冲突。

于是直接数 两个回文串连起来 就完全没有前途了，考虑这样的数法 : 

枚举一个循环节长度，计算有多少个这样的回文串，然后算贡献。

循环节长度只有$$d(n)$$种。

可以用一个dp来容易地搞定。但是这里有一个问题，就是我们的dp会算上回文串更短的情况，此时只需要简简单单差分一下就好了。

算贡献简简单单，如果最小循环节长度是$$k$$，随便考虑一下你发现可以移出$$k$$种不同的串，当然$$k$$是偶数的时候刚才我们考虑过需要除一个$$2$$。

-----

ARC065E : 

好像是说，给定点集，有两个指针，一开始指针指向$$a,b$$，$$a,b$$都在点集内，然后你每次可以把$$b$$移动到从$$a$$画的一个曼哈顿距离下的半径为$$\mathrm{dist}(a,b)$$的圆上任意一点(其实是个斜的正方形)，或者反过来。问可能指向多少不同的点对。

看起来非常复杂。要不先曼哈顿转切比雪夫?

你发现最坏情况下答案是$$\Omega(n^2)$$的，构造方法是放两排点。所以枚举点对没前途了。

考虑一个简单想法，我们从$$a,b$$中随便一个点开始dfs，每次走到切比雪夫距离意义下是一个圆的所有点，然后对于每个可能的点对，我们在先被遍历到的点处统计答案。数据结构问题是这样的 : 

 - 删除一个点

 - 查询一行/列的一个区间上点数

 - 查询一行/列的一个区间里任意一个点

然后直接开`map`套`set`即可。复杂度是一个$$\log$$。

-----

ARC065F : 

没看到$$l$$递增/cy

那么我们可以发现一个性质，每次操作之后，当前左端点到下一个左端点之前这一段就再也不能变化了。我们可以在此时确定下来这一段是什么。

考虑一个牛逼dp，既然前$$i$$次操作之后$$l_i$$到$$l_{i+1}-1$$就确定了，而$$r_i+1$$到$$n$$还没变，$$l_{i+1}$$到$$r_i$$里面只有$$0,1$$的个数有用，于是我们设$$dp(i,j)$$表示考虑前$$i$$次操作，$$l_{i+1}$$到$$r_i$$里面有$$j$$个$$1$$的方案数。

转移好像比较简单，只需要考虑这$$j$$个$$1$$里面有多少个是从$$i-1$$次操作换过来的，剩下的就是本来就在区间$$[l_i,r_i]$$里的。

式子看起来是 : 

$$
dp(i,j):=dp(i,j)+\binom{l_{i+1}-l_i}{k+s(r_{i-1}+1,r_i)-j}dp(i-1,k)
$$

。爆力转移看起来像是$$O(n^3)$$的，于是考虑优化。但是你发现这个式子太复杂了（

考虑一些奇怪的优化方法，你发现$$j$$有个上下界。

 - 上界大约是$$k+s$$，表示最多就是把所有的$$1$$塞进去

 - 下界大约是$$l_i-l_{i+1}+k+s$$，表示最少就是把所有的$$1$$尽可能往前塞

然后减一下你得到$$l_{i+1}-l_i$$，也就是说如果我们枚举顺序是$$i,k,j$$，那么对于每一个$$k$$，$$j$$在所有$$i$$上的枚举量是$$O(n)$$的。这样总复杂度就是$$O(n^2)$$。

为了省去奇怪的情况，可以先跑掉被包含的区间，然后把所有区间划分成不交的若干段，答案乘起来即可。不过看起来有更奇怪的判法?

-----

ARC066E : 

1e5/jy

考虑减号是什么意思。你可以把后面一段操作数取反。

于是自然想到从右往左dp或者贪心。你发现贪心很好维护，只需要对于后面每个位置维护一个到当前位置的和，也就是支持插入，全局加，查询$$\min$$。

然而这个贪心好像是错的/jy

看题解去/ll，完全想错了。

考虑括号只有在减号后面才有用。

考虑一个非常强的结论 : 在这个括号里面如果还有一个减号，我们可以直接把每一个减号后面所有元素都括起来，直到下一个减号或者外层括号结束。因为$$a$$是正的，这样肯定不劣。

所以你发现，我们一定是在某个减号开始加括号，一直加到最后，然后这个括号里面除了第一个元素，所有元素都按正的算。枚举从哪个减号开始，维护前面的结果和后面的和即可。

-----

ARC066F : 

如果没有修改，看起来就是简单斜率优化。具体地，选一段$$(j,i]$$的贡献是$$s_i-s_j+\frac{1}{2}(i-j)(i-j+1)$$，拆开变成$$s_i-s_j+\frac{1}{2}(i^2+i+j^2-j-2ij)$$。

考虑单点修改，修改独立的套路，我们预处理前后缀的答案，那么如果这次改了$$i$$，如果不选$$i$$就简简单单；如果强制选了$$i$$就比较复杂，不过我们至少知道强制选$$i$$得到的最优方案和$$i$$的代价无关。

爆力的话，当然是枚举$$i$$所在的段，不过这太慢了。爆力优化就是枚举一个区间，更新区间内所有的$$i$$，这个可以做到$$O(n^2)$$。

分治。我们一口气处理所有跨过中点的区间。

你发现我们可以这么做 : 枚举一个左端点，求出从它出发跨过中点的最优方案，然后更新它到中点这一段的答案，右边反过来做一遍。转移可以斜率优化成$$O(n)$$，加上分治就是$$O(n\log n)$$。

-----

ARC067E : 

看起来按组决策没有前途，我们直接按人数决策，组合数选一选就好了。

-----

ARC067F : 

$$nm$$是1e6级别，于是可能要带$$\log$$。也可能是$$n^2+m^3$$什么的?

考虑枚举一个馆子的区间，那么你一定是从左往右走过去，问题就是在哪里用你的券，这里就直接取个$$\max$$。于是抽象成了奇怪的问题 : 矩阵，对于每个行的区间，求每列在这个区间的$$\max$$再加起来的最大值，当然还要减去区间长度。

容易想到分治，但是我不会。

考虑一个决策单调性，你发现这个一堆$$\max$$加起来好像是满足四边形不等式的，但是我也不知道满足不满足，所以分治一下就搞定了，如果你想也可以SMAWK/jy

存在简单做法。考虑对于每张券分开考虑，也就是说我们对于每一列建立笛卡尔树，然后就变成大量矩形加之后一次全局$$\max$$，使用单调栈处理笛卡尔树，大力打标记即可。复杂度$$O(nm)$$。

-----

ARC068E : 

很有意思（

直接对每个数跑的话，去重很复杂，需要观察性质，不过有不用观察性质的做法。

考虑对于每个区间，求出它贡献的所有数。你发现区间$$l,r$$对$$d$$有贡献，当且仅当$$\lfloor\frac{l-1}{d}\rfloor<\lfloor\frac{r}{d}\rfloor$$，然后这个可以整除分块，区间加用差分-前缀和实现，复杂度是一个根号。

-----

ARC068F : 

suxxsfe一眼秒!

考虑这个队列最后一定是先递减再递增，然后我们会弹空一边，另一边弹了一部分。这个是充要的，主要问题在于如何去重，也就是说不同的插入序列可能得到相同的弹出序列。

考虑只有弹出序列的前$$k-1$$项有用，后面的就直接在左右选一边弹，乘上$$2^{n-k-1}$$即可，$$-1$$是因为最后一个没的选。

问题变成，从$$n$$个数里面选出$$k-1$$个构成一个序列，并且这个序列可以划分成两个单调递减序列，这等价于存在一种插入方案。

考虑一个简单dp，我们设$$dp(i,j)$$表示已经选了$$i$$个数，最小值是$$j$$的方案数。

考虑转移。不妨假设$$j$$在第一个单调递减序列$$a$$中，并设$$b$$的最小值是$$t$$。

 - 如果我们要往$$a$$中加一个数，就要求这个数比$$j$$小。

 - 如果我们要往$$b$$中加一个数，就要求这个数要是还没加的数中最大的，不然这个数再也没法加进去了。

第一种转移是容易的，考虑怎么判断第二种转移是否可行。你发现我们只需要判断是否有$$n-j+1=i$$即可。

-----

ARC069E : 

这个题看起来还有点复杂啊?

发现要做的事情不过就是把最高的一层不停往下砍，直接维护当前最高一层的高度，数据结构问题是单点激活，全局加，简简单单。

-----

ARC069F : 

经典2-SAT，二分之后就是2-SAT优化建图板子了。

-----

ARC070E : 

据说一个更强的经典题是 APIO2016 烟火表演?

$$O(nv)$$简简单单，直接dp然后单调队列优化即可。具体地，设$$dp(i,j)$$表示考虑前$$i$$行，第$$i$$行这个区间的左端点是$$j$$的最小代价。转移就是

$$
dp(i,j)=\vert l_i-j\vert+\min_{k=j-len_{i-1}}^{j+len_i}dp(i-1,k)
$$

考虑一些奇怪优化，你发现这个东西有凸性，前面加的是个凸函数，后面是$$len_i+len_{i-1}+1$$个凸函数取$$\min$$，众所周知这两个操作保持凸性，也就是说固定$$i$$的话，$$dp(i,j)$$是个凸函数。

看起来我们还需要更多性质。你发现这个凸函数必然是由若干折线拼起来的，而折线段数很可能是$$O(n)$$，所以我们可以考虑直接维护这些折线。

呃要不先考虑一下为什么是$$O(n)$$吧。那个绝对值的斜率是$$\pm 1$$，这说明$$dp_n$$的任意一点斜率不超过$$\pm n$$，而由于凸性，斜率相同的一定在一段，所以段数是$$O(n)$$的。

然后开始考虑这个转移。你发现那个取$$\min$$的时候，取到哪里是由凸性决定了的，所以最后对函数的改变就是把斜率正的部分向右平移$$len_{i-1}$$，负的部分向左平移$$len_i$$。

然后考虑如何加上$$\vert l_i-j\vert$$，你发现这个东西实在是简简单单，只需要加入一个新的拐点，两边分别打上$$\pm 1$$的标记即可。

平衡树容易维护，但是更简单的做法是对顶堆。

-----

ARC070F : 

非常经典。

-----

ARC071E : 

你发现操作是可逆的!

所以我们全换成A，然后看个数模$$3$$是否相同即可。

-----

ARC071F : 

你发现如果有两个相邻的数都不是$$1$$，就出大问题，后面全都是这两个数中的第二个了。

所以我们的序列一定是若干段的$$1$$和不是$$1$$的数交替，最后有一串不是$$1$$的数，每一部分都可以没有。

考虑一个dp，设$$dp(i)$$表示长为$$i$$的方案数，那么我们发现这个序列往后扩展是困难的，所以考虑往前扩展。

有两种决策 : 

 - 填两个不是$$1$$的数来结束后面的战斗，方案数是$$(n-1)^2$$

 - 填一个任意数和一串$$1$$，需要从后面转移，可以用后缀和优化

就做完了，复杂度$$O(n^2)$$。注意边界。

-----

ARC072E : 

直接读错题/jk

考虑前半部分走到哪是确定了的，所以我们只需要考虑改的这一步走多少，能走出一个后面走不出的距离。设$$f(i,n)$$表示用$$i$$和之后的操作，能不能走出距离$$n$$，如果我们可以快速找到一个$$f_i(n)$$的$$0$$值，那么很有可能就把这个题做完了。

在此之前，考虑我们要找什么样的$$0$$，显然我们是要找尽可能靠前的，因为如果太靠后了，不管怎么修改都走不过去(改的太大会导致操作不执行)。

考虑直接求这个最靠前的$$0$$的位置，发现可以容易地递推。设$$f(i)$$表示用$$i$$和之后的操作，不能走出来的最小距离，那么

 - 如果$$f(i+1)>\frac{d_i}{2}$$，有$$f(i)=f(i+1)+d_i$$

 - 如果$$f(i+1)<\frac{d_i}{2}$$，有$$f(i)=f(i+1)$$

。就做完了，复杂度$$O(n)$$。

背包是复杂的，但是背包可行性的极长前缀$$1$$是简单的，这在类似背包可行性的问题上同样适用。

-----

ARC072F : 

考虑最优策略的性质，我们大胆猜测只可能是每天放空或者尽可能留下。dp即可。

然后你发现这个好像会WA。

说实话水温不太好，我们定义一个 能量，说的是温度乘体积。这东西的好处是可以直接加减，坏处是倒水的时候会降低。

考虑爆力dp，设$$dp(i,j)$$表示考虑前$$i$$天，第$$i$$天结束的时候有$$j$$的水，最高的能量。转移是

$$
dp(i,j)=v_it_i+\max_{k\leq j-v_i}\frac{k-(j-v_i)}{k}dp(i-1,k)
$$

你发现一个奇妙事实，$$\frac{k-(j-v_i)}{k}$$是上凸的，上凸函数的点积还是上凸函数，所以固定$$i$$的话，$$dp(i,j)$$也是上凸的。AtC怎么这么多凸性题（

所以我们可以考虑怎么用这个优化转移。你发现那个乘法并取$$\max$$的几何意义是，从每个点向原点连线，然后如果有另一个点在这条线下面，就把它从凸壳上删去换成这条线。这个操作就是维护一个斜率的单调栈。

加法就简简单单，说的是一个平移。

于是我们可以用单调栈维护一堆向量。但是这里还有个小问题，就是那些超过$$L$$的我们不能要，这个就把单调栈换成单调队列就行了。

-----

ARC073E : 

据说就是card/jy

考虑我们钦定最大的是红色，那么我们枚举红色的最小值在哪，这个可以直接把还没确定的所有球从小到大枚举，那么比这个最小值小的就是蓝色了，剩下没确定的就是蓝色的最大值，数据结构问题是删除，增值，查询$$\max$$，开个堆即可。

需要注意一点特殊情况。

-----

ARC073F : 

这个题看起来非常经典。

容易设出一个$$O(n^2)$$状态的dp，但是状态数过多显然没救。

考虑怎么变成$$O(n)$$，你发现一定是两个棋子交替移动，我们可以以交替的位置划分阶段进行转移。

设$$dp(i)$$表示考虑前$$i$$次操作，第$$i-1$$次是A移过去了，而第$$i$$次是B。当然这个是对称的，或者说把两个人换过来结果是一样的。

转移的话我们就看B搞了多少，前一次就是A搞了，可以写出

$$
dp(i)=\min_{j<i}(dp(j)+c(j,i-1)+\vert x_i-x_{j-1}\vert)
$$

那么第一个问题是$$c$$是个什么东西，你发现它就是一个距离的区间和，所以数据结构问题是全局加，单点插入，全局$$\min$$，我们直接开个堆维护即可。

第二个问题是绝对值，你发现我们可以以$$x_{i-1}$$为下标建立两棵线段树，一棵在绝对值上取负而另一棵不，这样就可以搞定这个绝对值。

-----

ARC074E : 

这个题看起来非常简单，你发现要限制颜色数，当然考虑$$pre$$，于是我们爆力把$$pre$$计入状态，可以写出$$dp(i,a,b,c)$$表示前$$i$$个，三种颜色的$$pre$$分别是$$a,b,c$$的方案数。然后你立刻发现$$i$$位置上的颜色的$$pre=i$$，所以直接砍去一维。

转移怎么做?考虑枚举下一个填什么进行刷表，这个非常自然。当然也可以枚举上一个填什么转移，不过那样复杂一些。

对于限制，我们在右端点处检查合法性即可。

可以加强到$$O(n^2+m)$$，也就是n5e3 m1e6这样的，请见 zroi noip18联测。

-----

ARC074F : 直接最小割，注意建图需要一点点小技巧。

-----

ARC075E : 非常简单，只需要化个式子。

考虑区间平均值的限制是$$\frac{s_r-s_{l-1}}{r-(l-1)}\geq k$$，这个东西就是$$s_r-s_{l-1}\geq kr-k(l-1)$$，移项变成$$s_r-kr\geq s_{l-1}-k(l-1)$$，于是扫过去，用set维护$$s_i-ki$$即可。

-----

ARC075F : 看起来非常复杂。

考虑满足条件的$$n$$不可能超过1e19，不然翻转的时候值变化一定超过1e9(或者压根不变)。

考虑翻转这个东西怎么描述。你发现我们至少需要知道位数吧!所以先枚举一个位数。

剩下的部分可能是强力数位dp。还是再分析点性质吧。

把数都对应起来，你发现一个显然的事实 : 如果我们确定了这个数的低一半，就可以确定这个数了，因为我们给它加上$$d$$再取反就得到高一半。当然这样搞出来的数不一定合法。

考虑从两边往中间决策，这样在决策过程中就可以检查合法性。你发现我们只需要知道目前决策的两位，低位是否进位了，和高位是否收到了进位。设$$dp(i,0/1,0/1)$$表示已经考虑了前后各$$i$$位，两个进位的情况。

转移枚举当前要处理的两位分别填了什么，以及进位情况即可，复杂度是$$O(k\log^2 v)$$，其中$$k=10$$是进制。

-----

ARC076E : 

这个题看起来非常复杂。不过仔细想一想也好像非常简单，考虑只有存在两端点都在边界上的情况才可能不可行，进一步考虑发现不可行当且仅当两个 两端点都在边界上的点对 相交。然后做法就显然了，我们为了找到是否有相交，直接做括号匹配就好了。

-----

ARC076F : 

你发现这个 加椅子 是一定可以加给那些一开始没有座位的人的，所以问题其实是有多少人没有座位。

这个怎么做呢?考虑前后缀和优化建图，跑Dinic/jy

当然这个跑过去可能性不大。来点正经做法。

简单做法是模拟网络流。考虑爆力建的图，我们按照$$l$$从大到小依次增广每个人，每次尽可能选最大的椅子。

如果增广不动，需要反悔一个$$l$$更大的，讲道理我们应该反悔那个$$r$$更小的，让他去选一个还没选的尽可能小的椅子，没的反悔则直接尝试把这个插到右边。可以用堆维护人，set维护椅子。

复杂做法是Hall定理。Hall定理的一个简单扩展是，设$$k$$为最大匹配，$$n-k$$等于选一个左部点子集，它的点数减去相邻的右部点数的最大值。

考虑这个有什么用。首先你发现如果固定左部点的子集，右部点是一堆点集的并，而这里每个左部点有连边的右部点集合是一个前缀和一个后缀，这个并肯定也是一个前缀一个后缀，如果你不理解的话画个图就理解了。

如果我们确定了这个前缀和后缀，右部点的贡献已经被钦定了，只需要尽可能选连边的部分包含在这里面的左部点就好了。

考虑扫描线扫那个后缀，线段树维护到每个前缀的答案。每个右部点是两个前后缀加减，左部点是前后缀加减，要查询前缀$$\min$$，使用线段树即可。

-----

ARC077E : 

看起来好像是单谷的，然后发现它是循环的并且没有-1操作/cy

考虑每次调节的时候，$$x$$的数值不同都会造成调节次数的不同，其中在一部分是公差为$$1$$的等差数列，另一部分是不会用的也就是常数，所以相当于支持区间加公差为$$0,1$$的等差数列，最后询问整个序列的$$\min$$，用两个差分-前缀和维护即可。

-----

ARC077F : 

看起来非常复杂。

考虑怎么描述 加最少的字符变成偶串。

你发现大概就是，找一个最长的不到原串一半的真border，然后把这个真border之外的部分接一次，比如$$aba$$会变成$$abab$$。注意到保证原串是偶串，所以我们可以直接在它的一半里找最长真border，这样就减少了一点限制。

同时你发现，最后这个串的后一半没有任何意义，因为前一半长度也是不断增长的。

然后我就可以放弃这个题了/cy，这就去学border理论（不过实际上这个题跟那个没关系

硬推一下，考虑设原串为$$ss$$，$$s$$的最长真border为$$r$$，$$s$$砍掉后面的$$r$$之后得到$$t$$(实际上$$t$$就是$$s$$的最短周期)，砍掉前面的$$r$$得到$$t^\prime$$，或者说$$s=tr=rt^\prime$$。

考虑$$ss=rt^\prime tr$$操作之后就是$$rt^\prime trt^\prime t=stst=trttrt$$，这个形式还是很好看的。

继续考虑，你发现此时最长真border可能发生变化。由于$$t$$是$$s$$的周期，现在它和$$s$$拼在一起了，我们不妨对它是否是整周期讨论一下

 - 如果是整周期，新的最长真border应该是原来的border$$r$$加上一个$$t$$(因为$$t$$和$$r$$是可以接起来的)，容易发现我们再操作的时候还是会往后增加一个$$t^\prime t$$，于是接下来就是$$sttstt,stttsttt,sttttstttt,...$$，这个情况显然是容易处理的

 - 如果不是整周期，新的最长真border应该是$$t$$，再操作的时候会往后加上一个$$rttr$$，串变成$$trttr\ trttr=sts\ sts$$。

    - 接下来新的最长真border应该是$$tr=s$$，再操作的时候加上$$ttrtrt$$，串变成$$trttrtrt\ trttrtrt=stsst\ stsst$$。

    - 再接下来新的最长真border应该是$$trt=st$$，再操作的时候加上$$trtrttrttr$$，串变成$$trttrtrttrttr\ trttrtrttrttr=stsststs\ stsststs$$。

    - 你发现这是一个奇妙的过程，每个串都是前面第一个加上第二个。所以它的长度是Fib数，$$\log$$次之后就会达到1e18，可以爆力处理出来每一次操作的区间和各字符出现次数，查询时对左右端点递归到底层同时统计答案，完全覆盖的段直接加进来，复杂度是一个$$\log$$

，就做完了。

-----

ARC078E : 

考虑如果我们确定了位数，就可以直接二分出来了，具体方法就是把这个数后面接一个$$0$$来保证问的数总比答案大，这样就可以保证获得字典序大小的信息，而位数相同时字典序大小就是数值大小。

确定位数也很简单，只需要问一遍$$100...$$这样的数就行了，因为它们是字典序最小的。

-----

ARC078F : 

你以为这是一道图论题，然而$$n$$只有$$15$$/hanx

考虑答案的结构，一定是$$s,t$$之间有一条链，其它所有点到这条链都有一条割边，这个条件看起来是充要的。

考虑我们爆搜哪些点在链上，然后找到最优的方式把链串起来，这个显然可以状压dp搞定。

剩下的部分是计算其它点怎么连到链上。考虑这相当于把点划分成了若干连通块，块之间没有边，每个块保留一条到链上的边。

于是考虑一个非常爆力的状压dp，我们直接设$$dp(S,T)$$表示已经分配了$$S$$中所有点，目前考虑的块是$$T$$的答案。转移考虑是结束这一块并新建一块，还是加入一个还没考虑到的点，按照$$\mathrm{popcnt}$$从小到大处理，复杂度显然是$$O(3^nn)$$。

注意到这个$$T$$其实没有存在的必要，我们直接设$$dp(S)$$，然后枚举$$2^n-S$$的一个子集转移即可。预处理每个子集内边权的和，以及任意两个子集之间最大的边，复杂度还是$$O(3^nn)$$，但是简单的多。

-----

ARC079D/E : 

这是两个version，看起来是互逆的。D是构造而E是常规题。

D : 

首先你发现每次操作之后，总和肯定会减少$$1$$，那么考虑如果我们直接把第一个搞成$$n-1+k$$，别的全是$$n-1$$，最后是不是肯定可以了啊（

然后你发现不行，因为最后可能会操作超过$$k$$次。

那么我们换一个构造。考虑构造$$1,2,3,4,5,6,7,8,9,...,n$$，这样搞的话，你发现全都操作一遍之后会变成$$0,1,2,3,4,...,n-1$$。所以我们如果这样摆上去，最后会剩下$$k\bmod{n}$$次操作没有用，我们再把它们拍到最后那几个上就行了。

E : 

考虑我们刚才那个轮流减，实际上所有数组的操作过程都可以这么描述，有一个集合在被轮流减，有最多$$n$$个时刻会有新元素加入集合，我们只需要处理这些时刻就好了，实际上就是一个数达到集合的$$\min$$的时刻。于是我们可以记录一下当前有多少个数在集合中，$$\min$$是多少，然后不断找到剩下的中最大的，一路减过去并统计答案，最后再特殊处理一下，所以实际上排个序就做完了。我没有写过，不知道正确性（

另一个做法是你发现我们可以一口气把最大值减到$$<n$$，这不会影响答案，因为它最后总要$$<n$$的嘛。爆力做的复杂度?考虑你这是除，所以显然是$$O(n^2\log v)$$的，具体是个啥$$\log$$咱也无从得知是吧（题解区说不是常数底的?不是也没关系（

-----

ARC079F : 

人话题意是说，给一个外向基环树，给每个点分配一个权值，一条边两个端点权值不同，并且要求如果$$u$$的权值是$$a$$，那么对于$$0,...,a-1$$的每一个权值，$$u$$都必须连向一个具有这样权值的点。

考虑外向树怎么做，可以先把叶子全搞成$$0$$，然后直接自底向上递推，每个点是儿子的$$\mathrm{mex}$$，这是一定可行的。

考虑外向基环树怎么做，我们先这么递推一波，然后调整一下环上不满足的，或者说有些可能需要$$+1$$之类的。

你发现讨论起来太过复杂了，不过好像题解里很多人是这么做的。我们直接枚举一个点的权值，然后破环成链大力模拟。不过这个好像有点慢。

考虑因为是$$\mathrm{mex}$$，你发现要达到某个权值，要求的子树大小是指数级的，所以权值最大也是$$O(\log n)$$级别，这样枚举量就很小了。

-----

ARC080E : ???

哦是接在前面啊。考虑我们肯定是最后选一对字典序最小的，那么设它俩出现位置分别是$$i,j$$，我们就把序列分成了三段，两段之间是不能交叉的。递归下去即可。

当然我们这么选可行就要求选之后一定有解。如果三段长度都是偶数那就有解，这等价于要求两个数奇偶性不同。

类似于 超级钢琴，直接将每一段的权值设为可以选的最小的对扔进堆里，每次拿出来最小的劈开，用st表求值再放回去。

-----

ARC080F : 看到这个就想起哥猜（

我见过类似的题，那个题是luoguP3943 星空。

先进行差分，问题变成每次可以把两个距离是奇素数的位置反转，最后要变成全0。

于是可以注意到，大部分的步骤是操作一个0和一个1，也就是把1移到0那里；剩下的是操作两个1将它们抵消。

这个问题相当于把1两两配对，我们可以用一个最短路跑出每个距离的代价。配对的部分是一个完全图最小权完美匹配问题，看起来一定是需要某种优化了/ll

直觉是这个代价会有某种性质。考虑直接爆力分析。

 - 如果距离是奇素数，只需要一次

 - 如果距离是偶数，根据哥猜，需要两次

 - 如果距离是奇合数，需要三次

注意到$$n$$只有$$100$$。带权带花树是否能过?

考虑一个简单想法，我们先连满奇素数。对所有数按奇偶性黑白染色，这就是一个二分图最大匹配，网络流即可。

然后呢，考虑两黑点和两白点$$a,b,c,d$$，如果存在一种方案连出一对奇素数，那么一定不比连两对偶数劣。否则我们就会连两对偶数。

于是我们可以得到，如果剩下$$l$$个黑点和$$r$$个白点没有连出奇素数，我们会尽可能连两对偶数。如果最后剩下两个异色点，我们就连一对奇合数。做完了，如果使用Dinic，复杂度是$$O(n^2\sqrt{n})$$。

-----

ARC081E : 直接子序列自动机。

-----

ARC081F : 这个题看起来好复杂（

考虑什么样的矩形能被翻成全黑的。

当我们确定了列的反转之后，每一行要么全黑要么全白，也就是说能变成全黑，当且仅当每一行和上一行相同或者相反。设$$f(i,j)$$表示格子$$(i,j)$$往右延伸到哪里还能保持和上一行相同，对每一列使用单调栈即可。

还有一个更鬼的做法，说的是能变成全黑的当且仅当所有子矩形四个角异或和为$$0$$，又等价于所有$$2\times 2$$子矩形异或和为$$0$$。把每个位置置为$$2\times 2$$子矩形的异或和，直接求最大全0矩形即可。

-----

ARC082E : 这是一道经典题，我们不妨再做一做。

$$2^k$$有着明确的组合意义，所以这就相当于在 $$S$$的凸壳里面的点 中选一个子集的方案数。

你发现每个子集都有一个凸壳，所以答案就是所有点的子集数即$$2^n$$。

当然这并不对，还需要减去不能构成凸壳的情况，就是所有点都在一条线上的情况。枚举两个点画一条直线，然后直接减去直线上的点集数即可。

-----

ARC082F : 看起来是简单数据结构题。

先扫描线一发，用某种数据结构维护所有的答案。相当于，一开始是$$1,...,v$$，每次有一个$$x$$，要支持单点查询，全局

 - $$a_i$$减$$x$$，对$$0$$取$$\max$$

 - $$a_i$$加$$x$$，对$$i$$取$$\max$$

。第二个操作看起来没法直接做，所以我们可以考虑一些性质。发现无论如何这个$$a$$还是单增的，并且每次操作至多在之前所有拐点的左边产生一个新的拐点并推平掉若干个拐点，所以可以用一个栈来维护所有拐点，单点查询的时候进行二分，就做完了。

据说有线性做法，不过我不关心（

-----

ARC083E : 这个问题一眼看上去好像不弱于背包可行性/jy

不过仔细想了想感觉它要弱一点。

哦这是构造题啊，我还以为给定权值呢，这是看完题面的一点瞎扯（

考虑基于子树的dp，钦定根是黑色，那么只需要存储白色的权值和来转移。做完了。

等等没做完，这个$$O(nv^2)$$的话，bitset优化也过不去（

考虑白色的权值和应该尽量小，所以直接把状态改成黑色满足要求情况下，最小的白色权值和即可。

-----

ARC083F : 看起来非常复杂。

每个球只有两种选择，所以你仿佛看到了一个2-sat?但是说实话2-sat做这种数数问题还真是比较困难。

除非，除非，只有一种配对方案!但是你发现很容易就构造出来两种的了，所以2-sat没了。

另一种经典做法是，把每个球看成一条边，指向哪边就是哪边把它拿走了。

注意到有$$2n$$个点$$2n$$条边，每个机器人都要拿到球，说明每个点入度必须是$$1$$，于是这必然构成一个外向基环树森林，否则无解。

先枚举一个定向再说。考虑如果一个机器人要正确地触发，就要求别的机器人已经给它清理了障碍，而这些机器人就是它的儿子里面挡住了它要拿的球的那些。

所以我们可以再建一个图，每个机器人连向儿子中所有挡住了它的。注意到每个点至多只有一条入边，所以这形成了一个外向树森林，原问题相当于求这个的拓扑序。

可以把每棵树拆开，最后乘起来。我们可以搞一个简单dp，设$$dp(u)$$表示$$u$$子树的拓扑序个数，转移就是把儿子们带一个组合数地乘起来，并把自己放在最后。看起来像是

$$
dp(u)=(\mathrm{size}(u)-1)!\prod_{v\in\mathrm{ch}(u)}\frac{dp(v)}{\mathrm{size}(v)!}
$$

，实际上有更好看的式子

$$
\frac{dp(u)}{\mathrm{size}(u)!}=\frac{\prod_{v\in\mathrm{ch}(u)}\frac{dp(v)}{\mathrm{size}(v)!}}{\mathrm{size(u)}}
$$

，这说明一棵树的答案就是$$\frac{\mathrm{size}(r)}{\prod_{u}\mathrm{size}(u)}$$，当然这里$$r$$是根。

最后我们把每棵树带一个组合数地乘起来，再把每棵基环树带一个组合数地乘起来，就做完了。复杂度是线性的。

-----

ARC084E : 看起来非常简单。我们只需要$$O(n\log k)$$爆力逐位二分即可。

是否存在直接算方法?看起来是的，参见你谷题解区。

-----

ARC084F : 我怎么感觉这么眼熟（

把每个数看成一个系数膜$$2$$的多项式，那么两个操作就变成从$$A$$得到$$zA$$和从$$A,B$$得到$$A+B$$。

那么主要问题是求出所有$$z^kA_i$$的$$\gcd$$，这个$$\gcd$$的倍数就都可以拼出来了，而求一个数的倍数个数显然可以爆力取膜。

呃你发现好像只有不移位才可能对$$\gcd$$有影响，所以把这六个多项式求个$$\gcd$$即可。复杂度是$$O(nv^2)$$，$$v$$是位数。

这样好像不是很稳，发现$$\gcd$$只需要支持减法和移位，我们只需要bitset优化一下就好了。

存在一个非常厉害的线性基做法，我不懂。

-----

ARC085E : 看起来有点复杂。

考虑我们可以枚举到$$20$$，而超过$$20$$的数倍数不超过四个。这没啥用。

考虑如果我们不选了$$a$$的倍数，那么就等价于不选了所有$$a$$的倍数的倍数，然后不选了$$a$$。然后这就变成了一个带有依赖的选择问题 : 要不选$$a$$，必须先不选所有$$a$$的倍数?

发现看起来就像最小权闭合子图，胡乱跑一个就好了。

-----

ARC085F : 考虑按照左端点排序处理所有区间，设$$dp(i,j)$$表示处理到位置$$i$$，目前选了的最长的区间已经覆盖到$$j$$，前$$i$$个的答案。

考虑每个区间的转移，就是把一个位置改为它的前缀$$\min$$，线段树维护即可。

当然存在别的设状态方法，本质是类似的。

-----

ARC086E : 看起来比较好玩。

考虑$$i$$时刻根是什么数，只取决于树的形态和第$$i$$层初始是什么数。设$$dp(u,i,0/1)$$表示第$$i$$层有多少填法使得影响到达$$u$$时是$$0/1$$，就$$O(n^2)$$了。

如何优化?考虑一个爆力做法 : 直接对于每一层建立虚树。做完了。

当然存在这个问题上特化的线性虚树做法。

-----

ARC086F : 看起来非常困难。

排个序肯定不亏。

考虑一个简单结论 : $$\mathrm{shift}$$不超过$$\log v$$次。这说明操作一定是$$\log$$段以内的若干$$-1$$，一次$$\mathrm{shift}$$，若干$$-1$$这样的。

考虑另一个简单结论 : 如果我执行了两次$$-1$$，再执行一次$$\mathrm{shift}$$，等价于先执行一次$$\mathrm{shift}$$，再执行一次$$-1$$。这说明除了最后一段$$-1$$的数量可能很多，前面的$$-1$$都最多只有一个，这也是最小化操作次数的方法。

反过来，这也说明，每个$$-1$$都可以向前退位，于是除了第一段和最后一段有若干个$$-1$$，别的地方都可以没有$$-1$$。如果不考虑那个操作次数的限制，枚举shift次数，就只剩下两个问题了。

所以所有的操作方案都等价于 : $$x:=\lfloor\frac{x-a}{2^k}\rfloor-b$$。

注意到$$b$$的处理是简单的，一个序列的贡献就是序列的$$\min$$。主要问题是怎么对$$b$$之前的部分去重。简单想法是，两个序列在考虑$$b$$的意义下相同，当且仅当它们的差分序列相同。

显然可以限制$$a<2^k$$，否则$$\lfloor\frac{a}{2^k}\rfloor$$的部分可以直接放进$$b$$里，这是一个非常优秀的性质。

于是$$\lfloor\frac{x-a}{2^k}\rfloor$$的值只可能是$$\lfloor\frac{x}{2^k}\rfloor$$或$$\lfloor\frac{x}{2^k}\rfloor-1$$，这取决于$$x-a$$的时候有没有在$$k$$位上产生退位。

于是每个数都在一个$$a$$的前缀里得到$$\lfloor\frac{x}{2^k}\rfloor$$，在对应的后缀里得到$$\lfloor\frac{x}{2^k}\rfloor-1$$，这$$n$$个分界点合并得到一个$$O(n)$$段的分段函数，每一段表示一种可能的差分序列和它的$$\min$$的可行区间。

枚举$$k$$，对这总共$$O(n\log v)$$个差分序列去重，就会得到若干个等价类。

现在我们已经完全理解了它的结构，考虑怎么加入那个操作次数的限制。刚才已经说明了是尽可能在后面做$$-1$$最优，所以我们尽可能往后放，直到每个$$\mathrm{shift}$$前面都只有最多一次$$-1$$。这相当于给$$a$$二进制分解，于是我们希望前面那个$$a$$的$$\mathrm{popcnt}$$尽可能小，以给$$b$$留下更多的操作数，问题变成求这个$$a$$的区间中$$\mathrm{popcnt}$$最小的数。

这是经典问题，我们从高到低贪心，尽可能填$$0$$即可。

这样我们就可以算出来给$$b$$留下了多少次操作，这样每个序列可以操作出来的就是一个区间，于是相当于每个等价类做一个值域上的区间并，直接统计答案即可。

复杂度是$$O(n^2\log v)$$。

-----

ARC087E : 看起来比较复杂。

考虑什么样的集合是不能操作的。

按照定义是，对于每个串，它要么是集合中一个串的后缀，要么是集合中一个串的前缀。

考虑一个满的01trie，你发现每个被选了的点会ban掉它的所有祖先和所有后代，也就是到根的链和子树，最后一定会剩下若干个满的子树。考虑使用sg函数。

如何求一个满的子树的sg值?假设它的高度是$$h$$，那么我们可以选择深度为$$1,...,h$$的结点，同一深度的两个结点是等价的。如果我们选了深度为$$k$$的结点，那么会得到高度为$$h-1,...,h-k-1$$的子树，所以有

$$
\mathrm{SG}(i)=\mathop{\mathrm{mex}}_{j=1}^i\mathop{\mathrm{xor}}_{k=i-j-1}^{i-1}\mathrm{SG}(k)
$$

然后就可以打个表，你发现它就是lowbit，所以就做完了。

对了，关于如何在mex和xor上下打限制而不是右边，可以使用\mathop将它们转为巨运算符，或者直接分别使用\overset和\underset添加上下标。右键公式获取更多信息。

-----

ARC087F : 这个题极度经典啊!

考虑我们选一个重心把树拎起来，把每个点换到一棵不同的子树去。注意到如果不选重心，一定存在一棵子树大小超过一半，那么那棵子树就不可能完全换到别的子树去，所以每次选重心是最优的。

然后考虑这么做的方案数。具体地，考虑我们要做的就是 : 有一些不同的点，分成了$$k$$组，现在要求有多少种重排方式，使得每个组大小不变，并且每个点都不在原来的组。

容易想到这么几种dp的顺序 : 

 - 依次决策每个组。这是不可行的，因为需要知道当前组之前被选走了多少个。

 - 依次决策每个点。这太离谱了。

 - 每次加入一个组和它的点。这看起来也不是很好，因为我们需要枚举换了多少个到前面每个组。

所以我们只能用没有办法的办法了，也就是容斥!

钦定$$k$$个点没有被换出子树，那么我们就要做一个背包选出这是哪$$k$$个点，剩下的点就随便换了。你发现此时问题变得非常简单，容易做到$$O(n^2)$$。加上点分治也是$$O(n^2)$$的。

但是我们一直忽略了一个问题 : 如果有两个重心怎么办?考虑两个重心之间那条边，我们换两个重心的子树的方案数显然是$$(s!)^2$$，当然$$s$$是每个重心的子树大小；此后我们分别递归到两个重心的子树即可。这保持点分治复杂度不变。

可以对那个背包使用分治法法塔优化，做到$$O(n\log^3 n)$$?

-----

ARC088E : 看起来比较复杂。

考虑怎么确定最后换出来那个回文串是什么，搞完这个就变成经典问题了。

考虑从左往右数第$$k$$个a一定和从右往左数第$$k$$个a配对，当然配对指的是最后换到对称的位置。

然后考虑怎么排列这些对，这里我们直接相信邻项交换的正确性。比如有一对a和一对b，

 - 如果在原串中是a...b...b...a(懒得写开头结尾的...了)，那么最后肯定还是换成a...b...b...a

 - 如果在原串中是a...b...a...b，那么最后换成a...b...b...a和b...a...a...b好像区别不是很大，可以利用邻项交换来考虑，我们现在把这两个b当成a换出了一个接近回文的串ab...ab，那么不管是换成哪一种，都不可能和前面的操作抵消，所以代价是一样的

所以可以直接得到策略 : 从左往右枚举每一对，把另一边跟它配对的字符换到对称的位置。

注意奇回文需要一些特殊处理，具体地，我们扫到那个单着的字符的时候，需要把它换到中心去。

-----

ARC088F : 看起来有点奇怪。

首先最小化$$A$$是简单的，你发现每次并入一条链最多增加两个分叉，所以答案就是$$\sum\limits_{u}\lceil\frac{1}{2}\max(\mathrm{deg}(u)-2,0)\rceil$$。

最小化$$B$$呢?你发现每个点所做的事情就是把儿子们和父亲两两配对。考虑先二分一波，然后我们自底向上贪心，留给父亲尽可能短的儿子。这就做完了。

据说就是 赛道修建?

据说可以1$$\log$$?确实，考虑我们给每个点对它的儿子们排序，然后就可以线性地check。问题在于如何排序。

suxxsfe给出了一个神仙做法。考虑每个点给父亲的链长不超过它的子树高度，于是考虑进行长链剖分，我们把重儿子拿出来，把剩下的点进行计排，再把重儿子插回去，复杂度就对了。这个实在是妙的离谱。

草，你不会不会线性check吧?我们二分接到父亲上的那个儿子，那么剩下的一定是最小的和最大的配对，次小的和次大的配对这样的。于是你发现除了第一次，我们每次折半，都有$$\Theta(len)$$对配对会确定下来，当然这个范围可以容易地算出来。这样每次递归之后修改量都会减半，于是复杂度就是线性的。可能存在更简单的做法?

-----

ARC089E : 看起来非常恐怖。完全不会。

简单构造是，拉两条长$$100$$的链，一条边权全是$$x$$，一条全是$$y$$。这两条链显然足够长，不会被考虑为最短路，于是考虑如何在这俩之间加边。

直接表示一下。设从第一条链第$$i$$个点连到第二条链倒数第$$j$$个点的权值是$$w(i,j)$$，我们有$$d(x,y)=\min(ix+jy+w(i,j))$$，于是$$w(i,j)=\max(d(x,y)-ix-jy)$$是一组必要解。代入验证即可。

为什么这么做不会丢解?交上去发现过了就是不会丢吧（

-----

ARC089F : 看起来更恐怖了。

考虑不同的方案染出相同的结果是难以去重的，于是我们考虑什么样的序列可以染出来。

你发现，以白色把序列分割开，每一段如果有$$k>0$$个蓝色，那么至少需要$$k+1$$次才能染出来，而剩下的要求就是红蓝都至少一次，也就是说只要加起来是$$k+1$$就存在方案。如果没有蓝色那就是一次红色染出来。

哦这题里面顺序也有影响。假设我们用$$b<k$$个蓝色染$$k$$段蓝色，那么首先需要染一次红色，然后把前$$k-b+1$$段用一次蓝色染完，剩下$$k+1-b$$次红色和$$b-1$$次蓝色就随便什么顺序了。

考虑怎么进行check。一共有两种段 : 

 - 只有红色，只需要一个红色

 - 有蓝色，需要一个红色，然后一个蓝色，然后若干($$k-1$$)个红色和蓝色

于是贪心地，我们希望尽可能早地搞定所有 一个红色，然后一个蓝色 这样的东西，所以我们可以用随便什么扫过去，遇到红色就扔进一个集合，遇到蓝色就从集合取出来一个并把$$k$$最大的段搞上，如果集合空了那就看看之前有没有需要它的地方扔进去，完全没有的话就弃掉。

注意到$$70$$的分拆数可以接受，于是我们爆搜一个段的分拆，用这个东西check能否拼出来，最后每一段用组合数硬选，乘上段数的阶乘来排列这些段即可。

存在多项式做法，考虑用dp优化这个过程。先枚举只有红色的段有多少个，干掉最后的若干个红色。

注意到颜色序列这一维是没有意义的，于是我们在操作序列上dp，按$$k$$从大到小考虑每一段。考虑转移需要的信息，我们需要知道现在有多少段，还差多少次任意染的操作，上一个决策掉的段的$$k$$是多少。爆力转移复杂度是$$O(n^4\log n)$$(那个$$\log$$是调和数出来的，考虑一下转移你就懂了)，加上外层枚举总复杂度$$O(n^5\log n)$$，不过常数极小。

-----

ARC090E : 

考虑相遇的话一定是在中点相遇，否则说明两条最短路长度不同。先跑个dij求出最短路，然后取一半找到所有中点，如果它们在边中间就新建一个虚点。再分别从$$s,t$$跑dij最短路计数，对于每个中点减去两边到它最短路条数的积即可。

呃实际上没有必要建那个虚点。不过建出来更好玩。

-----

ARC090F : 

考虑要选完一个位数的所有数是困难的，$$8$$位数一共有$$10^8-10^7$$个，所以不可能选完这些数。于是我们可以爆力枚举所有这样的方案，具体一点就是双指针硬扫。

现在只剩下全都是同一位数和有两个位数的方案，并且这个位数至少是八位，也就是说不可能出现某个位数的数数量不够的情况。只有一个位数可以直接枚举因数做掉，有两个位数怎么做?

呃首先这里我们考虑的是非严格的，也就是说如果一个方案在两部分分别取了$$x,y$$个，那么即使$$x,y$$有一个是$$0$$，只要另一个还是贴着边的，我们也把它算为有两个位数的。这部分算重了的可以容易地在只有一种位数的部分减去。

考虑$$ax+(a+1)y=k$$的解，你发现它就是$$a(x+y)+y=k$$，而$$y$$可以取到$$0,...,x+y$$的任意数，所以这只要求$$x+y$$不太大也不太小，$$k-a(x+y)$$在可以接受的范围内，就存在唯一的$$y$$能帮它调整过来，于是我们可以写出一个$$k-a(x+y)\leq x+y$$，也就是$$k\leq(a+1)(x+y)$$，当然有前提$$k\geq a(x+y)$$，最后就是$$a(x+y)\leq k\leq(a+1)(x+y)$$。

这个东西怎么解?简简单单，直接除即可，我们得到$$\frac{a}{k}\leq\frac{1}{x+y}\leq\frac{a+1}{k}$$，取倒数得到$$\frac{k}{a+1}\leq x+y\leq\frac{k}{a}$$，取整得到$$\lceil\frac{k}{a+1}\rceil\leq x+y\leq\lfloor\frac{k}{a}\rfloor$$。于是可以进行两遍整除分块搞定。

总复杂度是$$O(k/\log k)$$。据说存在某种方式做到1e14?

-----

ARC091E : 看起来好复杂。考虑我们构造若干个上升的子段连起来，它们之间构成下降的子段，这样如果$$ab\geq n$$并且$$a+b-1\leq n$$就有解，否则无解。

然后你交上去发现过了（

-----

ARC091F : 这个题一看就简简单单对吧，我们只需要打表sg函数即可。

打出来是什么呢?我不知道（

去题解区找到一个表，你发现一个神奇的规律 : 这个函数看起来很复杂，但是有一个简单的规律$$\mathrm{SG}(kn)=n$$。

然后你再仔细看看，发现对于$$k\not\mid n$$的$$n$$，有$$\mathrm{SG}(n)=\mathrm{SG}(n-\lfloor\frac{n}{k}\rfloor-1)$$，会这么想是因为题目中存在一个$$\lfloor\frac{n}{k}\rfloor$$。

于是我们类似于整除分块的做法，每次找到多少次后$$\lfloor\frac{n}{k}\rfloor$$会变化(这个很容易推个式子搞定)，复杂度就是一个根号了，可以利用根号分治分析出来。

-----

ARC092E : 你发现如果只考虑操作1，所做的就是保留一个区间，而操作2最终的结果是保留一些位置，它们的距离都是偶数，并且只要距离是偶数就可以选出来(对中间位置不断用操作2)。所以问题转化成选择一些奇偶性相同的位置，使得和最大，只需要拿出来选即可。

-----

ARC092F : 注意到SCC是难以分治掉的，因为缩SCC之后的DAG边数是巨大的。不过这题$$n$$小的可怜，是否存在奇技淫巧把它搞成对的呢?

想了想感觉没有，所以我们还是考虑点奇怪做法。

先求一个SCC，然后对于每条边 : 

 - 如果它在一个SCC里，那么它反向之后如果发生变化，一定是这个SCC分裂成若干个SCC

 - 如果它在DAG上，那么它反向之后如果发生变化，一定是形成了一个环

两种都可以归结为查询删掉一条边$$u\rightarrow v$$之后，是否有$$u\rightsquigarrow v$$。

众所周知半连通性查询是困难的，只能做到$$O(nm/w)$$，所以这个问题看起来很难做。

显然做法是，在$$u$$处批量处理所有$$u\rightarrow v$$，可以直接记搜$$n$$遍，复杂度是$$O(nm)$$，这题时限5s能过。

如何减小dfs的时间?注意到$$m$$实在是很大，我们要想跳过那些没用的边，可以用一个bitset来搞，也就是用bitset存一个点的出边，每次要找没访问过的邻接点就用vis和出边and起来并不停找下一个$$1$$，这样复杂度就变成了$$O(n^2/w)$$。总复杂度是$$O(n^3/w+m)$$。

两个算法拼凑起来，我们得到$$O(\min(nm,n^3/w+m))$$，不过好像没什么用。

-----

ARC093E : 看起来比较复杂。

考虑如果mst的权值就是$$x$$，那么我们只要求出所有mst可能覆盖的边，在这里面保证不全黑不全白，剩下的随便染就行了。

如果mst的权值超过$$x$$，没救了。

如果mst的权值比$$x$$小，我们需要把mst可能覆盖的边全染成同一颜色，不妨染黑。接下来我们需要检查更大的生成树，可以从mst开始，等一条白边。

这也就是说，这个生成树和mst的区别只有一条边，我们用随便什么树数据结构支持一个链$$\max$$，就可以查出哪些边作为这一条边恰好可以把权值变成$$x$$，哪些边会变大而哪些边会变小。变小的必须全染黑，恰好的只要有一条白就行了，变大的完全随意。

-----

ARC093F : 收录于 dp和容斥。

-----

ARC094E : 这个题看起来很好玩。

先判掉上来就相等的情况。然后考虑每个$$i$$，如果$$a_i\leq b_i$$，那么A操作一次$$a_i$$，B将来总得跟着操作一次；如果$$a_i>b_i$$，A操作了，B只要等着。所以我们先把所有$$a_i\leq b_i$$的操作到不能操作，然后就慢慢来了。

慢慢来是什么?当B在砍那些$$a_i\leq b_i$$的时候，A不得不去操作$$a_i>b_i$$的。如果A操作出了新的$$a_i\leq b_i$$，B就不得不跟着操作，所以A肯定很希望这么做，所以A操作哪个B不得不跟着。所以你发现，最后一定是一个$$a_i>b_i$$变成了相等的，别的全都变成$$0$$了。

那么留下了哪个?考虑什么样的堆是不能留下来的，你发现如果A操作了一堆，B就是不动，B的底气从哪来?看起来是说当B操作完别的，这个位置恰好变得相等了，同时别的位置要么相等了要么只剩下$$b$$。所以留下哪一堆都是可以的?

仔细想想你发现真的确实，所以答案就是$$s-\max\limits_{a_i>b_i}b_i$$。

-----

ARC094F : 你发现方案还是多样的，操作也不像是可逆的，判定是复杂的，那有啥性质呢......

考虑做一些奇怪操作题的方法，我们猜一个不变的结论。令$$a=0,b=1,c=2$$，加法膜$$3$$，那么每次操作之后总和不变。

这有什么用?这说明操作可能并不完全可逆，但是还是很可能具有一定的可逆性，比如在某一类串中可逆。

可以考虑一下。首先不管怎么操作，得到的串一定有两个相邻的相同字符，所以abcba之类的串，操作它肯定不可逆。

考虑abba，操作得到ccba，再操作得到caaa,bbaa,bcca,aaca,abba，回来了。这个过程是什么样的?不是很好描述。

考虑abb，我们可以写出ccb,caa,bba,bcc,aac,abb，又回来了。所以我们大胆猜测，对于所有包含两个相邻的相同字符，并且不只有一种字符的串，操作它们是可逆的。

所以先特判$$n\leq 4$$，我们只需要证明所有串都可以变成baa...,caa...,bcaa...中的一个，就结束了。既然这是OI，证明放到最后。

绝大部分的串都满足这个，剩下的情况大概是简单的，一会再考虑。所以我们可以考虑dp，设$$dp(i,j,k,0/1)$$表示长为$$i$$的串，和为$$j$$，第$$i$$个字符是$$k$$，前面没有/有两个相邻的相同字符的方案数。转移显然。

剩下的问题是如何判定能不能搞出全a，全b和全c的串，直接猜测串的和正确就能搞出来，实际上这种情况在刚才的dp里面已经考虑到了。

**结论** 如果一个串的总和是$$1,2,0$$，并且它不只有一种字符，那么它可以搞成baa...,caa...,bcaa...。

**证明** 这玩意真的能证吗（

考虑几个简单的例子 : 

 - abba : ccba,caaa

 - cbbba : cbbcc,cbaac,cbabb,cbccb,cbcaa,caaaa

 - abcba : abaaa,ccaaa,cbbaa,aabaa,accaa,bbcaa,baaaa

看起来比较复杂，不过它看起来非常对。那就当它对了吧（

实际上证起来也不是不行，我们感性理解一下，尽可能扩展最后连续的a，是不是就彳亍了啊?

这个说明了和相同的串之间是连通的。

-----

ARC095E : 只有12/jy

这说明什么?考虑一些爆搜方法（

注意到对中心对称矩阵做中心对称的交换不影响中心对称性，所以我们只是要找一组行列的匹配。

两行/两列能匹配的必要条件是它们的字符集合相同，这个限制带来的强力剪枝对这题数据足够强了。

-----

ARC095F : 这个题看起来比较好玩。直接做好像没什么想法，不过一个想法是这个值域上的$$>$$很抽象。

对付排列问题的一个经典方法是，构造逆排列来转换值和下标。这里的连边是$$i$$连向$$\max\limits_{p_i>p_j}j$$，那么作换元$$i:=q_i,j:=q_j$$，逆排列上就是$$q_i$$连向$$\max\limits_{i>j}q_j$$也就是前缀最大值。

所以考虑所有的前缀最大值，它们构成了一条链，而剩下的点都是连在它们上面，于是树的形态必然是一条链上挂着很多单点。

接下来构造也很容易了，这条链一定是直径(或者给定的树是菊花，这个情况怎么做都对)，我们直接从上往下模拟即可。当然直径没有上下，需要两个方向分别做一次取min。

-----

ARC096E : 看起来好困难。

如果没有第二个限制，就很简单了，答案就是$$2^{2^n}$$。

但是现在有第二个限制（

考虑dp，序列上dp显然是完全没有前途的，因为没法考虑第二个限制，在集合们上dp，集合数量最大可达$$2^n$$。

看起来没什么别的想法了，那就容斥吧。我们钦定一些选的不够的，剩下的就随便选了，而钦定出来的需要考虑一下。

注意这个容斥性质非常好，因为每个数是平等的，我们钦定每个$$k$$子集得到的结果都是一样的，所以算钦定$$1,...,k$$的结果，最后乘上$$\binom{n}{k}$$即可。

有$$2^{n-k}$$个子集完全不包含我们钦定的数，它们可以随便选。对于我们钦定的这些，相当于从中选出一个子集让它被选一次，然后划分成若干个子集，每个子集还可以带上一些后面的数。这个划分显然是斯特林数，所以答案就是

$$
\sum_{k=0}^n(-1)^k\binom{n}{k}2^{2^{n-k}}\sum_{i=0}^k\binom{k}{i}\sum_{j=0}^i{i\brace j}(2^{n-k})^j
$$

斯特林数可以$$O(n^2)$$算，总复杂度$$O(n^3)$$。咋回事啊?

你发现$$\sum\limits_{i=0}^k\binom{k}{i}\sum\limits_{j=0}^i{i\brace j}$$这个东西很好玩，如果我们把第一个组合数没选的部分也看成一个集合，那么这实际上是把$$k$$个数划分成$$i+1$$个集合，其中有一个可以为空并且被特殊标记了的方案数。为了让它可以为空并且被标记，我们加入一个数$$0$$，这样式子就变成了

$$
\sum_{k=0}^n(-1)^k\binom{n}{k}2^{2^{n-k}}\sum_{j=0}^k{k+1\brace j+1}(2^{n-k})^j
$$

这就很好，复杂度降为$$O(n^2)$$。

-----

ARC096F : 看起来非常困难。

注意到每个点至少是父亲，所以我们差分一下，每个点支付它整个子树的费用，于是问题变成多重背包了，除了根无限选，别的都只能选$$d$$个，重量在$$10^9n$$以内，价值在$$n$$以内。

注意到数量很大，这导致答案很大，这样我们就没法维度交换了。考虑怎么减小数量。

如果是完全背包，也就是每种物品都有无限个怎么做?你发现此时选性价比最高的那个会很优，这导致别的物品选了都不超过它的价值个。比方说性价比最高的物品价值和重量分别是$$v_1,w_1$$，有个物品是$$v_2,w_2$$，那么如果这个物品选了$$v_1$$个，就不如换成$$v_2$$个性价比最高的那个。

所以如果是多重背包，我们可以每种物品保留$$n$$个跑多重背包，剩下的直接贪心，不停选最优的，这部分可以二分掉。总复杂度是$$O(n^3\log n)$$。

-----

ARC097E : 又是换换换题。考虑怎么搞这个。

考虑点爆力做法 : 我们dp最后剩下的那个序列是什么，每次爆力枚举下一个是黑是白，也就是设$$dp(i,j,0/1)$$表示现在放了$$i$$个黑球和$$j$$个白球的最小逆序对数，那么可以用某种方式预处理转移，做完了，复杂度$$O(n^2)$$。

-----

ARC097F : 可以简单地构造出$$3n$$的方案，不过这没什么用（

感觉这个跟那个少走一遍直径的经典题很像，但又完全不像。

先对白点建立斯坦呐树，不在这个斯坦呐树上的点就可以扔掉了。

考虑猫在树上走，如果需要走两次，那就来的时候染白，回去染黑；走一次的话，就得同时染黑和染白——除非这个点本来就是白的，那就太好了。

然后你发现，我们可以选择一条链只走一次。考虑贡献 : 白点走一次贡献是$$1$$，两次贡献是$$3$$；黑点走一次贡献是$$2$$，两次贡献还是$$2$$。

所以说，我们每选一个白点，就可以减少$$2$$的代价，所以给白点赋权为$$1$$，求加权直径即可。

-----

ARC098E : 考虑如果确定了要删哪些，我们肯定是先删小的后删大的，因为这样让大的更有可能被删掉。

考虑枚举最小的，用双指针扫最大的。如果一次check能做到$$O(n\log n)$$之类的，我们就过掉了，然后你发现这个是简单的，只要模拟一下，用线段树二分维护左右扩展到哪里还是最小值即可。

当然这个做法还是复杂了。考虑我们枚举最小值之后，所有长$$k$$的区间有一些的$$\min$$不比我们枚举的数小，那么这些区间里面都可以顺着选完了。我们求出所有这样区间的并(用单调队列或者分块求$$\min$$)，然后给所有可行的数求前$$q$$小，使用严格线性kth即可做到严格$$O(n^2)$$。

-----

ARC098F : 肯定先二分一波，然后我们时间倒流，变成每次到一个点可以选择是否拿到一些钱，选择之后钱数必须达到某个值。这是不是显然一定要啊!

然后就变成维护一个可达的块，等到能到达所有点就赢麻了。可以用类似Prim的方法开个堆维护下一个能到的点。现在问题是怎么确定起点，你发现不行!

考虑可达性怎么批量处理，容易想到Kru重构树，那我们就建Kru重构树，于是就变成往上走一步可以获得整个子树，要求哪个点可以走上去。dp即可。

然后你发现二分没啥用，砍了就是了。

-----

ARC099E : 看起来好鬼。

完全图的限制说的是，没有边必须不在一个子图。于是我们对补图进行黑白染色，这样每个连通块可以黑白取反。

然后琴生不等式说明越极端越优秀，所以我们就多的颜色和多的颜色拼，少的颜色和少的颜色拼即可。不过为什么没人这么做?可能它并不对（

靠谱做法是背包背出来哪些大小是可行的。

-----

ARC099F : 我们肯定先求出来整个串执行完是啥样的（

考虑如果要扫描线，肯定是从右往左扫左端点，因为左边加入的贡献是容易考虑的，加入shift就是整体shift，加入+-就啥事没有。

然后就可以考虑怎么判断相等了，这个好像很复杂/jk

hash!

考虑shift就是整体乘一个数，+-就是整体$$\pm 1$$，而加法和乘法的合并是容易的，那么我们就维护一组全局标记即可。

-----

ARC100E : 可能法嘛塔那时候不普及?

考虑我们先求出$$=k$$的再做一个前缀和，不过这是困难的，于是我们可以考虑先求出包含于$$k$$的再做一个前缀和。然后你发现就是法嘛塔求前$$2$$小值。

-----

ARC100F : 这个题结论很不直觉，收录于 三轮省集。

-----

ARC101E : 看到这个题就很想容斥。那就先容斥吧（

我们考虑如果钦定了$$k$$条边，那么切断它们会把这棵树分成$$k+1$$个连通块，块之间不能有边，块内随意，并且每个块大小必须是偶数，方案数是$$\prod_if(s_i)$$，其中$$f(n)=[n\mod 2=0]\binom{n}{n/2}(n/2)$$。

所以考虑直接背包出这些边，复杂度是树卷积的$$O(n^2)$$。但当我~~用上了换行~~\*写出式子来，发现这个好像不是很可行啊!主要问题在于我们没法简单地把一个点塞进一个子树，还需要记录一维根所在的连通块大小，就变成三维了。

不过另一个想法是，我们没必要记选了多少边，直接带着符号做即可。复杂度还是树卷积的$$O(n^2)$$。

\* : 语出松毛虫《无题》 : 无趣的水一天群 不过是一群人 发着smc! 但当我用上了换行 我仿佛，成了诗人

-----

ARC101F : 这个题当时被我一眼胡掉了，收录于 二轮省集。

-----

ARC102E : 看起来还是很想容斥，不过还是先等等。

考虑爆力怎么做，爆力是不是，我们枚举那个和$$x$$，然后每一对加起来得到$$x$$的就不能都存在至少一个，如果是偶数那么$$x$$的一半不能出现多于一个，所以我们枚举那个一半的位置有没有，然后答案就直接隔板隔一隔......?

有两个问题，一个是有值域上限$$k$$所以不能隔板，一个是如果一对都选了$$0$$个那么我们就不能给这一对乘$$2$$，所以就不知道该怎么乘$$2$$了。

考虑dp，你发现问题已经变成了 : 有$$m=\lfloor\frac{x}{2}\rfloor$$个有标号有序对，每一对可以选择一个分配一个数，或者不分配，要求总和是$$n$$。

然后你发现这就是背包，做即可。预处理出背包的结果即可快速求出每个答案。

-----

ARC102F : 神仙结论。

王卷王只猜了$$\frac{1}{3}$$，而我一个都没猜出来/jk

第一个结论是，交换不影响一个数位置的奇偶性，所以奇数位置上应该是所有的奇数，偶数位置上应该是所有的偶数。

第二个结论是，每次交换减少三个逆序对，所以逆序对数应该是三的倍数。

然后你发现过不了。

进一步分析第二个结论，每次交换会减少奇数或者偶数内部的一对，和奇偶之间的两对逆序对，所以奇偶分别内部的逆序对总数应该是总逆序对数的三分之一。这样就过了。

但是它是$$O(n\log n)$$的!瓶颈在于逆序对，注意到这个是膜$$3$$的，所以考虑一个牛逼数据结构。我们令$$v=2^{32}$$也就是uint的范围，按$$\lfloor\log_3 v\rfloor=\Theta(\log v)$$大小分块(这个数实际上是$$20$$)，整块用BiT维护是$$O(1+\log n/\log w)=O(1)$$；零散块压成一个uint，然后写一个$$O(\sqrt{v})-O(1)$$的popcnt。

复杂度是$$O(n(1+\log n/\log v)+\sqrt{v})$$，不精细实现可能会在后面多一个$$\log v$$，不过那也不大。这个本质上类似于四毛子，就是利用每一块的可能性很少，可以爆力预处理掉。

当然，还是要冷静分析一下，为什么这个结论是对的?我也不知道。

网友给出了神仙感性证明。考虑一个操作是满足操作条件的，当且仅当它确实减少了三个逆序对，所以这个就听起来很对了。不过还是只是听起来?

-----

ARC103D : 看到E是蓝色而D是紫色（

草，为什么ABC的D我也没想法啊/ll

首先考虑无解的情况，我们求出所有点两维和的奇偶性，如果不都相同那就没了，因为所有点走的距离总和是一样的。

考虑我们显然是做某种进制分解，但是这里注意到一个数的贡献要么是正的要么是负的，这意味着我们用不到的就必须拼到另一维上，所以就非常恶心。

$$2^{30}$$达到1e9，所以我们先拿$$30$$次拼到横坐标上把它们变成对的，现在还剩$$10$$次和之前剩下的没有用到的，哦这显然会把我们卡死，所以这不行。

但是$$m$$这么大，肯定是个$$\log$$啊，那是啥呢?

唯一的解释是，不是$$\lg(x)+\lg(y)$$，而是$$\lg(x+y)$$。如果我们把这么多扔进去，是否能保证有解呢?不知道，先试试吧。

考虑一个长$$1$$的机械臂可以覆盖哪些位置，你发现只有四个位置。

加入一个长$$2$$的，那么现在除了$$x+y$$为偶数的，一个斜的正方形是可行的。

加入一个长$$4$$的，你发现都是$$x+y$$为偶数的搞不定，别的都搞定了。结论是，加入$$1$$到$$2^{31}$$，再根据奇偶性决定是否加入一个$$1$$，就一定可以搞出来。

现在问题是怎么构造方案，当然先忽略最后那个$$1$$。考虑从大到小处理，你发现我们只需要判断一个点是在四部分中的哪一部分，可以直接判断是不是在那个曼哈顿距离下的圆里。

-----

ARC103E : 发现$$s$$和$$n-s$$是同时出现的。

考虑构造一条链，现在要把不能出现的大小ban掉，就可以把不想要的段缩成菊花。最后check即可。

实际上不需要check，因为如果$$s_1=1$$则构造一定合法。

-----

ARC103F : 到其它所有点的距离和?于是我们立刻可以知道最小的是重心，最大的是某个叶子，别的还知道什么?

重心性质很好，因为我们知道，在重心为端点的一条链上，离重心越近的点$$d$$越小，所以我们不妨先以重心为根把树拎起来。

考虑如果两个点相邻，它们的差应该就是它们之间那条边为根，子树大小的差。

所以所有差为$$n-2$$的相邻对，大的都是叶子。差超过$$n-2$$的不可能相邻。这完全没用，因为没有判定相邻的方法!

如何表示 子树大小的差?注意到我们可能知道一个点的子树大小$$s$$(以那条边或者重心为根是一样的)，因为我们知道有一个点是叶子，那另一个点的子树大小就是$$n-s$$。

考虑如果我们已经知道了$$s,d_u$$，那么$$d_v=d_u+s-(n-s)=d_u+2s+n$$。

于是就可以求出这个叶子的父亲可以是哪个点了，用map套vector查即可。

但是我们并不知道这个叶子的父亲的子树大小，所以继续推就遇到了困难。不过你发现，我们之所以不能取排序之后最后面的点作为所有的叶子，就是因为这里面可能有叶子的父亲，而我们已经找到了最大的叶子，把它剥掉之后它的父亲要么变成了叶子，要么不可能最大，那么剩下的全局最大一定也是叶子了，所以可以不断重复这个过程，直到只剩下重心。做完了，复杂度$$O(n\log n)$$，可以基排一下做到$$O(n)$$。

-----

于是做完了所有的远古ARC，104及之后，以后再说吧（

毕竟还有AGC数数题的坑（麻了怎么这么多坑