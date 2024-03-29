---
layout: post
title: 随机数据背包，Graham-Joux算法
subtitle: /fn
tags: 搜索
---

背包也就是判定一个集合是否存在一个和为$$k$$的子集的问题。译自 A new generic algorithm for hard knapsacks http://www.joux.biz/publications/Knapsacks.pdf 。

关于背包，大家都会直接折半，然后排序双指针。

请注意，数据随机。指的是每个数是随机的，而目标可以不是随机的。

---

为了简化问题，我们定义 平衡背包 指存在一个答案包含恰好$$n/2$$个元素的背包的问题。

-----

众所周知时间复杂度不低于空间复杂度，所以我们首先介绍Shamir和Schroeppel的算法，它把空间降到了四次根号。考虑我们把遍历所有子集和的过程再次折半，我们把前一半和后一半的所有子集和都求出来并排序，前一半称为$$l$$而后一半称为$$r$$，然后我们对每个$$l_i$$维护一个$$r_j$$，每次找到最小的$$l_i+r_j$$把它输出并$$j:=j+1$$，使用堆即可。

一个不需要在排序之外的地方多$$\log$$的想法是，我们还是先折两半，随机一个膜数$$m=\Theta(2^{n/4})$$，枚举左边的和膜$$m$$的值，此时右边的也确定了。接下来我们可以对两边再折半，生成具有我们所要的膜$$m$$的值的所有方案，这是单次$$\tilde{O}(2^{n/4})$$的。然后由于膜数是随机的，期望生成$$O(2^{n/4})$$个数，所以空间就是期望$$O(2^{n/4})$$。

-----

基于上面的想法，我们有一个更快解决不平衡背包的算法。设答案中有$$k$$个元素，那么我们把序列随机打乱后分成四块，并假设每一块中包含答案的$$k/4$$个元素。考虑这一假设成立的概率

$$
\frac{\binom{k}{k/4,k/4,k/4,k/4}\binom{n-k}{(n-k)/4,(n-k)/4,(n-k)/4,(n-k)/4}}{\binom{n}{n/4,n/4,n/4,n/4}}=\Theta(\frac{n^{1.5}}{k^{1.5}(n-k)^{1.5}})
$$

所以我们只需要跑多项式轮就可以得到$$\Theta(1)$$的成功率。这是一个非常重要的观察。剩下的部分就是跟上面一样生成，我们每一块跑一个$$\binom{n/4}{k/4}$$的爆搜，然后在左两块和右两块上双指针，时间是$$\tilde{O}\left(\binom{n/4}{k/4}^2\right)$$，空间$$\tilde{O}\left(\binom{n/4}{k/4}\right)$$。设$$k=\alpha n$$，我们可以知道$$\binom{n/4}{\alpha n/4}=\left(\frac{1}{\alpha^\alpha(1-\alpha)^{1-\alpha}}\right)^{1/4}$$。

以下将这一算法称为 ss方法 shamir-schroeppel algorithm。

-----

基于上面的想法，我们首先对平衡背包给出一个大约$$\tilde{O}(2^{0.42n})$$的算法，然后考虑如何玄学调整来优化它，然后考虑不平衡的背包。

把答案分成四部分，每部分包含答案的$$\frac{n}{8}$$个元素，那么答案这么分的方案数是

$$
\binom{n/2}{n/8,n/8,n/8,n/8}=\tilde{\Theta}(2^n)
$$

。随机一个膜数$$m=\Theta(2^{n/3})$$，然后随机三个$$m$$以内的数作为前三部分，此时第四部分也确定了，并且跑多项式轮就可以得到$$\Theta(1)$$的成功率。

接下来我们找到每一部分。每一部分内部是一个带取膜的不平衡的背包问题。我们使用ss方法，这里$$k=\frac{1}{8}n$$，所以复杂度是$$\tilde{O}\left(\left(\frac{1}{\left(\frac{1}{8}\right)^{\frac{1}{8}}\left(\frac{7}{8}\right)^{\frac{7}{8}}}\right)^{\frac{n}{2}}\right)$$，约为$$\tilde{O}(2^{0.272n})$$。

接下来把这些部分合并。套用ss方法的最后一步即可。考虑每一部分求出的方案数，这里论文里面直接感觉了它是$$\frac{\binom{n}{n/8}}{m}$$，约为$$\tilde{O}(2^{0.210n})$$。所以我们的总复杂度就是方案数的平方，约为$$\tilde{O}(2^{0.420n})$$。

-----

然后由于这个东西只会做随机数据，所以我就懒得看了。剩下的部分好像比较诡异。